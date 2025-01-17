import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import {publications_columns} from '../../../components/table/columns/publications';
import { BrowseTitle } from '../../../components/Common';


function Publications() {
    const url_suffix = 'publication/all';

    return (
        <div>
            <BrowseTitle type='hl' label='publications' title='Browse Publications'/>
            <div className="mt_minus_1">
                Browse all the Publications available in {process.env.PROJECT_NAME}.
            </div>
            <div className="mt-4">
                <DataTableFromRestApi table_key="publications" url_suffix={url_suffix} columns={publications_columns}/>
            </div>
        </div>
    );
}

export default Publications