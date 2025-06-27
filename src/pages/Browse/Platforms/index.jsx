import { useState, useEffect } from 'react';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import { platforms_columns } from '../../../components/table/columns/platforms';
import { fetch_count_data, browse_title } from '../components/Browse';

function Platforms() {
    const [platformsCount, setPlatformsCount] = useState()

    const data_type = 'platform';

    const url_suffix = data_type+'/all';

    const fetchCount = async () => {
        const data_count = await fetch_count_data(data_type+'s');
        setPlatformsCount(data_count);
    }

    useEffect(() => {
        fetchCount();
    },[])

    return (
        <div>
            { browse_title(platformsCount,'hl','Platforms',data_type+'s') }
            <div className="mt_minus_1">
                Browse all the analysis Platforms used to generate the Genetic Scores in {process.env.PROJECT_NAME}.
            </div>
            <div className="mt-4">
                <DataTableFromRestApi table_key={data_type+'s'} url_suffix={url_suffix} columns={platforms_columns}/>
            </div>
        </div>
    );
}

export default Platforms