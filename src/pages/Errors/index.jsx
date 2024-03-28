import { ExclamationOctagonFill } from "react-bootstrap-icons"


export const Error404 = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="mt-5">
                <h2 style={{textAlign:"center"}}><ExclamationOctagonFill className="hl_color" style={{fontSize:'40px'}}/></h2>
                <h2 className="mt-3 mb-2">Page not found <span className="hl_color">[</span>error 404<span className="hl_color">]</span></h2>
                <div><b>Sorry, the requested page couldn't be found</b></div>
            </div>
        </div>
    )
}

