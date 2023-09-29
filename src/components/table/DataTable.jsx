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
    
    // useEffect(() => {
    //   setRowCountState((prevRowCountState) =>
    //     rowCount !== undefined ? rowCount : prevRowCountState,
    //   );
    // }, [rowCount, setRowCountState])
  
    return (
        <div className="table-responsive">
          <DataGrid
            autoHeight
            slots={{
              toolbar: GridToolbar,
            }}
            experimentalFeatures={{ columnGrouping: display_groups }}
            columnGroupingModel={props.groups}
            columns={props.columns}
            rows={props.data}
            getRowId={(row) => row.id}
            // rowCount={rowCountState}
            // paginationMode="server"
            initialState={{
              pagination: { paginationModel: { pageSize: default_page_size } }
            }}
            sx={{ '--DataGrid-overlayHeight': '200px' }}
          />
        </div>
    )

}

export default DataTable