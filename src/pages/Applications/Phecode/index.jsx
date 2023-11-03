import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import DataTable from '../../../components/table/DataTable';
import {common_cols, common_data_cols} from '../../../components/table/columns/common';
import restApiCall from '../../../components/RestAPI';


function Phecode() {
    let { phecode } = useParams();
    const [phecodeData, setPhecodeData] = useState([])
    //phecode = phecode.replace('_', '.')
    const url_suffix = "applications_score/search?phecode_id="+phecode;
    const columns = [
        common_cols['omicspred_id'],
        common_cols['platform_type'],
        common_cols['platform_name'],
        common_data_cols['r2'],
        common_data_cols['hazard_ratio'],
        common_data_cols['fdr']
    ]
    const child_columns = [
        common_cols['phecode_id'],
        common_cols['phecode_name']
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
        <h2 className='page_title'>Phecode <span>{phecodeData.name}</span> <small>({phecode}</small>)</h2>
        <div className='key_val_line'><span className='line_key'>Category</span>{phecodeData.category}</div>
        <h4 className='mt-4'>Associated scores</h4>
        <DataTableFromRestApi table_key="phecode" url_suffix={url_suffix} columns={columns} />
        { phecodeData.child_phecode && phecodeData.child_phecode.length ? <><h4 className='mt-4'>Children Phecode entries</h4><DataTable data={phecodeData.child_phecode} columns={child_columns}/></> : ''}

      </div>
    );
}

export default Phecode