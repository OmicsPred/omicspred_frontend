import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DocumentTitle from '../../components/DocumentTitle';
import Href from '../../components/Href';
import DataTable from '../../components/table/DataTable';
import { common_cols } from '../../components/table/columns/common';
import restApiCall from '../../components/RestAPI';
import { op_title, op_subtitle_no_asso, HeaderCard, no_entry_found } from '../../components/Common';
import { loading_data } from '../../components/Generic';
import ReactomeDiagram from './components/Diagram';
import { display_superpathways } from '../MolecularTrait/components/links';


function Pathway() {
	let { pathway } = useParams();
	DocumentTitle('Pathway '+pathway);
	const [elementData, setElementData] = useState()
	const [noEntry, setNoEntry] = useState(false)
	const [geneData, setGeneData] = useState([])
	const [metaboliteData, setMetaboliteData] = useState([])
	const [superpathwayData, setSuperpathwayData] = useState([])

    const element = 'pathway';

	const gene_scores_count_col = {...common_cols['scores_count'], field: 'pathway_genes__gene_score'}
	const metabolite_scores_count_col = {...common_cols['scores_count'], field: 'pathway_metabolites__metabolite_score'}

    const gene_columns = [
		common_cols['gene_id_from_list'],
		common_cols['gene_name_from_list'],
		common_cols['description'],
		gene_scores_count_col
	]

    const metabolite_columns = [
		common_cols['metabolite_id_from_list'],
		common_cols['metabolite_id_source_from_list'],
		common_cols['metabolite_name_from_list'],
		metabolite_scores_count_col
    ]

	const key_cols = ['external_id','name'];

    const fetchData = async () => {
		const data = await restApiCall(element+'/'+pathway);
		if (data && Object.keys(data).length) {
			setElementData(data);
			if (data.genes) {
				setGeneData(data.genes)
			}
			if (data.metabolites) {
				setMetaboliteData(data.metabolites)
			}
			if (data.superpathways) {
				setSuperpathwayData(data.superpathways)
			}
		}
		else {
			setNoEntry(true);
		}
	}

	const get_information_content = () => {
		return (
			<>
				{
					elementData.external_id_source=='Reactome' && elementData.name ? <tr><td>Reactome ID</td><td><Href href={process.env.URL_REACTOME_ENTRY+elementData.external_id} text={elementData.external_id}/></td></tr>:''
				}
				{ elementData.synonyms ? <tr><td>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</td><td>{display_synonyms(elementData.synonyms)}</td></tr>:''}
				{ superpathwayData.length ? <tr><td>Top Level Pathway{superpathwayData.length > 1 ? 's' : ''}</td><td>{display_superpathways(superpathwayData)}</td></tr>:''}
            </>
        )
    }

    useEffect(() => {
		fetchData();
	},[])

    return (
		<div>
			{ elementData ?
				<>
					{/* Summary Data */}
					{op_title(element, elementData, pathway)}
					{ elementData ? <HeaderCard type={element} content={get_information_content()} />:'' }

					{/* Reactome Diagram */}
					<ReactomeDiagram reactome_id={elementData.external_id} />

					{/* Associated genes */}
					{
						geneData.length ? <div key="gene_table" className="mt-4">{op_subtitle_no_asso('gene','Mapped genes',geneData.length)}<DataTable key="gene" data={geneData} columns={gene_columns} col_for_ids={key_cols}/></div> : ''
					}

					{/* Associated metabolites */}
					{
						metaboliteData.length ? <div key="metabolite_table" className="mt-4">{op_subtitle_no_asso('metabolite','Mapped metabolites',metaboliteData.length)}<DataTable key="metabolite" data={metaboliteData} columns={metabolite_columns} col_for_ids={key_cols}/></div> : ''
					}
				</>
				: noEntry ?
					<>{ no_entry_found(element,pathway) }</> : loading_data()
			}
		</div>
	);
}
export default Pathway