import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import {commons_cols} from "../../components/table/columns/common";
import restApiCall from '../../components/RestAPI';


function Gene() {
    let { gene } = useParams();
    const [elementData, setElementData] = useState([])

    const element = 'gene';
    const url_suffix = "score/searchby"+element+"/"+gene;
    const columns = [
        commons_cols['omicspred_id'],
        commons_cols['platform_type'],
        commons_cols['platform_name'],
        commons_cols['variants_number'],
        commons_cols['scoring_file']
    ]

    const fetchSummaryData = async () => {
      const data = await restApiCall(element+'/'+gene);
      console.log(data);
      setElementData(data);
    }

    useEffect(() => {
      fetchSummaryData();
    },[])

    return (
      <div>
        <h2 className='page_title'>Gene <span>{elementData && elementData.name ? elementData.name : gene}</span></h2>
        {
          elementData && elementData.external_id_source=='Ensembl' && elementData.name ? <div className='mt-3 mb-3'>Ensembl ID: {elementData.external_id}</div> : ''
        }
        <DataTableFromRestApi url_suffix={url_suffix} columns={columns}/>
      </div>
    );
}

export default Gene