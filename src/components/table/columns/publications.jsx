import Href from '../../Href';
import { common_cols, default_cell_value, omicspred_platform_omics_type } from './common';
import { datasetBadge } from '../../Generic';


export const publications_columns = [
    {
        field: 'opp_id',
        headerName: 'Publication ID',
        minWidth: 120,
        // flex: 1,
          renderCell: (params) => {
              return (<a href={"/publication/"+params.row.id}>{params.row.id}</a>);
          },
          valueGetter: (value, row) => { return row.id }
    },
    {
        field: 'firstauthor',
        headerName: 'First Author',
        minWidth: 120,
        // flex: 1,
            renderCell: (params) => {
                return params.row.firstauthor;
            },
            valueGetter: (value) => { return value }
    },
    {
        field: 'pmid',
        headerName: 'PubMed ID',
        minWidth: 105,
        // flex: 1,
        renderCell: (params) => {
            // TEMPORARY
            if (params.row.pmid) {
                return <Href href={process.env.URL_ROOT_PUBMED+params.row.pmid} text={params.row.pmid}/>
            }
            else {
                return default_cell_value;
            }
        },
        // valueGetter: (value) => {return value }
        // TEMPORARY:
        valueGetter: (value) => {
            if (value) {
                return value
            }
            else {
                return default_cell_value;
            }
        }
    },
    {
        field: 'doi',
        headerName: 'Digital object identifier (doi)',
        minWidth: 230,
        // flex: 1,
        renderCell: (params) => {
             // TEMPORARY
            if (params.row.doi) {
                return <Href href={process.env.URL_ROOT_DOI+params.row.doi} text={params.row.doi}/>
            }
            else {
                return default_cell_value;
            }
        },
        // valueGetter: (value) => {return value }
        // TEMPORARY:
        valueGetter: (value) => {
            if (value) {
                return value
            }
            else {
                return default_cell_value;
            }
        }
    },
    { field: 'title', headerName: 'Title', minWidth: 400 },
    { field: 'journal', headerName: 'Journal', minWidth: 110 },
    {
        field: 'date_publication',
        headerName: 'Publication Date',
        minWidth: 130 ,
        renderCell: (params) => {
            // Change date format to DD/MM/YYYY
            if (params.row.date_publication) {
                const date_array = params.row.date_publication.split('-');
                return date_array[2]+"/"+date_array[1]+"/"+date_array[0];
            }
            else {
                return default_cell_value;
            }
        }
    },
    {
        field: 'platforms',
        headerName: 'Platform(s)',
        width: 180,
        renderCell: (params) => {
            // Identify and list distinct platforms
            var unique_platforms = [];
            var platforms_types = {};
            params.row.datasets.forEach(function (x) {
                const platform_name = x.platform.name;
                if (!unique_platforms.includes(platform_name)) {
                    platforms_types[platform_name] = x.platform.type;
                    unique_platforms.push(platform_name);
                }
            });
            const platforms_list = unique_platforms.sort().map((platform_name) => omicspred_platform_omics_type(platform_name,platforms_types[platform_name]))
            if (platforms_list.length) {
                return (
                    <div className="d-flex flex-column">
                    {
                        platforms_list.map((platform) => platform)
                    }
                    </div>
                )
            }
            return default_cell_value;
        },
        valueGetter: (value, row) => { return row.datasets.map((dataset) => dataset.platform.name) }
    },
    {
        field: 'datasets',
        headerName: '#Datasets',
        width: 90,
        renderCell: (params) => {
            // return scoresBadge(counts, true);
            const datasets_count = params.row.datasets.length;
            if (datasets_count != 0) {
                return (
                    datasetBadge(datasets_count)
                )
            }
            return default_cell_value;
        },
        valueGetter: (value, row) => { return row.datasets.length }
    },
    common_cols['scores_count'],
    common_cols['phewas_count']
]