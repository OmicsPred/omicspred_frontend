
import { common_cols, common_column_groups } from "./common";
import { ancestry_cols } from "./ancestry";

const dataset_name_col = {...common_cols['dataset_name'], field: 'dataset__name'}
const ancestry_training_cols = {...ancestry_cols['ancestry_training'], headerClassName: ['col_border_left']}
// const ancestry_validation_cols = {...ancestry_cols['ancestry_validation'], headerClassName: ['col_border_right']}


// Export Proteomics columns
export const proteomics_columns = {
    'Olink': [
        common_cols['omicspred_id'],
        common_cols['protein_id'],
        common_cols['gene_name'],
        common_cols['protein_name'],
        common_cols['publication'],
        common_cols['platform_version'],
        dataset_name_col,
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
        // common_cols['publication'],
        // common_cols['platform_version'],
        // dataset_name_col,
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

export const proteomics_test_columns = {
    'Olink': [
        common_cols['omicspred_id'],
        common_cols['protein_id'],
        common_cols['gene_name'],
        common_cols['protein_name'],
        common_cols['publication'],
        common_cols['platform_version'],
        dataset_name_col,
        common_cols['variants_number'],
        ancestry_training_cols,
        ancestry_cols['ancestry_validation'],
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
        // common_cols['publication'],
        // common_cols['platform_version'],
        // dataset_name_col,
        common_cols['variants_number'],
        ancestry_training_cols,
        ancestry_cols['ancestry_validation'],
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
        common_column_groups['ancestry']
    ],
    'Somalogic': [
        common_column_groups['ancestry']
    ]
};
// export const proteomics_column_groups = {
//     'Olink-INTERVAL': [
//         {...common_column_groups['INTERVAL'], headerClassName: ['training_col','col_border_left']},
//         common_column_groups['NSPHS'],
//         common_column_groups['ORCADES']
//     ],
//     'Olink-UKB_European': [
//         {...common_column_groups['UKB'], headerClassName: ['training_col','col_border_left']},
//         common_column_groups['UKB_Withheld_ALL'],
//         common_column_groups['UKB_Withheld_AFR'],
//         common_column_groups['UKB_Withheld_AMR'],
//         common_column_groups['UKB_Withheld_EAS'],
//         common_column_groups['UKB_Withheld_EUR'],
//         common_column_groups['UKB_Withheld_SAS'],
//         common_column_groups['INTERVAL']
//     ],
//     'Olink-UKB_Multi-ancestry': [
//         {...common_column_groups['UKB'], headerClassName: ['training_col','col_border_left']},
//         common_column_groups['INTERVAL']
//     ],
//     'Somalogic': [
//         common_column_groups['INTERVAL'],
//         common_column_groups['FENLAND'],
//         common_column_groups['MEC CN'],
//         common_column_groups['MEC IN'],
//         common_column_groups['MEC MA'],
//         common_column_groups['JHS']
//     ]
// };
