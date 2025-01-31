import Href from "../../../components/Href"
import ukb_img from "../../../assets/cohorts/UKB.png";
import reactome_img from "../../../assets/Reactome.png";
import { Bezier2 } from "react-bootstrap-icons";


function Applications() {
  const project_name = process.env.PROJECT_NAME;
  return (
    <div className="even_section" >
      <div className="op_section_title">Application of Multi-Omic Genetic Scores</div>

      <div className="card-deck d-flex justify-content-center flex-lg-row flex-md-row flex-sm-column">
        {/* UKB */}
        <div className="card op_card_homepage" style={{maxWidth:"580px"}}>
          <div className="card-body">
            <h4 className="card-title hl_bb mb-2 pb-2">A Phenome-wide association analysis in UK biobank</h4>
            <p className="card-text">
              Genetic scores in {project_name} have been applied to <Href text="UK Biobank" href={process.env.URL_UKB}/> to test for associations with complex phenotypes.
            </p>
            <Href href="/applications/phenotype/sum" text="PheWAS page" role='button'/>
          </div>
          <div className="card-footer">
            <img src={ukb_img} alt="UKB"/>
          </div>
        </div>
          
        {/* Reactome */}
        <div className="card op_card_homepage">
          <div className="card-body">
            <h4 className="card-title hl_bb mb-2 pb-2">Quantifying genetic control of pathways</h4>
            <p className="card-text">
              Genetic scores for proteomics were applied to assess the extent to which biological pathways are genetically controlled using data at <Href text="Reactome" href={process.env.URL_REACTOME}/>{"."}
            </p>
            <Href href="/pathways" text="Browse Pathways" icon={<Bezier2/>} role='button'/>
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
