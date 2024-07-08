import React, { useEffect, useLayoutEffect, useRef } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
import { Bar } from "react-chartjs-2";

import { Download } from 'react-bootstrap-icons';
import { saveAs } from "file-saver";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ChartBar(props) {

    var odata2 = Object.values(props.study_2);
    var odata1 = Object.values(props.study_1);

    var data2 = [];
    var data1 = [];

    // Store data points for each study as a dictionary to keep the couple index/values.
    for (let i = 0; i < odata1.length; i++) {
        if (odata2[i] != null && odata2[i] != 'undefined' && odata1[i] != null && odata1[i] != 'undefined') {
            data2[i] = odata2[i];
            data1[i] = odata1[i];
        }
    }

    // Increase space between the legend and the barchart
    const legendMarginBottom = {
        id: "legendMargin",
        beforeInit: function (chart) {
            const fitValue = chart.legend.fit;
            chart.legend.fit = function fit() {
                fitValue.bind(chart.legend)();
                return (this.height += 10);
            };
        }
    };

    const options = {
        plugins: {
            customCanvasBackgroundColor: {
                color: 'red',
            },
            legend: {
                display: true,
                labels: {
                    boxWidth: 25,
                    boxHeight: 12,
                    padding: 30
                }
            },
            datalabels: {
                // formatter: function (value) {
                // //custom money icon
                //     return value);
                // },
                // color: "white",
                // font: {
                //     // weight: 'bold',
                //     // size:14,
                //     // family: 'poppins'
                // },
                display: true,
                color: "black",
                anchor: "end",
                offset: -20,
                align: "start"
            },
        },
    };
    // The following colors will be used sequentially for the chart bars
    // const backgroundColors = ["#53D9D9", "#002B49", "#0067A0"];
    // const data = {
    //     labels: ChartData.map((item) => item.companyName),
    //     datasets: [
    //         {
    //             label: ChartData.map((item) => item.progressPaymentPrice),
    //             data: ChartData.map((item) => item.progressPaymentPrice),
    //             backgroundColor: backgroundColors,
    //             borderWidth: 1,
    //         },
    //     ],
    // };

    const lbel = props.matrix.substring(1) == "R2" ? "R²" : props.matrix.substring(1);

    // const background_colors = [
    //     "#e7298a",
    //     "#d95f02",
    //     "#1b9e77",
    //     "#7570b3",
    //     "#bababa"
    // ];

    const data_list = (data) => {
        return [
            data.filter((e) => { return e < 0.01 }).length,
            data.filter((e) => { return e >= 0.01 && e < 0.1 }).length,
            data.filter((e) => { return e >= 0.1 && e < 0.3 }).length,
            data.filter((e) => { return e >= 0.3 && e < 0.5 }).length,
            data.filter((e) => { return e >= 0.5 }).length
        ]
    }

    const data = {
        labels: [
            lbel + " < 0.01  ",
            " 0.01 ≤ " + lbel + " <  0.1 ",
            "  0.1  ≤ " + lbel + " < 0.3",
            "  0.3  ≤ " + lbel + " < 0.5",
            lbel + " ≥ 0.5",
        ],
        datasets: [
            {
                label: "# of "+props.name_1,
                data: data_list(data1),
                // backgroundColor: background_colors,
                backgroundColor: "#1b9e77",
            },
    
            {
                label: "# of "+props.name_2,
                data: data_list(data2),
                // backgroundColor: background_colors,
                backgroundColor: "#7570b3",
            }
        ],
    };

    const convertBase64ToFile = (base64String, fileName) => {
        let arr = base64String.split(",");
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let uint8Array = new Uint8Array(n);
        while (n--) {
          uint8Array[n] = bstr.charCodeAt(n);
        }
        let file = new File([uint8Array], fileName, { type: mime });
        return file;
    };

    // const ChartRef = useRef(null);

    // const DownloadAsImage = () => {
    //     const base64Image = ChartRef.current.toBase64Image();
    //     let fileName = "omicspred_bar_plot.png";
    //     let file = convertBase64ToFile(base64Image, fileName);
    //     saveAs(file, fileName);
    
    //     // window.open('data:application/octet-stream;base64,' + base64Image , '_blank' );
    //   };

    // useEffect(() => {
    //     const chart = ChartRef.current;
    //     chart.update();
    // }, [props.data_2, props.data_1]);

    const DownloadAsImage = () => {
        //save to png
        const canvasSave = document.getElementById('barchart');
        canvasSave.toBlob(function (blob) {
            saveAs(blob, "barchar.png")
        })
    }
    
    return(
        <>
            <div className="mt-5">
                <div className="d-flex justify-content-center mx-5">
                    <div style={{position:'relative', height:'40vh', width:'50vw'}}>
                        <Bar id="barchart" data={data} options={options} plugins={[legendMarginBottom]}/>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    {/* <button className="btn btn-primary shadow" onClick={DownloadAsImage}>
                        <Download size={20} /> <span>Export as image</span>
                    </button> */}
                    <button className="btn btn-primary shadow" onClick={DownloadAsImage}>
                        <Download size={20} /> <span>Export as image <small>(PNG)</small></span>
                    </button>
                </div>
            </div>
        </>
    );
}