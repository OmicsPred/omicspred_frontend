import { ExclamationOctagonFill } from "react-bootstrap-icons"
import DocumentHead from '../../components/DocumentHead';


export const Error404 = () => {
    return (
        <>
            <DocumentHead title='Error 404'/>
            <div className="d-flex justify-content-center">
                <div className="mt-5">
                    <h2 style={{textAlign:"center"}}><ExclamationOctagonFill className="op_color_2" style={{fontSize:'40px'}}/></h2>
                    <h2 className="mt-3 mb-2">Page not found <span className="op_color_2">[</span>error 404<span className="op_color_2">]</span></h2>
                    <div class="fw-bold text-center">Sorry, the requested page couldn't be found</div>
                </div>
            </div>
        </>
    )
}

