import Href from "./Href";


const CitationCard = () => {
  const doi = process.env.PROJECT_DOI;
  return (
    <div className="citation_card">
      <div className="card" style={{padding:"0px",textAlign:"center"}}>
        <div className="card-body">
          <h4 className="card-title"><u>OmicsPred as a centralised resource for genetic prediction of multi-omic traits</u></h4>
          <p className="card-text">Foguet C, Gil L, Xu Y, Salazar-Magaña S, Ritchie SC, Persyn E, Im HK, Inouye M, Lambert SA.</p>
        </div>
        <div className="card-footer">
          doi:<Href text={doi} href={process.env.URL_ROOT_DOI+doi} /><span className="ps-2 ms-2" style={{borderLeft:"1px solid"}}>medRxiv (2026)</span>
        </div>
      </div>
    </div>
  );
}
export default CitationCard;