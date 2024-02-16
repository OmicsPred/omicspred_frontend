import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import {common_cols} from "../../components/table/columns/common";
import restApiCall from '../../components/RestAPI';
import Href from '../../components/Href';


function Protein() {
    let { protein } = useParams();
    const [elementData, setElementData] = useState([])

    const element = 'protein';
    const url_suffix = "score/searchby"+element+"/"+protein;
    const columns = [
        common_cols['omicspred_id'],
        common_cols['platform_type'],
        common_cols['platform_name'],
        common_cols['publication'],
        common_cols['variants_number'],
        common_cols['scoring_file']
    ]

    const gene_details = (gene) => {
      const gene_name = gene.name;
      console.log("GENE NAME: "+gene_name);
      const gene_ext_id = gene.external_id;
      if (gene_name) {
        return (
          <>
            <Href text={gene_name} href={'/gene/'+gene_name}/>{gene_ext_id ? <small className='ps-2'>({gene_ext_id})</small>:''}
          </>
        );
      }
      else {
        return <Href text={gene_ext_id} href={'/gene/'+gene_ext_id}/>
      }
    }

    const fetchSummaryData = async () => {
      const data = await restApiCall(element+'/'+protein+'?include_gene=1');
      console.log(data);
      setElementData(data);
      console.log(data.gene)
    }

    useEffect(() => {
        fetchSummaryData();
    },[])

    return (
      <div>
        <h2 className='page_title'>Protein <span>{protein}</span></h2>
        <ul className='key_val_line'>
          <li><span className='line_key'>Name</span>{elementData.name}</li>
          { elementData.gene ? <li><span className='line_key'>Gene</span>{gene_details(elementData.gene)}</li>:''}
        </ul>
        <DataTableFromRestApi table_key="protein" url_suffix={url_suffix} columns={columns}/>
      </div>
    );
}

export default Protein