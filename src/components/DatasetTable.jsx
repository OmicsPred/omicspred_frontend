import DataTable from './table/DataTable';
import { datasets_platform_columns, datasets_publication_columns, datasets_tissue_columns, dataset_column_groups } from './table/columns/datasets';
import { get_ancestry_name } from './Common';
import AncestryLegend from './ancestry/AncestryLegend';


const DatasetTable = (props) => {
    const dataset = props.data;

    const columns = {
        'platform': datasets_platform_columns,
        'publication': datasets_publication_columns,
        'tissue': datasets_tissue_columns
    }

    const dataset_columns = columns[props.page];

    // Extract the detailled ancestry list for multi-ancestry sample
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

    for (let i=0; i<dataset.length; i++) {
        let samples_training_number = 0;
        let samples_validation_number = 0;
        let ancestry_dist = {};

        // Samples training
        const samples_training = dataset[i].samples_training;
        let dev_type = 'dev';
        let training_dist = {};
        for (let j=0; j<samples_training.length; j++) {
            const sample_training = samples_training[j];
            const sample_number = sample_training.sample_number;
            const label = get_ancestry_name(sample_training.ancestry_broad);
            if (training_dist[label]) {
                training_dist[label]['count'] += sample_number;
            }
            else {
                training_dist[label] = { 'count': sample_number };
            }
            if (label == 'MAO') {
                const anc_list = get_multi_ancestry_list(sample_training.ancestry_broad);
                if (anc_list.length > 0) {
                    training_dist[label]['anc_list'] = anc_list;
                }
            }
            samples_training_number += sample_number;
        }
        if (Object.keys(training_dist).length > 0) {
            ancestry_dist[dev_type] = { 'anc': {}, 'count': samples_training_number }

            // Sort distributed ancestries
            let training_anc_labels = Object.keys(training_dist);
            training_anc_labels.sort()
            for (let k=0; k<training_anc_labels.length; k++) {
                let anc_label = training_anc_labels[k];
                ancestry_dist[dev_type]['anc'][anc_label] = training_dist[anc_label];
            }

            // Update distribution
            const dev_ancestries = Object.keys(ancestry_dist[dev_type]['anc']);
            for (let l=0; l<dev_ancestries.length; l++) {
                const anc_label = dev_ancestries[l];
                let dist = (ancestry_dist[dev_type]['anc'][anc_label]['count'] / samples_training_number)*100
                ancestry_dist[dev_type]['anc'][anc_label]['dist'] = parseFloat(dist.toFixed(1))
            }
        }

        // Samples validation
        const samples_validation = dataset[i].samples_validation;
        let eval_type = 'eval';
        let validation_dist = {};
        for (let j=0; j<samples_validation.length; j++) {
            const sample_validation = samples_validation[j];
            const sample_number = sample_validation.sample_number;
            const label = get_ancestry_name(sample_validation.ancestry_broad);
            if (validation_dist[label]) {
                validation_dist[label]['count'] += sample_number;
            }
            else {
                validation_dist[label] = { 'count': sample_number };
            }
            if (label == 'MAO') {
                const anc_list = get_multi_ancestry_list(sample_validation.ancestry_broad);
                if (anc_list.length > 0) {
                    validation_dist[label]['anc_list'] = anc_list;
                }
            }
            samples_validation_number += sample_number;
        }
        if (Object.keys(validation_dist).length > 0) {
            ancestry_dist[eval_type] = { 'anc': {}, 'count': samples_validation_number };

            // Sort distributed ancestries
            let validation_anc_labels = Object.keys(validation_dist);
            validation_anc_labels.sort()
            for (let k=0; k<validation_anc_labels.length; k++) {
                let anc_label = validation_anc_labels[k];
                ancestry_dist[eval_type]['anc'][anc_label] = validation_dist[anc_label];
            }

            // Update distribution
            const eval_ancestries = Object.keys(ancestry_dist[eval_type]['anc']);
            for (let l=0; l<eval_ancestries.length; l++) {
                const anc_label = eval_ancestries[l];
                let dist = (ancestry_dist[eval_type]['anc'][anc_label]['count'] / samples_validation_number)*100
                ancestry_dist[eval_type]['anc'][anc_label]['dist'] = parseFloat(dist.toFixed(1))
            }
        }
        // console.log(ancestry_dist)
        dataset[i].ancestry = ancestry_dist;
    }

    // const dataset_name = dataset.name;
    // const publication = dataset.publication;
    // const platform_name = dataset.platform.name;
    // // const platform_version = dataset.platform.version;
    // const samples_training = dataset.samples_training;
    // const samples_validation = dataset.samples_validation;
    // const key = publication.pmid

    // let download_urls = undefined
    // if (dataset.scoring_files_urls) {
    //     download_urls = get_download_list(dataset.scoring_files_urls)
    // }

    // const pub_year = publication.date_publication.split('-')[0]

    // let plot_url = "/plot/"+platform_name+"/"+key;
    // if (dataset_name) {
    //     plot_url += '?dataset='+dataset_name;
    // }

    // let samples_label = platform_name+' samples';
    // if (dataset_name) {
    //     samples_label += ' ('+dataset_name+')'
    // }

    // const samples_count = samples_training.length + samples_validation.length
    console.log(dataset)
    return (
        <div>
            <div className='d-flex mb-3'>
                <AncestryLegend />
            </div>
            <DataTable data={dataset} columns={dataset_columns} groups={dataset_column_groups} hidden_columns={{samples: false}}/>
        </div>
    )
};
export default DatasetTable;