import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import FAQs from "../pages/FAQs";
import Cohorts from "../pages/Cohorts";
import About from "../pages/About";
import Publications from "../pages/Publications";
import Platforms from "../pages/Platforms";
import Scores from "../pages/Scores";
import PhecodesFull from "../pages/Applications/PhecodesFull";
import PhecodesSum from "../pages/Applications/PhecodesSum";
import Metabolomics from "../pages/Omics/Metabolomics";
import Proteomics from "../pages/Omics/Proteomics";
import Publication from "../pages/Publication";
import Platform from "../pages/Platform";
import Score from "../pages/Score";
import Gene from "../pages/MolecularTrait/Gene";
import Protein from "../pages/MolecularTrait/Protein";
import Metabolite from "../pages/MolecularTrait/Metabolite";
import Pathway from "../pages/MolecularTrait/Pathway";
import Phecode from "../pages/Applications/Phecode";
import Applications from "../pages/Applications";
// Tests
import Search from "../pages/Tests/Search";
// import SearchES from "../pages/Tests/SearchES";
import Plot from "../pages/Tests/Plot";
import ReactomeDiagram from "../pages/Tests/Reactome";


function OpRouters() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/cohorts" element={<Cohorts />} />
                <Route path="/about" element={<About />} />

                {/* Group pages */}
                <Route path="/publications" element={<Publications />} />
                <Route path="/platforms" element={<Platforms />} />
                <Route path="/scores" element={<Scores />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/applications/phecode/full" element={<PhecodesFull />} />
                <Route path="/applications/phecode/sum" element={<PhecodesSum />} />
                <Route path="/metabolomics/:platform" element={<Metabolomics />} />
                <Route path="/proteomics/:platform" element={<Proteomics />} />
                
                {/* Individual pages */}
                <Route path="/publication/:pubmed_id" element={<Publication />} />
                <Route path="/platform/:platform" element={<Platform />} />
                <Route path="/score/:score" element={<Score />} />
                <Route path="/gene/:gene" element={<Gene />} />
                <Route path="/protein/:protein" element={<Protein />} />
                <Route path="/metabolite/:metabolite" element={<Metabolite />} />
                <Route path="/pathway/:pathway" element={<Pathway />} />
                <Route path="/phecode/:phecode" element={<Phecode />} />
                
                {/* Search page */}
                <Route path="/search" element={<Search />} />

                {/* Test pages */}
                {/* <Route path="/search_es" element={<SearchES />} /> */}
                <Route path="/plot/:platform" element={<Plot />} />
                <Route path="/test/reactome/:reactome_id" element={<ReactomeDiagram />} />

            </Routes>
        </Router>
    )
}

export default OpRouters