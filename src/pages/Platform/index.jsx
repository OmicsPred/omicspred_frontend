import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from "../../components/table/DataTable";
import { metabolomics_columns } from '../../components/table/columns/metabolomics'
import { proteomics_columns } from '../../components/table/columns/proteomics'
import { transcriptomics_columns } from '../../components/table/columns/transcriptomics'
import restApiCall from '../../components/RestAPI';


function Platform() {
    let { platform } = useParams();
    const [platformSumData, setPlatformSumData] = useState([])
    const [platformTableData, setPlatformTableData] = useState([])

    const platform_file_name = platform.replace(" ", "_");

    const data_file = '/src/data/'+platform_file_name+'_table.json';

    console.log(data_file);

    const get_table_columns = (type) => {
        console.log('get_table_columns: |'+type+'|')
        let columns = [];
        switch(type) {
            case 'Metabolomics':
                if (platform in metabolomics_columns) {
                    return metabolomics_columns[platform];
                }
            case 'Proteomics':
                if (platform in proteomics_columns) {
                    return proteomics_columns[platform];
                }
            case 'Transcriptomics':
                if (platform in transcriptomics_columns) {
                    return transcriptomics_columns[platform];
                }
            default:
                columns = [];
        }
        return columns
    }


    const fetchPlatformSumData = async () => {
        const platform_sum_data = await restApiCall('platform/'+platform);
        setPlatformSumData(platform_sum_data);
    }

    const fetchPlatformTableData = async () => {
        const platform_table_data = await fetch(data_file)
            .then(response => {
                return response.json()
            })
        setPlatformTableData(platform_table_data);
    }

    useEffect(() => {
        fetchPlatformSumData();
        fetchPlatformTableData();
    },[])

    return (
        <>
            <h2 className='page_title'>Platform <span>{platformSumData.name}</span> <small style={{fontWeight:200}}>({platformSumData.type})</small></h2>
            <ul>
                <li>Long Name: {platformSumData.full_name}</li>
                <li>Version: {
                    platformSumData.version != '' ? platformSumData.version : '-'
                }</li>
                <li>Technic: {platformSumData.technic}</li>
                <li>#Scores: {platformSumData.scores_count}</li>
            </ul>
            <div className="mt-3 me-4 sm:mt-0 sm:ml-3">
                <a className="btn btn-primary shadow" href={"/plot/"+platformSumData.name} role="button">Go to Plots</a>
            </div>
            {platformSumData && platformSumData.type && platformTableData ? 
                <div className="mt-4">
                    <DataTable data={platformTableData} columns={get_table_columns(platformSumData.type)}/>
                </div>
                :
                <div>Loading ...</div>
            }
        </>
    );
}


export default Platform