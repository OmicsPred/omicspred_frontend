import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Download } from 'react-bootstrap-icons';
import { internal_publication_link, internal_platform_link, internal_dataset_link, internal_tissue_link, op_title, op_subtitle_no_asso, no_entry_found, Header2Cards, ancestry_label } from '../../components/Common';
import DataTable from '../../components/table/DataTable';
import { performance_metrics_columns } from '../../components/table/columns/score';
import { phenotype_score_cols } from '../../components/table/columns/phenotype';
import restApiCall from '../../components/RestAPI';
import restApiCallPaginated from '../../components/RestAPIPaginated';
import { consoleDev, ToggleDiv, ToggleText, Note, loading_data, numberBadge } from '../../components/Generic';
import { DownloadList, get_download_list } from '../../components/Downloads';
import { MolecularTraitAssociation } from '../MolecularTrait/components/components';
import AncestryDistribution from '../../components/ancestry/AncestryDistribution';
import AncestryLegend from '../../components/ancestry/AncestryLegend';
import OPRadar from '../Plot/components/Radar';


function Score() {
    const { score } = useParams();
    const [scoreData, setScoreData] = useState()
    const [noEntry, setNoEntry] = useState(false)
    const [datasetId, setDatasetId] = useState()
    const [datasetName, setDatasetName] = useState()
    const [platformData, setPlatformData] = useState([])
    const [tissueData, setTissueData] = useState()
    const [genesData, setGenesData] = useState([])
    const [transcriptsData, setTranscriptsData] = useState([])
    const [metabolitesData, setMetabolitesData] = useState([])
    const [proteinsData, setProteinsData] = useState([])
    const [scorePhenotypeData, setScorePhenotypeData] = useState([])
    const [phenotypeData, setPhenotypeData] = useState([])
    const [pathwayData, setPathwayData] = useState([])
    const [metricData, setMetricData] = useState([])
    const [radarData, setRadarData] = useState({})
    const [platformDownloads, setPlatformDownloads] = useState({})

    const is_dev = (!process.env.GA4_TRACKING_ID || process.env.GA4_TRACKING_ID == '') ? true : false;

    const get_pathways = (data) => {
        let pathways = []
        let pathway_ids = [];
        if (data.genes) {
            for (let i=0; i < data.genes.length; i++) {
                if (data.genes[i].pathways) {
                    for (let j=0; j < data.genes[i].pathways.length; j++) {
                        const pathway = data.genes[i].pathways[j];
                        const pathway_id = pathway.external_id;
                        if (!pathway_ids.includes(pathway_id)) {
                            pathway_ids.push(pathway_id);
                            pathways.push(pathway);
                        }
                    }
                }
            }
        }
        return pathways.sort((a, b) => (a.name > b.name) ? 1 : -1)
    }

    const get_phenotypes = (data) => {
        let phenotypes = [];
        let phenotype_ids_list = [];
        for (let i=0; i < data.length; i++) {
            const score_phenotypes = data[i].phenotypes;
            for (let j=0; j < score_phenotypes.length; j++) {
                const phenotype = score_phenotypes[j];
                const phenotype_id = phenotype.id;
                if (!phenotype_ids_list.includes(phenotype_id)) {
                    phenotype_ids_list.push(phenotype_id);
                    phenotypes.push(phenotype);
                }
            }
        }
        return phenotypes;
    }

    const fetchScoreData = async () => {
        const score_data = await restApiCall('score/'+score+'?include_pathway=1');
        consoleDev(score_data);
        if (score_data && Object.keys(score_data).length) {
            setScoreData(score_data);
            if (score_data.platform) {
                const platform = score_data.platform;
                setPlatformData(platform);
                const publication = score_data.publication;
                fetchDownloadUrls(score_data.dataset_name,platform.name,publication.pmid)
            }
            setDatasetId(score_data.dataset_id)
            if (score_data.dataset_name) {
                setDatasetName(score_data.dataset_name)
            }
            if (score_data.tissue) {
                setTissueData(score_data.tissue)
            }
            setGenesData(score_data.genes);
            setTranscriptsData(score_data.transcripts);
            setProteinsData(score_data.proteins);
            setMetabolitesData(score_data.metabolites);
            const score_app_data = await restApiCallPaginated('score/phewas/'+score);
            score_app_data.sort((a, b) => (b.phenotypes[0].label > a.phenotypes[0].label) ? 1 : -1)
            setScorePhenotypeData(score_app_data);
            setPhenotypeData(get_phenotypes(score_app_data));
            setPathwayData(get_pathways(score_data));
        }
        else {
            setNoEntry(true);
        }
    }

    const fetchDownloadUrls = async (dataset_name,platform, pmid) => {
        let rest_url = 'dataset/search?platform='+platform+'&pmid='+pmid;
        if (dataset_name) {
            rest_url = 'dataset/'+dataset_name+'?platform='+platform+'&pmid='+pmid;
        }

        const dataset_data = await restApiCall(rest_url);
        if (dataset_data.results && dataset_data.results.length) {
            const scoring_files_urls = dataset_data.results[0].scoring_files_urls;
            if (scoring_files_urls) {
                const urls = get_download_list(scoring_files_urls)
                setPlatformDownloads(urls);
            }
        }
    }

    const fetchScoreMetrics = async () => {
        const score_metric_data = await restApiCall('performance/search?opgs_id='+score);
        const results = score_metric_data.results
        setMetricData(results);
        let radar_labels = [];
        let training_data = {}
        let validation_data = {}
        for (let i=0; i<results.length; i++) {
            const entry = results[i]
            let ancestry = entry.sample.ancestry_broad
            if (ancestry.includes(',')) {
                ancestry = 'Multi-ancestry';
            }
            else {
                if (ancestry.includes('Additional')) {
                    ancestry = ancestry.replace('Additional', 'Add.')
                }
                if (ancestry.includes(' Ancestries')) {
                    ancestry = ancestry.replace(' Ancestries', '')
                }
                if (ancestry == 'African American') {
                    ancestry = 'African';
                }
                if (ancestry.includes('American')) {
                    ancestry = ancestry.replace('American', 'Am.')
                }
            }
            const perf_type = entry.evaluation_type
            const perfs = entry.performance_metrics
            let r2_value = undefined;
            if (!radar_labels.includes(ancestry)) {
                radar_labels.push(ancestry)
            }
            for (let j=0; j<perfs.length; j++) {
                if (perfs[j].name_short == 'R2') {
                    r2_value = perfs[j].estimate;
                    break;
                }
            }
            if (r2_value) {
                if (perf_type == 'Training') {
                    if (!Object.keys(training_data).includes(ancestry)) {
                         training_data[ancestry] = [];
                    }
                    training_data[ancestry].push(r2_value);
                }
                else {
                    if (!Object.keys(validation_data).includes(ancestry)) {
                         validation_data[ancestry] = [];
                    }
                    validation_data[ancestry].push(r2_value);
                }
            }
        }
        consoleDev('>>>>>> TRAINING DATA:');
        consoleDev(training_data);
        consoleDev('>>>>>> VALIDATION DATA:');
        consoleDev(validation_data);

        // Build datasets for Radar
        const training_dataset = [];
        const validation_dataset = [];
        for (let i=0; i<radar_labels.length; i++) {
            const ancestry_label = radar_labels[i];
            // Training
            const anc_training_value = build_dataset(ancestry_label, training_data);
            training_dataset.push(anc_training_value);
            // Validation
            const anc_validation_value = build_dataset(ancestry_label, validation_data);
            validation_dataset.push(anc_validation_value);
        }

        // Only show radar if there is at least one dataset with more than 1 point
        let radar_data = { labels: radar_labels, datasets: [] }
        if (training_dataset.length > 1 || validation_dataset.length > 1) {
            if (training_dataset.length > 0) {
                radar_data.datasets.push({  label: 'Training', data: training_dataset })
            }
            if (validation_dataset.length > 0) {
                radar_data.datasets.push({  label: 'Validation', data: validation_dataset })
            }
            // consoleDev(radar_data);
            setRadarData(radar_data);
        }
    }

    const build_dataset = (ancestry_label,data) => {
        let anc_value = undefined;
        const sum_values = (total, num) => {
            return total + num;
        }
        const ancestry_list = Object.keys(data);
        if (ancestry_list.includes(ancestry_label)) {
            const values = data[ancestry_label];
            const value_counts = values.length;
            const anc_sum_value = data[ancestry_label].reduce(sum_values)
            if (value_counts > 1) {
                anc_value = anc_sum_value / value_counts;
            }
            else {
                anc_value = anc_sum_value < 0 ? 0 : anc_sum_value;
            }
        }
        return anc_value;
    }


    const display_trait_reported = () => {
        let reported_trait = '-'
        if (scoreData.trait_reported && scoreData.trait_reported != '' && scoreData.trait_reported != ' ') {
            reported_trait = scoreData.trait_reported;
            reported_trait += scoreData.trait_reported_id ? ' ('+scoreData.trait_reported_id+')':'';
        }
        else {
            if (scoreData.trait_reported_id) {
                reported_trait = scoreData.trait_reported_id;
            }
        }
        return reported_trait
    }


    const get_information_left_content = () => {
		return (
			<>
                { scoreData.name ? <tr><td>Score Name</td><td>{scoreData.name}</td></tr> : ''}
                { scoreData.publication ? <tr><td>Publication</td><td>{internal_publication_link(scoreData.publication,1)}</td></tr> : ''}
                <tr><td>Platform</td><td>{internal_platform_link(platformData,1)}</td></tr>
                <tr><td>Dataset</td><td>{ datasetName ? internal_dataset_link(datasetId, datasetName, 1) : internal_dataset_link(datasetId, undefined, 1) }</td></tr>
                { tissueData ? <tr><td>Tissue</td><td>{internal_tissue_link(tissueData,1)}</td></tr> : ''}
                <tr><td>Method</td><td>{scoreData.method_name}</td></tr>
                <tr><td>Reported Trait</td><td>{display_trait_reported()}</td></tr>
                <tr><td>Number of Variants</td><td>{numberBadge(scoreData.variants_number)}</td></tr>
                <tr><td>Genome Build</td><td>{scoreData.variants_genomebuild}</td></tr>
                <tr><td>Terms & Licenses</td><td>{scoreData.license}</td></tr>
            </>
        )
    }

    const get_information_right_content = () => {
		return (
			<>
                <MolecularTraitAssociation
                    genes={genesData}
                    transcripts={transcriptsData}
                    proteins={proteinsData}
                    metabolites={metabolitesData}
                    phenotypes={phenotypeData}
                    pathways={pathwayData}
                />
            </>
        )
    }

    const get_ancestry_dist = (type) => {
        let ancestry_list = []
        let ancestry_data = undefined;
        if (scoreData.ancestry) {
            if (type == 'dev') {
                if (scoreData.ancestry.dev.anc) {
                    ancestry_data = scoreData.ancestry.dev.anc;
                }
            }
            else {
                if (scoreData.ancestry.eval.anc) {
                    ancestry_data = scoreData.ancestry.eval.anc;
                }
            }
        }
        if (ancestry_data) {
            const ancestry_names = Object.keys(ancestry_data)
            ancestry_list = ancestry_names.map((anc_name) => ({
                "id": anc_name,
                "name": ancestry_label(anc_name),
                "count": ancestry_data[anc_name]['count'],
                "percent": ancestry_data[anc_name]['dist'],
                "anc_list": ancestry_data[anc_name]['anc_list'] ? ancestry_data[anc_name]['anc_list'] : undefined
            }));
        }
        return ancestry_list;
    }

    const ancestry_dist = (in_col) => {
        return (
            <>
                <div className={in_col ? "card p-0 mb-4" : "card p-0"}>
                    <div className="card-header"><h6 className="mb-0">Ancestry distribution</h6></div>
                    <div className="card-body p-2">
                        <div className='d-flex justify-content-center'>
                            { scoreData.ancestry.dev ?
                                <div>
                                    <div className="text-center small mb-1">Training</div>
                                    <AncestryDistribution data={get_ancestry_dist('dev')}/>
                                </div> : ''
                            }
                            { scoreData.ancestry.eval ?
                                <div>
                                    <div className="text-center small mb-1">Validation</div>
                                    <AncestryDistribution data={get_ancestry_dist('eval')}/>
                                </div> : ''
                            }
                        </div>
                    </div>
                </div>
                <AncestryLegend/>
            </>
        )
    }

    const performance_cols_ids = ['id','cohort_label','sample__ancestry_broad','sample__sample_number','evaluation_type'];
    const phenotype_cols_ids = ['phenotypes_LIST__id','data_values__adjusted_p-value'];

    useEffect(() => {
        fetchScoreData();
        fetchScoreMetrics();
    },[])


    return (
        <>
            { scoreData ?
                <>
                    {op_title('score', scoreData, score, 'id')}
                    <div>
                        {/* Summary data */}
                        <Header2Cards type_left='score' content_left={get_information_left_content()} content_right={get_information_right_content()} />
                        { scoreData.comment ? <div className='d-flex'><Note msg={<ToggleText text={scoreData.comment} limit='80' />} compact='1'/></div> : ''}
                        {/* Download buttons */}
                        { platformData && Object.keys(platformDownloads).length > 0 ?
                            <div>
                                <ToggleDiv key={'toggle_dowloads'} type='button_blue' class_name='card px-2 py-1' title={<><Download className='me-2'/>Downloads <small>(dataset {datasetId})</small></>} content={<DownloadList urls={platformDownloads}/>}/>
                            </div>:''
                        }
                        {/* Performance metrics table */}
                        { metricData && metricData.length ?
                            <div className='mt-5'>
                                {op_subtitle_no_asso('hl','Evaluations',metricData.length)}
                                {/* Ancestry distribution */}
                                { scoreData.ancestry ?
                                    <div className='ancestry_container d-flex mb-3'>
                                        { is_dev && radarData && Object.keys(radarData).length > 0 ?
                                            <div>{ancestry_dist(true)}</div> : <>{ancestry_dist()}</>
                                        }
                                        { is_dev && radarData && Object.keys(radarData).length > 0 ?
                                            // <div className='ms-3'>
                                            <div className='ancestry_container d-flex mb-3'>
                                                <div className="card p-0">
                                                    <div className="card-header"><h6 className="mb-0">Ancestry performance [<span style={{color:'#F55'}}>EXPERIMENTAL</span>]</h6></div>
                                                    <div className="card-body p-1">
                                                        <div className='d-flex justify-content-center'>
                                                            <OPRadar data={radarData}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : ''
                                        }
                                    </div>: ''
                                }
                                <DataTable key="performance_metrics" data={metricData} columns={performance_metrics_columns} hidden_columns={['platform__name','platform__platform_master__type']} col_for_ids={performance_cols_ids}/>
                            </div>:''
                        }
                        {/* Phenotype association table */}
                        { scorePhenotypeData && scorePhenotypeData.length ?
                            <div className='mt-5' id="phenotype_table">
                                {op_subtitle_no_asso('phenotype','Linked PheWAS data', scorePhenotypeData.length)}
                                <DataTable key="phenotype" data={scorePhenotypeData} columns={phenotype_score_cols} col_for_ids={phenotype_cols_ids} sorting='data_values__p-value' hidden_columns={['sample__ancestry_broad','var_gene_exp']}/>
                            </div>:''
                        }
                    </div>
                </>
                : noEntry ?
                    <>{ no_entry_found('score',score) }</> : loading_data()
            }
        </>
    );
}

export default Score;