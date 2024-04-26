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
import { DownloadList } from '../../../components/Downloads';


const PlatformTable = (props) => {
    const [platformName, setPlatformName] = useState([])
    const [platformInfo, setPlatformInfo] = useState([]);
    const [platformDataEndpoint, setPlatformDataEndpoint] = useState([])
    const [platformTableColumns, setPlatformTableColumns] = useState([])
    const [platformTableColumnGroups, setPlatformTableColumnGroups] = useState([])
    const [platformDownloads, setPlatformDownloads] = useState([])
    const [loadedStatus, setLoadedStatus] = useState(false);

    const platform = props.data;
    const platform_name = platform.platform.name;
    const platform_type = platform.platform.type;
    const samples_training = props.data.samples_training;
    const samples_validation = props.data.samples_validation;
    const p_key = platform_name;
    const scores_count = numberBadge(platform.scores_count)
    const pmid = props.pmid;
    // const url_endpoint = get_url_endpoint(platform_type, props.pmid)

    // const columns = get_table_columns(platform);
    // const columns_groups = get_table_column_groups(platform);

    const download_labels = {
        "scoring_files": "Scoring files",
        "scoring_files_pgsc_calc": "Scoring files (pgsc_calc compatible)",
        "validation_results": "Validation Results",
        "score_variant_info": "Variants info",
        "gwas_sumstats": "GWAS summary stats"
    }

    const get_url_endpoint = (type, pmid) => {
        let endpoint_suffix = platform_name+"?pmid="+pmid;
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
                    return metabolomics_columns[platform_name];
                }
            case 'Proteomics':
                if (platform_name in proteomics_columns) {
                    return proteomics_columns[platform_name];
                }
            case 'Transcriptomics':
                if (platform_name in transcriptomics_columns) {
                    return transcriptomics_columns[platform_name];
                }
            default:
                return [];
        }
    }


    const get_table_columns = (platform) => {
        const platform_name = platform.platform.name;
        const platform_type = platform.platform.type;
        // Fetch metadata columns for a given platform
        let columns = get_metadata_columns(platform_name,platform_type);

        // Fetch Cohort columns
        let cohorts = [];
        // Training cohorts
        for (let i=0; i<platform['samples_training'].length; i++) {
            const sample_cohorts = platform['samples_training'][i]['cohorts'];
            cohorts = get_cohorts_cols_list(sample_cohorts, cohorts);
        }
        // Validation cohorts
        for (let i=0; i< platform['samples_validation'].length;i++) {
            const sample_cohorts = platform['samples_validation'][i]['cohorts'];
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
                        const cohort_metric_col = {...cohort_cols[cohort][metric], sortable: false}
                        columns.push(cohort_metric_col)
                    }
                }
            }
        }
        return columns;
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


    const get_table_column_groups = (platform) => {
        const platform_name = platform.platform.name;
        const platform_type = platform.platform.type;
        let col_groups = get_metadata_column_groups(platform_name,platform_type);

        let cohorts = [];
        // Training cohorts

        for (let i=0; i<platform['samples_training'].length;i++) {
            const sample_cohorts = platform['samples_training'][i]['cohorts'];
            cohorts = get_cohorts_col_groups_list(sample_cohorts,cohorts);
        }
        // Validation cohorts
        for (let i=0; i<platform['samples_validation'].length;i++) {
            const sample_cohorts = platform['samples_validation'][i]['cohorts'];
            cohorts = get_cohorts_col_groups_list(sample_cohorts,cohorts);
        }

        // Fetch column group details
        for (let i=0; i< cohorts.length; i++) {
            const cohort = cohorts[i];
            if (common_column_groups[cohort]) {
                col_groups.push(common_column_groups[cohort])
            }
        }
        return col_groups;
    }


    const prepareTable = () => {
        const platform = props.data;
        setPlatformName(platform.platform.name);
        const url_endpoint = get_url_endpoint(platform.platform.type, props.pmid);
        setPlatformDataEndpoint(url_endpoint);
        const columns = get_table_columns(platform);
        setPlatformTableColumns(columns);
        const columns_groups = get_table_column_groups(platform);
        setPlatformTableColumnGroups(columns_groups);
        console.log('>> platform data:')
        console.log(platform.platform.name);
        if (platform.scoring_files_urls) {
            let urls = {}
            for (const [key, value] of Object.entries(download_labels)) {
                if (platform.scoring_files_urls[key]) {
                    urls[value] = platform.scoring_files_urls[key];
                }
            }
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
        <Accordion onChange={(e,expanded) => {loadTable(expanded)}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={p_key+'_panel_content'}
            id={p_key+'_panel_header'}
            >
                <div className='platform_accordion'>
                    <div><ChevronRight className={"color_"+platform_type+" me-2"}/><span className="font-bold">{platform_name}</span></div>
                    <div><span className="me-1"># Scores:</span>{scores_count}</div>
                    <div>{omicspred_omics_type(platform_type)}</div>
                </div>
                {/* <div className="d-flex justify-content-start">
                    <ChevronRight className={"color_"+platform_type+" me-2 mt-1"}/><span className="font-bold">{platform_name}</span>
                    <div style={{position:"absolute",left:"15rem"}}><span className="me-1"># Scores:</span>{scores_count}</div>
                    <div style={{position:"absolute",left:"30rem"}}>{omicspred_omics_type(platform_type)}</div>
                </div> */}
                
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
                            <div className='me-3'>
                                <ToogleDiv key={'toggle_sample_'+platformName} type='button' title={<><People className='me-1'/>Sample details</>} content={<SampleTable table_name={platformName+'_platform_samples'} samples_training={samples_training} samples_validation={samples_validation}/>}/>
                            </div>
                            { platformDownloads ?
                                <div className='me-3'>
                                    <ToogleDiv key={'toggle_dowloads_'+platformName} type='button' title={<><FileEarmarkArrowDown className='me-1'/>Downloads</>} content={<DownloadList urls={platformDownloads}/>}/>
                                </div>:''
                            }
                            <div>
                                <Href key={platformName+'_platform_link'} role="button" text="Platform page" href={"/platform/"+platformName}/>
                            </div>
                            { pmid == '36991119' ?
                                <div className='ms-3'>
                                    <Href key={platformName+'_plot_link'} role="button" text="Go to Plots" href={"/plot/"+platformName+"/"+pmid} icon={<GraphUp/>} />
                                </div> : ''
                            }
                        </div>
                        {/* <ToogleDiv key={'toggle_sample_'+platformName} title="Sample details" content={<SampleTable table_name={platformName+'_platform_samples'} samples_training={samples_training} samples_validation={samples_validation}/>}/> */}
                        {/* <SampleTable table_name={platformName+'_platform_samples'} samples_training={samples_training} samples_validation={samples_validation}/> */}
                        <DataTableServer key={platformName+'_table'} url_suffix={platformDataEndpoint} columns={platformTableColumns} groups={platformTableColumnGroups}/>
                    </>:''

                    // <DataTableServer url_suffix={url_endpoint} columns={score_columns(platformsData)} />:''
                }
            </AccordionDetails>
        </Accordion>
    )
}
export default PlatformTable