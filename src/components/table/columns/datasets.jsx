
import { FileEarmarkArrowDown, Stack, People, GraphUp, LayersFill } from 'react-bootstrap-icons';
import { common_cols, common_column_groups } from './common';
import { ancestry_cols } from './ancestry';
import { download_labels, ExpandableDownloadButton, get_download_list } from '../../Downloads';
import { ToggleDiv, TooltipText } from '../../Generic';
import { internal_dataset_link } from '../../Common';
import { SampleTable } from '../../Sample';
import Href from '../../Href';



const default_cell_value = process.env.DEFAULT_CELL_VALUE;


const download_link = (url,type=undefined) => {
    let icon = <FileEarmarkArrowDown className="hl_color" size="20"/>
    let link_title = 'Download data file';
    if (type && download_labels[type]) {
        icon = download_labels[type]['icon']
        link_title = download_labels[type]['title']
    }
    return (
        <TooltipText
            ttype='icon'
            title={link_title}
            text={
                <a className="op_icon_link" href={url} target="_blank">
                    {icon}
                </a>}
        />
    );
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
        headerName: ' Samples',
        minWidth: 320,
        sortable: false,
        flex: 1,
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
    'plot_link': {
        field: 'plots',
        headerName: 'Data Plot',
        minWidth: 130,
        sortable: false,
        // flex: 1,
        renderCell: (params) => {
            const count_samples = params.row.samples_training.length + params.row.samples_validation.length
            if (count_samples > 1) {
                const dataset_id = params.row.id;
                const platform_name = params.row.platform.name;
                const publication_id = params.row.publication.id;
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
        minWidth: 320,
        sortable: false,
        flex: 1,
        renderCell: (params) => {
            if (params.row.scoring_files_urls) {
                if (Object.keys(params.row.scoring_files_urls).length > 0) {
                    const download_urls = get_download_list(params.row.scoring_files_urls)
                    return <ExpandableDownloadButton download_urls={download_urls}/>
                }
            }
            return default_cell_value;
        }
    }
}


export const datasets_columns = [
    common_cols['publication'],
    {
        field: 'platform',
        minWidth: 130,
        flex: 1,
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
    common_cols['platform_type'],
    common_cols['tissue_label'],
    common_cols['dataset_id'],
    common_cols['scores_count'],
    {
        field: 'scoring_files',
        headerName: 'Scoring files',
        minWidth: 120,
        flex: 0.5,
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
        field: 'validation_results',
        headerName: 'Validation results',
        minWidth: 150,
        flex: 0.5,
        align: 'right',
        renderCell: (params) => {
            const files_urls = params.row.scoring_files_urls
            if (files_urls.validation_results) {
                return download_link(files_urls.validation_results,'validation_results');
            }
            else {
                return default_cell_value
            }
        },
        valueGetter: (value, row) => { return row.scoring_files_urls.validation_results }
    },
    {
        field: 'score_variant_info',
        headerName: 'Score variant info',
        minWidth: 150,
        flex: 0.5,
        align: 'right',
        renderCell: (params) => {
            const files_urls = params.row.scoring_files_urls
            if (files_urls.score_variant_info) {
                return download_link(files_urls.score_variant_info,'score_variant_info');
            }
            else {
                return default_cell_value
            }
        },
        valueGetter: (value, row) => { return row.scoring_files_urls.score_variant_info }
    },
    {
        field: 'gwas_sumstats',
        headerName: 'GWAS sum. stats',
        description: 'GWAS summary statistics',
        minWidth: 150,
        flex: 0.5,
        align: 'right',
        renderCell: (params) => {
            const files_urls = params.row.scoring_files_urls
            if (files_urls.gwas_sumstats) {
                return download_link(files_urls.gwas_sumstats,'gwas_sumstats');
            }
            else {
                return default_cell_value
            }
        },
        valueGetter: (value, row) => { return row.scoring_files_urls.gwas_sumstats }
    },
    common_cols['license']
]


const dataset_common_end = [
    columns_for_dataset['platform_version'],
    common_cols['method_name'],
    common_cols['scores_count'],
    ancestry_cols['ancestry_training_computed'],
    ancestry_cols['ancestry_validation_computed'],
    // ancestry_cols['ancestry_training'],
    // ancestry_cols['ancestry_validation'],
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