import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileEarmarkText } from 'react-bootstrap-icons';
import Href from "../../components/Href";
import { internal_publication_link, op_title } from '../../components/Common';
import DataTable from "../../components/table/DataTable";
import { score_columns } from '../../components/table/columns/score'
import restApiCall from '../../components/RestAPI';
import { ToogleDiv, numberBadge } from '../../components/Generic';
import { display_gene_link, display_protein_link, display_metabolite_link, display_pathway_link } from '../MolecularTrait/components/links';


function Score() {
    const { score } = useParams();

    const [scoreData, setScoreData] = useState([])
    const [platformData, setPlatformData] = useState([])
    const [genesData, setGenesData] = useState([])
    const [transcriptsData, setTranscriptsData] = useState([])
    const [metabolitesData, setMetabolitesData] = useState([])
    const [proteinsData, setProteinsData] = useState([])
    const [phecodeData, setPhecodeData] = useState([])
    const [pathwayData, setPathwayData] = useState([])
    const [metricData, setMetricData] = useState([])

    const display_phecode_link = (phecode) => {
        let id = phecode.id;
        id = id.replace('.','_');
        return <span key={phecode.id}>{phecode.name} (<Href href={'/phecode/'+id} text={phecode.id}/>)</span>
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

    const fetchScoreData = async () => {
        const score_data = await restApiCall('score/'+score+'?include_pathway=1');
        console.log(score_data);
        setScoreData(score_data);
        setPlatformData(score_data.platform);
        setGenesData(score_data.genes);
        setTranscriptsData(score_data.transcripts);
        setProteinsData(score_data.proteins);
        setMetabolitesData(score_data.metabolites);
        const score_app_data = await restApiCall('applications_score/'+score);
        setPhecodeData(score_app_data.phecode);
        setPathwayData(get_pathways(score_data));
    }

    const fetchScoreMetrics = async () => {
        const score_metric_data = await restApiCall('performance/search?opgs_id='+score);
        console.log(score_metric_data);
        setMetricData(score_metric_data.results);
    }

    useEffect(() => {
        fetchScoreData(); 
        fetchScoreMetrics();
    },[])


    return (
        <>
            {op_title('score', scoreData, score, 'id')}
            <div>
                <div className='d-flex'>
                    <div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column me-4">
                        <div className="card mb-3 me-5" style={{padding:"0px",maxWidth:"800px"}}>
                            <div className="card-header"><h5 className="mb-0">Score information</h5></div>
                            <div className="card-body">
                                <div className="card-text">
                                    <table className='table_card table_card_col_centered'>
                                        <tbody>
                                            { scoreData.name ? <tr><td>Score Name</td><td>{scoreData.name}</td></tr>:''}
                                            { scoreData.publication ? <tr><td>Publication</td><td>{internal_publication_link(scoreData.publication)}</td></tr>:''}
                                            <tr><td>Platform</td><td><a href={'/platform/'+platformData.name}>{platformData.name}</a>{platformData.version ? <span className='ms-1'>{platformData.version}</span> : ''}<span className={'ms-2 badge badge_'+platformData.type}>{platformData.type}</span></td></tr>
                                            <tr><td>Method Name</td><td>{scoreData.method_name}</td></tr>
                                            <tr><td>Number of Variants</td><td>{numberBadge(scoreData.variants_number)}</td></tr>
                                            <tr><td>Genome Build</td><td>{scoreData.variants_genomebuild}</td></tr>
                                            {/* <tr><td>Scoring file</td><td><FileEarmarkText className="hl_color" size={24}/></td></tr> */}
                                            <tr><td>Terms & Licenses</td><td>{scoreData.license}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3" style={{padding:"0px",maxWidth:"580px"}}>
                            <div className="card-header"><h5 className="mb-0">Associated data</h5></div>
                            <div className="card-body">
                                <div className="card-text">
                                    <table className='table_card'>
                                        <tbody>
                                            {
                                                genesData.length > 0 ? <tr><td><span className="bg_gene left_mark"></span>Gene{genesData.length > 1 && 's'}</td><td key='genes_data'>{genesData.map((data,index) => display_gene_link(data,index))}</td></tr> : ''
                                            }
                                            {
                                                transcriptsData.length > 0 ? <tr key='transcripts'><td><span className="bg_transcript left_mark"></span>Transcript{transcriptsData.length > 1 && 's'}</td><td>{transcriptsData.map((data, index) => <span key={'trans_'+data.name}>{index ? ', ': ''}<span key={data.name}>{data.name}</span></span>)}</td></tr> : ''
                                            }
                                            {
                                                proteinsData.length > 0 ? <tr key='proteins'><td><span className="bg_protein left_mark"></span>Protein{proteinsData.length > 1 && 's'}</td><td>{proteinsData.map((data, index) => display_protein_link(data,index))}</td></tr> : ''
                                            }
                                            {
                                                metabolitesData.length > 0 ? <tr key='metabolites'><td><span className="bg_metabolite left_mark"></span>Metabolite{metabolitesData.length > 1 && 's'}</td><td>{metabolitesData.map((data, index) => display_metabolite_link(data,index))}</td></tr> : ''
                                            }
                                            {
                                                phecodeData && phecodeData.name ? <tr key='phenotypes'><td><span className="bg_phecode left_mark"></span>Phecode</td><td>{display_phecode_link(phecodeData)}</td></tr> : ''
                                            }
                                            {
                                                pathwayData && pathwayData.length > 0 ? <tr key='pathways'><td><span className="bg_pathway left_mark"></span>Pathway{pathwayData.length > 1 && 's'}</td><td>
                                                    {
                                                        pathwayData.length > 1 ?
                                                            <ToogleDiv key={'toggle_pathways'} title={pathwayData.length+' associated pathways'} content={pathwayData.map((data, index) => display_pathway_link(data,index,1))}/>
                                                            : pathwayData.map((data, index) => display_pathway_link(data,index))
                                                    }
                                                    </td></tr> : ''
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-4'>   
                    <h5>Evaluations:</h5>
                    <div className='d-flex mt-3'>
                        <DataTable key="score" data={metricData} columns={score_columns}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Score;