import Href from '../../Href';
import { thousandifyNumber } from '../../Generic';
import { omicspred_platform_omics_type } from "./common";


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
            return <Href href={process.env.URL_ROOT_PUBMED+params.row.pmid} text={params.row.pmid}/>
        },
        valueGetter: (value) => { return value }
    },
    { 
        field: 'doi', 
        headerName: 'Digital object identifier (doi)', 
        minWidth: 250,
        flex: 1,
        renderCell: (params) => {
            return <Href href={process.env.URL_ROOT_DOI+params.row.doi} text={params.row.doi}/>
        },
        valueGetter: (value) => { return value }
    },
    
    { field: 'title', headerName: 'Title', minWidth: 450 },
    { field: 'journal', headerName: 'Journal', minWidth: 150 },
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
        width: 200,
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
    {
        field: 'scores_count',
        headerName: '#Scores',
        minWidth: 75,
        flex: 0.5,
        align: 'right',
        renderCell: (params) => {
            let counts = 0;
            const datasets = params.row.datasets;
            for (let i = 0; i < datasets.length; i++ ) {
                counts += datasets[i].scores_count;
            }
            return thousandifyNumber(counts);
        }
    }
]