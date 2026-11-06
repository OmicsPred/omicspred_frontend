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


const render_ancestry = (dist_data, publication_id, type) => {
    let ancestry_list = {'ancestry_data': format_ancestry_data(dist_data['anc']) }
    if (dist_data['avg_count']){
        ancestry_list['avg_participants'] = dist_data['avg_count']
    }
    return <AncestryDistribution key={"anc_"+type} data={ancestry_list} publication_id={publication_id} size={chart_size}/>
}


const value_getter_ancestry = (ancestry_data) => {
    const ancestry_names = Object.keys(ancestry_data);
    let anc_list = '';
    for (let i=0; i<ancestry_names.length; i++) {
        const anc_name = ancestry_names[i];
        if (anc_list != '') {
            anc_list += ',';
        }
        anc_list += anc_name+':'+ancestry_data[anc_name].count
    }
    return anc_list;
}


export const ancestry_cols = {
    'ancestry': {
        field: 'ancestry',
        headerName: 'Ancestry',
        width: 175,
        renderCell: (params) => {
            let ancestry = (params.row.sample) ? params.row.sample.ancestry_broad : undefined;
            if (!ancestry) {
                ancestry = params.row.ancestry_broad;
            }
            const ancestry_label = get_ancestry_name(ancestry);
            return <><span className={'me-2 align-middle anc_label anc_'+ancestry_label} title={ ancestry_label == 'MAO' &&  ancestry != 'Multi-ancestry' ? 'Multi-ancestry': ancestry} style={{lineHeight:"16px",marginBottom:"1px"}}></span><span className='align-middle'>{ancestry}</span></>;
        },
        valueGetter: (value, row) => {
            let ancestry = (row.sample) ? row.sample.ancestry_broad : undefined;
            if (!ancestry) {
                ancestry = row.ancestry_broad;
            }
            return ancestry;
        }
    },
    'ancestries': {
        field: 'ancestries',
        headerName: 'Ancestry',
        width: 150,
        renderCell: (params) => {
            const samples = params.row.samples;
            let ancestries = {}
            for (let i=0; i<samples.length; i++) {
                const ancestry = samples[i].ancestry_broad;
                const ancestry_label = get_ancestry_name(ancestry);
                ancestries[ancestry_label] = ancestry
            }
            // const anc_display = Object.keys(ancestries).map((anc_label) => <><span className={'me-2 align-middle anc_label anc_'+anc_label} title={ anc_label == 'MAO' &&  ancestries[anc_label] != 'Multi-ancestry' ? 'Multi-ancestry': ancestries[anc_label]} style={{lineHeight:"16px",marginBottom:"1px"}}></span><span className='align-middle'>{ancestries[anc_label]}</span></>);
            // return anc_display.join(', ')
            return Object.keys(ancestries).map((anc_label) => <span key={anc_label}><span className={'me-2 align-middle anc_label anc_'+anc_label} title={ anc_label == 'MAO' &&  ancestries[anc_label] != 'Multi-ancestry' ? 'Multi-ancestry': ancestries[anc_label]} style={{lineHeight:"16px",marginBottom:"1px"}}></span><span className='align-middle'>{ancestries[anc_label]}</span></span>);

        },
        valueGetter: (value, row) => {
            const ancestries = row.samples.map((sample) => sample.ancestry_broad);
            return ancestries.join(', ');
        }
    },
    'ancestry_training': {
        field: 'ancestry_training',
        headerName: 'Training',
        description: 'Ancestry distribution of the training cohort(s)',
        minWidth: 100,
        filterable: false,
        resizable: false,
        sortable: false,
        renderCell: (params) => {
            if (params.row.ancestry) {
                if (params.row.ancestry.dev) {
                    if (params.row.ancestry.dev.anc) {
                        return render_ancestry(params.row.ancestry.dev,params.row.publication.id,'training');
                    }
                }
            }
            return <div className="text-center align-middle" style={{lineHeight:"50px"}}>{default_cell_value}</div>;
        },
        valueGetter: (value, row) => {
            if (row.ancestry) {
                if (row.ancestry.dev) {
                    if (row.ancestry.dev.anc) {
                        return value_getter_ancestry(row.ancestry.dev.anc);
                    }
                }
            }
        }
    },
    'ancestry_validation': {
        field: 'ancestry_validation',
        headerName: 'Validation',
        description: 'Ancestry distribution of the validation cohort(s)',
        minWidth: 100,
        filterable: false,
        resizable: false,
        sortable: false,
        renderCell: (params) => {
            if (params.row.ancestry) {
                if (params.row.ancestry.eval) {
                    if (params.row.ancestry.eval.anc) {
                        return render_ancestry(params.row.ancestry.eval,params.row.publication.id,'validation');
                    }
                }
            }
            return <div className="text-center align-middle" style={{lineHeight:"50px"}}>{default_cell_value}</div>;
        },
        valueGetter: (value, row) => {
            if (row.ancestry) {
                if (row.ancestry.eval) {
                    if (row.ancestry.eval.anc) {
                        return value_getter_ancestry(row.ancestry.eval.anc);
                    }
                }
            }
        }
    }
}