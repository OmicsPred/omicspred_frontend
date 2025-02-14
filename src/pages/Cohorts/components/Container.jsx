import { ChevronRight } from 'react-bootstrap-icons';
import Href from "../../../components/Href";
import { add_s_when_plural } from '../../../components/Generic';

const Container = (props) => {
    const cohort = props.data;

    return (
        <div className="w-full h-auto py-2">
            <h3 className="hl_grey_box mb-3 p-2">
                <span>
                    <ChevronRight className='me-1' size='1.4rem'/><Href href={cohort.href} text={cohort.title}/>
                </span>
            </h3>
            <div className="d-flex mb-5">
                <div>
                    <div className='mb-1'><span className='me-2'>Short name{add_s_when_plural(cohort.labels.length)}:</span>
                        {cohort.labels.map((cohort_label,index) => <span key={cohort_label}>{index > 0 ? ', ':''}<Href href={"/cohort/"+cohort_label} text={cohort_label}/></span>)}
                    </div>
                    <span>{cohort.desc}</span>
                </div>
                <div className="ps-3">
                    {
                        cohort.src ? (<img style={{maxHeight:"150px", maxWidth:"150px"}} src={cohort.src} alt={cohort.title}/>) : ''
                    }
                </div>
            </div>
        </div>
    );
};

export default Container;
