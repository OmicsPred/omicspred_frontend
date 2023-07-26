import {cohort_valueGetter, commons_cols, omicspred_internal_link} from "./common";

// Export Proteomics columns
export const proteomics_columns = {
    'Olink': [
        commons_cols['omicspred_id'],
        { 
            field: 'uniprot_id', 
            headerName: 'UniProt ID',
            width: 150,
            renderCell: (params) => {
                let pr_ids = [];
                if (params.row.proteins) {
                    for (let i=0; i<params.row.proteins.length; i++) {
                        pr_ids.push(params.row.proteins[i].external_id);
                    }
                }
                return pr_ids.map((pr_id) => omicspred_internal_link(pr_id,'Protein'));
            }
        },
        { 
            field: 'gene_name', 
            headerName: 'Gene',
            width: 150,
            renderCell: (params) => {
                let gene_names = [];
                if (params.row.genes) {
                    for (let i=0; i<params.row.genes.length; i++) {
                        gene_names.push(params.row.genes[i].name);
                    }
                }
                return gene_names.map((gene_name) => omicspred_internal_link(gene_name,'Gene'));
            }
        },
        { 
            field: 'protein_name', 
            headerName: 'Protein',
            width: 300,
            valueGetter: (params) => {
                let result = '';
                if (params.row.proteins) {
                    let pr_names = [];
                    for (let i=0; i<params.row.proteins.length; i++) {
                        pr_names.push(params.row.proteins[i].name);
                    }
                    result = pr_names.join(';');
                }
                return result;
            }
        },
        commons_cols['variants_number'],
        commons_cols['interval_r2'],
        commons_cols['interval_rho'],
        { 
            field: 'NSPHS_R2', 
            headerName: 'NSPHS R2',
            // width: 300,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'NSPHS','R2');
            }
        },
        { 
            field: 'NSPHS_Rho', 
            headerName: 'NSPHS Rho',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'NSPHS','Rho');
            }
        },
        { 
            field: 'NSPHS_Missing Rate', 
            headerName: 'NSPHS Missing Rate',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'NSPHS','Missing Rate');
            }
        },
        { 
            field: 'ORCADES_R2', 
            headerName: 'ORCADES R2',
            // width: 300,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'ORCADES','R2');
            }
        },
        { 
            field: 'ORCADES_Rho', 
            headerName: 'ORCADES Rho',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'ORCADES','Rho');
            }
        },
        { 
            field: 'ORCADES_Missing Rate', 
            headerName: 'ORCADES Missing Rate',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'ORCADES','Missing Rate');
            }
        }
    ],
    'Somalogic': [
        commons_cols['omicspred_id'],
        { 
            field: 'uniprot_id', 
            headerName: 'UniProt ID',
            width: 300,
            valueGetter: (params) => {
                let result = '';
                if (params.row.proteins) {
                    let pr_ids = [];
                    for (let i=0; i<params.row.proteins.length; i++) {
                        pr_ids.push(params.row.proteins[i].external_id);
                    }
                    result = pr_ids.join(';');
                }
                return result;
            }
        },
        { 
            field: 'gene_name', 
            headerName: 'Gene',
            width: 300,
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
        { 
            field: 'protein_name', 
            headerName: 'Protein',
            width: 300,
            valueGetter: (params) => {
                let result = '';
                if (params.row.proteins) {
                    let pr_names = [];
                    for (let i=0; i<params.row.proteins.length; i++) {
                        pr_names.push(params.row.proteins[i].name);
                    }
                    result = pr_names.join(';');
                }
                return result;
            }
        },
        commons_cols['variants_number'],
        commons_cols['interval_r2'],
        commons_cols['interval_rho'],
        { 
            field: 'FENLAND_R2', 
            headerName: 'FENLAND R2',
            // width: 300,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'FENLAND','R2');
            }
        },
        { 
            field: 'FENLAND_Rho', 
            headerName: 'FENLAND Rho',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'FENLAND','Rho');
            }
        },
        { 
            field: 'FENLAND_Missing Rate', 
            headerName: 'FENLAND Missing Rate',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'FENLAND','Missing Rate');
            }
        },
        { 
            field: 'MEC-CN_R2', 
            headerName: 'MEC-CN R2',
            // width: 300,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-CN','R2');
            }
        },
        { 
            field: 'MEC-CN_Rho', 
            headerName: 'MEC-CN Rho',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-CN','Rho');
            }
        },
        { 
            field: 'MEC-CN_Missing Rate', 
            headerName: 'MEC-CN Missing Rate',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-CN','Missing Rate');
            }
        },
        { 
            field: 'MEC-IN_R2', 
            headerName: 'MEC-IN R2',
            // width: 300,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-IN','R2');
            }
        },
        { 
            field: 'MEC-IN_Rho', 
            headerName: 'MEC-IN Rho',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-IN','Rho');
            }
        },
        { 
            field: 'MEC-IN_Missing Rate', 
            headerName: 'MEC-IN Missing Rate',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-IN','Missing Rate');
            }
        },
        { 
            field: 'MEC-MA_R2', 
            headerName: 'MEC-MA R2',
            // width: 300,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-MA','R2');
            }
        },
        { 
            field: 'MEC-MA_Rho', 
            headerName: 'MEC-MA Rho',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-MA','Rho');
            }
        },
        { 
            field: 'MEC-MA_Missing Rate', 
            headerName: 'MEC-MA Missing Rate',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-MA','Missing Rate');
            }
        }
    ]
}