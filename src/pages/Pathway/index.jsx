import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Tooltip from "@mui/material/Tooltip";
import { ArrowUpSquareFill, ArrowRight, Table } from 'react-bootstrap-icons';
import Href from '../../components/Href';
import DataTableServer from '../../components/table/DataTableServer';
import { common_cols } from '../../components/table/columns/common';
import restApiCall from '../../components/RestAPI';
import { op_title, op_subtitle_no_asso, Header2Cards, element_icon, no_entry_found } from '../../components/Common';
import { loading_data, Note, thousandifyNumber } from '../../components/Generic';
import ReactomeDiagram from './components/Diagram';
import ReactomeTree from './components/Tree';
import { display_source, display_superpathways, display_synonyms } from '../MolecularTrait/components/links';


function Pathway() {
	let { pathway } = useParams();
	const [elementData, setElementData] = useState()
	const [noEntry, setNoEntry] = useState(false)
	const [geneCount, setGeneCount] = useState([])
	const [proteinCount, setProteinCount] = useState([])
	const [metaboliteCount, setMetaboliteCount] = useState([])
	const [superpathwayData, setSuperpathwayData] = useState([])

    const element = 'pathway';

	const gene_search_url = 'gene/search?include_scores_count=1&'+element+'='+pathway;
	const protein_search_url = 'protein/search?include_scores_count=1&'+element+'='+pathway;
	const metabolite_search_url = 'metabolite/search?include_scores_count=1&'+element+'='+pathway;

	const gene_scores_count_col = {...common_cols['scores_count'], field: 'pathway_genes__gene_score'}
	const protein_scores_count_col = {...common_cols['scores_count'], field: 'pathway_proteins__protein_score'}
	const metabolite_scores_count_col = {...common_cols['scores_count'], field: 'pathway_metabolites__metabolite_score'}

    const gene_columns = [
		common_cols['gene_id_from_list'],
		common_cols['gene_name_from_list'],
		common_cols['description'],
		gene_scores_count_col
	]

	const protein_columns = [
		common_cols['protein_id_from_list'],
		common_cols['protein_name_from_list'],
		common_cols['description'],
		protein_scores_count_col
	]

    const metabolite_columns = [
		common_cols['metabolite_id_from_list'],
		common_cols['metabolite_id_source_from_list'],
		common_cols['metabolite_name_from_list'],
		metabolite_scores_count_col
    ]

	const key_cols = ['external_id','name'];


	const reactome_link_text = () => {
        return (<>Reactome "Identifier mapping files <ArrowRight /> All levels of the pathway hierarchy"</>)
    }

	const reactome_note = () => {
		return (
			<>These <span className='fw-bold'>Pathway / Molecular Traits</span> mappings come from Reactome (source: <Href text={reactome_link_text()} href='https://reactome.org/download-data' />).</>
		)
	}

    const fetchPathwayData = async () => {
		const data = await restApiCall(element+'/'+pathway);
		if (data && Object.keys(data).length) {
			setElementData(data);
			setGeneCount(data.genes_count)
			setProteinCount(data.proteins_count)
			setMetaboliteCount(data.metabolites_count)
			if (data.superpathways) {
				setSuperpathwayData(data.superpathways)
			}
		}
		else {
			setNoEntry(true);
		}
	}

	const get_information_left_content = () => {
		return (
			<>
				{ elementData.name ?
					<tr><td>Identifier</td><td><Href href={process.env.URL_REACTOME_ENTRY+elementData.external_id} text={elementData.external_id}/>{display_source(elementData.external_id_source)}</td></tr>:''
				}
				{ elementData.synonyms && elementData.synonyms.lengh > 0 ?
					<tr><td>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</td><td>{display_synonyms(elementData.synonyms)}</td></tr>:''
				}
				{ superpathwayData.length ?
					<tr><td>Top Level Pathway{superpathwayData.length > 1 ? 's' : ''}</td><td>{display_superpathways(superpathwayData)}</td></tr>:''
				}
				{ elementData.top_level == true ?
					<tr><td><ArrowUpSquareFill className="color_pathway me-2" size="16"/>Top Level Pathway</td><td>Yes</td></tr>:''
				}
				<ReactomeTree pathway={elementData}/>
            </>
        )
    }

	const get_information_right_content = () => {
		return (
			<>
				{/* Linked genes */}
				{ geneCount > 0 ?
					<tr>
						<td>{element_icon('gene')}<span>Mapped gene{geneCount > 1 && 's'}</span></td>
						<td key='genes_data'>
							<div className='d-flex justify-content-between'>
								{thousandifyNumber(geneCount)}
								<Tooltip title="See details in the Gene table at the bottom of the current page">
									<div className="ms-3" style={{marginTop:"-2px"}}>
										<Href href="#gene_table" icon={<Table/>}/>
									</div>
								</Tooltip>
							</div>
						</td>
					</tr> : ''
				}
				{/* Linked proteins */}
				{ proteinCount > 0 ?
					<tr>
						<td>{element_icon('protein')}<span>Mapped protein{proteinCount > 1 && 's'}</span></td>
						<td key='proteins_data'>
							<div className='d-flex justify-content-between'>
								{thousandifyNumber(proteinCount)}
								<Tooltip title="See details in the Protein table at the bottom of the current page">
									<div className="ms-3" style={{marginTop:"-2px"}}>
										<Href href="#protein_table" icon={<Table/>}/>
									</div>
								</Tooltip>
							</div>
						</td>
					</tr> : ''
				}
				{/* Linked metabolites */}
				{ metaboliteCount > 0 ?
					<tr>
						<td>{element_icon('metabolite')}<span>Mapped metabolite{metaboliteCount > 1 && 's'}</span></td>
						<td key='metabolite_data'>
							<div className='d-flex justify-content-between'>
								{thousandifyNumber(metaboliteCount)}
								<Tooltip title="See details in theMetabolite table at the bottom of the current page">
									<div className="ms-3" style={{marginTop:"-2px"}}>
										<Href href="#metabolite_table" icon={<Table/>}/>
									</div>
								</Tooltip>
							</div>
						</td>
					</tr> : ''
				}
			</>
		)
	}

    useEffect(() => {
		fetchPathwayData();
	},[])

    return (
		<div>
			{ elementData ?
				<>
					{/* Summary Data */}
					{op_title(element, elementData, pathway)}
					{/* { elementData ? <HeaderCard type={element} content={get_information_content()} />:'' } */}
					<Header2Cards type_left='pathway' content_left={get_information_left_content()} content_right={get_information_right_content()} />

					{/* Reactome Diagram */}
					<ReactomeDiagram reactome_id={elementData.external_id} />

					<div className='d-flex mt-4'>
						<Note msg={reactome_note()}/>
					</div>

					{/* Associated genes */}
					{
						geneCount > 0 ?
							<div key="gene_table" id="gene_table" className="mt-4">{op_subtitle_no_asso('gene','Mapped genes',geneCount)}
							<DataTableServer key="gene" url_suffix={gene_search_url} columns={gene_columns} col_for_ids={key_cols}/></div>
						: ''
					}

					{/* Associated protein */}
					{
						proteinCount > 0 ?
							<div key="protein_table" id="protein_table" className="mt-4">{op_subtitle_no_asso('protein','Mapped proteins',proteinCount)}
							<DataTableServer key="protein" url_suffix={protein_search_url} columns={protein_columns} col_for_ids={key_cols}/></div>
						: ''
					}


					{/* Associated metabolites */}
					{
						metaboliteCount > 0 ?
							<div key="metabolite_table" id="metabolite_table" className="mt-4">{op_subtitle_no_asso('metabolite','Mapped metabolites',metaboliteCount)}
							<DataTableServer key="metabolite"  url_suffix={metabolite_search_url} columns={metabolite_columns} col_for_ids={key_cols}/></div> : ''
					}
				</>
				: noEntry ?
					<>{ no_entry_found(element,pathway) }</> : loading_data()
			}
		</div>
	);
}
export default Pathway