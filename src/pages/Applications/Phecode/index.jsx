import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import DataTable from '../../../components/table/DataTable';
import { common_cols, common_data_cols, applications_cols } from '../../../components/table/columns/common';
import restApiCall from '../../../components/RestAPI';
import { op_title, op_subtitle } from '../../../components/Common';


function Phecode() {
    let { phecode } = useParams();
    const [phecodeData, setPhecodeData] = useState([])
    //phecode = phecode.replace('_', '.')
    const url_suffix = "applications_score/search?phecode_id="+phecode;
    const columns = [
        common_cols['omicspred_id'],
        applications_cols['gene'],
        applications_cols['protein'],
        applications_cols['metabolite'],
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

    const column_keys = ['phecode__id','score_id'];

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
            {op_title('phecode', phecodeData, phecode)}
            <ul className='key_val_line'>
                <li><span className='line_key'>Identifier</span>{phecodeData.id}</li>
                <li><span className='line_key'>Category</span>{phecodeData.category}</li>
            </ul>
            {op_subtitle('score')}
            <DataTableFromRestApi table_key="phecode" url_suffix={url_suffix} columns={columns} col_for_ids={column_keys}/>
            { phecodeData.child_phecode && phecodeData.child_phecode.length ? <><h4 className='mt-4'>Children Phecode entries</h4><DataTable data={phecodeData.child_phecode} columns={child_columns}/></> : ''}

        </div>
    );
}

export default Phecode