import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { metabolomics_columns,metabolomics_column_groups } from '../../components/table/columns/metabolomics'
import { proteomics_columns, proteomics_column_groups } from '../../components/table/columns/proteomics'
import { transcriptomics_columns, transcriptomics_column_groups } from '../../components/table/columns/transcriptomics'
import restApiCall from '../../components/RestAPI';
import DataTableServer from '../../components/table/DataTableServer';
import { numberBadge } from "../../components/Generic";
import PlatformAdditonal from './components/PlatformAdditonal';


function Platform() {
    let { platform } = useParams();
    const [platformSumData, setPlatformSumData] = useState([])
    const [platformAddData, setPlatformAddData] = useState([])
    const [platformTableData, setPlatformTableData] = useState([])

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

    const fetchPlatformSumData = async () => {
        const platform_sum_data = await restApiCall('platform/additional/'+platform);
        const platform_sum_results = platform_sum_data['results']
        setPlatformSumData(platform_sum_results[0].platform);
        setPlatformAddData(platform_sum_results);
    }

    const fetchPlatformTableData = async () => {
        const platform_data = await restApiCall('platform/'+platform);
        setPlatformTableData(platform_data);
    }


    useEffect(() => {
        fetchPlatformSumData();
        fetchPlatformTableData();
    },[])

    return (
        <>
            <h2 className='page_title'>Platform <span>{platformSumData.name}</span></h2>
            <ul className='key_val_line'>
                <li key="platform_type"><span className='line_key'>Omics type</span><span className={'badge badge_'+platformSumData.type}>{platformSumData.type}</span></li>
                <li key="platform_name"><span className='line_key'>Long Name</span>{platformSumData.full_name}</li>
                <li key="platform_version"><span className='line_key'>Version</span>{
                    platformSumData.version != '' ? platformSumData.version : '-'
                }</li>
                <li key="platform_technic"><span className='line_key'>Technic</span>{platformSumData.technic}</li>
                <li key="platform_nb_scores"><span className='line_key'>Number of scores</span>{numberBadge(platformSumData.scores_count)}</li>    
            </ul>
            <h4>Publications</h4>
            { platformAddData.length > 0 ?
                <div className="d-flex flex-column">
                    { platformAddData.map((additional) => <><PlatformAdditonal data={additional} /></>)}
                </div> : ''
             }

            <div className="mt-3 me-4 sm:mt-0 sm:ml-3">
                <a className="btn btn-primary shadow" href={"/plot/"+platformSumData.name} role="button">Go to Plots</a>
            </div>
            {platformTableData && platformTableData.type ?
                <div className="mt-4">
                    <DataTableServer url_suffix={get_url_endpoint(platformTableData.type)} columns={get_table_columns(platformTableData.type)} groups={get_table_column_groups(platformTableData.type)}/>
                </div>
                :
                <div>Loading ...</div>
            }
        </>
    );
}


export default Platform