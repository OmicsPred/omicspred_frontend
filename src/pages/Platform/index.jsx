import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight } from 'react-bootstrap-icons';

import {cohort_cols, common_column_groups} from '../../components/table/columns/common';
import { metabolomics_columns,metabolomics_column_groups } from '../../components/table/columns/metabolomics';
import { proteomics_columns, proteomics_column_groups } from '../../components/table/columns/proteomics';
import { transcriptomics_columns, transcriptomics_column_groups } from '../../components/table/columns/transcriptomics';
import restApiCall from '../../components/RestAPI';
import DataTableServer from '../../components/table/DataTableServer';
// import PlatformDataTable from './components/PlatformDataTable';
// import { numberBadge } from "../../components/Generic";
import PlatformSummary from './components/PlatformSummary';
import PublicationCard from './components/PublicationCard';
import { op_subtitle, get_data_type, get_cohorts_cols_list, get_cohorts_col_groups_list } from '../../components/Common'
import _ from 'underscore';


function Platform() {
    let { platform } = useParams();
    const [platformSumData, setPlatformSumData] = useState([])
    const [datasetData, setDatasetData] = useState([])
    const [platformScoresCount, setPlatformScoresCount] = useState(0)
    // const [platformTableData, setPlatformTableData] = useState([])
    const [platformTableColumns, setPlatformTableColumns] = useState([])
    const [platformTableColumnGroups, setPlatformTableColumnGroups] = useState([])
    const [platformVersions, setPlatformVersions] = useState([])
    const [platformVersionsList, setPlatformVersionsList] = useState([])
    const [platformVersionsSelection, setPlatformVersionsSelection] = useState([])
    const [platformDataEndpoint, setPlatformDataEndpoint] = useState([])


    // const platform_type = 'Proteomics';

    const get_url_endpoint = (type) => {
        let endpoint_suffix = platform
        if (platformVersionsSelection.length > 0 && platformVersionsSelection.length != platformVersionsList.length) {
            endpoint_suffix += '?versions='+platformVersionsSelection.join(';')
        }
        switch(type) {
            case 'Metabolomics':
                return "metabolomics/"+endpoint_suffix;
            case 'Proteomics':
                return "proteomics/"+endpoint_suffix;
            case 'Transcriptomics':
                return "transcriptomics/"+endpoint_suffix;
        }
    }


    const get_metadata_columns = (type) => {
        switch(type) {
            case 'Metabolomics':
                if (platform in metabolomics_columns) {
                    return metabolomics_columns[platform];
                }
            case 'Proteomics':
                if (platform in proteomics_columns) {
                    return proteomics_columns[platform];
                }
            case 'Transcriptomics':
                if (platform in transcriptomics_columns) {
                    return transcriptomics_columns[platform];
                }
            default:
                return [];
        }
    }


    const get_table_columns = (platforms, versions) => {
        const type = platforms[0].platform.type;
        console.log('get_table_columns: |'+type+'|')
        // Fetch metadata columns for a given platform
        let columns = get_metadata_columns(type);

        // // Fetch Cohort columns
        // let cohorts = [];
        // for (let i=0; i<platforms.length; i++) {
        //     const platform = platforms[i]['platform'];
        //     if (!versions || (versions && versions.includes(platform['version']))) {
        //         console.log("::::: Platform "+platform['name']+' | Versions: '+platform['version']+" :::::");
        //         // Training cohorts
        //         for (let j=0; j<platforms[i]['samples_training'].length; j++) {
        //             const sample_cohorts = platforms[i]['samples_training'][j]['cohorts'];
        //             cohorts = get_cohorts_cols_list(sample_cohorts, cohorts);
        //         }
        //         // Validation cohorts
        //         for (let j=0; j< platforms[i]['samples_validation'].length;j++) {
        //             const sample_cohorts = platforms[i]['samples_validation'][j]['cohorts'];
        //             cohorts = get_cohorts_cols_list(sample_cohorts, cohorts);
        //         }
        //     }
        // }

        // // Fetch columns details
        // const metric_cols = ['R2','Rho','Missing Rate'];
        // for (let i=0; i< cohorts.length; i++) {
        //     const cohort = cohorts[i];
        //     if (cohort_cols[cohort]) {
        //         for (let j=0; j<metric_cols.length; j++) {
        //             const metric = metric_cols[j];
        //             if (cohort_cols[cohort][metric]) {
        //                 const cohort_metric_col = {...cohort_cols[cohort][metric], sortable: false}
        //                 columns.push(cohort_metric_col)
        //             }
        //         }
        //     }
        // }

        return columns;
    }


    const get_metadata_column_groups = (type) => {
        switch(type) {
            case 'Metabolomics':
                if (platform in metabolomics_column_groups) {
                    return metabolomics_column_groups[platform];
                }
            // case 'Proteomics':
            //     if (platform in proteomics_column_groups) {
            //         return proteomics_column_groups[platform];
            //     }
            // case 'Transcriptomics':
            //     if (platform in transcriptomics_column_groups) {
            //         return transcriptomics_column_groups[platform];
            //     }
            default:
                return [];
        }
    }


    const get_table_column_groups = (platforms) => {
        const type = platforms[0].platform.type;
        console.log('get_table_column_groups: |'+type+'|')
        let col_groups = get_metadata_column_groups(type);

        // let cohorts = [];
        // for (let i=0; i< platforms.length;i++) {
        //     // Training cohorts
        //     for (let j=0; j< platforms[i]['samples_training'].length;j++) {
        //         const sample_cohorts = platforms[i]['samples_training'][j]['cohorts'];
        //         cohorts = get_cohorts_col_groups_list(sample_cohorts,cohorts);
        //     }
        //     // Validation cohorts
        //     for (let j=0; j< platforms[i]['samples_validation'].length;j++) {
        //         const sample_cohorts = platforms[i]['samples_validation'][j]['cohorts'];
        //         cohorts = get_cohorts_col_groups_list(sample_cohorts,cohorts);
        //     }
        // }

        // // Fetch column group details
        // for (let i=0; i< cohorts.length; i++) {
        //     const cohort = cohorts[i];
        //     if (common_column_groups[cohort]) {
        //         col_groups.push(common_column_groups[cohort])
        //     }
        // }

        return col_groups;
    }

    const fetchPlatformSumData = async () => {
        const platform_sum_data = await restApiCall('platform/'+platform);
        setPlatformSumData(platform_sum_data);
        if (platform_sum_data.versions && platform_sum_data.versions.length > 0) {
            platform_sum_data.versions.sort()
            setPlatformVersionsList(platform_sum_data.versions)
            setPlatformVersions(platform_sum_data.versions.join(', '));
            setPlatformVersionsSelection(platform_sum_data.versions);
        }
        else {
            setPlatformDataEndpoint(get_url_endpoint(platform_sum_data.type));
        }
    }

    const fetchPlatformAdditionalData = async () => {
        const dataset_data = await restApiCall('dataset/'+platform);
        console.log(dataset_data['results']);
        const dataset_results = dataset_data['results']
        setDatasetData(dataset_results);
        const table_cols = get_table_columns(dataset_results);
        setPlatformTableColumns(table_cols);
        const table_col_grp = get_table_column_groups(dataset_results);
        setPlatformTableColumnGroups(table_col_grp);
        // Count total number of scores for the platform
        let platform_scores_count = 0
        for (let i=0;i<dataset_results.length;i++) {
            platform_scores_count += dataset_results[i].scores_count;
        }
        setPlatformScoresCount(platform_scores_count);
    }

    // Allow to opt in/out a particular version of the platform and resend a REST API query
    const handleVersionSelectionClick = (e) => {
        const version_val = e.target.getAttribute('data-version');
        const class_selected = 'btn-primary';
        const class_unselected = 'btn-outline-primary';
        let selected_versions = [];
        if (e.target.classList.contains(class_selected)) {
            if (platformVersionsSelection.includes(version_val) && platformVersionsSelection.length > 1) {
                e.target.classList.replace(class_selected,class_unselected);
                selected_versions = platformVersionsSelection.filter(function (version) {
                    return version !== version_val;
                });
            }
        }
        else {
            e.target.classList.replace(class_unselected,class_selected);
            if (!platformVersionsSelection.includes(version_val)) {
                selected_versions = platformVersionsSelection;
                selected_versions.push(version_val);
            }
        }
        setPlatformVersionsSelection(selected_versions);
        updatePlatformDataEndpoint();
    }

    const updatePlatformDataEndpoint = () => {
        setPlatformDataEndpoint(get_url_endpoint(platformSumData.type));
    }


    useEffect(() => {
        fetchPlatformSumData();
        fetchPlatformAdditionalData();
    },[]);

    useEffect(() => {
        console.log("=> Update Enpoint in useEffect");
        updatePlatformDataEndpoint();
    },[platformVersionsSelection]);


    return (
        <>
            <h2 className='page_title'>Platform<ChevronRight className={'op_title_separator color_'+get_data_type(platformSumData.type)}/><span>{platformSumData.name}</span></h2>
            <div className='d-flex justify-content-start d-flex flex-lg-row flex-column'>
                {platformSumData && platformVersions && platformScoresCount ? <PlatformSummary metadata={platformSumData} scores_count={platformScoresCount} versions={platformVersions}/>: ''}
                <div className='me-5 d-none d-lg-inline-block'></div>
                <div className='pt-3 d-lg-none'></div>
                { datasetData.length > 0 ?
                    <div>
                        <h5>Dataset{datasetData.length > 1 ? 's': ''} ({datasetData.length})</h5>
                        <div className="d-flex flex-column">
                            { datasetData.map((dataset) => <PublicationCard data={dataset} key={dataset.publication.doi+'_'+dataset.name} />)}
                        </div>
                    </div> : ''
                }
            </div>
            <div className="mt-4 me-4 mb-4 sm:mt-0 sm:ml-3">
                { platformVersionsList.length > 0 && platformVersionsSelection.length > 0 ? platformVersionsList.map((version) => <button className="btn btn-primary shadow btn-sm me-2"  data-version={version} key={platform+'_'+version} onClick={handleVersionSelectionClick}>{platform} {version}</button>):''}
            </div>
            {op_subtitle('score')}
            { platformTableColumns && platformDataEndpoint && platformDataEndpoint.includes(platform) ?
                <div className="mt-2">
                   <DataTableServer key={platformDataEndpoint} url_suffix={platformDataEndpoint} columns={platformTableColumns} groups={platformTableColumnGroups}/>
                </div>
                :
                <div>Loading ...</div>
            }
        </>
    );
}


export default Platform