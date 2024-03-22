import { People, Collection, CollectionFill } from 'react-bootstrap-icons';
import Href from "../../../components/Href";
import { numberBadge, participantsBadge } from "../../../components/Generic";
import { ToogleDiv } from "../../../components/Common";

const PlatformSampleCohorts = (props) =>{
    const samples = props.samples;

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
                    'url': <Href text='External link' href={cohort_url}/>,
                    'ancestry': {}
                }
                cohorts_obj[cohort_name]['ancestry'][ancestry] = 0;
            }
            cohorts_obj[cohort_name]['ancestry'][ancestry] += participants;
        }
        console.log('cohorts_obj:');
        console.log(cohorts_obj);
        return cohorts_obj
    }

    const render_ancestries = (data) => {
        return (
            <>
                <ul>
                { 
                    Object.keys(data['ancestry']).map((key) => <li key={'sublist_'+key}>{key}: {participantsBadge(data['ancestry'][key])}</li>)
                }
                </ul>
                {data['url']}
            </>
        )
    }

    const samples_list = get_samples_list(samples);
 
    return (
        <>
        { samples_list.map((sample,index) =>
        <div>
            { samples_list.length > 1 ? <div><CollectionFill className='hl_color me-2'/>Sample {index+1}{sample.participants ? <> - {participantsBadge(sample.participants)}</>: ''}</div> : '' }
            <ul>
                { samples_list.length == 1 && sample.participants ? <li>Participants: {participantsBadge(sample.participants)}</li> : '' }
                { sample.sample_percent_male? <li>% Male: {sample.sample_percent_male}</li> : '' }
                { sample.sample_age ? <li>Mean Age: {sample.sample_age} {sample.sample_age_sd ? ' ± '+sample.sample_age_sd:''}</li> : '' }
                <li>Cohorts:
                    <ul>
                    {
                        Object.keys(sample.cohorts).map((cohort_name) => {
                            return (
                                <li key={'li_'+cohort_name}><ToogleDiv key={'toggle_'+cohort_name} title={cohort_name} content={render_ancestries(sample.cohorts[cohort_name])}/></li>
                            )
                        })

                    }
                    </ul>
                </li>
            </ul>
        </div>)}
        </>
    );
};
export default PlatformSampleCohorts;