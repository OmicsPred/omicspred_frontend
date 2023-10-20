import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from "../../components/table/DataTable";
import { metabolomics_columns,metabolomics_column_groups } from '../../components/table/columns/metabolomics'
import { proteomics_columns, proteomics_column_groups } from '../../components/table/columns/proteomics'
import { transcriptomics_columns, transcriptomics_column_groups } from '../../components/table/columns/transcriptomics'
import restApiCall from '../../components/RestAPI';
import { numberBadge } from "../../components/Generic";

import PlatformCohort from '../Home/components/PlatformCohort';

function Platform() {
    let { platform } = useParams();
    const [platformSumData, setPlatformSumData] = useState([])
    const [platformAddData, setPlatformAddData] = useState([])
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

    const fetchPlatformSumData = async () => {
        const platform_sum_data = await restApiCall('platform/additional/'+platform);
        setPlatformSumData(platform_sum_data.platform);
        setPlatformAddData(platform_sum_data);
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
            <h2 className='page_title'>Platform <span>{platformSumData.name}</span></h2>
            <ul className='key_val_line'>
                <li><span className='line_key'>Omics type</span><span className={'badge badge_'+platformSumData.type}>{platformSumData.type}</span></li>
                <li><span className='line_key'>Long Name</span>{platformSumData.full_name}</li>
                <li><span className='line_key'>Version</span>{
                    platformSumData.version != '' ? platformSumData.version : '-'
                }</li>
                <li><span className='line_key'>Technic</span>{platformSumData.technic}</li>
                <li><span className='line_key'>Number of scores</span>{numberBadge(platformSumData.scores_count)}</li>
                { platformSumData.scores_count != platformAddData.omics_count ?
                    <li><span className='line_key'>Number of {platformAddData.omics_type}</span>{numberBadge(platformAddData.omics_count.toString)}</li>:''
                }
                { platformAddData.cohorts ?
                    <li><span className='line_key'>Cohort{platformAddData.cohorts.length > 1 && 's'}</span><PlatformCohort cohorts={platformAddData.cohorts}/></li>:''
                }
            </ul>
            <div className="mt-3 me-4 sm:mt-0 sm:ml-3">
                <a className="btn btn-primary shadow" href={"/plot/"+platformSumData.name} role="button">Go to Plots</a>
            </div>
            {platformSumData && platformSumData.type && platformTableData ? 
                <div className="mt-4">
                    <DataTable data={platformTableData} columns={get_table_columns(platformSumData.type)} groups={get_table_column_groups(platformSumData.type)}/>
                </div>
                :
                <div>Loading ...</div>
            }
        </>
    );
}


export default Platform