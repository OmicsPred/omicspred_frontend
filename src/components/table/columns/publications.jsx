import Href from '../../Href';
import { common_cols, default_cell_value, omicspred_platform_omics_type } from "./common";


export const publications_columns = [
    { field: 'firstauthor', 
      headerName: 'First Author', 
      minWidth: 150,
      flex: 1,
        renderCell: (params) => {
            return (<a href={"/publication/"+params.row.pmid}>{params.row.firstauthor}</a>);
        },
        valueGetter: (value) => { return value }
    },
    { 
        field: 'pmid', 
        headerName: 'PubMed ID', 
        minWidth: 120,
        flex: 1,
        renderCell: (params) => {
            // TEMPORARY
            if (params.row.pmid != 12345) {
                return <Href href={process.env.URL_ROOT_PUBMED+params.row.pmid} text={params.row.pmid}/>
            }
            else {
                return default_cell_value;
            }
        },
        // valueGetter: (value) => {return value }
        // TEMPORARY:
        valueGetter: (value) => {
            if (value != 12345) {
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
        minWidth: 250,
        flex: 1,
        renderCell: (params) => {
             // TEMPORARY
            if (params.row.pmid != 12345) {
                return <Href href={process.env.URL_ROOT_DOI+params.row.doi} text={params.row.doi}/>
            }
            else {
                return default_cell_value;
            }
        },
        // valueGetter: (value) => {return value }
        // TEMPORARY:
        valueGetter: (value, row) => {
            if (row.pmid != 12345) {
                return value
            }
            else {
                return default_cell_value;
            }
        }
    },
    
    { field: 'title', headerName: 'Title', minWidth: 450 },
    { field: 'journal', headerName: 'Journal', minWidth: 120 },
    { 
        field: 'date_publication', 
        headerName: 'Publication Date', 
        minWidth: 150 ,
        renderCell: (params) => {
            // Change date format to DD/MM/YYYY
            if (params.row.date_publication) {
                const date_array = params.row.date_publication.split('-');
                return date_array[2]+"/"+date_array[1]+"/"+date_array[0];
            }
            else {
                return '-';
            }
        }
    },
    { 
        field: 'platforms', 
        headerName: 'Platform(s)', 
        width: 175,
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
            return (
                <div className="d-flex flex-column">
                {
                    platforms_list.map((platform) => platform)
                }
                </div>
            )
        },
        valueGetter: (value, row) => { return row.datasets.map((dataset) => dataset.platform.name) }
    },
    common_cols['scores_count']
]