import Href from "../../../components/Href"

import protein_img from "../../../assets/protein.png";
import metabolite_img from "../../../assets/metabolite.png";
import rna_img from "../../../assets/rna.png";


function Platforms() {
  return (
    <div className="odd_section">
      <div className="op_section_title">Platforms with Genetic Scores</div>

      {/* Proteomics */}
      <h2 className="mt-4 op_subsection_header"><img className="me-3" src={protein_img} alt="Proteomics"/>Proteomics</h2>
      <div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column">
        {/* Somalogic */}
        <div className="card ms-2 me-2" style={{padding:"0px",maxWidth:"580px"}}>
          <div className="card-body">
            <h4 className="card-title">Somalogic (plasma)</h4>
            <p className="card-text">
                2,384 protein genetic scores, validated on the{" "}
                <Href
                  text="FENLAND"
                  href="https://www.mrc-epid.cam.ac.uk/research/studies/fenland/"
                ></Href>{""}
                ,{" "}
                <Href
                  text="MEC"
                  href="https://blog.nus.edu.sg/sphs/multiethnic-cohort/"
                ></Href>{" "}
                and{" "}
                <Href
                  text="JHS"
                  href="https://www.jacksonheartstudy.org/"
                ></Href>{" cohorts"}
            </p>
            <a href="/platform/Somalogic" className="btn btn-primary">Learn more</a>
          </div>
        </div>
        {/* Olink */}
        <div className="card ms-2 me-2" style={{padding:"0px",maxWidth:"580px"}}>
          <div className="card-body">
            <h4 className="card-title">Olink (plasma)</h4>
            <p className="card-text">
                308 protein genetic scores, validated on the{" "}
                <Href
                  text="NSPHS"
                  href="https://pubmed.ncbi.nlm.nih.gov/20568910/"
                ></Href>{" "}
                and{" "}
                <Href
                  text="ORCADES"
                  href="https://www.ed.ac.uk/viking/about-us/what-we-do/our-studies"
                ></Href>{" cohorts"}
            </p>
            <a href="/platform/Olink" className="btn btn-primary">Learn more</a>
          </div>
        </div>
      </div>

      {/* Metabolomics */}
      <h2 className="mt-4 op_subsection_header"><img className="me-3" src={metabolite_img} alt="Metabolomics"/>Metabolomics</h2>
      <div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column">
        {/* Metabolon */}
        <div className="card ms-2 me-2" style={{padding:"0px",maxWidth:"580px"}}>
          <div className="card-body">
            <h4 className="card-title">Metabolon (plasma)</h4>
            <p className="card-text">
              726 metabolite genetic scores, validated on a withheld subset
              of INTERVAL and{" "}
              <Href
                text="ORCADES"
                href="https://www.ed.ac.uk/viking/about-us/what-we-do/our-studies"
              ></Href>{" cohorts"}
            </p>
            <a href="/platform/Metabolon" className="btn btn-primary">Learn more</a>
          </div>
        </div>
        {/* Nightingale */}
        <div className="card ms-2 me-2" style={{padding:"0px",maxWidth:"580px"}}>
          <div className="card-body">
            <h4 className="card-title">Nightingale (serum)</h4>
            <p className="card-text">
              Genetic scores for 141 metabolic traits, validated on{" "}
              <Href
                text="UK Biobank"
                href="https://www.ukbiobank.ac.uk/"
              ></Href>{""}
              ,{" "}
              <Href
                text="ORCADES"
                href="https://www.ed.ac.uk/viking/about-us/what-we-do/our-studies"
              ></Href>{" "}
              and{" "}
              <Href
                text="VIKING"
                href="https://www.ed.ac.uk/viking/about-us/what-we-do/our-studies"
              ></Href>{" cohorts"}
            </p>
            <a href="/platform/Nightingale" className="btn btn-primary">Learn more</a>
          </div>
        </div>
      </div>

      {/* Transcriptomics */}
      <h2 className="mt-4 op_subsection_header"><img className="me-3" src={rna_img} alt="Transcriptomics"/>Transcriptomics</h2>
      <div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column">
        {/* Illumina_RNAseq */}
        <div className="card ms-2 me-2" style={{padding:"0px",maxWidth:"580px"}}>
          <div className="card-body">
            <h4 className="card-title">RNAseq (whole blood)</h4>
            <p className="card-text">
              13,668 gene expression genetic scores, validated on a withheld subset of INTERVAL.
            </p>
            <a href="/platform/Illumina RNAseq" className="btn btn-primary">Learn more</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Platforms;
<></>