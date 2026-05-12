// import { GridColumnHeaderParams } from '@mui/x-data-grid';
import { Stack } from "react-bootstrap-icons";
import Href from '../../Href';
import { ToggleDiv, thousandifyNumber, participantsHeader, participantsBadge } from '../../../components/Generic';
import { display_cohort, display_efo_description } from '../../../components/Common';
import { common_cols, common_data_cols, molecular_trait_header, omicspred_internal_link } from "./common";
import { ancestry_cols } from './ancestry';


export const default_cell_value = process.env.DEFAULT_CELL_VALUE;

const data_separator = ', ';

const omicspred_id_old_col = {...common_cols['omicspred_id'], field: 'score_id'}

const omicspred_id_col = {...common_cols['omicspred_id'], field: 'score__id'}
const publication_col = {...common_cols['publication'], field: 'dataset__publication__id'}
const platform_type_col = {...common_cols['platform_type'], field: 'dataset__platform__platform_master__type'}
const platform_name_col = {...common_cols['platform_name'], field: 'dataset__platform__name'}
const ancestry_col = {...ancestry_cols['ancestries'], field: 'samples__ancestry_broad'};
const publication_phewas_col = {...common_cols['publication'], headerName: 'PheWAS Publication'}
// const phewas_count_col = {...common_cols['phewas_count'], sortable: false}
// const phewas_count_col = {...common_cols['phewas_count'], field: 'phenotype_scores_count'}
const phewas_phenotype_label_col = {...common_cols['phenotype_label'], field: 'phenotypes__label'}
const phewas_phenotype_id_col = {...common_cols['phenotype_id'], field: 'phenotypes__id'}


const molecular_traits = function(mt_entry, mt_type, index) {
    const mt_label = mt_entry.name ? mt_entry.name : mt_entry.external_id;
    const mt_id = mt_entry.external_id ? mt_entry.external_id : mt_entry.name;
    let mt_url = "/"+mt_type+"/"+mt_id;
    return (
        <span key={mt_id+'_'+mt_type}>{index ? ', ': ''}<Href href={mt_url} text={mt_label}/></span>
    )
}


export const phenotypes_columns = [
    {
        field: 'label',
        headerName: 'Phenotype name',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            const phenotype = params.row;
            return omicspred_internal_link({'id': phenotype.id, 'label': phenotype.label},'phenotype');
        },
        valueGetter: (value) => { return value }
    },
    {
        field: 'id',
        headerName: 'Phenotype ID',
        minWidth: 160,
        flex: 1,
        renderCell: (params) => {
            const tissue_id = params.row.id;
            const tissue_url = params.row.url;
            return <Href href={tissue_url} text={tissue_id} />;
        },
        valueGetter: (value) => { return value }
    },
    {
        field: 'category',
        headerName: 'Category',
        minWidth: 160,
        flex: 1,
        renderCell: (params) => {
            if (params.row.category) {
                return params.row.category.join(', ');
            }
            return default_cell_value;
        },
        valueGetter: (value) => { return value.join(', ') }
    },
    {
        field: 'description',
        headerName: 'Description',
        minWidth: 450,
        flex: 1,
        sortable: false,
        renderCell: (params) => {
            if (params.row.description && params.row.description != '[]') {
                return display_efo_description(params.row.description);
            }
            return default_cell_value;
        },
        valueGetter: (value) => { return value }
    },
    common_cols['phewas_count']
]


const score_phewas_cols = {
    'omicspred_id': omicspred_id_col,
    'gene': {
        field: 'score__genes__name',
        minWidth: 150,
        flex: 0.5,
        headerName: 'Gene name',
        renderHeader: () => {
            return (molecular_trait_header('Gene'))
        },
        renderCell: (params) => {
            const genes_list =  params.row.score.genes;
            // const genes_list =  params.row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'gene'});
            if (genes_list.length > 0) {
                const genes = genes_list.map((gene, index) => molecular_traits(gene, 'gene', index))
                return <div className="d-inline">{genes}</div>;
            }
            return default_cell_value;
        },
        valueGetter: (value, row) => {
            let gene_names = [];
            // const genes_list =  row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'gene'});
            const genes_list =  row.score.genes;
            gene_names = genes_list.map((gene) => gene.name ? gene.name : gene.external_id);
            return gene_names.join(data_separator);
        }
    },
    'protein': {
        field: 'score__proteins__name',
        minWidth: 150,
        flex: 0.5,
        headerName: 'Protein name',
        renderHeader: () => {
            return (molecular_trait_header('Protein'))
        },
        renderCell: (params) => {
            // const proteins_list =  params.row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'protein'});
            const proteins_list =  params.row.score.proteins;
            if (proteins_list.length > 0) {
                const proteins = proteins_list.map((protein, index) => molecular_traits(protein, 'protein', index))
                return <div className="d-inline">{proteins}</div>;
            }
            return default_cell_value;
        },
        valueGetter: (value, row) => {
            let protein_names = [];
            // const proteins_list =  row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'protein'});
            const proteins_list =  row.score.proteins
            protein_names = proteins_list.map((protein) => protein.name ? protein.name : protein.external_id);
            return protein_names.join(data_separator);
        }
    },
    'metabolite': {
        field: 'score__metabolites__name',
        minWidth: 150,
        flex: 0.5,
        headerName: 'Metabolite name',
        renderHeader: () => {
            return (molecular_trait_header('Metabolite'))
        },
        renderCell: (params) => {
            // const metabolites_list =  params.row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'metabolite'});
            const metabolites_list =  params.row.score.metabolites;
            if (metabolites_list.length > 0) {
                const metabolites = metabolites_list.map((metabolite, index) => molecular_traits(metabolite, 'metabolite', index))
                return <div className="d-inline">{metabolites}</div>;
            }
            return default_cell_value;
        },
        valueGetter: (value, row) => {
            let metabolite_names = [];
            // const metabolites_list = row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'metabolite'});
            const metabolites_list = row.score.metabolites;
            metabolite_names = metabolites_list.map((metabolite) => metabolite.name ? metabolite.name : metabolite.external_id);
            return metabolite_names.join(data_separator);
        }
    },
    'reported_trait': {
        field: 'trait_reported',
        headerName: 'Reported trait',
        width: 120,
        renderCell: (params) => {
            const trait_reported = params.row.trait_reported;
            if (trait_reported) {
                return trait_reported;
            }
            return default_cell_value;
        },
        valueGetter: (value, row) => {
            return row.trait_reported;
        }
    },
    'gwas_catalog': {
        field: 'samples__source_gwas_catalog',
        headerName: 'GWAS Catalog',
        width: 145,
        renderCell: (params) => {
            const gcst_ids = params.row.samples.reduce(function(result, sample) {
                const gcst = sample.source_gwas_catalog;
                if (gcst && !result.includes(gcst)) {
                    result.push(gcst);
                }
                return result;
            }, []);
            if (gcst_ids.length != 0) {
                return gcst_ids.map((gcst_id) => <Href key={gcst_id} text={gcst_id} href={'https://www.ebi.ac.uk/gwas/studies/'+gcst_id}/>);
            }
            return default_cell_value;

            // a = [... new Set(a)];
        },
        valueGetter: (value, row) => {
            const gcst_ids = row.samples.map((sample) => sample.source_gwas_catalog);
            return gcst_ids.join(', ');
        }
    },
    'method_description': {
        field: 'method_description',
        headerName: 'Method Description',
        description: 'Method used to calculate the PheWAS',
        width: 150,
         valueGetter: (value) => {
            return value;
        }
    },
    // 'sample_age': {
    //     field: 'sample__sample_age',
    //     headerName: 'Mean Age',
    //     width: 120,
    //     renderCell: (params) => {
    //         const sample = params.row.sample;
    //         if (sample.sample_age) {
    //             let value = sample.sample_age;
    //             if (sample.sample_age_sd) {
    //                 value += ' ± '+sample.sample_age_sd;
    //             }
    //             return value;
    //         }
    //         return default_cell_value;
    //     },
    //     valueGetter: (value, row) => {
    //         return row.sample.sample_age;
    //     }
    // },
    'sample_number': {
        field: 'samples__sample_number',
        headerName: 'Sample',
        width: 115,
        renderCell: (params) => {
            const samples = params.row.samples;
            let sample_number = 0;
            let sample_cases = 0;
            let sample_controls = 0;
            for (let i=0; i<samples.length; i++) {
                const sample = samples[i]
                if (sample.sample_number) {
                    sample_number += sample.sample_number;
                }
                if (sample.sample_cases) {
                    sample_cases += sample.sample_cases;
                }
                if (sample.sample_controls) {
                    sample_controls += sample.sample_controls;
                }
            }
            if (sample_number) {
                if (sample_cases || sample_controls) {
                    return <ToggleDiv content={<ul className='ps-3'>{sample_cases ? <li>Cases: {thousandifyNumber(sample_cases)}</li>:''}{sample_controls ? <li>Controls: {thousandifyNumber(sample_controls)}</li>:''}</ul>} title={participantsHeader(sample_number)}/>;
                }
                return participantsHeader(sample_number,true);
            }
        },
        valueGetter: (value, row) => {
            const sample_numbers = row.samples.map((sample) => sample.sample_number);
            return sample_numbers.reduce((a,b)=>a+b);
        }
    },
    // 'sample_percent_male': {
    //     field: 'sample__sample_percent_male',
    //     headerName: '%Male',
    //     width: 80,
    //     renderCell: (params) => {
    //         if (params.row.sample.sample_percent_male) {
    //             return params.row.sample.sample_percent_male+'%';
    //         }
    //         return default_cell_value;
    //     },
    //     valueGetter: (value, row) => {
    //         return row.sample.sample_percent_male;
    //     }
    // },
    'cohort': {
        field: 'samples__cohorts',
        headerName: 'Cohort',
        width: 80,
        renderCell: (params) => {
            const samples = params.row.samples;
            let cohorts = {}
            for (let i=0; i<samples.length; i++) {
                const cohort = samples[i].cohorts[0];
                cohorts[cohort.name_short] = cohort
            }
            return Object.keys(cohorts).map((cohort_name) =>  <span key={cohort_name}>{display_cohort(cohorts[cohort_name])}</span>)
        },
        valueGetter: (value, row) => {
            const samples = row.samples;
            let cohorts = {}
            for (let i=0; i<samples.length; i++) {
                const cohort = samples[i].cohorts[0];
                cohorts[cohort.name_short] = cohort.name_short
            }
            return Object.keys(cohorts).join(', ');
        }
    },
    'platform_type': platform_type_col,
    'platform_name': platform_name_col
}


const values_cols = [
    // common_data_cols['r2'],
    // common_data_cols['bonferroni'],
    common_data_cols['effect_size'],
    common_data_cols['hazard_ratio'],
    common_data_cols['z-score'],
    common_data_cols['p-value'],
    common_data_cols['adjusted_p-value'],
    common_data_cols['var_gene_exp'],
    score_phewas_cols['method_description']
]


const phenotype_dataset_cols_prefix = [
    score_phewas_cols['omicspred_id'],
    phewas_phenotype_label_col,
    phewas_phenotype_id_col,
    score_phewas_cols['reported_trait'],
    score_phewas_cols['gwas_catalog'],
    publication_phewas_col,
    ancestry_col,
    score_phewas_cols['gene'],
    score_phewas_cols['protein'],
    score_phewas_cols['metabolite'],
    score_phewas_cols['cohort'],
]
export const phenotype_dataset_cols = phenotype_dataset_cols_prefix.concat(values_cols)


const phewas_cols_prefix = [
    score_phewas_cols['omicspred_id'],
    score_phewas_cols['gene'],
    score_phewas_cols['protein'],
    score_phewas_cols['metabolite'],
    phewas_phenotype_label_col,
    phewas_phenotype_id_col,
    score_phewas_cols['reported_trait'],
    score_phewas_cols['gwas_catalog'],
    common_cols['publication'],
    ancestry_col,
    score_phewas_cols['sample_number'],
    score_phewas_cols['cohort']
]
export const phewas_cols = phewas_cols_prefix.concat(values_cols)


const phenotype_score_cols_prefix = [
    phewas_phenotype_label_col,
    phewas_phenotype_id_col,
    score_phewas_cols['reported_trait'],
    score_phewas_cols['gwas_catalog'],
    publication_phewas_col,
    ancestry_col,
    // score_phewas_cols['sample_age'],
    score_phewas_cols['sample_number'],
    // score_phewas_cols['sample_percent_male'],
    score_phewas_cols['cohort']
]
export const phenotype_score_cols = phenotype_score_cols_prefix.concat(values_cols)


const phenotype_cols_prefix = [
    score_phewas_cols['omicspred_id'],
    score_phewas_cols['gene'],
    score_phewas_cols['protein'],
    score_phewas_cols['metabolite'],
    score_phewas_cols['platform_type'],
    score_phewas_cols['platform_name'],
    score_phewas_cols['reported_trait'],
    score_phewas_cols['gwas_catalog'],
    publication_phewas_col,
    ancestry_col,
    // score_phewas_cols['sample_age'],
    score_phewas_cols['sample_number'],
    // score_phewas_cols['sample_percent_male'],
    score_phewas_cols['cohort'],
    publication_col
]
export const phenotype_cols = phenotype_cols_prefix.concat(values_cols)




//////////////////
//  DEPRECATED  //
////////////////// 
// const gene_no_sort = {...applications_cols['gene'], sortable: false}
// const protein_no_sort = {...applications_cols['protein'], sortable: false}
// const metabolite_no_sort = {...applications_cols['metabolite'], sortable: false}

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
                const genes = genes_list.map((gene, index) => molecular_traits(gene, 'gene', index))
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
                const proteins = proteins_list.map((protein, index) => molecular_traits(protein, 'protein', index))
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
                const metabolites = metabolites_list.map((metabolite, index) => molecular_traits(metabolite, 'metabolite', index))
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
        headerName: 'Sample',
        width: 125,
        renderCell: (params) => {
            const sample = params.row.sample;
            if (sample && sample.sample_number) {
                if (sample.sample_cases) {
                    return <ToggleDiv content={<ul className='ps-3'><li>Cases: {thousandifyNumber(sample.sample_cases)}</li>{sample.sample_controls ? <li>Controls: {thousandifyNumber(sample.sample_controls)}</li>:''}</ul>} title={participantsHeader(sample.sample_number)}/>;
                }
            }
            else {
                return participantsBadge(sample.sample_number,true)
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
    }
}


let base_phenotype_columns = {
    'Full': [
        common_cols['phenotype_id'],
        common_cols['phenotype_label'],
        common_cols['phenotype_category'],
        omicspred_id_old_col,
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
        common_cols['phenotype_label'],
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
    common_cols['phenotype_label'],
    common_cols['phenotype_category'],
    applications_cols['cohort'],
    // common_data_cols['r2'],
    common_data_cols['hazard_ratio'],
    common_data_cols['fdr']
]