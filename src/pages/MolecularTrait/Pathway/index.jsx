import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Href from '../../../components/Href';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import DataTable from '../../../components/table/DataTable';
import { common_cols } from '../../../components/table/columns/common';
import restApiCall from '../../../components/RestAPI';
import restApiCallPaginated from '../../../components/RestAPIPaginated';


function Pathway() {
	let { pathway } = useParams();
	const [elementData, setElementData] = useState([])
	const [geneData, setGeneData] = useState([])
	const [metaboliteData, setMetaboliteData] = useState([])

    const element = 'pathway';

    const gene_columns = [
		common_cols['gene_id_from_list'],
		common_cols['gene_name_from_list']
        // common_cols['gene_id'],
		// common_cols['gene_name'],
	]
    const metabolite_columns = [
		common_cols['metabolite_id_from_list'],
		common_cols['metabolite_id_source_from_list'],
		common_cols['metabolite_name_from_list']
        // common_cols['metabolite_id'],
        // common_cols['metabolite_name']
    ]

    const fetchData = async () => {
		const data = await restApiCall(element+'/'+pathway);
		console.log(data);
		setElementData(data);
		if (data.genes) {
			setGeneData(data.genes)
		}
		if (data.metabolites) {
			setMetaboliteData(data.metabolites)
		}
	}

    useEffect(() => {
		fetchData();
	},[])

    return (
		<div>
			<h2 className='page_title'>Pathway <span>{elementData && elementData.name ? elementData.name : pathway}</span></h2>
			{ elementData ?
				<>
					<ul className='key_val_line'>
					{
						elementData.external_id_source=='Reactome' && elementData.name ? <li><span className='line_key'>Reactome ID</span><Href href={process.env.URL_REACTOME_ENTRY+elementData.external_id} text={elementData.external_id}/></li> : ''
					}
					{
						elementData.synonyms ? <li><span className='line_key'>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</span>{elementData.synonyms.map((synonym, index) => <span key={synonym.name}>{index ? ', ' : ''}{synonym.name}</span>)}</li> : ''
					}
					</ul>
					{
						geneData.length ? <div className="mt-4"><h5>Associated gene(s)</h5><DataTable key="gene" data={geneData} columns={gene_columns}/></div> : ''
					}
					{
						metaboliteData.length ? <div className="mt-4"><h5>Associated metabolites(s)</h5><DataTable key="metabolite" data={metaboliteData} columns={metabolite_columns}/></div> : ''
					}
				</>
				: <div>Loading data ...</div> 
			}
		</div>
	);
}
export default Pathway