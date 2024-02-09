import { numberBadge } from "../../../components/Generic";
import PlatformCohort from '../../Home/components/PlatformCohort';

const PublicationCard = (props) =>{
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
                            <div>{publication.firstauthor} <i>et al.</i> - {publication.journal} ({pub_year})</div>
                            <ul className="key_val_line mb-1">
                                <li key="platform_nb_entries"><span className='line_key'>Number of scores</span>{numberBadge(additional.omics_count)}</li>
                                <li key="platform_cohorts"><span className='line_key'>Cohort{additional.cohorts.length > 1 && 's'}</span><PlatformCohort cohorts={additional.cohorts}/></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PublicationCard;