import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { page_title, display_information } from '../../components/Common';
import Href from '../../components/Href';
import restApiCall from '../../components/RestAPI';
// import { ScoresTable } from '../MolecularTrait/components/tables';
import { scores_columns } from '../../components/table/columns/scores';
import { common_column_groups } from '../../components/table/columns/common';
import DataTableServer from '../../components/table/DataTableServer';
import { ToogleDiv } from '../../components/Generic';



function Cohort() {
    const { cohort } = useParams();

    const [cohortData, setCohortData] = useState()
    const [scoreData, setScoreData] = useState([])

    const url_endpoint = 'score/search?cohort='+cohort;

    const fetchCohortData = async () => {
        const cohort_data = await restApiCall('cohort/'+cohort);
        setCohortData(cohort_data);
    }

    const get_information_content = () => {
		return (
			<>
                { cohortData.name_short.toUpperCase() != cohort.toUpperCase() ? <tr><td>Short name</td><td>{cohortData.name_short}</td></tr>:''}
                { cohortData.name_full ? <tr><td>Long name</td><td>{cohortData.name_full}</td></tr>:''}
                { cohortData.url ? <tr><td>Website</td><td><Href text={cohortData.url} href={cohortData.url}/></td></tr>:''}
                { cohortData.ancestries ? <tr><td>Ancestr{cohortData.ancestries.length > 1 ? 'ies' : 'y'}</td><td>{display_ancestries(cohortData.ancestries)}</td></tr>:''}
            </>
        )
    }

    const display_ancestries = (ancestries) => {
        if (ancestries.length == 1) {
            const ancestry = ancestries[0];
            return (ancestry);
        }
        return (<ToogleDiv key={'toggle_ancestries'} title={<><span className='font-bold'>{ancestries.length}</span> ancestries</>} content={<ul className='mb-2'>{ancestries.map((ancestry) => <li key={'synonym_'+ancestry}>{ancestry}</li>)}</ul>}/>)
    }

    useEffect(() => {
        fetchCohortData();
    },[])

    return (
        <>
            { page_title('hl', 'Cohort', cohort) }
            { cohortData && cohortData.name_short ?
                <div>
                    <div className='op_card_container_info'>
                        {/* Summary data */}
                        { display_information('cohort',get_information_content()) }
                    </div>
                
                    {/* Associated scores */}
                    <div className="mt-4">
                        <DataTableServer url_suffix={url_endpoint} columns={scores_columns} groups={[common_column_groups['molecular_trait_id']]}/>
                    </div>
                </div> : <div>Cohort not found</div>
            }
        </>
    )
}

export default Cohort;
