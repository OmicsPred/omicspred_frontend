import { numberBadge } from "../../../components/Generic";
import PlatformSampleCohorts from '../../Platform/components/PlatformSampleCohorts';
import Href from "../../../components/Href";

const PlatformCard = (props) => {
    const platform = props.data.platform;
    const samples_training = props.data.samples_training;
    const samples_validation = props.data.samples_validation;
    const key = platform.name;

    return (
        <div className="result_card mb-3" key={key+"_res"} style={{float:"left"}}>
            <div className="card-deck" key={key+"_card"}>
                <div className="card" style={{padding:"0px", maxWidth:"750px"}}>
                    <div className="card-body">
                        <h4 className="card-title"><Href key={key+'_link'} text={platform.name} href={"/platform/"+platform.name}/></h4>
                        <div className="card-text">
                            <div><span className="me-1"><b>Number of scores</b>:</span>{numberBadge(props.data.omics_count)}</div>
                            <div className="d-flex mt-2">
                                { samples_training.length > 0 ?
                                    <div key={key+"_platform_training_cohorts"}><div className="mb-1"><b>Training Sample{samples_training.length > 1 && 's'}</b></div><PlatformSampleCohorts key={key+'_training'} samples={samples_training}/></div>:''
                                }
                                { samples_validation.length > 0 ?
                                    <div className="ms-4 ps-4" key={key+"_platform_validation_cohorts"} style={{borderLeft:"1px solid #CCC"}}><div className="mb-1"><b>External Validation{samples_validation.length > 1 && 's'}</b></div><PlatformSampleCohorts key={key+'_validation'} samples={samples_validation}/></div>:''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PlatformCard;