import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

const DataTable = (props) => {

    const default_page_size = 25;

    return (
        <div className="table-responsive">
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