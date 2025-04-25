import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Download } from 'react-bootstrap-icons';
import DocumentTitle from '../../components/DocumentTitle';
import { internal_publication_link, tissue_link, op_title, op_subtitle_no_asso, no_entry_found, Header2Cards } from '../../components/Common';
import DataTable from '../../components/table/DataTable';
import { performance_metrics_columns } from '../../components/table/columns/score';
import { score_phenotype_columns } from '../../components/table/columns/phenotype';
import restApiCall from '../../components/RestAPI';
import restApiCallPaginated from '../../components/RestAPIPaginated';
import { ToogleDiv, ToogleText, loading_data, numberBadge, add_s_when_plural } from '../../components/Generic';
import { DownloadList, get_download_list } from '../../components/Downloads';
import { MolecularTraitAssociation } from '../MolecularTrait/components/components';
import AncestryDistribution from '../../components/ancestry/AncestryDistribution';
import AncestryLegend from '../../components/ancestry/AncestryLegend';
import { ancestry_label, omicspred_omics_type } from '../../components/Common';


function Score() {
    const { score } = useParams();
    DocumentTitle('Score '+score);
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
    const [platformDownloads, setPlatformDownloads] = useState({})


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
            const phenotype = data[i].phenotype;
            const phenotype_id = phenotype.id;
            if (!phenotype_ids_list.includes(phenotype_id)) {
                phenotype_ids_list.push(phenotype_id);
                phenotypes.push(phenotype);
            }
        }
        return phenotypes;
    }

    const fetchScoreData = async () => {
        const score_data = await restApiCall('score/'+score+'?include_pathway=1');
        console.log(score_data);
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
            const score_app_data = await restApiCallPaginated('applications_score/'+score);
            score_app_data.sort((a, b) => (a.phenotype.name > b.phenotype.name) ? 1 : -1)
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
        console.log(score_metric_data);
        setMetricData(score_metric_data.results);
    }

    const get_information_left_content = () => {
		return (
			<>
                { scoreData.name ? <tr><td>Score Name</td><td>{scoreData.name}</td></tr> : ''}
                { scoreData.publication ? <tr><td>Publication</td><td>{internal_publication_link(scoreData.publication)}</td></tr> : ''}
                <tr><td>Platform</td><td><a href={'/platform/'+platformData.name}>{platformData.name}</a>{platformData.version ? <span className='ms-1' title='Platform version'>({platformData.version})</span> : ''}<span className='mx-2'>-</span>{omicspred_omics_type(platformData.type)}</td></tr>
                { tissueData ? <tr><td>Tissue</td><td>{tissue_link(tissueData)}</td></tr> : ''}
                <tr><td>Dataset</td><td>{ datasetName ? datasetName+' ('+datasetId+')' : datasetId }</td></tr>
                <tr><td>Method Name</td><td>{scoreData.method_name}</td></tr>
                { scoreData.trait_reported ? <tr><td>Reported Trait</td><td>{scoreData.trait_reported}{scoreData.trait_reported_id ? ' ('+scoreData.trait_reported_id+')':''}</td></tr> : ''}
                <tr><td>Number of Variants</td><td>{numberBadge(scoreData.variants_number)}</td></tr>
                <tr><td>Genome Build</td><td>{scoreData.variants_genomebuild}</td></tr>
                {/* <tr><td>Scoring file</td><td><FileEarmarkText className="hl_color" size={24}/></td></tr> */}
                { scoreData.comment ? <tr><td>Comment</td><td><ToogleText text={scoreData.comment} limit='80' /></td></tr> : ''}
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

    const performance_cols_ids = ['id','cohort_label','sample__ancestry_broad','sample__sample_number','evaluation_type'];
    const phenotype_cols_ids = ['phenotype__id','cohort__name_short','data_values__FDR'];

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
                    {/* Download buttons */}
                    { platformData && Object.keys(platformDownloads).length > 0 ?
                        <div>
                            <ToogleDiv key={'toggle_dowloads'} type='button_blue' class_name='card px-2 py-1' title={<><Download className='me-2'/>Downloads <small>(at platform/dataset level)</small></>} content={<DownloadList urls={platformDownloads}/>}/>
                        </div>:''
                    }
                    {/* Performance metrics table */}
                    { metricData && metricData.length ?
                        <div className='mt-5'>
                            {op_subtitle_no_asso('hl','Evaluations',metricData.length)}
                            {/* Ancestry distribution */}
                            <div className='ancestry_container d-flex mb-3'>
                                <div className="card p-0">
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
                            </div>
                            <DataTable key="performance_metrics" data={metricData} columns={performance_metrics_columns} hidden_columns={{platform__name:false,platform__platform_master__type:false}} col_for_ids={performance_cols_ids}/>
                        </div>:''
                    }
                    {/* Phenotype association table */}
                    { scorePhenotypeData && scorePhenotypeData.length ?
                        <div className='mt-5' id="phenotype_table">
                            {op_subtitle_no_asso('phenotype',<>Linked phenotype{add_s_when_plural(scorePhenotypeData.length)}</>, scorePhenotypeData.length)}
                            <DataTable key="phenotype" data={scorePhenotypeData} columns={score_phenotype_columns} col_for_ids={phenotype_cols_ids} sorting='phenotype_name'/>
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