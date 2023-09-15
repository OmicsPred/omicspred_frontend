import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from "../../../components/table/DataTableFromRestApi";
import { metabolomics_columns } from '../../../components/table/columns/metabolomics'
import { proteomics_columns } from '../../../components/table/columns/proteomics'
import { transcriptomics_columns } from '../../../components/table/columns/transcriptomics'
import restApiCall from '../../../components/RestAPI';


function PlatformRest() {
    let { platform } = useParams();
    const [platformData, setPlatformData] = useState([])

    const get_url_endpoint = (type) => {
        switch(type) {
            case 'Metabolomics':
                return "metabolomics/"+platform;
            case 'Proteomics':
                return "proteomics/"+platform;
            case 'Transcriptomics':
                return "transcriptomics/"+platform;
        }
    }

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


    const fetchPlatformData = async () => {
        const platform_data = await restApiCall('platform/'+platform);
        setPlatformData(platform_data);
    }


    useEffect(() => {
        const data = fetchPlatformData();
    },[])

    return (
        <>
            <h2 className='page_title'>Platform <span>{platformData.name}</span> <small style={{fontWeight:200}}>({platformData.type})</small></h2>
            <ul>
                <li>Long Name: {platformData.full_name}</li>
                <li>Version: {
                    platformData.version != '' ? platformData.version : '-'
                }</li>
                <li>Technic: {platformData.technic}</li>
                <li>#Scores: {platformData.scores_count}</li>
            </ul>
            <div className="mt-3 me-4 sm:mt-0 sm:ml-3">
                <a className="btn btn-primary shadow" href={"/plot/"+platformData.name} role="button">Go to Plots</a>
            </div>
            {platformData && platformData.type ? 
                <div className="mt-4">
                    <DataTableFromRestApi url_suffix={get_url_endpoint(platformData.type)} columns={get_table_columns(platformData.type)}/>
                </div>
                :
                <div>Loading ...</div>
            }
        </>
    );
}


export default PlatformRest