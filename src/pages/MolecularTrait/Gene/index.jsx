import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Href from '../../../components/Href';
import DataTable from '../../../components/table/DataTable';
import { common_cols } from '../../../components/table/columns/common';
import { pathway_molecular_trait_columns} from '../../../components/table/columns/pathways';
import restApiCall from '../../../components/RestAPI';
import restApiCallPaginated from '../../../components/RestAPIPaginated';
import { op_title, op_subtitle, display_information, display_description } from '../../../components/Common';
import { display_synonyms, display_proteins } from '../components/links';
import { get_cohort_columns, get_table_columns, get_table_column_groups } from '../components/columns';



function Gene() {
	let { gene } = useParams();
	const [elementData, setElementData] = useState([])
	const [scoreData, setScoreData] = useState([])
	const [proteinData, setProteinData] = useState([])
	const [pathwayData, setPathwayData] = useState([])
	const [tableColumns, setTableColumns] = useState([])
	const [tableColumnGroups, setTableColumnGroups] = useState([])

	const element = 'gene';
	const url_score = "score/search/"+element+"/"+gene+'?include_performance_data=1';

	const protein_id_col = {...common_cols['protein_id'], field: 'external_id'}
	const protein_name_col = {...common_cols['protein_name'], field: 'name',minWidth:'400'}
	const protein_columns = [
		protein_id_col,
		protein_name_col,
		common_cols['protein_desc']
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
			const results = data.results;
			const cohort_columns = get_cohort_columns(results);
            const table_columns = get_table_columns(cohort_columns);
            setTableColumns(table_columns);
            const table_col_grp = get_table_column_groups(cohort_columns);
            setTableColumnGroups(table_col_grp);
			setScoreData(results)
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

	const get_information_content = () => {
		return (
			<>
			{ elementData.external_id_source=='Ensembl' && elementData.name ?
				<tr><td>Ensembl ID</td><td><Href href={process.env.URL_ENSEMBL_ENTRY+elementData.external_id} text={elementData.external_id}/></td></tr>:''
			}
			{ elementData.descriptions && elementData.descriptions.length ?
				<tr><td>Description{elementData.descriptions.length > 1 ? 's' : ''}</td><td>{display_description(elementData.descriptions)}</td></tr>:''
			}
			{ elementData.synonyms ? <tr><td>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</td><td>{display_synonyms(elementData.synonyms)}</td></tr>:''}
			{ elementData.biotype ? <tr><td>Gene type</td><td>{elementData.biotype.replace('_', ' ')}</td></tr>:''}
			{/* Protein entry */}
			{ proteinData && proteinData.length ? <tr><td>Protein{proteinData.length > 1 ? 's' : ''}</td><td>{display_proteins(proteinData)}</td></tr>:''}
			</>
		)
	}

	useEffect(() => {
		fetchSummaryData();
		fetchScoreData();
		fetchProteinData();
	},[])

	return (
		<div>
			{/* Summary Data */}
			{op_title('gene', elementData, gene)}
			<div className='op_card_container_info'>
				{ elementData ? display_information(element, get_information_content()):'' }
			</div>
			{/* Associated scores */}
			{
				scoreData && scoreData.length ?
					<div className="mt-5">
						{op_subtitle('score',undefined,scoreData.length)}
						{/* <DataTable key="score" data={scoreData} columns={score_molecular_trait_columns}/> */}
						<DataTable key="score" data={scoreData} columns={tableColumns} groups={tableColumnGroups}/>

					</div> : ''
			}

			{/* Associated proteins */}
			{
				proteinData && proteinData.length ?
					<div className="mt-5">
						{op_subtitle('protein',undefined,proteinData.length)}
						<DataTable key="protein" data={proteinData} columns={protein_columns}/>
					</div> :
					<div className='mt-4'>No associated protein found</div>
			}

			{/* Associated pathways */}
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