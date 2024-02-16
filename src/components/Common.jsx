import { useState, useEffect } from 'react';
import Href from "./Href";
import {PlusCircleFill, DashCircleFill} from 'react-bootstrap-icons';


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