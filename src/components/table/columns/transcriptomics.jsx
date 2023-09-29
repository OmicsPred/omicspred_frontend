import {common_cols, cohort_cols, common_column_groups} from "./common";

export const transcriptomics_columns = {
    'Illumina RNAseq': [
        common_cols['omicspred_id'],
        { 
            field: 'ensg_name', 
            headerName: 'Ensembl ID',
            width: 200,
            valueGetter: (params) => {
                let result = '';
                if (params.row.genes) {
                    let gene_ids = [];
                    for (let i=0; i<params.row.genes.length; i++) {
                        gene_ids.push(params.row.genes[i].external_id);
                    }
                    result = gene_ids.join(';');
                }
                return result;
            }
        },
        common_cols['gene_name'],
        common_cols['variants_number'],
        cohort_cols['INTERVAL']['R2'],
        cohort_cols['INTERVAL']['Rho'],
        cohort_cols['INTERVAL_withheld_subset']['R2'],
        cohort_cols['INTERVAL_withheld_subset']['Rho']
    ]
};


export const transcriptomics_column_groups = {
    'Illumina RNAseq': [
        common_column_groups['INTERVAL'],
        common_column_groups['INTERVAL_withheld_subset']
    ]
};