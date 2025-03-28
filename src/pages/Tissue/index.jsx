import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import DocumentTitle from '../../components/DocumentTitle';
import Href from '../../components/Href';
import restApiCall from '../../components/RestAPI';
import { op_title, op_subtitle, HeaderCard, display_description, no_entry_found } from '../../components/Common';
import { scoresBadge, loading_data } from '../../components/Generic';
import AncestryLegend from '../../components/ancestry/AncestryLegend';
import { scores_columns_with_ancestry } from '../../components/table/columns/scores';
import DataTableServer from '../../components/table/DataTableServer';


function Tissue() {
	let { tissue } = useParams();
	DocumentTitle('Tissue '+tissue);
	const [tissueData, setTissueData] = useState()
	const [noEntry, setNoEntry] = useState(false)
    // const [scoreData, setScoreData] = useState([])
    const [urlScore, setUrlScore] = useState('')

    const element = 'tissue';

	const fetchSummaryData = async () => {
		const data = await restApiCall(element+'/'+tissue);
		if (data && Object.keys(data).length) {
			setTissueData(data);
            setUrlScore('score/search?tissue_id='+data.id)
		}
		else {
			setNoEntry(true);
		}
	}


	const get_information_content = () => {
		return (
			<>
				{ tissueData.label ?
					<tr><td>Identifier</td><td><Href href={tissueData.url} text={tissueData.id}/></td></tr>:''
				}
				{ tissueData.description && tissueData.description.length ?
					<tr><td>Description</td><td>{display_description([tissueData.description])}</td></tr>:''
				}
                <tr><td># Score{tissueData.scores_count > 1 ? 's' : ''}</td><td>{scoresBadge(tissueData.scores_count)}</td></tr>
			</>
		)
	}

	useEffect(() => {
		fetchSummaryData();
	},[])

	return (
		<div>
			{ tissueData ?
				<>
					{/* Summary Data */}
					{op_title(element, tissueData, tissueData.label)}
					<HeaderCard type={element} content={get_information_content()}/>

					{/* Associated scores */}
                    { tissueData.scores_count > 0 ?
                        <div className="mt-5">
                            {op_subtitle('score', undefined, tissueData.scores_count)}
                            <div className='d-flex mb-3'>
                                <AncestryLegend />
                            </div>
                            <DataTableServer table_key="tissue_score" title='score' type='score' url_suffix={urlScore} columns={scores_columns_with_ancestry}/>
                        </div> : ''
                    }
				</>
				: noEntry ?
					<>{ no_entry_found(element, tissue) }</> : loading_data()
			}
        </div>
	);
}

export default Tissue