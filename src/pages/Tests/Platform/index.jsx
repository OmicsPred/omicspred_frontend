import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { metabolomics_columns,metabolomics_column_groups } from '../../../components/table/columns/metabolomics'
import { proteomics_columns, proteomics_column_groups } from '../../../components/table/columns/proteomics'
import { transcriptomics_columns, transcriptomics_column_groups } from '../../../components/table/columns/transcriptomics'
import restApiCall from '../../../components/RestAPI';

import DataTableServer from '../../../components/table/DataTableServer';

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

    const get_table_column_groups = (type) => {
        console.log('get_table_column_groups: |'+type+'|')
        let col_groups = [];
        switch(type) {
            case 'Metabolomics':
                if (platform in metabolomics_column_groups) {
                    return metabolomics_column_groups[platform];
                }
            case 'Proteomics':
                if (platform in proteomics_column_groups) {
                    return proteomics_column_groups[platform];
                }
            case 'Transcriptomics':
                if (platform in transcriptomics_column_groups) {
                    return transcriptomics_column_groups[platform];
                }
            default:
                col_groups = [];
        }
        return col_groups;
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
                <li key="name">Long Name: {platformData.full_name}</li>
                <li key="version">Version: {
                    platformData.version != '' ? platformData.version : '-'
                }</li>
                <li key="technic">Technic: {platformData.technic}</li>
                <li key="nb_scores">#Scores: {platformData.scores_count}</li>
            </ul>
            <div className="mt-3 me-4 sm:mt-0 sm:ml-3">
                <a className="btn btn-primary shadow" href={"/plot/"+platformData.name} role="button">Go to Plots</a>
            </div>
            {platformData && platformData.type ? 
                <div className="mt-4">
                    <DataTableServer url_suffix={get_url_endpoint(platformData.type)} columns={get_table_columns(platformData.type)} groups={get_table_column_groups(platformData.type)}/>
                </div>
                :
                <div>Loading ...</div>
            }
        </>
    );
}


export default PlatformRest