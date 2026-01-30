import { common_cols, common_column_groups } from "./common";
import { ancestry_cols } from "./ancestry";
// import {common_cols, cohort_cols, common_column_groups, omicspred_internal_link} from "./common";

const trait_reported_id_col = {...common_cols['trait_reported_id'], headerName: 'ID'}
const trait_reported_col = {...common_cols['trait_reported'], headerName: 'Name'}

const ancestry_training_cols = {...ancestry_cols['ancestry_training'], headerClassName: ['col_border_left']}
const ancestry_validation_cols = {...ancestry_cols['ancestry_validation'], headerClassName: ['col_border_right']}

// Export Metabolomics columns
export const metabolomics_columns = {
    'Metabolon': [
        common_cols['omicspred_id'],
        common_cols['score_name'],
        trait_reported_id_col,
        trait_reported_col,
        common_cols['metabolite_id'],
        common_cols['metabolite_name'],
        // common_cols['pathway_group'],
        // common_cols['pathway_subgroup'],
        // common_omics_columns['omics_publication'],
        // common_omics_columns['omics_platform_version'],
        // common_cols['dataset_id'],,
        common_cols['variants_number'],
        ancestry_training_cols,
        ancestry_validation_cols,
    ],
    'Nightingale': [
        common_cols['omicspred_id'],
        common_cols['score_name'],
        common_cols['trait_reported'],
        common_cols['metabolite_id'],
        common_cols['metabolite_name'],
        // common_cols['pathway_group'],
        // common_cols['pathway_subgroup'],
        // common_omics_columns['omics_publication'],
        // common_omics_columns['omics_platform_version'],
        // common_cols['dataset_id'],
        common_cols['variants_number'],
        ancestry_training_cols,
        ancestry_validation_cols,
    ]
};


export const metabolomics_column_groups = {
    'Metabolon': [
        common_column_groups['reported_trait'],
        common_column_groups['metabolomic_mapped_trait'],
        common_column_groups['pathway'],
        common_column_groups['ancestry']
    ],
    'Nightingale': [
        // common_column_groups['reported_trait'],
        common_column_groups['metabolomic_mapped_trait'],
        common_column_groups['pathway'],
        common_column_groups['ancestry']
    ]
};