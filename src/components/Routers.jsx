import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import FAQs from "../pages/FAQs";
import Cohorts from "../pages/Cohorts";
import About from "../pages/About";
import Platforms from "../pages/Platforms";
import Scores from "../pages/Scores";
import PhecodesFull from "../pages/Applications/PhecodesFull";
import PhecodesSum from "../pages/Applications/PhecodesSum";
import Metabolomics from "../pages/Metabolomics";
import Proteomics from "../pages/Proteomics";
import Platform from "../pages/Platform";
import Score from "../pages/Score";
import Gene from "../pages/Gene";
import Protein from "../pages/Protein";
import Metabolite from "../pages/Metabolite";
import Phecode from "../pages/Applications/Phecode";
import Applications from "../pages/Applications";
// Tests
import Search from "../pages/Tests/Search";
import SearchES from "../pages/Tests/SearchES";
import Plot from "../pages/Tests/Plot";
import PlatformRest from "../pages/Tests/Platform"


function OpRouters() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/cohorts" element={<Cohorts />} />
                <Route path="/about" element={<About />} />

                {/* Group pages */}
                <Route path="/platforms" element={<Platforms />} />
                <Route path="/scores" element={<Scores />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/applications/phecode/full" element={<PhecodesFull />} />
                <Route path="/applications/phecode/sum" element={<PhecodesSum />} />
                <Route path="/metabolomics/:platform" element={<Metabolomics />} />
                <Route path="/proteomics/:platform" element={<Proteomics />} />
                
                {/* Individual pages */}
                <Route path="/platform/:platform" element={<Platform />} />
                <Route path="/score/:score" element={<Score />} />
                <Route path="/gene/:gene" element={<Gene />} />
                <Route path="/protein/:protein" element={<Protein />} />
                <Route path="/metabolite/:metabolite" element={<Metabolite />} />
                <Route path="/phecode/:phecode" element={<Phecode />} />
                
                {/* Test pages */}
                <Route path="/search" element={<Search />} />
                <Route path="/search_es" element={<SearchES />} />
                <Route path="/plot/:platform" element={<Plot />} />
                <Route path="/platform_rest/:platform" element={<PlatformRest />} />

            </Routes>
        </Router>
    )
}

export default OpRouters