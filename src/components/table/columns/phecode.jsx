import {cohort_valueGetter, commons_cols, omicspred_internal_link} from "./common";


let base_phecode_columns = {
    'Full': [
        commons_cols['phecode_id'],
        commons_cols['phecode_name'],
        commons_cols['phecode_category'],
        commons_cols['omicspred_id'],
        { 
            field: 'r2', 
            headerName: 'R2',
            width: 100,
            renderCell: (params) => {
                if (params.row.data_values) {
                    if (params.row.data_values.R2) {
                        return params.row.data_values.R2;
                    }
                }   
            }
        },
        commons_cols['platform_name'],
        { 
            field: 'omics_name', 
            headerName: 'Description',
            width: 300
        },
        { 
            field: 'hr', 
            headerName: 'Hazard Ratio',
            width: 150,
            renderCell: (params) => {
                if (params.row.data_values) {
                    if (params.row.data_values.HR) {
                        let hr = params.row.data_values.HR;
                        if (params.row.data_values.HR_lower) {
                            hr += ' ['+params.row.data_values.HR_lower+' - '+params.row.data_values.HR_upper+']';
                        }
                        return hr;
                    }
                }   
            }
        },
        { 
            field: 'fdr', 
            headerName: 'FDR',
            width: 100,
            renderCell: (params) => {
                if (params.row.data_values) {
                    if (params.row.data_values.FDR) {
                        return params.row.data_values.FDR;
                    }
                }   
            }
        }
    ],
    'Sum': [
        commons_cols['phecode_id'],
        commons_cols['phecode_name'],
        commons_cols['phecode_category'],
        { 
            field: 'mean_age', 
            headerName: 'Mean Age',
            width: 150,
            renderCell: (params) => {
                if (params.row.sample_age) {
                    let value = params.row.sample_age;
                    if (params.row.sample_age_sd) {
                        value += ' ± '+params.row.sample_age_sd;
                    }
                    return value;
                }
            }
        },
        { 
            field: 'cases_samples', 
            headerName: '#Cases/#Samples',
            width: 150,
            renderCell: (params) => {
                if (params.row.sample_cases) {
                    let value = params.row.sample_cases;
                    if (params.row.sample_number) {
                        value += '/'+params.row.sample_number;
                    }
                    return value;
                }
            }
        },
        { 
            field: 'percent+female', 
            headerName: '%Female',
            width: 150,
            renderCell: (params) => {
                if (params.row.sample_percent_female) {
                    return params.row.sample_percent_female+'%';
                }
            }
        },
    ]
}

const build_columns = () => {
    const platform_list = ["SomaScan","RNAseq","Metabolon","Olink","Nightingale"];
    for (let i=0; i< platform_list.length; i++) {
        const platform = platform_list[i];
        let platform_idx = platform.toLowerCase();
        platform_idx = platform_idx.replace(' ','_');
        base_phecode_columns['Sum'].push(
            { 
                field: platform_idx, 
                headerName: platform,
                width: 100,
                renderCell: (params) => {
                    let platform_count = 0;
                    if (params.row.platform_counts) {
                        if (params.row.platform_counts[platform]) {
                            platform_count = params.row.platform_counts[platform];
                        }
                    }
                    return platform_count
                }
            },
        )
    }
    return base_phecode_columns;
}



export const phecode_columns = build_columns();
// export const phecode_columns = {
//     'Full': [
//         commons_cols['phecode_id'],
//         commons_cols['phecode_name'],
//         commons_cols['phecode_category'],
//         commons_cols['omicspred_id'],
//         { 
//             field: 'r2', 
//             headerName: 'R2',
//             width: 100,
//             renderCell: (params) => {
//                 if (params.row.data_values) {
//                     if (params.row.data_values.R2) {
//                         return params.row.data_values.R2;
//                     }
//                 }   
//             }
//         },
//         commons_cols['platform_name'],
//         { 
//             field: 'omics_name', 
//             headerName: 'Description',
//             width: 300
//         },
//         { 
//             field: 'hr', 
//             headerName: 'Hazard Ratio',
//             width: 150,
//             renderCell: (params) => {
//                 if (params.row.data_values) {
//                     if (params.row.data_values.HR) {
//                         let hr = params.row.data_values.HR;
//                         if (params.row.data_values.HR_lower) {
//                             hr += ' ['+params.row.data_values.HR_lower+' - '+params.row.data_values.HR_upper+']';
//                         }
//                         return hr;
//                     }
//                 }   
//             }
//         },
//         { 
//             field: 'fdr', 
//             headerName: 'FDR',
//             width: 100,
//             renderCell: (params) => {
//                 if (params.row.data_values) {
//                     if (params.row.data_values.FDR) {
//                         return params.row.data_values.FDR;
//                     }
//                 }   
//             }
//         }
//     ],
//     'Sum': [
//         commons_cols['phecode_id'],
//         commons_cols['phecode_name'],
//         commons_cols['phecode_category'],
//         { 
//             field: 'mean_age', 
//             headerName: 'Mean Age',
//             width: 150,
//             renderCell: (params) => {
//                 if (params.row.sample_age) {
//                     let value = params.row.sample_age;
//                     if (params.row.sample_age_sd) {
//                         value += ' ± '+params.row.sample_age_sd;
//                     }
//                     return value;
//                 }
//             }
//         },
//         { 
//             field: 'cases_samples', 
//             headerName: '#Cases/#Samples',
//             width: 150,
//             renderCell: (params) => {
//                 if (params.row.sample_cases) {
//                     let value = params.row.sample_cases;
//                     if (params.row.sample_number) {
//                         value += '/'+params.row.sample_number;
//                     }
//                     return value;
//                 }
//             }
//         },
//         { 
//             field: 'percent+female', 
//             headerName: '%Female',
//             width: 150,
//             renderCell: (params) => {
//                 if (params.row.sample_percent_female) {
//                     return params.row.sample_percent_female+'%';
//                 }
//             }
//         },
//     ]
// }