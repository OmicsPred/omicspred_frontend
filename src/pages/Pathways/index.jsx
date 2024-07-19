import { pathways_columns, pathways_group_columns } from '../../components/table/columns/pathways';
import DataTableServer from '../../components/table/DataTableServer';
import { browse_title } from '../../components/Common';
import Href from '../../components/Href';

function Pathways() {
    const url_endpoint = 'pathway/all'

    return (
        <>
            { browse_title('pathway') }
            <div>
                Browse the Reactome pathways that have been mapped to the {process.env.PROJECT_NAME} Molecular traits (source: <Href text='Reactome "Identifier mapping files"' href='https://reactome.org/download-data' />).
            </div>
            <div className="mt-4">
                <DataTableServer url_suffix={url_endpoint} columns={pathways_columns} groups={pathways_group_columns}/>
            </div>
        </>
    )
}

export default Pathways