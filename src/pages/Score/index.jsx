import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Href from "../../components/Href";
import restApiCall from '../../components/RestAPI';

function Score() {
    const { score } = useParams();

    const [scoreData, setScoreData] = useState([])
    const [platformData, setPlatformData] = useState([])
    const [genesData, setGenesData] = useState([])
    const [transcriptsData, setTranscriptsData] = useState([])
    const [metabolitesData, setMetabolitesData] = useState([])
    const [proteinsData, setProteinsData] = useState([])

    const fetchScoreData = async () => {
        const score_data = await restApiCall('score/'+score);
        console.log(score_data);
        setScoreData(score_data);
        setPlatformData(score_data.platform)
        setGenesData(score_data.genes)
        setTranscriptsData(score_data.transcripts)
        setProteinsData(score_data.proteins)
        setMetabolitesData(score_data.metabolites)
    }

    useEffect(() => {
        fetchScoreData(); 
    },[])


    return (
        <>
            <h2 className='mb-3'>Score {score}</h2>
            <ul>
                <li>Score Name: {scoreData.name}</li>
                {/* <li>Platform: {scoreData.platform.name}</li> */}
                <li>Platform: {platformData.name}</li>
                <li>Method Name: {scoreData.method_name}</li>
                <li>Genome Build: {scoreData.variants_genomebuild}</li>
            </ul>
            <ul>
                <li>Genes:{" "} 
                {
                   genesData.length > 0 ? genesData.map((data) => <span key={data.name}>{data.name}</span>) : '-'
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
            {/* <ul>
                <li>Genes:{" "} 
                {
                    scoreData.genes.map((data, index) => <span key={data.name}>{data.name}</span>)
                }
                </li>
                <li>Transcripts:{" "} 
                {
                    scoreData.transcripts.map((data, index) => <span key={data.name}>{data.name}</span>)
                }
                </li>
                <li>Proteins:{" "} 
                {
                    scoreData.proteins.map((data, index) => <span key={data.name}>{data.name} (<Href href={"/protein/"} text={data.external_id}/>)</span>)
                }
                </li> 
                <li>Metabolites:{" "} 
                {
                    scoreData.metabolites.map((data, index) => <span key={data.name}>{data.name} ({data.external_id})</span>)
                }
                </li> 
            </ul> */}
        </>
    )
}

export default Score