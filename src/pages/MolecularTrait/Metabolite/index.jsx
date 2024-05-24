import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Href from '../../../components/Href';
import DataTable from '../../../components/table/DataTable';
import { pathway_molecular_trait_columns }  from "../../../components/table/columns/pathways";

import restApiCall from '../../../components/RestAPI';
import { display_synonyms, display_xrefs } from '../components/links';
import { op_title, op_subtitle, display_information, display_description } from '../../../components/Common';
import { get_cohort_columns, get_table_columns, get_table_column_groups } from '../components/columns';


function Metabolite() {
    let { metabolite } = useParams();
    const [elementData, setElementData] = useState([])
    const [scoreData, setScoreData] = useState([])
    const [pathwayData, setPathwayData] = useState([])
    const [tableColumns, setTableColumns] = useState([])
    const [tableColumnGroups, setTableColumnGroups] = useState([])

    const element = 'metabolite';
    const url_score = "score/search/"+element+"/"+metabolite+'?include_performance_data=1';

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

    const get_information_content = () => {
		return (
			<>
            { elementData.external_id ? <tr><td>Identifier</td><td>{external_id_link()}</td></tr>:''}
            { elementData.descriptions ? <tr><td>Description{elementData.descriptions.length > 1 ? 's' : ''}</td><td>{display_description(elementData.descriptions)}</td></tr>:''}
            { elementData.synonyms ? <tr><td>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</td><td>{display_synonyms(elementData.synonyms)}</td></tr>:''}
            { elementData.xrefs ? <tr><td>External reference{elementData.xrefs.length > 1 ? 's' : ''}</td><td>{display_xrefs(elementData.xrefs)}</td></tr>:''}
            </>
        )
    }

    useEffect(() => {
      fetchSummaryData();
      fetchScoreData();
    },[])

    return (
        <div>
            {/* Summary Data */}
            {op_title('metabolite', elementData, metabolite)}
            { elementData ? display_information(element, get_information_content()):'' }

            {/* Associated scores */}
            {
				scoreData && scoreData.length ?
					<div className="mt-5">
						{op_subtitle('score',undefined,scoreData.length)}
						{/* <DataTable key="score" data={scoreData} columns={score_metabolite_columns}/> */}
                        <DataTable key="score" data={scoreData} columns={tableColumns} groups={tableColumnGroups}/>
					</div> : ''
			}

            {/* Associated pathways */}
            {
				pathwayData && pathwayData.length ?
                    <div className="mt-5">
                        {op_subtitle('pathway',undefined,pathwayData.length)}
                        <DataTable key="pathway" data={pathwayData} columns={pathway_molecular_trait_columns}/>
                    </div> :
                    <div className='mt-4'>No associated pathway found</div>
			}
        </div>
    );
}


export default Metabolite