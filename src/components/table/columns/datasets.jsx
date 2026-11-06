
import { FileEarmarkArrowDown, Stack, People, GraphUp, LayersFill } from 'react-bootstrap-icons';
import { common_cols, common_column_groups, data_separator } from './common';
import { ancestry_cols } from './ancestry';
import { download_labels, ExpandableDownloadButton, get_download_list } from '../../Downloads';
import { ToggleDiv, TooltipText, participantsBadge, phewasBadge } from '../../Generic';
import { internal_dataset_link, phewas_mention, display_cohort } from '../../Common';
import { SampleTable } from '../../Sample';
import Href from '../../Href';



const default_cell_value = process.env.DEFAULT_CELL_VALUE;

const publication_score_col = {...common_cols['publication'], headerName: 'Scores Publication'}

const download_link = (url,type=undefined,link_text=undefined) => {
    let icon = <FileEarmarkArrowDown className="hl_color" size="20"/>
    let link_title = 'Download data file';
    if (type && download_labels[type]) {
        icon = download_labels[type]['icon']
        link_title = download_labels[type]['title']
    }
    let link_text_content = link_text ? ' '+link_text : '';
    return (
        <TooltipText
            ttype='icon'
            title={link_title}
            text={
                <a className="op_icon_link" href={url} target="_blank">
                    {icon}{link_text_content}
                </a>}
        />
    );
}


const phewas_publication_link = (publication) => {
    const year = publication.date_publication.split('-')[0];
    const tooltip_title = <>{publication.firstauthor}{publication.firstauthor.endsWith('.') ? '' : <i> et al. </i>}{publication.journal} ({year})</>
    return (
        <Href href={"/publication/"+publication.id} text={<TooltipText title={tooltip_title} text={publication.id} ttype='link'/>}/>
    )
}


const columns_for_dataset = {
    'dataset_id': {
        field: 'id',
        headerName: 'ID',
        minWidth: 110,
        // flex: 1,
        hideable: false,
        renderCell: (params) => {
            return internal_dataset_link(params.id);
        },
        valueGetter:  (value) => {
            return value;
        }
    },
    'dataset_name': {
        field: 'name',
        headerName: 'Name',
        minWidth: 125,
        // flex: 1,
        valueGetter:  (value, row) => {
            if (row.name) {
                return row.name;
            }
            else {
                return default_cell_value;
            }
        }
    },
    'platform_version': {
        field: 'platform__version',
        headerName: 'Platform version',
        minWidth: 135,
        // flex: 1,
        valueGetter: (value, row) => {
            if (row.platform.version) {
                return row.platform.version;
            }
            else {
                return default_cell_value;
            }
        }
    },
    'samples': { // Not used at the moment
        field: 'samples',
        headerName: 'Samples',
        minWidth: 320,
        sortable: false,
        // flex: 1,
        renderCell: (params) => {
            if (params.row.samples_training || params.row.samples_validation) {
                const sample_key = params.row.name+'_'+params.row.publication.pmid;
                return(
                    <ToggleDiv key={'toggle_sample_'+sample_key} type='button' title={<><People className='me-1'/>Sample details</>} content={<SampleTable table_name={'sample_table_'+sample_key} samples_training={params.row.samples_training} samples_validation={params.row.samples_validation}/>}/>
                )
            }
            else {
                return default_cell_value;
            }
        }
    },
    'phewas_count': {
        field: 'phewas_count',
        headerName: 'PheWAS Asso.',
        description: 'Number of PheWAS associations in the dataset ('+phewas_mention()+')',
        type: 'number',
        minWidth: 120,
        align: 'right',
        renderCell: (params) => {
            const phewas_count = params.row.phewas_count
            if (phewas_count && phewas_count != 0) {
                return phewasBadge(phewas_count,1);
            }
            else {
                return default_cell_value;
            }
        },
        valueGetter:  (value, row) => { return row.phewas_count }
    },
    'plot_link': {
        field: 'plots',
        headerName: 'Data Plot',
        minWidth: 130,
        sortable: false,
        // flex: 1,
        renderCell: (params) => {
            const count_samples = params.row.samples_training.length + params.row.samples_validation.length;
            const publication_id = params.row.publication.id;
            if (count_samples > 1 && publication_id == 'OPP000001') { // Temporary value
                const dataset_id = params.row.id;
                const platform_name = params.row.platform.name;
                let plot_url = "/plot/"+platform_name+"/"+publication_id;
                if (dataset_id) {
                    plot_url += '?dataset='+dataset_id;
                }
                return(
                    <Href key={publication_id+'_'+dataset_id+'_plot_link'} role="button-small" text="Go to plot" href={plot_url} icon={<GraphUp/>} />
                )
            }
            else {
                return default_cell_value;
            }
        }
    },
    'downloads_links': {
        field: 'downloads',
        headerName: 'Genetic Scores Downloads',
        minWidth: 300,
        sortable: false,
        // flex: 1,
        renderCell: (params) => {
            if (params.row.scoring_files_urls) {
                if (Object.keys(params.row.scoring_files_urls).length > 0) {
                    const download_urls = get_download_list(params.row.scoring_files_urls)
                    return <ExpandableDownloadButton download_urls={download_urls}/>
                }
            }
            return default_cell_value;
        }
    },
    'platform': {
        field: 'platform',
        minWidth: 120,
        // flex: 1,
        renderHeader: () => {
            return (
                <span>
                    <Stack className="align-middle me-1"/>
                    <span className="align-middle fw-bold" style={{paddingTop:"1px"}}>Platform</span>
                </span>
            )
        },
        renderCell: (params) => {
            const platform = params.row.platform;
            return (<a href={"/platform/"+platform.name}>{platform.name}</a>);
        },
        valueGetter:  (value, row) => { return row.platform.name }
    },
}


export const datasets_columns = [
    common_cols['publication'],
    columns_for_dataset['platform'],
    common_cols['platform_type'],
    common_cols['tissue_label'],
    common_cols['dataset_id'],
    common_cols['scores_count'],
    {
        field: 'scoring_files',
        headerName: 'Scoring files',
        minWidth: 110,
        // flex: 0.5,
        align: 'right',
        renderCell: (params) => {
            const files_urls = params.row.scoring_files_urls
            if (files_urls.scoring_files_pgsc_calc) {
                let link = download_link(files_urls.scoring_files_pgsc_calc,'scoring_files_pgsc_calc');
                let link2 = ''
                if (files_urls.scoring_files_hm_38) {
                    link2 = <span className='ms-1'>{download_link(files_urls.scoring_files_hm_38,'scoring_files_hm_38')}</span>;
                }
                return <>{link}{link2}</>;
            }
            else {
                return default_cell_value
            }
        },
        valueGetter: (value, row) => { return row.scoring_files_urls.scoring_files_pgsc_calc }
    },
    {
        field: 'predictdb',
        headerName: 'PredictDB',
        description: 'PredictDB database format + Covariance file (both packaged in an archive)',
        minWidth: 100,
        // flex: 0.5,
        align: 'right',
        renderCell: (params) => {
            const files_urls = params.row.scoring_files_urls
            if (files_urls.predictdb) {
                let link = download_link(files_urls.predictdb,'predictdb');
                return link
            }
            else {
                return default_cell_value
            }
        },
        valueGetter: (value, row) => {
            let files = row.scoring_files_urls.predictdb;
            if (row.scoring_files_urls.covariance) {
                if (files) {
                    files = files + ', ';
                }
                files = files + row.scoring_files_urls.covariance;
            }
            return files
        }
    },
    {
        field: 'metadata',
        headerName: 'Metadata',
        minWidth: 70,
        // flex: 0.5,
        align: 'right',
        renderCell: (params) => {
            const files_urls = params.row.scoring_files_urls
            if (files_urls.metadata) {
                return download_link(files_urls.metadata,'metadata');
            }
            else {
                return default_cell_value
            }
        },
        valueGetter: (value, row) => { return row.scoring_files_urls.metadata }
    },
    {
        field: 'additional_files',
        headerName: 'Additional downloads',
        minWidth: 220,
        // flex: 0.5,
        // align: 'right',
        renderCell: (params) => {
            const files_urls = params.row.scoring_files_urls;
            let other_files = [];
            if (files_urls.validation_results) {
                other_files.push(<div className='mb-1' key='validation_results'>{download_link(files_urls.validation_results,'validation_results','Validation results')}</div>)
            }
            if (files_urls.score_variant_info) {
                other_files.push(<div className='mb-1' key='score_variant_info'>{download_link(files_urls.score_variant_info,'score_variant_info', 'Score variant info')}</div>)
            }
            if (files_urls.gwas_sumstats) {
                other_files.push(<div key='gwas_sumstats'>{download_link(files_urls.gwas_sumstats,'gwas_sumstats','GWAS summary statistics')}</div>)
            }
            return other_files.length > 0 ? other_files : default_cell_value;
        },
        valueGetter: (value, row) => {
            const files_urls = row.scoring_files_urls;
            let other_files = [];
            if (files_urls.validation_results) {
                other_files.push(files_urls.validation_results)
            }
            if (files_urls.score_variant_info) {
                other_files.push(files_urls.score_variant_info)
            }
            if (files_urls.gwas_sumstats) {
                other_files.push(files_urls.gwas_sumstats)
            }
            return other_files.join(', ');
        }
    },
    common_cols['license']
]


export const datasets_phewas_columns = [
    common_cols['dataset_id'],
    columns_for_dataset['platform'],
    common_cols['platform_type'],
    common_cols['tissue_label'],
    publication_score_col,
    {
        field: 'dataset__dataset_phewas__publication__id',
        headerName: 'PheWAS Publication(s)',
        minWidth: 180,
        // flex: 0.8,
        renderCell: (params) => {
            const phewas_publications = params.row.phewas_publications;
            if (phewas_publications && phewas_publications.length > 0) {
                return phewas_publications.map((phewas_publication, index) => <span key={phewas_publication.id}>{index > 0 ? data_separator:''}{phewas_publication_link(phewas_publication)}</span>)
            }
            else {
                return default_cell_value;
            }
        },
        valueGetter: (value, row) => {
            return row.publication.id;
        }
    },
    common_cols['scores_count'],
    columns_for_dataset['phewas_count'],
    {
        field: 'phewas',
        headerName: 'PheWAS',
        description: 'Filtered PheWAS ('+phewas_mention()+')',
        minWidth: 70,
        // flex: 0.5,
        align: 'right',
        renderCell: (params) => {
            const files_urls = params.row.scoring_files_urls
            if (files_urls.phewas) {
                return download_link(files_urls.phewas,'phewas');
            }
            else {
                return default_cell_value
            }
        },
        valueGetter: (value, row) => { return row.scoring_files_urls.phewas }
    },
    {
        field: 'phewas_full',
        headerName: 'PheWAS Full',
        description: 'All the PheWAS associations',
        minWidth: 120,
        // flex: 0.5,
        align: 'right',
        renderCell: (params) => {
            const files_urls = params.row.scoring_files_urls
            if (files_urls.phewas) {
                return download_link(files_urls.phewas,'phewas_full');
            }
            else {
                return default_cell_value
            }
        },
        valueGetter: (value, row) => { return row.scoring_files_urls.phewas_full }
    }
]


const dataset_common_end = [
    common_cols['platform_version'],
    common_cols['method_name'],
    common_cols['training_window'],
    common_cols['scores_count'],
    columns_for_dataset['phewas_count'],
    ancestry_cols['ancestry_training'],
    ancestry_cols['ancestry_validation'],
    columns_for_dataset['plot_link'],
    columns_for_dataset['downloads_links']
]

const datasets_browse_columns_start = [
    columns_for_dataset['dataset_id'],
    columns_for_dataset['dataset_name'],
    common_cols['tissue_label'],
    common_cols['publication'],
    common_cols['platform_name_icon']
]
export const datasets_browse_columns = datasets_browse_columns_start.concat(dataset_common_end)

const datasets_platform_columns_start = [
    columns_for_dataset['dataset_id'],
    columns_for_dataset['dataset_name'],
    common_cols['publication'],
    common_cols['tissue_label']
]
export const datasets_platform_columns = datasets_platform_columns_start.concat(dataset_common_end)


const datasets_publication_columns_start = [
    columns_for_dataset['dataset_id'],
    columns_for_dataset['dataset_name'],
    common_cols['tissue_label'],
    common_cols['platform_name_icon']
]
export const datasets_publication_columns = datasets_publication_columns_start.concat(dataset_common_end)


const datasets_tissue_columns_start = [
    columns_for_dataset['dataset_id'],
    columns_for_dataset['dataset_name'],
    common_cols['publication'],
    common_cols['platform_name_icon']
]
export const datasets_tissue_columns = datasets_tissue_columns_start.concat(dataset_common_end)


export const dataset_column_groups = [
    {
        groupId: 'Dataset',
        children: [{ field: 'id' }, { field: 'name' }],
        headerClassName: 'col_border_right',
        renderHeaderGroup: () => {
            return (
                <span>
                    <LayersFill className="align-middle me-1"/>
                    <span className="align-middle fw-bold op_col_header">Dataset</span>
                </span>
            )
        },
    },
    common_column_groups['ancestry']
]



export const dataset_cohort_columns = [
    {
        field: 'cohort__name_short',
        headerName: 'Cohort',
        minWidth: 100,
        // flex: 0.5,
        renderCell: (params) => {
            const cohort = params.row.cohort;
            return display_cohort(cohort,cohort.name_short, params.row.cohorts_additional);
        },
        valueGetter: (value, row) => {
            return row.cohort.name_short
        }
    },
    ancestry_cols['ancestry'],
    {
        field: 'ancestry_assignment',
        headerName: 'Ancestry Assignment Method',
        minWidth: 300,
        valueGetter: (value, row) => {
            return row.ancestry_assignment;
        }
    },
    {
        field: 'sample_number',
        headerName: 'Sample size',
        description: 'Maximum sample size',
        type: 'number',
        width: 100,
        renderCell: (params) => {
            return participantsBadge(params.row.sample_number);
        },
        valueGetter: (value, row) => {
            return row.sample_number;
        }
    },
    {
        field: 'sample_type',
        headerName: 'Sample type',
        width: 100,
        renderCell: (params) => {
            const stype = params.row.type;
            if (stype == 'Training') {
                return (<span className='training_col'>{stype}</span>)
            }
            else {
                return stype;
            }
        },
        valueGetter: (value, row) => {
            return row.type;
        }
    }
]