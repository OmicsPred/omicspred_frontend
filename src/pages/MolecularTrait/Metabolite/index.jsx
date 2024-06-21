import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Href from '../../../components/Href';
import {score_metabolite_columns}  from "../../../components/table/columns/scores";
import restApiCall from '../../../components/RestAPI';
import { display_synonyms, display_xrefs, display_pathways, sort_data } from '../components/links';
import { op_title, display_description, display_information_2_cards } from '../../../components/Common';
import { ScoresTable, PerformanceMetricsTable } from '../components/tables';


function Metabolite() {
    let { metabolite } = useParams();
    const [elementData, setElementData] = useState([])
    const [scoreData, setScoreData] = useState([])
    const [performanceMetricData, setPerformanceMetricData] = useState([])
    const [pathwayData, setPathwayData] = useState([])

    const element = 'metabolite';
    const url_score = "score/search/"+element+"/"+metabolite;

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
        const score_metric_data = await restApiCall('performance/search/'+element+'/'+metabolite);
        console.log(score_metric_data);
        setPerformanceMetricData(score_metric_data.results);
    }

    const get_information_left_content = () => {
		return (
			<>
                { elementData.external_id ? <tr><td>Identifier</td><td>{external_id_link()}</td></tr>:''}
                { elementData.descriptions ? <tr><td>Description{elementData.descriptions.length > 1 ? 's' : ''}</td><td>{display_description(elementData.descriptions)}</td></tr>:''}
                { elementData.synonyms ? <tr><td>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</td><td>{display_synonyms(elementData.synonyms)}</td></tr>:''}
                { elementData.xrefs ? <tr><td>External reference{elementData.xrefs.length > 1 ? 's' : ''}</td><td>{display_xrefs(elementData.xrefs)}</td></tr>:''}
            </>
        )
    }

    const get_information_right_content = () => {
		if (pathwayData && pathwayData.length > 0) {
			return ( display_pathways(pathwayData) );
		}
		return undefined;
    }

    useEffect(() => {
      fetchSummaryData();
      fetchScoreData();
      fetchPerformanceMetrics();
    },[])

    return (
        <div>
            {/* Summary Data */}
            {op_title('metabolite', elementData, metabolite)}
            <div className='op_card_container_info'>
				{
					elementData ? display_information_2_cards('metabolite',get_information_left_content(),'Associated data',get_information_right_content()) : ''
				}
			</div>

            {/* Associated scores */}
            { scoreData && scoreData.length ? <ScoresTable data={scoreData} columns={score_metabolite_columns}/>:'' }

            {/* Performance metrics table */}
			{ performanceMetricData && performanceMetricData.length ? <PerformanceMetricsTable data={performanceMetricData}/>:'' }
        </div>
    );
}


export default Metabolite