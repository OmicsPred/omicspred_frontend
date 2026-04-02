import { useState, useEffect } from 'react';
import { PlusCircleFill, DashCircleFill, People, InfoCircle, BarChart, PersonArmsUp, ArrowsExpand, ArrowsCollapse, LayersFill, ExclamationDiamond } from 'react-bootstrap-icons';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


const badge_classes = "badge rounded-pill badge-op";

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

export const formatNumberShort = function(number) {
    if (number !== undefined) {
        if (9999 < number && number < 1000000) {
            return ((Math.abs(number)/1000).toFixed(1)) + 'k'
        }
        else if (number >= 1000000) {
            return ((Math.abs(number)/1000000).toFixed(2)) + 'M'
        }
        else {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
    return ''
}

export const numberBadge = function(number,title) {
    const num_val = thousandifyNumber(number)
    const num_val_label = formatNumberShort(number)
    if (title) {
        return <span className={badge_classes} title={num_val+' '+title}>{num_val_label}</span>
    }
    else {
        return <span className={badge_classes} title={num_val}>{num_val_label}</span>
    }
}

export const scoresBadge = function(number,in_table) {
    let class_names = badge_classes;
    if (in_table) {
        class_names += ' badge-op-table';
    }
    return <span className={class_names} title={thousandifyNumber(number)+" Genetic Score"+add_s_when_plural(number)}><BarChart className='me-1' style={{verticalAlign:'top'}}/>{formatNumberShort(number)}</span>
}

export const phenotypesBadge = function(number,in_table) {
    let class_names = badge_classes;
    if (in_table) {
        class_names += ' badge-op-table';
    }
    return <span className={class_names} title={thousandifyNumber(number)+" Phenotype association"+add_s_when_plural(number)}><PersonArmsUp className='me-1' style={{verticalAlign:'top'}}/>{formatNumberShort(number)}</span>
}

export const datasetBadge = function(number,in_table) {
    let class_names = badge_classes;
    if (in_table) {
        class_names += ' badge-op-table';
    }
    return <span className={class_names} title={thousandifyNumber(number)+" dataset"+add_s_when_plural(number)}><LayersFill className='me-1' style={{verticalAlign:'top'}}/>{formatNumberShort(number)}</span>
}

export const participantsBadge = function(number) {
    const participants_number = thousandifyNumber(number);
    return <span className={badge_classes+" badge-op-table"} title={participants_number+" Participants"}><People className='me-1' style={{verticalAlign:'top'}}/>{participants_number}</span>
}

export const participantsHeader = function(number,m_align) {
    const participants_number = thousandifyNumber(number);
    const valign = m_align ? 'middle' : 'top';
    return <span title="Participants"><People className='me-1 op_color_2' style={{verticalAlign: valign}}/>{participants_number}</span>
}


export const add_s_when_plural = function(number) {
    return number > 1 ? 's':''
}


export const firstLetterUc = function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export const sort_case_insensitive = function(array) {
    const sorted_array = array.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    return sorted_array
}

export const ToggleDiv = (props) => {
    // Toggle element which is the same DOM element as the toggle button
    // (i.e. placed just after the toggle button)
    const [show, setShow] = useState(false);

    useEffect(() => {}, [show])

    const hideShowDiv = () => {
        if (show) {
            setShow(false);
        }
        else {
            setShow(true);
        }
    }

    let toggle_class = 'op_toggle';
    if (props.type == 'button') {
        toggle_class = 'btn shadow op_toggle_btn';
    }
    else if (props.type == 'button_blue') {
        toggle_class = 'btn btn-op shadow op_toggle_btn_blue';
    }

    return (
        <>
            {/* Toggle button */}
            <div className={toggle_class} onClick={() => {
              hideShowDiv()
            }}>{props.title}{show ? <DashCircleFill className="ms-1"/>:<PlusCircleFill className="ms-1"/>}</div>
            {/* Toggle content */}
            {show ? <div className="d-flex mt-2"><div className={props.class_name ? props.class_name : ''}>{props.content}</div></div>:null}
        </>
    )
}


export const ToggleID = (props) => {
    // Toggle element which is NOT directly under the same DOM element as the toggle button
    const [show, setShow] = useState(props.open ? true : false);
    const element_id = props.id;
    const target = props.target ? props.target : 'content'

    useEffect(() => {}, [show])

    const hideShowElement = () => {
        // "element" corresponds to the DOM node containing the "Toggle content".
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

    let toggle_class = 'op_toggle';
    if (props.type == 'button') {
        toggle_class = 'btn shadow op_toggle_btn';
    }
    else if (props.type == 'button_blue') {
        toggle_class = 'btn btn-op shadow op_toggle_btn_blue';
    }
    else if (props.type == 'header') {
        toggle_class = 'op_toggle_header';
    }

    return (
        <Tooltip title={show ? "Collapse "+target: "Expand "+target}>
            <div className={toggle_class} onClick={() => {
                hideShowElement()
                }}>{props.title}{show ? <DashCircleFill className="ms-1"/>:<PlusCircleFill className="ms-1"/>}</div>
        </Tooltip>
    )
}


export const ToggleCard = (props) => {
    // Toggle element which is NOT directly under the same DOM element as the toggle button
    const [show, setShow] = useState(props.open ? true : false);
    const element_id = props.id;

    useEffect(() => {}, [show])

    const toggle_class_suffix = ' d-flex justify-content-between ';
    const toggle_class_collapsed = 'card-header-button';
    const toggle_class_expanded = 'card-header-expanded';
    const initial_toggle_class = show ? toggle_class_expanded : toggle_class_collapsed
    const [toggleClass, setToggleClass] = useState(initial_toggle_class + toggle_class_suffix);

    const hideShowElement = () => {
        // "element" corresponds to the DOM node containing the "Toggle content".
        const element = document.getElementById(element_id);
        if (show) {
            setShow(false);
            setToggleClass(toggle_class_collapsed + toggle_class_suffix)
            if (element) {
                element.classList.replace('d-table-cell','d-none');
            }
        }
        else {
            setShow(true);
            setToggleClass(toggle_class_expanded + toggle_class_suffix)
            if (element) {
                element.classList.replace('d-none','d-table-cell');
            }
        }
    }
    return (
        <>
            {/* Toggle button */}
            <div className={toggleClass} onClick={() => {
              hideShowElement()
            }}><div>{props.title}</div><div className="ms-2 mt_minus_1px">{show ? <DashCircleFill />:<PlusCircleFill />}</div></div>
        </>
    )
}


export const ToggleText = (props) => {
    // Reduce/expand paragraph text
    const [show, setShow] = useState(false);

    const threshold = props.limit ? parseInt(props.limit) : 100;
    const whole_text = props.text;

    useEffect(() => {}, [show])

    const hideShowDiv = () => {
        show ? setShow(false) : setShow(true);
    }

    let toggle_class = 'op_toggle_text';

    if (whole_text.length <= threshold) {
        return whole_text;
    }
    else {
        const displayed_text = whole_text.slice(0, threshold)
        const hidden_text = whole_text.slice(threshold)
        return (
            <p key={displayed_text.replaceAll(/\W+/g,'_')} className='mb-0'>
                <span>{displayed_text}</span>
                { show ? hidden_text : '...' }
                <span className={toggle_class} onClick={(e) => {hideShowDiv(e)}}>
                    { show ? ' [less]' : ' [more]' }
                </span>
            </p>
        )
    }
}


export const ExpandCollapse = (props) => {
    const icon_size = "14";
    return (
        <div className='btn-sm btn-op-sm op_toggle_btn shadow' onClick={props.handleExpandClick}>
            { props.data_list.length > 0 ?
                <><ArrowsCollapse size={icon_size}/> Collapse all</> : <><ArrowsExpand size={icon_size}/> Expand all</>
            }
        </div>
    )
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
            else if (props.ttype=='icon') {
                class_name = 'op_tooltip_icon';
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
    let note_class = 'note_container';
    if (props.compact) {
        note_class = 'note_container_compact';
    }
    return (
        <div className={note_class}>
            <div><InfoCircle/><span>Note</span></div>
            <div>{props.msg}</div>
        </div>
    )
}

export const WarningNote = (props) => {
    let note_class = 'note_warning_container';
    return (
        <div className={note_class}>
            <div><ExclamationDiamond/>{props.msg}</div>
        </div>
    )
}


export const Redirect = ( props ) => {
    const url = props.url
    useEffect(() => {
       window.location.href = url;
    }, [url]);
    return <h5>Redirecting...</h5>;
 };