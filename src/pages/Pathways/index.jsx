import React, { useState, useEffect } from 'react';
import { pathways_columns, pathways_group_columns } from '../../components/table/columns/pathways';
import DataTableServer from '../../components/table/DataTableServer';
import { BrowseTitle } from '../../components/Common';
import Href from '../../components/Href';
import restApiCall from '../../components/RestAPI';


function Pathways() {
    const [pathwaysCount, setPathwaysCount] = useState()

    const url_endpoint = 'pathway/all'

    const fetchPathwaysCount = async () => {
        const data = await restApiCall('info');
		setPathwaysCount(data.data_count.pathways);
    }

    useEffect(() => {
        fetchPathwaysCount();
    },[])

    return (
        <>
            { pathwaysCount ? <BrowseTitle type='pathway' count={pathwaysCount} title='Browse Pathways'/> : <BrowseTitle type='pathway' title='Browse Pathways'/>}

            <div>
                Browse the Reactome pathways that have been mapped to the {process.env.PROJECT_NAME} Molecular traits (source: <Href text='Reactome "Identifier mapping files"' href='https://reactome.org/download-data' />).
            </div>
            <div className="mt-4">
                <DataTableServer url_suffix={url_endpoint} columns={pathways_columns} groups={pathways_group_columns}/>
            </div>
        </>
    )
}

export default Pathways