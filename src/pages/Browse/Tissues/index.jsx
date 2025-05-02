import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import { BrowseTitle } from '../../../components/Common';
import { tissues_columns } from '../../../components/table/columns/tissues';

function Tissues() {
    const url_suffix = 'tissue/all';
    
    return (
        <div>
            <BrowseTitle type='tissue' title='Browse Tissues'/>
            <div className="mt_minus_1">
                Browse all the Tissues used to generate the Genetic Scores in {process.env.PROJECT_NAME}.
            </div>
            <div className="mt-4">
                <DataTableFromRestApi table_key="tissues" url_suffix={url_suffix} columns={tissues_columns}/>
            </div>
        </div>
    );
}

export default Tissues