import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import restApiCallPaginated from '../RestAPIPaginated';

const DataTableFromRestApi = (props) => {
    const [tableData, setTableData] = useState([])
    const [restApiDone, setRestApiDone] = useState(false)

    useEffect(() => {
        (async ()=>{
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
            (tableData && tableData.length ? <DataTable data={tableData} columns={props.columns} groups={props.groups}/> : "No data found" ) : <div>Loading table ...</div>
        }
        </>
    )
}
export default DataTableFromRestApi;