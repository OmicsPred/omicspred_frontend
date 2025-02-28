import { useState, useEffect } from 'react';
import { PlusCircleFill, DashCircleFill, People, InfoCircle, BarChart } from 'react-bootstrap-icons';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


export const consoleDev = function(msg) {
    if (process.env.ENV_TYPE=='dev') {
        console.log(msg);
    }
}

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
    return <span className={class_names} title={thousandifyNumber(number)+" Genetic Score"+add_s_when_plural(number)}><BarChart className='me-1' style={{verticalAlign:'top'}}/>{thousandifyNumberShort(number)}</span>
}


export const participantsBadge = function(number) {
    const participants_number = thousandifyNumber(number);
    return <span className="badge rounded-pill badge-op badge-op-table" title={participants_number+" Participants"}><People className='me-1' style={{verticalAlign:'top'}}/>{participants_number}</span>
}

export const participantsHeader = function(number) {
    const participants_number = thousandifyNumber(number);
    return <span title="Participants"><People className='me-1 op_color_2' style={{verticalAlign:'top'}}/>{participants_number}</span>
}


export const add_s_when_plural = function(number) {
    return number > 1 ? 's':''
}

export const ToogleDiv = (props) => {
    // Toogle element which is the same DOM element as the toogle button
    // (i.e. placed just after the toogle button)
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
            {/* Toogle button */}
            <div className={toogle_class} onClick={(e) => {
              hideShowDiv(e)
            }}>{props.title}{show ? <DashCircleFill className="ms-1"/>:<PlusCircleFill className="ms-1"/>}</div>
            {/* Toogle content */}
            {show ? <div className="d-flex mt-2"><div className={props.class_name ? props.class_name : ''}>{props.content}</div></div>:null}
        </>
    )
}


export const ToogleID = (props) => {
    // Toogle element which is NOT directly under the same DOM element as the toogle button
    const [show, setShow] = useState(false);
    const element_id = props.id;

    useEffect(() => {}, [show])

    const hideShowElement = (e) => {
        // "element" corresponds to the DOM node containing the "Toogle content".
        const element = document.getElementById(element_id);
        if (show) {
            setShow(false);
            if (element) {
                element.classList.replace('d-table-cell','d-none');
            }
        }
        else {
            setShow(true);
            if (element) {
                element.classList.replace('d-none','d-table-cell');
            }
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
            {/* Toogle button */}
            <div className={toogle_class} onClick={(e) => {
              hideShowElement(e)
            }}>{props.title}{show ? <DashCircleFill className="ms-1"/>:<PlusCircleFill className="ms-1"/>}</div>
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
            <p key={displayed_text.replaceAll(/\W+/g,'_')} className='mb-0'>
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


export const TooltipHtml = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} arrow/>
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderRadius: '6px',
        color: '#FFF',
        fontSize: '13px'
    },
}));


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


export const Spinner = (props) => {
    const label = props.label ? props.label : undefined;
    return (
        <div className="spinner-container">
            <div className="spinner-border" role="status">
                {label ? <span className="visually-hidden">{label}</span> : ''}
            </div>
            {label ? <div className='spinner-label ms-3'><span>{label}</span></div>: ''}
        </div>
    )
}


export const loading_data = () => {
    return <Spinner label='Loading data'/>
}


export const Note = (props) => {
    return (
    <div className='note_container'>
        <div><InfoCircle/><span>Note</span></div>
        <div>{props.msg}</div>
    </div>
    )
}



export const Bluesky = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
            <path fill="currentColor" d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565C.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479c.815 2.736 3.713 3.66 6.383 3.364c.136-.02.275-.039.415-.056c-.138.022-.276.04-.415.056c-3.912.58-7.387 2.005-2.83 7.078c5.013 5.19 6.87-1.113 7.823-4.308c.953 3.195 2.05 9.271 7.733 4.308c4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056c2.67.297 5.568-.628 6.383-3.364c.246-.828.624-5.79.624-6.478c0-.69-.139-1.861-.902-2.206c-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8"></path>
        </svg>
    )
}


export const Redirect = ( props ) => {
    const url = props.url
    useEffect(() => {
       window.location.href = url;
    }, [url]);
    return <h5>Redirecting...</h5>;
 };