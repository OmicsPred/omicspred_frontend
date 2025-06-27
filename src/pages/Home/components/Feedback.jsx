import Href from "../../../components/Href"


const Feedback = () => {
  return (
    <div className="even_section" >
      <div className="op_section_title">Questions and Feedback</div>

      <div>
        <p className="mt-3 w-[100%] text-base text-gray-500 sm:mt-5 sm:text-lg sm:w-xl sm:mx-auto md:mt-5 md:text-md lg:mx-0">
          We would love to hear from you! To provide feedback or ask a question,
          you can contact the {process.env.PROJECT_NAME} team <Href href={process.env.PROJECT_EMAIL} role="email" text="here"/>.
        </p>
      </div>
    </div>
  );
}
export default Feedback;
