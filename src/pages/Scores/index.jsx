import { scores_columns } from '../../components/table/columns/scores';
import { common_column_groups } from '../../components/table/columns/common';
import DataTableServer from '../../components/table/DataTableServer';
import { browse_title } from '../../components/Common';

function Scores() {
    const url_endpoint = 'score/all'

    return (
        <>
            { browse_title('score') }
            <div className="mt-4">
                <DataTableServer url_suffix={url_endpoint} columns={scores_columns} groups={[common_column_groups['molecular_trait_id']]}/>
            </div>
        </>
    )
}

export default Scores