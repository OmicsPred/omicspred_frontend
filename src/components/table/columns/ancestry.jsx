import { default_cell_value} from "./common";
import { ancestry_label, get_ancestry_name } from '../../Common';
import AncestryDistribution from '../../ancestry/AncestryDistribution';

const chart_size = 80;


const format_ancestry_data = (anc_data) => {
    const ancestry_names = Object.keys(anc_data);
    const ancestry_list = ancestry_names.map((anc_name) => ({
        "id": anc_name,
        "name": ancestry_label(anc_name),
        "count": anc_data[anc_name]['count'],
        "percent": anc_data[anc_name]['dist'],
        "anc_list": anc_data[anc_name]['anc_list'] ? anc_data[anc_name]['anc_list'] : undefined
    }));
    return ancestry_list;
}

export const ancestry_cols = {
    'ancestry': {
        field: 'ancestry',
        headerName: 'Ancestry',
        width: 200,
        renderCell: (params) => {
            const ancestry = params.row.sample.ancestry_broad;
            const ancestry_label = get_ancestry_name(ancestry);
            
            return <><span className={'me-2 align-middle anc_label anc_'+ancestry_label} title={ ancestry_label == 'MAO' &&  ancestry != 'Multi-ancestry' ? 'Multi-ancestry': ancestry} style={{lineHeight:"16px",marginBottom:"1px"}}></span><span className='align-middle'>{ancestry}</span></>;
        },
        valueGetter: (value, row) => {
            return row.sample.ancestry_broad;
        }
    },
    'ancestry_training': {
        field: 'ancestry_training',
        headerName: 'Training',
        minWidth: 100,
        filterable: false,
        resizable: false,
        sortable: false,
        renderCell: (params) => {
            if (params.row.ancestry) {
                if (params.row.ancestry.dev) {
                    if (params.row.ancestry.dev.anc) {
                        const anc_training = params.row.ancestry.dev.anc;
                        const ancestry_list = format_ancestry_data(anc_training);
                        return <AncestryDistribution key="anc_training" data={ancestry_list} size={chart_size}/>
                    }
                }
            }
            return <div className="text-center align-middle" style={{lineHeight:"50px"}}>{default_cell_value}</div>;
        },
        valueGetter: (value, row) => {
            if (row.ancestry) {
                if (row.ancestry.dev) {
                    if (row.ancestry.dev.anc) {
                        const anc_training = row.ancestry.dev.anc;
                        const ancestry_names = Object.keys(anc_training)
                        const anc_list = ancestry_names.map((anc_name) => <>{anc_name}:{anc_training[anc_name].count}</>);
                        return anc_list.join(',');
                    }
                }
            }
        }
    },
    'ancestry_validation': {
        field: 'ancestry_validation',
        headerName: 'Validation',
        minWidth: 100,
        filterable: false,
        resizable: false,
        sortable: false,
        renderCell: (params) => {
            if (params.row.ancestry) {
                if (params.row.ancestry.eval) {
                    if (params.row.ancestry.eval.anc) {
                        const anc_validation = params.row.ancestry.eval.anc;
                        const ancestry_list = format_ancestry_data(anc_validation);
                        return <AncestryDistribution key="anc_validation" data={ancestry_list} size={chart_size}/>
                    }
                }
            }
            return <div className="text-center align-middle" style={{lineHeight:"50px"}}>{default_cell_value}</div>;
        },
        valueGetter: (value, row) => {
            if (row.ancestry) {
                if (row.ancestry.eval) {
                    if (row.ancestry.eval.anc) {
                        const anc_validation = row.ancestry.eval.anc;
                        const ancestry_names = Object.keys(anc_validation)
                        const anc_list = ancestry_names.map((anc_name) => <>{anc_name}:{anc_validation[anc_name].count}</>);
                        return anc_list.join(',');
                    }
                }
            }
        }
    }
}