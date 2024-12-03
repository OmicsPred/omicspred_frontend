import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import DocumentTitle from '../../../components/DocumentTitle';
import restApiCall from '../../../components/RestAPI';
import Href from '../../../components/Href';
import { display_source, display_synonyms } from '../components/links';
import { display_description, no_entry_found } from '../../../components/Common';
import { loading_data } from '../../../components/Generic';
import { MolecularTraitContent, MolecularTraitAssociation } from '../components/Content';


function Protein() {
    let { protein } = useParams();
    DocumentTitle('Protein '+protein);
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
        const data = await restApiCall(element+'/'+protein+'?extend_schema=1');
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
                <tr><td>Identifier</td><td>{external_id_link()}{display_source(elementData.external_id_source)}</td></tr>
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