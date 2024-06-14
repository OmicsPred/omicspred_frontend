import { useState, useEffect } from 'react';
import { ChevronRight, GraphUp, People, FileEarmarkArrowDown } from 'react-bootstrap-icons';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Href from "../../../components/Href";
import { numberBadge, ToogleDiv } from '../../../components/Generic';
import { get_cohorts_cols_list, get_cohorts_col_groups_list, omicspred_omics_type } from '../../../components/Common';
import {cohort_cols, common_column_groups} from '../../../components/table/columns/common';
import { metabolomics_columns,metabolomics_column_groups } from '../../../components/table/columns/metabolomics';
import { proteomics_columns, proteomics_column_groups } from '../../../components/table/columns/proteomics';
import { transcriptomics_columns, transcriptomics_column_groups } from '../../../components/table/columns/transcriptomics';
import DataTableServer from '../../../components/table/DataTableServer';
import { SampleTable } from '../../../components/Sample';
import { DownloadList, get_download_list } from '../../../components/Downloads';


const PlatformTable = (props) => {
    const [platformName, setPlatformName] = useState()
    const [platformInfo, setPlatformInfo] = useState();
    const [platformDataEndpoint, setPlatformDataEndpoint] = useState()
    const [platformTableColumns, setPlatformTableColumns] = useState([])
    const [platformTableColumnGroups, setPlatformTableColumnGroups] = useState([])
    const [platformDownloads, setPlatformDownloads] = useState([])
    const [loadedStatus, setLoadedStatus] = useState(false);
    const [datasetName, setDatasetName] = useState();

    const dataset = props.data;
    const platform_name = dataset.platform.name;
    const platform_type = dataset.platform.type;
    const samples_training = props.data.samples_training;
    const samples_validation = props.data.samples_validation;
    const p_key = platform_name;
    const scores_count = numberBadge(dataset.scores_count)
    const pmid = props.pmid;

    let plot_url = "/plot/"+platformName+"/"+pmid;
    if (dataset.name) {
        plot_url += '?dataset='+dataset.name;
    }


    const get_url_endpoint = (type, pmid, dataset) => {
        let endpoint_suffix = platform_name+"?pmid="+pmid;
        if (dataset) {
            endpoint_suffix += '&dataset='+dataset
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


    const get_metadata_columns = (platform_name,type) => {
        switch(type) {
            case 'Metabolomics':
                if (platform_name in metabolomics_columns) {
                    return metabolomics_columns[platform_name].map(object => ({ ...object }));
                }
            case 'Proteomics':
                if (platform_name in proteomics_columns) {
                    return proteomics_columns[platform_name].map(object => ({ ...object }));
                }
            case 'Transcriptomics':
                if (platform_name in transcriptomics_columns) {
                    return transcriptomics_columns[platform_name].map(object => ({ ...object }));
                }
            default:
                return [];
        }
    }


    const get_table_columns = (dataset) => {
        const platform_name = dataset.platform.name;
        const platform_type = dataset.platform.type;
        // Fetch metadata columns for a given platform
        let columns = get_metadata_columns(platform_name,platform_type);

        // Fetch Cohort columns
        let cohorts = [];
        // Training cohorts
        for (let i=0; i<dataset['samples_training'].length; i++) {
            const sample_cohorts = dataset['samples_training'][i]['cohorts'];
            cohorts = get_cohorts_cols_list(sample_cohorts, cohorts);
        }
        // Fetch the training cohorts
        const cohorts_training = Object.values(cohorts);
        // Validation cohorts
        for (let i=0; i< dataset['samples_validation'].length;i++) {
            const sample_cohorts = dataset['samples_validation'][i]['cohorts'];
            cohorts = get_cohorts_cols_list(sample_cohorts, cohorts);
        }
        // Fetch columns details
        const metric_cols = ['R2','Rho','Missing Rate'];
        for (let i=0; i< cohorts.length; i++) {
            const cohort = cohorts[i];
            if (cohort_cols[cohort]) {
                for (let j=0; j<metric_cols.length; j++) {
                    const metric = metric_cols[j];
                    if (cohort_cols[cohort][metric]) {
                        // Use a different display for the training cohorts
                        if (cohorts_training.includes(cohort)) {
                            let training_header_class = 'training_col'
                            if (cohort_cols[cohort][metric].headerClassName == 'col_border_left') {
                                training_header_class = ['training_col','col_border_left']
                            }
                            const cohort_metric_col = {...cohort_cols[cohort][metric], headerClassName: training_header_class, sortable: false}
                            columns.push(cohort_metric_col)
                        }
                        else {
                            const cohort_metric_col = {...cohort_cols[cohort][metric], sortable: false}
                            columns.push(cohort_metric_col)
                        }
                    }
                }
            }
        }
        setPlatformTableColumns(columns)
    }


    const get_metadata_column_groups = (platform_name,type) => {
        switch(type) {
            case 'Metabolomics':
                if (platform_name in metabolomics_column_groups) {
                    return metabolomics_column_groups[platform_name];
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


    const get_table_column_groups = (dataset) => {
        const platform_name = dataset.platform.name;
        const platform_type = dataset.platform.type;
        let col_groups = get_metadata_column_groups(platform_name,platform_type);

        let cohorts = [];
        // Training cohorts

        for (let i=0; i<dataset['samples_training'].length;i++) {
            const sample_cohorts = dataset['samples_training'][i]['cohorts'];
            cohorts = get_cohorts_col_groups_list(sample_cohorts,cohorts);
        }
        // Fetch the training cohorts
        let cohorts_training = [];
        for (let i=0; i< cohorts.length; i++) {
            const cohort = cohorts[i];
            cohorts_training.push(cohort);
        }

        // Validation cohorts
        for (let i=0; i<dataset['samples_validation'].length;i++) {
            const sample_cohorts = dataset['samples_validation'][i]['cohorts'];
            cohorts = get_cohorts_col_groups_list(sample_cohorts,cohorts);
        }

        // Fetch column group details
        for (let i=0; i< cohorts.length; i++) {
            const cohort = cohorts[i];
            if (common_column_groups[cohort]) {
                if (cohorts_training.includes(cohort)) {
                    col_groups.push({...common_column_groups[cohort], headerClassName: ['training_col','col_border_left']})
                }
                else {
                    col_groups.push(common_column_groups[cohort])
                }
            }
        }
        return col_groups;
    }


    const prepareTable = () => {
        const dataset = props.data;
        setDatasetName(dataset.name);
        setPlatformName(dataset.platform.name);
        const url_endpoint = get_url_endpoint(dataset.platform.type, props.pmid, dataset.name);
        setPlatformDataEndpoint(url_endpoint);
        get_table_columns(dataset);
        const columns_groups = get_table_column_groups(dataset);
        setPlatformTableColumnGroups(columns_groups);
        if (dataset.scoring_files_urls) {
            const urls = get_download_list(dataset.scoring_files_urls)
            setPlatformDownloads(urls);
        }
    }

    const loadTable = (expanded) => {
        if (expanded && loadedStatus == false) {
            setLoadedStatus(true);
        }
    }

    const prepareInfo = () => {
        const platform = props.data.platform;

        let info = {}
        // Long name
        if (platform.full_name && platform.name != platform.full_name) {
            info['full_name'] = platform.full_name;
        }
        if (platform.version) {
            info['version'] = platform.version;
        }
        if (info) {
            setPlatformInfo(info);
        }
    }

    useEffect(() => {
        prepareTable();
        prepareInfo();
    },[]);
    useEffect(() => {},[loadedStatus]);

    return (
        <Accordion key={datasetName+"_"+platformName+'_accordion'} onChange={(e,expanded) => {loadTable(expanded)}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={p_key+'_panel_content'}
            id={p_key+'_panel_header'}
            >
                <div className='platform_accordion'>
                    <div className='d-flex flex-column'>
                        <div>
                            <ChevronRight className={"color_"+platform_type+" me-2"}/>
                            <span className="font-bold">{platform_name}</span>
                        </div>
                        {datasetName ? <div style={{marginLeft: "24px"}} title='Dataset name'><small>{datasetName}</small></div>:''}
                    </div>
                    <div><span className="me-1"># Scores:</span>{scores_count}</div>
                    <div>{omicspred_omics_type(platform_type)}</div>
                    <div>
                        <Href key={platformName+'_plot_link'} role="button" text="Go to Plots" href={plot_url} icon={<GraphUp/>} />
                    </div>
                    <div>
                        <Href key={platformName+'_platform_link'} role="button" text="Platform page" href={"/platform/"+platformName}/>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                { loadedStatus == true ?
                    <>
                        { platformInfo ?
                            <ul className='key_val_line'>
                                { platformInfo.full_name ? <li><span className='line_key'>Full Name</span>{platformInfo.full_name}</li>:''}
                                { platformInfo.version ? <li><span className='line_key'>Version</span>{platformInfo.version}</li>:''}
                            </ul>:''
                        }
                        <div className="d-flex mb-3">
                            {/* Samples table */}
                            <div className='me-3'>
                                <ToogleDiv key={'toggle_sample_'+platformName} type='button' title={<><People className='me-1'/>Sample details</>} content={<SampleTable table_name={platformName+'_platform_samples'} samples_training={samples_training} samples_validation={samples_validation}/>}/>
                            </div>
                            {/* Download buttons */}
                            { platformDownloads ?
                                <div className='me-3'>
                                    <ToogleDiv key={'toggle_dowloads_'+platformName} type='button' class_name='card px-2 py-1' title={<><FileEarmarkArrowDown className='me-1'/>Downloads</>} content={<DownloadList urls={platformDownloads}/>}/>
                                </div>:''
                            }
                        </div>
                        <DataTableServer key={datasetName+'_'+platformName+'_table'} url_suffix={platformDataEndpoint} columns={platformTableColumns} groups={platformTableColumnGroups}/>
                    </>:''
                }
            </AccordionDetails>
        </Accordion>
    )
}
export default PlatformTable