import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';

const DataTableFromRestApi = (props) => {

    const [tableData, setTableData] = useState([])

    let rest_url = "http://127.0.0.1:7000/rest/"+props.url_suffix;
    if (rest_url.includes('?')) {
        rest_url += '&';
    }
    else {
        rest_url += '/';
    }

    const getData = async (url) => {
        var data = [];
        var next_url = '';
        console.log("Retrieving data from API for page : " + url);
        if (url != '') {
        var apiResults=await fetch(url)
            .then(resp=>{
            return resp.json();
        });
        data = apiResults['results'];
        
        if (apiResults['next']) {
            next_url = apiResults['next'];
        }
        }
        return [data, next_url];
    }
        
    const getWholeDataSet = async function(url = rest_url+'format=json') {
        const [data_results,next_url] = await getData(url);
        //console.log("Retreiving data from API for page : " + url);
        console.log(data_results);
        if (next_url) {
            console.log(">> NEXT: "+next_url);
            return data_results.concat(await getWholeDataSet(next_url));
        } else {
            return data_results;
        }
    };

    useEffect(() => {
        (async ()=>{
          const dataset = await getWholeDataSet();
          console.log(dataset);
          setTableData(dataset);
        })();
    },[])

    return (
        <>
        {
            tableData && tableData.length ? <DataTable data={tableData} columns={props.columns}/> : <div></div>
        }
        </>
    )
}
export default DataTableFromRestApi;