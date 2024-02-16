import DataTableServer from '../../../components/table/DataTableServer';
import { phecode_columns } from '../../../components/table/columns/phecode'


function PhecodesFull() {

    const url_suffix = "applications_sample/all"

    return (
        <>
            <h2 className='page_title'>Identified associations by Phecode</h2>
            <div className="mt-4">
                <DataTableServer key="phecode_sum" url_suffix={url_suffix} columns={phecode_columns['Sum']}/>
            </div>
        </>
    );
}
    
export default PhecodesFull