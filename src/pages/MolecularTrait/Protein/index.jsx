import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import {common_cols} from '../../../components/table/columns/common';
import restApiCall from '../../../components/RestAPI';
import Href from '../../../components/Href';
import { display_gene_link } from '../components/links';
import { op_title, op_subtitle } from '../../../components/Common';


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

    const external_id_link = () => {
        if (elementData.external_id_source == 'UniProt') {
            return <Href href={process.env.URL_UNIPROT+"uniprotkb/"+elementData.external_id+"/entry"} text={elementData.external_id}/>
        }
        else {
            return elementData.external_id
        }
    }

    const fetchSummaryData = async () => {
        const data = await restApiCall(element+'/'+protein+'?include_gene=1');
        console.log(data);
        setElementData(data);
    }

    useEffect(() => {
        fetchSummaryData();
    },[])

    return (
        <div>
            {op_title('protein', elementData, protein)}
            {/* <h2 className='page_title'>Protein <span>{protein}</span></h2> */}
            <ul className='key_val_line'>
            <li><span className='line_key'>Identifier</span>{external_id_link()}</li>
            {/* { elementData && elementData.external_id_source == 'UniProt' ? <li><span className='line_key'>Source</span>{uniprot_source_link()}</li> : ''} */}
            { elementData && elementData.gene ? <li><span className='line_key'>Gene</span>{display_gene_link(elementData.gene)}</li>:''}
            </ul>
            {op_subtitle('score')}
            <DataTableFromRestApi table_key="protein" url_suffix={url_suffix} columns={columns}/>
        </div>
    );
}

export default Protein