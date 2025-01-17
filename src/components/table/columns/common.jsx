import { FileEarmarkText, Stack } from 'react-bootstrap-icons';
import { internal_publication_link, omicspred_omics_type, display_description } from '../../Common';
import { thousandifyNumber, ToogleDiv, ToogleText, TooltipText, scoresBadge } from '../../Generic';
import Href from '../../Href';

export const default_cell_value = process.env.DEFAULT_CELL_VALUE;

const data_separator = ', ';
const display_threshold = 2;

const variant_rate_label = 'Variant Match Rate'

export const cohort_valueGetter = function(row,cohort,method,is_training) {
    let result = '';
    let cohort_label = cohort+'_'+method;
    if (row.performance_data) {
        if (is_training) {
            cohort_label += '__training';
        }
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
        // Only for Training sample with no variant match rate (formely named "missing rate").
        if (method == variant_rate_label && is_training) {
            result = 1
        }
        else {
            result = default_cell_value;
        }
    }
    return result;
}


export const inline_rendering = function(content) {
    return <div className="d-inline">{content}</div>
}


export const omicspred_internal_link = function(op_entry,type,index) {
    const op_label = op_entry['label'];
    const op_id = (op_entry['id']) ? op_entry['id'] : op_entry['label']
    const op_title = (op_entry['desc']) ? op_entry['desc'] : undefined
    let op_url = "/"+type+"/"+op_id
    op_url = op_url.replace('.','_');
    if (op_id && op_label != default_cell_value) {
        return (
            <span key={op_id+'_'+type+'_link'}>
                {index ? ', ': ''}<Href key={op_id+'_'+type} href={op_url} text={op_title ? <TooltipText title={op_title} text={op_label} ttype='link'/> : op_label}/>
            </span>
        )
    }
    else {
        return default_cell_value
    }
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
        <a className="align-middle" key={platform+'-'+type} href={"/platform/"+platform}><Stack size="0.9em" className={"align-middle me-2 color_"+type}/><span className='align-middle'>{platform}</span></a>
    )
    // return (
    //     <a key={platform+'-'+type} href={"/platform/"+platform}><span className={"border_left_mark border_color_"+type}>{platform}</span></a>
    // )
}


export const r2_col_header_label = function() {
    return <span className='fw-bold'>R<sup>2</sup></span>;
}


export const rho_col_header_label = function() {
    return <span className='fw-bold'>Rho</span>;
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


export const common_cols = {
    'omicspred_id': {
        field: 'id',
        headerName: 'OmicsPred ID',
        minWidth: 130,
        flex: 0.5,
        resizable: false,
        hideable: false,
        renderCell: (params) => {
            let op_id = params.row.id;
            if (params.row.associated_opgs_id) {
                op_id = params.row.associated_opgs_id;
            }
            else {
                if (params.row.score_id) {
                    op_id = params.row.score_id;
                }
            }
            return omicspred_internal_link({'label': op_id},'score')
        },
        valueGetter: (value, row) => {
            let op_id = row.id;
            if (row.associated_opgs_id) {
                op_id = row.associated_opgs_id;
            }
            else {
                if (row.score_id) {
                    op_id = row.score_id;
                }
            }
            return op_id
        }
    },
    'variants_number': { 
        field: 'variants_number', 
        headerName: '#SNPs',
        type: 'number',
        minWidth: 70,
        // flex: 0.5,
        align: 'right',
        renderCell: (params) => {
            return <span className="badge rounded-pill badge-op" style={{fontSize:'12px'}} title="# of variants">{thousandifyNumber(params.row.variants_number)}</span>;
        }
    },
    'dataset_name': {
        field: 'dataset_name',
        headerName: 'Dataset name',
        minWidth: 150,
        flex: 1,
        valueGetter: (value, row) => {
            if (row.dataset_name) {
                return row.dataset_name;
            }
            else {
                return default_cell_value;
            }
        }
    },
    'platform_type': {
        field: 'platform__platform_master__type',
        headerName: 'Omics',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            return omicspred_omics_type(params.row.platform.type);
        },
        valueGetter: (value, row) => { return row.platform.type }
    },
    'platform_name': {
        field: 'platform__name',
        headerName: 'Platform',
        minWidth: 140,
        flex: 0.6,
        renderCell: (params) => {
            return omicspred_internal_link({'label': params.row.platform.name},'platform');
        },
        valueGetter: (value, row) => { return row.platform.name }
    },
    'platform_name_icon': {
        field: 'platform__name',
        headerName: 'Platform',
        minWidth: 160,
        flex: 0.6,
        renderCell: (params) => {
            return omicspred_platform_omics_type(params.row.platform.name,params.row.platform.type)
        },
        valueGetter: (value, row) => { return row.platform.name }
    },
    'platform_version': {
        field: 'platform__version',
        headerName: 'Platform version',
        minWidth: 150,
        flex: 0.6,
        renderCell: (params) => {
            if (params.row.platform_version) {
                return params.row.platform_version;
            }
            else {
                return default_cell_value;
            }
        },
        valueGetter: (value, row) => { return row.platform_version }
    },
    'publication': {
        field: 'publication__firstauthor',
        headerName: 'Publication',
        minWidth: 220,
        // flex: 0.8,
        renderCell: (params) => {
            return internal_publication_link(params.row.publication);
        },
        valueGetter: (value, row) => { return row.publication.firstauthor }
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
        headerName: 'Reported trait ID',
        headerClassName: 'col_border_left',
        minWidth: 120,
        flex: 0.5,
        hideable: true
    },
    'trait_reported': {
        field: 'trait_reported',
        headerName: 'Reported trait',
        minWidth: 200,
        flex: 1,
        hideable: true
    },
    'protein_id': {
        field: 'proteins__external_id',
        headerName: 'Protein ID',
        minWidth: 115,
        // minWidth: 120,
        // flex: 0.5,
        hideable: false,
        renderCell: (params) => {
            let pr_ids = [];
            if (params.row.proteins) {
                pr_ids = params.row.proteins.map((protein) => ({
                    'id': protein.external_id ? protein.external_id : protein.name,
                    'label': protein.external_id,
                    'desc': protein.name
                }));
            }
            else if (params.row.external_id) {
                pr_ids.push({
                    'id': params.row.external_id,
                    'label': params.row.external_id,
                    'desc': params.row.name
                });
            }

            if (pr_ids.length>display_threshold) {
                return <ToogleDiv content={omicspred_internal_links(pr_ids, 'Protein')} title={pr_ids.length+' proteins'}/>;
            }
            else if (pr_ids.length > 0) {
                return omicspred_internal_links(pr_ids, 'Protein');
            }
            else {
                return default_cell_value;
            }
        },
        valueGetter: (value, row) => {
            let pr_ids = [];
            if (row.proteins) {
                pr_ids = row.proteins.map((protein) => protein.external_id)
            }
            else if (row.external_id) {
                pr_ids.push(row.external_id);
            }
            return pr_ids.join(data_separator);
        }
    },
    'protein_name': {
        field: 'proteins__name',
        headerName: 'Protein Name',
        minWidth: 300,
        // flex: 1,
        valueGetter: (value, row) => {
            let pr_names = [];
            if (row.proteins) {
                pr_names = row.proteins.map((protein) => protein.name)
            }
            else if (row.name) {
                pr_names.push(row.name);
            }
            return pr_names.join(data_separator);
        }
    },
    'protein_desc': {
        field: 'proteins__descriptions',
        headerName: 'Protein Descriptions',
        minWidth: 300,
        // flex: 1,
        renderCell: (params) => {
            let pr_desc_list = [];
            if (params.row.descriptions) {
                pr_desc_list = display_description(params.row.descriptions)
                // const pr_name = params.row.name ? params.row.name : params.row.external_id;
                // pr_desc_list = params.row.descriptions.map((desc,index) => <ToogleText key={pr_name+'_'+index} text={desc}/>)
            }
            return pr_desc_list;
        },
        valueGetter: (value, row) => {
            if (row.descriptions) {
                return row.descriptions.join(data_separator);
            }
        }
    },
    'gene_id': {
        field: 'genes__external_id',
        headerName: 'Ensembl ID',
        width: 200,
        renderCell: (params) => {
            let gene_ids = [];
            if (params.row.genes) {
                gene_ids = params.row.genes.map((gene) => ({
                    'label': gene.external_id,
                    'desc': gene.descriptions.length ? gene.descriptions[0]: undefined
                }));
            }
            return omicspred_internal_links(gene_ids, 'gene');
        },
        valueGetter: (value, row) => {
            let gene_ids = '';
            if (row.genes) {
                gene_ids = row.genes.map((gene) => gene.external_id)
            }
            return gene_ids.join(data_separator);
        }
    },
    'gene_name': {
        field: 'genes__name',
        headerName: 'Gene',
        minWidth: 110,
        // minWidth: 120,
        // flex: 0.5,
        renderCell: (params) => {
            let gene_names = [];
            if (params.row.genes) {
                gene_names = params.row.genes.map((gene) => ({
                    'id': gene.external_id ? gene.external_id : gene.name,
                    'label': gene.name ? gene.name : '-',
                    'desc': gene.descriptions.length ? gene.descriptions[0]: undefined
                }))
            }
            gene_names = sort_objects(gene_names,'label');

            if (gene_names.length>display_threshold) {
                return <ToogleDiv content={omicspred_internal_links(gene_names, 'Gene')} title={gene_names.length+' genes'}/>;
            }
            else if (gene_names.length > 0) {
                return omicspred_internal_links(gene_names, 'Gene');
            }
            else {
                return default_cell_value;
            }
        },
        valueGetter: (value, row) => {
            let gene_names = [];
            if (row.genes) {
                gene_names = row.genes.map((gene) => gene.name)
            }
            return gene_names.join(data_separator);
        }
    },
    'gene_id_from_list': {
        field: 'gene_id',
        headerName: 'Gene ID',
        minWidth: 180,
        // flex: 0.5,
        renderCell: (params) => {
            return omicspred_internal_link({'label': params.row.external_id} , 'gene');
        },
        valueGetter: (value, row) => {
            return row.external_id;
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
        valueGetter: (value, row) => {
            return row.name;
        }
    },
    'protein_id_from_list': {
        field: 'protein_id',
        headerName: 'Protein ID',
        minWidth: 180,
        // flex: 0.5,
        renderCell: (params) => {
            return omicspred_internal_link({'label': params.row.external_id} , 'protein');
        },
        valueGetter: (value, row) => {
            return row.external_id;
        }
    },
    'protein_name_from_list': {
        field: 'protein_name',
        headerName: 'Protein',
        minWidth: 120,
        flex: 0.5,
        renderCell: (params) => {
            return omicspred_internal_link({'label': params.row.name}, 'protein');
        },
        valueGetter: (value, row) => {
            return row.name;
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
                metabolite_ids = params.row.metabolites.map((metabolite) => ({'label': metabolite.external_id, 'desc': metabolite.name}))
            }

            if (metabolite_ids.length>display_threshold) {
                return <ToogleDiv content={omicspred_internal_links(metabolite_ids, 'metabolite')} title={metabolite_ids.length+' metabolites'}/>;
            }
            else {
                return omicspred_internal_links(metabolite_ids, 'metabolite');
            }
        },
        valueGetter: (value, row) => {
            let metabolite_ids = [];
            if (row.metabolites) {
                metabolite_ids = row.metabolites.map((metabolite) => metabolite.external_id)
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
            const metabolites = params.row.metabolites;
            if (metabolites) {
                metabolite_names = metabolites.map((metabolite) => metabolite.name)
                metabolite_labels = metabolites.map((metabolite) => ({'label': metabolite.name}))
                for (let i=0; i<metabolites.length; i++) {
                    const id = metabolites[i].external_id;
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
        valueGetter: (value, row) => {
            let metabolite_names = [];
            if (row.metabolites) {
                metabolite_names = row.metabolites.map((metabolite) => metabolite.name)
            }
            return metabolite_names.join(data_separator);
        }
    },
    'molecular_trait_name': {
        field: 'molecular_trait_name',
        headerName: 'Molecular Trait Name',
        minWidth: 300,
        flex: 0.5,
        // flex: 1,
        sortable: false,
        valueGetter: (value, row) => {
            let mt_names = [];
            if (row.proteins.length > 0) {
                mt_names = row.proteins.map((protein) => protein.name)
            }
            else if (row.metabolites.length > 0) {
                mt_names = row.metabolites.map((metabolite) => metabolite.name)
            }
            else if (row.genes.length > 0) {
                mt_names = row.genes.map((gene) => gene.descriptions.length ? <ToogleText key={gene.name ? gene.name : gene.external_id} text={gene.descriptions[0]}/>:'')
            }
            return mt_names.join(data_separator);
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
        valueGetter: (value, row) => {
            return row.external_id;
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
        valueGetter: (value, row) => {
            return row.external_id_source;
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
        valueGetter: (value, row) => {
            return row.name;
        }
    },
    'phenotype_id': {
        field: 'phenotype_id',
        headerName: 'Phenotype ID',
        minWidth: 120,
        // flex: 0.5,
        hideable: false,
        renderCell: (params) => {
            let phe_id = params.row.id;
            if (params.row.phenotype) {
                phe_id = params.row.phenotype.id;
            }
            return omicspred_internal_link({'label': phe_id},'phenotype')
        },
        valueGetter: (value, row) => {
            let phe_id = row.id;
            if (row.phenotype) {
                phe_id = row.phenotype.id;
            }
            return phe_id
        }
    },
    'phenotype_name': {
        field: 'phenotype_name',
        headerName: 'Phenotype name',
        minWidth: 300,
        // flex: 1,
        renderCell: (params) => {
            let phe_name = params.row.name;
            if (params.row.phenotype) {
                phe_name = params.row.phenotype.name;
            }
            return phe_name;
        },
        valueGetter: (value, row) => {
            let phe_name = row.name;
            if (row.phenotype) {
                phe_name = row.phenotype.name;
            }
            return phe_name;
        }
    },
    'phenotype_category': {
        field: 'phenotype__category',
        headerName: 'Category',
        minWidth: 180,
        // flex: 0.8,
        renderCell: (params) => {
            let phe_cat = params.row.category;
            if (params.row.phenotype) {
                phe_cat = params.row.phenotype.category;
            }
            return phe_cat;
        },
        valueGetter: (value, row) => {
            let phe_cat = row.category;
            if (row.phenotype) {
                phe_cat = row.phenotype.category;
            }
            return phe_cat;
        }
    },
    'pathway_group': {
        field: 'pathway_group',
        headerName: 'Pathway',
        minWidth: 200,
        flex: 1,
        valueGetter: (value, row) => {
            let result = '';
            const metabolites = row.metabolites;
            if (metabolites) {
                if (metabolites[0]) {
                    if (metabolites[0].pathway_group) {
                        result = metabolites[0].pathway_group;
                    }
                }
            }
            return result;
        }
    },
    'pathway_subgroup': {
        field: 'pathway_subgroup',
        headerName: 'Sub Pathway',
        headerClassName: 'col_border_right',
        minWidth: 200,
        flex: 1,
        valueGetter: (value, row) => {
            let result = '';
            const metabolites = row.metabolites;
            if (metabolites) {
                if (metabolites[0]) {
                    if (metabolites[0].pathway_subgroup) {
                        result = metabolites[0].pathway_subgroup;
                    }
                }
            }
            return result;
        }
    },
    'pathway_id': {
        field: 'pathway_id',
        headerName: 'Pathway ID',
        width: 150,
        // flex: 0.4,
        renderCell: (params) => {
            return omicspred_internal_link({'label': params.row.external_id}, 'pathway');
        },
        valueGetter: (value, row) => {
            return row.external_id;
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
        valueGetter: (value, row) => {
            return row.external_id_source;
        }
    },
    'pathway_name': {
        field: 'pathway_name',
        headerName: 'Pathway name',
        minWidth: 250,
        // flex: 0.7,
        renderCell: (params) => {
            return params.row.external_id ? params.row.name: omicspred_internal_link({'label': params.row.name}, 'pathway');
        },
        valueGetter: (value, row) => {
            return row.name;
        }
    },
    'superpathway_name': {
        field: 'superpathways_name',
        headerName: 'Top Level Pathway',
        minWidth: 225,
        // flex: 0.5,
        renderCell: (params) => {
            let sp_pathways = []
            if (params.row.superpathways) {
                sp_pathways = params.row.superpathways.map((superpathway) => ({'id':superpathway.external_id,'label': superpathway.name, 'source':superpathway.external_id_source}))
                return omicspred_external_links(sp_pathways);
            }
        },
        valueGetter: (value, row) => {
            const superpathways_list = row.superpathways.map((superpathway) => (superpathway.name))
            return superpathways_list.join(data_separator);
        }
    },
    'description': {
        field: 'descriptions',
        headerName: 'Description',
        minWidth: 260,
        // flex: 1,
        renderCell: (params) => {
            let desc_list = [];
            if (params.row.descriptions) {
                desc_list = display_description(params.row.descriptions)
            }
            return desc_list;
        },
        valueGetter: (value, row) => {
            if (row.descriptions) {
                return row.descriptions.join(data_separator);
            }
        }
    },
    'scores_count':{
        field: 'scores_count',
        headerName: '#Scores',
        type: 'number',
        minWidth: 100,
        // flex: 0.5,
        align: 'right',
        renderCell: (params) => {
            let counts = 0;
            if (params.row.scores_count) {
                counts = params.row.scores_count;
            }
            else if (params.row.datasets) {
                const datasets = params.row.datasets;
                for (let i = 0; i < datasets.length; i++ ) {
                    counts += datasets[i].scores_count;
                }
            }
            return scoresBadge(counts, true);
        },
        valueGetter: (value, row) => {
            let counts = 0;
            if (row.scores_count) {
                counts = row.scores_count;
            }
            else if (row.datasets) {
                const datasets = row.datasets;
                for (let i = 0; i < datasets.length; i++ ) {
                    counts += datasets[i].scores_count;
                }
            }
            return counts;
        }
    }
}


export const common_data_cols = {
//    'r2': {
//         field: 'r2',
//         width: 90,
//         renderHeader: (params) => {
//             return r2_col_header_label();
//         },
//         valueGetter: (value, row) => {
//             if (row.data_values) {
//                 if (row.data_values.R2) {
//                     return row.data_values.R2;
//                 }
//             }
//             return default_cell_value;
//         }
//     },
    'hazard_ratio': {
        field: 'hr',
        headerName: 'Hazard Ratio',
        width: 140,
        valueGetter: (value, row) => {
            if (row.data_values) {
                if (row.data_values.HR) {
                    let hr = row.data_values.HR;
                    if (row.data_values.HR_lower) {
                        hr += ' ['+row.data_values.HR_lower+' - '+row.data_values.HR_upper+']';
                    }
                    return hr;
                }
            }
        }
    },
    'fdr': {
        field: 'fdr',
        headerName: 'FDR',
        description: 'False Discovery Rate (FDR) adjusted P-value',
        width: 100,
        valueGetter: (value, row) => {
            if (row.data_values) {
                if (row.data_values.FDR) {
                    return row.data_values.FDR;
                }
                else {
                    return default_cell_value;
                }
            }
        }
    }
}


export const cohort_cols = {
    'INTERVAL': {
        'R2' : {
            field: 'INTERVAL_R2',
            headerClassName: 'col_border_left',
            // headerClassName: ['training_col','col_border_left'],
            // headerName: <>R<sup>2</sup></>,
            // minWidth: 100,
            // flex: 0.5,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'INTERVAL','R2');
            }
        },
        'Rho': {
            field: 'INTERVAL_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            // headerClassName: 'training_col',
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'INTERVAL','Rho');
            }
        }
    },
    'UKB': {
        'R2': {
            field: 'UKB_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // minWidth: 100,
            // flex: 0.5,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'UKB','R2');
            }
        },
        'Rho': {
            field: 'UKB_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'UKB','Rho');
            }
        }
    },
    'ORCADES': {
        'R2': {
            field: 'ORCADES_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // minWidth: 100,
            // flex: 0.5,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'ORCADES','R2');
            }
        },
        'Rho': {
            field: 'ORCADES_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'ORCADES','Rho');
            }
        },
        variant_rate_label: {
            field: 'ORCADES_Match Rate',
            headerName: variant_rate_label,
            // minWidth: 200,
            // width: 200,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'ORCADES',variant_rate_label);
            }
        },

    },
    'VIKING': {
        'R2': {
            field: 'VIKING_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // minWidth: 100,
            // flex: 0.5,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'VIKING','R2');
            }
        },
        'Rho': {
            field: 'VIKING_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'VIKING','Rho');
            }
        },
        variant_rate_label: {
            field: 'VIKING_Match Rate',
            headerName: variant_rate_label,
            minWidth: 100,
            flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'VIKING',variant_rate_label);
            }
        }
    },
    'MEC_CN': {
        'R2': {
            field: 'MEC_CN_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // minWidth: 100,
            // flex: 0.5,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'MEC_CN','R2');
            }
        },
        'Rho': {
            field: 'MEC_CN_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'MEC_CN','Rho');
            }
        },
        variant_rate_label: {
            field: 'MEC_CN_Match Rate',
            headerName: variant_rate_label,
            minWidth: 100,
            flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'MEC_CN',variant_rate_label);
            }
        }
    },
    'MEC_IN': {
        'R2': {
            field: 'MEC_IN_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // minWidth: 100,
            // flex: 0.5,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'MEC_IN','R2');
            }
        },
        'Rho': {
            field: 'MEC_IN_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'MEC_IN','Rho');
            }
        },
        variant_rate_label: {
            field: 'MEC_IN_Match Rate',
            headerName: variant_rate_label,
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'MEC_IN',variant_rate_label);
            }
        }
    },
    'MEC_MA': {
        'R2': {
            field: 'MEC_MA_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // minWidth: 100,
            // flex: 0.5,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'MEC_MA','R2');
            }
        },
        'Rho': {
            field: 'MEC_MA_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'MEC_MA','Rho');
            }
        },
        variant_rate_label: {
            field: 'MEC_MA_Match Rate',
            headerName: variant_rate_label,
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'MEC_MA',variant_rate_label);
            }
        }
    },
    'INTERVAL_withheld_subset': {
        'R2': {
            field: 'INTERVAL_withheld_subset_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // width: 300,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'INTERVAL withheld subset','R2');
            }
        },
        'Rho': {
            field: 'INTERVAL_withheld_subset_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'INTERVAL withheld subset','Rho');
            }
        }
    },
    'NSPHS': {
        'R2': {
            field: 'NSPHS_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // width: 300,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'NSPHS','R2');
            }
        },
        'Rho': {
            field: 'NSPHS_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'NSPHS','Rho');
            }
        },
        variant_rate_label: {
            field: 'NSPHS_Match Rate',
            headerName: variant_rate_label,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'NSPHS',variant_rate_label);
            }
        }
    },
    'FENLAND': {
        'R2': {
            field: 'FENLAND_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            width: 90,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'FENLAND','R2');
            }
        },
        'Rho': {
            field: 'FENLAND_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            width: 100,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'FENLAND','Rho');
            }
        },
        variant_rate_label: {
            field: 'FENLAND_Match Rate',
            headerName: variant_rate_label,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'FENLAND',variant_rate_label);
            }
        }
    },
    'JHS': {
        'R2': {
            field: 'JHS_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // width: 300,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'JHS','R2');
            }
        },
        'Rho': {
            field: 'JHS_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'JHS','Rho');
            }
        },
        variant_rate_label: {
            field: 'JHS_Match Rate',
            headerName: variant_rate_label,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'JHS',variant_rate_label);
            }
        }
    },
    'UKB_Withheld_ALL': {
        'R2': {
            field: 'UKB_Withheld_ALL_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // minWidth: 100,
            // flex: 0.5,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'UKB_Withheld_ALL','R2');
            }
        },
        'Rho': {
            field: 'UKB_Withheld_ALL_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'UKB_Withheld_ALL','Rho');
            }
        }
    },
    'UKB_Withheld_AFR': {
        'R2': {
            field: 'UKB_Withheld_AFR_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // minWidth: 100,
            // flex: 0.5,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'UKB_Withheld_AFR','R2');
            }
        },
        'Rho': {
            field: 'UKB_Withheld_AFR_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'UKB_Withheld_AFR','Rho');
            }
        }
    },
    'UKB_Withheld_AMR': {
        'R2': {
            field: 'UKB_Withheld_AMR_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // minWidth: 100,
            // flex: 0.5,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'UKB_Withheld_AMR','R2');
            }
        },
        'Rho': {
            field: 'UKB_Withheld_AMR_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'UKB_Withheld_AMR','Rho');
            }
        }
    },
    'UKB_Withheld_EAS': {
        'R2': {
            field: 'UKB_Withheld_EAS_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // minWidth: 100,
            // flex: 0.5,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'UKB_Withheld_EAS','R2');
            }
        },
        'Rho': {
            field: 'UKB_Withheld_EAS_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'UKB_Withheld_EAS','Rho');
            }
        }
    },
    'UKB_Withheld_EUR': {
        'R2': {
            field: 'UKB_Withheld_EUR_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // minWidth: 100,
            // flex: 0.5,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'UKB_Withheld_EUR','R2');
            }
        },
        'Rho': {
            field: 'UKB_Withheld_EUR_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'UKB_Withheld_EUR','Rho');
            }
        }
    },
    'UKB_Withheld_SAS': {
        'R2': {
            field: 'UKB_Withheld_SAS_R2',
            // headerName: <>R<sup>2</sup></>,
            headerClassName: 'col_border_left',
            // minWidth: 100,
            // flex: 0.5,
            renderHeader: (params) => {
                return r2_col_header_label();
            },
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'UKB_Withheld_SAS','R2');
            }
        },
        'Rho': {
            field: 'UKB_Withheld_SAS_Rho',
            // headerName: 'Rho',
            renderHeader: (params) => {
                return rho_col_header_label();
            },
            // minWidth: 100,
            // flex: 0.5,
            valueGetter: (value, row) => {
                return cohort_valueGetter(row,'UKB_Withheld_SAS','Rho');
            }
        }
    },
    // 'MESA-AFA': {
    //     'R2': {
    //         field: 'MESA-AFA_R2',
    //         // headerName: <>R<sup>2</sup></>,
    //         headerClassName: ['training_col','col_border_left'],
    //         minWidth: 100,
    //         flex: 0.5,
    //         renderHeader: (params) => {
    //             return r2_col_header_label();
    //         },
    //         valueGetter: (value, row) => {
    //             return cohort_valueGetter(row,'MESA-AFA','R2');
    //         }
    //     }
    // },
    // 'MESA-ALL': {
    //     'R2': {
    //         field: 'MESA-ALL_R2',
    //         // headerName: <>R<sup>2</sup></>,
    //         headerClassName: ['training_col','col_border_left'],
    //         minWidth: 100,
    //         flex: 0.5,
    //         renderHeader: (params) => {
    //             return r2_col_header_label();
    //         },
    //         valueGetter: (value, row) => {
    //             return cohort_valueGetter(row,'MESA-ALL','R2');
    //         }
    //     }
    // },
    // 'MESA-CHN': {
    //     'R2': {
    //         field: 'MESA-CHN_R2',
    //         // headerName: <>R<sup>2</sup></>,
    //         headerClassName: ['training_col','col_border_left'],
    //         minWidth: 100,
    //         flex: 0.5,
    //         renderHeader: (params) => {
    //             return r2_col_header_label();
    //         },
    //         valueGetter: (value, row) => {
    //             return cohort_valueGetter(row,'MESA-CHN','R2');
    //         }
    //     }
    // },
    // 'MESA-EUR': {
    //     'R2': {
    //         field: 'MESA-EUR_R2',
    //         // headerName: <>R<sup>2</sup></>,
    //         headerClassName: ['training_col','col_border_left'],
    //         minWidth: 100,
    //         flex: 0.5,
    //         renderHeader: (params) => {
    //             return r2_col_header_label();
    //         },
    //         valueGetter: (value, row) => {
    //             return cohort_valueGetter(row,'MESA-EUR','R2');
    //         }
    //     }
    // },
    // 'MESA-HIS': {
    //     'R2': {
    //         field: 'MESA-HIS_R2',
    //         // headerName: <>R<sup>2</sup></>,
    //         headerClassName: ['training_col','col_border_left'],
    //         minWidth: 100,
    //         flex: 0.5,
    //         renderHeader: (params) => {
    //             return r2_col_header_label();
    //         },
    //         valueGetter: (value, row) => {
    //             return cohort_valueGetter(row,'MESA-HIS','R2');
    //         }
    //     }
    // }
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
    'molecular_trait_id': {
        groupId: 'Molecular trait ID',
        children: [{ field: 'genes__name' }, { field: 'proteins__external_id' }, { field: 'metabolite_id' }],
        headerClassName: ['col_border_left','col_border_right']
    },
    'ancestry': {
        groupId: 'Ancestry distribution',
        children: [{ field: 'ancestry_training' }, { field: 'ancestry_validation' }],
        headerClassName: ['col_border_left','col_border_right']
    },
    'pathway': {
        groupId: 'Reported pathway',
        children: [{ field: 'pathway_group' }, { field: 'pathway_subgroup' }],
        headerClassName: ['col_border_left','col_border_right']
    },
    'INTERVAL': {
        groupId: 'INTERVAL',
        children: [{ field: 'INTERVAL_R2' }, { field: 'INTERVAL_Rho' }],
        headerClassName: 'col_border_left'
    },
    'FENLAND': {
        groupId: 'FENLAND',
        children: [{ field: 'FENLAND_R2' }, { field: 'FENLAND_Rho' }, { field: 'FENLAND_Match Rate' }],
        headerClassName: 'col_border_left'

    },
    'MEC_CN': {
        groupId: 'MEC CN',
        children: [{ field: 'MEC_CN_R2' }, { field: 'MEC_CN_Rho' }, { field: 'MEC_CN_Match Rate' }],
        headerClassName: 'col_border_left'
    },
    'MEC_IN': {
        groupId: 'MEC IN',
        children: [{ field: 'MEC_IN_R2' }, { field: 'MEC_IN_Rho' }, { field: 'MEC_IN_Match Rate' }],
        headerClassName: 'col_border_left'
    },
    'MEC_MA': {
        groupId: 'MEC MA',
        children: [{ field: 'MEC_MA_R2' }, { field: 'MEC_MA_Rho' }, { field: 'MEC_MA_Match Rate' }],
        headerClassName: 'col_border_left'
    },
    'JHS': {
        groupId: 'JHS',
        children: [{ field: 'JHS_R2' }, { field: 'JHS_Rho' }, { field: 'JHS_Match Rate' }],
        headerClassName: 'col_border_left'
    },
    'NSPHS': {
        groupId: 'NSPHS',
        children: [{ field: 'NSPHS_R2' }, { field: 'NSPHS_Rho' }, { field: 'NSPHS_Match Rate' }],
        headerClassName: 'col_border_left'
    },
    'ORCADES': {
        groupId: 'ORCADES',
        children: [{ field: 'ORCADES_R2' }, { field: 'ORCADES_Rho' }, { field: 'ORCADES_Match Rate' }],
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
        children: [{ field: 'VIKING_R2' }, { field: 'VIKING_Rho' }, { field: 'VIKING_Match Rate' }],
        headerClassName: 'col_border_left'
    },
    'UKB_Withheld_ALL': {
        groupId: 'UKB Withheld ALL',
        children: [{ field: 'UKB_Withheld_ALL_R2' }, { field: 'UKB_Withheld_ALL_Rho' }],
        headerClassName: 'col_border_left'
    },
    'UKB_Withheld_AFR': {
        groupId: 'UKB Withheld AFR',
        children: [{ field: 'UKB_Withheld_AFR_R2' }, { field: 'UKB_Withheld_AFR_Rho' }],
        headerClassName: 'col_border_left'
    },
    'UKB_Withheld_AMR': {
        groupId: 'UKB Withheld AMR',
        children: [{ field: 'UKB_Withheld_AMR_R2' }, { field: 'UKB_Withheld_AMR_Rho' }],
        headerClassName: 'col_border_left'
    },
    'UKB_Withheld_EAS': {
        groupId: 'UKB Withheld EAS',
        children: [{ field: 'UKB_Withheld_EAS_R2' }, { field: 'UKB_Withheld_EAS_Rho' }],
        headerClassName: 'col_border_left'
    },
    'UKB_Withheld_EUR': {
        groupId: 'UKB Withheld EUR',
        children: [{ field: 'UKB_Withheld_EUR_R2' }, { field: 'UKB_Withheld_EUR_Rho' }],
        headerClassName: 'col_border_left'
    },
    'UKB_Withheld_SAS': {
        groupId: 'UKB Withheld SAS',
        children: [{ field: 'UKB_Withheld_SAS_R2' }, { field: 'UKB_Withheld_SAS_Rho' }],
        headerClassName: 'col_border_left'
    },
    // 'MESA-AFA': {
    //     groupId: 'MESA AFA',
    //     children: [{ field: 'MESA-AFA_R2' },],
    //     headerClassName: ['training_col','col_border_left']
    // },
    // 'MESA-ALL': {
    //     groupId: 'MESA ALL',
    //     children: [{ field: 'MESA-ALL_R2' },],
    //     headerClassName: ['training_col','col_border_left']
    // },
    // 'MESA-CHN': {
    //     groupId: 'MESA CHN',
    //     children: [{ field: 'MESA-CHN_R2' },],
    //     headerClassName: ['training_col','col_border_left']
    // },
    // 'MESA-EUR': {
    //     groupId: 'MESA EUR',
    //     children: [{ field: 'MESA-EUR_R2' },],
    //     headerClassName: ['training_col','col_border_left']
    // },
    // 'MESA-HIS': {
    //     groupId: 'MESA HIS',
    //     children: [{ field: 'MESA-HIS_R2' },],
    //     headerClassName: ['training_col','col_border_left']
    // }
}