import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { ExclamationTriangle } from 'react-bootstrap-icons';
import DocumentTitle from '../../../components/DocumentTitle';
import Href from '../../../components/Href';
import restApiCall from '../../../components/RestAPI';
import restApiCallPaginated from '../../../components/RestAPIPaginated';
import { display_description, no_entry_found } from '../../../components/Common';
import { loading_data } from '../../../components/Generic';
import { display_source, display_synonyms } from '../components/links';
import { MolecularTraitContent, MolecularTraitAssociation } from '../components/components';


function Gene() {
	let { gene } = useParams();
	DocumentTitle('Gene '+gene);
	const [elementData, setElementData] = useState()
	const [noEntry, setNoEntry] = useState(false)
	const [proteinsData, setProteinsData] = useState([])
	const [pathwayData, setPathwayData] = useState([])

	const element = 'gene';

	const fetchSummaryData = async () => {
		// Fetch by external ID (should be used by default, except if the gene has no external ID)
		const data = await restApiCall(element+'/'+gene);
		if (data && Object.keys(data).length) {
			setElementData(data);
			if (data.pathways) {
				setPathwayData(data.pathways)
			}
		}
		else {
			// Fetch by gene name - get the first result
			const data_name = await restApiCall(element+'/search?gene='+gene);
			if (data_name) {
				if (data_name.results.length) {
					const data_result = data_name.results[0]
					setElementData(data_result);
					if (data_result.pathways) {
						setPathwayData(data_result.pathways)
					}
				}
			}
			else {
				setNoEntry(true);
			}
		}
	}

	const get_external_id = () => {
		const external_url = elementData.retired_gene_model ? process.env.URL_RETIRED_ENSEMBL_ENTRY : process.env.URL_ENSEMBL_ENTRY;
		return external_url+elementData.external_id
	}

	const fetchProteinData = async () => {
		const data = await restApiCallPaginated('protein/search?gene='+gene);
		setProteinsData(data);
	}

	const get_information_left_content = () => {
		return (
			<>
				{ elementData.name ?
					<tr><td>Identifier</td><td><Href href={get_external_id()} text={elementData.external_id}/>{display_source(elementData.external_id_source)}</td></tr>:''
				}
				{ elementData.retired_gene_model ?
					<tr><td>Status</td><td><ExclamationTriangle className='amber_color me-2'/>Gene model removed from Ensembl</td></tr>:''
				}
				{ elementData.synonyms && elementData.synonyms.length > 0 ?
					<tr><td>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</td><td>{display_synonyms(elementData.synonyms)}</td></tr>:''
				}
				{ elementData.descriptions && elementData.descriptions.length ?
					<tr><td>Description{elementData.descriptions.length > 1 ? 's' : ''}</td><td>{display_description(elementData.descriptions)}</td></tr>:''
				}
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