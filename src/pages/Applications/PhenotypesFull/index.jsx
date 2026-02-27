import DataTableServer from '../../../components/table/DataTableServer';
import { phenotype_columns } from '../../../components/table/columns/phenotype'
import { PageTitle, HeaderCard } from '../../../components/Common';
import { get_information_content, PheWASDownloadButton } from '../components/components';


function PhenotypesFull() {
    const url_suffix = "applications_score/all";

    const column_keys = ['phenotype__id', 'score_id', 'data_values__FDR'];

    const dnld_type = 'phewas_associations';

    return (
        <>
            <PageTitle type='phenotype' category='PheWAS' label='All Associations' title='PheWAS - All Associations'/>
            <h4 className='page_title'>Full list of associations identified in PheWAS</h4>
            {/* Summary data */}
            <div className='op_card_container_info'>
                <HeaderCard type='pheWAS' content={get_information_content()} />
            </div>
            <PheWASDownloadButton type={dnld_type} />
            <div className="mt-4">
                <DataTableServer key="phenotype_full" url_suffix={url_suffix} columns={phenotype_columns['Full']} col_for_ids={column_keys}/>
            </div>
        </>
    );
}
    
export default PhenotypesFull