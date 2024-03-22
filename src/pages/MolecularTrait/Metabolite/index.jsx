import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Href from '../../../components/Href';
import DataTableFromRestApi from "../../../components/table/DataTableFromRestApi";
import DataTable from '../../../components/table/DataTable';
import {common_cols} from "../../../components/table/columns/common";
import restApiCall from '../../../components/RestAPI';
import { display_synonyms, display_xrefs } from '../components/links';
import { op_title, op_subtitle } from '../../../components/Common';


function Metabolite() {
    let { metabolite } = useParams();
    const [elementData, setElementData] = useState([])
    const [pathwayData, setPathwayData] = useState([])

    const element = 'metabolite';
    const url_suffix = "score/searchby"+element+"/"+metabolite;
    const columns = [
        common_cols['omicspred_id'],
        common_cols['platform_type'],
        common_cols['platform_name'],
        common_cols['variants_number'],
        common_cols['scoring_file']
    ]

    const pathway_columns = [
		common_cols['pathway_id'],
		common_cols['pathway_id_source'],
		common_cols['pathway_name']
	]

    const external_id_link = () => {
        if (elementData.external_id_source == 'ChEBI') {
            return <Href href={process.env.URL_CHEBI+elementData.external_id} text={elementData.external_id}/>
        }
        else {
            return elementData.external_id
        }
    }

    const fetchSummaryData = async () => {
        const data = await restApiCall(element+'/'+metabolite);
        console.log(data);
        setElementData(data);
        if (data.pathways) {
            setPathwayData(data.pathways)
        }
    }

    useEffect(() => {
      fetchSummaryData();
    },[])

    return (
        <div>
            {op_title('metabolite', elementData, metabolite)}
            { elementData ?
                <ul className='key_val_line'>
                {
                    elementData.external_id ? <li><span className='line_key'>Identifier</span>{external_id_link()}</li> : ''
                }
                {
                    elementData.description ? <li><span className='line_key'>Description</span>{elementData.description}</li> : ''
                }
                {
                   elementData.synonyms ? <li><span className='line_key'>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</span>{display_synonyms(elementData.synonyms)}</li> : ''
                }
                {
                    elementData.xrefs ? <li><span className='line_key'>External reference{elementData.xrefs.length > 1 ? 's' : ''}</span>{display_xrefs(elementData.xrefs)}</li> : ''
                }
                </ul>
                : <div>Loading summary data ...</div> 
            }
            {op_subtitle('score')}
            <DataTableFromRestApi table_key="metabolite" url_suffix={url_suffix} columns={columns}/>
            { 
				elementData && pathwayData.length ? <div className="mt-4"><h5>Associated pathways(s)</h5><DataTable key="pathway" data={pathwayData} columns={pathway_columns}/></div> : <div className='mt-4'>No associated pathway found</div>
			}
        </div>
    );
}


export default Metabolite