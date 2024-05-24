import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import restApiCallPaginated from '../RestAPIPaginated';
import { op_subtitle } from '../Common';

const DataTableFromRestApi = (props) => {
    const [tableData, setTableData] = useState([])
    const [restApiDone, setRestApiDone] = useState(false)

    useEffect(() => {
        (async () => {
          const dataset = await restApiCallPaginated(props.url_suffix);
          console.log(dataset);
          setTableData(dataset);
          // Check when the Rest API call is done
          if (dataset != undefined) {
            setRestApiDone(true);
          }
        })();
    },[])

    return (
        <>
        {
            restApiDone == true ?
            (tableData && tableData.length ?
              <>
                {props.title && props.type ? op_subtitle(props.type,props.title,tableData.length) : ''}
                <DataTable key={props.table_key} data={tableData} columns={props.columns} groups={props.groups} col_for_ids={props.col_for_ids}/>
              </> : <div>No data found</div>
            ) : <div>Loading table ...</div>
        }
        </>
    )
}
export default DataTableFromRestApi;