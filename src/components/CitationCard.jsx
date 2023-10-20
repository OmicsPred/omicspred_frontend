import Href from "./Href";


const CitationCard = () => {
  const doi = process.env.OMICSPRED_DOI;
  return (
    <div className="ps-5 pe-5">
      <div className="card" style={{padding:"0px",textAlign:"center"}}>
        <div className="card-body">
          <h4 className="card-title"><u>An atlas of genetic scores to predict multi-omic traits</u></h4>
          <p className="card-text">Xu Y, Ritchie SC, Liang Y, Timmers PRHJ, Pietzner M, Lannelongue L, Lambert SA, Tahir UA, May-Wilson S, Foguet C, Johansson A, Surendran P, Nath AP, Persyn E, Peters JE, Oliver-Williams C, Deng S, Prins B, Luan J, Bomba L, Soranzo N, Di Angelantonio E, Pirastu N, Tai ES, van Dam RM, Parkinson H, Davenport EE, Paul DS, Yau C, Gerszten RE, Malarstig M, Danesh J, Sim X, Langenberg C, Wilson JF, Butterworth AS, Inouye M.</p>
        </div>
        <div className="card-footer">
          doi:<Href text={doi} href={process.env.URL_ROOT_DOI+doi} /><span className="ps-2 ms-2" style={{borderLeft:"1px solid"}}>Nature (2023)</span>
          {/* doi:<Href text="10.1038/s41586-023-05844-9" href="https://doi.org/10.1038/s41586-023-05844-9" /><span className="ps-2 ms-2" style={{borderLeft:"1px solid"}}>Nature (2023)</span> */}
        </div>
      </div>
    </div>
  );
}
export default CitationCard;