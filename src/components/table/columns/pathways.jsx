import {common_cols} from "./common";


const gene_name_col = {...common_cols['gene_name'], field: 'pathway_genes_name', sortable: false}
const metabolite_id_col = {...common_cols['metabolite_id'], field: 'pathway_metabolites_external_id', sortable: false}
const metabolite_name_col = {...common_cols['metabolite_name'], field: 'pathway_metabolites_name', sortable: false}

// Export Scores columns
export const pathways_columns = [
    common_cols['pathway_name'],
    common_cols['pathway_id'],
    common_cols['superpathway_name'],
    // common_cols['gene_name'],
    gene_name_col,
    // common_cols['metabolite_id'],
    metabolite_id_col,
    // common_cols['metabolite_name']
    metabolite_name_col
]


export const pathway_molecular_trait_columns = [
    common_cols['pathway_id'],
    common_cols['pathway_name'],
    common_cols['superpathway_name'],
    common_cols['pathway_id_source']
]