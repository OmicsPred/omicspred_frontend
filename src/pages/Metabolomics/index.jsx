import { useParams } from 'react-router-dom';
import DataTable from '../../components/table/DataTable';

function Metabolomics() {
    let { platform } = useParams();


    const cohort_valueGetter = function(row,cohort,method) {
        let result = '';
        let cohort_label = cohort+'_'+method;
        if (row.performance_data) {
            if (row.performance_data[cohort_label]) {
            result = row.performance_data[cohort_label].estimate;
            }
        }  
        return result;
    }

    const url_suffix = "test/metabolite/search?platform="+platform;

    const columns = {
        'Metabolon': [
            { field: 'id', headerName: 'OmicsPred ID', width: 300 },
            { 
                field: 'metabolon_id', 
                headerName: 'Metabolon ID',
                width: 300,
                valueGetter: (params) => {
                    let result = '';
                    if (params.row.metabolites) {
                        if (params.row.metabolites[0]) {
                        result = params.row.metabolites[0].external_id;
                        }
                    }  
                    return result;
                }
            },
            { 
                field: 'metabolite_name', 
                headerName: 'Biochemical Name',
                width: 300,
                valueGetter: (params) => {
                    let result = '';
                    if (params.row.metabolites) {
                        if (params.row.metabolites[0]) {
                        result = params.row.metabolites[0].name;
                        }
                    }  
                    return result;
                }
            },
            { 
                field: 'pathway_group', 
                headerName: 'Pathway',
                width: 300,
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
            { 
                field: 'pathway_subgroup', 
                headerName: 'Sub Pathway',
                width: 300,
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
            },
            { field: 'variants_number', headerName: '#SNP' },
            { 
                field: 'INTERVAL_R2', 
                headerName: 'INTERVAL R2',
                // width: 300,
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'INTERVAL','R2');
                }
            },
            { 
                field: 'INTERVAL_Rho', 
                headerName: 'INTERVAL Rho',
                // width: 300,
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'INTERVAL','Rho');
                }
            },
            { 
                field: 'INTERVAL_withheld_subset_R2', 
                headerName: 'INTERVAL withheld subset R2',
                // width: 300,
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'INTERVAL withheld subset','R2');
                }
            },
            { 
                field: 'INTERVAL_withheld_subset_Rho', 
                headerName: 'INTERVAL withheld subset Rho',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'INTERVAL withheld subset','Rho');
                }
            },
            { 
                field: 'ORCADES_R2', 
                headerName: 'ORCADES R2',
                // width: 300,
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'ORCADES','R2');
                }
            },
            { 
                field: 'ORCADES_Rho', 
                headerName: 'ORCADES Rho',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'ORCADES','Rho');
                }
            },
            { 
                field: 'ORCADES_Missing Rate', 
                headerName: 'ORCADES Missing Rate',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'ORCADES','Missing Rate');
                }
            }
        ],
        'Nightingale': [
            { field: 'id', headerName: 'OmicsPred ID', width: 300 },
            { 
                field: 'metabolite_name', 
                headerName: 'Biochemical Name',
                width: 300,
                valueGetter: (params) => {
                    let result = '';
                    if (params.row.metabolites) {
                        if (params.row.metabolites[0]) {
                        result = params.row.metabolites[0].name;
                        }
                    }  
                    return result;
                }
            },
            { 
                field: 'pathway_group', 
                headerName: 'Pathway',
                width: 300,
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
            { 
                field: 'pathway_subgroup', 
                headerName: 'Sub Pathway',
                width: 300,
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
            },
            { field: 'variants_number', headerName: '#SNP' },
            { 
                field: 'INTERVAL_R2', 
                headerName: 'INTERVAL R2',
                // width: 300,
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'INTERVAL','R2');
                }
            },
            { 
                field: 'INTERVAL_Rho', 
                headerName: 'INTERVAL Rho',
                // width: 300,
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'INTERVAL','Rho');
                }
            },
            { 
                field: 'UKB_R2', 
                headerName: 'UKB R2',
                // width: 300,
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'UKB','R2');
                }
            },
            { 
                field: 'UKB_Rho', 
                headerName: 'UKB Rho',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'UKB','Rho');
                }
            },
            { 
                field: 'ORCADES_R2', 
                headerName: 'ORCADES R2',
                // width: 300,
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'ORCADES','R2');
                }
            },
            { 
                field: 'ORCADES_Rho', 
                headerName: 'ORCADES Rho',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'ORCADES','Rho');
                }
            },
            { 
                field: 'ORCADES_Missing Rate', 
                headerName: 'ORCADES Missing Rate',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'ORCADES','Missing Rate');
                }
            },
            { 
                field: 'VIKING_R2', 
                headerName: 'VIKING R2',
                // width: 300,
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'VIKING','R2');
                }
            },
            { 
                field: 'VIKING_Rho', 
                headerName: 'VIKING Rho',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'VIKING','Rho');
                }
            },
            { 
                field: 'VIKING_Missing Rate', 
                headerName: 'VIKING Missing Rate',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'VIKING','Missing Rate');
                }
            },
            { 
                field: 'MEC-CN_R2', 
                headerName: 'MEC-CN R2',
                // width: 300,
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'MEC-CN','R2');
                }
            },
            { 
                field: 'MEC-CN_Rho', 
                headerName: 'MEC-CN Rho',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'MEC-CN','Rho');
                }
            },
            { 
                field: 'MEC-CN_Missing Rate', 
                headerName: 'MEC-CN Missing Rate',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'MEC-CN','Missing Rate');
                }
            },
            { 
                field: 'MEC-IN_R2', 
                headerName: 'MEC-IN R2',
                // width: 300,
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'MEC-IN','R2');
                }
            },
            { 
                field: 'MEC-IN_Rho', 
                headerName: 'MEC-IN Rho',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'MEC-IN','Rho');
                }
            },
            { 
                field: 'MEC-IN_Missing Rate', 
                headerName: 'MEC-IN Missing Rate',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'MEC-IN','Missing Rate');
                }
            },
            { 
                field: 'MEC-MA_R2', 
                headerName: 'MEC-MA R2',
                // width: 300,
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'MEC-MA','R2');
                }
            },
            { 
                field: 'MEC-MA_Rho', 
                headerName: 'MEC-MA Rho',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'MEC-MA','Rho');
                }
            },
            { 
                field: 'MEC-MA_Missing Rate', 
                headerName: 'MEC-MA Missing Rate',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'MEC-MA','Missing Rate');
                }
            }
        ]
    }


  return (
    <div>
      <DataTable url={url_suffix} columns={columns[platform]}/>
    </div>
  );
}


export default Metabolomics