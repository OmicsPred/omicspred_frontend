import { participantsBadge } from '../../Generic';
import Href from '../../Href';
// import { omicspred_internal_link, r2_col_header_label } from './common';
import { common_cols, r2_col_header_label } from './common';
import { ancestry_cols } from './ancestry';


const default_cell_value = process.env.DEFAULT_CELL_VALUE;

const match_rate_col = 'Match Rate';

const metric_valueGetter = function(performance_metrics,method,eval_type) {
    for (let i=0; i<performance_metrics.length; i++) {
        const metric = performance_metrics[i];
        if (metric.name_short == method) {
            return metric.estimate;
        }
    }
    if (method == match_rate_col && eval_type == 'Training') {
        return 1;
    }
    return default_cell_value;
}

// const score_platform_name = {...common_cols['platform_name'], headerName:'Platform'}

export const performance_metrics_columns = [
    {
        field: 'cohort',
        headerName: 'Cohort',
        width: 200,
        renderCell: (params) => {
            let cohort_label = params.row.cohort_label;
            // e.g. MEC_IN -> MEC
            const lastIndexOf = cohort_label.lastIndexOf("_");
            if (lastIndexOf > 0 ) {
                cohort_label = cohort_label.substring(0, lastIndexOf).replaceAll('_',' ');
            }
            // e.g. UKB withheld EUR -> UKB withheld
            else if (cohort_label.match(/\s[A-Z]{3}$/)) {
                const lastIndexOfSpace = cohort_label.lastIndexOf(" ");
                cohort_label = cohort_label.substring(0, lastIndexOfSpace);
            }
            return <Href text={cohort_label} href={'/cohort/'+cohort_label}/>
        },
        valueGetter:  (value, row) => {
            const cohort_label = row.cohort_label;
            const lastIndexOf = cohort_label.lastIndexOf("_");
            if (lastIndexOf > 0 ) {
                return cohort_label.substring(0, lastIndexOf).replaceAll('_',' ');
            }
            else if (cohort_label.match(/\s[A-Z]{3}$/)) {
                const lastIndexOfSpace = cohort_label.lastIndexOf(" ");
                return cohort_label.substring(0, lastIndexOfSpace);
            }
            else {
                return cohort_label;
            }
        }
    },
    ancestry_cols['ancestry'],
    {
        field: 'sample_number',
        headerName: 'Sample size',
        width: 120,
        renderCell: (params) => {
            return participantsBadge(params.row.sample.sample_number);
        },
        valueGetter: (value, row) => {
            return row.sample.sample_number;
        }
    },
    {
        field: 'study_type',
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
    common_cols['platform_name'],
    // score_platform_name,
    common_cols['platform_type'],
    {
        field: 'r2',
        // headerName: <>R<sup>2</sup></>,
        width: 90,
        renderHeader: () => {
            return r2_col_header_label();
        },
        valueGetter: (value, row) => {
            return metric_valueGetter(row.performance_metrics,'R2',row.evaluation_type);
        }
    },
    {
        field: 'rho',
        headerName: 'Rho',
        width: 90,
        valueGetter: (value, row) => {
            return metric_valueGetter(row.performance_metrics,'Rho',row.evaluation_type);
        }
    },
    {
        field: 'variant_match_rate',
        headerName: match_rate_col,
        width: 120,
        valueGetter: (value, row) => {
            return metric_valueGetter(row.performance_metrics,match_rate_col,row.evaluation_type);
        }
    },
    {
        field: 'missing_rate',
        headerName: 'Missing Rate',
        width: 120,
        valueGetter: (value, row) => {
            return metric_valueGetter(row.performance_metrics,'Missing Rate',row.evaluation_type);
        }
    }
]

const score_col = [common_cols['omicspred_id']];

export const performance_metrics_columns_ext = score_col.concat(performance_metrics_columns);