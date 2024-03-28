import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import {omicspred_omics_type, omicspred_internal_link} from "../../components/table/columns/common";
import { browse_title } from '../../components/Common';
import { common_cols } from '../../components/table/columns/common';


function Platforms() {

    // const [platformData, setPlatformData] = useState([])

    const url_suffix = 'platform/all';

    const default_cell_value = process.env.DEFAULT_CELL_VALUE;

    const columns = [
        { 
            field: 'name', 
            headerName: 'Name', 
            minWidth: 150,
            flex: 1,
            renderCell: (params) => {
                return omicspred_internal_link({'label':params.row.name},'platform');
            },
            valueGetter: (params) => { return params.row.name }
        },
        { field: 'full_name', headerName: 'Full Name', minWidth: 200 },
        {
            field: 'versions',
            headerName: 'Versions',
            renderCell: (params) => {
                return params.row.versions.length ? params.row.versions.join(', ') : default_cell_value;
            },
        },
        {
            field: 'technic',
            headerName: 'Technic',
            minWidth: 450,
            renderCell: (params) => {
                return params.row.technic ? params.row.technic : default_cell_value;
            }
        },
        { 
            field: 'type', 
            headerName: 'Type',
            minWidth: 180,
            flex: 1,
            renderCell: (params) => {
                return omicspred_omics_type(params.row.type);
            },
            valueGetter: (params) => { return params.row.type }
        },
        common_cols['scores_count']
    ]
    
    return (
        <div>
            { browse_title('hl','platforms') }
            <DataTableFromRestApi table_key="platforms" url_suffix={url_suffix} columns={columns}/>
        </div>
    );
}

export default Platforms