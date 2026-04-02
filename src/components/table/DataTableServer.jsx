import { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CustomToolbarLight, CustomToolbarNoSearch } from './TableToolbar';
import { loading_data, consoleDev } from '../Generic';


const rest_url = process.env.REST_API_URL;

const DataTableServer = (props) => {

    const default_page_size = 25;

    let page_size = default_page_size;

    const cols2db = {
        'gene_id': 'genes__external_id',
        'uniprot_id': 'proteins__external_id',
        'metabolite_id': 'metabolites__external_id',
        'pathway_id': 'external_id',
        'phecode_id': 'phecode_as_float'
        // 'protein_name': 'proteins__name',
        // 'gene_name':  'genes__name',
        // 'metabolite_name':  'metabolites__name',
    }

     // Format expected: [<col_1_name>,<col_2_name>]
    let initial_hidden_columns = {};
    if (props.hidden_columns) {
        for (let i=0; i < props.hidden_columns.length; i++) {
            initial_hidden_columns[props.hidden_columns[i]] = false;
        }
    }

    const [rowCountState, setRowCountState] = useState(0);
    const [data, setData] = useState();
    const [queryParam, setQueryParam] = useState({
        filter: '',
        sort_field: '',
        sort: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [noEntry, setNoEntry] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        total: 0,
        page: 0,
        pageSize: page_size
    });

    // let display_groups = false;
    // if (props.groups) {
    //   display_groups = true;
    // }

    const row_height_settings = 'auto';

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

    function getRowId(row) {
        // Special combination of columns values to get unique row ID
        if (props.col_for_ids) {
            const ids = props.col_for_ids;
            let row_key = '';
            for (let i=0; i<ids.length; i++) {
                const cols = ids[i].split('__');
                if (cols.length == 2) {
                    row_key = row_key+'_'+row[cols[0]][cols[1]];
                }
                else {
                    row_key = row_key+'_'+row[cols[0]];
                }
            }
            return row_key;
        }
        else if (row.id) {
            return row.id
        }
        else if (row.external_id) {
            return row.external_id
        }
        else if (row.name) {
            return row.name;
        }
        else {
            return generateString(20);
        }
    }

    // Remove individual column filtering
    const get_columns = () => {
        let columns = props.columns;
        for (let i=0; i<columns.length; i++) {
            columns[i]['filterable'] = false;
        }
        return columns;
    }
    
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
        const filter = queryParam.filter;
        consoleDev("FILTER: "+filter)
        if (!url.includes('filter=') && filter) {
            url += '&filter='+filter;
        }
        const sort_field = queryParam.sort_field;
        const sort = queryParam.sort;
        consoleDev("SORT: "+sort_field+' | '+sort)
        if (!url.includes('sort_field=') && sort_field) {
            if (cols2db[sort_field]) {
                url += '&sort_field='+cols2db[sort_field];
            }
            else {
                url += '&sort_field='+sort_field;
            }
        }
        if (!url.includes('sort=') && sort) {
            url += '&sort='+sort;
        }
        return url;
    }

    const fetchData = async () => {
        setIsLoading(true)
        const offset = paginationModel.page * paginationModel.pageSize;

        const url = rest_api_url(props.url_suffix, offset, paginationModel.pageSize)
        consoleDev("URL: "+url);
        try {
            const response = await fetch(url)
            const json = await response.json();
            const results = json.results;
            if (results) {
                if (results.length > 0) {
                    setData(results);
                }
                else {
                    setData([]);
                }
                setRowCountState(json.count);
                setPaginationModel(old => ({ ...old, total: json.count}))
            }
            else {
                setNoEntry(true);
            }
        } catch(error) {
            console.log('REST API message: '+error.message);
            setNoEntry(true);
            setData(undefined);
        }
        setIsLoading(false);
    }

    const onFilterModelChange = useCallback((filterModel) => {
        // Here you save the data you need from the filter model
        const q = filterModel.quickFilterValues.join(' ');
        if (!q || (q && q.length >= 3)) {
            setQueryParam(old => ({ ...old, filter: q }))
        }
    }, []);

    const onSortModelChange = useCallback((sortModel) => {
        // Here you save the data you need from the filter model
        if (sortModel.length) {
            const s = sortModel[0];
            const field = s.field
            const sort = s.sort
            setQueryParam(old => ({ ...old, sort_field: field, sort: sort }))
        }
    }, []);

    // This replace the 3 useEffect above - test to check this works
    useEffect(() => {
        fetchData()
    }, [paginationModel.page, paginationModel.pageSize, queryParam.filter, queryParam.sort_field, queryParam.sort])

    return (
        <>
        { data != undefined ?
            // data.length > 0 ?
                <div className='d-flex'>
                    <div className="table-responsive">
                        <DataGrid
                            key="server-side"
                            // autoHeight
                            columnGroupingModel={props.groups}
                            // columns={props.columns}
                            columns={get_columns()}
                            rows={data}
                            getRowId={(row) => getRowId(row)}
                            getRowHeight={() => row_height_settings}
                            getEstimatedRowHeight={() => 100}
                            // getRowId={(row) => row.id}
                            rowCount={rowCountState}
                            loading={isLoading}
                            pageSizeOptions={[10, 25, 50, 75, 100]}
                            paginationModel={paginationModel}
                            paginationMode="server"
                            onPaginationModelChange={setPaginationModel}
                            showToolbar
                            initialState={{
                                pagination: {
                                    paginationModel: paginationModel
                                },
                                columns: {
                                    // Hide columns listed in the model. the other columns will remain visible
                                    columnVisibilityModel: initial_hidden_columns
                                }
                            }}
                            sortingMode="server"
                            sortingOrder={['asc','desc']}
                            onSortModelChange={onSortModelChange}
                            filterMode="server"
                            onFilterModelChange={onFilterModelChange}
                            slots={{
                                toolbar: props.nosearchbar ? CustomToolbarNoSearch : CustomToolbarLight
                            }}
                            // slots={{
                            //     toolbar: GridToolbar
                            // }}
                            slotProps={{
                                // toolbar: {
                                //     showQuickFilter: true
                                // },
                                loadingOverlay: {
                                    variant: 'linear-progress',
                                    noRowsVariant: 'skeleton',
                                },
                            }}
                            // slotProps={{
                            //   toolbar: {
                            //     showQuickFilter: true
                            //   }
                            // }}
                            // slots={{
                            //   toolbar: GridToolbarQuickFilter
                            // }}
                        />
                    </div>
                </div>
                // : <div>No data found</div>
            : noEntry ?
                // <div>Error: no data found or there is an issue to fetch the data</div> : ''
                <div>Error: there is an issue to fetch the data</div> : loading_data()
        }
        </>
    )
}

export default DataTableServer