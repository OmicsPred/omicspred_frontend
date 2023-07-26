import Href from "./Href"
import { Twitter, Building, CCircleFill } from 'react-bootstrap-icons';


function Footer() {
    return (
    //  <footer className="d-flex flex-wrap justify-content-between align-items-center px-5 py-4 mt-auto mt-4 border-top bg-light" style={{width:"100%"}}>
    <footer className="d-flex flex-wrap justify-content-between align-items-center px-5 py-4 mt-auto border-top bg-light">
        <div className="col-md-4 d-flex align-items-center" style={{verticalAlign:'middle'}}>
            <Href icon={<Building />} text="Lab's website" href="http://www.inouyelab.org/" />
           </div>

        <div className="col-md-4 d-flex align-items-center">
            <Href icon={<CCircleFill />} text="All Genetics Scores are provided under a CC-BY license" href="http://www.inouyelab.org/" />
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
            <Href icon={<Twitter />} text="Twitter" href="https://twitter.com/CamBakerSGI" />
            </li>
        </ul>
    </footer>
    );
}

export default Footer;