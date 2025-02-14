import { common_cols, molecular_trait_header } from "./common";
import { ancestry_cols } from "./ancestry";

// const metabolite_name_col = {...common_cols['metabolite_name'], field: 'metabolites__name'}
const gene_id_col = {...common_cols['gene_name'], headerClassName: 'col_border_left'}
const protein_id_col = {...common_cols['protein_id'], renderHeader: (params) => { return (molecular_trait_header('Protein'))}}
const metabolite_id_col = {...common_cols['metabolite_id'], renderHeader: (params) => { return (molecular_trait_header('Metabolite'))}, headerClassName: 'col_border_right'}
const platform_type_col = {...common_cols['platform_type'],  field: 'dataset__platform__platform_master__type'}
const platform_name_col = {...common_cols['platform_name'],  field: 'dataset__platform__platform_master__name'}
const publication_col = {...common_cols['publication'],  field: 'dataset__publication__firstauthor'}


// Export Scores columns
export const scores_columns = [
    common_cols['omicspred_id'],
    gene_id_col,
    protein_id_col,
    metabolite_id_col,
    common_cols['molecular_trait_name'],
    common_cols['variants_number'],
    platform_type_col,
    platform_name_col,
    publication_col,
    // common_cols['scoring_file']
]

export const publication_score_columns = {
    'start': [
        common_cols['omicspred_id']
    ],
    'end': [
        common_cols['variants_number'],
        common_cols['platform_type'],
        common_cols['platform_name'],
        // common_cols['scoring_file']
    ]
}

export const publication_transcriptomics_columns = [
    common_cols['gene_name']
]

export const publication_proteomics_columns = [
    common_cols['gene_name'],
    common_cols['protein_id'],
    common_cols['protein_name']
]

export const publication_metabolomics_columns = [
    common_cols['metabolite_name']
]

export const score_molecular_trait_columns = [
    common_cols['omicspred_id'],
    common_cols['platform_type'],
    common_cols['platform_name'],
    common_cols['dataset_name'],
    common_cols['publication'],
    common_cols['variants_number'],
    ancestry_cols['ancestry_training'],
    ancestry_cols['ancestry_validation']
    // common_cols['scoring_file']
]

export const score_metabolite_columns = [
    common_cols['omicspred_id'],
    common_cols['trait_reported'],
    // common_cols['platform_type'],
    common_cols['platform_name'],
    common_cols['publication'],
    common_cols['variants_number'],
    ancestry_cols['ancestry_training'],
    ancestry_cols['ancestry_validation']
]