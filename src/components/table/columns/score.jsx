const metric_valueGetter = function(performance_metrics,method) {
    for (let i=0; i<performance_metrics.length; i++) {
        const metric = performance_metrics[i];
        if (metric.name_short == method) {
            return metric.estimate
        }
    }
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
        valueGetter: (params) => {
            return metric_valueGetter(params.row.performance_metrics,'R2');
        }
    },
    { 
        field: 'rho', 
        headerName: 'Rho',
        width: 100,
        valueGetter: (params) => {
            return metric_valueGetter(params.row.performance_metrics,'Rho');
        }
    },
    { 
        field: 'missing_rate', 
        headerName: 'Missing Rate',
        width: 100,
        valueGetter: (params) => {
            return metric_valueGetter(params.row.performance_metrics,'Missing Rate');
        }
    }
]