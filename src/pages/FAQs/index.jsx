import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Lightbulb } from "react-bootstrap-icons";

import { PageTitleSimple } from '../../components/Common';
import { faqs_list, faqs_categories } from "./FAQsList";


export default function FAQs() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <div>
      <PageTitleSimple title='FAQs'/>
    
      <div className="w-full grid place-items-center ">
        <div className="w-[90%]">
          {faqs_categories.map((cat) => {
            return (
              <div key={cat}>
                <h3 className="mt-5 mb-3">{cat}</h3>
                {faqs_list.map((d, index) => {
                  if (d.type == cat) {
                    return (
                      <Accordion
                        key={d.title}
                        expanded={expanded === index}
                        onChange={handleChange(index)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                          key={d.title+'sum'}
                        >
                          <div style={{ width:"90%", flexShrink:2 }} className="d-flex font-bold faq_box">
                            <Lightbulb className="me-3"/><span>{d.title}</span>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <p>{d.text}</p>
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                })}
              </div>
            );
          }
          )}
        </div>
      </div>
    </div>
  );
}
