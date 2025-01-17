import React, { useState, useEffect } from 'react';
import { scores_columns } from '../../../components/table/columns/scores';
import { common_column_groups } from '../../../components/table/columns/common';
import DataTableServer from '../../../components/table/DataTableServer';
import { BrowseTitle } from '../../../components/Common';
import restApiCall from '../../../components/RestAPI';


function Scores() {
    const [scoresCount, setScoresCount] = useState()

    const url_endpoint = 'score/all'

    const fetchScoresCount = async () => {
        const data = await restApiCall('info');
		setScoresCount(data.data_count.scores);
    }

    useEffect(() => {
        fetchScoresCount();
    },[])

    return (
        <>
            { scoresCount ? <BrowseTitle type='score' count={scoresCount} label='Genetic Scores' title='Browse Genetic Scores'/> : <BrowseTitle type='score' label='Genetic Scores' title='Browse Genetic Scores'/>}
            <div className="mt_minus_1">
                Browse all the Genetic Scores available in {process.env.PROJECT_NAME}.
            </div>
            <div className="mt-4">
                <DataTableServer url_suffix={url_endpoint} columns={scores_columns} groups={[common_column_groups['molecular_trait_id']]}/>
            </div>
        </>
    )
}

export default Scores