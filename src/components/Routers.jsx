import { BrowserRouter as Router, Route, Routes } from 'react-router';

import About from "../pages/About";
import Cohort from "../pages/Cohort";
import Cohorts from "../pages/Cohorts";
import Documentation from "../pages/Documentation";
import Downloads from "../pages/Downloads";
import FAQs from "../pages/FAQs";
import Gene from "../pages/MolecularTrait/Gene";
import Home from "../pages/Home";
import Metabolite from "../pages/MolecularTrait/Metabolite";
import Pathway from "../pages/Pathway";
import Pathways from "../pages/Browse/Pathways";
import Phenotype from "../pages/Applications/Phenotype";
import PhenotypesFull from "../pages/Applications/PhenotypesFull";
import PhenotypesSum from "../pages/Applications/PhenotypesSum";
import Platform from "../pages/Platform";
import Platforms from "../pages/Browse/Platforms";
import Protein from "../pages/MolecularTrait/Protein";
import Publication from "../pages/Publication";
import Publications from "../pages/Browse/Publications";
import Score from "../pages/Score";
import Scores from "../pages/Browse/Scores";
import Tissue from "../pages/Tissue";
import Tissues from "../pages/Browse/Tissues";

import ScrollToAnchor from './ScrollToAnchor';
import Search from "../pages/Search";
import Plot from "../pages/Plot";
import { Redirect } from './Generic';
import { Error404 } from "../pages/Errors";
import PlatformTest from "../pages/Tests/Platform";


function OpRouters() {
    return (
        <Router
            future={{
                v7_relativeSplatPath: true,
                v7_startTransition: true
            }}
        >
            <ScrollToAnchor/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/cohorts" element={<Cohorts />} />
                <Route path="/about" element={<About />} />
                <Route path="/docs" element={<Documentation />} />
                <Route path="/submit" element={<Redirect url={process.env.PROJECT_SUBMIT_SCORES_URL}/>}/>

                {/* Group pages */}
                <Route path="/pathways" element={<Pathways />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/platforms" element={<Platforms />} />
                <Route path="/scores" element={<Scores />} />
                <Route path="/tissues" element={<Tissues />} />
                <Route path="/applications/phenotype/full" element={<PhenotypesFull />} />
                <Route path="/applications/phenotype/sum" element={<PhenotypesSum />} />
                
                {/* Individual pages */}
                <Route path="/cohort/:cohort" element={<Cohort />} />
                <Route path="/gene/:gene" element={<Gene />} />
                <Route path="/metabolite/:metabolite" element={<Metabolite />} />
                <Route path="/pathway/:pathway" element={<Pathway />} />
                <Route path="/phenotype/:phenotype" element={<Phenotype />} />
                <Route path="/platform/:platform" element={<Platform />} />
                <Route path="/protein/:protein" element={<Protein />} />
                <Route path="/publication/:opp_id" element={<Publication />} />
                <Route path="/score/:score" element={<Score />} />
                <Route path="/tissue/:tissue" element={<Tissue />} />

                {/* Plot page */}
                <Route path="/plot/:platform/:opp_id" element={<Plot />} />
                
                {/* Search page */}
                <Route path="/search" element={<Search />} />

                {/* Test pages */}
                {/* <Route path="/search_es" element={<SearchES />} /> */}
                {/* <Route path="/publication_old/:pubmed_id" element={<PublicationOld />} /> */}
                {/* <Route path="/doughnut/" element={<OPDoughnut />} /> */}
                {/* <Route path="/doughnut/" element={<MuiDoughnut />} /> */}
                {/* <Route path="/test/reactome/:reactome_id" element={<ReactomeDiagram />} /> */}
                <Route path="/test/platform/:platform" element={<PlatformTest />} />

                {/* Errors */}
                <Route path="*" element={<Error404 />} />

                {/* Redirections */}
                <Route path="/Scores/Olink/INTERVAL" element={<Redirect url='/platform/Olink'/>}/>
                <Route path="/Scores/Somalogic/INTERVAL" element={<Redirect url='/platform/Somalogic'/>}/>
                <Route path="/Scores/Nightingale/INTERVAL" element={<Redirect url='/platform/Nightingale'/>}/>
                <Route path="/Scores/Metabolon/INTERVAL" element={<Redirect url='/platform/Metabolon'/>}/>
                <Route path="/Scores/Illumina_RNAseq/INTERVAL" element={<Redirect url='/platform/Illumina RNAseq'/>}/>
            </Routes>
        </Router>
    )
}

export default OpRouters