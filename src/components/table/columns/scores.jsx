import {common_cols} from "./common";

const gene_name_col = {...common_cols['gene_name'], field: 'genes__name'}
const protein_id_col = {...common_cols['protein_id'], field: 'proteins__external_id'}
const protein_name_col = {...common_cols['protein_name'], field: 'proteins__name'}
const metabolite_name_col = {...common_cols['metabolite_name'], field: 'metabolites__name'}
const platform_type_col = {...common_cols['platform_type'], field: 'platform__platform_master__type'}
const platform_name_col = {...common_cols['platform_name'], field: 'platform__name'}
const publication_col = {...common_cols['publication'], field: 'publication__firstauthor'}

// Export Scores columns
export const scores_columns = [
    common_cols['omicspred_id'],
    gene_name_col,
    protein_id_col,
    protein_name_col,
    metabolite_name_col,
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
        platform_type_col,
        platform_name_col,
        // common_cols['scoring_file']
    ]
}

export const publication_transcriptomics_columns = [
    gene_name_col
]

export const publication_proteomics_columns = [
    gene_name_col,
    protein_id_col,
    protein_name_col
]

export const publication_metabolomics_columns = [
    metabolite_name_col
]