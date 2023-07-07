import { useParams } from 'react-router-dom';
import DataTable from '../../components/table/DataTable';

function Metabolite() {
    let { metabolite } = useParams();

    const url_suffix = "score/searchbymetabolite/"+metabolite;

    const columns = [
        { field: 'id', headerName: 'OmicsPred ID', width: 300 },
        { 
            field: 'platform_type', 
            headerName: 'Omics',
            width: 300,
            valueGetter: (params) => {
                return params.row.platform.type;
            }
        },
        { 
            field: 'platform_name', 
            headerName: 'Platform',
            width: 300,
            valueGetter: (params) => {
                return params.row.platform.name;
            }
        },
        { field: 'variants_number', headerName: '#SNP' },
    ]

  return (
    <div >
      <DataTable url_suffix={url_suffix} columns={columns}/>
    </div>
  );
}


export default Metabolite