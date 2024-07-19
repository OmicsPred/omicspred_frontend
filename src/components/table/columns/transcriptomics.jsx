import { common_cols, common_column_groups } from "./common";

// const dataset_name_col = {...common_cols['dataset_name'], field: 'dataset__name'}


export const transcriptomics_columns = {
    'Illumina RNAseq': [
        common_cols['omicspred_id'],
        common_cols['gene_id'],
        common_cols['gene_name'],
        // common_cols['publication'],
        // common_cols['platform_version'],
        // dataset_name_col,
        common_cols['variants_number'],
        // Cohorts columns
        // cohort_cols['INTERVAL']['R2'],
        // cohort_cols['INTERVAL']['Rho'],
        // cohort_cols['INTERVAL_withheld_subset']['R2'],
        // cohort_cols['INTERVAL_withheld_subset']['Rho']
    ]
};


export const transcriptomics_column_groups = {
    'Illumina RNAseq': [
        common_column_groups['INTERVAL'],
        common_column_groups['INTERVAL_withheld_subset']
    ]
};