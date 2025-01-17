import { Book } from 'react-bootstrap-icons';
import Href from "../../../components/Href"


const About = (props) => {
    return (
        <div className='even_section'>
            <div className="op_section_title" id='about'>About OmicsPred</div>
            <p className="mt-3 text-justify text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-md lg:mx-0">
                OmicsPred is a resource for predicting multi-omics data (proteomics, metabolomics, transcriptomics, etc.) directly from genotypes. 
                To do this, we use extensive multi-omics data to train genetic scores using machine learning. 
                Here, you can explore and download the genetic scores for a wide range of biomolecular traits in human blood as well as the summary statistics of their associations with key traits and diseases in the UK Biobank.
            </p>
            <p className="mt-3 text-justify text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Currently, genetic scores have been trained on the  <Href text="INTERVAL cohort" href="https://www.intervalstudy.org.uk/" />  using  <Href text="Bayesian Ridge regression" href="https://scikit-learn.org/stable/auto_examples/linear_model/plot_bayesian_ridge.html"  /> with validation performed on independent individuals from other cohorts or on withheld subsets of INTERVAL (more info below). 
                Detailed methods and validation steps can be found  <Href icon={<Book/>} text="here" href={process.env.URL_ROOT_DOI+process.env.PROJECT_DOI}/> .
            </p>
        </div>
    )
}

export default About;