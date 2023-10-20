import Href from "../../../components/Href"
import { EnvelopeAt } from 'react-bootstrap-icons';

function Feedback() {

  return (
    <div className="even_section" >
      <div className="op_section_title">Questions and Feedback</div>

      <div>
        <p className="mt-3 w-[100%] text-base text-gray-500 sm:mt-5 sm:text-lg sm:w-xl sm:mx-auto md:mt-5 md:text-md lg:mx-0">
          We would love to hear from you! To provide feedback or ask a question,
          you can <Href icon={<EnvelopeAt />} text="contact" href={"mailto:"+process.env.OMICSPRED_EMAIL} /> the OmicsPred team.
        </p>
      </div>
    </div>
  );
};
export default Feedback;
