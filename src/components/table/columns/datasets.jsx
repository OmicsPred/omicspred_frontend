
import { FileEarmarkArrowDown, Stack, People, GraphUp } from 'react-bootstrap-icons';
import { common_cols, omicspred_internal_link } from './common';
import { download_labels, ExpandableDownloadButton, get_download_list } from '../../Downloads';
import { ToogleDiv } from '../../Generic';
import { SampleTable } from '../../Sample';
import Href from '../../Href';


const default_cell_value = process.env.DEFAULT_CELL_VALUE;


const download_link = (url,type=undefined) => {
    // return (<Href href={url} icon={<FileEarmarkArrowDownFill/>}/>)
    let icon = <FileEarmarkArrowDown className="hl_color" size="20"/>
    let link_title = 'Download data file';
    if (type && download_labels[type]) {
        icon = download_labels[type]['icon']
        link_title = download_labels[type]['title']
    }
    return (
        <a className="op_icon_link" href={url} title={link_title} target="_blank">
            {icon}
        </a>
    );
}

const dataset_common_columns = {
    'publication': {
        field: 'publication', 
        headerName: 'Publication', 
        minWidth: 230,
        flex: 1,
        renderCell: (params) => {
            const publication = params.row.publication;
            let year = ''
            if (publication.date_publication) {
                const date_array = publication.date_publication.split('-');
                year = date_array[0];
            }
            return (
                <a href={"/publication/"+publication.pmid}>{publication.firstauthor} <i>et al.</i> {publication.journal}{year ? <> ({year})</>:''}</a>
            );
        },
        valueGetter:  (value, row) => { return row.publication.firstauthor }
    }
}

export const datasets_columns = [
    dataset_common_columns['publication'],
    {
        field: 'platform',
        minWidth: 150,
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
    { 
        field: 'dataset', 
        headerName: 'Dataset', 
        minWidth: 150,
        flex: 1,
            renderCell: (params) => {
                const dataset_name = params.row.name;
                return (dataset_name ? dataset_name : default_cell_value);
            },
            valueGetter: (value, row) => { return row.name }
    },
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
                return download_link(files_urls.scoring_files_pgsc_calc,'scoring_files_pgsc_calc');
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
        headerName: 'GWAS summary stats',
        minWidth: 170,
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
    }
]


export const datasets_platform_columns = [
    {
        field: 'name',
        headerName: 'Dataset Name',
        minWidth: 120,
        flex: 1,
        valueGetter:  (value, row) => {
            if (row.name) {
                return row.name;
            }
            else {
                return default_cell_value;
            }
        }
    },
    dataset_common_columns['publication'],
    {
        field: 'tissue__label',
        headerName: 'Tissue',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            if (params.row.tissue) {
                const tissue = params.row.tissue;
                return omicspred_internal_link({'id': tissue.id, 'label': tissue.label},'tissue');
            }
        },
        valueGetter: (value, row) => {
            if (row.tissue) {
                return row.tissue.label;
            }
            else {
                return default_cell_value;
            }
        }
    },
    {
        field: 'platform__version',
        headerName: 'Platform version',
        minWidth: 150,
        flex: 1,
        valueGetter: (value, row) => {
            if (row.platform.version) {
                return row.platform.version;
            }
            else {
                return default_cell_value;
            }
        }
    },
    {
        field: 'samples',
        headerName: ' Samples',
        minWidth: 320,
        sortable: false,
        flex: 1,
        renderCell: (params) => {
            if (params.row.samples_training || params.row.samples_validation) {
                const sample_key = params.row.name+'_'+params.row.publication.pmid;
                return(
                    <ToogleDiv key={'toggle_sample_'+sample_key} type='button' title={<><People className='me-1'/>Sample details</>} content={<SampleTable table_name={'sample_table_'+sample_key} samples_training={params.row.samples_training} samples_validation={params.row.samples_validation}/>}/>
                )
            }
            else {
                return default_cell_value;
            }
        }
    },
    {
        field: 'plots',
        headerName: ' Plots',
        minWidth: 180,
        sortable: false,
        flex: 1,
        renderCell: (params) => {
            const count_samples = params.row.samples_training.length + params.row.samples_validation.length
            if (count_samples > 1) {
                const dataset_name = params.row.name;
                const platform_name = params.row.platform.name;
                const publication_id = params.row.publication.pmid;
                let plot_url = "/plot/"+platform_name+"/"+publication_id;
                if (dataset_name) {
                    plot_url += '?dataset='+dataset_name;
                }
                return(
                    <Href key={publication_id+'_'+dataset_name+'_plot_link'} role="button-small" text="Go to data plots" href={plot_url} icon={<GraphUp/>} />
                )
            }
            else {
                return default_cell_value;
            }
        }
    },
    {
        field: 'downloads',
        headerName: 'Genetic Scores Downloads',
        minWidth: 320,
        sortable: false,
        flex: 1,
        renderCell: (params) => {
            if (params.row.scoring_files_urls) {
                const download_urls = get_download_list(params.row.scoring_files_urls)
                return <ExpandableDownloadButton download_urls={download_urls}/>
            }
            else {
                return default_cell_value;
            }
        }
    }
]

// "scoring_files_urls": {
//     "gwas_sumstats": "https://app.box.com/shared/static/u3flbp13zjydegrxjb2uepagp1vb6bj2",
//     "scoring_files": "https://app.box.com/shared/static/z86fg93jg5gwdmmu4xn6u287mre2g5o7",
//     "score_variant_info": "https://app.box.com/shared/static/eac8psw30dxh9evwu9z0bj8hncru2ioa",
//     "validation_results": "https://app.box.com/shared/static/7j7233otah0yxl4rypqx44wzsj7xywxp",
//     "scoring_files_pgsc_calc": "https://app.box.com/shared/static/7qgaa2ci00x9kggyd48qodxd1ffo3ol7"
// }