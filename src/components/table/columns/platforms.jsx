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
            return omicspred_internal_link({'label':params.row.name},'platform');
        }
    },
    { field: 'full_name', headerName: 'Full Name', minWidth: 200 },
    {
        field: 'versions',
        headerName: 'Versions',
        renderCell: (params) => {
            return params.row.versions.length ? params.row.versions.join(', ') : default_cell_value;
        },
    },
    {
        field: 'technic',
        headerName: 'Technic',
        minWidth: 450,
        renderCell: (params) => {
            return params.row.technic ? params.row.technic : default_cell_value;
        }
    },
    { 
        field: 'type', 
        headerName: 'Type',
        minWidth: 180,
        flex: 1,
        renderCell: (params) => {
            return omicspred_omics_type(params.row.type);
        }
    },
    common_cols['scores_count']
]


export const publication_platform_columns = [
    {
        field: 'name',
        headerName: 'Name',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            return omicspred_internal_link({'label': params.row.platform.name},'platform');
        }
    },
    { 
        field: 'full_name', 
        headerName: 'Full Name', 
        minWidth: 200
    },
    { 
        field: 'version', 
        headerName: 'Version',
    },
    { 
        field: 'technic', 
        headerName: 'Technic', 
        minWidth: 450,
        renderCell: (params) => {
            return params.row.platform.technic ? params.row.platform.technic : default_cell_value;
        }
    },
    { 
        field: 'type', 
        headerName: 'Type',
        minWidth: 180,
        flex: 1,
        renderCell: (params) => {
            return omicspred_omics_type(params.row.platform.type);
        }
    },
    {
        field: 'cohorts_training',
        headerName: 'Cohort Training',
        minWidth: 200,
        flex: 1,
        renderCell: (params) => {
            return get_cohorts_list(params.row.samples_training);
        },
        valueGetter: (value, row) => {
            return get_cohorts_list(row.samples_training);
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
        valueGetter: (value, row) => {
            return get_cohorts_list( row.samples_validation);
        }
    },
    common_cols['scores_count']
]