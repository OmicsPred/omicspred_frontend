// import { Fragment } from "react";
// import { Popover, Transition } from "@headlessui/react";

import Landing_img from "../../../assets/landing.jpg";

import Href from "../../../components/Href"

//import {Link} from "react-router-dom"


function Header() {
  return (
    <div className="home_header row bg-white overflow-hidden">

        <div className="col-1"></div>

        <main className="home_header_left col-5">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-indigo-600 xl:inline">
                OMICSPRED:
              </span>
              <span className="block xl:inline">
                  
              </span>{" "}
              <span className="block xl:inline">
                  An atlas of genetic scores for prediction of multi-omics data
              </span>{" "}
            
            </h1>
            <p className="mt-3 text-justify text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-md lg:mx-0">
            OMICSPRED is a resource for predicting multi-omics data (proteomics, metabolomics, transcriptomics etc.) directly from genotypes. 
            To do this, we use extensive multi-omics data to train genetic scores using machine learning. 
            Here, you can explore and download the genetic scores for a wide range of biomolecular traits in human blood as well as the summary statistics of their associations with key traits and diseases in the UK Biobank.
            </p>
            <p className="mt-3 text-justify text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Currently, genetic scores have been trained on the  <Href text="INTERVAL cohort" href="https://www.intervalstudy.org.uk/" />  using  <Href text="Bayesian Ridge regression" href="https://scikit-learn.org/stable/auto_examples/linear_model/plot_bayesian_ridge.html"  /> with validation performed on independent individuals from other cohorts or on withheld subsets of INTERVAL (more info below). 
              Detailed methods and validation steps can be found <Href text="here" href="https://www.biorxiv.org/content/10.1101/2022.04.17.488593v1" /> .
            </p>

            <div style={{display:'flex',justifyContent:'center'}} className="mt-5">
              <div className="mt-3 me-4 sm:mt-0 sm:ml-3">
                <a className="btn btn-primary shadow" href="/Scores" role="button">Scores</a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a className="btn btn-primary shadow" href="/Applications" role="button">Applications</a>
              </div>
            </div>
          </div>
        </main>
        <div className="col-1"></div>
        <div className="col-5">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={Landing_img}
            alt=""
          />
        </div>
    </div>
  );
}

export default Header;