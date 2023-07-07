import { useParams } from 'react-router-dom';
import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";

function Gene() {
    let { gene } = useParams();

    const url_suffix = "score/searchbygene/"+gene;

    const columns = [
        { 
          field: 'id', 
          headerName: 'OmicsPred ID', 
          width: 150,
          renderCell: (params) => {
            let op_id = params.row.id;
            let op_url = "/Score/"+op_id;
            return(
              <a href={op_url}>{op_id}</a>
            )
          }
        },
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
    <div>
      <h2 className='mb-3'>Gene {gene}</h2>
      <DataTableFromRestApi url_suffix={url_suffix} columns={columns}/>
    </div>
  );
}


export default Gene