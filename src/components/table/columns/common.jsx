import { FileEarmarkText } from 'react-bootstrap-icons';

export const cohort_valueGetter = function(row,cohort,method) {
    let result = '';
    let cohort_label = cohort+'_'+method;
    if (row.performance_data) {
        if (row.performance_data[cohort_label]) {
        result = row.performance_data[cohort_label].estimate;
        }
    }  
    return result;
}

export const omicspred_internal_link = function(op_id,type) {
    let op_url = "/"+type+"/"+op_id;
    return (
        <a key={op_id} href={op_url}>{op_id}</a>
    )
}

export const commons_cols = {
    'omicspred_id': {
        field: 'id', 
        headerName: 'OmicsPred ID', 
        width: 150,
        renderCell: (params) => {
            let op_id = params.row.id;
            if (params.row.score_id) {
                op_id = params.row.score_id;
            }   
            return omicspred_internal_link(op_id,'Score')
        }
    },
    'variants_number': { field: 'variants_number', headerName: '#SNP', width: 100 },
    'interval_r2' : { 
        field: 'INTERVAL_R2', 
        headerName: 'INTERVAL R2',
        // width: 300,
        valueGetter: (params) => {
            return cohort_valueGetter(params.row,'INTERVAL','R2');
        }
    },
    'interval_rho': { 
        field: 'INTERVAL_Rho', 
        headerName: 'INTERVAL Rho',
        // width: 300,
        valueGetter: (params) => {
            return cohort_valueGetter(params.row,'INTERVAL','Rho');
        }
    },
    'platform_type': { 
        field: 'platform_type', 
        headerName: 'Omics',
        width: 150,
        valueGetter: (params) => {
            return params.row.platform.type;
        }
    },
    'platform_name': { 
        field: 'platform_name', 
        headerName: 'Platform',
        width: 150,
        renderCell: (params) => {
            return omicspred_internal_link(params.row.platform.name,'Platform');
        }
    },
    'scoring_file': { 
        field: 'scoring_file', 
        headerName: 'Scoring File',
        width: 150,
        renderCell: (params) => {
            return <FileEarmarkText color="blue" size={24}/>;
        }
    },
    'phecode_id': {
        field: 'phecode_id', 
        headerName: 'PheCode', 
        width: 100,
        renderCell: (params) => {
            let phe_id = params.row.id;
            if (params.row.phecode) {
                phe_id = params.row.phecode.id;
            }   
            return omicspred_internal_link(phe_id,'Phecode')
        }
    },
    'phecode_name': {
        field: 'phecode_name', 
        headerName: 'Phenotype', 
        width: 300,
        renderCell: (params) => {
            let phe_name = params.row.name;
            if (params.row.phecode) {
                phe_name = params.row.phecode.name;
            }   
            return phe_name
        }
    },
    'phecode_category': {
        field: 'phecode_category', 
        headerName: 'Category', 
        width: 200,
        renderCell: (params) => {
            let phe_cat = params.row.phecode.category;   
            return phe_cat
        }
    },
}