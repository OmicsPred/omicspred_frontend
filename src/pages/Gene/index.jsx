import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Href from "../../components/Href";
import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import DataTable from "../../components/table/DataTable";
import {commons_cols, omicspred_internal_link} from "../../components/table/columns/common";
import restApiCall from '../../components/RestAPI';
import restApiCallPaginated from '../../components/RestAPIPaginated';


function Gene() {
    let { gene } = useParams();
    const [elementData, setElementData] = useState([])
    const [proteinData, setProteinData] = useState([])

    const element = 'gene';
    const url_suffix = "score/searchby"+element+"/"+gene;
    const columns = [
        commons_cols['omicspred_id'],
        commons_cols['platform_type'],
        commons_cols['platform_name'],
        commons_cols['variants_number'],
        commons_cols['scoring_file']
    ]

    const protein_columns = [
      { 
        field: 'uniprot_id', 
        headerName: 'UniProt ID',
        width: 300,
        renderCell: (params) => {
          let result = '';
          if (params.row.external_id) {
            result = omicspred_internal_link(params.row.external_id,'protein')
          }
          return result;
        }
      },
      { 
        field: 'protein_name', 
        headerName: 'Protein',
        width: 300,
        renderCell: (params) => {
          let result = '';
          if (params.row.name) {
            result = params.row.name;
          }
          return result;
        }
      }
    ]

    const fetchSummaryData = async () => {
      const data = await restApiCall(element+'/'+gene);
      console.log(data);
      setElementData(data);
    }

    const fetchProteinData = async () => {
      const data = await restApiCallPaginated('http://127.0.0.1:7000/rest/protein/search?gene_id='+gene);
      console.log(data);
      for (let i=0; i < data.length; i++) {
        data[i]['id'] = i+1;
      }
      setProteinData(data);
    }

    useEffect(() => {
      fetchSummaryData();
      fetchProteinData();
    },[])

    return (
      <div>
        <h2 className='page_title'>Gene <span>{elementData && elementData.name ? elementData.name : gene}</span></h2>
        {
          elementData && elementData.external_id_source=='Ensembl' && elementData.name ? <div className='mt-3 mb-3'>Ensembl ID: <Href href={'https://www.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g='+elementData.external_id} text={elementData.external_id}/></div> : ''
        }
        <DataTableFromRestApi url_suffix={url_suffix} columns={columns}/>
        { 
          proteinData ? <div className="mt-4"><h5>Associated protein(s)</h5><DataTable data={proteinData} columns={protein_columns}/></div> : ''
        }
      </div>
    );
}

export default Gene