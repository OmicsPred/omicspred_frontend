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


const render_ancestry = (ancestry_data, publication_id, type) => {
    const ancestry_list = format_ancestry_data(ancestry_data);
    return <AncestryDistribution key={"anc_"+type} data={ancestry_list} publication_id={publication_id} size={chart_size}/>
}


const value_getter_ancestry = (ancestry_data) => {
    const ancestry_names = Object.keys(ancestry_data)
    const anc_list = ancestry_names.map((anc_name) => <>{anc_name}:{ancestry_data[anc_name].count}</>);
    return anc_list.join(',');
}


const get_multi_ancestry_list = (anc_data) => {
    let label_list = []
    if (anc_data != 'Multi-ancestry') {
        const anc_list = anc_data.split(', ');
        for (let a=0; a<anc_list.length; a++) {
            const sub_label = get_ancestry_name(anc_list[a]);
            label_list.push(sub_label)
        }
    }
    return label_list.sort()
}


const compute_sample_dist = (sample_data) => {
    let sample_total_number = 0;
    let ancestry_dist = {};
    let anc_dist = {};
    for (let j=0; j<sample_data.length; j++) {
        const sample_entry = sample_data[j];
        const sample_number = sample_entry.sample_number;
        const label = get_ancestry_name(sample_entry.ancestry_broad);
        if (anc_dist[label]) {
            anc_dist[label]['count'] += sample_number;
        }
        else {
            anc_dist[label] = { 'count': sample_number };
        }
        if (label == 'MAO') {
            const anc_list = get_multi_ancestry_list(sample_entry.ancestry_broad);
            if (anc_list.length > 0) {
                anc_dist[label]['anc_list'] = anc_list;
            }
        }
        sample_total_number += sample_number;
    }
    // Post-process ancestry distribution
    if (Object.keys(anc_dist).length > 0) {
        ancestry_dist = { 'anc': {}, 'count': sample_total_number }

        // Sort distributed ancestries
        let anc_labels = Object.keys(anc_dist);
        anc_labels.sort()
        for (let k=0; k<anc_labels.length; k++) {
            let anc_label = anc_labels[k];
            ancestry_dist['anc'][anc_label] = anc_dist[anc_label];
        }

        // Update distribution
        const dev_ancestries = Object.keys(ancestry_dist['anc']);
        for (let l=0; l<dev_ancestries.length; l++) {
            const anc_label = dev_ancestries[l];
            let dist = (ancestry_dist['anc'][anc_label]['count'] / sample_total_number)*100
            ancestry_dist['anc'][anc_label]['dist'] = parseFloat(dist.toFixed(1))
        }
    }
    return ancestry_dist
}


export const ancestry_cols = {
    'ancestry': {
        field: 'ancestry',
        headerName: 'Ancestry',
        width: 175,
        renderCell: (params) => {
            const ancestry = params.row.sample.ancestry_broad;
            const ancestry_label = get_ancestry_name(ancestry);
            
            return <><span className={'me-2 align-middle anc_label anc_'+ancestry_label} title={ ancestry_label == 'MAO' &&  ancestry != 'Multi-ancestry' ? 'Multi-ancestry': ancestry} style={{lineHeight:"16px",marginBottom:"1px"}}></span><span className='align-middle'>{ancestry}</span></>;
        },
        valueGetter: (value, row) => {
            return row.sample.ancestry_broad;
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
                        return render_ancestry(params.row.ancestry.dev.anc,params.row.publication.id,'training');
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
    'ancestry_training_computed': {
        field: 'ancestry_training',
        headerName: 'Training',
        description: 'Ancestry distribution of the training cohort(s)',
        minWidth: 100,
        filterable: false,
        resizable: false,
        sortable: false,
        renderCell: (params) => {
            const ancestry_data = compute_sample_dist(params.row.samples_training)
            if (ancestry_data) {
                if (ancestry_data['anc']) {
                    return render_ancestry(ancestry_data['anc'],params.row.publication,'training');
                }
            }
            return <div className="text-center align-middle" style={{lineHeight:"50px"}}>{default_cell_value}</div>;
        },
        valueGetter: (value, row) => {
            const ancestry_data = compute_sample_dist(row.samples_training)
            if (ancestry_data) {
                if (ancestry_data['anc']) {
                    return value_getter_ancestry(ancestry_data['anc']);
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
                        return render_ancestry(params.row.ancestry.eval.anc,params.row.publication.id,'validation');
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
    },
    'ancestry_validation_computed': {
        field: 'ancestry_validation',
        headerName: 'Validation',
        description: 'Ancestry distribution of the validation cohort(s)',
        minWidth: 100,
        filterable: false,
        resizable: false,
        sortable: false,
        renderCell: (params) => {
            const ancestry_data = compute_sample_dist(params.row.samples_validation)
            if (ancestry_data) {
                if (ancestry_data['anc']) {
                    return render_ancestry(ancestry_data['anc'],params.row.publication,'validation');
                }
            }
            return <div className="text-center align-middle" style={{lineHeight:"50px"}}>{default_cell_value}</div>;
        },
        valueGetter: (value, row) => {
            const ancestry_data = compute_sample_dist(row.samples_validation)
            if (ancestry_data) {
                if (ancestry_data['anc']) {
                    return value_getter_ancestry(ancestry_data['anc']);
                }
            }
        }
    }
}