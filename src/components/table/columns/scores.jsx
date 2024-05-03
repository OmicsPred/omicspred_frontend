import {common_cols} from "./common";


// const metabolite_name_col = {...common_cols['metabolite_name'], field: 'metabolites__name'}

// Export Scores columns
export const scores_columns = [
    common_cols['omicspred_id'],
    common_cols['gene_name'],
    common_cols['protein_id'],
    common_cols['protein_name'],
    common_cols['metabolite_name'],
    common_cols['variants_number'],
    common_cols['platform_type'],
    common_cols['platform_name'],
    common_cols['publication'],
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
    common_cols['publication'],
    common_cols['variants_number'],
    // common_cols['scoring_file']
]

export const score_metabolite_columns = [
    common_cols['omicspred_id'],
    common_cols['trait_reported'],
    // common_cols['platform_type'],
    common_cols['platform_name'],
    common_cols['publication'],
    common_cols['variants_number'],
]