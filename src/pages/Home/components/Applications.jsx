import Href from "../../../components/Href"
import ukb_img from "../../../assets/cohorts/UKB.png";
import reactome_img from "../../../assets/Reactome.png";
import { Bezier2 } from "react-bootstrap-icons";


function Applications() {
  return (
    <div className="even_section" >
      <div className="op_section_title">Application of Multi-Omic Genetic Scores</div>

      <div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column">
        
        {/* UKB */}
        <div className="card ms-2 me-2" style={{padding:"0px",maxWidth:"580px"}}>
          <div className="card-body">
            <h4 className="card-title">A Phenome-wide association analysis in UK biobank</h4>
            <p className="card-text">Genetic scores in OmicsPred have been applied to{" "}
              <Href text="UK biobank" href={process.env.URL_UKB}/>{" "}
              to test for associations with complex phenotypes.
            </p>
            <a href="/applications/phecode/sum" className="btn btn-op shadow">PheWAS page</a>
          </div>
          <div className="card-footer">
            <img src={ukb_img} alt="UKB"/>
          </div>
        </div>
          
        {/* Reactome */}
        <div className="card ms-2 me-2" style={{padding:"0px",maxWidth:"580px"}}>
          <div className="card-body">
            <h4 className="card-title">Quantifying genetic control of pathways</h4>
            <p className="card-text">Genetic scores for proteomics were applied to assess the extent to which biological pathways are genetically controlled using data at{" "}
              <Href text="Reactome" href={process.env.URL_REACTOME}/>{"."}
            </p>
            <a href="/pathways" className="btn btn-op shadow"><Bezier2 size="0.9em" className="me-2"/>Browse Pathways</a>
          </div>
          <div className="card-footer">
            <img src={reactome_img} alt="Reactome"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
