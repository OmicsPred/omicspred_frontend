import { participantsBadge } from '../../Generic';
import Href from '../../Href';
import { omicspred_internal_link, r2_col_header_label } from './common';
import { ancestry_cols } from './ancestry';


const default_cell_value = process.env.DEFAULT_CELL_VALUE;

const match_rate_col = 'Match Rate'

const metric_valueGetter = function(performance_metrics,method,eval_type) {
    for (let i=0; i<performance_metrics.length; i++) {
        const metric = performance_metrics[i];
        if (metric.name_short == method) {
            return metric.estimate
        }
    }
    if (method == match_rate_col && eval_type == 'Training') {
        return 1;
    }
    return default_cell_value;
}


export const score_columns = [
    {
        field: 'cohort',
        headerName: 'Cohort',
        width: 200,
        renderCell: (params) => {
            let cohort_label = params.row.cohort_label;
            const lastIndexOf = cohort_label.lastIndexOf("_");
            if (lastIndexOf > 0 ) {
                cohort_label = cohort_label.substring(0, lastIndexOf).replaceAll('_',' ');
            }
            return <Href text={cohort_label} href={'/cohort/'+cohort_label}/>
        },
        valueGetter:  (value, row) => {
            const cohort_label = row.cohort_label
            const lastIndexOf = cohort_label.lastIndexOf("_");
            if (lastIndexOf > 0 ) {
                return cohort_label.substring(0, lastIndexOf).replaceAll('_',' ');
            }
            else {
                return cohort_label;
            }
        }
    },
    ancestry_cols['ancestry'],
    {
        field: 'individuals',
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
        field: 'type',
        headerName: 'Study stage',
        width: 180,
        renderCell: (params) => {
            const stype = params.row.evaluation_type;
            if (stype == 'Training') {
                return (<span className='training_col'>{stype}</span>)
            }
            else {
                return stype;
            }
        },
        valueGetter: (value, row) => {
            return row.evaluation_type;
        }
    },
    {
        field: 'r2',
        // headerName: <>R<sup>2</sup></>,
        width: 90,
        renderHeader: (params) => {
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


const score_col = [
    {
        field: 'id',
        headerName: 'OmicsPred ID',
        minWidth: 150,
        flex: 0.5,
        resizable: false,
        hideable: false,
        renderCell: (params) => {
            let score_id = params.row.associated_opgs_id;
            return omicspred_internal_link({'label': score_id},'score')
        },
        valueGetter: (value, row) => {
            let score_id = row.associated_opgs_id;
            return score_id
        }
    }]

export const score_columns_ext = score_col.concat(score_columns)