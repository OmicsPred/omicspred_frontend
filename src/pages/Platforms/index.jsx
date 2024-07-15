import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import { browse_title } from '../../components/Common';
import { platforms_columns } from "../../components/table/columns/platforms";

function Platforms() {

    const url_suffix = 'platform/all';

    const default_cell_value = process.env.DEFAULT_CELL_VALUE;
    
    return (
        <div>
            { browse_title('hl','platforms') }
            <DataTableFromRestApi table_key="platforms" url_suffix={url_suffix} columns={platforms_columns}/>
        </div>
    );
}

export default Platforms