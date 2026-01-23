import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from "@mui/material/Tooltip";
import { Sliders, Table } from 'react-bootstrap-icons';

import DocumentTitle from '../../components/DocumentTitle';
import { metabolomics_columns, metabolomics_column_groups } from '../../components/table/columns/metabolomics';
import { proteomics_columns, proteomics_column_groups } from '../../components/table/columns/proteomics';
import { transcriptomics_columns, transcriptomics_column_groups } from '../../components/table/columns/transcriptomics';
import restApiCall from '../../components/RestAPI';
import DataTableServer from '../../components/table/DataTableServer';
import DatasetTable from '../../components/DatasetTable';
import { op_subtitle, op_title, ancestry_labels, Header2Cards, omicspred_omics_type, stages_list } from '../../components/Common'
import { loading_data, scoresBadge, datasetBadge, thousandifyNumber, add_s_when_plural, sort_case_insensitive, ToggleID, ToggleCard, WarningNote } from '../../components/Generic';
import AncestryLegend from '../../components/ancestry/AncestryLegend';
import Href from '../../components/Href';
import { select_form, select_form_no_empty_value, input_form, radio_form } from '../../components/Form';


function Platform() {
    let { platform } = useParams();
    DocumentTitle('Platform '+platform);
    const [platformSumData, setPlatformSumData] = useState([])
    const [platformType, setPlatformType] = useState('')
    const [datasetData, setDatasetData] = useState([])
    const [platformScoresCount, setPlatformScoresCount] = useState(0)
    const [tissues, setTissues] = useState({});
    const [tissuesLabels, setTissuesLabels] = useState([]);
    const [platformTableColumns, setPlatformTableColumns] = useState([])
    const [platformTableColumnGroups, setPlatformTableColumnGroups] = useState([])
    const [platformVersions, setPlatformVersions] = useState([])
    const [selectedAncestry, setSelectedAncestry] = useState('')
    const [selectedStage, setSelectedStage] = useState('a')
    const [IDInput, setIDInput] = useState('');
    const [molecularTrait, setMolecularTrait] = useState('');
    const [selectedMolecularTraitType, setSelectedMolecularTraitType] = useState('Gene');
    const [molecularTraitTypesList, setMolecularTraitTypesList] = useState([])
    const [selectedTissue, setSelectedTissue] = useState('')
    const [scoreEndpoint, setScoreEndpoint] = useState('');


    const url_suffix = platform+'?include_performance_metrics=0';

    const scores_threshold = 1000000;

    const ancestry_labels_data = ancestry_labels();

    const get_molecular_trait_types_list = (type) => {
        switch(type) {
            case 'Metabolomics':
                return ['Metabolite'];
            case 'Proteomics':
                return ['Gene','Protein'];
            case 'Transcriptomics':
                return ['Gene'];
            default:
                return []
        }
    }

    const get_url_endpoint_prefix = (type, endpoint_suffix) => {
        switch(type) {
            case 'Metabolomics':
                return "metabolomics/"+endpoint_suffix;
            case 'Proteomics':
                return "proteomics/"+endpoint_suffix;
            case 'Transcriptomics':
                return "transcriptomics/"+endpoint_suffix;
            default:
                return ''
        }
    }

    const get_url_endpoint = (type) => {
        let endpoint_suffix = url_suffix;
        let filters_list = []

        endpoint_suffix = get_url_endpoint_prefix(type,endpoint_suffix);

        // Ancestry
        if (selectedAncestry && selectedAncestry.length > 0) { //&& selectedAncestry != previousAncestrySelection) {
            endpoint_suffix += '&anc='+selectedAncestry;
        }
        if (selectedStage && selectedStage != 'a') { //&& selectedStage != previousStageSelection) {
            endpoint_suffix += '&stage='+selectedStage;
        }

        if (selectedTissue && selectedTissue.length > 0) {
            filters_list.push(`tissue:${selectedTissue}`)
        }
        if (IDInput && IDInput.length > 0) {
            filters_list.push(`score_id:${IDInput}`)
        }
        if (molecularTrait && molecularTrait.length > 0) {
            filters_list.push(`mt_id:${molecularTrait}`)
            filters_list.push(`mt_type:${selectedMolecularTraitType}`)
        }
        if (filters_list.length > 0) {
            endpoint_suffix += '&table_filter='+filters_list.join(';')
        }
        return endpoint_suffix;
    }

    const get_metadata_columns = (type) => {
        switch(type) {
            case 'Metabolomics':
                if (platform in metabolomics_columns) {
                    return metabolomics_columns[platform];
                }
                break;
            case 'Proteomics':
                if (platform in proteomics_columns) {
                    return proteomics_columns[platform];
                }
                break;
            case 'Transcriptomics':
                if (platform in transcriptomics_columns) {
                    return transcriptomics_columns[platform];
                }
                break;
            default:
                return [];
        }
    }

    const get_table_columns = (datasets) => {
        const type = datasets[0].platform.type;
        // Fetch metadata columns for a given platform
        let columns = get_metadata_columns(type);
        return columns;
    }

    const get_metadata_column_groups = (type) => {
        switch(type) {
            case 'Metabolomics':
                if (platform in metabolomics_column_groups) {
                    return metabolomics_column_groups[platform];
                }
                break;
            case 'Proteomics':
                if (platform in proteomics_column_groups) {
                    return proteomics_column_groups[platform];
                }
                break;
            case 'Transcriptomics':
                if (platform in transcriptomics_column_groups) {
                    return transcriptomics_column_groups[platform];
                }
                break;
            default:
                return [];
        }
    }

    const get_table_column_groups = (platforms) => {
        const type = platforms[0].platform.type;
        let col_groups = get_metadata_column_groups(type);
        return col_groups;
    }

    const fetchPlatformSumData = async () => {
        const platform_sum_data = await restApiCall('platform/'+platform);
        if (platform_sum_data) {
            setPlatformSumData(platform_sum_data);
            platform_sum_data.versions.sort()
            setPlatformVersions(platform_sum_data.versions.join(', '));

            const omics_type = platform_sum_data.type;
            setScoreEndpoint(get_url_endpoint(omics_type));
            setPlatformType(omics_type)
            // Molecular traits
            const molecular_trait_types_list = get_molecular_trait_types_list(omics_type)
            setMolecularTraitTypesList(molecular_trait_types_list);
            setSelectedMolecularTraitType(molecular_trait_types_list[0]);
        }
    }

    const fetchDatasetData = async () => {
        const dataset_data = await restApiCall('dataset/search?platform='+platform);
        const dataset_results = dataset_data['results']
        setDatasetData(dataset_results);
        const table_cols = get_table_columns(dataset_results);
        setPlatformTableColumns(table_cols);
        const table_col_grp = get_table_column_groups(dataset_results);
        setPlatformTableColumnGroups(table_col_grp);
        let datasets = [];
        let tissue_data = {};
        // Count total number of scores for the platform
        let platform_scores_count = 0
        for (let i=0;i<dataset_results.length;i++) {
            platform_scores_count += dataset_results[i].scores_count;
            const dataset_name = dataset_results[i].name;
            if (dataset_name) {
                datasets.push(dataset_name)
            }
            const tissue = dataset_results[i].tissue;
            tissue_data[tissue.label] = tissue.id
        }
        setPlatformScoresCount(platform_scores_count);
        // Tissue
        const tissue_label = Object.keys(tissue_data);
        setTissues(tissue_data);
        const sorted_labels = sort_case_insensitive(tissue_label)
        setTissuesLabels(sorted_labels);
    }

    const get_information_left_content = (platform_sum, platform_versions) => {
        return (
            <>
                <tr><td>Omics type</td><td>{omicspred_omics_type(platform_sum.type)}</td></tr>
                <tr><td>Long Name</td><td>{platform_sum.full_name}</td></tr>
                { platform_versions != '' ? <tr><td>Version{platform_versions.includes(',') ? 's':''}</td><td>{platform_versions}</td></tr> : ''}
                <tr><td>Technic</td><td>{platform_sum.technic}</td></tr>
            </>
        )
    }

    const get_information_right_content = (scores_count) => {
        return (
            <>
                { datasetData && datasetData.length ?
                    <tr>
						<td>Dataset{add_s_when_plural(datasetData.length)}</td>
						<td key='dataset_data'>
							<div className='d-flex justify-content-between'>
                                <span>{datasetBadge(datasetData.length)}</span>
								<Tooltip title="See details in the Dataset table at the bottom of the current page">
									<div className="ms-3" style={{marginTop:"-2px"}}>
										<Href href="#dataset_table" icon={<Table/>}/>
									</div>
								</Tooltip>
							</div>
						</td>
					</tr> : ''
                }
                <tr>
                    <td>Genetic Scores</td>
                    <td key='score_data'>
                        <div className='d-flex justify-content-between'>
                            <span>{scoresBadge(scores_count)}</span>
                            { scores_count <= scores_threshold ?
                                <Tooltip title="See details in the Genetic Score table at the bottom of the current page">
                                    <div className="ms-3" style={{marginTop:"-2px"}}>
                                        <Href href="#score_table" icon={<Table/>}/>
                                    </div>
                                </Tooltip> : ''
                            }
                        </div>
                    </td>
                </tr>
            </>
        )
    }

    const updateScoreEndpoint = () => {
        setScoreEndpoint(get_url_endpoint(platformType));
    }

    const handleIDInput = async (event) => {
        setIDInput(event.target.value.trim());
    }

    const handleMolecularTraitTypeChange = async (event) => {
        setSelectedMolecularTraitType(event.target.value);
    }

    const handleMolecularTraitInput = async (event) => {
        setMolecularTrait(event.target.value.trim());
    }

    const handleTissueChange = async (event) => {
        setSelectedTissue(event.target.value);
    }

    const handleAncestryChange = async (event) => {
        setSelectedAncestry(event.target.value);
    }

    const handleStageChange = async (event) => {
        setSelectedStage(event.target.value);
    }

    useEffect(() => {
        fetchPlatformSumData();
        fetchDatasetData();
    },[]);

    useEffect(() => {
        updateScoreEndpoint(platformType);
    },[selectedAncestry, selectedStage, selectedTissue, IDInput, molecularTrait, selectedMolecularTraitType]);

    return (
        <>
            {op_title('platform', platformSumData, platformSumData.name)}
            <div className='d-flex justify-content-start d-flex flex-lg-row flex-column mb-5'>
                {platformSumData && platformScoresCount ?
                    <Header2Cards
                        type_left='Platform'
                        content_left={get_information_left_content(platformSumData, platformVersions)}
                        type_right='Linked information'
                        content_right={get_information_right_content(platformScoresCount)}/>
                    : ''
                }
            </div>

            { datasetData.length > 0 ?
                <>
                    <div className='d-flex'>
                        <ToggleID title={op_subtitle('hl','Dataset',datasetData.length)} id='dataset_table' type='header' target='datasets table' open='1'/>
                    </div>
                    <div className='mb-3'>
                        <div className='d-flex d-table-cell mb-5' id='dataset_table'>
                            <DatasetTable data={datasetData} page="platform" key='datasets' />
                        </div>
                    </div>
                </> : ''
            }

            {op_subtitle('score')}
            { platformScoresCount < scores_threshold ?
                platformTableColumns && scoreEndpoint && scoreEndpoint.includes(platform) ?
                    <>
                        <div className='cards_filter_container_cols_2 mb-3' id='score_table'>
                            {/* Ancestry Form */}
                            <div>
                                <div className="card p-0 me-3">

                                    <ToggleCard title={<><Sliders className='me-2 mt_minus_1px'/><span className='mt-1'>Scores filter</span></>} id='filter_div' type='button_blue' open='1'/>
                                    <div className="card-body d-table-cell p-2" id='filter_div'>
                                        <div className="card-text">
                                            <div className='op_filter_container_2'>
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
                                                        {select_form_no_empty_value('Stage',selectedStage,stages_list,handleStageChange)}
                                                    </div>
                                                    {/* Tissue */}
                                                    { tissuesLabels && tissuesLabels.length > 1 ?
                                                        select_form('Tissue',selectedTissue,tissuesLabels,handleTissueChange,tissues)
                                                        : ''
                                                    }
                                                    {/* OmicsPred ID */}
                                                    {input_form('OmicsPred ID','opgs_id',IDInput,handleIDInput)}
                                                </div>
                                                <div className='compact_form'>
                                                    {/* Molecular Trait - Type */}
                                                    {radio_form('Molecular Trait',selectedMolecularTraitType,molecularTraitTypesList,handleMolecularTraitTypeChange)}
                                                    {/* Molecular Trait */}
                                                    {input_form('Name / ID','mt_name_id',molecularTrait,handleMolecularTraitInput)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <AncestryLegend />
                            </div>
                        </div>
                        <div>
                            <DataTableServer key={scoreEndpoint} url_suffix={scoreEndpoint} columns={platformTableColumns} groups={platformTableColumnGroups} nosearchbar='1'/>
                        </div>
                    </>
                    : loading_data()
                : <WarningNote msg={"There are too many scores to be retrieved and displayed in a table ("+thousandifyNumber(platformScoresCount)+" scores)."}/>
            }
        </>
    );
}

export default Platform;