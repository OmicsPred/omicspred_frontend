import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Href from "../../components/Href";
import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import DataTable from "../../components/table/DataTable";
import {common_cols, omicspred_internal_link} from "../../components/table/columns/common";
import restApiCall from '../../components/RestAPI';
import restApiCallPaginated from '../../components/RestAPIPaginated';


function Gene() {
    let { gene } = useParams();
    const [elementData, setElementData] = useState([])
    const [proteinData, setProteinData] = useState([])

    const element = 'gene';
    const url_suffix = "score/searchby"+element+"/"+gene;
    const columns = [
        common_cols['omicspred_id'],
        common_cols['platform_type'],
        common_cols['platform_name'],
        common_cols['variants_number'],
        common_cols['scoring_file']
    ]

    const protein_columns = [
      common_cols['protein_id'],
      common_cols['protein_name']
    ]

    const fetchSummaryData = async () => {
      const data = await restApiCall(element+'/'+gene);
      console.log(data);
      setElementData(data);
    }

    const fetchProteinData = async () => {
      const data = await restApiCallPaginated('protein/search?gene_id='+gene);
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
        <ul className='key_val_line'>
        {
          elementData && elementData.external_id_source=='Ensembl' && elementData.name ? <li><span className='line_key'>Ensembl ID</span><Href href={'https://www.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g='+elementData.external_id} text={elementData.external_id}/></li> : ''
        }
        {
          elementData && elementData.biotype ? <li><span className='line_key'>Gene type</span>{elementData.biotype.replace('_', ' ')}</li> : ''
        }
        </ul>
        <DataTableFromRestApi url_suffix={url_suffix} columns={columns}/>
        { 
          proteinData ? <div className="mt-4"><h5>Associated protein(s)</h5><DataTable data={proteinData} columns={protein_columns}/></div> : ''
        }
      </div>
    );
}

export default Gene