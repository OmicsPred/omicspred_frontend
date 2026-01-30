
import { common_cols, common_omics_columns, common_column_groups } from "./common";
import { ancestry_cols } from "./ancestry";


const ancestry_training_cols = {...ancestry_cols['ancestry_training'], headerClassName: ['col_border_left']}
const ancestry_validation_cols = {...ancestry_cols['ancestry_validation'], headerClassName: ['col_border_right']}

const default_proteomics_cols = [
    common_cols['omicspred_id'],
    common_cols['score_name'],
    common_cols['protein_id'],
    common_cols['gene_name'],
    common_cols['protein_name'],
    common_omics_columns['omics_publication'],
    common_omics_columns['omics_platform_version'],
    common_cols['dataset_id'],
    common_cols['variants_number'],
    ancestry_training_cols,
    ancestry_cols['ancestry_validation']
]

const default_proteomics_pub_cols = [
    common_cols['omicspred_id'],
    common_cols['score_name'],
    common_cols['protein_id'],
    common_cols['gene_name'],
    common_cols['protein_name'],
    // dataset_name_col,
    common_cols['variants_number'],
    ancestry_training_cols,
    ancestry_validation_cols
]

// Export Proteomics columns
export const proteomics_columns = {
    'Olink': default_proteomics_cols,
    'Somalogic': default_proteomics_cols
};


export const proteomics_pub_columns = {
    'Olink': default_proteomics_pub_cols,
    'Somalogic': default_proteomics_pub_cols
};


// Export Proteomics group columns
export const proteomics_column_groups = {
    'Olink': [
        common_column_groups['molecular_trait_omics'],
        common_column_groups['ancestry']
    ],
    'Somalogic': [
        common_column_groups['molecular_trait_omics'],
        common_column_groups['ancestry']
    ]
};
