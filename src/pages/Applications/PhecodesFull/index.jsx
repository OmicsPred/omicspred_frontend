import DataTableServer from '../../../components/table/DataTableServer';
import { phecode_columns } from '../../../components/table/columns/phecode'
import { page_title } from '../../../components/Common';


function PhecodesFull() {

    const url_suffix = "applications_score/all";

    const column_keys = ['phecode__id','score_id'];

    return (
        <>
            {page_title('phecode', 'PheWAS', 'All Associations')}
            <h4 className='page_title'>Full list of associations identified in PheWAS</h4>
            <div className="mt-4">
                <DataTableServer key="phecode_full" url_suffix={url_suffix} columns={phecode_columns['Full']} col_for_ids={column_keys}/>
            </div>
        </>
    );
}
    
export default PhecodesFull