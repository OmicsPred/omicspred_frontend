import { useState, useEffect } from 'react';
import { ChevronRight } from 'react-bootstrap-icons';
import Href from "../../../components/Href";
import { add_s_when_plural, consoleDev } from '../../../components/Generic';

const Container = (props) => {
    const [cohortImageSource, setCohortImageSource] = useState();

    const cohort = props.data;

    const not_found = 'not found';

    const getImageSource = async (cohort_name) => {
        try {
            const src = await import(`../../../assets/cohorts/${cohort_name.toUpperCase()}.png`)
            if (src) {
                setCohortImageSource(src.default);
            }
        }
        catch(err){
            // Image not found
            consoleDev("Error: "+err)
            setCohortImageSource(not_found);
        }
    }

    useEffect(() => {
        getImageSource(cohort.labels[0]);
    },[])

    return (
        <div className="w-full h-auto py-2" id={cohort.labels[0]}>
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
                        cohortImageSource && cohortImageSource != not_found ? (<img style={{maxHeight:"150px", maxWidth:"150px"}} src={cohortImageSource} alt={cohort.title}/>) : ''
                    }
                </div>
            </div>
        </div>
    );
};

export default Container;
