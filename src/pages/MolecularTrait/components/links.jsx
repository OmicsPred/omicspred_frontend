import { href } from "react-router";
import Href from '../../../components/Href';
import { ToggleDiv, ToggleText } from '../../../components/Generic';
import { element_icon } from '../../../components/Common';
// import { ArrowUpSquareFill } from "react-bootstrap-icons";
import { Tooltip } from "@mui/material";


const display_omics_link = (data, type, index) => {

    const omics_url = href("/:mtype/:id", { mtype: type, id: data.external_id ? data.external_id: data.name});

    if (data.external_id) {
        return <span key={type+'_'+data.external_id}>{index ? ', ': ''}{data.name ? data.name+' ' : ''}(<Href href={omics_url} key={'link'+data.external_id} text={data.external_id}/>)</span>
    }
    else if (type!='protein') {
        return <span key={type+'_'+data.name}>{index ? ', ': ''}<Href href={omics_url} key={'link'+data.name} text={data.name}/></span>
    }
    else {
        return <span key={type+'_'+data.name}>{index ? ', ': ''}{data.name}</span>
    }
}

export const display_source = (source) => {
    return source ? <small className='ms-2'>(Source: {source})</small> : '';
}

export const display_gene_link = (gene, index) => {
    return display_omics_link(gene,'gene',index)
}

export const display_protein_link = (protein, index) => {
    return display_omics_link(protein,'protein',index)
}

export const display_metabolite_link = (metabolite, index) => {
    return display_omics_link(metabolite,'metabolite',index)
}

export const display_pathway_link = (pathway, data_size) => {
    if (data_size > 1) {
        return <li key={pathway.external_id}><small>{display_omics_link(pathway,'pathway')}</small>{is_pathway_top_level(pathway)}</li>
    }
    else {
        return <>{display_omics_link(pathway,'pathway')}{is_pathway_top_level(pathway)}</>
    }
}

const is_pathway_top_level = (pathway) => {
    return <>{pathway.top_level==true? <Tooltip title="Top level pathway in Reactome"><span className="badge bg_pathway ms-2">TOP</span></Tooltip>:''}</>
}

export const display_description = (description_list) => {
    if (description_list.length == 1) {
        return <ToggleText text={description_list[0]} limit='200'/>;
    }
    else {
        return (<ToggleDiv key={'toggle_description'} title={<><span className='font-bold'>{description_list.length}</span> descriptions</>} content={<ul className='mb-2'>{description_list.map((description,index) => <li key={'description_'+index}><ToggleText text={description}/></li>)}</ul>}/>)
    }
}

export const display_proteins = (proteins_list) => {
    let display_list = [];
    for (let i=0; i < proteins_list.length; i++) {
        const protein = proteins_list[i];
        const protein_id = protein.external_id ? protein.external_id : protein.name;
        display_list.push(<span key={'protein_'+protein_id}>{i > 0 ? ', ' : '' }<Href text={protein_id} href={'/protein/'+protein_id}/></span>)
    }
    return display_list;
}

export const display_pathways = (pathways_list) => {
    return (
        <tr key='pathways'><td>{element_icon('pathway')}<span>Pathway{pathways_list.length > 1 && 's'}</span></td><td>
            {
                pathways_list.length > 1 ?
                    <ToggleDiv key={'toggle_pathways'} title={<><span className='font-bold'>{pathways_list.length}</span> associated pathways</>} content={<ul className="ps-3">{pathways_list.map((data) => display_pathway_link(data,pathways_list.length))}</ul>}/>
                    : pathways_list.map((data) => display_pathway_link(data,pathways_list.length))
            }
        </td></tr>
    )
}


/* Format the list of synonyms for the molecular traits */
export const display_synonyms = (synonyms_list) => {
    if (synonyms_list.length == 1) {
        return <ToggleText text={synonyms_list[0]} limit='200'/>;
    }
    else {
        return (<ToggleDiv key={'toggle_synonyms'} title={<><span className='font-bold'>{synonyms_list.length}</span> synonyms</>} content={<ul className='mb-2'>{synonyms_list.map((synonym,index) => <li key={'synonym_'+index}><ToggleText text={synonym}/></li>)}</ul>}/>)
    }
}
// OLD VERSION using the DB structure, i.e.: [{"name": "<mt_alt_name>"","source": "<name_source>""}]
// export const display_synonyms = (synonyms) => {
//     if (synonyms.length == 1) {
//         const synonym = synonyms[0];
//         return (<>{synonym.name}{synonym.source ? ' ['+synonym.source+']':''}</>);
//     }
//     return (<ToggleDiv key={'toggle_synonyms'} title={<><span className='font-bold'>{synonyms.length}</span> synonyms</>} content={<ul className='mb-2'>{synonyms.map((synonym) => <li key={'synonym_'+synonym.name}>{synonym.name}{synonym.source ? <small> [{synonym.source}]</small>:''}</li>)}</ul>}/>)
// }


export const display_xrefs = (xrefs) => {
    if (xrefs.length == 1) {
        const xref = xrefs[0];
        return (<>{xref.name}{xref.source ? ' ['+xref.source+']':''}</>);
    }
    return (<ToggleDiv key={'toggle_xrefs'} title={<><span className='font-bold'>{xrefs.length}</span> external references</>} content={<ul className='mb-2'>{xrefs.map((xref) => <li key={'xref_'+xref.name}>{xref.name}{xref.source ? <small> [{xref.source}]</small>:''}</li>)}</ul>}/>)
}

export const display_superpathways = (superpathways) => {
    if (superpathways.length == 1) {
        const superpathway = superpathways[0];
        return (<>{superpathway.name} (<Href key={superpathway.external_id} href={process.env.URL_REACTOME_ENTRY+superpathway.external_id} text={superpathway.external_id}/>)</>);
    }
    return (<ToggleDiv key={'toggle_superpathwayss'} title={<><span className='font-bold'>{superpathways.length}</span> super pathways</>} content={<ul className='mb-2'>{superpathways.map((superpathway) => <li key={superpathway.name}>{superpathway.name} (<Href key={superpathway.external_id} href={process.env.URL_REACTOME_ENTRY+superpathway.external_id} text={superpathway.external_id}/>)</li>)}</ul>}/>)
}


export const display_phenotype_link = (phenotype, data_size) => {
    let id = phenotype.id;
    id = id.replace('.','_');
    if (data_size > 1) {
        return <li key={phenotype.id}><small><span key={phenotype.id}>{phenotype.name} (<Href href={'/phenotype/'+id} text={phenotype.id} title={phenotype.source+' ID'}/>)</span></small></li>
    }
    else {
        return <span key={phenotype.id}>{phenotype.name} (<Href href={'/phenotype/'+id} text={phenotype.id} title={phenotype.source+' ID'}/>)</span>
    }
}


export const phenotype_data_list = (phenotype_data) => {
    return (phenotype_data.map((data) => display_phenotype_link(data,phenotype_data.length)))
}


export const sort_data = (data) => {
    return data.sort((a, b) => (a.name > b.name) ? 1 : -1)
}