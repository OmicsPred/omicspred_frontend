import Href from "./Href";
import { Bezier2, Book, ChevronRight, ClipboardDataFill, People, BoxFill, Stack, Hexagon, HexagonFill } from 'react-bootstrap-icons';
import { cohort_cols, common_column_groups } from './table/columns/common';
import { ToogleDiv, ToogleText, TooltipText, thousandifyNumber } from './Generic';
import DocumentTitle from './DocumentTitle';


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


export const PageTitle = (props) => {
    const type = props.type;
    const category = props.category;
    const label = props.label ? props.label : type+'s';
    const count = props.count;

    if (props.title) {
        DocumentTitle(props.title);
    }

    const label_uc = label.charAt(0).toUpperCase() + label.slice(1);

    let color_class = 'color_'+type;
    let prefix = '';

    if (category == 'Browse') {
        if (label == 'scores' || type == 'score') {
            // prefix = <Clipboard2Data size="26px" className={'me-3 '+color_class}/>
            prefix = <ClipboardDataFill className={'op_title_prefix '+color_class}/>
        }
        else if (label == 'pathways') {
            prefix = <Bezier2 className={'op_title_prefix '+color_class}/>
        }
        else if (label == 'platforms') {
            prefix = <Stack className={'op_title_prefix '+color_class}/>
        }
        else if (label == 'publications') {
            prefix = <Book className={'op_title_prefix '+color_class}/>
        }
    }
    else if (category == 'Cohort') {
        prefix = <People className={'op_title_prefix '+color_class}/>
    }
    return (
        <h2 className='page_title'>
            {prefix}<span>{category}</span>
            <ChevronRight className={'op_title_separator '+color_class}/>
            <span>{label_uc}{count ? <span className="badge rounded-pill badge-op-sm ms-3">{thousandifyNumber(count)}</span>:''}</span>
        </h2>
    )
}

export const BrowseTitle = (props) => {
    const type = props.type;
    const label = props.label;
    const count = props.count;
    const title = props.title;

    return <PageTitle type={type} category='Browse' label={label} count={count} title={title}/>;
}


export const PageTitleSimple = (props) => {
    DocumentTitle(props.title);
    return <h2 className='page_title'>{props.title}</h2>
}


export const op_title = (type, data, label, force_use_label) => {

    // const type_uc = (type == 'phecode') ? 'PheWAS' : type.charAt(0).toUpperCase() + type.slice(1);
    let type_uc = '';
    switch(type) {
        case 'phecode':
            type_uc = 'PheWAS';
            break;
        case 'score':
            type_uc = 'Genetic Score';
            break;
        default:
            type_uc = type.charAt(0).toUpperCase() + type.slice(1);
            break;
    }

    let value = label;
    let color_class = 'color_'+type;
    let prefix = <Hexagon className={'op_title_prefix '+color_class}/>
    if (!force_use_label) {
        value = (data && data.name) ? data.name : label;
    }
    if (type == 'score') {
        prefix = <ClipboardDataFill className={'op_title_prefix '+color_class}/>
    }
    else if (type == 'pathway') {
        prefix = <Bezier2 className={'op_title_prefix '+color_class}/>
    }
    else if (type == 'platform') {
        color_class = 'color_'+data.type;
        prefix = <Stack className={'op_title_prefix '+color_class}/>
    }
    else if (type == 'publication') {
        color_class = 'color_hl';
        prefix = <Book className={'op_title_prefix '+color_class}/>
    }
    return <h2 className='page_title'>{prefix}<span>{type_uc}</span><ChevronRight className={'op_title_separator '+color_class}/><span>{value}</span></h2>
}


export const op_title2 = (type, prefix, label) => {
    return <h2 className='page_title'>{prefix}<ChevronRight className={'op_title_separator color_'+type}/><span>{label}</span></h2>
}


export const op_count_badge = (count, type) => {
    const hl_type = (type) ? type : 'hl';
    return <span className={'badge badge-sq-op-sm ms-2 color_'+hl_type}>{count}</span>
}


export const op_subtitle = (type,label,count) => {
    if (!label) {
        label = type;
    }
    let suffix = ''
    if (count) {
        if (count > 1) {
            suffix += 's'
        }
    }
    else {
        suffix += '(s)'
    }
    return <h4>Linked {label}{suffix}{count ? op_count_badge(count,type) : ''}</h4>
}


export const op_subtitle_no_asso = (type,label,count) => {
    if (!label) {
        label = type;
    }
    // Element ID
    let elem_id = type+"_section";
    if (typeof(label) == 'string') {
        elem_id = label.replace(/\W+/g, '_').toLowerCase();
    }
    return <h4 id={elem_id}>{label}{count ? op_count_badge(count,type) : ''}</h4>
}


export const no_entry_found = (type, name, no_title) => {
    console.log("no title: "+no_title);
    return (
        <>
            { no_title ? '' : op_title(type, {"name": name}, name) }
            <div>No {type} entry found for <i>{name}</i> in {process.env.PROJECT_NAME}.</div>
        </>
    );
}


// export const display_information = (type, content) => {

export const HeaderCard = (props) => {
    const type = props.type;
    const content = props.content;
    const type_uc = type.charAt(0).toUpperCase() + type.slice(1)
    return (
        <div className='d-flex'>
            <div className="card-deck d-flex justify-content-center flex-md-row flex-sm-column">
                <div className="card op_card mb-3">
                    <div className="card-header"><h5 className="mb-0">{type_uc} information</h5></div>
                    <div className="card-body">
                        <div className="card-text">
                            <table className='table_card table_card_col_centered'>
                                <tbody>
                                    {content}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const Header2Cards = (props) => {
    const type_left = props.type_left;
    const content_left = props.content_left;
    const type_right = props.type_right ? props.type_right : 'Linked annotations';
    const content_right = props.content_right;

    const type_left_uc = type_left.charAt(0).toUpperCase() + type_left.slice(1);
    let type_right_uc = '';
    if (type_right && type_right != '') {
        type_right_uc = type_right.charAt(0).toUpperCase() + type_right.slice(1);
    }
    return (
        <div className='op_card_row'>
            <div className="card-deck d-flex">
                <div className="card op_card_left mb-3">
                    <div className="card-header"><h5 className="mb-0">{type_left_uc} information</h5></div>
                    <div className="card-body">
                        <div className="card-text">
                            <table className='table_card table_card_col_centered'>
                                <tbody>
                                    {content_left}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            { content_right != undefined && content_right != '' ?
                <>
                    <div className='me-5 d-none d-lg-inline-block'></div>
                    <div className="card op_card_right mb-3">
                        <div className="card-header"><h5 className="mb-0">{type_right_uc}</h5></div>
                        <div className="card-body">
                            <div className="card-text">
                                <table className='table_card'>
                                    <tbody>{content_right}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </> : ''
            }
        </div>
    )
}


export const publication_ref = (publication,display_year) => {
    let year = undefined;
    if (display_year && publication.date_publication) {
        year = publication.date_publication.split('-')[0]
    }
    return <span>{publication.firstauthor} <i>et al.</i> {publication.journal} {year ? <small>({year})</small> : ''}</span>
}


export const omicspred_omics_type = (type,use_alt) => {
    if (use_alt) {
        return (
            <span key={'omics_'+type} className={'badge badge_border_'+type}>
                <BoxFill className={"align-middle color_"+type}/>
                <span className="align-middle ms-2">{type}</span>
            </span>
        )

    }
    else {
        return (
            <span className="text-nowrap">
                <BoxFill className={"align-middle color_"+type}/>
                <span className="align-middle ms-2">{type}</span>
            </span>
        )
    }
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


/* Display cohort as a link to the internal URL and with the description in tooltip */
export const display_cohort = (cohort, cohort_name) => {
    if (!cohort_name) {
        cohort_name = cohort.name_short
    }
    // const cohort_name = cohort.name_short
    const cohort_url = '/cohort/'+cohort_name;
    const cohort_desc = cohort.description
    return (
        <>
            {cohort_desc ?
                <TooltipText
                    ttype='link'
                    title={cohort_desc}
                    text={<Href key={cohort_name+'_link'} href={cohort_url} text={cohort_name}/>}
                />
                : <Href key={cohort_name+'_link'} href={cohort_url} text={cohort_name}/>
            }
        </>
    )
}

/* Format the list of descriptions for the molecular traits */
export const display_description = (description_list) => {
    if (description_list.length == 1) {
        return <ToogleText text={description_list[0]} limit='200'/>;
    }
    else {
        return (<ToogleDiv key={'toggle_description'} title={<><span className='font-bold'>{description_list.length}</span> descriptions</>} content={<ul className='mb-2'>{description_list.map((description,index) => <li key={'description_'+index}><ToogleText text={description}/></li>)}</ul>}/>)
    }
}


export const element_icon = (type,use_alt) => {
    if (use_alt) {
        return (<HexagonFill className={'color_'+type+' element_icon'} />);
    }
    else {
        return (<Hexagon className={'color_'+type+' element_icon'} />);
    }
}


export const ancestry_labels = () => {
    return {
        // 'MAE': 'Multi-ancestry (including European)',
        // 'MAO': 'Multi-ancestry (excluding European)',
        'AFR': 'African',
        'EAS': 'East Asian',
        'SAS': 'South Asian',
        'ASN': 'Additional Asian Ancestries',
        'EUR': 'European',
        'GME': 'Greater Middle Eastern',
        'AMR': 'Hispanic or Latin American',
        'OTH': 'Additional Diverse Ancestries',
        'NR' : 'Not Reported',
        'MAO': 'Multi-ancestry'
    }
};

export const ancestry_names = {
    // 'Multi-ancestry (including European)': 'MAE',
    // 'Multi-ancestry (excluding European)': 'MAO',
    'African': 'AFR',
    'African American': 'AFR',
    'East Asian': 'EAS',
    'South Asian': 'SAS',
    'Additional Asian Ancestries': 'ASN',
    'European': 'EUR',
    'Greater Middle Eastern': 'GME',
    'Hispanic or Latin American': 'AMR',
    'Ad Mixed American': 'AMR', // Not sure
    'Additional Diverse Ancestries': 'OTH',
    'Not Reported': 'NR',
    'Multi-ancestry': 'MAO'
};

export const get_ancestry_name = (anc_name) => {

    if (ancestry_names[anc_name]) {
        return ancestry_names[anc_name];
    }
    else {
        if (anc_name.includes(',')) {
            return 'MAO';
        }
        else {
            return anc_name;
        }
    }
}

export const ancestry_label = (anc) => {
    const ancestry_labels_data = ancestry_labels()
    if (ancestry_labels_data[anc]) {
        return ancestry_labels_data[anc];
    }
    else {
        return anc;
    }
}

export const display_ancestry = (ancestry) => {
    const ancestry_label = get_ancestry_name(ancestry);
    return <><span className={'me-2 align-middle anc_label anc_'+ancestry_label} title={ ancestry_label == 'MAO' &&  ancestry != 'Multi-ancestry' ? 'Multi-ancestry': ancestry} style={{lineHeight:"16px",marginBottom:"1px"}}></span><span className='align-middle'>{ancestry}</span></>
}