import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Href from "../../components/Href";
import { FileEarmarkText } from 'react-bootstrap-icons';
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

    const fetchScoreData = async () => {
        const score_data = await restApiCall('score/'+score);
        console.log(score_data);
        setScoreData(score_data);
        setPlatformData(score_data.platform)
        setGenesData(score_data.genes)
        setTranscriptsData(score_data.transcripts)
        setProteinsData(score_data.proteins)
        setMetabolitesData(score_data.metabolites)
        const score_app_data = await restApiCall('applications_score/'+score);
        setPhecodeData(score_app_data.phecode)
    }

    useEffect(() => {
        fetchScoreData(); 
    },[])


    return (
        <>
            <h2 className='page_title'>Score <span>{score}</span></h2>
            <div className='d-flex'>
                <div className='me-4'>
                    <ul>
                        <li>Score Name: {scoreData.name ? scoreData.name: '-'}</li>
                        <li>Platform: <a href={'/Platform/'+platformData.name}>{platformData.name}</a></li>
                        <li>Method Name: {scoreData.method_name}</li>
                        <li>Genome Build: {scoreData.variants_genomebuild}</li>
                    </ul>
                    <ul>
                        <li>Genes:{" "}
                        {
                        genesData.length > 0 ? genesData.map((data) => <a href={'/Gene/'+data.name} key={data.name}>{data.name}</a>) : '-'
                        }
                        </li>
                        <li>Transcripts:{" "}
                        {
                        transcriptsData.length > 0 ? transcriptsData.map((data) => <span key={data.name}>{data.name}</span>) : '-'
                        }
                        </li>
                        <li>Proteins:{" "}
                        {
                        proteinsData.length > 0 ? proteinsData.map((data) => <span key={data.name}>{data.name} (<Href href={"/protein/"+data.external_id} text={data.external_id}/>)</span>) : '-'
                        }
                        </li>
                        <li>Metabolites:{" "}
                        {
                        metabolitesData.length > 0 ? metabolitesData.map((data) => <span key={data.name}>{data.name}</span>) : '-'
                        }
                        </li>
                    </ul>
                    <div className='mt-2'>Phecode: {phecodeData.name} (<a href={'/Phecode/'+phecodeData.id}>{phecodeData.id}</a>)</div>
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