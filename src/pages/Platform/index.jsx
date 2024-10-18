import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDoubleRight, SignpostFill } from 'react-bootstrap-icons';
// import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import DocumentTitle from '../../components/DocumentTitle';
import { metabolomics_columns, metabolomics_column_groups } from '../../components/table/columns/metabolomics';
import { proteomics_test_columns, proteomics_column_groups } from '../../components/table/columns/proteomics';
import { transcriptomics_columns, transcriptomics_column_groups } from '../../components/table/columns/transcriptomics';
import restApiCall from '../../components/RestAPI';
import DataTableServer from '../../components/table/DataTableServer';
import PlatformSummary from './components/PlatformSummary';
import PublicationCard from './components/PublicationCard';
import { op_subtitle, op_title, op_count_badge, ancestry_labels } from '../../components/Common'
import { loading_data } from '../../components/Generic';
import Href from '../../components/Href';
import AncestryLegend from '../../components/ancestry/AncestryLegend';


function Platform() {
    let { platform } = useParams();
    DocumentTitle('Platform '+platform);
    const [platformSumData, setPlatformSumData] = useState([])
    const [datasetData, setDatasetData] = useState([])
    const [platformScoresCount, setPlatformScoresCount] = useState(0)
    // const [platformTableData, setPlatformTableData] = useState([])
    const [platformTableColumns, setPlatformTableColumns] = useState([])
    const [platformTableColumnGroups, setPlatformTableColumnGroups] = useState([])
    const [platformVersions, setPlatformVersions] = useState([])
    // const [platformVersionsList, setPlatformVersionsList] = useState([])
    // const [platformVersionsSelection, setPlatformVersionsSelection] = useState([])
    // const [platformDatasetsList, setPlatformDatasetsList] = useState([])
    // const [platformDatasetsSelection, setPlatformDatasetsSelection] = useState([])
    const [platformDataEndpoint, setPlatformDataEndpoint] = useState([])
    const [selectedAncestry, setSelectedAncestry] = useState('')
    const [selectedStage, setSelectedStage] = useState('')

    const stages = {
        't': 'Training',
        'v': 'Validation',
        'b': 'Both'
    }

    const get_url_endpoint = (type) => {
        let endpoint_suffix = platform+'?include_performance_metrics=0'
        if (selectedAncestry && selectedAncestry.length > 0) { //&& selectedAncestry != previousAncestrySelection) {
            endpoint_suffix += '&anc='+selectedAncestry;
        }
        if (selectedStage && selectedStage.length > 0) { //&& selectedStage != previousStageSelection) {
            endpoint_suffix += '&stage='+selectedStage;
        }
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


    const get_metadata_columns = (type) => {
        switch(type) {
            case 'Metabolomics':
                if (platform in metabolomics_columns) {
                    return metabolomics_columns[platform];
                }
                break;
            case 'Proteomics':
                if (platform in proteomics_test_columns) {
                    return proteomics_test_columns[platform];
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


    const get_table_columns = (platforms, versions) => {
        const type = platforms[0].platform.type;
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
        // console.log('get_table_column_groups: |'+type+'|')
        let col_groups = get_metadata_column_groups(type);
        return col_groups;
    }

    const fetchPlatformSumData = async () => {
        const platform_sum_data = await restApiCall('platform/'+platform);
        setPlatformSumData(platform_sum_data);
        // if (platform_sum_data.versions && platform_sum_data.versions.length > 0) {
            platform_sum_data.versions.sort()
            // setPlatformVersionsList(platform_sum_data.versions)
            setPlatformVersions(platform_sum_data.versions.join(', '));
            // setPlatformVersionsSelection(platform_sum_data.versions);
        // }
        // else {
            setPlatformDataEndpoint(get_url_endpoint(platform_sum_data.type));
        // }
    }

    const fetchDatasetData = async () => {
        const dataset_data = await restApiCall('dataset/search?platform='+platform);
        // console.log(dataset_data['results']);
        const dataset_results = dataset_data['results']
        setDatasetData(dataset_results);
        const table_cols = get_table_columns(dataset_results);
        setPlatformTableColumns(table_cols);
        const table_col_grp = get_table_column_groups(dataset_results);
        setPlatformTableColumnGroups(table_col_grp);
        let datasets = [];
        // Count total number of scores for the platform
        let platform_scores_count = 0
        for (let i=0;i<dataset_results.length;i++) {
            platform_scores_count += dataset_results[i].scores_count;
            const dataset_name = dataset_results[i].name;
            if (dataset_name) {
                datasets.push(dataset_name)
            }
        }
        // setPlatformDatasetsList(datasets);
        // setPlatformDatasetsSelection(datasets);
        setPlatformScoresCount(platform_scores_count);
    }

    // // Allow to opt in/out a particular version of the platform and resend a REST API query
    // const handleVersionSelectionClick = (e) => {
    //     const version_val = e.target.getAttribute('data-version');
    //     const class_selected = 'btn-op';
    //     const class_unselected = 'btn-outline-op';
    //     let selected_versions = [];
    //     if (e.target.classList.contains(class_selected)) {
    //         if (platformVersionsSelection.includes(version_val) && platformVersionsSelection.length > 1) {
    //             e.target.classList.replace(class_selected,class_unselected);
    //             e.target.querySelector('input').checked = false;
    //             selected_versions = platformVersionsSelection.filter(function (version) {
    //                 return version !== version_val;
    //             });
    //             setPlatformVersionsSelection(selected_versions);
    //             updatePlatformDataEndpoint();
    //         }
    //     }
    //     else {
    //         e.target.classList.replace(class_unselected,class_selected);
    //         if (!platformVersionsSelection.includes(version_val)) {
    //             selected_versions = platformVersionsSelection;
    //             selected_versions.push(version_val);
    //             e.target.querySelector('input').checked = true;
    //             setPlatformVersionsSelection(selected_versions);
    //             updatePlatformDataEndpoint();
    //         }
    //     }
    // }

    // // Allow to opt in/out a particular version of the platform and resend a REST API query
    // const handleDatasetSelectionClick = (e) => {
    //     const dataset_name = e.target.getAttribute('data-dataset');
    //     const class_selected = 'btn-op';
    //     const class_unselected = 'btn-outline-op';
    //     let selected_datasets = [];
    //     console.log("Dataset "+dataset_name+" selected!");
    //     console.log("platformDatasetsSelection: "+platformDatasetsSelection);
    //     if (e.target.classList.contains(class_selected)) {
    //         if (platformDatasetsSelection.includes(dataset_name) && platformDatasetsSelection.length > 1) {
    //             e.target.classList.replace(class_selected,class_unselected);
    //             e.target.querySelector('input').checked = false;
    //             selected_datasets = platformDatasetsSelection.filter(function (dataset) {
    //                 return dataset !== dataset_name;
    //             });
    //             setPlatformDatasetsSelection(selected_datasets);
    //             updatePlatformDataEndpoint();
    //         }
    //     }
    //     else {
    //         e.target.classList.replace(class_unselected,class_selected);
    //         if (!platformDatasetsSelection.includes(dataset_name)) {
    //             selected_datasets = platformDatasetsSelection;
    //             selected_datasets.push(dataset_name);
    //             e.target.querySelector('input').checked = true;
    //             setPlatformDatasetsSelection(selected_datasets);
    //             updatePlatformDataEndpoint();
    //         }
    //     }
    // }

    const updatePlatformDataEndpoint = () => {
        setPlatformDataEndpoint(get_url_endpoint(platformSumData.type));
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
        updatePlatformDataEndpoint();
    },[selectedAncestry, selectedStage]);


    return (
        <>
            {op_title('platform', platformSumData, platformSumData.name)}

            {/* Temporary code - start */}
            <div style={{position:'relative',top:'-70px',left:'90%',height:'0px'}}>
                <Href role='button' text='Go to alt page' href={'/test/platform/'+platform} icon={<SignpostFill/>}/>
            </div>
            {/* Temporary code - end */}

            <div className='d-flex justify-content-start d-flex flex-lg-row flex-column mb-5'>
                {/* {platformSumData && platformVersions && platformScoresCount ? <PlatformSummary metadata={platformSumData} scores_count={platformScoresCount} versions={platformVersions}/>: ''} */}
                {platformSumData && platformScoresCount ? <div><PlatformSummary metadata={platformSumData} scores_count={platformScoresCount} versions={platformVersions}/></div>: ''}
                <div className='me-5 d-none d-lg-inline-block'></div>
                <div className='pt-3 d-lg-none'></div>
                { datasetData.length > 0 ?
                    <div>
                        <h5><ChevronDoubleRight className="me-2 color_hl" size="0.9rem"/>Dataset{datasetData.length > 1 ? 's': ''}{op_count_badge(datasetData.length)}</h5>
                        <div className="d-flex flex-column">
                            { datasetData.map((dataset) => <PublicationCard data={dataset} key={dataset.publication.doi+'_'+dataset.name} />)}
                        </div>
                    </div> : ''
                }
            </div>
            {op_subtitle('score')}
            {/* { platformVersionsList.length > 1 ?
                <div className="mt-4 me-4 mb-2 sm:mt-0 sm:ml-3">
                    <span className='pe-2'>Filter platform versions:</span>
                    {platformVersionsList.map((version) => <button className="btn btn-op shadow btn-sm me-2" data-version={version} key={platform+'_'+version} onClick={handleVersionSelectionClick}><input type="checkbox" id={version+'_check'} name={version} defaultChecked/> {platform} {version}</button>)}
                </div> :''
            }
            { platformDatasetsList.length > 1 ?
                <div className="mt-2 me-4 mb-3 sm:mt-0 sm:ml-3">
                    <span className='pe-2'>Filter datasets:</span>
                    {platformDatasetsList.map((dataset) => <button className="btn btn-op shadow btn-sm me-2" data-dataset={dataset} key={platform+'_'+dataset} onClick={handleDatasetSelectionClick}><input type="checkbox" id={dataset+'_check'} name={dataset} defaultChecked/> {dataset}</button>)}
                </div> :''
            } */}
            { platformTableColumns && platformDataEndpoint && platformDataEndpoint.includes(platform) ?
                <>
                    <div className='d-flex mb-3'>
                        {/* Ancestry Form */}
                        <div className="card p-0 me-3">
                            <div className="card-header"><h6 className="mb-0">Ancestry filter</h6></div>
                            <div className="card-body p-2">
                                <div className="card-text">
                                    <div>
                                        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                                            <InputLabel id="select_ancestry_label">Ancestry</InputLabel>
                                            <Select
                                                labelId="select_ancestry_label"
                                                id="select_ancestry"
                                                value={selectedAncestry}
                                                label="Ancestry"
                                                onChange={handleAncestryChange}
                                            >
                                                <MenuItem key='none_sel' value=''>-</MenuItem>
                                                {Object.keys(ancestry_labels).map((anc) => <MenuItem key={anc+'_sel'} value={anc}>{ancestry_labels[anc]}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                                            <InputLabel id="select_stage_label">Stage</InputLabel>
                                            <Select
                                                labelId="select_stage_label"
                                                id="select_stage"
                                                value={selectedStage}
                                                label="Stage"
                                                onChange={handleStageChange}
                                            >
                                                <MenuItem key='none_sel' value=''>-</MenuItem>
                                                {Object.keys(stages).map((s_type) => <MenuItem key={s_type+'_sel'} value={s_type}>{stages[s_type]}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <AncestryLegend />
                    </div>
                    <div>
                        <DataTableServer key={platformDataEndpoint} url_suffix={platformDataEndpoint} columns={platformTableColumns} groups={platformTableColumnGroups}/>
                    </div>
                </>
                : loading_data()
            }
        </>
    );
}

export default Platform;