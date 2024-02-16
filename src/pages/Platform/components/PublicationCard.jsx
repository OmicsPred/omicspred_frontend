import { numberBadge } from "../../../components/Generic";
import PlatformSampleCohorts from './PlatformSampleCohorts';
import Href from "../../../components/Href";

const PublicationCard = (props) => {
    const additional = props.data
    const publication = additional.publication;
    const key = publication.pmid

    const pub_year = publication.date_publication.split('-')[0]
    return (
        <div className="result_card mb-3" key={key+"_res"} style={{float:"left"}}>
            <div className="card-deck" key={key+"_card"}>
                <div className="card" style={{padding:"0px", maxWidth:"750px"}}>
                    <div className="card-body">
                        <h4 className="card-title">{publication.title}</h4>
                        <div className="card-text">
                            <div><Href key={key+'_pub_link'} text={[publication.firstauthor," ",<i key={key+'_i'}>et al.</i>," - ",publication.journal," (",pub_year,")"]} href={"/publication/"+key}/></div>
                            <div><span className="me-1"><b>Number of scores</b>:</span>{numberBadge(additional.omics_count)}</div>
                            <div className="d-flex">
                                { additional.samples_training.length > 0 ?
                                    <div key={key+"_platform_training_cohorts"}><span><b>Training Cohort{additional.samples_training.length > 1 && 's'}</b></span><PlatformSampleCohorts key={key+'_training'} samples={additional.samples_training}/></div>:''
                                }
                                { additional.samples_validation.length > 0 ?
                                    <div className="ms-4 ps-4" key={key+"_platform_validation_cohorts"} style={{borderLeft:"1px solid #CCC"}}><span><b>Validation Cohort{additional.samples_validation.length > 1 && 's'}</b></span><PlatformSampleCohorts key={key+'_validation'} samples={additional.samples_validation}/></div>:''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PublicationCard;