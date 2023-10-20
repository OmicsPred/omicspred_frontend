import Href from "../../../../components/Href"
import OmicsList from "./OmicsList"

const index2url = {
    'gene': 'gene',
    'metabolite': 'metabolite',
    'phecode': 'phecode',
    'protein': 'protein',
    'score': 'score'
}

const index2id = {
    'gene': 'Ensembl ID',
    'metabolite': 'Metabolon ID',
    'phecode': 'Phecode',
    'protein': 'UniProt ID',
    'score': 'OmicsPred ID'
}


export default function ResultCard(props) {
    const data = props.data;

    let result_id = data.name ? data.name : data.id;
    let url_id = data.id ? data.id : data.name

    const key = result_id.replace(' ','_');

    const url = '/'+index2url[props.type]+'/'+url_id;
    
    let omics_types = '';
    if (data.omics_type.length > 0) {
        // const hl_omics_types = data.omics_type.map((data) => {return (<span className={'hl_'+data}>{data}</span>)});
        // // omics_types = data.omics_type.join(', ');
        // omics_types = hl_omics_types.join(', ');
    }

    return (
        <div className="result_card mb-3" key={key+"_res"} data-omics={data.omics_type} data-platform={data.platform_name}>
            {/* <div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column" key={result_id+"_res"}> */}
            <div className="card-deck" key={key+"_card"}>
                <div className="card ms-2 me-2"  style={{padding:"0px", width:"100%"}}>
                    <div className="card-body">
                        <h4 className="card-title"><Href href={url} text={result_id}/></h4>
                        <div className="card-text">
                            <ul className="key_val_line mb-1">
                                { result_id == data.name && data.id ? <li><span className="line_key">{index2id[props.type]}</span>{data.id}</li> : ''}
                                { result_id == data.id && data.name ? <li><span className="line_key">Name</span>{data.name}</li> : ''}
                                { props.scores_count ? <li><span className="line_key">Scores count</span>{data.scores_count}</li>:''}
                                {/* <li><span className="line_key">Omics type(s)</span>{data.omics_type.join(', ')}</li> */}
                                {data.omics_type.length > 0 ? <li><span className="line_key">Omics type{data.omics_type.length > 1 && 's'}</span><OmicsList omics={data.omics_type} key_prefix={result_id}/></li> : ''}
                                {data.platform_name.length > 0 ? <li><span className="line_key">Platform{data.platform_name.length > 1 && 's'}</span>{data.platform_name.join(', ')}</li> : ''}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}