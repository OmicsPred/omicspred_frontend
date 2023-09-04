import {cohort_valueGetter, commons_cols} from "./common";

export const transcriptomics_columns = {
    'Illumina RNAseq': [
        commons_cols['omicspred_id'],
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
        { 
            field: 'gene_name', 
            headerName: 'Gene',
            width: 150,
            valueGetter: (params) => {
                let result = '';
                if (params.row.genes) {
                    let gene_names = [];
                    for (let i=0; i<params.row.genes.length; i++) {
                        gene_names.push(params.row.genes[i].name);
                    }
                    result = gene_names.join(';');
                }
                return result;
            }
        },
        commons_cols['variants_number'],
        commons_cols['interval_r2'],
        commons_cols['interval_rho'],
        { 
            field: 'INTERVAL withheld subset_R2', 
            headerName: 'INTERVAL withheld subset R2',
            // width: 300,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'INTERVAL withheld subset','R2');
            }
        },
        { 
            field: 'INTERVAL withheld subset_Rho', 
            headerName: 'INTERVAL withheld subset Rho',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'INTERVAL withheld subset','Rho');
            }
        },
    ]
}