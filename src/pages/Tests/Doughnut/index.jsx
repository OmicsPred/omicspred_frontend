import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import restApiCall from '../../../components/RestAPI';
import { thousandifyNumber } from '../../../components/Generic';


const OPDoughnut = (props) => {

    const [doughnutData, setDoughnutData] = useState([])
    const [doughnutOptions, setDoughnutOptions] = useState([])

    const default_options = {
        responsive: true,
        aspectRatio: 1.6,
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
            const platform_data = await restApiCall('platform/additional/all');
            if (platform_data.results) {
                console.log('# platform_data:');
                console.log(platform_data);
                setDoughnutData(build_omics_distribution(platform_data.results));
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

        const new_options = { ...default_options, plugins:new_plugins }
        setDoughnutOptions(new_options)
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
            console.log('# '+type+': '+count)
            if (!tmp_data[type]) {
                tmp_data[type] = 0;
            }
            tmp_data[type] += count;
        }

        const labels = Object.keys(tmp_data).sort();
        // console.log('# labels:')
        // console.log(labels);
        for (let j=0;j<labels.length;j++) {
            const category = labels[j];
            const label_data = tmp_data[category];
            const bg_colour = type_colours[category];
            data.labels.push(category+' ('+thousandifyNumber(label_data)+')');
            dataset.data.push(label_data);
            dataset.backgroundColor.push(bg_colour);
        }
        data.datasets.push(dataset);
        console.log('plot data:')
        console.log(data)
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