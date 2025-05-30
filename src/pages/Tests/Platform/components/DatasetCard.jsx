import { ChevronDoubleRight, Book, GraphUp, ChevronRight } from 'react-bootstrap-icons';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { People } from 'react-bootstrap-icons';

import Href from "../../../../components/Href";
import { scoresBadge, TooltipText } from '../../../../components/Generic';
import { SampleTable } from '../../../../components/Sample';
import { ExpandableDownloadButton, get_download_list } from '../../../../components/Downloads';


const DatasetCard = (props) => {
    const dataset = props.data;
    const dataset_id = dataset.id;
    const dataset_name = dataset.name;
    const publication = dataset.publication;
    const platform_name = dataset.platform.name;
    const platform_version = dataset.platform.version;
    const samples_training = dataset.samples_training;
    const samples_validation = dataset.samples_validation;
    const key = publication.id

    let download_urls = undefined
    if (dataset.scoring_files_urls) {
        download_urls = get_download_list(dataset.scoring_files_urls)
    }

    const pub_year = publication.date_publication.split('-')[0]

    let plot_url = "/plot/"+platform_name+"/"+key+'?dataset='+dataset_id;

    let samples_label = platform_name+' samples';
    if (dataset_name) {
        samples_label += ' ('+dataset_name+')'
    }

    const samples_count = samples_training.length + samples_validation.length

    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={key+'_panel_content'}
            id={key+'_panel_header'}
            title='Click to see the Sample details and available downloads of the study'
            >
                <div style={{display:'block'}}>
                    <div>
                        <div>
                            <ChevronDoubleRight className="hl_color me-2" size="0.9rem"/><span className="font-bold">{publication.title}</span>
                        </div>
                        { dataset_name || platform_version ?
                            <div className="ms-4 my-1">
                                <span>Scores count: {scoresBadge(dataset.scores_count)}</span>
                                <span className='px-2 hl_color'>|</span>
                                {dataset_name ? <span>Dataset: <b>{dataset_name}</b></span>:''}
                                {platform_version ? <><span className='px-2 hl_color'>|</span><span>Platform version: <b>{platform_version}</b></span></>:''}
                            </div>
                            : ''
                        }
                        <div className="ms-4">
                            <span >{[publication.firstauthor," ",<i key={key+'_i'}>et al.</i>," - ",publication.journal," (",pub_year,")"]}</span>
                            <span className='ms-4'>
                                <Href key={key+'_pub_link'} role="button-small" text="Publication page" href={"/publication/"+key} icon={<Book/>}/>
                            </span>
                            { samples_count > 1 ?
                                <span className='ms-4'>
                                    <Href key={key+'_'+dataset_name+'_plot_link'} role="button-small" text={platform_name+" plots"} href={plot_url} icon={<GraphUp/>} />
                                </span> : ''
                            }
                        </div>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>

                {/* Download buttons */}
                { download_urls ?
                    <div className='mb-3'>
                        <ExpandableDownloadButton download_urls={download_urls}/>
                    </div >: ''
                }
                {/* Tissue */}
                <div className='mb-3'>
                    <ChevronRight className='me-1 color_hl'/><span>Tissue: </span><span className="fw-bold"><TooltipText title={dataset.tissue.description} text={dataset.tissue.label}/></span> (<Href href={dataset.tissue.url} text={dataset.tissue.id}/>)
                </div>
                <h5 className='mt-1'><People className='me-2 op_subtitle color_hl' style={{fontSize:'10px',verticalAlign:'top'}}/>{samples_label}</h5>
                <SampleTable table_name={key} samples_training={samples_training} samples_validation={samples_validation}/>
            </AccordionDetails>
        </Accordion>
    )
};
export default DatasetCard;