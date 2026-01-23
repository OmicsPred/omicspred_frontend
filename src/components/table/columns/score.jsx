import { participantsBadge } from '../../Generic';
import { display_cohort } from '../../Common';
import { common_cols, r2_col_header_label } from './common';
import { ancestry_cols } from './ancestry';


const default_cell_value = process.env.DEFAULT_CELL_VALUE;

const match_rate_col = 'Match Rate';

const metric_valueGetter = function(performance_metrics,method,eval_type) {
    for (let i=0; i<performance_metrics.length; i++) {
        const metric = performance_metrics[i];
        if (metric.name_short == method) {
            console.log("- Estimate: "+metric.estimate)
            return metric.estimate;
        }
    }
    if (method == match_rate_col && eval_type == 'Training') {
        return 1;
    }
    return default_cell_value;
}

// const score_platform_name = {...common_cols['platform_name'], headerName:'Platform'}


const score_id_col = {...common_cols['omicspred_id'], field: 'score_id'};
const ancestry_col = {...ancestry_cols['ancestry'], field: 'sample__ancestry_broad'};
const platform_type_col = {...common_cols['platform_type'],  field: 'dataset__platform__platform_master__type'}
const platform_name_col = {...common_cols['platform_name'],  field: 'dataset__platform__platform_master__name'}

const score_col = [score_id_col];

const score_cols = {
    'cohort': {
        field: 'cohort_label',
        headerName: 'Cohort',
        width: 200,
        renderCell: (params) => {
            const cohort = params.row.sample.cohorts[0];
            return display_cohort(cohort);
        },
        valueGetter:  (value, row) => {
            const cohort = row.sample.cohorts[0];
            return cohort.name_short;
        }
    },
    'sample_number': {
        field: 'sample__sample_number',
        headerName: 'Sample size',
        type: 'number',
        width: 120,
        renderCell: (params) => {
            return participantsBadge(params.row.sample.sample_number);
        },
        valueGetter: (value, row) => {
            return row.sample.sample_number;
        }
    },
    'study_type': {
        field: 'eval_type',
        headerName: 'Study stage',
        width: 180,
        renderCell: (params) => {
            const stype = params.row.evaluation_type;
            if (stype == 'Training') {
                return (<span className='training_col fw-bold'>{stype}</span>)
            }
            else {
                return stype;
            }
        },
        valueGetter: (value, row) => {
            return row.evaluation_type;
        }
    },
    'r2': {
        field: 'r2',
        width: 90,
        renderHeader: () => {
            return r2_col_header_label();
        },
        valueGetter: (value, row) => {
            return metric_valueGetter(row.performance_metrics,'R2',row.evaluation_type);
        }
    },
    'rho': {
        field: 'rho',
        headerName: 'Rho',
        width: 90,
        valueGetter: (value, row) => {
            return metric_valueGetter(row.performance_metrics,'Rho',row.evaluation_type);
        }
    },
    'variant_match_rate': {
        field: 'variant_match_rate',
        headerName: match_rate_col,
        width: 120,
        valueGetter: (value, row) => {
            return metric_valueGetter(row.performance_metrics,match_rate_col,row.evaluation_type);
        }
    },
    'missing_rate': {
        field: 'missing_rate',
        headerName: 'Missing Rate',
        width: 120,
        valueGetter: (value, row) => {
            return metric_valueGetter(row.performance_metrics,'Missing Rate',row.evaluation_type);
        }
    }
}



export const performance_metrics_columns = [
    score_cols['cohort'],
    ancestry_col,
    score_cols['sample_number'],
    score_cols['study_type'],
    platform_type_col,
    platform_name_col,
    score_cols['r2'],
    score_cols['rho'],
    score_cols['variant_match_rate'],
    score_cols['missing_rate']
]

const r2_col = {...score_cols['r2'],  sortable: false}
const rho_col = {...score_cols['rho'],  sortable: false}
const variant_match_rate_col = {...score_cols['variant_match_rate'],  sortable: false}
const missing_rate_col = {...score_cols['missing_rate'],  sortable: false}

export const performance_metrics_columns_large = [
    score_cols['cohort'],
    ancestry_col,
    score_cols['sample_number'],
    score_cols['study_type'],
    platform_type_col,
    platform_name_col,
    r2_col,
    rho_col,
    variant_match_rate_col,
    missing_rate_col
]

export const performance_metrics_columns_ext = score_col.concat(performance_metrics_columns);

export const performance_metrics_columns_large_ext = score_col.concat(performance_metrics_columns_large);