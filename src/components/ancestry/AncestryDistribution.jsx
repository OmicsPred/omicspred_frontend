import React, { useState, useEffect } from 'react';
import OPDoughnut from "../../pages/Tests/Doughnut";
import { ancestry_label } from '../Common';


const AncestryDistribution = (props) => {

    const [chartData, setChartData] = useState([]);

    // const title = 'Scores distribution by Omics type'

    const chart_size = props.size ? props.size : 100;

    const fetchchartData = async () => {
        if (props.data) {
            setChartData(build_omics_data(props.data))
        }
    }

    // const get_ancestry_label = (ancestry) => {
    //     return (
    //         <>{ancestry_label(ancestry.id)+' ('+ancestry.percent+'%)'}
    //             { ancestry.list && ancestry.list.length > 0 ?
    //                 <>:{ancestry.list.map((anc) => ancestry_label(anc))}</>: ''
    //             }
    //         </>
    //     )
    //     // return (
    //     //     <>
    //     //         <div>{ancestry_label(ancestry.id)+' ('+ancestry.percent+'%)'}</div>
    //     //         { ancestry.list && ancestry.list.length > 0 ?
    //     //             <div>
    //     //                 <ul>
    //     //                     {ancestry.list.map((anc) => <li key={'multi_'+anc}>{ancestry_label(anc)}</li>)}
    //     //                 </ul>
    //     //             </div>: ''
    //     //         }
    //     //     </>
    //     // )
    // } 

    const anc_tooltip = {
        // Disable the on-canvas tooltip
        enabled: false,

        external: function(context) {
            // Tooltip Element
            let tooltipEl = document.getElementById('chartjs-tooltip');

            // Create element on first render
            if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'chartjs-tooltip';
                tooltipEl.innerHTML = '<table class="op_chart_tooltip"></table>';
                document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            const tooltipModel = context.tooltip;
            if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
            }

            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
                tooltipEl.classList.add('no-transform');
            }

            function getBody(bodyItem) {
                return bodyItem.lines;
            }

            // Set Text
            if (tooltipModel.body) {
                const titleLines = tooltipModel.title || [];
                const bodyLines = tooltipModel.body.map(getBody);
                const bgcolor = tooltipModel.labelColors[0].backgroundColor;

                let innerHtml = '<thead>';
                titleLines.forEach(function(title) {
                    innerHtml += '<tr><th><span class="anc_label me-1" style="background-color:'+bgcolor+'"></span><span>'+title+'</span></th></tr>';
                });
                innerHtml += '</thead><tbody>';

                

                bodyLines.forEach(function(body, i) {
                //     let style = 'background:' + colors.backgroundColor;
                //     style += '; border-color:' + colors.borderColor;
                    const data_index = context.tooltip.dataPoints[i].dataIndex; 
                    const multi_details = context.tooltip.dataPoints[i].dataset.extra_info[data_index]
                    if (multi_details != '') {
                        innerHtml += '<tr><td class="tooltip_extra"><ul><li class="smaller">'+ multi_details.replaceAll(', ','</li><li class="smaller">') + '</li></ul></td></tr>';
                    } 
                    const span = '<span>' + body + '</span>';                    
                    innerHtml += '<tr><td class="tooltip_data">' + span + '</td></tr>';
                });
                innerHtml += '</tbody>';

                let tableRoot = tooltipEl.querySelector('table');
                tableRoot.innerHTML = innerHtml;
            }

            const position = context.chart.canvas.getBoundingClientRect();
            // const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
            // tooltipEl.style.font = bodyFont.string;
            tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
            tooltipEl.style.pointerEvents = 'none';
        }
    };


    const build_omics_data = (anc_data) => {
        let data = {
            'labels': [],
            'datasets': []
        }
        let dataset = {
            'label': 'Participants',
            'extra_info': [],
            'data': [],
            'backgroundColor': [],
        }

        // let anc_data = {};
        var style = getComputedStyle(document.body);
        for (let i=0;i<anc_data.length;i++) {
            const anc = anc_data[i];
            let anc_label = ancestry_label(anc.id)+' ('+anc.percent+'%)';
            const anc_count = anc.count; 
            // const bg_colour = 'red';//.anc_'+anc.id;
            // const bg_colour = '.anc_'+anc.id;
            const bg_colour = style.getPropertyValue('--'+anc.id+'_color');
            // data.labels.push(anc_label+' ('+anc.percent+'%)');
            dataset.data.push(anc_count);
            let extra_info = '';
            if (anc.list) {
                // anc_label += ': ';
                for (let j=0;j<anc.list.length;j++) {
                    extra_info += j > 0 ? ', ':'';
                    extra_info += ancestry_label(anc.list[j]);
                }
            //     anc_label += <div><ul>{anc.list.map((anc) => <li key={'multi_'+anc}>{ancestry_label(anc)}</li>)}</ul></div>
            }

            // data.labels.push(get_ancestry_label(anc))
            data.labels.push(anc_label);
            dataset.extra_info.push(extra_info);
            // dataset.backgroundColor.push(bg_colour);
            dataset.backgroundColor.push(bg_colour);
        }
        // data.labels = anc_data.map((anc) => <AncestryLabel ancestry={anc}/>);

        // setDataCount(data_types);

        data.datasets.push(dataset);
        return data
    }

    useEffect(() => {
        fetchchartData();
    },[]);
    
    return (
        <>
            { chartData && Object.keys(chartData).length > 0 ?
                <OPDoughnut data={chartData} width={chart_size} display_legend="false" tooltip={anc_tooltip}/>
            :''}
        </>
    )
}

// const AncestryLabel = (props) => {
//     const ancestry = props.ancestry;
//     return (
//         <>{ancestry_label(ancestry.id)+' ('+ancestry.percent+'%)'}
//             { ancestry.list && ancestry.list.length > 0 ?
//                 <>:{ancestry.list.map((anc) => ancestry_label(anc))}</>: ''
//             }
//         </>
//     )
//     // return (
//     //     <>
//     //         <div>{ancestry_label(ancestry.id)+' ('+ancestry.percent+'%)'}</div>
//     //         { ancestry.list && ancestry.list.length > 0 ?
//     //             <div>
//     //                 <ul>
//     //                     {ancestry.list.map((anc) => <li key={'multi_'+anc}>{ancestry_label(anc)}</li>)}
//     //                 </ul>
//     //             </div>: ''
//     //         }
//     //     </>
//     // )
// }

export default AncestryDistribution;