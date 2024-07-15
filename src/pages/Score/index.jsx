import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileEarmarkArrowDown } from 'react-bootstrap-icons';
import Href from "../../components/Href";
import { internal_publication_link, op_title, op_subtitle_no_asso, display_information_2_cards, no_entry_found } from '../../components/Common';
import DataTable from "../../components/table/DataTable";
import { score_columns } from '../../components/table/columns/score'
import { score_phecode_columns } from '../../components/table/columns/phecode'
import restApiCall from '../../components/RestAPI';
import restApiCallPaginated from '../../components/RestAPIPaginated';
import { ToogleDiv, loading_data, numberBadge } from '../../components/Generic';
import { display_gene_link, display_protein_link, display_metabolite_link, display_pathways } from '../MolecularTrait/components/links';
import { DownloadList, get_download_list } from '../../components/Downloads';


function Score() {
    const { score } = useParams();

    const [scoreData, setScoreData] = useState()
    const [noEntry, setNoEntry] = useState(false)
    const [platformData, setPlatformData] = useState([])
    const [genesData, setGenesData] = useState([])
    const [transcriptsData, setTranscriptsData] = useState([])
    const [metabolitesData, setMetabolitesData] = useState([])
    const [proteinsData, setProteinsData] = useState([])
    const [scorePhecodeData, setScorePhecodeData] = useState([])
    const [phecodeData, setPhecodeData] = useState([])
    const [pathwayData, setPathwayData] = useState([])
    const [metricData, setMetricData] = useState([])
    const [platformDownloads, setPlatformDownloads] = useState([])

    const display_phecode_link = (phecode, data_size) => {
        let id = phecode.id;
        id = id.replace('.','_');
        if (data_size > 1) {
            return <li key={phecode.id}><small><span key={phecode.id}>{phecode.name} (<Href href={'/phecode/'+id} text={phecode.id}/>)</span></small></li>
        }
        else {
            return <span key={phecode.id}>{phecode.name} (<Href href={'/phecode/'+id} text={phecode.id}/>)</span>
        }
    }

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

    const get_phecodes = (data) => {
        let phecodes = [];
        let phecode_ids_list = [];
        for (let i=0; i < data.length; i++) {
            const phecode = data[i].phecode;
            const phecode_id = phecode.id;
            if (!phecode_ids_list.includes(phecode_id)) {
                phecode_ids_list.push(phecode_id);
                phecodes.push(phecode);
            }
        }
        return phecodes;
    }

    const display_phecode_data = () => {
        if (phecodeData.length>1) {
            return(<ul>{phecode_data_list()}</ul>)
        }
        else {
            return(<>{phecode_data_list()}</>)
        }
    }

    const phecode_data_list = (is_multiple) => {

        return (phecodeData.map((data) => display_phecode_link(data,phecodeData.length)))
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
                console.log(']] platform.name: '+platform.name)
                fetchDownloadUrls(score_data.dataset_name,platform.name,publication.pmid)
            }
            setGenesData(score_data.genes);
            setTranscriptsData(score_data.transcripts);
            setProteinsData(score_data.proteins);
            setMetabolitesData(score_data.metabolites);
            const score_app_data = await restApiCallPaginated('applications_score/'+score);
            score_app_data.sort((a, b) => (a.phecode.name > b.phecode.name) ? 1 : -1)
            setScorePhecodeData(score_app_data);
            setPhecodeData(get_phecodes(score_app_data));
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
                { scoreData.name ? <tr><td>Score Name</td><td>{scoreData.name}</td></tr>:''}
                { scoreData.publication ? <tr><td>Publication</td><td>{internal_publication_link(scoreData.publication)}</td></tr>:''}
                <tr><td>Platform</td><td><a href={'/platform/'+platformData.name}>{platformData.name}</a>{platformData.version ? <span className='ms-1'>{platformData.version}</span> : ''}<span className={'ms-2 badge badge_'+platformData.type}>{platformData.type}</span></td></tr>
                <tr><td>Method Name</td><td>{scoreData.method_name}</td></tr>
                { scoreData.trait_reported ? <tr><td>Reported Trait</td><td>{scoreData.trait_reported}</td></tr>:''}
                <tr><td>Number of Variants</td><td>{numberBadge(scoreData.variants_number)}</td></tr>
                <tr><td>Genome Build</td><td>{scoreData.variants_genomebuild}</td></tr>
                {/* <tr><td>Scoring file</td><td><FileEarmarkText className="hl_color" size={24}/></td></tr> */}
                <tr><td>Terms & Licenses</td><td>{scoreData.license}</td></tr>
            </>
        )
    }

    const get_information_right_content = () => {
		return (
			<>
                { genesData.length > 0 ? <tr><td><span className="bg_gene left_mark"></span>Gene{genesData.length > 1 && 's'}</td><td key='genes_data'>{genesData.map((data,index) => display_gene_link(data,index))}</td></tr> : '' }
                { transcriptsData.length > 0 ? <tr key='transcripts'><td><span className="bg_transcript left_mark"></span>Transcript{transcriptsData.length > 1 && 's'}</td><td>{transcriptsData.map((data, index) => <span key={'trans_'+data.name}>{index ? ', ': ''}<span key={data.name}>{data.name}</span></span>)}</td></tr> : '' }
                { proteinsData.length > 0 ? <tr key='proteins'><td><span className="bg_protein left_mark"></span>Protein{proteinsData.length > 1 && 's'}</td><td>{proteinsData.map((data, index) => display_protein_link(data,index))}</td></tr> : '' }
                { metabolitesData.length > 0 ? <tr key='metabolites'><td><span className="bg_metabolite left_mark"></span>Metabolite{metabolitesData.length > 1 && 's'}</td><td>{metabolitesData.map((data, index) => display_metabolite_link(data,index))}</td></tr> : '' }
                {
                    phecodeData && phecodeData.length ? <tr key='phenotypes'><td><span className="bg_phecode left_mark"></span>PheWAS</td><td>
                        {
                            phecodeData.length > 1 ?
                                <ToogleDiv key={'toggle_phecodes'} title={<><span className='font-bold'>{phecodeData.length}</span> associated PheCode entries</>} content={display_phecode_data()}/>
                                : <>{display_phecode_data()}</>
                        }
                        </td></tr> : ''
                }
                {
                    pathwayData && pathwayData.length > 0 ? display_pathways(pathwayData) : ''
                }
            </>
        )
    }

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
                    { display_information_2_cards('score',get_information_left_content(),'Associated data',get_information_right_content()) }

                    {/* Download buttons */}
                    { platformData && platformDownloads ?
                        <div>
                            <ToogleDiv key={'toggle_dowloads'} type='button_blue' class_name='card px-2 py-1' title={<><FileEarmarkArrowDown className='me-1'/>Downloads <small>(at platform level)</small></>} content={<DownloadList urls={platformDownloads}/>}/>
                        </div>:''
                    }
                    {/* Performance metrics table */}
                    { metricData && metricData.length ?
                        <div className='mt-5'>
                            {op_subtitle_no_asso('hl','Evaluations',metricData.length)}
                            <div className='d-flex'>
                                <DataTable key="score" data={metricData} columns={score_columns}/>
                            </div>
                        </div>:''
                    }
                    {/* PheWAS association table */}
                    { scorePhecodeData && scorePhecodeData.length ?
                        <div className='mt-5'>
                            {op_subtitle_no_asso('phecode','Associated PheWAS', scorePhecodeData.length)}
                            <div className='d-flex'>
                                <DataTable key="phecode" data={scorePhecodeData} columns={score_phecode_columns}/>
                            </div>
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