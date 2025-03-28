import { common_cols, common_omics_columns, common_column_groups } from "./common";
import { ancestry_cols } from "./ancestry";


const ancestry_training_cols = {...ancestry_cols['ancestry_training'], headerClassName: ['col_border_left']}

export const transcriptomics_columns = {
    'Illumina RNAseq': [
        common_cols['omicspred_id'],
        common_cols['gene_id'],
        common_cols['gene_name'],
        common_omics_columns['omics_publication'],
        common_omics_columns['omics_platform_version'],
        common_omics_columns['omics_dataset_name'],
        common_cols['variants_number'],
        ancestry_training_cols,
        ancestry_cols['ancestry_validation'],
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
        common_column_groups['INTERVAL_withheld_subset'],
        common_column_groups['ancestry']
    ]
};