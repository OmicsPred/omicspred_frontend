import Href from "../../../components/Href"


const PlatformCohort = (props) => {
    const sample_cohorts = props.sample_cohorts;

    const get_cohorts_list = () => {
        let cohorts_list = {}
        for (let i=0; i<sample_cohorts.length; i++) {
            for (let j=0; j<sample_cohorts[i].cohorts.length; j++) {
                const cohort = sample_cohorts[i].cohorts[j];
                if (!cohorts_list[cohort.name_short]) {
                    cohorts_list[cohort.name_short] = cohort;
                }
            }
        }
        return cohorts_list;
    }

    const cohorts_obj_list = get_cohorts_list();
 
    return (
        <>
        {
            Object.keys(cohorts_obj_list).sort().map((cohort_name, index) => {
                const cohort = cohorts_obj_list[cohort_name];
                if (cohort.url) {
                    return (<span key={cohort.name_short}>{index ? ', ': ''}<Href text={cohort.name_short} href={'/cohort/'+cohort.name_short}/></span>)
                }
                else {
                    return (<span key={cohort.name_short}>{index ? ', ': ''}{cohort.name_short}</span>)
                }
            })
        }
        </>
    );
};
export default PlatformCohort;