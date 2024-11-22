// import { GridColumnHeaderParams } from '@mui/x-data-grid';
import { Stack } from "react-bootstrap-icons";
import {common_cols,common_data_cols, applications_cols} from "./common";


const omicspred_id_col = {...common_cols['omicspred_id'], field: 'score_id'}

let base_phecode_columns = {
    'Full': [
        common_cols['phecode_id'],
        common_cols['phecode_name'],
        common_cols['phecode_category'],
        omicspred_id_col,
        common_data_cols['r2'],
        common_cols['platform_type'],
        common_cols['platform_name'],
        applications_cols['gene'],
        applications_cols['protein'],
        applications_cols['metabolite'],
        common_data_cols['hazard_ratio'],
        common_data_cols['fdr']
    ],
    'Sum': [
        common_cols['phecode_id'],
        common_cols['phecode_name'],
        common_cols['phecode_category'],
        {
            field: 'sample_age',
            headerName: 'Mean Age',
            width: 120,
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
            field: 'sample_cases',
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
            field: 'sample_percent_female',
            headerName: '%Female',
            width: 100,
            renderCell: (params) => {
                if (params.row.sample_percent_female) {
                    return params.row.sample_percent_female+'%';
                }
            }
        },
    ]
}

const build_columns = () => {
    // const platform_list = {"Somalogic": "Prote","Olink","Metabolon","Nightingale","Illumina RNAseq"];

    const platform_list = {
        "Somalogic": "Proteomics",
        "Olink": "Proteomics",
        "Metabolon": "Metabolomics",
        "Nightingale": "Metabolomics",
        "Illumina RNAseq": "Transcriptomics"
    };
    const platform_names = Object.keys(platform_list);
    for (let i=0; i< platform_names.length; i++) {
        const platform = platform_names[i];
        const omics_type = platform_list[platform];
        let platform_idx = platform.toLowerCase();
        platform_idx = platform_idx.replace(' ','_');
        base_phecode_columns['Sum'].push(
            {
                field: platform_idx,
                // headerName: platform,
                description: 'Number of scores associated with '+platform,
                width: 150,
                sortable: false,
                renderHeader: (params) => {
                    return (<span><Stack size="0.9em" className={"align-middle me-2 color_"+omics_type}/><span className="align-middle fw-bold">{platform}</span></span>)
                },
                renderCell: (params) => {
                    let platform_count = 0;
                    if (params.row.platform_counts) {
                        if (params.row.platform_counts[platform]) {
                            platform_count = params.row.platform_counts[platform];
                        }
                    }
                    return platform_count > 0 ? <b>{platform_count}</b> : <span style={{fontWeight:'200'}}>{platform_count}</span>
                }
            },
        )
    }
    return base_phecode_columns;
}


export const phecode_columns = build_columns();


export const score_phecode_columns = [
    common_cols['phecode_id'],
    common_cols['phecode_name'],
    common_cols['phecode_category'],
    common_data_cols['r2'],
    common_data_cols['hazard_ratio'],
    common_data_cols['fdr']
]