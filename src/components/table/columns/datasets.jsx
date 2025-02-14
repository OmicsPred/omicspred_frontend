
import { FileEarmarkArrowDown, Stack } from 'react-bootstrap-icons';
import { common_cols } from './common';
import { download_labels } from '../../Downloads';


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

export const datasets_columns = [
    { 
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
    },
    { 
        field: 'platform',
        minWidth: 150,
        flex: 1,
        renderHeader: (params) => {
            return (
                <span>
                    <Stack className={"align-middle me-1"}/>
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


// "scoring_files_urls": {
//     "gwas_sumstats": "https://app.box.com/shared/static/u3flbp13zjydegrxjb2uepagp1vb6bj2",
//     "scoring_files": "https://app.box.com/shared/static/z86fg93jg5gwdmmu4xn6u287mre2g5o7",
//     "score_variant_info": "https://app.box.com/shared/static/eac8psw30dxh9evwu9z0bj8hncru2ioa",
//     "validation_results": "https://app.box.com/shared/static/7j7233otah0yxl4rypqx44wzsj7xywxp",
//     "scoring_files_pgsc_calc": "https://app.box.com/shared/static/7qgaa2ci00x9kggyd48qodxd1ffo3ol7"
// }