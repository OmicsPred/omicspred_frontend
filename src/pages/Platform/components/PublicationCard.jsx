import { ChevronRight, Book, GraphUp } from 'react-bootstrap-icons';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { People } from 'react-bootstrap-icons';

import Href from "../../../components/Href";
import { SampleTable } from '../../../components/Sample';
import { op_subtitle_no_asso } from '../../../components/Common';


const PublicationCard = (props) => {
    const additional = props.data
    const publication = additional.publication;
    const platform_name = additional.platform.name;
    const samples_training = additional.samples_training;
    const samples_validation = additional.samples_validation;
    const key = publication.pmid

    const pub_year = publication.date_publication.split('-')[0]

    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={key+'_panel_content'}
            id={key+'_panel_header'}
            >
                <div style={{display:'block'}}>
                    <div>
                        <div>
                            <ChevronRight className="hl_color me-2"/><span className="font-bold">{publication.title}</span>
                        </div>
                        <div className="ms-4">
                            <span >{[publication.firstauthor," ",<i key={key+'_i'}>et al.</i>," - ",publication.journal," (",pub_year,")"]}</span>
                            {/* <span className='ms-4'>
                                <Href key={key+'_pub_link'} role="button-small" text="Publication page" href={"/publication/"+key} icon={<Book/>}/>
                            </span> */}
                            { key == '36991119' ?
                                <span className='ms-4'>
                                    <Href key={key+'_plot_link'} role="button-small" text={platform_name+" plots"} href={"/plot/"+platform_name+"/"+key} icon={<GraphUp/>} />
                                </span>: ''
                            }
                        </div>
                    </div>
                    {/* { key == '36991119' ?
                        <div style={{display:'block'}}>
                            <Href key={key+'_plot_link'} role="button-small" text={platform_name+" plots"} href={"/plot/"+platform_name+"/"+key} icon={<GraphUp/>} />
                        </div> : ''
                    } */}
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="mb-3">
                    <Href key={key+'_pub_link'} role="button-small" text="Publication page" href={"/publication/"+key} icon={<Book/>}/>
                    {/* { key == '36991119' ?
                        <>
                            <span className="me-3"></span>
                            <Href key={key+'_plot_link'} role="button" text={platform_name+" plots"} href={"/plot/"+platform_name+"/"+key} icon={<GraphUp/>} />
                        </> : ''
                    } */}
                </div>
                <h5 className='mt-4'><People className='me-2 op_subtitle color_hl' style={{fontSize:'10px',verticalAlign:'top'}}/>{platform_name+' samples'}</h5>
                <SampleTable table_name={key} samples_training={samples_training} samples_validation={samples_validation}/>
            </AccordionDetails>
        </Accordion>
    )
};
export default PublicationCard;