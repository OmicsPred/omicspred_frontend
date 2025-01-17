import { Hexagon } from 'react-bootstrap-icons';
import {common_cols} from "./common";


// const gene_name_col = {...common_cols['gene_name'], field: 'pathway_genes_name', sortable: false, headerClassName: 'col_border_left'}
// const protein_name_col = {...common_cols['protein_id'], field: 'pathway_proteins_name', sortable: false}
// const metabolite_id_col = {...common_cols['metabolite_id'], field: 'pathway_metabolites_external_id', sortable: false}
// const metabolite_name_col = {...common_cols['metabolite_name'], field: 'pathway_metabolites_name', sortable: false}

// Export Scores columns
// export const pathways_columns = [
//     common_cols['pathway_name'],
//     common_cols['pathway_id'],
//     common_cols['superpathway_name'],
//     // common_cols['gene_name'],
//     gene_name_col,
//     protein_name_col,
//     // common_cols['metabolite_id'],
//     metabolite_id_col,
//     // common_cols['metabolite_name']
//     metabolite_name_col
// ]

const molecular_trait_header = (mt_type) => {
    const mt_type_lc = mt_type.toLowerCase();
    return (
        <span>
            <Hexagon className={"align-middle me-1 color_"+mt_type_lc}/>
            <span className="align-middle fw-bold" style={{paddingTop:"1px"}}>{mt_type}</span>
        </span>
    )
}

export const pathways_columns = [
    common_cols['pathway_name'],
    common_cols['pathway_id'],
    common_cols['superpathway_name'],
    {
        field: 'genes_count',
        headerName: 'Gene',
        width: 110,
        renderHeader: (params) => {
            return (molecular_trait_header('Gene'))
        },
        valueGetter: (value, row) => {
            return row.genes_count;
        }
    },
    {
        field: 'proteins_count',
        width: 110,
        renderHeader: (params) => {
            return (molecular_trait_header('Protein'))
        },
        valueGetter: (value, row) => {
            return row.proteins_count;
        }
    },
    {
        field: 'metabolites_count',
        width: 110,
        renderHeader: (params) => {
            return (molecular_trait_header('Metabolite'))
        },
        valueGetter: (value, row) => {
            return row.metabolites_count;
        }
    }
]

// export const pathways_group_columns = [
//     {
//         groupId: 'Reactome pathway',
//         children: [{ field: 'pathway_name' }, { field: 'pathway_id' }, { field: 'superpathways_name' }],
//         headerClassName: 'col_border_left'
//     },
//     {
//         groupId: 'Mapped Molecular Trait',
//         children: [{ field: 'pathway_genes_name' }, {field: 'pathway_proteins_name' }, { field: 'pathway_metabolites_external_id' }, { field: 'pathway_metabolites_name' }],
//         headerClassName: ['col_border_left','col_border_right']
//     },
// ]

export const pathways_group_columns = [
    {
        groupId: 'Reactome pathway',
        children: [{ field: 'pathway_name' }, { field: 'pathway_id' }, { field: 'superpathways_name' }],
        // headerClassName: 'col_border_left'
    },
    {
        groupId: 'Linked Mapped Molecular Trait Counts',
        children: [{ field: 'genes_count' }, {field: 'proteins_count' }, { field: 'metabolites_count' }],
        headerClassName: ['col_border_left']
    },
]

export const pathway_molecular_trait_columns = [
    common_cols['pathway_id'],
    common_cols['pathway_name'],
    common_cols['superpathway_name'],
    common_cols['pathway_id_source']
]