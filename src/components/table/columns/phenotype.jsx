// import { GridColumnHeaderParams } from '@mui/x-data-grid';
import { Stack } from "react-bootstrap-icons";
import Href from '../../Href';
import { ToogleDiv, thousandifyNumber, participantsHeader, participantsBadge } from '../../../components/Generic';
import { display_cohort } from '../../../components/Common';
import { common_cols, common_data_cols, molecular_trait_header } from "./common";

export const default_cell_value = process.env.DEFAULT_CELL_VALUE;

const data_separator = ', ';

const omicspred_id_col = {...common_cols['omicspred_id'], field: 'score_id'}


const application_molecular_traits = function(mt_entry, mt_type, index) {
    const mt_label = mt_entry.name ? mt_entry.name : mt_entry.external_id;
    const mt_id = mt_entry.external_id ? mt_entry.external_id : mt_entry.name;
    let mt_url = "/"+mt_type+"/"+mt_id;
    return (
        <span key={mt_id+'_'+mt_type}>{index ? ', ': ''}<Href href={mt_url} text={mt_label}/></span>
    )
}


export const applications_cols = {
    'gene': {
        field: 'genes__name',
        minWidth: 150,
        flex: 0.5,
        headerName: 'Gene name',
        renderHeader: () => {
            return (molecular_trait_header('Gene'))
        },
        renderCell: (params) => {
            const genes_list =  params.row.genes;
            // const genes_list =  params.row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'gene'});
            if (genes_list.length > 0) {
                const genes = genes_list.map((gene, index) => application_molecular_traits(gene, 'gene', index))
                return <div className="d-inline">{genes}</div>;
            }
            return default_cell_value;
        },
        valueGetter: (value, row) => {
            let gene_names = [];
            // const genes_list =  row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'gene'});
            const genes_list =  row.genes;
            gene_names = genes_list.map((gene) => gene.name ? gene.name : gene.external_id);
            return gene_names.join(data_separator);
        }
    },
    'protein': {
        field: 'proteins__name',
        minWidth: 150,
        flex: 0.5,
        headerName: 'Protein name',
        renderHeader: () => {
            return (molecular_trait_header('Protein'))
        },
        renderCell: (params) => {
            // const proteins_list =  params.row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'protein'});
            const proteins_list =  params.row.proteins;
            if (proteins_list.length > 0) {
                const proteins = proteins_list.map((protein, index) => application_molecular_traits(protein, 'protein', index))
                return <div className="d-inline">{proteins}</div>;
            }
            return default_cell_value;
        },
        valueGetter: (value, row) => {
            let protein_names = [];
            // const proteins_list =  row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'protein'});
            const proteins_list =  row.proteins
            protein_names = proteins_list.map((protein) => protein.name ? protein.name : protein.external_id);
            return protein_names.join(data_separator);
        }
    },
    'metabolite': {
        field: 'metabolites__name',
        minWidth: 150,
        flex: 0.5,
        headerName: 'Metabolite name',
        renderHeader: () => {
            return (molecular_trait_header('Metabolite'))
        },
        renderCell: (params) => {
            // const metabolites_list =  params.row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'metabolite'});
            const metabolites_list =  params.row.metabolites;
            if (metabolites_list.length > 0) {
                const metabolites = metabolites_list.map((metabolite, index) => application_molecular_traits(metabolite, 'metabolite', index))
                return <div className="d-inline">{metabolites}</div>;
            }
            return default_cell_value;
        },
        valueGetter: (value, row) => {
            let metabolite_names = [];
            // const metabolites_list = row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'metabolite'});
            const metabolites_list = row.metabolites;
            metabolite_names = metabolites_list.map((metabolite) => metabolite.name ? metabolite.name : metabolite.external_id);
            return metabolite_names.join(data_separator);
        }
    },
    'sample_age': {
        field: 'sample_age',
        headerName: 'Mean Age',
        width: 120,
        renderCell: (params) => {
            const sample = params.row.sample;
            if (sample.sample_age) {
                let value = sample.sample_age;
                if (sample.sample_age_sd) {
                    value += ' ± '+sample.sample_age_sd;
                }
                return value;
            }
        },
        valueGetter: (value, row) => {
            return row.sample.sample_age;
        }
    },
    'sample_number': {
        field: 'sample_number',
        headerName: 'Samples',
        width: 150,
        renderCell: (params) => {
            const sample = params.row.sample;
            if (sample && sample.sample_number) {
                if (sample.sample_cases) {
                    return <ToogleDiv content={<ul className='ps-3'><li>Cases: {thousandifyNumber(sample.sample_cases)}</li>{sample.sample_controls ? <li>Controls: {thousandifyNumber(sample.sample_controls)}</li>:''}</ul>} title={participantsHeader(sample.sample_number)}/>;
                }
            }
            else {
                return participantsBadge(sample.sample_number)
            }
        },
        valueGetter: (value, row) => {
            return row.sample.sample_number;
        }
    },
    'sample_percent_female': {
        field: 'sample_percent_female',
        headerName: '%Female',
        width: 100,
        renderCell: (params) => {
            if (params.row.sample.sample_percent_female) {
                return params.row.sample.sample_percent_female+'%';
            }
        }
        ,
        valueGetter: (value, row) => {
            return row.sample.sample_percent_female;
        }
    },
    'cohort': {
        field: 'cohort',
        headerName: 'Cohort',
        width: 100,
        renderCell: (params) => {
            const cohort = params.row.cohort;
            if (cohort.name_short == cohort.name_full) {
                return display_cohort(cohort)
            }
            else {
                return <span>{display_cohort(cohort,cohort.name_full)} <small>({cohort.name_short})</small></span>;
            }
        }
        ,
        valueGetter: (value, row) => {
            return row.cohort.name_short;
        }
    },
}

// const gene_no_sort = {...applications_cols['gene'], sortable: false}
// const protein_no_sort = {...applications_cols['protein'], sortable: false}
// const metabolite_no_sort = {...applications_cols['metabolite'], sortable: false}

let base_phenotype_columns = {
    'Full': [
        common_cols['phenotype_id'],
        common_cols['phenotype_name'],
        common_cols['phenotype_category'],
        omicspred_id_col,
        // common_data_cols['r2'],
        applications_cols['cohort'],
        common_cols['platform_type'],
        common_cols['platform_name'],
        // gene_no_sort,
        // protein_no_sort,
        // metabolite_no_sort,
        applications_cols['gene'],
        applications_cols['protein'],
        applications_cols['metabolite'],
        common_data_cols['hazard_ratio'],
        common_data_cols['fdr']
    ],
    'Sum': [
        common_cols['phenotype_id'],
        common_cols['phenotype_name'],
        common_cols['phenotype_category'],
        {
            field: 'sample_age',
            headerName: 'Mean Age',
            width: 120,
            renderCell: (params) => {
                if (params.row.sample_age) {
                    let value = params.row.sample_age;
                    if (params.row.sample_age_sd) {
                        value += ' ± '+params.row.sample_age_sd;
                    }
                    return value;
                }
            }
        },
        {
            field: 'sample_cases',
            headerName: '#Cases/#Samples',
            width: 150,
            renderCell: (params) => {
                if (params.row.sample_cases) {
                    let value = params.row.sample_cases;
                    if (params.row.sample_number) {
                        value += '/'+params.row.sample_number;
                    }
                    return value;
                }
            }
        },
        {
            field: 'sample_percent_female',
            headerName: '%Female',
            width: 100,
            renderCell: (params) => {
                if (params.row.sample_percent_female) {
                    return params.row.sample_percent_female+'%';
                }
            }
        },
    ]
}

const build_columns = () => {
    // const platform_list = {"Somalogic": "Prote","Olink","Metabolon","Nightingale","Illumina RNAseq"];

    const platform_list = {
        "Somalogic": "Proteomics",
        "Olink": "Proteomics",
        "Metabolon": "Metabolomics",
        "Nightingale": "Metabolomics",
        "Illumina RNAseq": "Transcriptomics"
    };
    const platform_names = Object.keys(platform_list);
    for (let i=0; i< platform_names.length; i++) {
        const platform = platform_names[i];
        const omics_type = platform_list[platform];
        let platform_idx = platform.toLowerCase();
        platform_idx = platform_idx.replace(' ','_');
        base_phenotype_columns['Sum'].push(
            {
                field: platform_idx,
                // headerName: platform,
                description: 'Number of scores associated with '+platform,
                width: 150,
                sortable: false,
                renderHeader: () => {
                    return (<span><Stack size="0.9em" className={"align-middle me-2 color_"+omics_type}/><span className="align-middle fw-bold">{platform}</span></span>)
                },
                renderCell: (params) => {
                    let platform_count = 0;
                    if (params.row.platform_counts) {
                        if (params.row.platform_counts[platform]) {
                            platform_count = params.row.platform_counts[platform];
                        }
                    }
                    return platform_count > 0 ? <span className="fw-bold">{platform_count}</span> : <span style={{fontWeight:'200'}}>{platform_count}</span>
                }
            },
        )
    }
    return base_phenotype_columns;
}


export const phenotype_columns = build_columns();


export const score_phenotype_columns = [
    common_cols['phenotype_id'],
    common_cols['phenotype_name'],
    common_cols['phenotype_category'],
    applications_cols['cohort'],
    // common_data_cols['r2'],
    common_data_cols['hazard_ratio'],
    common_data_cols['fdr']
]