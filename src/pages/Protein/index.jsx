import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import {common_cols} from "../../components/table/columns/common";
import restApiCall from '../../components/RestAPI';


function Protein() {
    let { protein } = useParams();
    const [elementData, setElementData] = useState([])

    const element = 'protein';
    const url_suffix = "score/searchby"+element+"/"+protein;
    const columns = [
        common_cols['omicspred_id'],
        common_cols['platform_type'],
        common_cols['platform_name'],
        common_cols['variants_number'],
        common_cols['scoring_file']
    ]

    const fetchSummaryData = async () => {
      const data = await restApiCall(element+'/'+protein);
      console.log(data);
      setElementData(data);
    }

    useEffect(() => {
        fetchSummaryData();
    },[])

    return (
      <div>
        <h2 className='page_title'>Protein <span>{protein}</span></h2>
        <ul className='key_val_line'>
          <li><span className='line_key'>Name</span>{elementData.name}</li>
        </ul>
        <DataTableFromRestApi url_suffix={url_suffix} columns={columns}/>
      </div>
    );
}

export default Protein