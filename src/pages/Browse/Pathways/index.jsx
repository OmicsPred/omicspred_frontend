import { useState, useEffect } from 'react';
import { ArrowRight } from 'react-bootstrap-icons';
import { pathways_columns, pathways_group_columns } from '../../../components/table/columns/pathways';
import DataTableServer from '../../../components/table/DataTableServer';
import Href from '../../../components/Href';
import { fetch_count_data, browse_title } from '../components/Browse';


function Pathways() {
    const [pathwaysCount, setPathwaysCount] = useState()

    const data_type = 'pathway';

    const url_suffix = data_type+'/all?only_counts=1';

    const fetchCount = async () => {
        const data_count = await fetch_count_data(data_type+'s');
        setPathwaysCount(data_count);
    }

    const reactome_link_text = () => {
        return (<>Reactome "Identifier mapping files <ArrowRight /> All levels of the pathway hierarchy"</>)
    }

    useEffect(() => {
        fetchCount();
    },[])

    return (
        <>
            { browse_title(pathwaysCount,data_type,'Pathways') }
            <div className="mt_minus_1">
                Browse all the Reactome pathways that have been mapped to the {process.env.PROJECT_NAME} Molecular traits (source: <Href text={reactome_link_text()} href='https://reactome.org/download-data' />).
            </div>
            <div className="mt-4">
                <DataTableServer url_suffix={url_suffix} columns={pathways_columns} groups={pathways_group_columns}/>
            </div>
        </>
    )
}

export default Pathways