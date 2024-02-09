import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Href from "../../components/Href";
import { FileEarmarkText } from 'react-bootstrap-icons';
import DataTable from "../../components/table/DataTable";
import { score_columns } from '../../components/table/columns/score'
import restApiCall from '../../components/RestAPI';
import { numberBadge } from '../../components/Generic';


function Score() {
    const { score } = useParams();

    const [scoreData, setScoreData] = useState([])
    const [platformData, setPlatformData] = useState([])
    const [genesData, setGenesData] = useState([])
    const [transcriptsData, setTranscriptsData] = useState([])
    const [metabolitesData, setMetabolitesData] = useState([])
    const [proteinsData, setProteinsData] = useState([])
    const [phecodeData, setPhecodeData] = useState([])
    const [metricData, setMetricData] = useState([])

    const fetchScoreData = async () => {
        const score_data = await restApiCall('score/'+score);
        console.log(score_data);
        setScoreData(score_data);
        setPlatformData(score_data.platform);
        setGenesData(score_data.genes);
        setTranscriptsData(score_data.transcripts);
        setProteinsData(score_data.proteins);
        setMetabolitesData(score_data.metabolites);
        const score_app_data = await restApiCall('applications_score/'+score);
        setPhecodeData(score_app_data.phecode);
    }

    const fetchScoreMetrics = async () => {
        const score_metric_data = await restApiCall('performance/search?opgs_id='+score);
        console.log(score_metric_data);
        setMetricData(score_metric_data.results);
    }

    const publication_link = (publication) => {
        let firstauthor = publication.firstauthor;
        let doi = publication.doi;
        let journal = publication.journal;
        let year = publication.date_publication.split('-')[0];

        return(
            <Href href={process.env.URL_ROOT_DOI+doi} text={firstauthor+' et al. '+journal+' ('+year+')'}/>
        )
    }

    useEffect(() => {
        fetchScoreData(); 
        fetchScoreMetrics();
    },[])


    return (
        <>
            <h2 className='page_title'>Score <span>{score}</span></h2>
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
                                            { scoreData.publication ? <tr><td>Publication</td><td>{publication_link(scoreData.publication)}</td></tr>:''}
                                            <tr><td>Platform</td><td><a href={'/platform/'+platformData.name}>{platformData.name}</a>{platformData.version ? <span className='ms-1'>{platformData.version}</span> : ''}<span className={'ms-2 badge badge_'+platformData.type}>{platformData.type}</span></td></tr>
                                            <tr><td>Method Name</td><td>{scoreData.method_name}</td></tr>
                                            <tr><td>Number of Variants</td><td>{numberBadge(scoreData.variants_number)}</td></tr>
                                            <tr><td>Genome Build</td><td>{scoreData.variants_genomebuild}</td></tr>
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
                                                genesData.length > 0 ? <tr><td><span className="bg_gene left_mark"></span>Gene{genesData.length > 1 && 's'}</td><td key='genes_data'>{genesData.map((data,index) => <span key={'gene_'+data.name ? data.name : data.external_id}>{index ? ', ': ''}<Href href={data.name ? '/gene/'+data.name : '/gene/'+data.external_id} key={'link'+data.name ? data.name : data.external_id} text={data.name ? data.name : data.external_id}/></span>)}</td></tr> : ''
                                            }
                                            {
                                                transcriptsData.length > 0 ? <tr key='transcripts'><td><span className="bg_transcript left_mark"></span>Transcript{transcriptsData.length > 1 && 's'}</td><td>{transcriptsData.map((data, index) => <span key={'trans_'+data.name}>{index ? ', ': ''}<span key={data.name}>{data.name}</span></span>)}</td></tr> : ''
                                            }
                                            {
                                                proteinsData.length > 0 ? <tr key='proteins'><td><span className="bg_protein left_mark"></span>Protein{proteinsData.length > 1 && 's'}</td><td>{proteinsData.map((data, index) => <span key={'protein_'+data.name}>{index ? ', ': ''}<span key={data.name}>{data.name} (<Href href={"/protein/"+data.external_id} text={data.external_id}/>)</span></span>)}</td></tr> : ''
                                            }
                                            {
                                                metabolitesData.length > 0 ? <tr key='metabolites'><td><span className="bg_metabolite left_mark"></span>Metabolite{metabolitesData.length > 1 && 's'}</td><td>{metabolitesData.map((data, index) => <span key={'metabo_'+data.name}>{index ? ', ': ''}<span key={data.name}>{data.name}</span></span>)}</td></tr> : ''
                                            }
                                            {
                                                phecodeData && phecodeData.name ? <tr key='phenotypes'><td><span className="bg_phecode left_mark"></span>Phecode</td><td>{phecodeData.name} (<Href href={'/phecode/'+phecodeData.id} text={phecodeData.id} key={phecodeData.id}/>)</td></tr> : ''
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