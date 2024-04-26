import { common_cols, omicspred_internal_link } from "./common";
import { omicspred_omics_type } from '../../../components/Common';

const default_cell_value = process.env.DEFAULT_CELL_VALUE;


const get_cohorts_list = (sample_data) => {
    const cohorts = [];
    // Loop over the samples
    for (let i=0; i< sample_data.length; i++) {
        const sample_cohorts = sample_data[i].cohorts;
        // Loop over the cohorts
        for (let j=0; j< sample_cohorts.length; j++) {
            const cohort_name = sample_cohorts[j].name_short;
            if (!cohorts.includes(cohort_name)) {
                cohorts.push(cohort_name)
            }
        } 
    }
    return cohorts.sort().join(', ');
}


export const platforms_columns = [
    { 
        field: 'name', 
        headerName: 'Name', 
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            return omicspred_internal_link({'label': params.row.platform.name},'platform');
        },
        valueGetter: (params) => { return params.row.platform.name }
    },
    { 
        field: 'full_name', 
        headerName: 'Full Name', 
        minWidth: 200,
        valueGetter: (params) => { return params.row.platform.full_name }
    
    },
    { 
        field: 'version', 
        headerName: 'Version',
        valueGetter: (params) => { return params.row.platform.version }
    },
    { 
        field: 'technic', 
        headerName: 'Technic', 
        minWidth: 450,
        valueGetter: (params) => { return params.row.platform.technic }
    },
    { 
        field: 'type', 
        headerName: 'Type',
        minWidth: 180,
        flex: 1,
        renderCell: (params) => {
            return omicspred_omics_type(params.row.platform.type);
        },
        valueGetter: (params) => { return params.row.platform.type }
    },
    {
        field: 'cohorts_training',
        headerName: 'Cohort Training',
        minWidth: 200,
        flex: 1,
        renderCell: (params) => {
            return get_cohorts_list(params.row.samples_training);
        },
        valueGetter: (params) => {
            return get_cohorts_list(params.row.samples_training);
        }
    },
    {
        field: 'cohorts_validation',
        headerName: 'Cohort Validation',
        minWidth: 200,
        flex: 1,
        renderCell: (params) => {
            return get_cohorts_list(params.row.samples_validation);
        },
        valueGetter: (params) => {
            return get_cohorts_list(params.row.samples_validation);
        }
    },
    common_cols['scores_count']
]