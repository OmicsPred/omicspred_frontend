import { Bezier2, Book, ChevronRight, ClipboardData, BoxFill, Stack, Hexagon, HexagonFill, Lungs, PersonArmsUp, LayersFill, PeopleFill } from 'react-bootstrap-icons';
import { cohort_cols, common_column_groups } from './table/columns/common';
import { ToggleDiv, ToggleText, TooltipText, thousandifyNumber, firstLetterUc } from './Generic';
import DocumentHead from './DocumentHead';
import Href from "./Href";


export const molecular_trait_types = ['Gene','Protein','Metabolite']

export const stages_list = {
    'a': 'Any stage',
    'b': 'Both stages',
    't': 'Training',
    'v': 'Validation'
}

export const internal_publication_link = (publication, show_icon) => {
    const opp_id = publication.id
    const title = publication.title
    const firstauthor = publication.firstauthor;
    const journal = publication.journal;
    const year = publication.date_publication.split('-')[0];
    return(
        <>
            <TooltipText
                title = {title}
                text = {
                    <>
                        { show_icon ? <Book className='me-2 color_hl'/> : ''}
                        <Href href={"/publication/"+opp_id} text={<>{firstauthor} {firstauthor.endsWith('.') ? '' : <i>et al.</i>} {journal} ({year})</>}/>
                    </>
                }
            />  <span>({opp_id})</span>
        </>
    )
}


export const internal_platform_link = (platform, show_icon) => {
    const name = platform.name
    const version = platform.version;
    return(
        <>
            { show_icon ? <Stack className={'me-2 color_'+platform.type}/> : ''}
            <Href href={"/platform/"+name} text={name}/>{version ? <span className='ms-1' title='Platform version'>({version})</span> : ''}<span className='mx-2'>-</span>{omicspred_omics_type(platform.type)}
        </>
    )
}


export const internal_dataset_link = (dataset_id, dataset_name, show_icon) => {
    const link = "/dataset/"+dataset_id;
    if (dataset_name) {
        return (
            <>
                { show_icon ? <LayersFill className={'me-2 color_hl'}/> : ''}
                <Href href={link} text={dataset_name}/> ({dataset_id})
            </>
        )
    }
    else {
        return(
            <>
                { show_icon ? <LayersFill className={'me-2 color_hl'}/> : ''}
                <Href href={link} text={dataset_id}/>
            </>
        )
    }
}


export const internal_tissue_link = (tissue, show_icon) => {
    return (
        <>
            { show_icon ? <Lungs className={'me-2 color_tissue'}/> : ''}
            <Href href={'/tissue/'+tissue.id} text={<TooltipText title={tissue.description} text={tissue.label} ttype='link'/>} /> (<Href href={tissue.url} text={tissue.id}/>)
        </>
    )
}


export const show_test_banner = () => {
    {/* Test page banner */}
    const current_url = window.location.href;
    return (
        <>
            { current_url.includes('/test/') ?
                <div style={{backgroundColor:'salmon',color:'#FFF',padding:'0.25rem 1rem'}}>TEST PAGE</div>
                : ''
            }
        </>
    )
}


export const show_legacy_banner = () => {
    {/* Test page banner */}
    const current_url = window.location.href;
    return (
        <>
            { current_url.includes('/legacy/') ?
                <div style={{backgroundColor:'grey',color:'#FFF',padding:'0.25rem 1rem'}}>LEGACY PAGE</div>
                : ''
            }
        </>
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


export const external_sources = {
    'pgsc_calc': {
        'label': 'pgsc_calc',
        'url': 'https://pgsc-calc.readthedocs.io/en/latest/',
        'desc': 'A reproducible workflow to calculate a genetic score using scoring files published in the Polygenic Score (PGS) Catalog and/or custom scoring files.'
    },
    'pgs_catalog': {
        'label': 'Polygenic Score (PGS) Catalog',
        'url': process.env.URL_PGS_CATALOG,
        'desc': 'An open database of polygenic scores and the relevant metadata required for accurate application and evaluation'
    }
}


export const phewas_mention = () => {
    return 'adjusted P-value < 0.05';
}


export const url_tooltip = (type) => {
    const link_content = external_sources[type];
    return <Href href={link_content['url']} text={<TooltipText title={link_content['desc']} ttype='link' text={link_content['label']} />} />
}


// Main pages (Browse, all Phenotypes and individual Cohort)
export const PageTitle = (props) => {
    const type = props.type;
    const type_label = type.toLowerCase().endsWith('s') ? type : type+'s';
    const category = props.category;
    const label = props.label ? props.label : type_label;
    // const label = props.label ? props.label.toLowerCase() : type.toLowerCase()+'s';
    const count = props.count;

    const label_uc = firstLetterUc(label);

    let color_class = 'color_'+type.toLowerCase();
    let prefix = '';

    if (category == 'Browse') {
        switch(label) {
            case 'datasets':
                prefix = <LayersFill className={'op_title_prefix '+color_class}/>
                break;
            case 'Genetic Scores':
                prefix = <ClipboardData className={'op_title_prefix '+color_class}/>
                break;
            case 'pathways':
                prefix = <Bezier2 className={'op_title_prefix '+color_class}/>
                break;
            case 'platforms':
                prefix = <Stack className={'op_title_prefix '+color_class}/>
                break;
            case 'publications':
                prefix = <Book className={'op_title_prefix '+color_class}/>
                break;
            case 'tissues':
                prefix = <Lungs className={'op_title_prefix '+color_class}/>
                break;
            case 'phenotypes':
                prefix = <PersonArmsUp className={'op_title_prefix '+color_class}/>
                break;
        }
    }
    else if (type == 'phenotype' || type.toLowerCase() == 'phewas') {
        prefix = <PersonArmsUp className={'op_title_prefix '+color_class}/>
    }
    else if (category == 'Cohort') {
        prefix = <PeopleFill className={'op_title_prefix '+color_class}/>
    }

    return (
        <>
            <DocumentHead title={props.title} description={props.desc}/>
            <h2 className='page_title'>
                {prefix}<span>{category}</span>
                <ChevronRight className={'op_title_separator '+color_class}/>
                <span>{label_uc}{count ? <span className="badge rounded-pill badge-op-sm ms-3">{thousandifyNumber(count)}</span>:''}</span>
           </h2>
        </>
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
    return (
        <>
            <DocumentHead title={props.title} description={props.desc}/>
            <h2 className='page_title'>{props.title}</h2>
        </>
    )
}


// All other data page title
export const op_title = (type, data, label, force_use_label, document_title) => {
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
    switch(type) {
         case 'dataset':
            color_class = 'color_hl';
            prefix = <LayersFill className={'op_title_prefix '+color_class}/>
            break;
        case 'score':
            prefix = <ClipboardData className={'op_title_prefix '+color_class}/>
            break;
        case 'pathway':
            prefix = <Bezier2 className={'op_title_prefix '+color_class}/>
            break;
        case 'phenotype':
            prefix = <PersonArmsUp className={'op_title_prefix '+color_class}/>
            break;
        case 'platform':
            color_class = 'color_'+data.type;
            prefix = <Stack className={'op_title_prefix '+color_class}/>
            break;
        case 'publication':
            color_class = 'color_hl';
            prefix = <Book className={'op_title_prefix '+color_class}/>
            break;
        case 'tissue':
            prefix = <Lungs className={'op_title_prefix '+color_class}/>
            break;
    }
    const page_title = document_title ? document_title : type_uc+': '+value;
    return (
        <>
            <DocumentHead title={page_title} standard_desc='1'/>
            <h2 className='page_title'>{prefix}<span>{type_uc}</span><ChevronRight className={'op_title_separator '+color_class}/><span>{value}</span></h2>
        </>
    )
}


export const op_title2 = (type, prefix, label) => {
    return <h2 className='page_title'>{prefix}<ChevronRight className={'op_title_separator color_'+type}/><span>{label}</span></h2>
}


export const op_count_badge = (count, type) => {
    const hl_type = (type) ? type : 'hl';
    return <span className={'badge badge-sq-op-sm ms-2 color_'+hl_type}>{thousandifyNumber(count)}</span>
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
    // console.log("no title: "+no_title);
    return (
        <>
            { no_title ? '' : op_title(type, {"name": name}, name) }
            <div>No {type} entry found for <i>{name}</i> in {process.env.PROJECT_NAME}.</div>
        </>
    );
}


export const HeaderCard = (props) => {
    const content = props.content;
    // Setup card title
    let title = ''
    if (props.type) {
        const type = props.type;
        const type_uc = type.charAt(0).toUpperCase() + type.slice(1);
        title = type_uc+' information'
    }
    else {
        title = props.title;
    }

    return (
        <div className='d-flex'>
            <div className="card_containter flex-lg-row flex-md-row">
                <div className="card op_card mb-3">
                    <div className="card-header"><h5 className="mb-0">{title}</h5></div>
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
            <div className="card_containter flex-lg-row flex-md-row">
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
                { content_right != undefined && content_right != '' ?
                    <>
                        <div className='me-5 d-none d-lg-inline-block d-md-inline-block'></div>
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
        </div>
    )
}


export const TableOfContent = (props) => {
    const items_per_col_threshold = 8;
    const prefix = props.prefix ? props.prefix : ''

    // Setup list of data content
    let items = Object.keys(props.content_headers); // Will be used as "items_right"
    if (props.tosort) {
        items = items.sort()
    }
    let items_left = [...items];
    if (items.length > items_per_col_threshold) {
        const max_per_col = Math.round(items.length/2);
        items_left = items.splice(0,max_per_col);
    }
    else {
        items = null;
    }
    return (
        <div className='d-flex mb-5'>
            <div className="card p-0">
                <div className="card-header"><h6 className="mb-0">{props.title}</h6></div>
                <div className="card-body p-2">
                    <div className='d-flex'>
                        {/* First half */}
                        <ul className='mb-0'>
                            {
                                items_left.map((header_id) => <li key={"item_"+header_id}><Href href={'#'+prefix+header_id} text={props.content_headers[header_id]}/></li>)
                            }
                        </ul>
                        {/* Second half */}
                        { items ?
                            <ul className='mb-0 ms-2'>
                                {
                                    items.map((header_id) => <li key={"item_"+header_id}><Href href={'#'+prefix+header_id} text={props.content_headers[header_id]}/></li>)
                                }
                            </ul> : ''
                        }
                    </div>
                </div>
            </div>
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
    return (
        <span key={'omics_'+type} className={use_alt ? 'badge badge_border_'+type: 'text-nowrap'}>
            <BoxFill className={"align-middle color_"+type}/>
            <span className="align-middle ms-2">{type}</span>
        </span>
    )
}


export const get_cohorts_cols_list = (sample_cohorts, cohorts_list) => {
    for (let j=0; j<sample_cohorts.length; j++) {
        const cohort = sample_cohorts[j]['name_short'].replaceAll(' ','_');
        const cohort_obj = sample_cohorts[j];
        if (cohort_cols[cohort]) {
            // cohorts_list.push(cohort);
            cohorts_list[cohort] = cohort_obj
        }
        else {
            const cohort_col_labels = Object.keys(cohort_cols);
            for (let k=0; k<cohort_col_labels.length; k++) {
                const cohort_col_label = cohort_col_labels[k];
                if (cohort_col_label.toLowerCase() == cohort.toLowerCase()) {
                    cohorts_list[cohort_col_label] = cohort_obj;
                    // cohorts_list.push(cohort_col_label);
                }
                else if (cohort_col_label.startsWith(cohort) && !Object.keys(cohorts_list).includes(cohort_col_label)) {
                    cohorts_list[cohort_col_label] = cohort_obj;
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
    cohort_name = cohort_name.replaceAll('_', ' ');
    const cohort_url = '/cohort/'+cohort.name_short;
    const cohort_desc = cohort.description

    // Text tooltip:
    let cohort_tooltip_text = undefined;
    // Cohort description
    if (cohort_desc) {
        cohort_tooltip_text = cohort_desc;
    }
    // Cohort long name
    else if (cohort.name_short != cohort.name_full) {
        cohort_tooltip_text = cohort.name_full;
    }

    return (
        <>
            {cohort_tooltip_text ?
                <TooltipText
                    ttype='link'
                    title={cohort_tooltip_text}
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
        return <ToggleText text={description_list[0]} limit='200'/>;
    }
    else {
        return (<ToggleDiv key={'toggle_description'} title={<><span className='font-bold'>{description_list.length}</span> descriptions</>} content={<ul className='mb-2'>{description_list.map((description,index) => <li key={'description_'+index}><ToggleText text={description}/></li>)}</ul>}/>)
    }
}


export const display_efo_description = (description) => {
    let descriptions_list = [description]
    if (description.startsWith("[")) {
        let desc = description.replace("['","").replace("']","");
        descriptions_list = desc.split("', '");
    }
    return display_description(descriptions_list);
}


export const element_icon = (type,use_alt) => {
    const icon_classname = 'element_icon color_'+type;
    const omics_icon_classname = 'element_icon color_'+firstLetterUc(type);
    switch(type) {
        case 'score':
            return (<ClipboardData className={icon_classname} />);
        case 'pathway': case 'pathways':
            return (<Bezier2 className={icon_classname} />);
        case 'phenotype': case 'phenotypes':
            return (<PersonArmsUp className={icon_classname} />);
        case 'tissue': case 'tissues':
            return (<Lungs className={icon_classname+' me-1'} />);
        case 'transcriptomics': case 'proteomics': case 'metabolomics':
            return (<BoxFill className={omics_icon_classname} />);
        case 'cohort':
            return (<PeopleFill className='me-2 color_hl' />);
        default:
            if (use_alt) {
                return (<HexagonFill className={icon_classname} />);
            }
            else {
                return (<Hexagon className={icon_classname} />);
            }
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
    'African American or Afro-Caribbean': 'AFR',
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