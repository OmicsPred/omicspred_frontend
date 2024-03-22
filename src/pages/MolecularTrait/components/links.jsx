import Href from '../../../components/Href';



const display_omics_link = (data, type, index) => {
    if (data.external_id) {
        return <span key={type+'_'+data.external_id}>{index ? ', ': ''}{data.name ? data.name+' ' : ''}(<Href href={'/'+type+'/'+data.external_id} key={'link'+data.external_id} text={data.external_id}/>)</span>
    }
    else {
        return <span key={type+'_'+data.name}>{index ? ', ': ''}<Href href={'/'+type+'/'+data.name} key={'link'+data.name} text={data.name}/></span>
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

export const display_synonyms = (synonyms) => {
    let syn_lists = []
    if (synonyms) {
        for (let i=0; i<synonyms.length; i++) {
            syn_lists.push(synonyms[i].name);
        }
    }
    return syn_lists.join(', ');
}

export const display_xrefs = (xrefs) => {
    let xref_lists = []
    if (xrefs) {
        for (let i=0; i<xrefs.length; i++) {
            xref_lists.push(xrefs[i].name+' ['+xrefs[i].source+']');
        }
    }
    return xref_lists.join(', ');
}