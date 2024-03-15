import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from "../../../components/table/DataTableFromRestApi";
import { metabolomics_columns, metabolomics_column_groups } from '../../../components/table/columns/metabolomics'
import restApiCall from '../../../components/RestAPI';

function Metabolomics() {
    let { platform } = useParams();
    const [platformData, setPlatformData] = useState([])

    const url_suffix = "metabolomics/"+platform;

    const fetchSummaryData = async () => {
        const platform_data = await restApiCall('platform/'+platform);
        setPlatformData(platform_data);
    }

    useEffect(() => {
        fetchSummaryData();
    },[])

    return (
        <>
            <h2 className='page_title'>Metabolomics Platform <span>{platformData.name}</span></h2>
            <ul>
                <li>Long Name: {platformData.full_name}</li>
                <li>Version: {
                    platformData.version != '' ? platformData.version : '-'
                }</li>
                <li>Technic: {platformData.technic}</li>
                <li>#Scores: {platformData.scores_count}</li>
            </ul>
            <div className="mt-4">
                <DataTableFromRestApi table_key={platformData.type} url_suffix={url_suffix} columns={metabolomics_columns[platform]} groups={metabolomics_column_groups[platform]}/>
            </div>
        </>
    );
}


export default Metabolomics