import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import {omicspred_internal_link} from "../../components/table/columns/common";


function Platforms() {

    // const [platformData, setPlatformData] = useState([])

    const url_suffix = 'platform/all';

    const columns = [
        { 
            field: 'name', 
            headerName: 'Name', 
            width: 150,
            renderCell: (params) => {
                return omicspred_internal_link(params.row.name,'Platform');
            }
        },
        { field: 'full_name', headerName: 'Full Name', width: 200 },
        { field: 'version', headerName: 'Version' },
        { field: 'technic', headerName: 'Technic', width: 200 },
        { field: 'type', headerName: 'Type', width: 200 },
        { field: 'scores_count', headerName: '#Scores', width: 200 }
    ]
    
    return (
        <div>
            <h2 className='page_title'>Platforms</h2>
            <DataTableFromRestApi url_suffix={url_suffix} columns={columns}/>
        </div>
    );
}

export default Platforms