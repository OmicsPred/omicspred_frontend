import DataTableServer from '../../../components/table/DataTableServer';
import { phecode_columns } from '../../../components/table/columns/phecode'
import { page_title } from '../../../components/Common';


function PhecodesFull() {

    const url_suffix = "applications_sample/all";

    const column_keys = ['phecode__id'];

    return (
        <>
            {page_title('phecode', 'PheWAS', 'Summary')}
            <h4 className='page_title'>Identified associations by Phecode</h4>
            <div className="mt-4">
                <DataTableServer key="phecode_sum" url_suffix={url_suffix} columns={phecode_columns['Sum']} col_for_ids={column_keys}/>
            </div>
        </>
    );
}
    
export default PhecodesFull