import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import restApiCallPaginated from '../RestAPIPaginated';

const DataTableFromRestApi = (props) => {

    const [tableData, setTableData] = useState([])

    let rest_url = "http://127.0.0.1:7000/rest/"+props.url_suffix;

    useEffect(() => {
        (async ()=>{
          const dataset = await restApiCallPaginated(rest_url);
          console.log(dataset);
          setTableData(dataset);
        })();
    },[])

    return (
        <>
        {
            tableData && tableData.length ? <DataTable data={tableData} columns={props.columns}/> : <div>Loading table ...</div>
        }
        </>
    )
}
export default DataTableFromRestApi;