import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DocumentTitle from '../../../components/DocumentTitle';
import Href from '../../../components/Href';
import restApiCall from '../../../components/RestAPI';
import restApiCallPaginated from '../../../components/RestAPIPaginated';
import { display_description, no_entry_found } from '../../../components/Common';
import { loading_data } from '../../../components/Generic';
import { display_synonyms } from '../components/links';
import { MolecularTraitContent, MolecularTraitAssociation } from '../components/Content';


function Gene() {
	let { gene } = useParams();
	DocumentTitle('Gene '+gene);
	const [elementData, setElementData] = useState()
	const [noEntry, setNoEntry] = useState(false)
	const [proteinsData, setProteinsData] = useState([])
	const [pathwayData, setPathwayData] = useState([])

	const element = 'gene';

	const fetchSummaryData = async () => {
		const data = await restApiCall(element+'/'+gene);
		if (data && Object.keys(data).length) {
			setElementData(data);
			if (data.pathways) {
				setPathwayData(data.pathways)
			}
		}
		else {
			setNoEntry(true);
		}
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
				<MolecularTraitAssociation
                    proteins={proteinsData}
                    pathways={pathwayData}
				/>
			)
		}
		return undefined;
    }

	useEffect(() => {
		fetchSummaryData();
		fetchProteinData();
	},[])

	return (
		<div>
			{ elementData ?
				<>
					<MolecularTraitContent
						type={element}
						id={gene}
						sum_data={elementData}
						sum_display_left={get_information_left_content()}
						sum_display_right={get_information_right_content()}
					/>
				</>
				: noEntry ?
					<>{ no_entry_found(element,gene) }</> : loading_data()
            }
        </div>
	);
}

export default Gene