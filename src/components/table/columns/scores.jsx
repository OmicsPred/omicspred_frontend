import { common_cols, molecular_trait_header } from "./common";
import { ancestry_cols } from "./ancestry";

// const metabolite_name_col = {...common_cols['metabolite_name'], field: 'metabolites__name'}
const gene_id_col = {...common_cols['gene_name'], headerClassName: 'col_border_left'}
const protein_id_col = {...common_cols['protein_id'], renderHeader: () => { return (molecular_trait_header('Protein'))}}
const metabolite_id_col = {...common_cols['metabolite_id'], renderHeader: () => { return (molecular_trait_header('Metabolite'))}, headerClassName: 'col_border_right'}
const platform_type_col = {...common_cols['platform_type'],  field: 'dataset__platform__platform_master__type'}
const platform_name_col = {...common_cols['platform_name'],  field: 'dataset__platform__platform_master__name'}
const publication_col = {...common_cols['publication'],  field: 'dataset__publication__firstauthor'}
const tissue_col = {...common_cols['tissue_label'], field: 'dataset__tissue__label'}

// Export Scores columns
const scores_columns_part_1 = [
    common_cols['omicspred_id'],
    common_cols['score_name'],
    gene_id_col,
    protein_id_col,
    metabolite_id_col,
    common_cols['molecular_trait_name'],
    common_cols['variants_number']
]
const scores_columns_part_2 = [
    platform_type_col,
    platform_name_col,
    common_cols['dataset_id'],
    publication_col
]

const ancestry_cols_list = [ancestry_cols['ancestry_training'],ancestry_cols['ancestry_validation']]

export const scores_columns = scores_columns_part_1.concat([tissue_col],scores_columns_part_2);
const scores_columns_copy = [...scores_columns]
export const scores_columns_with_ancestry = scores_columns_copy.concat(ancestry_cols_list);

export const scores_columns_for_tissue = scores_columns_part_1.concat(scores_columns_part_2,ancestry_cols_list);

export const publication_score_columns = {
    'start': [
        common_cols['omicspred_id'],
        common_cols['score_name']
    ],
    'end': [
        common_cols['variants_number'],
        platform_type_col,
        platform_name_col,
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
    common_cols['score_name'],
    platform_type_col,
    platform_name_col,
    tissue_col,
    common_cols['dataset_id'],
    publication_col,
    common_cols['variants_number'],
    ancestry_cols['ancestry_training'],
    ancestry_cols['ancestry_validation']
    // common_cols['scoring_file']
]

export const score_metabolite_columns = [
    common_cols['omicspred_id'],
    common_cols['score_name'],
    common_cols['trait_reported'],
    // common_cols['platform_type'],
    platform_name_col,
    publication_col,
    common_cols['variants_number'],
    ancestry_cols['ancestry_training'],
    ancestry_cols['ancestry_validation']
]