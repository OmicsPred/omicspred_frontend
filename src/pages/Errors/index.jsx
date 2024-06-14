import { ExclamationOctagonFill } from "react-bootstrap-icons"


export const Error404 = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="mt-5">
                <h2 style={{textAlign:"center"}}><ExclamationOctagonFill className="op_color_1" style={{fontSize:'40px'}}/></h2>
                <h2 className="mt-3 mb-2">Page not found <span className="op_color_1">[</span>error 404<span className="op_color_1">]</span></h2>
                <div><b>Sorry, the requested page couldn't be found</b></div>
            </div>
        </div>
    )
}

