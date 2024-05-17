import Href from '../../../components/Href';
import { ToogleDiv, ToogleText } from '../../../components/Generic';


const display_omics_link = (data, type, index) => {
    if (data.external_id) {
        return <span key={type+'_'+data.external_id}>{index ? ', ': ''}{data.name ? data.name+' ' : ''}(<Href href={'/'+type+'/'+data.external_id} key={'link'+data.external_id} text={data.external_id}/>)</span>
    }
    else if (type!='protein') {
        return <span key={type+'_'+data.name}>{index ? ', ': ''}<Href href={'/'+type+'/'+data.name} key={'link'+data.name} text={data.name}/></span>
    }
    else {
        return <span key={type+'_'+data.name}>{index ? ', ': ''}{data.name}</span>
    }
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

export const display_pathway_link = (pathway, index, is_multiple) => {
    if (is_multiple) {
        return <li key={pathway.external_id}><small>{display_omics_link(pathway,'pathway')}</small></li>
    }
    else {
        return display_omics_link(pathway,'pathway',index)
    }
}

export const display_description = (description_list) => {
    if (description_list.length == 1) {
        return <ToogleText text={description_list[0]} limit='200'/>;
    }
    else {
        return (<ToogleDiv key={'toggle_description'} title={<><span className='font-bold'>{description_list.length}</span> descriptions</>} content={<ul className='mb-2'>{description_list.map((description,index) => <li key={'description_'+index}><ToogleText text={description}/></li>)}</ul>}/>)
    }
}

export const display_synonyms = (synonyms) => {
    if (synonyms.length == 1) {
        const synonym = synonyms[0];
        return (<>{synonym.name}{synonym.source ? ' ['+synonym.source+']':''}</>);
    }
    return (<ToogleDiv key={'toggle_synonyms'} title={<><span className='font-bold'>{synonyms.length}</span> synonyms</>} content={<ul className='mb-2'>{synonyms.map((synonym) => <li key={'synonym_'+synonym.name}>{synonym.name}{synonym.source ? <small> [{synonym.source}]</small>:''}</li>)}</ul>}/>)
}

export const display_xrefs = (xrefs) => {
    if (xrefs.length == 1) {
        const xref = xrefs[0];
        return (<>{xref.name}{xref.source ? ' ['+xref.source+']':''}</>);
    }
    return (<ToogleDiv key={'toggle_xrefs'} title={<><span className='font-bold'>{xrefs.length}</span> external references</>} content={<ul className='mb-2'>{xrefs.map((xref) => <li key={'xref_'+xref.name}>{xref.name}{xref.source ? <small> [{xref.source}]</small>:''}</li>)}</ul>}/>)
}

export const display_superpathways = (superpathways) => {
    if (superpathways.length == 1) {
        const superpathway = superpathways[0];
        return (<>{superpathway.name} (<Href key={superpathway.external_id} href={process.env.URL_REACTOME_ENTRY+superpathway.external_id} text={superpathway.external_id}/>)</>);
    }
    return (<ToogleDiv key={'toggle_superpathwayss'} title={<><span className='font-bold'>{superpathways.length}</span> super pathways</>} content={<ul className='mb-2'>{superpathways.map((superpathway) => <li key={superpathway.name}>{superpathway.name} (<Href key={superpathway.external_id} href={process.env.URL_REACTOME_ENTRY+superpathway.external_id} text={superpathway.external_id}/>)</li>)}</ul>}/>)
}