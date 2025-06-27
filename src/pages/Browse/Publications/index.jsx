import { useState, useEffect } from 'react';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import {publications_columns} from '../../../components/table/columns/publications';
import { fetch_count_data, browse_title } from '../components/Browse';

function Publications() {
    const [publicationsCount, setPublicationsCount] = useState()

    const data_type = 'publication';

    const url_suffix = data_type+'/all';

    const fetchCount = async () => {
        const data_count = await fetch_count_data(data_type+'s');
        setPublicationsCount(data_count);
    }

    useEffect(() => {
        fetchCount();
    },[])

    return (
        <div>
            { browse_title(publicationsCount,'hl','Publications',data_type+'s') }
            <div className="mt_minus_1">
                Browse all the Publications available in {process.env.PROJECT_NAME}.
            </div>
            <div className="mt-4">
                <DataTableFromRestApi table_key={data_type+'s'} url_suffix={url_suffix} columns={publications_columns}/>
            </div>
        </div>
    );
}

export default Publications