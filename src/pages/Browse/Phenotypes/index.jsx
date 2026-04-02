import { useState, useEffect } from 'react';
// import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import DataTableServer from '../../../components/table/DataTableServer';
import { phenotypes_columns } from '../../../components/table/columns/phenotype';
import { fetch_count_data, browse_title } from '../components/Browse';


function Phenotypes() {
    const [phenotypeCount, setPhenotypesCount] = useState()

    const data_type = 'phenotype';

    const url_suffix = data_type+'/all';

    const fetchCount = async () => {
        const data_count = await fetch_count_data(data_type+'s');
        setPhenotypesCount(data_count);
    }

    useEffect(() => {
        fetchCount();
    },[])

    return (
        <div>
            { browse_title(phenotypeCount,data_type,'Phenotypes') }
            <div className="mt_minus_1">
                Browse all the Phenotypes associated with Genetic Scores in {process.env.PROJECT_NAME}.
            </div>
            <div className="mt-4">
                {/* <DataTableFromRestApi table_key={data_type+'s'} url_suffix={url_suffix} columns={phenotypes_columns}/> */}
                <DataTableServer table_key={data_type+'s'} url_suffix={url_suffix} columns={phenotypes_columns}/>
            </div>
        </div>
    );
}

export default Phenotypes