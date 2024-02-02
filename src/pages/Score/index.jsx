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

    // const get_estimate = (data, type) => {
    //     for (let i=0; i < data.length; i++) {
    //         const metric = data[i];
    //         if (metric.name_short == type) {
    //             return metric.estimate;
    //         }
    //     }
    // }

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
                            <div class="card-header"><h5 className="mb-0">Score information</h5></div>
                            <div className="card-body">
                                {/* <h4 className="card-title mb-2 pb-2">Score information</h4> */}
                                <div className="card-text">
                                    {/* <ul className='key_val_line' style={{marginBottom:"0px"}}>
                                        { scoreData.name ? <li><span className='line_key'>Score Name</span>{scoreData.name}</li> : '' }
                                        {
                                            scoreData.publication ? <li><span className='line_key'>Publication</span>{publication_link(scoreData.publication)}</li> : ''
                                        }
                                        <li><span className='line_key'>Platform</span><a href={'/platform/'+platformData.name}>{platformData.name}</a><span className={'ms-2 badge badge_'+platformData.type}>{platformData.type}</span></li>
                                        <li><span className='line_key'>Method Name</span>{scoreData.method_name}</li>
                                        <li><span className='line_key'>Number of Variants</span>{numberBadge(scoreData.variants_number)}</li>
                                        <li><span className='line_key'>Genome Build</span>{scoreData.variants_genomebuild}</li>
                                    </ul> */}
                                    <table className='table_card table_card_col_centered'>
                                        <tbody>
                                            { scoreData.name ? <tr><td>Score Name</td><td>{scoreData.name}</td></tr>:''}
                                            { scoreData.publication ? <tr><td>Publication</td><td>{publication_link(scoreData.publication)}</td></tr>:''}
                                            <tr><td>Platform</td><td><a href={'/platform/'+platformData.name}>{platformData.name}</a><span className={'ms-2 badge badge_'+platformData.type}>{platformData.type}</span></td></tr>
                                            <tr><td>Method Name</td><td>{scoreData.method_name}</td></tr>
                                            <tr><td>Number of Variants</td><td>{numberBadge(scoreData.variants_number)}</td></tr>
                                            <tr><td>Genome Build</td><td>{scoreData.variants_genomebuild}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3" style={{padding:"0px",maxWidth:"580px"}}>
                            <div class="card-header"><h5 className="mb-0">Associated data</h5></div>
                            <div className="card-body">
                                {/* <h4 className={"card-title mb-2 pb-2"}>Associated data</h4> */}
                                <div className="card-text">
                                    <table className='table_card'>
                                        <tbody>
                                            {
                                                genesData.length > 0 ? <tr><td><span className="bg_gene left_mark"></span>Gene{genesData.length > 1 && 's'}</td><td>{genesData.map((data,index) => <>{index ? ', ': ''}<Href href={data.name ? '/gene/'+data.name : '/gene/'+data.external_id} key={data.name ? data.name : data.external_id} text={data.name ? data.name : data.external_id}/></>)}</td></tr> : ''
                                            }
                                            {
                                                transcriptsData.length > 0 ? <tr><td><span className="bg_transcript left_mark"></span>Transcript{transcriptsData.length > 1 && 's'}</td><td>{transcriptsData.map((data, index) => <>{index ? ', ': ''}<span key={data.name}>{data.name}</span></>)}</td></tr> : ''
                                            }
                                            {
                                                proteinsData.length > 0 ? <tr><td><span className="bg_protein left_mark"></span>Protein{proteinsData.length > 1 && 's'}</td><td>{proteinsData.map((data, index) => <>{index ? ', ': ''}<span key={data.name}>{data.name} (<Href href={"/protein/"+data.external_id} text={data.external_id}/>)</span></>)}</td></tr> : ''
                                            }
                                            {
                                                metabolitesData.length > 0 ? <tr><td><span className="bg_metabolite left_mark"></span>Metabolite{metabolitesData.length > 1 && 's'}</td><td>{metabolitesData.map((data, index) => <>{index ? ', ': ''}<span key={data.name}>{data.name}</span></>)}</td></tr> : ''
                                            }

                                            {
                                                phecodeData && phecodeData.name ? <tr><td><span className="bg_phecode left_mark"></span>Phecode</td><td>{phecodeData.name} (<Href href={'/phecode/'+phecodeData.id} text={phecodeData.id}/>)</td></tr> : ''
                                            }
                                        </tbody>
                                    </table>
                                    {/* {
                                        genesData.length > 0 ? <div className='key_val_line mb-2'><span className="bg_gene px-1 py-1 me-2'></span><span className='line_key'>Gene{genesData.length > 1 && 's'}</span>{ genesData.map((data) => <a href={'/Gene/'+data.name} key={data.name}>{data.name}</a>)}</div> : ''
                                    }
                                    {
                                        transcriptsData.length > 0 ? <div className='key_val_line mb-2'><span className="bg_transcript px-1 py-1 me-2'></span><span className='line_key'>Transcript{transcriptsData.length > 1 && 's'}</span>{transcriptsData.map((data) => <span key={data.name}>{data.name}</span>)}</div> : ''
                                    }
                                    {
                                        proteinsData.length > 0 ? <div className='key_val_line mb-2'><span className="bg_protein px-1 py-1 me-2'></span><span className='line_key'>Protein{proteinsData.length > 1 && 's'}</span>{proteinsData.map((data) => <span key={data.name}>{data.name} (<Href href={"/protein/"+data.external_id} text={data.external_id}/>)</span>)}</div> : ''
                                    }
                                    {
                                        metabolitesData.length > 0 ? <div className='key_val_line mb-2'><span className="bg_metabolite px-1 py-1 me-2'></span><span className='line_key'>Metabolite{metabolitesData.length > 1 && 's'}</span>{metabolitesData.map((data) => <span key={data.name}>{data.name}</span>)}</div> : ''
                                    }
                                    { 
                                        phecodeData && phecodeData.name ? <div className='key_val_line mb-2'><span className="bg_phecode px-1 py-1 me-2'></span><span className='line_key'>Phecode</span>{phecodeData.name} (<Href href={'/phecode/'+phecodeData.id} text={phecodeData.id}/>)</div> : ''
                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column">
                        <div className="card" style={{padding:"0px",maxWidth:"580px"}}>
                            <div className="card-body">
                                <h4 className={"card-title mb-2 pb-2"}>Associated data</h4>
                                <div className="card-text">
                                    {
                                        genesData.length > 0 ? <div className='key_val_line mb-2'><span className="bg_gene px-1 py-1 me-2'></span><span className='line_key'>Gene{genesData.length > 1 && 's'}</span>{ genesData.map((data) => <a href={'/Gene/'+data.name} key={data.name}>{data.name}</a>)}</div> : ''
                                    }
                                    {
                                        transcriptsData.length > 0 ? <div className='key_val_line mb-2'><span className="bg_transcript px-1 py-1 me-2'></span><span className='line_key'>Transcript{transcriptsData.length > 1 && 's'}</span>{transcriptsData.map((data) => <span key={data.name}>{data.name}</span>)}</div> : ''
                                    }
                                    {
                                        proteinsData.length > 0 ? <div className='key_val_line mb-2'><span className="bg_protein px-1 py-1 me-2'></span><span className='line_key'>Protein{proteinsData.length > 1 && 's'}</span>{proteinsData.map((data) => <span key={data.name}>{data.name} (<Href href={"/protein/"+data.external_id} text={data.external_id}/>)</span>)}</div> : ''
                                    }
                                    {
                                        metabolitesData.length > 0 ? <div className='key_val_line mb-2'><span className="bg_metabolite px-1 py-1 me-2'></span><span className='line_key'>Metabolite{metabolitesData.length > 1 && 's'}</span>{metabolitesData.map((data) => <span key={data.name}>{data.name}</span>)}</div> : ''
                                    }
                                    { 
                                        phecodeData && phecodeData.name ? <div className='key_val_line mb-2'><span className="bg_phecode px-1 py-1 me-2'></span><span className='line_key'>Phecode</span>{phecodeData.name} (<Href href={'/phecode/'+phecodeData.id} text={phecodeData.id}/>)</div> : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                 */}

                    {/* <h5>Score information:</h5>
                    <ul className='key_val_line'>
                        { scoreData.name ? <li><span className='line_key'>Score Name</span>{scoreData.name}</li> : '' }
                        {
                            scoreData.publication ? <li><span className='line_key'>Publication</span>{publication_link(scoreData.publication)}</li> : ''
                        }
                        <li><span className='line_key'>Platform</span><a href={'/platform/'+platformData.name}>{platformData.name}</a><span className={'ms-2 badge badge_'+platformData.type}>{platformData.type}</span></li>
                        <li><span className='line_key'>Method Name</span>{scoreData.method_name}</li>
                        <li><span className='line_key'>Number of Variants</span>{numberBadge(scoreData.variants_number)}</li>
                        <li><span className='line_key'>Genome Build</span>{scoreData.variants_genomebuild}</li>
                    </ul> */}
                    
                    {/* <h5 className='mt-4'>Associated data:</h5>
                    {
                        genesData.length > 0 ? <div className='key_val_line mb-1 ms-3'><span className="bg_gene px-1 py-1 me-2'></span><span className='line_key'>Gene{genesData.length > 1 && 's'}</span>{ genesData.map((data) => <a href={'/Gene/'+data.name} key={data.name}>{data.name}</a>)}</div> : ''
                    }
                    {
                        transcriptsData.length > 0 ? <div className='key_val_line mb-1 ms-3'><span className="bg_transcript px-1 py-1 me-2'></span><span className='line_key'>Transcript{transcriptsData.length > 1 && 's'}</span>{transcriptsData.map((data) => <span key={data.name}>{data.name}</span>)}</div> : ''
                    }
                    {
                        proteinsData.length > 0 ? <div className='key_val_line mb-1 ms-3'><span className="bg_protein px-1 py-1 me-2'></span><span className='line_key'>Protein{proteinsData.length > 1 && 's'}</span>{proteinsData.map((data) => <span key={data.name}>{data.name} (<Href href={"/protein/"+data.external_id} text={data.external_id}/>)</span>)}</div> : ''
                    }
                    {
                        metabolitesData.length > 0 ? <div className='key_val_line mb-1 ms-3'><span className="bg_metabolite px-1 py-1 me-2'></span><span className='line_key'>Metabolite{metabolitesData.length > 1 && 's'}</span>{metabolitesData.map((data) => <span key={data.name}>{data.name}</span>)}</div> : ''
                    }
                    { 
                        phecodeData && phecodeData.name ? <div className='key_val_line mb-1 ms-3'><span className="bg_phecode px-1 py-1 me-2'></span><span className='line_key'>Phecode</span>{phecodeData.name} (<Href href={'/phecode/'+phecodeData.id} text={phecodeData.id}/>)</div> : ''
                    } */}
                </div>
                
                <div className='mt-4'>   
                    <h5>Evaluations:</h5>
                    <div className='d-flex mt-3'>
                        <DataTable key="score" data={metricData} columns={score_columns}/>
                    </div>
                    
                </div>
                {/* <div className="ms-4">
                    <a className="btn btn-outline-primary shadow" href="/scores" role="button">
                        <FileEarmarkText  size={24}/>
                        <div>Download file</div>
                    </a>
                </div> */}
            </div>
        </>
    );
}

export default Score;