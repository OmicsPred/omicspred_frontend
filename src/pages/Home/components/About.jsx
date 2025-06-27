import Href from "../../../components/Href"


const About = () => {
    const project_name = process.env.PROJECT_NAME;
    return (
        <div className='even_section'>
            <div className="op_section_title" id='about'>About {project_name}</div>
            <p className="mt-3 text-justify text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-md lg:mx-0">
                {project_name} is a centralized resource for hosting genetic prediction models of multi-omic traits (<span className="underline_Proteomics">proteomics</span>, <span className="underline_Metabolomics">metabolomics</span>, <span className="underline_Transcriptomics">transcriptomics</span>, etc.) and their associated results.
                The platform brings together published prediction models across a wide range of biomolecular traits, along with key information such as model training and validation details, and associations with complex diseases, while integrating with external biological knowledge bases to support interpretation and broader utility.
            </p>
            <div className="d-flex justify-content-center">
                <div className="text-start">
                    <p className="ps-3 mb-1">Users can access:</p>
                    <ul>
                        <li><Href href='/scores' text='Genetic prediction models'/> of multi-omic traits, and links to.</li>
                        <li>Methodological details, validation metrics, and <Href href='/publications' text='links to source studies'/>.</li>
                        <li>Summary statistics of <Href href='/applications/phenotype/full' text='trait–disease associations'/>, primarily generated using these multi-omic scores.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default About;