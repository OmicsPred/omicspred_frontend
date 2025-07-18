import React, { useState, useEffect } from 'react';
import OPDoughnut from "../../pages/Plot/components/Doughnut";
import { ancestry_label } from '../Common';
import { TooltipHtml, thousandifyNumber } from '../Generic';


const AncestryDistribution = (props) => {

    const [chartData, setChartData] = useState([]);

    const chart_size = props.size ? props.size : 100;

    const fetchchartData = async () => {
        if (props.data) {
            setChartData(build_omics_data(props.data))
        }
    }


    const build_omics_data = (anc_data) => {
        let data = {
            'labels': [],
            'names': [],
            'datasets': []
        }
        let dataset = {
            'label': 'Participants',
            'extra_info': [],
            'data': [],
            'total': 0,
            'backgroundColor': [],
        }

        // let anc_data = {};
        var style = getComputedStyle(document.body);
        for (let i=0;i<anc_data.length;i++) {
            const anc = anc_data[i];

            // Store ancestry labels and names (3 letter names)
            const anc_label = ancestry_label(anc.id)+' ('+anc.percent+'%)';
            data.labels.push(anc_label);
            data.names.push(anc.id);

            // Number of participants for the ancestry
            const anc_count = anc.count; 
            dataset.data.push(anc_count);
            // Total number of participants
            dataset.total += anc_count;

            // Extra information (i.e. breakdown of the multi-ancestry if available)
            let extra_info = [];
            if (anc.anc_list) {
                for (let j=0;j<anc.anc_list.length;j++) {
                    extra_info.push(ancestry_label(anc.anc_list[j]));
                }
                extra_info.sort();
            }
            dataset.extra_info.push(extra_info);

            // Add background colour
            const bg_colour = style.getPropertyValue('--'+anc.id+'_color');
            dataset.backgroundColor.push(bg_colour);
        }

        data.datasets.push(dataset);
        return data
    }


    const build_tooltip = (data) => {
        if (data.datasets) {
            const dataset = data.datasets[0];
            return (
                <div className="op_chart_tooltip">
                    <div>Sample distribution</div>
                    <table>
                        <tbody>
                            { data.labels.map((label,index) =>
                                <tr key={label}>
                                    <td>
                                        <span className={"anc_label anc_"+data.names[index]+" me-1"}></span><span>{label}</span>
                                        {
                                            dataset.extra_info[index].length ? format_ancestry_sublist(dataset.extra_info[index]) :''
                                        }
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                    <div>{dataset.label}: {thousandifyNumber(dataset.total)}</div>
                </div>
            )
        }
    }


    const format_ancestry_sublist = (ancestry_sublist) => {
        return (
            <ul>
                {ancestry_sublist.map((anc_label) => <li key={"sub_"+anc_label}>{anc_label}</li>)}
            </ul>
        )
    }


    useEffect(() => {
        fetchchartData();
    },[]);


    return (
        <>
            { chartData && Object.keys(chartData).length > 0 ?
                <div>
                    <TooltipHtml title={build_tooltip(chartData)}>
                        <div>
                            <OPDoughnut data={chartData} width={chart_size} display_legend="false"/>
                        </div>
                    </TooltipHtml>
                </div>
            :''}
        </>
    )
}

export default AncestryDistribution;