import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Platforms from "../pages/Platforms";
import Scores from "../pages/Scores";
import Metabolomics from "../pages/Metabolomics";
import Proteomics from "../pages/Proteomics";
import Score from "../pages/Score";
import Gene from "../pages/Gene";
import Protein from "../pages/Protein";
import Metabolite from "../pages/Metabolite";

function OpRouters() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />

                {/* Group pages */}
                <Route path="/platforms" element={<Platforms />} />
                <Route path="/scores" element={<Scores />} />
                {/* <Route path="/Metabolomics" element={<Metabolomics />} /> */}
                <Route path="/metabolomics/:platform" element={<Metabolomics />} />
                <Route path="/proteomics/:platform" element={<Proteomics />} />
                
                {/* Individual pages */}
                <Route path="/score/:score" element={<Score />} />
                <Route path="/gene/:gene" element={<Gene />} />
                <Route path="/protein/:protein" element={<Protein />} />
                <Route path="/metabolite/:metabolite" element={<Metabolite />} />
            </Routes>
        </Router>
    )
}

export default OpRouters