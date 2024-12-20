import { useState, useEffect } from 'react';
import { PlusCircleFill, DashCircleFill, People, InfoCircle, BarChart } from 'react-bootstrap-icons';
import Tooltip from '@mui/material/Tooltip';


export const thousandifyNumber = function(number) {
    if (number !== undefined) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return ''
}

export const thousandifyNumberShort = function(number) {
    if (number !== undefined) {
        if (9999 < number && number < 1000000) {
            return ((Math.abs(number)/1000).toFixed(1)) + 'k'
        }
        else {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
    return ''
}

export const numberBadge = function(number,title) {
    const num_val = thousandifyNumber(number)
    const num_val_label = thousandifyNumberShort(number)
    if (title) {
        return <span className="badge rounded-pill badge-op" title={num_val+' '+title}>{num_val_label}</span>
    }
    else {
        return <span className="badge rounded-pill badge-op" title={num_val}>{num_val_label}</span>
    }
}

export const scoresBadge = function(number,in_table) {
    let class_names = "badge rounded-pill badge-op"
    if (in_table) {
        class_names += ' badge-op-table';
    }
    return <span className={class_names} title={thousandifyNumber(number)+" Scores"}><BarChart className='me-1' style={{verticalAlign:'top'}}/>{thousandifyNumberShort(number)}</span>
}


export const participantsBadge = function(number) {
    const participants_number = thousandifyNumber(number);
    return <span className="badge rounded-pill badge-op badge-op-table" title={participants_number+" Participants"}><People className='me-1' style={{verticalAlign:'top'}}/>{participants_number}</span>
}

export const participantsHeader = function(number) {
    const participants_number = thousandifyNumber(number);
    return <span title="Participants"><People className='me-1 op_color_2' style={{verticalAlign:'top'}}/>{participants_number}</span>
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
    else if (props.type == 'button_blue') {
        toogle_class = 'btn btn-op shadow op_toogle_btn_blue';
    }

    return (
        <>
            <div className={toogle_class} onClick={(e) => {
              hideShowDiv(e)
            }}>{props.title}{show ? <DashCircleFill className="ms-1"/>:<PlusCircleFill className="ms-1"/>}</div>
            {show ? <div className="d-flex mt-2"><div className={props.class_name ? props.class_name : ''}>{props.content}</div></div>:null}
        </>
    )
}


export const ToogleText = (props) => {
    const [show, setShow] = useState(false);

    const threshold = props.limit ? parseInt(props.limit) : 100;
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
                <span className={toogle_class} onClick={(e) => {hideShowDiv(e)}}>
                    {show ? ' [less]':' [more]'}
                </span>
            </p>
        )
    }
}


export const TooltipText = (props) => {
    if (props) {
        const title = props.title ? props.title : undefined;
        const text = props.text ? props.text : '';
        let class_name = 'op_tooltip';
        if (props.ttype) {
            if (props.ttype=='link') {
                class_name = 'op_tooltip_2';
            }
        }
        if (title) {
            // Need to be a React Element in the "text" Tooltip element
            return <Tooltip className={class_name} title={title}><span>{text}</span></Tooltip>
        }
        return text;
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


export const loading_data = () => {
    return (
        <div className="spinner-container">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading data</span>
            </div>
            <div className='spinner-label ms-3'><span>Loading data</span></div>
        </div>
    )
}


export const Note = (props) => {
    return (
    <div className='note_container'>
        <div><InfoCircle/><span>Note</span></div>
        <div>{props.msg}</div>
    </div>
    )
}