import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import restApiCall from '../../components/RestAPI';
import { cohort_cols, common_column_groups, cohort_valueGetter } from '../../components/table/columns/common';
import { dataset_cohort_columns } from '../../components/table/columns/datasets';
import { metabolomics_columns, metabolomics_column_groups } from '../../components/table/columns/metabolomics';
import { proteomics_pub_columns } from '../../components/table/columns/proteomics';
import { transcriptomics_dataset_columns } from '../../components/table/columns/transcriptomics';
import { phenotype_dataset_cols } from '../../components/table/columns/phenotype';
import DataTableServer from '../../components/table/DataTableServer';
import DataTable from '../../components/table/DataTable';
import { op_title, op_subtitle_no_asso, get_cohorts_cols_list, get_cohorts_col_groups_list, Header2Cards, internal_publication_link, internal_platform_link, internal_tissue_link, no_entry_found, element_icon, display_cohort } from '../../components/Common';
import { consoleDev, scoresBadge, phewasBadge, loading_data, add_s_when_plural, ToggleDiv, ToggleID } from '../../components/Generic';
import Href from '../../components/Href';
import { DownloadList, get_download_list } from '../../components/Downloads';
import { Table } from 'react-bootstrap-icons';


function Dataset() {
    const { opd_id } = useParams();
    const [datasetData, setDatasetData] = useState()
    const [scoreDataEndpoint, setScoreDataEndpoint] = useState()
    const [scoreTableColumns, setScoreTableColumns] = useState([])
    const [scoreTableColumnGroups, setScoreTableColumnGroups] = useState([])
    const [cohortsList, setCohortsList] = useState([])
    const [cohortsTrainingList, setCohortsTrainingList] = useState([])
    const [cohortsValidationList, setCohortsValidationList] = useState([])
    const [cohortData, setCohortData] = useState([])
    const [noEntry, setNoEntry] = useState(false)

    const element = 'dataset';

    const metric_sortable_status = false;

    const training_suffix = '__training';

    const skip_training_cohorts = ['MCPS'];

    const phewas_endpoint_url = 'score/phewas/search?opd_id='+opd_id;
    const phewas_column_keys = ['score__id','phenotypes_LIST__id','samples_LIST__sample_number','data_values__adjusted_p-value','data_values__effect_size'];


    const fetchDatasetData = async () => {
        consoleDev(element+'/'+opd_id)
        const dataset_data = await restApiCall(element+'/'+opd_id);
        if (dataset_data && Object.keys(dataset_data).length) {
            setDatasetData(dataset_data);
            prepareTable(dataset_data);
        }
        else {
            setNoEntry(true);
        }
    }


    const cohorts_list = (sample_cohorts_list, eval_type) => {
        const cohorts_count = Object.keys(sample_cohorts_list).length;
        if (cohorts_count != 0) {
            const cohorts_list = <ul>
                { Object.keys(sample_cohorts_list).map((cohort) => <li key={cohort}>{display_cohort(sample_cohorts_list[cohort],cohort)}</li>)}
                </ul>;
            return (
                <div className={eval_type=='Training' && Object.keys(cohortsValidationList).length > 0 ? 'mb-1' : ''}>
                    <ToggleDiv title={<>{element_icon('cohort')}{cohorts_count} {eval_type} cohort{add_s_when_plural(cohorts_count)}</>} content={cohorts_list}/>
                </div>
            )
        }
    }

    const update_sample_cohorts = (sample) => {
        let sample_cohorts = sample['cohorts'];
        const cohorts_additional = sample['cohorts_additional'];
        if (cohorts_additional) {
            for (let i=0; i<sample_cohorts.length; i++) {
                sample_cohorts[i]['additional'] = cohorts_additional;
            }
        }
        return sample_cohorts;
    }
 

    const get_information_left_content = () => {
        return (
            <>
                {datasetData.name ? <tr><td>Name</td><td>{datasetData.name}</td></tr> : ''}
                <tr><td>Publication</td><td>{internal_publication_link(datasetData.publication, 1)}</td></tr>
                <tr><td>Platform</td><td>{internal_platform_link(datasetData.platform, 1)}</td></tr>
                <tr><td>Tissue </td><td>{internal_tissue_link(datasetData.tissue, 1)}</td></tr>
                <tr><td>Method</td><td>{datasetData.method_name}</td></tr>
                <tr><td>Training window</td><td>{datasetData.training_window}</td></tr>
                { cohortsList ? <tr><td>Cohort{add_s_when_plural(Object.keys(cohortsList).length)}</td><td>{cohorts_list(cohortsTrainingList,'Training')}{cohorts_list(cohortsValidationList,'Validation')}</td></tr>: ''}
                <tr><td>Number of scores</td><td>{scoresBadge(datasetData.scores_count)}<span className='ps-3'><Href href="#linked_scores" text="See linked Scores" icon={<Table/>}/></span></td></tr>
                <tr><td>Number of linked PheWAS</td><td>{phewasBadge(datasetData.phewas_count)}{datasetData.phewas_count != 0 ? <span className='ps-3'><Href href="#linked_phewas_data" text="See linked PheWAS" icon={<Table/>}/></span>:''}</td></tr>
                <tr><td>Terms & Licenses</td><td>{datasetData.license}</td></tr>
            </>
        )
    }


    const get_information_right_content = () => {
        const download_urls = get_download_list(datasetData.scoring_files_urls);
        consoleDev('> download_urls:')
        consoleDev(download_urls)
        if (Object.keys(download_urls).length > 0) {
            return (
                <tr><td className='op_header_info_no_col p-0' colSpan="2"><DownloadList urls={download_urls}/></td></tr>
            )
        }
        else {
            return (
                <tr><td className='op_header_info_no_col p-0' colSpan="2">No downloads available</td></tr>
            ) 
        }
    }


    const get_url_endpoint = (dataset) => {
        let endpoint_suffix = dataset.platform.name+"?dataset="+opd_id;
        const type = dataset.platform.type;
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


    const get_metadata_columns = (platform_name,type) => {
        switch(type) {
            case 'Metabolomics':
                if (platform_name in metabolomics_columns) {
                    return metabolomics_columns[platform_name].map(object => ({ ...object }));
                }
                break;
            case 'Proteomics':
                if (platform_name in proteomics_pub_columns) {
                    return proteomics_pub_columns[platform_name].map(object => ({ ...object }));
                }
                break;
            case 'Transcriptomics':
                if (platform_name in transcriptomics_dataset_columns) {
                    return transcriptomics_dataset_columns[platform_name].map(object => ({ ...object }));
                }
                break;
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
        let cohorts = {};
        // Training cohorts
        let training_cohorts = []
        let training_cohorts_detailed = {};
        for (let i=0; i<dataset['samples_training'].length; i++) {
            const sample = dataset['samples_training'][i]
            const ancestry = sample['ancestry_broad'];
            const sample_cohorts = update_sample_cohorts(sample);
            cohorts = get_cohorts_cols_list(sample_cohorts, cohorts);
            // Get simple list of training cohorts
            for (let j=0; j<sample_cohorts.length; j++) {
                const sample_t_cohort = sample_cohorts[j];
                const name_short = sample_t_cohort['name_short'];
                const entry_name = name_short+'_'+ancestry;
                training_cohorts[name_short] = sample_t_cohort;
                if (!training_cohorts_detailed[entry_name]){
                    training_cohorts_detailed[entry_name] = { 
                        'cohort': sample_t_cohort,
                        'sample_number': sample['sample_number'],
                        'ancestry_broad': ancestry,
                        'ancestry_assignment': sample['ancestry_assignment'],
                        'cohorts_additional': sample['cohorts_additional'],
                        'type': 'Training'
                    }
                }
                else {
                    const sample_number = sample['sample_number'] 
                    if (sample_number > training_cohorts_detailed[entry_name]['sample_number']) {
                        training_cohorts_detailed[entry_name]['sample_number'] = sample_number
                    }
                }
            }
        }
        setCohortsTrainingList(training_cohorts);
        // Fetch the training cohorts
        const cohorts_training = Object.keys(cohorts);

        // Validation cohorts
        let validation_cohorts = {};
        let validation_cohorts_detailed = {}
        for (let i=0; i< dataset['samples_validation'].length;i++) {
            const sample = dataset['samples_validation'][i];
            const ancestry = sample['ancestry_broad'];
            const sample_cohorts = update_sample_cohorts(sample);
            cohorts = get_cohorts_cols_list(sample_cohorts, cohorts);
            // Get simple list of validation cohorts
            for (let j=0; j<sample_cohorts.length; j++) {
                const sample_v_cohort = sample_cohorts[j];
                const name_short = sample_v_cohort['name_short'];
                const entry_name = name_short+'_'+ancestry;
                validation_cohorts[name_short] = sample_v_cohort;
                if (!validation_cohorts_detailed[entry_name]){
                    validation_cohorts_detailed[entry_name] = { 
                        'cohort': sample_v_cohort,
                        'sample_number': sample['sample_number'],
                        'ancestry_broad': ancestry,
                        'ancestry_assignment': sample['ancestry_assignment'],
                        'cohorts_additional': sample['cohorts_additional'],
                        'type': 'Validation'
                    }
                }
                else {
                    const sample_number = sample['sample_number'] 
                    if (sample_number > validation_cohorts_detailed[entry_name]['sample_number']) {
                        validation_cohorts_detailed[entry_name]['sample_number'] = sample_number
                    }
                }
            }
        }
        // Create list
        const cohort_data = Object.values(training_cohorts_detailed).concat(Object.values(validation_cohorts_detailed))
        setCohortData(cohort_data)
        setCohortsValidationList(validation_cohorts);
        setCohortsList(cohorts)
        // Fetch columns details
        const metric_cols = ['R2','Rho','Missing Rate'];
        const cohort_names = Object.keys(cohorts);
        for (let i=0; i < cohort_names.length; i++) {
            const cohort = cohort_names[i];
            if (cohort_cols[cohort]) {
                for (let j=0; j<metric_cols.length; j++) {
                    const metric = metric_cols[j];
                    if (cohort_cols[cohort][metric]) {
                        // Use a different display for the training cohorts
                        // And redefine the column object to adapt the "training" status
                        if (cohorts_training.includes(cohort) && !skip_training_cohorts.includes(cohort)) {
                            let training_header_class = 'training_col'
                            if (cohort_cols[cohort][metric].headerClassName == 'col_border_left') {
                                training_header_class = ['training_col','col_border_left']
                            }
                            const training_field = cohort_cols[cohort][metric].field+training_suffix;
                            const cohort_metric_col = {...cohort_cols[cohort][metric], field: training_field, headerClassName: training_header_class, valueGetter: (value, row) => {return cohort_valueGetter(row,cohort,metric,true);}, sortable: metric_sortable_status}
                            columns.push(cohort_metric_col)
                        }
                        else {
                            const cohort_metric_col = {...cohort_cols[cohort][metric], sortable: metric_sortable_status}
                            columns.push(cohort_metric_col)
                        }
                    }
                }
            }
        }
        setScoreTableColumns(columns)
    }


    const get_metadata_column_groups = (platform_name,type) => {
        switch(type) {
            case 'Metabolomics':
                if (platform_name in metabolomics_column_groups) {
                    return metabolomics_column_groups[platform_name];
                }
                break;
            // case 'Proteomics':
            //     if (platform in proteomics_column_groups) {
            //         return proteomics_column_groups[platform];
            //     }
            //     break;
            // case 'Transcriptomics':
            //     if (platform in transcriptomics_column_groups) {
            //         return transcriptomics_column_groups[platform];
            //     }
            //     break;
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
            const sample = dataset['samples_training'][i];
            const sample_cohorts_t = update_sample_cohorts(sample);
            cohorts = get_cohorts_col_groups_list(sample_cohorts_t,cohorts);
        }
        // Fetch the training cohorts
        let cohorts_training = [];
        let found_mcps = false
        for (let i=0; i< cohorts.length; i++) {
            const cohort = cohorts[i];
            if (!skip_training_cohorts.includes(cohort.name_short)) {
                found_mcps = true
            }
            else {
                cohorts_training.push(cohort);
            }
        }
        if (found_mcps) {
            cohorts = []
        }

        // Validation cohorts
        for (let i=0; i<dataset['samples_validation'].length;i++) {
            const sample = dataset['samples_validation'][i];
            const sample_cohorts_v = update_sample_cohorts(sample);
            cohorts = get_cohorts_col_groups_list(sample_cohorts_v,cohorts);
        }

        // Fetch column group details
        for (let i=0; i< cohorts.length; i++) {
            const cohort = cohorts[i];
            if (common_column_groups[cohort]) {
                // Redefine the column group object to adapt the "training" status of the child columns
                if (cohorts_training.includes(cohort) && !skip_training_cohorts.includes(cohort)) { // Skip training data for MCPS (no values)
                    const training_group_id = common_column_groups[cohort].groupId+' (training)';
                    let training_field_children = []
                    for (let j=0; j<common_column_groups[cohort].children.length; j++) {
                        const child_field= common_column_groups[cohort].children[j].field
                        training_field_children.push({field: child_field+training_suffix})
                    }
                    col_groups.push({...common_column_groups[cohort], groupId: training_group_id, children: training_field_children, headerClassName: ['training_col','col_border_left']})
                }
                else {
                    col_groups.push(common_column_groups[cohort])
                }
            }
        }
        return col_groups;
    }


    const prepareTable = (dataset) => {
        const url_endpoint = get_url_endpoint(dataset);
        setScoreDataEndpoint(url_endpoint);
        get_table_columns(dataset);
        const columns_groups = get_table_column_groups(dataset);
        setScoreTableColumnGroups(columns_groups);
    }


    useEffect(() => {
        fetchDatasetData();
    },[])


    return (
        <>
            { datasetData ?
                <>
                    {op_title('dataset', datasetData, datasetData.id, true)}
                    <Header2Cards type_left='dataset' content_left={get_information_left_content()} type_right='Downloads' content_right={get_information_right_content()}/>
                </>
                : noEntry ?
                    <>{ no_entry_found('score',opd_id) }</> : loading_data()
            }

            {/* Cohorts and Ancestries */}
            { cohortData && cohortData.length > 0 ?
            <>
                <div className='d-flex mt-5'>
                    <ToggleID title={op_subtitle_no_asso('hl','Cohorts and ancestries',cohortData.length)} id='cohorts_table' type='header' target='the table of cohorts & ancestries linked to this dataset'/>
                </div>
                <div>
                    <div className='d-flex d-none' id='cohorts_table'>
                        <DataTable key='cohorts' data={cohortData} columns={dataset_cohort_columns}/>
                    </div>
                </div>
            </> : ''
            }

            {/* Scores by Platform */}
            { scoreDataEndpoint && scoreTableColumns && scoreTableColumnGroups ?
                <div className='mt-5'>
                    {op_subtitle_no_asso('hl','Linked scores', datasetData.scores_count)}
                    {/* <div className='d-flex mb-3'>
                        <AncestryLegend />
                    </div> */}
                    <div className='table_container'>
                        <DataTableServer key='scores' url_suffix={scoreDataEndpoint} columns={scoreTableColumns} groups={scoreTableColumnGroups}/>
                    </div>
                </div> : ''
            }
            {/* Phenotypes */}
            { datasetData && datasetData.phewas_count != 0 ?
                <div className='mt-5'>
                    {op_subtitle_no_asso('phenotype','Linked PheWAS data', datasetData.phewas_count)}
                    <div className='table_container'>
                        <DataTableServer key='phenotypes' url_suffix={phewas_endpoint_url} columns={phenotype_dataset_cols} col_for_ids={phewas_column_keys} hidden_columns={['samples__ancestry_broad','z-score','var_gene_exp']}/>
                    </div>
                </div> : ''
            }
        </>
    )
}

export default Dataset