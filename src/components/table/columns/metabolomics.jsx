import {common_cols, common_column_groups, omicspred_internal_link} from "./common";
// import {common_cols, cohort_cols, common_column_groups, omicspred_internal_link} from "./common";

// Export Metabolomics columns
export const metabolomics_columns = {
    'Metabolon': [
        common_cols['omicspred_id'],
        common_cols['trait_reported_id'],
        common_cols['trait_reported'],
        common_cols['metabolite_id'],
        common_cols['metabolite_name'],
        common_cols['pathway_group'],
        common_cols['pathway_subgroup'],
        common_cols['variants_number'],
        // Cohorts columns
        // cohort_cols['INTERVAL']['R2'],
        // cohort_cols['INTERVAL']['Rho'],
        // cohort_cols['INTERVAL_withheld_subset']['R2'],
        // cohort_cols['INTERVAL_withheld_subset']['Rho'],
        // cohort_cols['ORCADES']['R2'],
        // cohort_cols['ORCADES']['Rho'],
        // cohort_cols['ORCADES']['Missing Rate'],
    ],
    'Nightingale': [
        common_cols['omicspred_id'],
        common_cols['trait_reported'],
        common_cols['metabolite_id'],
        common_cols['metabolite_name'],
        common_cols['pathway_group'],
        common_cols['pathway_subgroup'],
        common_cols['variants_number'],
        // Cohorts columns
        // cohort_cols['INTERVAL']['R2'],
        // cohort_cols['INTERVAL']['Rho'],
        // cohort_cols['UKB']['R2'],
        // cohort_cols['UKB']['Rho'],
        // cohort_cols['ORCADES']['R2'],
        // cohort_cols['ORCADES']['Rho'],
        // cohort_cols['ORCADES']['Missing Rate'],
        // cohort_cols['VIKING']['R2'],
        // cohort_cols['VIKING']['Rho'],
        // cohort_cols['VIKING']['Missing Rate'],
        // cohort_cols['MEC-CN']['R2'],
        // cohort_cols['MEC-CN']['Rho'],
        // cohort_cols['MEC-CN']['Missing Rate'],
        // cohort_cols['MEC-IN']['R2'],
        // cohort_cols['MEC-IN']['Rho'],
        // cohort_cols['MEC-IN']['Missing Rate'],
        // cohort_cols['MEC-MA']['R2'],
        // cohort_cols['MEC-MA']['Rho'],
        // cohort_cols['MEC-MA']['Missing Rate']
    ]
};


export const metabolomics_column_groups = {
    'Metabolon': [
        common_column_groups['reported_trait'],
        common_column_groups['metabolomic_mapped_trait'],
        // common_column_groups['INTERVAL'],
        // common_column_groups['INTERVAL_withheld_subset'],
        // common_column_groups['ORCADES']
    ],
    'Nightingale': [
        common_column_groups['reported_trait'],
        common_column_groups['metabolomic_mapped_trait'],
        // common_column_groups['INTERVAL'],
        // common_column_groups['UKB'],
        // common_column_groups['ORCADES'],
        // common_column_groups['VIKING'],
        // common_column_groups['MEC CN'],
        // common_column_groups['MEC IN'],
        // common_column_groups['MEC MA']
    ]
};