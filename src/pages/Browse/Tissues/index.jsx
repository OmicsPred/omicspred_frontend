import { useState, useEffect } from 'react';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import { tissues_columns } from '../../../components/table/columns/tissues';
import { fetch_count_data, browse_title } from '../components/Browse';


function Tissues() {
    const [tissuesCount, setTissuesCount] = useState()

    const data_type = 'tissue';

    const url_suffix = data_type+'/all';

    const fetchCount = async () => {
        const data_count = await fetch_count_data(data_type+'s');
        setTissuesCount(data_count);
    }

    useEffect(() => {
        fetchCount();
    },[])

    return (
        <div>
            { browse_title(tissuesCount,data_type,'Tissues') }
            <div className="mt_minus_1">
                Browse all the Tissues used to generate the Genetic Scores in {process.env.PROJECT_NAME}.
            </div>
            <div className="mt-4">
                <DataTableFromRestApi table_key={data_type+'s'} url_suffix={url_suffix} columns={tissues_columns}/>
            </div>
        </div>
    );
}

export default Tissues