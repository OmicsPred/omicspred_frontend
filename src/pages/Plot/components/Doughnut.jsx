import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import restApiCall from '../../../components/RestAPI';
import { consoleDev, thousandifyNumber } from '../../../components/Generic';


const OPDoughnut = (props) => {

    const [doughnutData, setDoughnutData] = useState([])
    const [doughnutOptions, setDoughnutOptions] = useState([])

    const defaut_aratio = 1.6;

    const default_options = {
        responsive: true,
        aspectRatio: props.aratio ? props.aratio : defaut_aratio,
        borderWidth: 1,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    'boxWidth' : 20
                }
            },
            datalabels: {
                display: false
            }
        }
    };

    const d_width = (props.width) ? props.width : '300';


    const type_colours = {
        "Metabolomics": 'orange',
        "Proteomics": '#D00',
        "Transcriptomics": '#800080'
    };

    const fetchDoughnutData = async () => {
        setDoughnutOptions(default_options)
        if (props.data) {
            setDoughnutData(props.data)
        }
        else {
            const dataset_data = await restApiCall('dataset/all');
            if (dataset_data.results) {
                // consoleDev('# dataset_data:');
                // consoleDev(dataset_data);
                setDoughnutData(build_omics_distribution(dataset_data.results));
            }
        }
        // Update Options //
        // Title
        let new_plugins = {...default_options.plugins}
        if (props.title) {
            new_plugins.title = {
                display: true, 
                text: props.title,
                padding: { top: 5, bottom: 5 },
                position: 'top'
            }
        }

        // Legend
        if (props.display_legend && props.display_legend=='false') {
            new_plugins.legend = {'display': false}
        }

        // const new_options = { ...default_options, plugins:new_plugins }

        // let new_option_plugins = {...new_options.plugins};
        // Add external tooltip
        if (props.tooltip) {
            new_plugins.tooltip=props.tooltip;
        }
        else {
            new_plugins.tooltip= {enabled: false};
        }
        const new_options_tooltip = { ...default_options, plugins:new_plugins};
        // consoleDev(new_options_tooltip.plugins);
        setDoughnutOptions(new_options_tooltip);
    }


    const build_omics_distribution = (response) => {
        let data = { 
            'labels': [] ,
            'datasets': []
        }
        let dataset = {
            'label': '# of scores',
            'data': [],
            'backgroundColor': [],
        }
        let tmp_data = {};
        for (let i=0;i<response.length;i++) {
            const resp = response[i];
            const type = resp.platform.type;
            const count = resp.scores_count;
            consoleDev('# '+type+': '+count)
            if (!tmp_data[type]) {
                tmp_data[type] = 0;
            }
            tmp_data[type] += count;
        }

        const labels = Object.keys(tmp_data).sort();
        // consoleDev('# labels:')
        // consoleDev(labels);
        for (let j=0;j<labels.length;j++) {
            const category = labels[j];
            const label_data = tmp_data[category];
            const bg_colour = type_colours[category];
            data.labels.push(category+' ('+thousandifyNumber(label_data)+')');
            dataset.data.push(label_data);
            dataset.backgroundColor.push(bg_colour);
        }
        data.datasets.push(dataset);
        consoleDev('plot data:')
        consoleDev(data)
        return data
    }

    useEffect(() => {
        fetchDoughnutData();
    },[])

    return (
        <div style={{width:d_width+"px"}}>
            { doughnutData && doughnutData.labels && doughnutOptions ? <Doughnut data={doughnutData} options={doughnutOptions} />: ''}
        </div>
    )
}
export default OPDoughnut