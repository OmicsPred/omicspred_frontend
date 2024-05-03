// import { CollectionFill } from 'react-bootstrap-icons';
import Href from "../components/Href";
// import { ToogleDiv, participantsBadge } from "../components/Generic";
import { participantsBadge } from "../components/Generic";


export const SampleTable = (props) => {
    const key = props.table_name;
    const samples_training = props.samples_training;
    const samples_validation = props.samples_validation;
    return (
        <table className="table table_op">
            <thead>
                <tr>
                    <th scope="col">Sample Type</th>
                    <th scope="col">Cohort</th>
                    <th scope="col">Ancestry</th>
                    <th scope="col">Participants</th>
                    <th scope="col">% Males</th>
                    <th scope="col">Mean Age</th>
                </tr>
            </thead>
            <tbody>
                { samples_training.length > 0 ? <PlatformSampleCohorts key={key+'_training'} sample_type="Training" samples={samples_training}/> : '' }
                { samples_validation.length > 0 ? <PlatformSampleCohorts key={key+'_validation'} sample_type="Validation" samples={samples_validation}/> : '' }
            </tbody>
        </table>
    )
}


const PlatformSampleCohorts = (props) => {
    const samples = props.samples;
    const sample_type = props.sample_type;

    const get_samples_list = (samples_list) => {
        let samples_list_obj = [];
        for (let i=0; i < samples_list.length; i++) {
            let sample_obj = {}
            const sample = samples_list[i];
            const participants = sample.sample_number;
            sample_obj['participants'] = sample.sample_number;
            if (sample.sample_percent_male) {
                sample_obj['sample_percent_male'] = sample.sample_percent_male;
            }
            if (sample.sample_age) {
                sample_obj['sample_age'] = sample.sample_age;
            }
            if (sample.sample_age_sd) {
                sample_obj['sample_age_sd'] = sample.sample_age_sd
            }
            sample_obj['cohorts'] = get_cohorts_list(sample);
            samples_list_obj.push(sample_obj);
        }
        console.log('samples_list_obj:');
        console.log(samples_list_obj);
        return samples_list_obj;
    }

    const get_cohorts_list = (sample) => {
        let cohorts_obj = {};
        const participants = sample.sample_number;
        const ancestry = sample.ancestry_broad;
        for (let j=0; j < sample.cohorts.length; j++) {
            const cohort_name = sample.cohorts[0].name_short;
            const cohort_url = sample.cohorts[0].url;
            if (cohorts_obj[cohort_name]) {
                if (!cohorts_obj[cohort_name]['ancestry'][ancestry]) {
                    cohorts_obj[cohort_name]['ancestry'][ancestry] = 0;
                }
            }
            else {
                cohorts_obj[cohort_name] = {
                    // 'url': <Href text='External link' href={cohort_url}/>,
                    'url': cohort_url,
                    'ancestry': {}
                }
                cohorts_obj[cohort_name]['ancestry'][ancestry] = 0;
            }
            cohorts_obj[cohort_name]['ancestry'][ancestry] += participants;
        }
        return cohorts_obj
    }

    const render_ancestries = (cohort_name, data, sample_participants) => {
        return (
            <span key={'anc_'+cohort_name}>
                { 
                    Object.keys(data['ancestry']).map((key) => <div key={'sublist_'+key}>{key}{data['ancestry'][key] == sample_participants ? '': <>: {participantsBadge(data['ancestry'][key])}</>}</div>)
                }
            </span>
        )
    }

    const samples_list = get_samples_list(samples);
 
    return (
        <>
            { samples_list.map((sample,index) =>
                <tr key={sample_type+sample.participants+'_tr'}>
                    { index == 0 ? <td scope="row" rowSpan={samples_list.length}>{sample_type == 'Training'? <span className='training_col font-bold'>{sample_type}</span>:<span className='font-bold'>{sample_type}</span>}</td> : '' }
                    <td>
                        { sample.cohorts.length > 1 ?
                                <ul key={'ul_'+cohort_name}className="mb-0">
                                {
                                    Object.keys(sample.cohorts).map((cohort_name) => {
                                        return (
                                            <li key={'li_'+cohort_name}><Href key={cohort_name+'_link'} href={sample.cohorts[cohort_name]['url']} text={cohort_name}/></li>
                                        )
                                    })
                                }
                                </ul>
                            :
                            Object.keys(sample.cohorts).map((cohort_name) => <Href key={cohort_name+'_link'} href={sample.cohorts[cohort_name]['url']} text={cohort_name}/>)
                        }
                    </td>
                    <td>
                        { Object.keys(sample.cohorts).map((cohort_name) => render_ancestries(cohort_name,sample.cohorts[cohort_name],sample.participants)) }
                    </td>
                    { sample.participants ? <td>{participantsBadge(sample.participants)}</td> : <td>-</td> }
                    { sample.sample_percent_male? <td>{sample.sample_percent_male}</td> : <td>-</td> }
                    { sample.sample_age ? <td>{sample.sample_age} {sample.sample_age_sd ? ' ± '+sample.sample_age_sd:''}</td> : <td>-</td> }
                </tr>
            )}
        </>
    );

};
