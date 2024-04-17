import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import DataTable from '../../../components/table/DataTable';
import { common_cols, common_data_cols, applications_cols } from '../../../components/table/columns/common';
import restApiCall from '../../../components/RestAPI';
import { numberBadge } from '../../../components/Generic';
import { op_title, op_subtitle, op_subtitle_no_asso } from '../../../components/Common';


function Phecode() {
    const { phecode } = useParams();
    const phecode_id = phecode.replace('_','.');
    const [phecodeData, setPhecodeData] = useState([])
    //phecode = phecode.replace('_', '.')
    const url_suffix = "applications_score/search?phecode_id="+phecode_id;
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
        common_cols['phecode_name'],
        common_cols['scores_count']
    ]

    // const column_keys = ['phecode__id','score_id'];
    const column_keys = ['score_id'];

    const fetchSummaryData = async () => {
      const data = await restApiCall('phecode/'+phecode_id+'?include_children=1');
      console.log(data);
      setPhecodeData(data);
    }
  
    useEffect(() => {
      fetchSummaryData();
    },[])

    return (
        <div>
            {op_title('phecode', phecodeData, phecode_id)}
            <ul className='key_val_line'>
                <li key='phecode_id'><span className='line_key'>Identifier</span>{phecodeData.id}</li>
                <li key='phecode_cat'><span className='line_key'>Category</span>{phecodeData.category}</li>
                <li key='phecode_scores'><span className='line_key'># Associated Score{phecodeData.scores_count > 1 ? 's' : ''}</span>{numberBadge(phecodeData.scores_count)}</li>
            </ul>
            {op_subtitle('score')}
            <div className='d-flex mb-5'>
                <DataTableFromRestApi table_key="phecode" url_suffix={url_suffix} columns={columns} col_for_ids={column_keys}/>
            </div>
            { phecodeData.child_phecode && phecodeData.child_phecode.length ? <>{op_subtitle_no_asso('hl','Children Phecode entries')}<div className='d-flex'><DataTable data={phecodeData.child_phecode} columns={child_columns}/></div></> : ''}
        </div>
    );
}

export default Phecode