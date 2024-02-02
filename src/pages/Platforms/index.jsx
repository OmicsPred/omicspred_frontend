import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import {omicspred_omics_type, omicspred_internal_link} from "../../components/table/columns/common";


function Platforms() {

    // const [platformData, setPlatformData] = useState([])

    const url_suffix = 'platform/all';

    const columns = [
        { 
            field: 'name', 
            headerName: 'Name', 
            minWidth: 150,
            flex: 1,
            renderCell: (params) => {
                return omicspred_internal_link(params.row.name,'platform');
            },
            valueGetter: (params) => { return params.row.name }
        },
        { field: 'full_name', headerName: 'Full Name', width: 200 },
        { field: 'version', headerName: 'Version' },
        { field: 'technic', headerName: 'Technic', width: 450 },
        { 
            field: 'type', 
            headerName: 'Type',
            width: 200,
            flex: 1,
            renderCell: (params) => {
                return omicspred_omics_type(params.row.type);
            },
            valueGetter: (params) => { return params.row.type }
        },
        { field: 'scores_count', headerName: '#Scores', width: 150 }
    ]
    
    return (
        <div>
            <h2 className='page_title'>Platforms</h2>
            <DataTableFromRestApi table_key="platforms" url_suffix={url_suffix} columns={columns}/>
        </div>
    );
}

export default Platforms