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

export const omicspred_internal_link = function(op_id,type,index) {
    let op_url = "/"+type+"/"+op_id;
    return (
        <span key={op_id+'_'+type+'_span'}>
            {index ? ', ': ''}<a key={op_id+'_'+type} href={op_url}>{op_id}</a>
        </span>
    )
}

export const omicspred_internal_links = function(op_ids,type) {
    return ( 
        <>
            {op_ids.map((op_id, index) => omicspred_internal_link(op_id, type, index))}
        </>
    )
}

export const omicspred_omics_type = function(type) {
    return ( 
        <span className={"border_left_mark border_color_"+type}>{type}</span>
    )
}


export const omicspred_platform_omics_type = function(platform,type) {
    return (
        <a key={platform+'-'+type} href={"/platform/"+platform}><span className={"border_left_mark border_color_"+type}>{platform}</span></a>
    )
}


export const common_cols = {
    'omicspred_id': {
        field: 'id', 
        headerName: 'OmicsPred ID', 
        minWidth: 150,
        flex: 0.5,
        resizable: false,
        renderCell: (params) => {
            let op_id = params.row.id;
            if (params.row.score_id) {
                op_id = params.row.score_id;
            }   
            return omicspred_internal_link(op_id,'Score')
        },
        valueGetter: (params) => {
            let op_id = params.row.id;
            if (params.row.score_id) {
                op_id = params.row.score_id;
            }
            return op_id 
        }
    },
    'variants_number': { field: 'variants_number', headerName: '#SNP', flex: 0.5},
    'platform_type': { 
        field: 'platform_type', 
        headerName: 'Omics',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            return omicspred_omics_type(params.row.platform.type);
        },
        valueGetter: (params) => { return params.row.platform.type }
    },
    'platform_name': { 
        field: 'platform_name', 
        headerName: 'Platform',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            return omicspred_internal_link(params.row.platform.name,'Platform');
        },
        valueGetter: (params) => { return params.row.platform.name }
    },
    'scoring_file': { 
        field: 'scoring_file', 
        headerName: 'Scoring File',
        flex: 1,
        renderCell: (params) => {
            return <FileEarmarkText color="blue" size={24}/>;
        }
    },
    'protein_id': { 
        field: 'uniprot_id', 
        headerName: 'UniProt ID',
        minWidth: 120,
        flex: 0.5,
        renderCell: (params) => {
            let pr_ids = [];
            if (params.row.proteins) {
                pr_ids = params.row.proteins.map((protein) => protein.external_id)  
            }
            else if (params.row.external_id) {
                pr_ids.push(params.row.external_id);
            }
            return omicspred_internal_links(pr_ids, 'protein');
        },
        valueGetter: (params) => {
            let pr_ids = [];
            if (params.row.proteins) {
                pr_ids = params.row.proteins.map((protein) => protein.external_id)  
            }
            else if (params.row.external_id) {
                pr_ids.push(params.row.external_id);
            }
            return pr_ids.join(',');
        }
    },
    'protein_name': { 
        field: 'protein_name', 
        headerName: 'Protein',
        minWidth: 150,
        flex: 1,
        valueGetter: (params) => {
            let pr_names = [];
            if (params.row.proteins) {
                pr_names = params.row.proteins.map((protein) => protein.name)  
            }
            else if (params.row.name) {
                pr_names.push(params.row.name);
            }
            return pr_names.join(';');
        }
    },
    'gene_name': { 
        field: 'gene_name', 
        headerName: 'Gene',
        minWidth: 120,
        flex: 0.5,
        renderCell: (params) => {
            let gene_names = [];
            if (params.row.genes) {
                gene_names = params.row.genes.map((gene) => gene.name)  
            }
           return omicspred_internal_links(gene_names, 'Gene');
        },
        valueGetter: (params) => {
            let gene_names = [];
            if (params.row.genes) {
                gene_names = params.row.genes.map((gene) => gene.name)  
            }
            return gene_names.join(',');
        }
    },
    'metabolite_name': {
        field: 'metabolite_name', 
        headerName: 'Biochemical Name',
        minWidth: 200,
        flex: 1,
        renderCell: (params) => {
            let metabolite_names = [];
            if (params.row.metabolites) {
                metabolite_names = params.row.metabolites.map((metabolite) => metabolite.name) 
            }
            return omicspred_internal_links(metabolite_names, 'metabolite');
        },
        valueGetter: (params) => {
            let metabolite_names = [];
            if (params.row.metabolites) {
                metabolite_names = params.row.metabolites.map((metabolite) => metabolite.name) 
            }
            return metabolite_names.join(',');
        }
    },
    'phecode_id': {
        field: 'phecode_id', 
        headerName: 'PheCode', 
        minWidth: 100,
        flex: 1,
        renderCell: (params) => {
            let phe_id = params.row.id;
            if (params.row.phecode) {
                phe_id = params.row.phecode.id;
            }   
            return omicspred_internal_link(phe_id,'phecode')
        },
        valueGetter: (params) => {
            let phe_id = params.row.id;
            if (params.row.phecode) {
                phe_id = params.row.phecode.id;
            }   
            return phe_id
        }
    },
    'phecode_name': {
        field: 'phecode_name', 
        headerName: 'Phenotype', 
        // width: 300,
        flex: 1,
        renderCell: (params) => {
            let phe_name = params.row.name;
            if (params.row.phecode) {
                phe_name = params.row.phecode.name;
            }   
            return phe_name
        },
        valueGetter: (params) => {
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
        //width: 200,
        flex: 1,
        renderCell: (params) => {
            return params.row.phecode.category;
        },
        valueGetter: (params) => {  
            return params.row.phecode.category;
        }
    },
    'pathway_group': { 
        field: 'pathway_group', 
        headerName: 'Pathway',
        minWidth: 200,
        flex: 1,
        valueGetter: (params) => {
            let result = '';
            if (params.row.metabolites) {
                if (params.row.metabolites[0]) {
                    if (params.row.metabolites[0].pathway_group) {
                        result = params.row.metabolites[0].pathway_group;
                    }
                }
            }  
            return result;
        }
    },
    'pathway_subgroup': { 
        field: 'pathway_subgroup', 
        headerName: 'Sub Pathway',
        minWidth: 200,
        flex: 1,
        valueGetter: (params) => {
            let result = '';
            if (params.row.metabolites) {
                if (params.row.metabolites[0]) {
                    if (params.row.metabolites[0].pathway_subgroup) {
                        result = params.row.metabolites[0].pathway_subgroup;
                    }
                }
            }  
            return result;
        }
    }
}


export const common_data_cols = {
   'r2': { 
        field: 'r2', 
        headerName: 'R2',
        width: 100,
        valueGetter: (params) => {
            if (params.row.data_values) {
                if (params.row.data_values.R2) {
                    return params.row.data_values.R2;
                }
            }   
        }
    },
    'hazard_ratio': { 
        field: 'hr', 
        headerName: 'Hazard Ratio',
        width: 150,
        valueGetter: (params) => {
            if (params.row.data_values) {
                if (params.row.data_values.HR) {
                    let hr = params.row.data_values.HR;
                    if (params.row.data_values.HR_lower) {
                        hr += ' ['+params.row.data_values.HR_lower+' - '+params.row.data_values.HR_upper+']';
                    }
                    return hr;
                }
            }   
        }
    },
    'fdr': { 
        field: 'fdr', 
        headerName: 'FDR',
        width: 100,
        valueGetter: (params) => {
            if (params.row.data_values) {
                if (params.row.data_values.FDR) {
                    return params.row.data_values.FDR;
                }
            }   
        }
    }
}


export const cohort_cols = {
    'INTERVAL': {
        'R2' : { 
            field: 'INTERVAL_R2',
            headerClassName: ['training_col','col_border_left'],
            headerName: 'R2',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'INTERVAL','R2');
            }
        },
        'Rho': { 
            field: 'INTERVAL_Rho', 
            headerName: 'Rho',
            headerClassName: 'training_col',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'INTERVAL','Rho');
            }
        }
    },
    'UKB': {
        'R2': {
            field: 'UKB_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'UKB','R2');
            }
        },
        'Rho': { 
            field: 'UKB_Rho', 
            headerName: 'Rho',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'UKB','Rho');
            }
        }
    },
    'ORCADES': {
        'R2': {
            field: 'ORCADES_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'ORCADES','R2');
            }
        },
        'Rho': { 
            field: 'ORCADES_Rho', 
            headerName: 'Rho',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'ORCADES','Rho');
            }
        },
        'Missing Rate': { 
            field: 'ORCADES_Missing Rate', 
            headerName: 'Missing Rate',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'ORCADES','Missing Rate');
            }
        }
    },
    'VIKING': {
        'R2': {
            field: 'VIKING_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'VIKING','R2');
            }
        },
        'Rho': { 
            field: 'VIKING_Rho', 
            headerName: 'Rho',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'VIKING','Rho');
            }
        },
        'Missing Rate': { 
            field: 'VIKING_Missing Rate', 
            headerName: 'Missing Rate',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'VIKING','Missing Rate');
            }
        }
    },
    'MEC-CN': {
        'R2': {
            field: 'MEC-CN_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-CN','R2');
            }
        },
        'Rho': { 
            field: 'MEC-CN_Rho', 
            headerName: 'Rho',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-CN','Rho');
            }
        },
        'Missing Rate': { 
            field: 'MEC-CN_Missing Rate', 
            headerName: 'Missing Rate',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-CN','Missing Rate');
            }
        }
    },
    'MEC-IN': {
        'R2': {
            field: 'MEC-IN_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-IN','R2');
            }
        },
        'Rho': {
            field: 'MEC-IN_Rho', 
            headerName: 'Rho',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-IN','Rho');
            }
        },
        'Missing Rate': {
            field: 'MEC-IN_Missing Rate', 
            headerName: 'Missing Rate',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-IN','Missing Rate');
            }
        }
    },
    'MEC-MA': {
        'R2': {
            field: 'MEC-MA_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-MA','R2');
            }
        },
        'Rho': { 
            field: 'MEC-MA_Rho', 
            headerName: 'Rho',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-MA','Rho');
            }
        },
        'Missing Rate': { 
            field: 'MEC-MA_Missing Rate', 
            headerName: 'Missing Rate',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MEC-MA','Missing Rate');
            }
        }
    },
    'INTERVAL_withheld_subset': {
        'R2': {
            field: 'INTERVAL_withheld_subset_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            // width: 300,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'INTERVAL withheld subset','R2');
            }
        },
        'Rho': { 
            field: 'INTERVAL_withheld_subset_Rho', 
            headerName: 'Rho',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'INTERVAL withheld subset','Rho');
            }
        }
    },
    'NSPHS': {
        'R2': {
            field: 'NSPHS_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            // width: 300,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'NSPHS','R2');
            }
        },
        'Rho': { 
            field: 'NSPHS_Rho', 
            headerName: 'Rho',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'NSPHS','Rho');
            }
        },
        'Missing Rate': { 
            field: 'NSPHS_Missing Rate', 
            headerName: 'Missing Rate',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'NSPHS','Missing Rate');
            }
        }
    },
    'FENLAND': {
        'R2': {
            field: 'FENLAND_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            width: 90,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'FENLAND','R2');
            }
        },
        'Rho': {
            field: 'FENLAND_Rho', 
            headerName: 'Rho',
            width: 100,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'FENLAND','Rho');
            }
        },
        'Missing Rate': {
            field: 'FENLAND_Missing Rate', 
            headerName: 'Missing Rate',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'FENLAND','Missing Rate');
            }
        }
    },
    'JHS': {
        'R2': {
            field: 'JHS_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            // width: 300,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'JHS','R2');
            }
        },
        'Rho': {
            field: 'JHS_Rho', 
            headerName: 'Rho',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'JHS','Rho');
            }
        },
        'Missing Rate': {
            field: 'JHS_Missing Rate', 
            headerName: 'Missing Rate',
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'JHS','Missing Rate');
            }
        }
    },
    'MESA-AFA': {
        'R2': {
            field: 'MESA-AFA_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MESA-AFA','R2');
            }
        }
    },
    'MESA-ALL': {
        'R2': {
            field: 'MESA-ALL_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MESA-ALL','R2');
            }
        }
    },
    'MESA-CHN': {
        'R2': {
            field: 'MESA-CHN_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MESA-CHN','R2');
            }
        }
    },
    'MESA-EUR': {
        'R2': {
            field: 'MESA-EUR_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MESA-EUR','R2');
            }
        }
    },
    'MESA-HIS': {
        'R2': {
            field: 'MESA-HIS_R2',
            headerName: 'R2',
            headerClassName: 'col_border_left',
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MESA-HIS','R2');
            }
        }
    }
}


export const common_column_groups = {
    'INTERVAL': {
        groupId: 'INTERVAL',
        children: [{ field: 'INTERVAL_R2' }, { field: 'INTERVAL_Rho' }],
        headerClassName: ['training_col','cols_group']
    },
    'FENLAND': {
        groupId: 'FENLAND',
        children: [{ field: 'FENLAND_R2' }, { field: 'FENLAND_Rho' }, { field: 'FENLAND_Missing Rate' }],
        headerClassName: 'cols_group'
    
    },
    'MEC-CN': {
        groupId: 'MEC CN',
        children: [{ field: 'MEC-CN_R2' }, { field: 'MEC-CN_Rho' }, { field: 'MEC-CN_Missing Rate' }],
        headerClassName: 'cols_group'
    },
    'MEC-IN': {
        groupId: 'MEC IN',
        children: [{ field: 'MEC-IN_R2' }, { field: 'MEC-IN_Rho' }, { field: 'MEC-IN_Missing Rate' }],
        headerClassName: 'cols_group'
    },
    'MEC-MA': {
        groupId: 'MEC MA',
        children: [{ field: 'MEC-MA_R2' }, { field: 'MEC-MA_Rho' }, { field: 'MEC-MA_Missing Rate' }],
        headerClassName: 'cols_group'
    },
    'JHS': {
        groupId: 'JHS',
        children: [{ field: 'JHS_R2' }, { field: 'JHS_Rho' }, { field: 'JHS_Missing Rate' }],
        headerClassName: 'cols_group'
    },
    'NSPHS': {
        groupId: 'NSPHS',
        children: [{ field: 'NSPHS_R2' }, { field: 'NSPHS_Rho' }, { field: 'NSPHS_Missing Rate' }],
        headerClassName: 'cols_group'
    },
    'ORCADES': {
        groupId: 'ORCADES',
        children: [{ field: 'ORCADES_R2' }, { field: 'ORCADES_Rho' }, { field: 'ORCADES_Missing Rate' }],
        headerClassName: 'cols_group'
    },
    'INTERVAL_withheld_subset': {
        groupId: 'INTERVAL_withheld_subset',
        children: [{ field: 'INTERVAL_withheld_subset_R2' }, { field: 'INTERVAL_withheld_subset_Rho' }],
        headerClassName: 'cols_group',
        headerName: 'INTERVAL withheld subset'
    },
    'UKB': {
        groupId: 'UKB',
        children: [{ field: 'UKB_R2' }, { field: 'UKB_Rho' }],
        headerClassName: 'cols_group'
    },
    'VIKING': {
        groupId: 'VIKING',
        children: [{ field: 'VIKING_R2' }, { field: 'VIKING_Rho' }, { field: 'VIKING_Missing Rate' }],
        headerClassName: 'cols_group'
    },
    'MESA-AFA': {
        groupId: 'MESA AFA',
        children: [{ field: 'MESA-AFA_R2' },],
        headerClassName: 'cols_group'
    },
    'MESA-ALL': {
        groupId: 'MESA ALL',
        children: [{ field: 'MESA-ALL_R2' },],
        headerClassName: 'cols_group'
    },
    'MESA-CHN': {
        groupId: 'MESA CHN',
        children: [{ field: 'MESA-CHN_R2' },],
        headerClassName: 'cols_group'
    },
    'MESA-EUR': {
        groupId: 'MESA EUR',
        children: [{ field: 'MESA-EUR_R2' },],
        headerClassName: 'cols_group'
    },
    'MESA-HIS': {
        groupId: 'MESA HIS',
        children: [{ field: 'MESA-HIS_R2' },],
        headerClassName: 'cols_group'
    }
}