// import React, { useState } from 'react';
import { scores_columns } from '../../components/table/columns/scores';
import DataTableServer from '../../components/table/DataTableServer';

function Scores() {
    const url_endpoint = 'score/all'

    return (
        <>
            <h2 className='page_title'>Scores</h2>
            <div className="mt-4">
                <DataTableServer url_suffix={url_endpoint} columns={scores_columns} />
            </div>
        </>
    )
}

export default Scores