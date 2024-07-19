import DataTableServer from '../../../components/table/DataTableServer';
import { phecode_columns } from '../../../components/table/columns/phecode'
import { page_title, HeaderCard } from '../../../components/Common';
import { get_information_content, PheWASDownloadButton } from '../components/components';


function PhecodesFull() {

    const url_suffix = "applications_score/all";

    const column_keys = ['phecode__id','score_id'];

    const dnld_type = 'phewas_associations';

    return (
        <>
            {page_title('phecode', 'PheWAS', 'All Associations')}
            <h4 className='page_title'>Full list of associations identified in PheWAS</h4>
            {/* Summary data */}
            <div className='op_card_container_info'>
                <HeaderCard type='pheWAS' content={get_information_content()} />
            </div>
            <PheWASDownloadButton type={dnld_type} />
            <div className="mt-4">
                <DataTableServer key="phecode_full" url_suffix={url_suffix} columns={phecode_columns['Full']} col_for_ids={column_keys}/>
            </div>
        </>
    );
}
    
export default PhecodesFull