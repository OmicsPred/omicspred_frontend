import { useState, useEffect } from 'react';
import { scores_columns } from '../../../components/table/columns/scores';
import { common_column_groups } from '../../../components/table/columns/common';
import DataTableServer from '../../../components/table/DataTableServer';
import { fetch_count_data, browse_title } from '../../Browse/components/Browse';
import { show_legacy_banner  } from '../../../components/Common';


function ScoresLegacy() {
    const [scoresCount, setScoresCount] = useState()

    const data_type = 'score';

    const url_suffix = data_type+'/all';

    const fetchCount = async () => {
        const data_count = await fetch_count_data(data_type+'s');
        setScoresCount(data_count);
    }

    useEffect(() => {
        fetchCount();
    },[])

    return (
        <>
            { show_legacy_banner() }
            { browse_title(scoresCount,data_type,'Genetic Scores','Genetic Scores') }
            <div className="mt_minus_1">
                Browse all the Genetic Scores available in {process.env.PROJECT_NAME}.
            </div>
            <div className="mt-4">
                <DataTableServer url_suffix={url_suffix} columns={scores_columns} groups={[common_column_groups['molecular_trait_id']]}/>
            </div>
        </>
    )
}

export default ScoresLegacy