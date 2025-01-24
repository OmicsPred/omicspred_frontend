import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import DocumentTitle from '../../../components/DocumentTitle';
import Href from '../../../components/Href';
import {score_metabolite_columns}  from "../../../components/table/columns/scores";
import restApiCall from '../../../components/RestAPI';
import { display_source, display_synonyms, display_xrefs, sort_data } from '../components/links';
import { display_description, no_entry_found } from '../../../components/Common';
import { loading_data } from '../../../components/Generic';
import { MolecularTraitContent, MolecularTraitAssociation } from '../components/components';


function Metabolite() {
    let { metabolite } = useParams();
    DocumentTitle('Metabolite '+metabolite);
    const [elementData, setElementData] = useState()
    const [noEntry, setNoEntry] = useState(false)
    const [pathwayData, setPathwayData] = useState([])

    const element = 'metabolite';

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
        if (data && Object.keys(data).length) {
            setElementData(data);
            if (data.pathways) {
                setPathwayData(sort_data(data.pathways))
            }
        }
        else {
            setNoEntry(true);
        }
    }

    const get_information_left_content = () => {
		return (
			<>
                <tr>
                    <td>Identifier</td>
                    { elementData.external_id ? <td>{external_id_link()}{display_source(elementData.external_id_source)}</td>:<td><i>NA</i></td>}
                </tr>
                { elementData.synonyms && elementData.synonyms.length > 0 ?
                    <tr><td>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</td><td>{display_synonyms(elementData.synonyms)}</td></tr>:''
                }
                { elementData.descriptions && elementData.descriptions.length ?
                    <tr><td>Description{elementData.descriptions.length > 1 ? 's' : ''}</td><td>{display_description(elementData.descriptions)}</td></tr>:''
                }
                { elementData.xrefs ? <tr><td>External reference{elementData.xrefs.length > 1 ? 's' : ''}</td><td>{display_xrefs(elementData.xrefs)}</td></tr>:''}
            </>
        )
    }

    const get_information_right_content = () => {
		if (pathwayData && pathwayData.length > 0) {
            return (<MolecularTraitAssociation pathways={pathwayData}/>)
		}
		return undefined;
    }

    useEffect(() => {
      fetchSummaryData();
    },[])

    return (
        <div>
            { elementData ?
                <>
                    <MolecularTraitContent
                        type={element}
                        id={metabolite}
                        sum_data={elementData}
                        sum_display_left={get_information_left_content()}
                        sum_display_right={get_information_right_content()}
                        scores_columns={score_metabolite_columns}
                    />
                </>
                : noEntry ?
					<>{ no_entry_found(element,metabolite) }</> : loading_data()
            }
        </div>
    );
}

export default Metabolite