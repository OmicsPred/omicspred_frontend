import {common_cols} from "./common";

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
    common_cols['scoring_file']
]

export const publication_score_columns_start = [
    common_cols['omicspred_id'],
    // common_cols['gene_name'],
    // common_cols['protein_id'],
    // common_cols['protein_name'],
    // common_cols['metabolite_name'],
    // common_cols['variants_number'],
    // common_cols['platform_type'],
    // common_cols['platform_name'],
    // common_cols['scoring_file']
]

export const publication_score_columns_end = [
    common_cols['variants_number'],
    common_cols['platform_type'],
    common_cols['platform_name'],
    common_cols['scoring_file']
]

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