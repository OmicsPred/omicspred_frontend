import { useState, useEffect } from 'react';
import Href from "./Href";
import { PlusCircleFill, DashCircleFill, ChevronRight, SlashLg } from 'react-bootstrap-icons';


export const internal_publication_link = (publication) => {
    let firstauthor = publication.firstauthor;
    let pmid = publication.pmid;
    let journal = publication.journal;
    let year = publication.date_publication.split('-')[0];

    return(
        <Href href={"/publication/"+pmid} text={firstauthor+' et al. '+journal+' ('+year+')'}/>
    )
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


export const browse_title = (type, label) => {
    if (!label) {
        label = type+'s';
    }
    const label_uc = label.charAt(0).toUpperCase() + label.slice(1);
    return <h2 className='page_title'>Browse<SlashLg className={'op_browse_title color_'+type}/><span>{label_uc}</span></h2>
}


export const op_title = (type, data, label, force_use_label) => {
    const type_uc = type.charAt(0).toUpperCase() + type.slice(1);
    let value = label;
    if (!force_use_label) {
        value = (data && data.name) ? data.name : label;
    }
    return <h2 className='page_title'><span className={'bg_'+type}>{type_uc}</span><ChevronRight className={'op_title_separator color_'+type}/><span>{value}</span></h2>
}


export const op_subtitle = (type,label) => {
    if (!label) {
        label = type;
    }
    return <h5><ChevronRight className={'op_subtitle color_'+type}/>Associated {label}(s)</h5>
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
        // document.head.appendChild(script);
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