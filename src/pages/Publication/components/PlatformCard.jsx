import { ChevronRight, GraphUp } from 'react-bootstrap-icons';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Href from "../../../components/Href";
import { numberBadge } from "../../../components/Generic";
import { SampleTable } from '../../../components/Sample';


const PlatformCard = (props) => {
    const platform = props.data.platform;
    const samples_training = props.data.samples_training;
    const samples_validation = props.data.samples_validation;
    const key = platform.name;
    const platform_name = platform.name;
    const pmid = props.pmid;

    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={key+'_panel_content'}
            id={key+'_panel_header'}
            >
                <div className="d-flex">
                    <ChevronRight className="hl_color me-2 mt-1"/><span className="font-bold">{platform_name}</span>
                    <div style={{position:"absolute",left:"15rem"}}><span className="me-1"># Scores:</span>{numberBadge(props.data.omics_count)}</div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="mb-3">
                    <Href key={key+'_platform_link'} role="button" text="Platform page" href={"/platform/"+platform_name}/>
                    { pmid == '36991119' ?
                        <>
                            <span className="me-3"></span>
                            <Href key={key+'_plot_link'} role="button" text="Go to Plots" href={"/plot/"+platform_name+"/"+pmid} icon={<GraphUp/>} />
                        </> : ''
                    }
                </div>
                <SampleTable table_name={key} samples_training={samples_training} samples_validation={samples_validation}/>
            </AccordionDetails>
        </Accordion>
    )
};
export default PlatformCard;