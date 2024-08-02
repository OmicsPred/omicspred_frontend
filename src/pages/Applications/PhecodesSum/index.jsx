import DataTableServer from '../../../components/table/DataTableServer';
import { phecode_columns } from '../../../components/table/columns/phecode'
import { PageTitle, HeaderCard } from '../../../components/Common';
import { get_information_content, PheWASDownloadButton } from '../components/components';


function PhecodesFull() {

    const url_suffix = "applications_sample/all";

    const column_keys = ['phecode__id'];

    const dnld_type = 'phewas_sumstats';

    return (
        <>
            <PageTitle type='phecode' category='PheWAS' label='Summary' title='PheWAS - Summary'/>

            <h4 className='page_title'>Identified associations by PheCode</h4>
            {/* Summary data */}
            <div className='op_card_container_info'>
                <HeaderCard type='pheWAS' content={get_information_content()} />
            </div>
            <PheWASDownloadButton type={dnld_type} />
            <div className="mt-4">
                <DataTableServer key="phecode_sum" url_suffix={url_suffix} columns={phecode_columns['Sum']} col_for_ids={column_keys}/>
            </div>
        </>
    );
}
    
export default PhecodesFull