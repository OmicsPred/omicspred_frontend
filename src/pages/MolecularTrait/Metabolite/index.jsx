import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Href from '../../../components/Href';
import DataTableFromRestApi from "../../../components/table/DataTableFromRestApi";
import DataTable from '../../../components/table/DataTable';
import { common_cols } from "../../../components/table/columns/common";
import { score_metabolite_columns }  from "../../../components/table/columns/scores";
import { pathway_molecular_trait_columns }  from "../../../components/table/columns/pathways";

import restApiCall from '../../../components/RestAPI';
import { display_description, display_synonyms, display_xrefs } from '../components/links';
import { op_title, op_subtitle } from '../../../components/Common';


function Metabolite() {
    let { metabolite } = useParams();
    const [elementData, setElementData] = useState([])
    const [scoreData, setScoreData] = useState([])
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
            setPathwayData(data.pathways)
        }
    }

    const fetchScoreData = async () => {
		const data = await restApiCall(url_score);
		if (data.results) {
			setScoreData(data.results)
		}
	}

    useEffect(() => {
      fetchSummaryData();
      fetchScoreData();
    },[])

    return (
        <div>
            {op_title('metabolite', elementData, metabolite)}
            {/* { elementData ?
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
            } */}
            { elementData ?
				<div className='d-flex'>
					<div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column me-4">
						<div className="card op_card mb-3 me-5">
							<div className="card-header"><h5 className="mb-0">Metabolite information</h5></div>
							<div className="card-body">
								<div className="card-text">
									<table className='table_card table_card_col_centered'>
										<tbody>
											{ elementData.external_id ? <tr><td>Identifier</td><td>{external_id_link()}</td></tr>:''}
											{ elementData.descriptions ? <tr><td>Description{elementData.descriptions.length > 1 ? 's' : ''}</td><td>{display_description(elementData.descriptions)}</td></tr>:''}
											{ elementData.synonyms ? <tr><td>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</td><td>{display_synonyms(elementData.synonyms)}</td></tr>:''}
											{ elementData.xrefs ? <tr><td>External reference{elementData.xrefs.length > 1 ? 's' : ''}</td><td>{display_xrefs(elementData.xrefs)}</td></tr>:''}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>:''
			}
            {/* {op_subtitle('score')} */}
            {/* <DataTableFromRestApi table_key="metabolite" url_suffix={url_suffix} columns={score_metabolite_columns}/> */}
            {
				scoreData && scoreData.length ?
					<div className="mt-5">
						{op_subtitle('score',undefined,scoreData.length)}
						<DataTable key="score" data={scoreData} columns={score_metabolite_columns}/>
					</div> : ''
			}
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