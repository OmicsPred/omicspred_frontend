import { FileEarmarkText, Hr } from 'react-bootstrap-icons';
import { internal_publication_link } from '../../Common';
import { thousandifyNumber, ToogleDiv } from '../../Generic';
import Href from '../../Href';

const default_cell_value = process.env.DEFAULT_CELL_VALUE;

const data_separator = ', ';
const display_threshold = 10;

export const cohort_valueGetter = function(row,cohort,method) {
    let result = '';
    let cohort_label = cohort+'_'+method;
    if (row.performance_data) {
        if (row.performance_data[cohort_label]) {
            result = row.performance_data[cohort_label].estimate;
        }
    }
    else if (row.score_performance) {
        for (let i=0; i<row.score_performance.length; i++) {
            const perf = row.score_performance[i];
            if (perf.cohort_label==cohort) {
                for (let j=0; j<perf.performance_metrics.length; j++) {
                    const pm = perf.performance_metrics[j];
                    if (pm.name_short==method) {
                        result = pm.estimate;
                        break;
                    }
                }
            }
        }
    }
    if (!result || result == '') {
        result = default_cell_value;
    }
    return result;
}

export const inline_rendering = function(content) {
    return <div className="d-inline">{content}</div>
}


export const omicspred_omics_type = function(type) {
    return (
        <span className={"border_left_mark border_color_"+type}>{type}</span>
    )
}


export const omicspred_internal_link = function(op_entry,type,index) {
    const op_label = op_entry['label'];
    const op_id = (op_entry['id']) ? op_entry['id'] : op_entry['label']
    let op_url = "/"+type+"/"+op_id
    op_url = op_url.replace('.','_');
    return (
        <span key={op_id+'_'+type+'_span'}>
            {index ? ', ': ''}<Href key={op_id+'_'+type} href={op_url} text={op_label}/>
        </span>
    )
}


export const omicspred_internal_links = function(op_data,type) {
    if (op_data.length) {
        const content = op_data.map((op_entry, index) => omicspred_internal_link(op_entry, type, index))
        if (op_data.length == 1) {
            return content
        }
        else {
            return inline_rendering(content);
        }
    }
    else {
        return default_cell_value
    }
}


export const omicspred_external_link = function(op_entry,index) {
    const op_label = op_entry['label'];
    const op_id = (op_entry['id']) ? op_entry['id'] : op_entry['label']

    if (op_entry['source'] && op_entry['source'].toLowerCase() == 'reactome') {
        const url = process.env.URL_REACTOME_ENTRY+op_id;
        return (
            <span key={op_id+'_span'}>
                {index ? ', ': ''}<Href key={op_id+'_a'} href={url} text={op_label}/>
            </span>
        )
    }
    else {
        return <span key={op_id+'_span'}>{index ? ', ': ''}{op_label}</span>
    }
}


export const omicspred_external_links = function(op_data) {
    if (op_data.length) {
        const content = op_data.map((op_entry, index) => omicspred_external_link(op_entry, index))
        if (op_data.length == 1) {
            return content
        }
        else {
            return inline_rendering(content);
        }
    }
    else {
        return default_cell_value
    }
}


export const omicspred_platform_omics_type = function(platform,type) {
    return (
        <a key={platform+'-'+type} href={"/platform/"+platform}><span className={"border_left_mark border_color_"+type}>{platform}</span></a>
    )
}

const sort_objects = function(objects, key) {
    function compare(a, b) {
        a = a[key];
        b = b[key];
        const type = (typeof(a) === 'string' || typeof(b) === 'string') ? 'string' : 'number';
        let result;
        if (type === 'string') {
            result = a.localeCompare(b);
        }
        else {
            result = a - b;
        }
        return result;
    }
    return objects.sort(compare);
}


export const application_molecular_traits = function(mt_entry,index) {
    const mt_label = mt_entry.name ? mt_entry.name : mt_entry.external_id;
    const mt_id = mt_entry.external_id ? mt_entry.external_id : mt_entry.name;
    const mt_type = mt_entry.type
    let mt_url = "/"+mt_type+"/"+mt_id;
    return (
        <span key={mt_id+'_'+mt_type}>{index ? ', ': ''}<Href href={mt_url} text={mt_label}/></span>
    )
}


export const common_cols = {
    'omicspred_id': {
        field: 'id',
        headerName: 'OmicsPred ID',
        minWidth: 150,
        flex: 0.5,
        resizable: false,
        hideable: false,
        renderCell: (params) => {
            let op_id = params.row.id;
            if (params.row.score_id) {
                op_id = params.row.score_id;
            }
            return omicspred_internal_link({'label': op_id},'score')
        },
        valueGetter: (params) => {
            let op_id = params.row.id;
            if (params.row.score_id) {
                op_id = params.row.score_id;
            }
            return op_id
        }
    },
    'variants_number': { 
        field: 'variants_number', 
        headerName: '#SNP', 
        minWidth: 75, 
        flex: 0.5,
        align: 'right',
        renderCell: (params) => {
            return thousandifyNumber(params.row.variants_number);
        }
    },
    'platform_type': {
        field: 'platform__platform_master__type',
        headerName: 'Omics',
        minWidth: 130,
        flex: 1,
        renderCell: (params) => {
            return omicspred_omics_type(params.row.platform.type);
        },
        valueGetter: (params) => { return params.row.platform.type }
    },
    'platform_name': {
        field: 'platform__name',
        headerName: 'Platform',
        minWidth: 150,
        flex: 0.6,
        renderCell: (params) => {
            return omicspred_internal_link({'label': params.row.platform.name},'platform');
        },
        valueGetter: (params) => { return params.row.platform.name }
    },
    'publication': {
        field: 'publication__firstauthor',
        headerName: 'Publication',
        minWidth: 200,
        flex: 0.8,
        renderCell: (params) => {
            return internal_publication_link (params.row.publication);
        },
        valueGetter: (params) => { return params.row.publication.firstauthor }
    },
    'scoring_file': {
        field: 'scoring_file',
        headerName: 'Scoring File',
        minWidth: 100,
        flex: 0.5,
        renderCell: (params) => {
            return <FileEarmarkText color="blue" size={24}/>;
        }
    },
    'trait_reported_id': {
        field: 'trait_reported_id',
        headerName: 'Trait ID',
        headerClassName: 'col_border_left',
        minWidth: 120,
        flex: 0.5,
        hideable: true
    },
    'trait_reported': {
        field: 'trait_reported',
        headerName: 'Trait name',
        minWidth: 200,
        flex: 1,
        hideable: true
    },
    'protein_id': {
        field: 'proteins__external_id',
        headerName: 'UniProt ID',
        minWidth: 120,
        flex: 0.5,
        hideable: false,
        renderCell: (params) => {
            let pr_ids = [];
            if (params.row.proteins) {
                pr_ids = params.row.proteins.map((protein) => ({'label': protein.external_id}));
            }
            else if (params.row.external_id) {
                pr_ids.push({'label': params.row.external_id});
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
            return pr_ids.join(data_separator);
        }
    },
    'protein_name': {
        field: 'proteins__name',
        headerName: 'Protein Name',
        minWidth: 200,
        flex: 1,
        valueGetter: (params) => {
            let pr_names = [];
            if (params.row.proteins) {
                pr_names = params.row.proteins.map((protein) => protein.name)
            }
            else if (params.row.name) {
                pr_names.push(params.row.name);
            }
            return pr_names.join(data_separator);
        }
    },
    'gene_id': {
        field: 'genes__external_id',
        headerName: 'Ensembl ID',
        width: 200,
        renderCell: (params) => {
            let gene_ids = [];
            if (params.row.genes) {
                gene_ids = params.row.genes.map((gene) => ({'label': gene.external_id}));
            }
            return omicspred_internal_links(gene_ids, 'gene');
        },
        valueGetter: (params) => {
            let gene_ids = '';
            if (params.row.genes) {
                gene_ids = params.row.genes.map((gene) => gene.external_id)
            }
            return gene_ids.join(data_separator);
        }
    },
    'gene_name': {
        field: 'genes__name',
        headerName: 'Gene',
        minWidth: 120,
        flex: 0.5,
        renderCell: (params) => {
            let gene_names = [];
            if (params.row.genes) {
                gene_names = params.row.genes.map((gene) => ({'id': (gene.external_id ? gene.external_id : gene.name),'label': gene.name}))
            }
            gene_names = sort_objects(gene_names,'label');

            if (gene_names.length>display_threshold) {
                return <ToogleDiv content={omicspred_internal_links(gene_names, 'Gene')} title={gene_names.length+' genes'}/>;
            }
            else {
                return omicspred_internal_links(gene_names, 'Gene');
            }
        },
        valueGetter: (params) => {
            let gene_names = [];
            if (params.row.genes) {
                gene_names = params.row.genes.map((gene) => gene.name)
            }
            return gene_names.join(data_separator);
        }
    },
    'gene_id_from_list': {
        field: 'gene_id',
        headerName: 'Gene ID',
        minWidth: 120,
        flex: 0.5,
        renderCell: (params) => {
            return omicspred_internal_link({'label': params.row.external_id} , 'gene');
        },
        valueGetter: (params) => {
            return params.row.external_id;
        }
    },
    'gene_name_from_list': {
        field: 'gene_name',
        headerName: 'Gene',
        minWidth: 120,
        flex: 0.5,
        renderCell: (params) => {
            return omicspred_internal_link({'label': params.row.name}, 'gene');
        },
        valueGetter: (params) => {
            return params.row.name;
        }
    },
    'metabolite_id': {
        field: 'metabolite_id',
        headerName: 'Metabolite ID',
        headerClassName: 'col_border_left',
        minWidth: 150,
        flex: 0.6,
        hideable: false,
        renderCell: (params) => {
            let metabolite_ids = [];
            if (params.row.metabolites) {
                metabolite_ids = params.row.metabolites.map((metabolite) => ({'label': metabolite.external_id}))
            }

            if (metabolite_ids.length>display_threshold) {
                return <ToogleDiv content={omicspred_internal_links(metabolite_ids, 'metabolite')} title={metabolite_ids.length+' metabolites'}/>;
            }
            else {
                return omicspred_internal_links(metabolite_ids, 'metabolite');
            }
        },
        valueGetter: (params) => {
            let metabolite_ids = [];
            if (params.row.metabolites) {
                metabolite_ids = params.row.metabolites.map((metabolite) => metabolite.external_id)
            }
            return metabolite_ids.join(data_separator);
        }
    },
    'metabolite_name': {
        field: 'metabolites__name',
        headerName: 'Metabolite Name',
        headerClassName: 'col_border_right',
        minWidth: 200,
        flex: 1,
        hideable: false,
        renderCell: (params) => {
            let metabolite_names = [];
            let metabolite_labels = [];
            let metabolite_ids = [];
            if (params.row.metabolites) {
                metabolite_names = params.row.metabolites.map((metabolite) => metabolite.name)
                metabolite_labels = params.row.metabolites.map((metabolite) => ({'label': metabolite.name}))
                for (let i=0; i<params.row.metabolites.length; i++) {
                    const id = params.row.metabolites[i].external_id;
                    if (id && id != '') {
                        metabolite_ids.push(id)
                    }
                }
            }
            if (metabolite_ids.length) {
                return metabolite_names.join(data_separator);
            }
            else {
                return omicspred_internal_links(metabolite_labels, 'metabolite');
            }
        },
        valueGetter: (params) => {
            let metabolite_names = [];
            if (params.row.metabolites) {
                metabolite_names = params.row.metabolites.map((metabolite) => metabolite.name)
            }
            return metabolite_names.join(data_separator);
        }
    },
    'metabolite_id_from_list': {
        field: 'metabolite_id',
        headerName: 'Metabolite ID',
        minWidth: 120,
        flex: 0.5,
        renderCell: (params) => {
            return omicspred_internal_link({'label': params.row.external_id}, 'metabolite');
        },
        valueGetter: (params) => {
            return params.row.external_id;
        }
    },
    'metabolite_id_source_from_list': {
        field: 'metabolite_id_source',
        headerName: 'Metabolite ID Source',
        minWidth: 120,
        flex: 0.5,
        renderCell: (params) => {
            return params.row.external_id_source;
        },
        valueGetter: (params) => {
            return params.row.external_id_source;
        }
    },
    'metabolite_name_from_list': {
        field: 'metabolite_name',
        headerName: 'Metabolite',
        minWidth: 120,
        flex: 0.5,
        renderCell: (params) => {
            return omicspred_internal_link({'label': params.row.name}, 'metabolite');
        },
        valueGetter: (params) => {
            return params.row.name;
        }
    },
    'phecode_id': {
        field: 'phecode_id',
        headerName: 'PheCode',
        minWidth: 100,
        flex: 0.5,
        hideable: false,
        renderCell: (params) => {
            let phe_id = params.row.id;
            if (params.row.phecode) {
                phe_id = params.row.phecode.id;
            }
            return omicspred_internal_link({'label': phe_id},'phecode')
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
        field: 'phecode__category',
        headerName: 'Category',
        //width: 200,
        flex: 0.8,
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
    },
    'pathway_id': {
        field: 'pathway_id',
        headerName: 'Pathway ID',
        minWidth: 80,
        flex: 0.4,
        renderCell: (params) => {
            return omicspred_internal_link({'label': params.row.external_id}, 'pathway');
        },
        valueGetter: (params) => {
            return params.row.external_id;
        }
    },
    'pathway_id_source': {
        field: 'pathway_id_source',
        headerName: 'Pathway Source',
        minWidth: 120,
        flex: 0.5,
        renderCell: (params) => {
            const source = params.row.external_id_source;
            return (source == 'Reactome') ? <Href href={process.env.URL_REACTOME_ENTRY+params.row.external_id} text={source}/> : source
        },
        valueGetter: (params) => {
            return params.row.external_id_source;
        }
    },
    'pathway_name': {
        field: 'pathway_name',
        headerName: 'Pathway name',
        minWidth: 150,
        flex: 0.7,
        renderCell: (params) => {
            return params.row.external_id ? params.row.name: omicspred_internal_link({'label': params.row.name}, 'pathway');
        },
        valueGetter: (params) => {
            return params.row.name;
        }
    },
    'superpathway_name': {
        field: 'superpathways_name',
        headerName: 'Top Level Pathway',
        minWidth: 120,
        flex: 0.5,
        renderCell: (params) => {
            let sp_pathways = []
            if (params.row.superpathways) {
                sp_pathways = params.row.superpathways.map((superpathway) => ({'id':superpathway.external_id,'label': superpathway.name, 'source':superpathway.external_id_source}))
                return omicspred_external_links(sp_pathways);
            }
        },
        valueGetter: (params) => {
            const superpathways_list = params.row.superpathways.map((superpathway) => (superpathway.name))
            return superpathways_list.join(data_separator);
        }
    },
    'description': {
        field: 'description',
        headerName: 'Description',
        minWidth: 200,
        flex: 0.8
    },
    'scores_count':{
        field: 'scores_count',
        headerName: '#Scores',
        minWidth: 80, 
        flex: 0.5,
        align: 'right',
        renderCell: (params) => {
            return thousandifyNumber(params.row.scores_count);
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


export const applications_cols = {
    'gene': {
        field: 'gene',
        headerName: 'Gene',
        minWidth: 120,
        flex: 0.5,
        renderCell: (params) => {
            const genes_list =  params.row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'gene'});
            if (genes_list.length > 0) {
                const genes = genes_list.map((gene, index) => application_molecular_traits(gene,index))
                return <div className="d-inline">{genes}</div>;
            }
            return default_cell_value;
        },
        valueGetter: (params) => {
            let gene_names = [];
            const genes_list =  params.row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'gene'});
            gene_names = genes_list.map((gene) => gene.name ? gene.name : gene.external_id);
            return gene_names.join(data_separator);
        }
    },
    'protein': {
        field: 'protein',
        headerName: 'Protein',
        minWidth: 120,
        flex: 0.5,
        renderCell: (params) => {
            const proteins_list =  params.row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'protein'});
            if (proteins_list.length > 0) {
                const proteins = proteins_list.map((protein, index) => application_molecular_traits(protein,index))
                return <div className="d-inline">{proteins}</div>;
            }
            return default_cell_value;
        },
        valueGetter: (params) => {
            let protein_names = [];
            const proteins_list =  params.row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'protein'});
            protein_names = proteins_list.map((protein) => protein.name ? protein.name : protein.external_id);
            return protein_names.join(data_separator);
        }
    },
    'metabolite': {
        field: 'metabolite',
        headerName: 'Metabolite',
        minWidth: 120,
        flex: 0.5,
        renderCell: (params) => {
            const metabolites_list =  params.row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'metabolite'});
            if (metabolites_list.length > 0) {
                const metabolites = metabolites_list.map((metabolite, index) => application_molecular_traits(metabolite,index))
                return <div className="d-inline">{metabolites}</div>;
            }
            return default_cell_value;
        },
        valueGetter: (params) => {
            let metabolite_names = [];
            const metabolites_list =  params.row.molecular_traits.filter(molecular_trait => { return molecular_trait.type == 'metabolite'});
            metabolite_names = metabolites_list.map((metabolite) => metabolite.name ? metabolite.name : metabolite.external_id);
            return metabolite_names.join(data_separator);
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
            headerClassName: ['training_col','col_border_left'],
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
            headerClassName: ['training_col','col_border_left'],
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
            headerClassName: ['training_col','col_border_left'],
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
            headerClassName: ['training_col','col_border_left'],
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
            headerClassName: ['training_col','col_border_left'],
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => {
                return cohort_valueGetter(params.row,'MESA-HIS','R2');
            }
        }
    }
}


export const common_column_groups = {
    'reported_trait': {
        groupId: 'Reported trait',
        children: [{ field: 'trait_reported' }, { field: 'trait_reported_id' }],
        headerClassName: 'col_border_left'
    },
    'metabolomic_mapped_trait': {
        groupId: 'Mapped trait',
        children: [{ field: 'metabolites__name' }, { field: 'metabolite_id' }],
        headerClassName: ['col_border_left','col_border_right']
    },
    'INTERVAL': {
        groupId: 'INTERVAL',
        children: [{ field: 'INTERVAL_R2' }, { field: 'INTERVAL_Rho' }],
        headerClassName: ['training_col','col_border_left']
    },
    'FENLAND': {
        groupId: 'FENLAND',
        children: [{ field: 'FENLAND_R2' }, { field: 'FENLAND_Rho' }, { field: 'FENLAND_Missing Rate' }],
        headerClassName: 'col_border_left'

    },
    'MEC-CN': {
        groupId: 'MEC CN',
        children: [{ field: 'MEC-CN_R2' }, { field: 'MEC-CN_Rho' }, { field: 'MEC-CN_Missing Rate' }],
        headerClassName: 'col_border_left'
    },
    'MEC-IN': {
        groupId: 'MEC IN',
        children: [{ field: 'MEC-IN_R2' }, { field: 'MEC-IN_Rho' }, { field: 'MEC-IN_Missing Rate' }],
        headerClassName: 'col_border_left'
    },
    'MEC-MA': {
        groupId: 'MEC MA',
        children: [{ field: 'MEC-MA_R2' }, { field: 'MEC-MA_Rho' }, { field: 'MEC-MA_Missing Rate' }],
        headerClassName: 'col_border_left'
    },
    'JHS': {
        groupId: 'JHS',
        children: [{ field: 'JHS_R2' }, { field: 'JHS_Rho' }, { field: 'JHS_Missing Rate' }],
        headerClassName: 'col_border_left'
    },
    'NSPHS': {
        groupId: 'NSPHS',
        children: [{ field: 'NSPHS_R2' }, { field: 'NSPHS_Rho' }, { field: 'NSPHS_Missing Rate' }],
        headerClassName: 'col_border_left'
    },
    'ORCADES': {
        groupId: 'ORCADES',
        children: [{ field: 'ORCADES_R2' }, { field: 'ORCADES_Rho' }, { field: 'ORCADES_Missing Rate' }],
        headerClassName: 'col_border_left'
    },
    'INTERVAL_withheld_subset': {
        groupId: 'INTERVAL_withheld_subset',
        children: [{ field: 'INTERVAL_withheld_subset_R2' }, { field: 'INTERVAL_withheld_subset_Rho' }],
        headerClassName: 'col_border_left',
        headerName: 'INTERVAL withheld subset'
    },
    'UKB': {
        groupId: 'UKB',
        children: [{ field: 'UKB_R2' }, { field: 'UKB_Rho' }],
        headerClassName: 'col_border_left'
    },
    'VIKING': {
        groupId: 'VIKING',
        children: [{ field: 'VIKING_R2' }, { field: 'VIKING_Rho' }, { field: 'VIKING_Missing Rate' }],
        headerClassName: 'col_border_left'
    },
    'MESA-AFA': {
        groupId: 'MESA AFA',
        children: [{ field: 'MESA-AFA_R2' },],
        headerClassName: ['training_col','col_border_left']
    },
    'MESA-ALL': {
        groupId: 'MESA ALL',
        children: [{ field: 'MESA-ALL_R2' },],
        headerClassName: ['training_col','col_border_left']
    },
    'MESA-CHN': {
        groupId: 'MESA CHN',
        children: [{ field: 'MESA-CHN_R2' },],
        headerClassName: ['training_col','col_border_left']
    },
    'MESA-EUR': {
        groupId: 'MESA EUR',
        children: [{ field: 'MESA-EUR_R2' },],
        headerClassName: ['training_col','col_border_left']
    },
    'MESA-HIS': {
        groupId: 'MESA HIS',
        children: [{ field: 'MESA-HIS_R2' },],
        headerClassName: ['training_col','col_border_left']
    }
}