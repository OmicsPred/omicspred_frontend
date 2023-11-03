import DPHPC from "../../../assets/supports/DPHPC.png";
import HDRuk from "../../../assets/supports/HDRuk.png";
import Baker from "../../../assets/supports/Baker.png";

function Supports() {
  return (
    <div className="odd_section pb-0">
      <div className="op_section_title">Supported by</div>

      <div className="row justify-content-center mb-5">
        <div className="col pgs_centered">
          <a className="pgs_no_icon_link" href={process.env.URL_CAM_DPHPC}><img className="img-fluid op_big_icons" src={DPHPC} alt="University of Cambridge"/></a>
        </div>
        <div className="col pgs_centered">
          <a className="pgs_no_icon_link" href={process.env.URL_HDR_UK}><img className="img-fluid op_big_icons" src={HDRuk} alt="HDR-UK"/></a>
        </div>
        <div className="col pgs_centered">
          <a className="pgs_no_icon_link" href={process.env.URL_BAKER}><img className="img-fluid op_big_icons" src={Baker} alt="Baker Institute"/></a>
        </div>
      </div>
    </div>
  );
}
export default Supports;