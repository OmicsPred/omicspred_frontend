import Href from "../../../components/Href"

function Citation() {
  return (
    <div className="odd_section">
      <div className="op_section_title">Citation</div>

      <div>
        <p className="text-justify mt-3 w-[100%] text-base text-gray-500 sm:mt-5 sm:text-lg sm:w-xl sm:mx-auto md:mt-5 md:text-md lg:mx-2">
        OMICSPRED is under active development. If you use OMICSPRED in your research, we ask that you cite our publication:
        </p>

        <div className="ps-5 pe-5">
        <div className="card" style={{padding:"0px"}}>
          <div className="card-body">
            <h4 className="card-title"><u>An atlas of genetic scores to predict multi-omic traits</u></h4>
            <p className="card-text">Xu Y, Ritchie SC, Liang Y, Timmers PRHJ, Pietzner M, Lannelongue L, Lambert SA, Tahir UA, May-Wilson S, Foguet C, Johansson A, Surendran P, Nath AP, Persyn E, Peters JE, Oliver-Williams C, Deng S, Prins B, Luan J, Bomba L, Soranzo N, Di Angelantonio E, Pirastu N, Tai ES, van Dam RM, Parkinson H, Davenport EE, Paul DS, Yau C, Gerszten RE, Malarstig M, Danesh J, Sim X, Langenberg C, Wilson JF, Butterworth AS, Inouye M.</p>
          </div>
          <div className="card-footer">
          doi:<Href text="10.1038/s41586-023-05844-9" href="https://doi.org/10.1038/s41586-023-05844-9" />. Nature (2023).
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Citation;
