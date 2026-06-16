import { CodeSlash, Download, FileText } from "react-bootstrap-icons";
import Href from "../../../components/Href";

const DataDownloads = () => {
    const project_name = process.env.PROJECT_NAME;
    return (
        <div className="even_section">
            <div className="op_section_title">Data downloads</div>
                <div className="card_containter flex-lg-row flex-md-row">
                    {/* Downloads */}
                    <div className="card op_card_homepage">
                    <div className="card-body">
                        <h4 className="card-title hl_bb mb-2 pb-2"><FileText className="me-2"/>Data files</h4>
                        <p className="card-text">
                            Genetic scores and Phenotype data files are publicly accessible for download on Box<sup>TM</sup>.
                        </p>
                        <Href href="/downloads" role="button" icon={<Download/>} text="Downloads page"/>
                    </div>
                    </div>
                    
                    {/* REST API */}
                    <div className="card op_card_homepage">
                    <div className="card-body">
                        <h4 className="card-title hl_bb mb-2 pb-2"><CodeSlash className="me-2"/>REST API</h4>
                        <p className="card-text">
                            Programmatic access to the {project_name} metadata is available via a REST API.
                        </p>
                        <Href href={process.env.REST_API_URL_PUBLIC} role="button" no_external_icon="1" icon={<CodeSlash/>} text="REST API documentation"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DataDownloads;