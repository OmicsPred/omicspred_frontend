import Href from "./Href";
import { ChevronRight } from 'react-bootstrap-icons';
import {cohort_cols, common_column_groups} from './table/columns/common';


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


export const page_title = (type, category, label) => {
    if (!label) {
        label = type+'s';
    }
    const label_uc = label.charAt(0).toUpperCase() + label.slice(1);
    return <h2 className='page_title'>{category}<ChevronRight className={'op_title_separator color_'+type}/><span>{label_uc}</span></h2>
}

export const browse_title = (type, label) => {
    return page_title(type, 'Browse', label);
}


export const op_title = (type, data, label, force_use_label) => {
    const type_uc = type.charAt(0).toUpperCase() + type.slice(1);
    let value = label;
    if (!force_use_label) {
        value = (data && data.name) ? data.name : label;
    }
    return <h2 className='page_title'><span className={'bg_'+type}>{type_uc}</span><ChevronRight className={'op_title_separator color_'+type}/><span>{value}</span></h2>
}


export const op_title2 = (type, prefix, label) => {
    return <h2 className='page_title'>{prefix}<ChevronRight className={'op_title_separator color_'+type}/><span>{label}</span></h2>
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

export const publication_ref = (publication,display_year) => {
    let year = undefined;
    if (display_year && publication.date_publication) {
        year = publication.date_publication.split('-')[0]
    }
    return <span>{publication.firstauthor} <i>et al.</i> {publication.journal} {year ? <small>({year})</small> : ''}</span>
}

export const omicspred_omics_type = (type) => {
    return (
        <span className={"border_left_mark border_color_"+type}>{type}</span>
    )
}


export const get_cohorts_cols_list = (sample_cohorts, cohorts_list) => {
    for (let j=0; j<sample_cohorts.length; j++) {
        const cohort = sample_cohorts[j]['name_short'].replaceAll(' ','_');
        if (cohort_cols[cohort]) {
            cohorts_list.push(cohort);
        }
        else {
            const cohort_col_labels = Object.keys(cohort_cols);
            for (let k=0; k<cohort_col_labels.length; k++) {
                const cohort_col_label = cohort_col_labels[k];
                if (cohort_col_label.toLowerCase() == cohort.toLowerCase()) {
                    cohorts_list.push(cohort_col_label);
                }
                else if (cohort_col_label.startsWith(cohort) && !cohorts_list.includes(cohort_col_label)) {
                    cohorts_list.push(cohort_col_label);
                }
            }
        }
    }
    return cohorts_list;
}


export const get_cohorts_col_groups_list = (sample_cohorts, cohorts_list) => {
    for (let j=0; j<sample_cohorts.length; j++) {
        const cohort = sample_cohorts[j]['name_short'].replaceAll(' ','_');
        if (common_column_groups[cohort] && !cohorts_list.includes(cohort)) {
            cohorts_list.push(cohort);
        }
        else {;
            const cohort_col_group_labels = Object.keys(common_column_groups);
            for (let k=0; k < cohort_col_group_labels.length; k++) {
                const cohort_col_grp_label = cohort_col_group_labels[k];
                if (cohort_col_grp_label.toLowerCase() == cohort.toLowerCase()) {
                    cohorts_list.push(cohort_col_grp_label);
                }
                else if (cohort_col_grp_label.startsWith(cohort) && !cohorts_list.includes(cohort_col_grp_label)) {
                    cohorts_list.push(cohort_col_grp_label);
                }
            }
        }
    }
    return cohorts_list;
}