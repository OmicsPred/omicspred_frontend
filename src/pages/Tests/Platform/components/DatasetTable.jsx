// import { ChevronDoubleRight, Book, GraphUp, ChevronRight } from 'react-bootstrap-icons';
// import Accordion from "@mui/material/Accordion";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { People } from 'react-bootstrap-icons';

// import Href from "../../../../components/Href";
// import { scoresBadge, TooltipText } from '../../../../components/Generic';
// import { SampleTable } from '../../../../components/Sample';
// import { ExpandableDownloadButton, get_download_list } from '../../../../components/Downloads';
import DataTable from '../../../../components/table/DataTable';
import { datasets_platform_columns } from '../../../../components/table/columns/datasets';

const DatasetTable = (props) => {
    const dataset = props.data;
    // const dataset_name = dataset.name;
    // const publication = dataset.publication;
    // const platform_name = dataset.platform.name;
    // // const platform_version = dataset.platform.version;
    // const samples_training = dataset.samples_training;
    // const samples_validation = dataset.samples_validation;
    // const key = publication.pmid

    // let download_urls = undefined
    // if (dataset.scoring_files_urls) {
    //     download_urls = get_download_list(dataset.scoring_files_urls)
    // }

    // const pub_year = publication.date_publication.split('-')[0]

    // let plot_url = "/plot/"+platform_name+"/"+key;
    // if (dataset_name) {
    //     plot_url += '?dataset='+dataset_name;
    // }

    // let samples_label = platform_name+' samples';
    // if (dataset_name) {
    //     samples_label += ' ('+dataset_name+')'
    // }

    // const samples_count = samples_training.length + samples_validation.length

    return (
        <DataTable data={dataset} columns={datasets_platform_columns}/>
    )
};
export default DatasetTable;