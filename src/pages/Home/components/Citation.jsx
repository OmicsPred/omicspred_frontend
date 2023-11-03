import CitationCard from "../../../components/CitationCard"

function Citation() {
  return (
    <div className="odd_section">
      <div className="op_section_title">Citation</div>

      <div>
        <p className="text-justify mt-3 w-[100%] text-base text-gray-500 sm:mt-5 sm:text-lg sm:w-xl sm:mx-auto md:mt-5 md:text-md lg:mx-2">
        OmicsPred is under active development. If you use OmicsPred in your research, we ask that you cite our publication:
        </p>
        <CitationCard />
      </div>
    </div>
  );
};
export default Citation;
