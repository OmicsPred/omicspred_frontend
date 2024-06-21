import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Href from '../../../components/Href';
import restApiCall from '../../../components/RestAPI';
import restApiCallPaginated from '../../../components/RestAPIPaginated';
import { op_title, display_description, display_information_2_cards } from '../../../components/Common';
import { display_synonyms, display_protein_link, display_pathways, sort_data } from '../components/links';
import { ScoresTable, PerformanceMetricsTable } from '../components/tables';


function Gene() {
	let { gene } = useParams();
	const [elementData, setElementData] = useState([])
	const [scoreData, setScoreData] = useState([])
	const [performanceMetricData, setPerformanceMetricData] = useState([])
	const [proteinsData, setProteinsData] = useState([])
	const [pathwayData, setPathwayData] = useState([])

	const element = 'gene';
	const url_score = "score/search/"+element+"/"+gene;

	const fetchSummaryData = async () => {
		const data = await restApiCall(element+'/'+gene);
		console.log(data);
		setElementData(data);
		if (data.pathways) {
			setPathwayData(sort_data(data.pathways))
		}
	}

	const fetchScoreData = async () => {
		const data = await restApiCall(url_score);
		if (data.results) {
			setScoreData(data.results)
		}
	}

	const fetchPerformanceMetrics = async () => {
		const score_metric_data = await restApiCall('performance/search/'+element+'/'+gene);
        console.log(score_metric_data);
        setPerformanceMetricData(score_metric_data.results);
    }


	const fetchProteinData = async () => {
		const data = await restApiCallPaginated('protein/search?gene='+gene);
		setProteinsData(data);
	}


	const get_information_left_content = () => {
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
			</>
		)
	}

	const get_information_right_content = () => {
		if ((proteinsData && proteinsData.length > 0) || (pathwayData && pathwayData.length > 0)) {
			return (
				<>
					{ proteinsData && proteinsData.length > 0 ? <tr key='proteins'><td><span className="bg_protein left_mark"></span>Protein{proteinsData.length > 1 && 's'}</td><td>{proteinsData.map((data, index) => display_protein_link(data,index))}</td></tr> : '' }
					{ pathwayData && pathwayData.length > 0 ? display_pathways(pathwayData) : '' }
				</>
			)
		}
		return undefined;
    }

	useEffect(() => {
		fetchSummaryData();
		fetchScoreData();
		fetchPerformanceMetrics();
		fetchProteinData();
	},[])

	return (
		<div>
			{/* Summary Data */}
			{op_title('gene', elementData, gene)}
			<div className='op_card_container_info'>
				{
					elementData ? display_information_2_cards('gene',get_information_left_content(),'Associated data',get_information_right_content()) : ''
				}
			</div>

			{/* Associated scores */}
			{ scoreData && scoreData.length ? <ScoresTable data={scoreData}/>:'' }

			{/* Performance metrics table */}
			{ performanceMetricData && performanceMetricData.length ? <PerformanceMetricsTable data={performanceMetricData}/>:'' }
		</div>
	);
}

export default Gene