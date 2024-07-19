import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import DataTable from '../../../components/table/DataTable';
import { common_cols, common_data_cols, applications_cols } from '../../../components/table/columns/common';
import restApiCall from '../../../components/RestAPI';
import { numberBadge, loading_data } from '../../../components/Generic';
import { op_title, op_subtitle_no_asso, HeaderCard, no_entry_found } from '../../../components/Common';


function Phecode() {
    const { phecode } = useParams();
    const [phecodeData, setPhecodeData] = useState()
    const [noEntry, setNoEntry] = useState(false)

    const phecode_id = phecode.replace('_','.');
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
        common_cols['phecode_category'],
        common_cols['scores_count']
    ]

    // const column_keys = ['phecode__id','score_id'];
    const column_keys = ['score_id'];

    const fetchSummaryData = async () => {
        const data = await restApiCall('phecode/'+phecode_id+'?include_children=1');
        if (data && Object.keys(data).length) {
            setPhecodeData(data);
        }
        else {
            setNoEntry(true);
        }
    }

    const get_information_content = () => {
		return (
			<>
                <tr><td>Identifier</td><td>{phecodeData.id}</td></tr>
                <tr><td>Category</td><td>{phecodeData.category}</td></tr>
                <tr><td># Score{phecodeData.scores_count > 1 ? 's' : ''}</td><td>{numberBadge(phecodeData.scores_count)}</td></tr>
            </>
        )
    }
  
    useEffect(() => {
      fetchSummaryData();
    },[])

    return (
        <div>
            { phecodeData ?
                <>
                    {/* Phecode Summary data */}
                    {op_title('phecode', phecodeData, phecode_id)}
                    <HeaderCard type='PheCode' content={get_information_content()} />

                    <div className='mt-5'></div>

                    {/* Score association */}
                    { phecodeData.scores_count > 0 ?
                        <div className='d-flex' style={{flexDirection:'column'}}>
                            <DataTableFromRestApi table_key="phecode" title='score' type='score' url_suffix={url_suffix} columns={columns} col_for_ids={column_keys}/>
                        </div> : ''
                    }
                    {/* PheCode child terms */}
                    {
                        phecodeData.child_phecode && phecodeData.child_phecode.length ?
                        <div className='mt-5'>
                            {op_subtitle_no_asso('hl','Children Phecode entries',phecodeData.child_phecode.length)}
                            <DataTable data={phecodeData.child_phecode} columns={child_columns}/>
                        </div> : ''
                    }
                </>
                : noEntry ?
                    <>{ no_entry_found('phecode',phecode_id) }</> : loading_data()
            }
        </div>
    );
}

export default Phecode