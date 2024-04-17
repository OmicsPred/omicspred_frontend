import {common_cols} from "./common";

const gene_name_col = Object.create(common_cols['gene_name'])
gene_name_col.field = 'pathway_genes_name'
gene_name_col.sortable = false

const metabolite_id_col = Object.create(common_cols['metabolite_id'])
metabolite_id_col.field = 'pathway_metabolites_external_id'
metabolite_id_col.sortable = false

const metabolite_name_col = Object.create(common_cols['metabolite_name'])
metabolite_name_col.field = 'pathway_metabolites_name'
metabolite_name_col.sortable = false

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