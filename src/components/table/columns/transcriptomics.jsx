import { common_cols, common_omics_columns, common_column_groups } from "./common";
import { ancestry_cols } from "./ancestry";


const ancestry_training_cols = {...ancestry_cols['ancestry_training'], headerClassName: ['col_border_left']}
// const tissue_col = {...common_cols['tissue_label'], field: 'dataset__tissue__label'}

const default_transcriptomics_cols = [
         common_cols['omicspred_id'],
        common_cols['score_name'],
        common_cols['gene_name'],
        common_cols['gene_id'],
        common_cols['tissue_label'],
        common_omics_columns['omics_publication'],
        common_omics_columns['omics_platform_version'],
        common_cols['dataset_id'],
        common_cols['variants_number'],
        ancestry_training_cols,
        ancestry_cols['ancestry_validation']
]

const default_transcriptomics_dataset_cols = [
    common_cols['omicspred_id'],
    common_cols['score_name'],
    common_cols['gene_name'],
    common_cols['gene_id'],
    common_cols['variants_number'],
    ancestry_training_cols,
    ancestry_cols['ancestry_validation']
]


export const transcriptomics_columns = {
    'RNAseq - Expression': default_transcriptomics_cols,
    'RNAseq - Splicing': default_transcriptomics_cols
};

export const transcriptomics_dataset_columns = {
    'RNAseq - Expression': default_transcriptomics_dataset_cols,
    'RNAseq - Splicing': default_transcriptomics_dataset_cols
};


export const transcriptomics_column_groups = {
    'RNAseq - Expression': [
        common_column_groups['molecular_trait_omics'],
        common_column_groups['INTERVAL'],
        common_column_groups['INTERVAL_withheld_subset'],
        common_column_groups['ancestry']
    ],
    'RNAseq - Splicing': [
        common_column_groups['molecular_trait_omics'],
        common_column_groups['INTERVAL'],
        common_column_groups['INTERVAL_withheld_subset'],
        common_column_groups['ancestry']
    ]
};