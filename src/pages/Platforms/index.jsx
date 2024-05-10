import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import {omicspred_internal_link} from "../../components/table/columns/common";
import { browse_title, omicspred_omics_type } from '../../components/Common';
import { common_cols } from '../../components/table/columns/common';
import { platforms_columns } from "../../components/table/columns/platforms";

function Platforms() {

    // const [platformData, setPlatformData] = useState([])

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