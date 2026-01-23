import DataTable from './table/DataTable';
import { datasets_browse_columns, datasets_platform_columns, datasets_publication_columns, datasets_tissue_columns, dataset_column_groups } from './table/columns/datasets';
// import { get_ancestry_name } from './Common';
import AncestryLegend from './ancestry/AncestryLegend';


const DatasetTable = (props) => {
    const dataset = props.data;

    const columns = {
        'browse': datasets_browse_columns,
        'platform': datasets_platform_columns,
        'publication': datasets_publication_columns,
        'tissue': datasets_tissue_columns
    }

    const dataset_columns = columns[props.page];

    return (
        <div>
            <div className='d-flex mb-3'>
                <AncestryLegend />
            </div>
            <DataTable data={dataset} columns={dataset_columns} groups={dataset_column_groups} hidden_columns={{samples: false}}/>
        </div>
    )
};
export default DatasetTable;