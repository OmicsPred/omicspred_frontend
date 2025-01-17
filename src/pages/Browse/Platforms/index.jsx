import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import { BrowseTitle } from '../../../components/Common';
import { platforms_columns } from '../../../components/table/columns/platforms';

function Platforms() {
    const url_suffix = 'platform/all';
    
    return (
        <div>
            <BrowseTitle type='hl' label='platforms' title='Browse Platforms'/>
            <div className="mt_minus_1">
                Browse all the analysis Platforms used to generate the Genetic Scores in {process.env.PROJECT_NAME}.
            </div>
            <div className="mt-4">
                <DataTableFromRestApi table_key="platforms" url_suffix={url_suffix} columns={platforms_columns}/>
            </div>
        </div>
    );
}

export default Platforms