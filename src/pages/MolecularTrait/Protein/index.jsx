import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import restApiCall from '../../../components/RestAPI';
import Href from '../../../components/Href';
import { display_gene_link, display_pathways, sort_data } from '../components/links';
import { op_title, display_information_2_cards, display_description } from '../../../components/Common';
import { ScoresTable, PerformanceMetricsTable } from '../components/tables';


function Protein() {
    let { protein } = useParams();
    const [elementData, setElementData] = useState([])
    const [scoreData, setScoreData] = useState([])
    const [performanceMetricData, setPerformanceMetricData] = useState([])
    const [geneData, setGeneData] = useState([])
    const [pathwayData, setPathwayData] = useState([])


    const element = 'protein';
    const url_score = "score/search/"+element+"/"+protein;

    const external_id_link = () => {
        if (elementData.external_id_source == 'UniProt') {
            return <Href href={process.env.URL_UNIPROT+"uniprotkb/"+elementData.external_id+"/entry"} text={elementData.external_id}/>
        }
        else {
            return elementData.external_id
        }
    }

    const fetchSummaryData = async () => {
        const data = await restApiCall(element+'/'+protein+'?extend_schema=1');
        console.log(data);
        setElementData(data);
        if (data.gene) {
            setGeneData(data.gene);
        }
        setPathwayData(sort_data(data.pathways))
    }

    const fetchScoreData = async () => {
		const data = await restApiCall(url_score);
		if (data.results) {
			setScoreData(data.results)
		}
	}

    const fetchPerformanceMetrics = async () => {
        const score_metric_data = await restApiCall('performance/search/'+element+'/'+protein);
        console.log(score_metric_data);
        setPerformanceMetricData(score_metric_data.results);
    }

    const get_information_left_content = () => {
		return (
			<>
                <tr><td>Identifier</td><td>{external_id_link()}</td></tr>
                { elementData.descriptions && elementData.descriptions.length ?
                    <tr><td>Description</td><td>{display_description(elementData.descriptions)}</td></tr>:''
                }
            </>
        )
    }

    const get_information_right_content = () => {
		if ((geneData) || (pathwayData && pathwayData.length > 0)) {
			return (
				<>
					{ geneData ? <tr key='gene'><td><span className="bg_gene left_mark"></span>Gene</td><td>{display_gene_link(geneData)}</td></tr> : '' }
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
    },[])

    return (
        <div>
            {/* Summary Data */}
            {op_title('protein', elementData, protein)}
            <div className='op_card_container_info'>
				{
					elementData ? display_information_2_cards('protein',get_information_left_content(),'Associated data',get_information_right_content()) : ''
				}
			</div>

            {/* Associated scores */}
            { scoreData && scoreData.length ? <ScoresTable data={scoreData}/>:'' }

            {/* Performance metrics table */}
			{ performanceMetricData && performanceMetricData.length ? <PerformanceMetricsTable data={performanceMetricData}/>:'' }
        </div>
    );
}

export default Protein