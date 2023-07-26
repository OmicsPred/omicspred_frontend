import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import {commons_cols} from "../../components/table/columns/common";
import restApiCall from '../../components/RestAPI';


function Metabolite() {
    let { metabolite } = useParams();
    const [elementData, setElementData] = useState([])

    const element = 'metabolite';
    const url_suffix = "score/searchby"+element+"/"+metabolite;
    const columns = [
        commons_cols['omicspred_id'],
        commons_cols['platform_type'],
        commons_cols['platform_name'],
        commons_cols['variants_number'],
        commons_cols['scoring_file']
    ]

    const fetchSummaryData = async () => {
      const data = await restApiCall(element+'/'+metabolite);
      console.log(data);
      setElementData(data);
    }

    useEffect(() => {
      fetchSummaryData();
    },[])

  return (
    <div>
      <h2 className='page_title'>Metabolite <span>{metabolite}</span></h2>
      {
        elementData && elementData.name != metabolite ? <div className='mt-3 mb-3'>Biomarker Name: {elementData.name}</div> : ''
      }
      <DataTableFromRestApi url_suffix={url_suffix} columns={columns}/>
    </div>
  );
}


export default Metabolite