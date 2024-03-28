import { useState, useEffect } from 'react';
import Href from "./Href";
import { ChevronRight, SlashLg } from 'react-bootstrap-icons';


export const internal_publication_link = (publication) => {
    let firstauthor = publication.firstauthor;
    let pmid = publication.pmid;
    let journal = publication.journal;
    let year = publication.date_publication.split('-')[0];

    return(
        <Href href={"/publication/"+pmid} text={firstauthor+' et al. '+journal+' ('+year+')'}/>
    )
}


export const get_data_type = (omics_type) => {
    switch(omics_type) {
        case 'Metabolomics':
            return 'metabolite';
        case 'Proteomics':
            return 'protein';
        case 'Transcriptomics':
            return 'transcript';
        default:
            return 'hl';
    }
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

export const op_subtitle_no_asso = (type,label) => {
    if (!label) {
        label = type;
    }
    return <h5><ChevronRight className={'op_subtitle color_'+type}/>{label}</h5>
}