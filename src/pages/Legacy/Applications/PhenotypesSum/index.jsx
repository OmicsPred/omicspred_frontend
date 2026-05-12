import DataTableServer from '../../../../components/table/DataTableServer';
import { phenotype_columns } from '../../../../components/table/columns/phenotype'
import { PageTitle, HeaderCard } from '../../../../components/Common';
import { get_information_content, PheWASDownloadButton } from '../components/components';


function PhenotypesFull() {

    const url_suffix = "applications_sample/all";

    const column_keys = ['phenotype__id'];

    const dnld_type = 'phewas_sumstats';

    return (
        <>
            <PageTitle type='phenotype' category='PheWAS' label='Summary' title='PheWAS - Summary'/>

            <h4 className='page_title'>Identified associations by Phenotype</h4>
            {/* Summary data */}
            <div className='op_card_container_info'>
                <HeaderCard type='pheWAS' content={get_information_content()} />
            </div>
            <PheWASDownloadButton type={dnld_type} />
            <div className="mt-4">
                <DataTableServer key="phenotype_sum" url_suffix={url_suffix} columns={phenotype_columns['Sum']} col_for_ids={column_keys}/>
            </div>
        </>
    );
}
    
export default PhenotypesFull