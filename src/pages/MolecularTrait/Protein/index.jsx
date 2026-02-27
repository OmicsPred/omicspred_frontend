import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import restApiCall from '../../../components/RestAPI';
import Href from '../../../components/Href';
import { display_source, display_synonyms } from '../components/links';
import { display_description, no_entry_found } from '../../../components/Common';
import { loading_data } from '../../../components/Generic';
import { MolecularTraitContent, MolecularTraitAssociation, get_molecular_trait_api_url } from '../components/components';


function Protein() {
    let { protein } = useParams();
    const [elementData, setElementData] = useState()
    const [noEntry, setNoEntry] = useState(false)
    const [geneData, setGeneData] = useState()
    const [pathwayData, setPathwayData] = useState()

    const element = 'protein';

    const external_id_link = () => {
        if (elementData.external_id_source == 'UniProt') {
            return <Href href={process.env.URL_UNIPROT+"uniprotkb/"+elementData.external_id+"/entry"} text={elementData.external_id}/>
        }
        else {
            return elementData.external_id
        }
    }

    const fetchSummaryData = async () => {
        const rest_api_url = get_molecular_trait_api_url(element, protein);
        const data = await restApiCall(rest_api_url);
        if (data && Object.keys(data).length) {
            setElementData(data);
            if (data.gene) {
                setGeneData(data.gene);
            }
            setPathwayData(data.pathways)
        }
        else {
            setNoEntry(true);
        }
    }

    const get_information_left_content = () => {
		return (
			<>
                {elementData.external_id ?
                    <tr><td>Identifier</td><td>{external_id_link()}{display_source(elementData.external_id_source)}</td></tr>:<tr><td>Additional information</td><td>None</td></tr>
                }
                { elementData.synonyms && elementData.synonyms.length > 0 ?
                    <tr><td>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</td><td>{display_synonyms(elementData.synonyms)}</td></tr>:''
                }
                { elementData.descriptions && elementData.descriptions.length ?
                    <tr><td>Description</td><td>{display_description(elementData.descriptions)}</td></tr>:''
                }
            </>
        )
    }

    const get_information_right_content = () => {
		if ((geneData) || (pathwayData && pathwayData.length > 0)) {
			return (
                <MolecularTraitAssociation
                    genes={[geneData]}
                    pathways={pathwayData}
                />
            )
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
                        id={protein}
                        sum_data={elementData}
                        sum_display_left={get_information_left_content()}
                        sum_display_right={get_information_right_content()}
                    />
                </>
                : noEntry ?
                    <>{ no_entry_found(element,protein) }</> : loading_data()
            }
        </div>
    );
}

export default Protein