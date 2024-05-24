import { thousandifyNumber } from '../../Generic';

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
            return params.row.cohort_label;
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
            return thousandifyNumber(params.row.sample.sample_number);
        },
        valueGetter: (value, row) => {
            return row.sample.sample_number;
        }
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 200,
        renderCell: (params) => {
            return params.row.evaluation_type;
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