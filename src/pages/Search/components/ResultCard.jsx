import Href from "../../../components/Href"
import { numberBadge, scoresBadge, add_s_when_plural } from '../../../components/Generic';
import { element_icon } from '../../../components/Common';
import OmicsList from "./OmicsList"
import MolecularTraits from './MolecularTraits';


const index2url = {
    'gene': 'gene',
    'metabolite': 'metabolite',
    'pathway': 'pathway',
    'phenotype': 'phenotype',
    'protein': 'protein',
    'score': 'score'
}

const index2id = {
    'gene': 'Gene ID',
    'metabolite': 'Metabolite ID',
    'pathway': 'Pathway ID',
    'phenotype': 'Phenotype ID',
    'protein': 'Protein ID',
    'score': 'OmicsPred ID'
}


export default function ResultCard(props) {
    const data = props.data;

    let result_id = data.name ? data.name : data.id;
    let url_id = data.id ? data.id : data.name

    if (props.type == 'score') {
        result_id = data.id;
    }

    if (props.type == 'phenotype'){
        url_id = url_id.replace('.','_');
    }

    if (data.platform_name) {
        data.platform_name.sort();
    }

    const key = result_id.replace(' ','_');

    const url = '/'+index2url[props.type]+'/'+url_id;

    const display_phenotype_category = () => {
        if (props.type == 'phenotype') {
            return (<><span className="px-3">/</span><span className="line_key">Category</span>{data.category}</>)
        }
        else { return ''; }
    }

    const display_molecular_trait_counts = (data) => {
        const mt_types_list = {
            'genes': 'Gene',
            'proteins': 'Protein',
            'metabolites': 'Metabolite'
        }

        const mt_types = Object.keys(mt_types_list);

        let mt_types_with_data = [];
        for (let i=0; i<mt_types.length;i++) {
            const mt_type = mt_types[i];
            if (data[mt_type] && data[mt_type].length > 0) {
                mt_types_with_data.push(mt_type);
            }
        }
        return (
            <>
                { mt_types_with_data.length > 0 ?
                    <li key='asso_mt'>
                        <span className="line_key">Associated Molecular Traits</span>
                        {
                            mt_types_with_data.map((mt_type, index) =>
                                <span key={mt_type}>
                                    {index != 0 ? <span className="px-2">/</span>:''}
                                    <span>{mt_types_list[mt_type]}{add_s_when_plural(data[mt_type].length)} {numberBadge(data[mt_type].length)}</span>
                                </span>
                            )
                        }
                    </li>
                : '' }
            </>
        )
    }

    const get_source_name = (data) => {
        if (data.external_id_source) {
            return (<><span className="px-3">/</span><span className="line_key">Source</span>{data.external_id_source}</>)
        }
        else if (data.source) {
            return <small className="ms-2">(Source: {data.source})</small>
        }
        return ''
    }

    return (
        <div className="op_result_card mb-3" key={key+"_res"} data-omics={data.omics_type} data-platform={data.platform_name} data-type={props.type}>
            <div className="card-deck" key={key+"_card"}>
                <div className="card ms-2 me-2" style={{padding:"0px", width:"100%"}}>
                    <div className="card-body">
                        <h4 className="card-title op_search_card"><div><span className="me-1" title={props.type}>{element_icon(props.type)}</span><Href href={url} text={result_id}/></div></h4>
                        <div className="card-text">
                            <div className="op_search_card_content">
                                <div>
                                    <ul className="result_content">
                                        { result_id == data.name && data.id ? <li><span className="line_key">{index2id[props.type]}</span>{data.id}{get_source_name(data)}{display_phenotype_category()}</li> : '' }
                                        { result_id == data.id && data.name ? <li><span className="line_key">Name</span>{data.name}</li> : '' }
                                        { props.type == 'pathway' ? display_molecular_trait_counts(data) : ''}
                                        { data.scores_count && data.scores_count ? <li><span className="line_key">Scores count</span>{scoresBadge(data.scores_count)}</li>:'' }
                                        { data.omics_type && data.omics_type.length > 0 ? <li><span className="line_key">Omics type{data.omics_type.length > 1 && 's'}</span><OmicsList omics={data.omics_type} key_prefix={result_id}/></li> : '' }
                                        { data.platform_name && data.platform_name.length > 0 ? <li><span className="line_key">Platform{data.platform_name.length > 1 && 's'}</span>{data.platform_name.join(', ')}</li> : '' }
                                    </ul>
                                </div>
                                { props.type == 'score' ? <MolecularTraits data={data}/> : '' }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}