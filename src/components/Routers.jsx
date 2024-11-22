import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { Error404 } from "../pages/Errors";
import Home from "../pages/Home";
import FAQs from "../pages/FAQs";
import Cohorts from "../pages/Cohorts";
import About from "../pages/About";
import Downloads from "../pages/Downloads";
import Pathways from "../pages/Pathways";
import Publications from "../pages/Publications";
import Platforms from "../pages/Platforms";
import Scores from "../pages/Scores";
import PhecodesFull from "../pages/Applications/PhecodesFull";
import PhecodesSum from "../pages/Applications/PhecodesSum";
import Publication from "../pages/Publication";
import Platform from "../pages/Platform";
import Score from "../pages/Score";
import Gene from "../pages/MolecularTrait/Gene";
import Protein from "../pages/MolecularTrait/Protein";
import Metabolite from "../pages/MolecularTrait/Metabolite";
import Phecode from "../pages/Applications/Phecode";
import Pathway from "../pages/Pathway";
import Cohort from "../pages/Cohort";
// Tests
import Search from "../pages/Search";
import Plot from "../pages/Tests/Plot";
import PlatformAlt from "../pages/Tests/Platform";


function OpRouters() {
    return (
        <Router
            future={{
                v7_relativeSplatPath: true,
                v7_startTransition: true
            }}
        >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/cohorts" element={<Cohorts />} />
                <Route path="/about" element={<About />} />

                {/* Group pages */}
                <Route path="/pathways" element={<Pathways />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/platforms" element={<Platforms />} />
                <Route path="/scores" element={<Scores />} />
                <Route path="/applications/phecode/full" element={<PhecodesFull />} />
                <Route path="/applications/phecode/sum" element={<PhecodesSum />} />
                
                {/* Individual pages */}
                <Route path="/publication/:pubmed_id" element={<Publication />} />
                <Route path="/platform/:platform" element={<Platform />} />
                <Route path="/score/:score" element={<Score />} />
                <Route path="/gene/:gene" element={<Gene />} />
                <Route path="/protein/:protein" element={<Protein />} />
                <Route path="/metabolite/:metabolite" element={<Metabolite />} />
                <Route path="/pathway/:pathway" element={<Pathway />} />
                <Route path="/phecode/:phecode" element={<Phecode />} />
                <Route path="/cohort/:cohort" element={<Cohort />} />
                
                {/* Search page */}
                <Route path="/search" element={<Search />} />

                {/* Test pages */}
                {/* <Route path="/search_es" element={<SearchES />} /> */}
                <Route path="/plot/:platform/:pmid" element={<Plot />} />
                {/* <Route path="/publication_old/:pubmed_id" element={<PublicationOld />} /> */}
                {/* <Route path="/doughnut/" element={<OPDoughnut />} /> */}
                {/* <Route path="/doughnut/" element={<MuiDoughnut />} /> */}
                {/* <Route path="/test/reactome/:reactome_id" element={<ReactomeDiagram />} /> */}
                <Route path="/test/platform/:platform" element={<PlatformAlt />} />

                {/* Errors */}
                <Route path="*" element={<Error404 />} />

            </Routes>
        </Router>
    )
}

export default OpRouters