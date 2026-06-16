import Href from "../../../components/Href"


const Feedback = () => {
  return (
    <div className="even_section" >
      <div className="op_section_title">Questions and Feedback</div>

      <div>
        <p className="mb-0">
          We would love to hear from you! To provide feedback or ask a question,
          you can contact the {process.env.PROJECT_NAME} team <Href href={process.env.PROJECT_EMAIL} role="email" text="here"/>.
        </p>
      </div>
    </div>
  );
}
export default Feedback;
