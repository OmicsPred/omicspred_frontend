import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import Href from "../../components/Href";
import {omicspred_platform_omics_type} from "../../components/table/columns/common";
import { browse_title } from '../../components/Common';
import { thousandifyNumber } from '../../components/Generic';

function Publications() {

    // const [platformData, setPlatformData] = useState([])

    const url_suffix = 'publication/all';

    const columns = [
        { field: 'firstauthor', 
          headerName: 'First Author', 
          minWidth: 150,
          flex: 1,
            renderCell: (params) => {
                return (<a href={"/publication/"+params.row.pmid}>{params.row.firstauthor}</a>);
            },
            valueGetter: (params) => { return params.row.firstauthor }
        },
        { 
            field: 'pmid', 
            headerName: 'PubMed ID', 
            minWidth: 120,
            flex: 1,
            renderCell: (params) => {
                return <Href href={process.env.URL_ROOT_PUBMED+params.row.pmid} text={params.row.pmid}/>
            },
            valueGetter: (params) => { return params.row.pmid }
        },
        { 
            field: 'doi', 
            headerName: 'Digital object identifier (doi)', 
            minWidth: 250,
            flex: 1,
            renderCell: (params) => {
                return <Href href={process.env.URL_ROOT_DOI+params.row.doi} text={params.row.doi}/>
            },
            valueGetter: (params) => { return params.row.doi }
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
                const platforms_list = params.row.platforms.map((platform) => omicspred_platform_omics_type(platform.platform.name,platform.platform.type))
                return (
                    <div className="d-flex flex-column">
                    {
                        platforms_list.sort().map((platform) => platform)
                    }
                    </div>
                )
            },
            valueGetter: (params) => { return params.row.platforms.map((platform) => platform.name) }
        },
        {
            field: 'scores_count',
            headerName: '#Scores',
            minWidth: 75,
            flex: 0.5,
            align: 'right',
            renderCell: (params) => {
                let counts = 0;
                const platforms = params.row.platforms;
                // const counts = params.row.platforms.map((platform) => platform.scores_count);
                for (let i = 0; i < platforms.length; i++ ) {
                    counts += platforms[i].scores_count;
                }
                return thousandifyNumber(counts);
            }
        }
    ]
    
    return (
        <div>
            { browse_title('hl','publications') }
            <DataTableFromRestApi table_key="publications" url_suffix={url_suffix} columns={columns}/>
        </div>
    );
}

export default Publications