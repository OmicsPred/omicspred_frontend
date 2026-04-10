import { DataGrid } from '@mui/x-data-grid';
import { CustomToolbar } from "./TableToolbar";

const DataTable = (props) => {

    const default_page_size = 25;

    let initial_sorting = {};
    if (props.sorting) {
        initial_sorting = { field: props.sorting, sort: 'asc' }
    }

    // Format expected: [<col_1_name>,<col_2_name>]
    let initial_hidden_columns = {};
    if (props.hidden_columns) {
        for (let i=0; i < props.hidden_columns.length; i++) {
            initial_hidden_columns[props.hidden_columns[i]] = false;
        }
    }

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
                let additional_key = '';
                if (cols.length == 2) {
                    const col_suffix = '_LIST';
                    if (cols[0].endsWith(col_suffix)) {
                        const col = cols[0].replace(col_suffix,'');
                        additional_key = String(row[col][0][cols[1]]);
                    }
                    else {
                        additional_key = String(row[cols[0]][cols[1]]);
                    }
                }
                else {
                    additional_key = String(row[cols[0]]);
                }
                additional_key = additional_key.replaceAll(' ','_');
                row_key = row_key+'_'+additional_key;
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

    function table_toolbar() {
        return CustomToolbar(props.expanded_search)
    }

    return (
        <div className="d-flex" >
            <div className="table-responsive">
                <DataGrid
                    // autoHeight
                    columnGroupingModel={props.groups}
                    columns={props.columns}
                    rows={props.data}
                    getRowId={(row) => getRowId(row)}
                    getRowHeight={() => row_height_settings}
                    // sx={{ '--DataGrid-overlayHeight': '200px' }}
                    getRowClassName={(params) => params.row.evaluation_type && params.row.evaluation_type == 'Training' ? 'training_row':''} // Highlight the training rows
                    ignoreDiacritics // Ignore accents for quick search
                    showToolbar
                    sortingOrder={['asc','desc']}
                    initialState={{
                        pagination: { paginationModel: { pageSize: default_page_size } },
                        sorting: {
                            sortModel: [initial_sorting]
                        },
                        columns: {
                            // Hide columns listed in the model. the other columns will remain visible
                            columnVisibilityModel: initial_hidden_columns
                        }
                    }}
                    slots={{
                        toolbar: table_toolbar
                    }}
                    // slots={{
                    //     toolbar: GridToolbar
                    // }}
                    // loading
                    slotProps={{
                        // toolbar: {
                        //     showQuickFilter: true,
                        //     quickFilterProps: { debounceMs: 1000 }
                        // },
                        loadingOverlay: {
                            variant: 'linear-progress',
                            noRowsVariant: 'skeleton',
                        },
                    }}
                />
            </div>
        </div>
    )

}

export default DataTable