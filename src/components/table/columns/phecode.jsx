import {common_cols,common_data_cols} from "./common";


let base_phecode_columns = {
    'Full': [
        common_cols['phecode_id'],
        common_cols['phecode_name'],
        common_cols['phecode_category'],
        common_cols['omicspred_id'],
        common_data_cols['r2'],
        common_cols['platform_name'],
        { 
            field: 'omics_name', 
            headerName: 'Description',
            width: 300
        },
        common_data_cols['hazard_ratio'],
        common_data_cols['fdr']
    ],
    'Sum': [
        common_cols['phecode_id'],
        common_cols['phecode_name'],
        common_cols['phecode_category'],
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