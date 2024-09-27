import { ChevronRight } from 'react-bootstrap-icons';
import Href from "../../../components/Href";

const Container = (props) => {
    const cohort = props.data;

    return (
        <div className="w-full h-auto py-2">
            <h3 className="hl_grey_box mb-3 p-2">
                <ChevronRight className='me-1' size='1.4rem'/><Href href={cohort.href} text={cohort.title}/>
            </h3>

            <div className="d-flex mb-5">
                <div>
                    <p>{cohort.desc}</p>
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
