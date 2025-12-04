import { ancestry_labels } from '../Common';


const AncestryLegend = () => {

    const anc_list = Array.from(Object.keys(ancestry_labels()));
    const anc_length = anc_list.length;
    const grp_cutoff = Math.floor(anc_length/2 + 0.5);

    let anc_list_left = [];
    let anc_list_right = [];

    for (let i=0; i< anc_length; i++) {
        if (i < grp_cutoff) {
            anc_list_left.push(anc_list[i]);
        }
        else {
            anc_list_right.push(anc_list[i]);
        }
    }


    const ancestry_item = (anc) => {
        const ancestry_labels_data = ancestry_labels();
        return(
            <div key={anc}>
                <span className={'me-2 align-middle anc_label anc_'+anc}></span><span className='align-middle'>{ancestry_labels_data[anc]}</span>
            </div>
        )
    }


    return(
        <div className="card p-0">
            <div className="card-header"><h6 className="mb-0">Ancestry legend</h6></div>
            <div className="card-body p-2">
                <div className="card-text" style={{ fontSize:"12px" }}>
                    <div className='d-flex'>
                        <div className='d-flex flex-column'>
                            {anc_list_left.map((anc) => ancestry_item(anc))}
                        </div>
                        <div className='d-flex flex-column op_form_v_sep'>
                            {anc_list_right.map((anc) => ancestry_item(anc))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AncestryLegend;