// import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const DataTable = (props) => {

    const default_page_size = 25;

    // const rowCount = 0;
    // const [rowCountState, setRowCountState] = useState(rowCount);

    let display_groups = false;
    if (props.groups) {
      display_groups = true;
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
      else if (row.name) {
        return row.name;
      }
      else {
        return generateString(20);
      }
    }
    
    // useEffect(() => {
    //   setRowCountState((prevRowCountState) =>
    //     rowCount !== undefined ? rowCount : prevRowCountState,
    //   );
    // }, [rowCount, setRowCountState])

    return (
        <div className="table-responsive">
          <DataGrid
            autoHeight
            experimentalFeatures={{ columnGrouping: display_groups }}
            columnGroupingModel={props.groups}
            columns={props.columns}
            rows={props.data}
            getRowId={(row) => getRowId(row)}
            getRowHeight={() => row_height_settings}
            // rowCount={rowCountState}
            // paginationMode="server"
            sx={{ '--DataGrid-overlayHeight': '200px' }}
            initialState={{
              pagination: { paginationModel: { pageSize: default_page_size } }
            }}
            slots={{ 
              toolbar: GridToolbar
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true
              }
            }}
          />
        </div>
    )

}

export default DataTable