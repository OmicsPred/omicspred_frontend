import { useState, useEffect } from 'react';
import DataTableServer from '../../../components/table/DataTableServer';

const PlatformDataTable = (props) =>{

    const [platformRestEndpoint, setPlatformRestEndpoint] = useState([])


    useEffect(() => {
        setPlatformRestEndpoint(props.rest_endpoint)
    }), [props.rest_endpoint]

    return (
        <div className="mt-4">
            <DataTableServer url_suffix={platformRestEndpoint} columns={props.columns} groups={props.column_groups}/>
        </div>
    )
};
export default PlatformDataTable;