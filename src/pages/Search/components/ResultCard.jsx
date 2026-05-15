import Href from "../../../components/Href"
import { numberBadge, scoresBadge, add_s_when_plural, phewasBadge } from '../../../components/Generic';
import { element_icon } from '../../../components/Common';
import OmicsList from "./OmicsList"
import MolecularTraits from './MolecularTraits';


const index2url = {
    'gene': 'gene',
    'metabolite': 'metabolite',
    'pathway': 'pathway',
    'phenotype': 'phenotype',
    'protein': 'protein',
    'score': 'score',
    'tissue': 'tissue'
}

const index2id = {
    'gene': 'Gene ID',
    'metabolite': 'Metabolite ID',
    'pathway': 'Pathway ID',
    'phenotype': 'Phenotype ID',
    'protein': 'Protein ID',
    'score': 'OmicsPred ID',
    'tissue': 'Tissue ID',
}


export default function ResultCard(props) {

    // Change 'label' to 'name' (tissue results)
    if (props.data.label) {
        props.data.name = props.data.label
    }

    const data = props.data;
    // Temporary updates - begin
    let omics_types = undefined;
    if (data.omics_type) {
        omics_types = Array.isArray(data.omics_type) ? data.omics_type : [data.omics_type];
    }
    // Temporary updates - end
    let result_id = data.name ? data.name : data.id;
    let url_id = data.id ? data.id : data.name

    if (props.type == 'score') {
        result_id = data.id;
    }

    // if (props.type == 'phenotype'){
    //     url_id = url_id.replace('.','_');
    // }

    if (data.platform_name) {
        data.platform_name.sort();
    }

    const key = result_id.replace(' ','_');

    const url = '/'+index2url[props.type]+'/'+url_id;

    const separator_tag = <span className='search_separator_2'>/</span>;

    const display_phenotype_category = () => {
        if (props.type == 'phenotype') {
            return (<><span className="line_key search_separator_1">Category</span>{data.categories_list.join(', ')}</>)
        }
        else { return '' }
    }

    const display_phenotype_reported_trait = () => {
        if (props.type == 'phenotype') {
            return (<><span className="line_key search_separator_1">Reported PheCode(s)</span>{data.traits_reported_list.join(', ')}</>)
        }
        else { return '' }
    }


    const display_platforms_list = (platforms_list) => {
        return (
            <>
            {
                platforms_list.map((platform_name, index) => {
                    let separator = ''
                    if (index < platforms_list.length-1) {
                        separator = separator_tag;
                    }
                    return (<span key={platform_name}>{platform_name}{separator}</span>)
                })
            }
            </>
        );
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
                                    {index != 0 ? separator_tag:''}
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
            return (<><span className="line_key search_separator_1">Source</span>{data.external_id_source}</>)
        }
        else if (data.source) {
            return <small className="ms-2">(Source: {data.source})</small>
        }
        return ''
    }

    return (
        <div className="op_result_card mb-3" key={key+"_res"} data-omics={omics_types} data-platform={data.platform_name} data-type={props.type}>
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
                                        { data.scores_count && data.scores_count > 0 ? <li><span className="line_key">Scores count</span>{scoresBadge(data.scores_count)}</li>:'' }
                                        { data.phewas_count && data.phewas_count > 0 ? <li><span className="line_key">PheWAS associations</span>{phewasBadge(data.phewas_count)}{display_phenotype_reported_trait()}</li>:'' }
                                        { omics_types && omics_types.length > 0 ? <li><span className="line_key">Omics type{omics_types.length > 1 && 's'}</span><OmicsList omics={omics_types} key_prefix={result_id}/></li> : '' }
                                        { data.platform_name && data.platform_name.length > 0 ? <li><span className="line_key">Platform{data.platform_name.length > 1 && 's'}</span>{display_platforms_list(data.platform_name)}</li> : '' }
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