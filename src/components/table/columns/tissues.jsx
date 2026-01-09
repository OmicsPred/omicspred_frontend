import Href from "../../Href";
import { common_cols, omicspred_internal_link } from "./common";
import { display_tissue_description } from '../../Common';

const default_cell_value = process.env.DEFAULT_CELL_VALUE;


export const tissues_columns = [
    {
        field: 'label',
        headerName: 'Tissue name',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            const tissue = params.row;
            return omicspred_internal_link({'id': tissue.id, 'label': tissue.label},'tissue');
        },
        valueGetter: (value) => { return value }
    },
    {
        field: 'id',
        headerName: 'Tissue ID',
        minWidth: 120,
        flex: 1,
        renderCell: (params) => {
            const tissue_id = params.row.id;
            const tissue_url = params.row.url;
            return <Href href={tissue_url} text={tissue_id} />;
        },
        valueGetter: (value) => { return value }
    },
    {
        field: 'description',
        headerName: 'Description',
        minWidth: 400,
        flex: 1,
        sortable: false,
        renderCell: (params) => {
            if (params.row.description) {
                return display_tissue_description(params.row.description);
            }
            return default_cell_value;
        },
        valueGetter: (value) => { return value }
    },
    common_cols['scores_count']
]