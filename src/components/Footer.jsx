import Href from "./Href"
import { Twitter, Building, CCircleFill } from 'react-bootstrap-icons';


function Footer() {
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center px-5 py-4 mt-auto border-top bg-light">

            <div className="col-3 d-flex align-items-center" style={{verticalAlign:'middle'}}>
                <Href icon={<Building />} text="Lab's website" href={process.env.URL_INOUYE_LAB} no_external_icon="1" />
            </div>

            <div className="col-6 op_copyright">
                <Href icon={<CCircleFill />} text="All Genetics Scores are provided under a CC-BY license" href={process.env.URL_INOUYE_LAB} no_external_icon="1" />
            </div>

            <ul className="nav col-3 justify-content-end list-unstyled d-flex">
                <li className="ms-3">
                <Href icon={<Twitter />} text="Twitter" href="https://twitter.com/CamBakerSGI" no_external_icon="1" />
                </li>
            </ul>
        </footer>
    );
}

export default Footer;