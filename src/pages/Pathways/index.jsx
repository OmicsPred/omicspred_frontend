import { pathways_columns } from '../../components/table/columns/pathways';
import DataTableServer from '../../components/table/DataTableServer';
import { browse_title } from '../../components/Common';

function Pathways() {
    const url_endpoint = 'pathway/all'

    return (
        <>
            { browse_title('pathway') }
            <div className="mt-4">
                <DataTableServer url_suffix={url_endpoint} columns={pathways_columns} />
            </div>
        </>
    )
}

export default Pathways