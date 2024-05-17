import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import DataTable from '../../../components/table/DataTable';
import {common_cols} from '../../../components/table/columns/common';
import {score_molecular_trait_columns}  from "../../../components/table/columns/scores";
import { pathway_molecular_trait_columns} from '../../../components/table/columns/pathways';
import restApiCall from '../../../components/RestAPI';
import Href from '../../../components/Href';
import { display_gene_link, display_description } from '../components/links';
import { op_title, op_subtitle } from '../../../components/Common';


function Protein() {
    let { protein } = useParams();
    const [elementData, setElementData] = useState([])
    const [scoreData, setScoreData] = useState([])
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
        const data = await restApiCall(element+'/'+protein+'?include_gene=1');
        console.log(data);
        setElementData(data);
        setPathwayData(data.pathways)
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
            {op_title('protein', elementData, protein)}
            {/* <ul className='key_val_line'>
                <li><span className='line_key'>Identifier</span>{external_id_link()}</li>
                { elementData ?
                    <>
                        {
                            elementData.descriptions && elementData.descriptions.length ?
                                <li><span className='line_key'>Description</span>{display_description(elementData.descriptions)}</li> : ''
                        }
                        { elementData.gene ? <li><span className='line_key'>Gene</span>{display_gene_link(elementData.gene)}</li> : ''}
                    </>
                :''}
            </ul> */}

            <div className='d-flex'>
                <div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column me-4">
                    <div className="card op_card mb-3 me-5">
                        <div className="card-header"><h5 className="mb-0">Protein information</h5></div>
                        <div className="card-body">
                            <div className="card-text">
                                <table className='table_card table_card_col_centered'>
                                    <tbody>
                                        <tr><td>Identifier</td><td>{external_id_link()}</td></tr>
                                        { elementData.descriptions && elementData.descriptions.length ?
                                            <tr><td>Description</td><td>{display_description(elementData.descriptions)}</td></tr>:''
                                        }
                                        { elementData.gene ? <tr><td>Gene</td><td>{display_gene_link(elementData.gene)}</td></tr>:''}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <DataTableFromRestApi table_key="protein" url_suffix={url_suffix} columns={score_molecular_trait_columns}/> */}
            {
				scoreData && scoreData.length ?
					<div className="mt-5">
						{op_subtitle('score',undefined,scoreData.length)}
						<DataTable key="score" data={scoreData} columns={score_molecular_trait_columns}/>
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

export default Protein