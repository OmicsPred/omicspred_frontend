import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import DataTable from '../../../components/table/DataTable';
import {commons_cols} from '../../../components/table/columns/common';
import restApiCall from '../../../components/RestAPI';


function Phecode() {
    let { phecode } = useParams();
    const [phecodeData, setPhecodeData] = useState([])
    //phecode = phecode.replace('_', '.')
    const url_suffix = "applications_score/search?phecode_id="+phecode;
    const columns = [
        commons_cols['omicspred_id'],
        commons_cols['platform_type'],
        commons_cols['platform_name']
    ]
    const child_columns = [
        commons_cols['phecode_id'],
        commons_cols['phecode_name']
    ]

    const fetchSummaryData = async () => {
      const data = await restApiCall('phecode/'+phecode+'?include_children=1');
      console.log(data);
      setPhecodeData(data);
    }
  
    useEffect(() => {
      fetchSummaryData();
    },[])

    return (
      <div>
        <h2 className='page_title'>Phecode <span>{phecodeData.name}</span> ({phecodeData.id})</h2>
        <div><b>Category</b>: {phecodeData.category}</div>
        <h4 className='mt-4'>Associated scores</h4>
        <DataTableFromRestApi url_suffix={url_suffix} columns={columns} />
        { phecodeData.child_phecode && phecodeData.child_phecode.length ? <><h4 className='mt-4'>Children Phecode entries</h4><DataTable data={phecodeData.child_phecode} columns={child_columns}/></> : ''}

      </div>
    );
}

export default Phecode