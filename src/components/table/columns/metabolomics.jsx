import {cohort_valueGetter, commons_cols, omicspred_internal_link} from "./common";

// Export Metabolomics columns
export const metabolomics_columns = {
    'Metabolon': [
        commons_cols['omicspred_id'],
        { 
            field: 'metabolon_id', 
            headerName: 'Metabolon ID',
            width: 150,
            renderCell: (params) => {
                let metabolite_ids = [];
                if (params.row.metabolites) {
                    for (let i=0; i<params.row.metabolites.length; i++) {
                        metabolite_ids.push(params.row.metabolites[i].external_id);
                    }
                }
                return metabolite_ids.map((metabolite_id) => omicspred_internal_link(metabolite_id,'Metabolite'));
                }
        },
        commons_cols['metabolite_name'],
        commons_cols['pathway_group'],
        commons_cols['pathway_subgroup'],
        commons_cols['variants_number'],
        commons_cols['interval_r2'],
        commons_cols['interval_rho'],
        { 
            field: 'INTERVAL_withheld_subset_R2', 
            headerName: 'INTERVAL withheld subset R2',
            // width: 300,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'INTERVAL withheld subset','R2');
            }
        },
        { 
            field: 'INTERVAL_withheld_subset_Rho', 
            headerName: 'INTERVAL withheld subset Rho',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'INTERVAL withheld subset','Rho');
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
    'Nightingale': [
        commons_cols['omicspred_id'],
        commons_cols['metabolite_name'],
        commons_cols['pathway_group'],
        commons_cols['pathway_subgroup'],
        commons_cols['variants_number'],
        commons_cols['interval_r2'],
        commons_cols['interval_rho'],
        { 
            field: 'UKB_R2', 
            headerName: 'UKB R2',
            // width: 300,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'UKB','R2');
            }
        },
        { 
            field: 'UKB_Rho', 
            headerName: 'UKB Rho',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'UKB','Rho');
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
        },
        { 
            field: 'VIKING_R2', 
            headerName: 'VIKING R2',
            // width: 300,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'VIKING','R2');
            }
        },
        { 
            field: 'VIKING_Rho', 
            headerName: 'VIKING Rho',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'VIKING','Rho');
            }
        },
        { 
            field: 'VIKING_Missing Rate', 
            headerName: 'VIKING Missing Rate',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'VIKING','Missing Rate');
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