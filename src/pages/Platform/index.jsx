import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import { metabolomics_columns } from '../../components/table/columns/metabolomics'
import { proteomics_columns } from '../../components/table/columns/proteomics'
import { transcriptomics_columns } from '../../components/table/columns/transcriptomics'
import restApiCall from '../../components/RestAPI';


function Platform() {
    let { platform } = useParams();
    const [platformData, setPlatformData] = useState([])
    const [urlSuffix, setUrlSuffix] = useState([])
    const [tableColumns, setTableColumns] = useState([])

    const get_url_endpoint = (type) => {
        switch(type) {
            case 'Metabolomics':
                return "test/metabolite/search?platform="+platform;
            case 'Proteomics':
                return "test/protein/search?platform="+platform;
            case 'Transcriptomics':
                return "test/transcript/search?platform="+platform;
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

    const fetchSummaryData = async () => {
        let rest_url = "http://127.0.0.1:7000/rest/platform/"+platform;
        try {
            const res = await fetch(rest_url)
                .then((response)=> response.json())
                .then((data) => {
                    console.log(data);
                    setPlatformData(data);
                });
            console.log(res);
            return res
        } catch(err) {
            console.log(err)
            return(err)
        }
    }


    useEffect(() => {
        const data = fetchSummaryData();
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


export default Platform