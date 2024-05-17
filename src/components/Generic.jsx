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

    let toogle_class = 'op_toogle';
    if (props.type == 'button') {
        toogle_class = 'btn shadow op_toogle_btn';
    }

    return (
        <>
            <div className={toogle_class} onClick={(e) => {
              hideShowDiv(e)
            }}>{props.title}{show ? <DashCircleFill className="ms-1"/>:<PlusCircleFill className="ms-1"/>}</div>
            {show ? <div className="mt-2">{props.content}</div>:null}
        </>
    )
}


export const ToogleText = (props) => {
    const [show, setShow] = useState(false);

    const threshold = props.limit ? parseInt(props.limit) : 75;
    const whole_text = props.text;

    useEffect(() => {}, [show])

    const hideShowDiv = (e) => {
        if (show) {
            setShow(false);
        }
        else {
            setShow(true);
        }
    }

    let toogle_class = 'op_toogle_text';

    if (whole_text.length <= threshold) {
        return whole_text;
    }
    else {
        const displayed_text = whole_text.slice(0, threshold)
        const hidden_text = whole_text.slice(threshold)
        return (
            <p className='mb-0'>
                <span>{displayed_text}</span>
                {show ? hidden_text: '...'}
                <a className={toogle_class} onClick={(e) => {hideShowDiv(e)}}>
                    {show ? ' [less]':' [more]'}
                </a>
            </p>
        )
    }
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