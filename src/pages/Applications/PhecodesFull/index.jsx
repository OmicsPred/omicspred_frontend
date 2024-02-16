import DataTableServer from '../../../components/table/DataTableServer';
import { phecode_columns } from '../../../components/table/columns/phecode'


function PhecodesFull() {

    const url_suffix = "applications_score/all"

    return (
        <>
            <h2 className='page_title'>Full list of associations identified in the PheWAS</h2>
            <div className="mt-4">
                <DataTableServer key="phecode_full" url_suffix={url_suffix} columns={phecode_columns['Full']}/>
            </div>
        </>
    );
}
    
export default PhecodesFull