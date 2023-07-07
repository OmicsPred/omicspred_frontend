import React, { useState, useEffect } from 'react'

import { DataGrid } from '@mui/x-data-grid'


const DataTable = (props) => {

    const [tableData, setTableData] = useState([])

    const default_page_size = 25;

    // const getData = async (url) => {
    //   var data = [];
    //   var next_url = '';
    //   console.log("Retrieving data from API for page : " + url);
    //   if (url != '') {
    //     var apiResults=await fetch(url)
    //       .then(resp=>{
    //       return resp.json();
    //     });
    //     data = apiResults['results'];
        
    //     if (apiResults['next']) {
    //       next_url = apiResults['next'];
    //     }
    //   }
    //   return [data, next_url];
    // }

    // let rest_url = "http://127.0.0.1:7000/rest/"+props.url_suffix;
    // if (rest_url.includes('?')) {
    //   rest_url += '&';
    // }
    // else {
    //   rest_url += '/';
    // }
    // //console.log(rest_url);
      
    // const getWholeDataSet = async function(url = rest_url+'format=json') {
    //     const [data_results,next_url] = await getData(url);
    //     //console.log("Retreiving data from API for page : " + url);
    //     console.log(data_results);
    //     if (next_url) {
    //       console.log(">> NEXT: "+next_url);
    //       return data_results.concat(await getWholeDataSet(next_url));
    //     } else {
    //       return data_results;
    //     }
    // };

    // useEffect(() => {
    //   (async ()=>{
    //     // const dataset=await getWholeDataSet();

    //     console.log(dataset);
    //     setTableData(dataset);
    //   })();
    // },[])

    return (
        <div style={{ maxHeight: 700, width: 'auto' }}>
          <DataGrid
            getRowId={(row) => row.id}
            rows={props.data}
            columns={props.columns}
            initialState={{
              pagination: { paginationModel: { pageSize: default_page_size } }
            }}
          />
        </div>
    )

}

export default DataTable