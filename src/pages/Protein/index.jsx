import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import restApiCall from '../../components/RestAPI';

function Protein() {
    let { protein } = useParams();

    const [proteinData, setProteinData] = useState([])


    const url_suffix = "score/searchbyprotein/"+protein;

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

  const fetchData = async () => {
    const protein_data = await restApiCall('protein/'+protein);
    setProteinData(protein_data);
  }

  useEffect(() => {
    fetchData(); 
  },[])


  return (
    <div>
      <h2 className='mb-3'>Protein {protein}</h2>
      <div className='mt-3 mb-3'>Name: {proteinData.name}</div>
      <DataTableFromRestApi url_suffix={url_suffix} columns={columns}/>
    </div>
  );
}


export default Protein