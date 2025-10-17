import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Tooltip } from '@mui/material';
import { Table } from 'react-bootstrap-icons';
import { PageTitle, Header2Cards, no_entry_found, op_subtitle_no_asso } from '../../components/Common';
import Href from '../../components/Href';
import restApiCall from '../../components/RestAPI';
import { scores_columns } from '../../components/table/columns/scores';
import { common_column_groups } from '../../components/table/columns/common';
import DataTableServer from '../../components/table/DataTableServer';
import { ToogleDiv, consoleDev, loading_data } from '../../components/Generic';


function Cohort() {
    const { cohort } = useParams();

    const [cohortData, setCohortData] = useState();
    const [cohortTitle, setCohortTitle] = useState();
    const [cohortName, setCohortName] = useState();
    const [noEntry, setNoEntry] = useState(false)
    const [cohortImageSource, setCohortImageSource] = useState();

    const fetchCohortData = async () => {
        const cohort_data = await restApiCall('cohort/'+cohort);
        if (cohort_data && Object.keys(cohort_data).length) {
            setCohortData(cohort_data);
            setCohortTitle(cohort_data.name_full ? cohort_data.name_full : cohort_data.name_short)
            setCohortName(cohort_data.name_short ? cohort_data.name_short : cohort_data.name_full)
        }
        else {
            setNoEntry(true);
        }
    }

    const getUrlEndpointTraining = () => {
        return 'score/search?cohort_training='+cohortName+'&include_ancestry=0';
    }
    const getUrlEndpointValidation = () => {
        return 'score/search?cohort_validation='+cohortName+'&include_ancestry=0';
    }

    const getImageSource = async (cohort_name) => {
        try {
            const src = await import(`../../assets/cohorts/${cohort_name.toUpperCase()}.png`)
            if (src) {
                setCohortImageSource(src.default);
            }
        }
        catch(err){
            // Image not found
            consoleDev("Error: "+err)
        }
    }

    const get_information_left_content = () => {
		return (
			<>
                { cohortData.name_full && cohortData.name_short ? <tr><td>Short name</td><td>{cohortData.name_short}</td></tr> : ''}
                { cohortData.name_full && cohortData.name_short ? '' : <tr><td>Long name</td><td>{cohortData.name_full}</td></tr>}
                { cohortData.url ? <tr><td>Website</td><td><Href text={cohortData.url} href={cohortData.url}/></td></tr>:''}
                { cohortData.description ? <tr><td>Description</td><td>{cohortData.description}</td></tr>:''}
                { cohortData.ancestries ? <tr><td>Ancestr{cohortData.ancestries.length > 1 ? 'ies' : 'y'}</td><td>{display_ancestries(cohortData.ancestries)}</td></tr>:''}
            </>
        )
    }

    const get_information_right_content = () => {
        return (
            <>
                <tr key='training_sample'><td className='op_header_info_no_col' colSpan="2">
                    <div className='d-flex justify-content-between'>
                        <div>Linked Score(s) - Sample training</div>
                        <Tooltip title="See details in the 'Linked Score(s) - Sample training' table">
                            <div className="ms-3">
                                <Href href="#linked_score_s_sample_training" icon={<Table/>}/>
                            </div>
                        </Tooltip>
                    </div>
				</td></tr>
                <tr key='validation_sample'><td className='op_header_info_no_col' colSpan="2">
                    <div className='d-flex justify-content-between'>
                        <div>Linked Score(s) - Sample validation</div>
                        <Tooltip title="See details in the 'Linked Score(s) - Sample validation' table">
                            <div className="ms-3">
                                <Href href="#linked_score_s_sample_validation" icon={<Table/>}/>
                            </div>
                        </Tooltip>
                    </div>
				</td></tr>
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
        getImageSource(cohort);
    },[])

    return (
        <>
            { cohortName && cohortTitle && cohortData && cohortData.name_short ?
                <>
                    <PageTitle type='hl' category='Cohort' label={cohortTitle} title={'Cohort '+cohortTitle}/>
                    <div>
                        <div className='d-flex justify-content-between'>
                            {/* Summary data */}
                            <div className='op_card_container_info'>
                                {/* <HeaderCard type='cohort' content={get_information_content()} /> */}
                                <Header2Cards type_left='cohort' content_left={get_information_left_content()} type_right='Cohort use' content_right={get_information_right_content()}/>
                            </div>
                            { cohortImageSource ? <div className='ms-2 me-5'><img className="img-cohort p-2" src={cohortImageSource} alt={cohortName}/></div> : ''}
                        </div>

                        {/* Scores linked to training sample */}
                        <div className="mt-4">
                            {op_subtitle_no_asso('cohort_training','Linked Score(s) - Sample training')}
                            <DataTableServer url_suffix={getUrlEndpointTraining()} columns={scores_columns} groups={[common_column_groups['molecular_trait_id']]}/>
                        </div>
                        {/* Scores linked to validation sample */}
                        <div className="mt-4">
                            {op_subtitle_no_asso('cohort_validation','Linked Score(s) - Sample validation')}
                            <DataTableServer url_suffix={getUrlEndpointValidation()} columns={scores_columns} groups={[common_column_groups['molecular_trait_id']]}/>
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
