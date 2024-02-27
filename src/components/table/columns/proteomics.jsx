import {common_cols, common_column_groups} from "./common";
// import {common_cols, cohort_cols, common_column_groups} from "./common";

// Export Proteomics columns
export const proteomics_columns = {
    'Olink': [
        common_cols['omicspred_id'],
        common_cols['protein_id'],
        common_cols['gene_name'],
        common_cols['protein_name'],
        common_cols['variants_number']//,
        // Cohorts columns
        // cohort_cols['INTERVAL']['R2'],
        // cohort_cols['INTERVAL']['Rho'],
        // cohort_cols['NSPHS']['R2'],
        // cohort_cols['NSPHS']['Rho'],
        // cohort_cols['NSPHS']['Missing Rate'],
        // cohort_cols['ORCADES']['R2'],
        // cohort_cols['ORCADES']['Rho'],
        // cohort_cols['ORCADES']['Missing Rate'],
    ],
    'Somalogic': [
        common_cols['omicspred_id'],
        common_cols['protein_id'],
        common_cols['gene_name'],
        common_cols['protein_name'],
        common_cols['variants_number']//,
        // Cohorts columns
        // cohort_cols['INTERVAL']['R2'],
        // cohort_cols['INTERVAL']['Rho'],
        // cohort_cols['FENLAND']['R2'],
        // cohort_cols['FENLAND']['Rho'],
        // cohort_cols['FENLAND']['Missing Rate'],
        // cohort_cols['MEC-CN']['R2'],
        // cohort_cols['MEC-CN']['Rho'],
        // cohort_cols['MEC-CN']['Missing Rate'],
        // cohort_cols['MEC-IN']['R2'],
        // cohort_cols['MEC-IN']['Rho'],
        // cohort_cols['MEC-IN']['Missing Rate'],
        // cohort_cols['MEC-MA']['R2'],
        // cohort_cols['MEC-MA']['Rho'],
        // cohort_cols['MEC-MA']['Missing Rate'],
        // cohort_cols['JHS']['R2'],
        // cohort_cols['JHS']['Rho'],
        // cohort_cols['JHS']['Missing Rate']
    ]
};


export const proteomics_column_groups = {
    'Olink': [
        common_column_groups['INTERVAL'],
        common_column_groups['NSPHS'],
        common_column_groups['ORCADES']
    ],
    'Somalogic': [
        common_column_groups['INTERVAL'],
        common_column_groups['FENLAND'],
        common_column_groups['MEC CN'],
        common_column_groups['MEC IN'],
        common_column_groups['MEC MA'],
        common_column_groups['JHS']
    ]
};
