import { participantsBadge } from '../../Generic';
import Href from '../../Href';
import { omicspred_internal_link } from './common';


const default_cell_value = process.env.DEFAULT_CELL_VALUE;

const metric_valueGetter = function(performance_metrics,method) {
    for (let i=0; i<performance_metrics.length; i++) {
        const metric = performance_metrics[i];
        if (metric.name_short == method) {
            return metric.estimate
        }
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
    {
        field: 'ancestry',
        headerName: 'Ancestry',
        width: 200,
        renderCell: (params) => {
            return params.row.sample.ancestry_broad;
        }
    },
    {
        field: 'individuals',
        headerName: 'Sample size',
        width: 150,
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
        width: 200,
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
        headerName: 'R2',
        width: 100,
        valueGetter: (value, row) => {
            return metric_valueGetter(row.performance_metrics,'R2');
        }
    },
    {
        field: 'rho',
        headerName: 'Rho',
        width: 100,
        valueGetter: (value, row) => {
            return metric_valueGetter(row.performance_metrics,'Rho');
        }
    },
    {
        field: 'missing_rate',
        headerName: 'Missing Rate',
        width: 100,
        valueGetter: (value, row) => {
            return metric_valueGetter(row.performance_metrics,'Missing Rate');
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