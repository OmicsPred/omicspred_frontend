import Href from "../../../components/Href"
import { numberBadge } from '../../../components/Generic';
import OmicsList from "./OmicsList"
import MolecularTraits from './MolecularTraits';


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
    'phecode': 'PheCode',
    'protein': 'UniProt ID',
    'score': 'OmicsPred ID'
}


export default function ResultCard(props) {
    const data = props.data;

    let result_id = data.name ? data.name : data.id;
    let url_id = data.id ? data.id : data.name

    if (props.type == 'score') {
        result_id = data.id;
    }

    data.platform_name.sort();

    const key = result_id.replace(' ','_');

    const url = '/'+index2url[props.type]+'/'+url_id;

    const display_phecode_category = () => {
        if (props.type == 'phecode') {
            return (<><span className="px-3">/</span><span className="line_key">Category</span>{data.category}</>)
        }
        else { return ''; }
    }

    return (
        <div className="result_card mb-3" key={key+"_res"} data-omics={data.omics_type} data-platform={data.platform_name} data-type={props.type}>
            <div className="card-deck" key={key+"_card"}>
                <div className="card ms-2 me-2" style={{padding:"0px", width:"100%"}}>
                    <div className="card-body">
                        <h4 className="card-title op_search_card"><div title={props.type} className={"px-1 me-2 bg_"+props.type}></div><div><Href href={url} text={result_id}/></div></h4>
                        <div className="card-text">
                            <ul className="key_val_line mb-1">
                                { result_id == data.name && data.id ? <li><span className="line_key">{index2id[props.type]}</span>{data.id}{display_phecode_category()}</li> : '' }
                                { result_id == data.id && data.name ? <li><span className="line_key">Name</span>{data.name}</li> : '' }
                                { data.scores_count ? <li><span className="line_key">Scores count</span>{numberBadge(data.scores_count)}</li>:'' }
                                { data.omics_type.length > 0 ? <li><span className="line_key">Omics type{data.omics_type.length > 1 && 's'}</span><OmicsList omics={data.omics_type} key_prefix={result_id}/></li> : '' }
                                { data.platform_name.length > 0 ? <li><span className="line_key">Platform{data.platform_name.length > 1 && 's'}</span>{data.platform_name.join(', ')}</li> : '' }
                                { props.type == 'score' ? <MolecularTraits data={data}/> : '' }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}