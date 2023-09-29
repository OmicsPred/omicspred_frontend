import Href from "../../../components/Href"


const PlatformCohort = (props) =>{
    const cohorts = props.cohorts;
 
    return (
        <>
        {
            cohorts.map((cohort, index) => {
                if (cohort.url) {
                    return (<span key={cohort.name_short}>{index ? ', ': ''}<Href text={cohort.name_short} href={cohort.url}/></span>)
                }
                else {
                    return (<span key={cohort.name_short}>{index ? ', ': ''}cohort.name_short</span>)
                }
            })
        }
        </>
    );
};
export default PlatformCohort;