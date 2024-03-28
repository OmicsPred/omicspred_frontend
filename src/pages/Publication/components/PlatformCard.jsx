import { ChevronRight } from 'react-bootstrap-icons';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { numberBadge } from "../../../components/Generic";
import { SampleTable } from '../../../components/Sample';


const PlatformCard = (props) => {
    const platform = props.data.platform;
    const samples_training = props.data.samples_training;
    const samples_validation = props.data.samples_validation;
    const key = platform.name;

    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={key+'_panel_content'}
            id={key+'_panel_header'}
            >
                <div className="d-flex">
                    <ChevronRight className="hl_color me-2 mt-1"/><span className="font-bold">{platform.name}</span>
                    <div style={{position:"absolute",left:"15rem"}}><span className="me-1"># Scores:</span>{numberBadge(props.data.omics_count)}</div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <SampleTable table_name={key} samples_training={samples_training} samples_validation={samples_validation}/>
            </AccordionDetails>
        </Accordion>
    )
};
export default PlatformCard;