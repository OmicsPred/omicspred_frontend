import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight} from 'react-bootstrap-icons';
import Href from '../../../components/Href';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import DataTable from '../../../components/table/DataTable';
import { common_cols } from '../../../components/table/columns/common';
import restApiCall from '../../../components/RestAPI';
import restApiCallPaginated from '../../../components/RestAPIPaginated';
import { op_title, op_subtitle } from '../../../components/Common';


function Gene() {
	let { gene } = useParams();
	const [elementData, setElementData] = useState([])
	const [proteinData, setProteinData] = useState([])
	const [pathwayData, setPathwayData] = useState([])

	const element = 'gene';
	const url_suffix = "score/searchby"+element+"/"+gene;
	const columns = [
		common_cols['omicspred_id'],
		common_cols['platform_type'],
		common_cols['platform_name'],
		common_cols['publication'],
		common_cols['variants_number'],
		common_cols['scoring_file']
	]

	const protein_columns = [
		common_cols['protein_id'],
		common_cols['protein_name']
	]

	const pathway_columns = [
		common_cols['pathway_id'],
		common_cols['pathway_name'],
		common_cols['superpathway_name'],
		common_cols['pathway_id_source']
	]

	const fetchSummaryData = async () => {
		const data = await restApiCall(element+'/'+gene);
		console.log(data);
		setElementData(data);
		if (data.pathways) {
			setPathwayData(data.pathways)
		}
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
			{op_title('gene', elementData, gene)}
			{ elementData ?
				<ul className='key_val_line'>
				{
					elementData.external_id_source=='Ensembl' && elementData.name ? <li><span className='line_key'>Ensembl ID</span><Href href={process.env.URL_ENSEMBL_ENTRY+elementData.external_id} text={elementData.external_id}/></li> : ''
				}
				{
					elementData.description ? <li><span className='line_key'>Description</span>{elementData.description}</li> : ''
				}
				{
					elementData.synonyms ? <li><span className='line_key'>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</span>{elementData.synonyms.map((synonym, index) => <span key={synonym.name}>{index ? ', ' : ''}{synonym.name}</span>)}</li> : ''
				}
				{
					elementData.biotype ? <li><span className='line_key'>Gene type</span>{elementData.biotype.replace('_', ' ')}</li> : ''
				}
				</ul>
				: <div>Loading summary data ...</div> 
			}
			{op_subtitle('score')}
			<DataTableFromRestApi table_key="gene" url_suffix={url_suffix} columns={columns}/>
			{ 
				proteinData && proteinData.length ? <div className="mt-4">{op_subtitle('protein')}<DataTable key="protein" data={proteinData} columns={protein_columns}/></div> : <div className='mt-4'>No associated protein found</div>
			}
			{ 
				elementData && pathwayData.length ? <div className="mt-4">{op_subtitle('pathway')}<DataTable key="pathway" data={pathwayData} columns={pathway_columns}/></div> : <div className='mt-4'>No associated pathway found</div>
			}
		</div>
	);
}

export default Gene