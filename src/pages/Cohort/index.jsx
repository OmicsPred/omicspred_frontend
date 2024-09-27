import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageTitle, HeaderCard, no_entry_found, op_subtitle } from '../../components/Common';
import Href from '../../components/Href';
import restApiCall from '../../components/RestAPI';
// import { ScoresTable } from '../MolecularTrait/components/tables';
import { scores_columns } from '../../components/table/columns/scores';
import { common_column_groups } from '../../components/table/columns/common';
import DataTableServer from '../../components/table/DataTableServer';
import { ToogleDiv, loading_data } from '../../components/Generic';


function Cohort() {
    const { cohort } = useParams();

    const [cohortData, setCohortData] = useState();
    const [cohortName, setCohortName] = useState();
    const [noEntry, setNoEntry] = useState(false)
    const [cohortImageSource, setCohortImageSource] = useState();

    const fetchCohortData = async () => {
        const cohort_data = await restApiCall('cohort/'+cohort);
        if (cohort_data && Object.keys(cohort_data).length) {
            setCohortData(cohort_data);
            getImageSource(cohort);
            setCohortName(cohort_data.name_short ? cohort_data.name_short : cohort_data.name_full)
        }
        else {
            setNoEntry(true);
        }
    }

    const getUrlEndpoint = () => {
        return 'score/search?cohort='+cohortName;
    }

    const getImageSource = async (cohort_name) => {
        try {
            // console.log('IMAGE: ../../assets/cohorts/'+cohort_name.toUpperCase()+'.png')
            const src = await import(`../../assets/cohorts/${cohort_name.toUpperCase()}.png`)
            if (src) {
                setCohortImageSource(src.default);
            }
        }
        catch(err){
            // Image not found
        }
    }

    const get_information_content = () => {
		return (
			<>
                { cohortData.name_full && cohortData.name_short ? <tr><td>Short name</td><td>{cohortData.name_short}</td></tr> : ''}
                { cohortData.name_full && cohortData.name_short ? '' : <tr><td>Long name</td><td>{cohortData.name_full}</td></tr>}
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
            { cohortName && cohortData && cohortData.name_short ?
                <>
                    <PageTitle type='hl' category='Cohort' label={cohortName} title={'Cohort '+cohortName}/>
                    <div>
                        <div className='d-flex justify-content-between'>
                            {/* Summary data */}
                            <div className='op_card_container_info'>
                                <HeaderCard type='cohort' content={get_information_content()} />
                            </div>
                            { cohortImageSource ? <div className='ms-2 me-5'><img className="img-cohort p-2" src={cohortImageSource} alt={cohortName}/></div> : ''}
                        </div>

                        {/* Associated scores */}
                        <div className="mt-4">
                            {op_subtitle('score',undefined)}
                            <DataTableServer url_suffix={getUrlEndpoint()} columns={scores_columns} groups={[common_column_groups['molecular_trait_id']]}/>
                        </div>
                    </div>
                </>
                : noEntry ?
                    <>
                        <PageTitle type='hl' category='Cohort' label={cohort} title={'Cohort '+cohort}/>
                        { no_entry_found('cohort',cohort,1) }
                    </>
                    : loading_data()
            }
        </>
    )
}

export default Cohort;
