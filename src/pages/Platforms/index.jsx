import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import { BrowseTitle } from '../../components/Common';
import { platforms_columns } from "../../components/table/columns/platforms";

function Platforms() {
    const url_suffix = 'platform/all';
    
    return (
        <div>
            <BrowseTitle type='hl' label='platforms' title='Browse Platforms'/>
            <DataTableFromRestApi table_key="platforms" url_suffix={url_suffix} columns={platforms_columns}/>
        </div>
    );
}

export default Platforms