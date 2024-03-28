import { useState, useEffect } from 'react';
import { PlusCircleFill, DashCircleFill, People } from 'react-bootstrap-icons';


export const thousandifyNumber = function(number) {
    if (number !== undefined) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return ''
}


export const numberBadge = function(number,title) {
    if (title) {
        return <span className="badge rounded-pill text-bg-primary" title={title}>{thousandifyNumber(number)}</span>
    }
    else {
        return <span className="badge rounded-pill text-bg-primary">{thousandifyNumber(number)}</span>
    }
}


export const participantsBadge = function(number) {
    return <span className="badge rounded-pill text-bg-primary" title="# of Participants"><People className='me-1' style={{fontSize:'12px',verticalAlign:'top'}}/>{thousandifyNumber(number)}</span>
}


export const ToogleDiv = (props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {}, [show])

    const hideShowDiv = (e) => {
        if (show) {
            setShow(false);
        }
        else {
            setShow(true);
        }
    }

    return (
        <>
            <div className="op_toogle" onClick={(e) => {
              hideShowDiv(e)
            }}>{props.title}{show ? <DashCircleFill className="ms-1"/>:<PlusCircleFill className="ms-1"/>}</div>
            {show ? <div>{props.content}</div>:null}
        </>
    )
}


export const useExternalScript = (url) => {
    let [state, setState] = useState(url ? "loading" : "idle");

    useEffect(() => {
        if (!url) {
            setState("idle");
            return;
        }

        let script = document.querySelector(`script[src="${url}"]`);

        const handleScript = (e) => {
            setState(e.type === "load" ? "ready" : "error");
        };

        if (!script) {
            script = document.createElement("script");
            script.type = "application/javascript";
            script.src = url;
            script.async = true;
            document.body.appendChild(script);
            script.addEventListener("load", handleScript);
            script.addEventListener("error", handleScript);
        }
        else {
            script.addEventListener("load", handleScript);
            script.addEventListener("error", handleScript);
        }

        return () => {
            script.removeEventListener("load", handleScript);
            script.removeEventListener("error", handleScript);
        };
    }, [url]);

    return state;
  };