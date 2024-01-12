import React, { useState, useEffect, useCallback } from 'react'
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid'
// import { GridToolbar } from '@mui/x-data-grid'

const rest_url = process.env.OMICSPRED_REST_API_URL;

const DataTableServer = (props) => {

    const default_page_size = 25;

    let page_size = default_page_size;

    const cols2db = {
      'id': 'id',
      'uniprot_id': 'proteins__external_id',
      'protein_name': 'proteins__name',
      'gene_name':  'genes__name',
      'metabolite_name':  'metabolites__name',
      
    }

    const [rowCountState, setRowCountState] = useState(0);
    const [data, setData] = useState([]);
    const [queryParam, setQueryParam] = useState({
      filter: '',
      sort_field: '',
      sort: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
      total: 0,
      page: 0,
      pageSize: page_size
    });

    // const [paginationModel, setPaginationModel] = useState({

    let display_groups = false;
    if (props.groups) {
      display_groups = true;
    }

    // const handlePaginationModelChange = (newPaginationModel) => {
    //   // We have the cursor, we can allow the page transition.
    //   if (
    //     newPaginationModel.page === 0 ||
    //     mapPageToNextCursor.current[newPaginationModel.page - 1]
    //   ) {
    //     setPaginationModel(newPaginationModel);
    //   }
    // };

    // const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    const characters ='0123456789';

    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // function getRowId(row) {
    //   if (row.id) {
    //     let id = row.id;
    //     id.replace("OPGS", "");
    //     return id
    //   }
    //   // else if (row.name) {
    //   //   return row.name;
    //   // }
    //   else {
    //     return generateString(20);
    //   }
    // }
    
    // useEffect(() => {
    //   const fetchData = async () => {
    //     console.log('ON')
    //     setPaginationModel(old => ({ ...old, isLoading: true }))
    //     const offset = paginationModel.page * paginationModel.pageSize;
    //     const url = `http://127.0.0.1:7000/rest/proteomics/Olink?format=json&offset=${offset}&limit=${paginationModel.pageSize}`
    //     console.log("URL: "+url);
    //     console.log("PAGE: "+paginationModel.page);
    //     console.log("offset: "+offset);
    //     const response = await fetch(url)
    //     const json = await response.json()
    //     const results = json.results
    //     // for (let i=0; i < results.length;i++) {
    //     //   results[i]['id'] = results[i]['id'].replace("OPGS", "");
    //     //   results[i]['id'] = parseInt(results[i]['id'])
    //     //   results[i]['key'] = results[i]['id']
    //     // }
    //     setPaginationModel(old => ({ ...old, isLoading: false, data: json.results, total: json.count }))
    //   }
    //   fetchData()
    // }, [paginationModel.page, paginationModel.pageSize])


    //const rest_api_url = (url,offset,limit,filter) => {
    const rest_api_url = (url,offset,limit) => {
      if (!url.startsWith('http')) {
          url = rest_url+url;
      }
      if (!url.includes('format=json')) {
          if (url.includes('?')) {
              url += '&';
          }
          else {
              url += '?';
          }
          url += 'format=json';
      }
      if (!url.includes('offset=') && offset) {
        url += '&offset='+offset;
      }
      if (!url.includes('limit=') && limit) {
        url += '&limit='+limit;
      }
      // if (!url.includes('filter=') && filter) {
      //   url += '&filter='+filter;
      // }
      const filter = queryParam.filter;
      console.log("FILTER: "+filter)
      if (!url.includes('filter=') && filter) {
        url += '&filter='+filter;
      }
      const sort_field = queryParam.sort_field;
      const sort = queryParam.sort;
      console.log("SORT: "+sort_field+' | '+sort)
      if (!url.includes('sort_field=') && sort_field) {
        if (cols2db[sort_field]) {
          url += '&sort_field='+cols2db[sort_field];
        }
      }
      if (!url.includes('sort=') && sort) {
        url += '&sort='+sort;
      }
      return url;
    }

    // const fetchData = async (query) => {
    //   setIsLoading(true)
    //   const offset = paginationModel.page * paginationModel.pageSize;
    //   // const url = `http://127.0.0.1:7000/rest/proteomics/Olink?format=json&offset=${offset}&limit=${paginationModel.pageSize}`
    //   let filter = undefined;
    //   if (query && query.filter) {
    //     filter = query.filter
    //   }
    //   const url = rest_api_url(props.url_suffix, offset, paginationModel.pageSize,filter)
    //   console.log("URL: "+url);
    //   console.log("PAGE: "+paginationModel.page);
    //   console.log("offset: "+offset);
    //   const response = await fetch(url)
    //   const json = await response.json()
    //   setData(json.results)
    //   setRowCountState(json.count)
    //   setPaginationModel(old => ({ ...old, total: json.count}))
    //   setIsLoading(false)
    // }

    const fetchData = async () => {
      setIsLoading(true)
      const offset = paginationModel.page * paginationModel.pageSize;
      // const url = `http://127.0.0.1:7000/rest/proteomics/Olink?format=json&offset=${offset}&limit=${paginationModel.pageSize}`
      // let filter = undefined;
      // if (query && query.filter) {
      //   filter = query.filter
      // }
      const url = rest_api_url(props.url_suffix, offset, paginationModel.pageSize)
      console.log("URL: "+url);
      console.log("PAGE: "+paginationModel.page);
      console.log("offset: "+offset);
      const response = await fetch(url)
      const json = await response.json()
      setData(json.results)
      setRowCountState(json.count)
      setPaginationModel(old => ({ ...old, total: json.count}))
      setIsLoading(false)
    }

    const onFilterModelChange = useCallback((filterModel) => {
    // const onFilterModelChange = async (filterModel) => {
      // Here you save the data you need from the filter model
      const q = filterModel.quickFilterValues[0];
      if (!q || (q && q.length >= 3)) {
        setQueryParam(old => ({ ...old, filter: q }))
      }

      // if (!q) {
      //   setQueryParam(old => ({ ...old, filter: q }))
      // }
      // else {
      //   if (q.length >= 3) {
      //     setQueryParam(old => ({ ...old, filter: q }))
      //   }
      // }

      // console.log("Params: "+queryParam.filter);
      // if (!q) {
      //   fetchData();
      // }
      // else {
      //   if (q.length >= 3) {
      //     console.log("Searched term: "+q);
      //     console.log("Searched filter: "+queryParam.filter);
      //     // fetchData(q);
      //     fetchData();
      //   }
      //}
    }, []);

    const onSortModelChange = useCallback((sortModel) => {
      // Here you save the data you need from the filter model
      const s = sortModel[0]
      const field = s.field
      const sort = s.sort
      setQueryParam(old => ({ ...old, sort_field: field, sort: sort }))
      // console.log('sortModel:')
      // console.log("- field: "+field);
      // console.log("- sort: "+sort);
      // fetchData(q);
      // const q = filterModel.quickFilterValues[0];
      // if (!q) {
      //   fetchData();
      // }
      // else {
      //   if (q.length >= 3) {
      //     console.log("Searched term: "+q);
      //     fetchData(q);
      //   }
      // }
    }, []);

    useEffect(() => {
        fetchData()
    }, [paginationModel.page, paginationModel.pageSize])

    useEffect(() => {
        fetchData()
    }, [queryParam.filter])

    useEffect(() => {
      fetchData()
    }, [queryParam.sort_field, queryParam.sort])

    return (
      
      <div className="table-responsive">
        <DataGrid
          key="server-side"
          autoHeight
          experimentalFeatures={{ columnGrouping: display_groups }}
          columnGroupingModel={props.groups}
          columns={props.columns}
          rows={data}
          getRowId={(row) => row.id}
          // getRowId={(row) => generateString(20)}
          rowCount={rowCountState}
          loading={isLoading}
          pageSizeOptions={[10, 25, 50, 75, 100]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          initialState={{ 
            pagination: { 
              paginationModel: paginationModel
            }
          }}
          onSortModelChange={onSortModelChange}
          filterMode="server"
          onFilterModelChange={onFilterModelChange}
          // slots={{ 
          //   toolbar: GridToolbar
          // }}
          // slotProps={{
          //   toolbar: {
          //     showQuickFilter: true
          //   }
          // }}
          slots={{ 
            toolbar: GridToolbarQuickFilter
          }}
          


          // onPaginationModelChange={setPaginationModel}


          //onPaginationModelChange={setPaginationModel(old => ({ ...old, page: old.page + 1 }))}
          // onPageChange={(newPage) => {
          //   setPaginationModel(old => ({ ...old, page: newPage + 1 }))
          // }}
          // page={paginationModel.page}
          // onPageChange={(newPage) => {
          //   setPaginationModel(old => ({ ...old, page: newPage + 1 }))
          // }}
          // onPageSizeChange={(newPageSize) => setPaginationModel(old => ({ ...old, pageSize: newPageSize }))}
        />
      </div>
    )
{/* <DataGrid
            autoHeight
            experimentalFeatures={{ columnGrouping: display_groups }}
            columnGroupingModel={props.groups}
            columns={props.columns}
            rows={props.data}
            // getRowId={(row) => getRowId(row)}
            getRowId={(row) => row.id}
            rowCount={rowCountState}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{ '--DataGrid-overlayHeight': '200px' }}
            initialState={{
              pagination: { paginationModel: { pageSize: page_size } }
            }}
            slots={{ 
              toolbar: GridToolbar
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true
              }
            }}
          /> */}
}

export default DataTableServer