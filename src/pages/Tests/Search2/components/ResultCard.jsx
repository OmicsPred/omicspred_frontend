import Href from "../../../../components/Href"


const index2url = {
    'gene': 'gene',
    'protein': 'protein',
    'score': 'score'
}

export default function ResultCard(props) {
    const data = props.data;

    let result_id = data.name ? data.name : data.id;
    const key = result_id.replace(' ','_');

    const url = '/'+index2url[props.type]+'/'+result_id;
    
    return (
        <div className="result_card mb-2" key={key+"_res"} data-omics={data.omics_type} data-platform={data.platform_name}>
            {/* <div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column" key={result_id+"_res"}> */}
            <div className="card-deck" key={key+"_card"}>
                <div className="card ms-2 me-2"  style={{padding:"0px", width:"100%"}}>
                    <div className="card-body">
                        <h4 className="card-title"><Href href={url} text={result_id}/></h4>
                        <div className="card-text">
                            <ul className="key_val_line mb-1">
                                { result_id == data.name && data.id ? <li><span className="line_key">ID</span>{data.id}</li> : ''}
                                { result_id == data.id && data.name ? <li><span className="line_key">Name</span>{data.name}</li> : ''}
                                { props.scores_count ? <li><span className="line_key">Scores count</span>{data.scores_count}</li>:''}
                                <li><span className="line_key">Omics type(s)</span>{data.omics_type.join(', ')}</li>
                                <li><span className="line_key">Platform(s)</span>{data.platform_name.join(', ')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}