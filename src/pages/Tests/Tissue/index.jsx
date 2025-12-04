import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import FormLabel from '@mui/material/FormLabel';
import { Sliders } from 'react-bootstrap-icons';
import DocumentTitle from '../../../components/DocumentTitle';
import Href from '../../../components/Href';
import restApiCall from '../../../components/RestAPI';
import { op_title, op_subtitle, HeaderCard, display_tissue_description, no_entry_found, molecular_trait_types, ancestry_labels, stages_list } from '../../../components/Common';
import { ToggleCard, scoresBadge, loading_data } from '../../../components/Generic';
import AncestryLegend from '../../../components/ancestry/AncestryLegend';
import { scores_columns_for_tissue } from '../../../components/table/columns/scores';
import DataTableServer from '../../../components/table/DataTableServer';
import { select_form, input_form, radio_form } from '../../../components/Form';


function TissueTest() {
	let { tissue } = useParams();
	DocumentTitle('Tissue '+tissue);
	const [tissueData, setTissueData] = useState()
	const [noEntry, setNoEntry] = useState(false)
    // const [scoreData, setScoreData] = useState([])
    const [urlScore, setUrlScore] = useState('')
	const [platforms, setPlatforms] = useState([]);
    const [omicsTypes, setOmicsTypes] = useState([]);
    const [publications, setPublications] = useState({});
	const [selectedAncestry, setSelectedAncestry] = useState('')
    const [selectedStage, setSelectedStage] = useState('a')
    const [IDInput, setIDInput] = useState('');
    const [molecularTrait, setMolecularTrait] = useState('');
    const [selectedMolecularTraitType, setSelectedMolecularTraitType] = useState('Gene');
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedOmicsType, setSelectedOmicsType] = useState('');
    const [selectedPublication, setSelectedPublication] = useState('')
    const [scoreEndpoint, setScoreEndpoint] = useState('');


	const current_url = window.location.href;

    const element = 'tissue';

	const ancestry_labels_data = ancestry_labels();

	const fetchSummaryData = async () => {
		const data = await restApiCall(element+'/'+tissue);
		if (data && Object.keys(data).length) {
			setTissueData(data);
			const url = 'score/search?tissue_id='+data.id
            setUrlScore(url)
			setScoreEndpoint(url);
		}
		else {
			setNoEntry(true);
		}
	}

	const fetchPlatforms = async () => {
		const platforms = await restApiCall('platform/all');
		if (platforms.results) {
			let platforms_data = {};
			let omics_types_list = [];
			for (let i=0; i<platforms.results.length; i++) {
				const platform_item = platforms.results[i];
				const platform_type = platform_item.type;
				platforms_data[platform_item.name] = platform_type;
				if (!omics_types_list.includes(platform_type)) {
					omics_types_list.push(platform_type);
				}
			}
			setPlatforms(platforms_data);
			setOmicsTypes(omics_types_list.sort());
		}
	}

	const fetchPublications = async () => {
		const publications = await restApiCall('publication/all');
		if (publications.results) {
			let publications_data = {};
			for (let i=0; i<publications.results.length; i++) {
				const publication = publications.results[i];
				publications_data[publication.id] = publication.id+' - '+publication.firstauthor
			}
			setPublications(publications_data);
		}
	}

	const get_information_content = () => {
		return (
			<>
				{ tissueData.label ?
					<tr><td>Identifier</td><td><Href href={tissueData.url} text={tissueData.id}/></td></tr>:''
				}
				{ tissueData.description && tissueData.description.length ?
					<tr><td>Description</td><td>{display_tissue_description(tissueData.description)}</td></tr>:''
				}
                <tr><td># Score{tissueData.scores_count > 1 ? 's' : ''}</td><td>{scoresBadge(tissueData.scores_count)}</td></tr>
			</>
		)
	}

	const get_url_endpoint = () => {
        let endpoint_suffix = urlScore;
        let filters_list = []

        // Ancestry
        if (selectedAncestry && selectedAncestry.length > 0) { //&& selectedAncestry != previousAncestrySelection) {
            endpoint_suffix += '&anc='+selectedAncestry;
        }
        if (selectedStage && selectedStage != 'a') { //&& selectedStage != previousStageSelection) {
            endpoint_suffix += '&stage='+selectedStage;
        }

        if (IDInput && IDInput.length > 0) {
            filters_list.push(`score_id:${IDInput}`)
        }
		if (selectedPlatform && selectedPlatform.length > 0) {
            filters_list.push(`platform:${selectedPlatform}`)
        }
        if (selectedOmicsType && selectedOmicsType.length > 0) {
            filters_list.push(`omics_type:${selectedOmicsType}`)
        }
        if (selectedPublication && selectedPublication.length > 0) {
            filters_list.push(`publication:${selectedPublication}`)
        }
        if (molecularTrait && molecularTrait.length > 0) {
            filters_list.push(`mt_id:${molecularTrait}`)
            filters_list.push(`mt_type:${selectedMolecularTraitType}`)
        }
        if (filters_list.length > 0) {
            endpoint_suffix += '&table_filter='+filters_list.join(';')
        }
        console.log("NEW URL: "+endpoint_suffix);
        return endpoint_suffix;
    }

	const updateScoreEndpoint = () => {
        setScoreEndpoint(get_url_endpoint());
    }

    const handleIDInput = async (event) => {
        setIDInput(event.target.value.trim());
    }

 	const handlePlatformChange = async (event) => {
        setSelectedPlatform(event.target.value);
    }

    const handleOmicsTypeChange = async (event) => {
        setSelectedOmicsType(event.target.value);
    }

    const handlePublicationChange = async (event) => {
        setSelectedPublication(event.target.value);
    }

    const handleMolecularTraitTypeChange = async (event) => {
        setSelectedMolecularTraitType(event.target.value);
    }

    const handleMolecularTraitInput = async (event) => {
        setMolecularTrait(event.target.value.trim());
    }

    const handleAncestryChange = async (event) => {
        setSelectedAncestry(event.target.value);
    }

    const handleStageChange = async (event) => {
        setSelectedStage(event.target.value);
    }

	useEffect(() => {
		fetchSummaryData();
		fetchPlatforms();
        fetchPublications();
	},[])

	useEffect(() => {
        updateScoreEndpoint();
    },[selectedAncestry, selectedStage, selectedPlatform, selectedOmicsType, selectedPublication, IDInput, molecularTrait, selectedMolecularTraitType]);

	return (
		<div>
			{ tissueData ?
				<>
					{/* Test page banner - start */}
					{ current_url.includes('/test/') ?
						<div style={{backgroundColor:'salmon',color:'#FFF',padding:'0.25rem 1rem'}}>TEST PAGE</div>
						: ''
            		}
					{/* Summary Data */}
					{op_title(element, tissueData, tissueData.label)}
					<HeaderCard type={element} content={get_information_content()}/>

					{/* Associated scores */}
                    { tissueData.scores_count > 0 && scoreEndpoint && scoreEndpoint != '' ?
                        <div className="mt-5">
                            {op_subtitle('score', undefined, tissueData.scores_count)}
                            <div className='cards_filter_container_cols_3 mb-3'>
								{/* Filter Form */}
								<div>
									<div className="card p-0 me-3">
										{/* <div className="card-header"><h6 className="mb-0">Ancestry filter</h6></div> */}
										<ToggleCard title={<><Sliders className='me-2 mt_minus_1px'/><span className='mt-1'>Scores filter</span></>} id='filter_div' type='button_blue' open='1'/>
										<div className="card-body d-table-cell p-2" id='filter_div'>
											<div className="card-text">
												<div className='op_filter_container_3'>
													<div className='compact_form'>
														<div>
															{/* Ancestry */}
															<div>
																<FormLabel id="anc_label" className='op_form_label'>Ancestry filter</FormLabel>
															</div>
															{select_form('Ancestry',selectedAncestry,ancestry_labels_data,handleAncestryChange)}
															
														</div>
														<div className="op_form_h_sep">
															{/* Study Stage */}
															{select_form('Stage',selectedStage,stages_list,handleStageChange)}
	
														</div>
														{/* OmicsPred ID */}
														{input_form('OmicsPred ID','opgs_id',IDInput,handleIDInput)}
													</div>
													<div className='compact_form'>
														<div>
															<FormLabel id="study_label" className='op_form_label'>Study type</FormLabel>
														</div>
														{/* Publication */}
														{select_form('Publication',selectedPublication,publications,handlePublicationChange)}
														{/* Platform */}
														{select_form('Platform',selectedPlatform,platforms,handlePlatformChange)}
														{/* Omics Type */}
														{select_form('Omics Type',selectedOmicsType,omicsTypes,handleOmicsTypeChange)}
													</div>
													<div className='compact_form'>
														{/* Molecular Trait - Type */}
														{radio_form('Molecular Trait',selectedMolecularTraitType,molecular_trait_types,handleMolecularTraitTypeChange)}
														{/* Molecular Trait */}
														{input_form('Name / ID','mt_name_id',molecularTrait,handleMolecularTraitInput)}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div>
								<div>
									<AncestryLegend />
								</div></div>
                            </div>
							<div>
                            	<DataTableServer key={scoreEndpoint} table_key="tissue_score" title='score' type='score' url_suffix={scoreEndpoint} columns={scores_columns_for_tissue} nosearchbar='1'/>
							</div>
						</div> : ''
                    }
				</>
				: noEntry ?
					<>{ no_entry_found(element, tissue) }</> : loading_data()
			}
        </div>
	);
}

export default TissueTest