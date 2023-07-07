import { useParams } from 'react-router-dom';
import DataTable from '../../components/table/DataTable';

function Proteomics() {
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

    const url_suffix = "test/protein/search?platform="+platform;

    const columns = {
        'Olink': [
            { field: 'id', headerName: 'OmicsPred ID', width: 300 },
            { 
                field: 'uniprot_id', 
                headerName: 'UniProt ID',
                width: 300,
                valueGetter: (params) => {
                    let result = '';
                    if (params.row.proteins) {
                        let pr_ids = [];
                        for (let i=0; i<params.row.proteins.length; i++) {
                            pr_ids.push(params.row.proteins[i].external_id);
                        }
                        result = pr_ids.join(';');
                    }
                    return result;
                }
            },
            { 
                field: 'gene_name', 
                headerName: 'Gene',
                width: 300,
                valueGetter: (params) => {
                    let result = '';
                    if (params.row.genes) {
                        let gene_names = [];
                        for (let i=0; i<params.row.genes.length; i++) {
                            gene_names.push(params.row.genes[i].name);
                        }
                        result = gene_names.join(';');
                    }
                    return result;
                }
            },
            { 
                field: 'protein_name', 
                headerName: 'Protein',
                width: 300,
                valueGetter: (params) => {
                    let result = '';
                    if (params.row.proteins) {
                        let pr_names = [];
                        for (let i=0; i<params.row.proteins.length; i++) {
                            pr_names.push(params.row.proteins[i].name);
                        }
                        result = pr_names.join(';');
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
                field: 'NSPHS_R2', 
                headerName: 'NSPHS R2',
                // width: 300,
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'NSPHS','R2');
                }
            },
            { 
                field: 'NSPHS_Rho', 
                headerName: 'NSPHS Rho',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'NSPHS','Rho');
                }
            },
            { 
                field: 'NSPHS_Missing Rate', 
                headerName: 'NSPHS Missing Rate',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'NSPHS','Missing Rate');
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
        'Somalogic': [
            { field: 'id', headerName: 'OmicsPred ID', width: 300 },
            { 
                field: 'uniprot_id', 
                headerName: 'UniProt ID',
                width: 300,
                valueGetter: (params) => {
                    let result = '';
                    if (params.row.proteins) {
                        let pr_ids = [];
                        for (let i=0; i<params.row.proteins.length; i++) {
                            pr_ids.push(params.row.proteins[i].external_id);
                        }
                        result = pr_ids.join(';');
                    }
                    return result;
                }
            },
            { 
                field: 'gene_name', 
                headerName: 'Gene',
                width: 300,
                valueGetter: (params) => {
                    let result = '';
                    if (params.row.genes) {
                        let gene_names = [];
                        for (let i=0; i<params.row.genes.length; i++) {
                            gene_names.push(params.row.genes[i].name);
                        }
                        result = gene_names.join(';');
                    }
                    return result;
                }
            },
            { 
                field: 'protein_name', 
                headerName: 'Protein',
                width: 300,
                valueGetter: (params) => {
                    let result = '';
                    if (params.row.proteins) {
                        let pr_names = [];
                        for (let i=0; i<params.row.proteins.length; i++) {
                            pr_names.push(params.row.proteins[i].name);
                        }
                        result = pr_names.join(';');
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
                field: 'FENLAND_R2', 
                headerName: 'FENLAND R2',
                // width: 300,
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'FENLAND','R2');
                }
            },
            { 
                field: 'FENLAND_Rho', 
                headerName: 'FENLAND Rho',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'FENLAND','Rho');
                }
            },
            { 
                field: 'FENLAND_Missing Rate', 
                headerName: 'FENLAND Missing Rate',
                valueGetter: (params) => {
                    return cohort_valueGetter(params.row,'FENLAND','Missing Rate');
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
    <div className="App">
      <DataTable url={url_suffix} columns={columns[platform]}/>
    </div>
  );
}


export default Proteomics