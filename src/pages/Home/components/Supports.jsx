import DPHPC from "../../../assets/supports/DPHPC.png";
import HDRuk from "../../../assets/supports/HDRuk.png";
import Baker from "../../../assets/supports/Baker.png";

function Supports() {
  return (
    <div className="odd_section">
      <div className="op_section_title">Supported by</div>

      <div className="row justify-content-center mb-5">
        <div className="col pgs_centered">
          <a className="pgs_no_icon_link" href="https://www.phpc.cam.ac.uk/"><img className="img-fluid op_big_icons" src={DPHPC} alt="University of Cambridge"/></a>
        </div>
        <div className="col pgs_centered">
          <a className="pgs_no_icon_link" href="https://www.hdruk.ac.uk/"><img className="img-fluid op_big_icons" src={HDRuk} alt="University of Cambridge"/></a>
        </div>
        <div className="col pgs_centered">
          <a className="pgs_no_icon_link" href="https://baker.edu.au/"><img className="img-fluid op_big_icons" src={Baker} alt="University of Cambridge"/></a>
        </div>
      </div>
    </div>
  );
}
export default Supports;