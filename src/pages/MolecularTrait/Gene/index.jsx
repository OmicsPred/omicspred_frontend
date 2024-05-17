import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Href from '../../../components/Href';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import DataTable from '../../../components/table/DataTable';
import { common_cols } from '../../../components/table/columns/common';
import {score_molecular_trait_columns}  from "../../../components/table/columns/scores";
import { pathway_molecular_trait_columns} from '../../../components/table/columns/pathways';
import restApiCall from '../../../components/RestAPI';
import restApiCallPaginated from '../../../components/RestAPIPaginated';
import { op_title, op_subtitle } from '../../../components/Common';
import { display_description, display_synonyms } from '../components/links';


function Gene() {
	let { gene } = useParams();
	const [elementData, setElementData] = useState([])
	const [scoreData, setScoreData] = useState([])
	const [proteinData, setProteinData] = useState([])
	const [pathwayData, setPathwayData] = useState([])

	const element = 'gene';
	const url_score = "score/search/"+element+"/"+gene;

	const protein_id_col = {...common_cols['protein_id'], field: 'external_id'}
	const protein_name_col = {...common_cols['protein_name'], field: 'name',minWidth:'400'}
	const protein_columns = [
		protein_id_col,
		protein_name_col
	]

	const fetchSummaryData = async () => {
		const data = await restApiCall(element+'/'+gene);
		console.log(data);
		setElementData(data);
		if (data.pathways) {
			setPathwayData(data.pathways)
		}
	}

	const fetchScoreData = async () => {
		const data = await restApiCall(url_score);
		if (data.results) {
			setScoreData(data.results)
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
		fetchScoreData();
		fetchProteinData();
	},[])

	return (
		<div>
			{op_title('gene', elementData, gene)}
			{/* { elementData ?
				<ul className='key_val_line'>
				{
					elementData.external_id_source=='Ensembl' && elementData.name ? <li><span className='line_key'>Ensembl ID</span><Href href={process.env.URL_ENSEMBL_ENTRY+elementData.external_id} text={elementData.external_id}/></li> : ''
				}
				{
					elementData.description ? <li><span className='line_key'>Description</span>{elementData.description}</li> : ''
				}
				{
					elementData.synonyms ? <li><span className='line_key'>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</span>{display_synonyms(elementData.synonyms)}</li> : ''
				}
				{
					elementData.biotype ? <li><span className='line_key'>Gene type</span>{elementData.biotype.replace('_', ' ')}</li> : ''
				}
				</ul>
				: <div>Loading summary data ...</div>
			} */}
			{ elementData ?
				<div className='d-flex'>
					<div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column me-4">
						<div className="card op_card mb-3 me-5">
							<div className="card-header"><h5 className="mb-0">Gene information</h5></div>
							<div className="card-body">
								<div className="card-text">
									<table className='table_card table_card_col_centered'>
										<tbody>
											{ elementData.external_id_source=='Ensembl' && elementData.name ?
												<tr><td>Ensembl ID</td><td><Href href={process.env.URL_ENSEMBL_ENTRY+elementData.external_id} text={elementData.external_id}/></td></tr>:''
											}
											{ elementData.descriptions && elementData.descriptions.length ?
												<tr><td>Description{elementData.descriptions.length > 1 ? 's' : ''}</td><td>{display_description(elementData.descriptions)}</td></tr>:''
											}
											{ elementData.synonyms ? <tr><td>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</td><td>{display_synonyms(elementData.synonyms)}</td></tr>:''}
											{ elementData.biotype ? <tr><td>Gene type</td><td>{elementData.biotype.replace('_', ' ')}</td></tr>:''}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>:''
			}

			{/* <DataTableFromRestApi table_key="gene" url_suffix={url_suffix} columns={score_molecular_trait_columns}/> */}
			{
				scoreData && scoreData.length ?
					<div className="mt-5">
						{op_subtitle('score',undefined,scoreData.length)}
						<DataTable key="score" data={scoreData} columns={score_molecular_trait_columns}/>
					</div> : ''
			}
			{
				proteinData && proteinData.length ?
					<div className="mt-5">
						{op_subtitle('protein',undefined,proteinData.length)}
						<DataTable key="protein" data={proteinData} columns={protein_columns}/>
					</div> :
					<div className='mt-4'>No associated protein found</div>
			}
			{
				pathwayData && pathwayData.length ?
					<div className="mt-5">{op_subtitle('pathway',undefined,pathwayData.length)}
						<DataTable key="pathway" data={pathwayData} columns={pathway_molecular_trait_columns}/>
					</div> :
					<div className='mt-4'>No associated pathway found</div>
			}
		</div>
	);
}

export default Gene