import Href from "../../../components/Href";
import { numberBadge } from "../../../components/Generic";
import { ToogleDiv } from "../../../components/Common";

const PlatformSampleCohorts = (props) =>{
    const samples = props.samples;

    const get_cohorts_list = (samples_list) => {
        let cohorts_obj = {};
        for (let i=0; i < samples_list.length; i++) {
            const sample = samples_list[i];
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
                    Object.keys(data['ancestry']).map((key) => <li key={'sublist_'+key}>{key}: {numberBadge(data['ancestry'][key])}</li>)
                }
                </ul>
                {data['url']}
            </>
        )
    }

    const cohorts_list = get_cohorts_list(samples);
 
    return (
        <ul>
        { 
            Object.keys(cohorts_list).map((cohort_name) => {
                return (
                    <li key={'li_'+cohort_name}><ToogleDiv key={'toggle_'+cohort_name} title={cohort_name} content={render_ancestries(cohorts_list[cohort_name])}/></li>
                )
            })

        }
        </ul>
    );
};
export default PlatformSampleCohorts;