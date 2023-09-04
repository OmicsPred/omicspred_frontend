import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Href from "../../components/Href";
import { FileEarmarkText } from 'react-bootstrap-icons';
import DataTable from "../../components/table/DataTable";
import { score_columns } from '../../components/table/columns/score'
import restApiCall from '../../components/RestAPI';

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

    const get_estimate = (data, type) => {
        for (let i=0; i < data.length; i++) {
            const metric = data[i];
            if (metric.name_short == type) {
                return metric.estimate;
            }
        }
    }

    useEffect(() => {
        fetchScoreData(); 
        fetchScoreMetrics();
    },[])


    return (
        <>
            <h2 className='page_title'>Score <span>{score}</span></h2>
            <div className='d-flex'>
                <div className='me-4'>
                    <ul>
                        <li>Score Name: {scoreData.name ? scoreData.name: '-'}</li>
                        <li>Platform: <a href={'/Platform/'+platformData.name}>{platformData.name}</a> <small>({platformData.type}</small>)</li>
                        <li>Method Name: {scoreData.method_name}</li>
                        <li># SNP: {scoreData.variants_number}</li>
                        <li>Genome Build: {scoreData.variants_genomebuild}</li>
                    </ul>
                    <h5 className='mt-4'>Associated data:</h5>
                    <ul>
                        
                        {
                            genesData.length > 0 ? <li>Genes: { genesData.map((data) => <a href={'/Gene/'+data.name} key={data.name}>{data.name}</a>)}</li> : ''
                        }
                        {
                            transcriptsData.length > 0 ? <li>Transcripts: {transcriptsData.map((data) => <span key={data.name}>{data.name}</span>)}</li> : ''
                        }
                        {
                            proteinsData.length > 0 ? <li>Proteins: {proteinsData.map((data) => <span key={data.name}>{data.name} (<Href href={"/protein/"+data.external_id} text={data.external_id}/>)</span>)}</li> : ''
                        }
                        {
                            metabolitesData.length > 0 ? <li>Metabolites: {metabolitesData.map((data) => <span key={data.name}>{data.name}</span>)}</li> : ''
                        }
                        { 
                            phecodeData && phecodeData.name ? <li>Phecode: {phecodeData.name} (<a href={'/Phecode/'+phecodeData.id}>{phecodeData.id}</a>)</li> : ''
                        }
                    </ul>
                    <h5 className='mt-4'>Evaluations:</h5>
                    <DataTable data={metricData} columns={score_columns}/>
                </div>
                <div className="ms-4">
                    <a className="btn btn-outline-primary shadow" href="/Scores" role="button">
                        <FileEarmarkText  size={24}/>
                        <div>Download file</div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Score