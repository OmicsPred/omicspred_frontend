import { useState, useEffect } from 'react';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import { datasets_browse_columns } from '../../../components/table/columns/datasets';
import { fetch_count_data, browse_title } from '../components/Browse';
import { Note } from '../../../components/Generic';


function Datasets() {
    const [datasetsCount, setDatasetsCount] = useState()


    const data_type = 'dataset';

    const url_suffix = data_type+'/all';

    const fetchCount = async () => {
        const data_count = await fetch_count_data(data_type+'s');
        setDatasetsCount(data_count);
    }

    useEffect(() => {
        fetchCount();
    },[])

    return (
        <div>
            { browse_title(datasetsCount,'hl','Datasets',data_type+'s') }
            <div className="mt_minus_1">
                Browse all the Datasets available in {process.env.PROJECT_NAME}.
                <div className='d-flex mt-2'>
                    <Note compact="1" msg={"In "+process.env.PROJECT_NAME+", a dataset is a set of genetic scores, within a same study, that have a common platform and tissue. In most cases, the genetic scores share the same ancestry."}/>
                </div>
                {/* <div>In {process.env.PROJECT_NAME}, a dataset is a set of genetic scores, within a same study, that have a common platform and tissue. In most cases, the genetic scores have the same ancestry.</div> */}
            </div>
            <div className="mt-4">
                <DataTableFromRestApi table_key={data_type+'s'} url_suffix={url_suffix} columns={datasets_browse_columns} expanded_search="1"/>
            </div>
        </div>
    );
}

export default Datasets