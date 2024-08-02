import React, { useEffect, useLayoutEffect, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
//import  'chartjs-plugin-doughnutlabel';

import { Download, FiletypePng } from 'react-bootstrap-icons';
import { saveAs } from "file-saver";


ChartJS.register(
  ArcElement,
  Tooltip,
  ChartDataLabels,
  Legend,
  ...registerables
);

export default function ChartDoughnut(props) {
  const options = {
    scales: {
      y: {
        type: "linear",
        display: false,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: props.name_2,
          align: "center",
        },
      },
      x: {
        display: false,
        title: {
          display: true,
          text: props.name_1,
          align: "center",
        },
      },
    },
    plugins: {
      datalabels: {
        formatter: function (value, context) {
          return value;
        },
        color: "#fff",
      },
      // doughnutlabel: {
      //   labels: [
      //     {
      //       text: "getTotal",
      //       font: {
      //         size: "40",
      //       },
      //       color: "black",
      //     },
      //     {
      //       text: "Due ≤ 60 Days",
      //       font: {
      //         size: "25",
      //       },
      //       color: "grey",
      //     },
      //   ],
      // },
    },
  };

  const lbel =
    props.matrix.substring(1) == "R2" ? "R²" : props.matrix.substring(1);

  var odata2 = Object.values(props.study_2);
  var odata1 = Object.values(props.study_1);

  // var data2 = Object.values(props.study_2);
  // var data1 = Object.values(props.study_1);

  // var counter = 0;

  // for (let i = 0; i < odata1.length; i++) {
  //   if (odata2[i] === null || odata1[i] === null) {
  //     counter++;
  //     data2.splice(i - counter, 1);
  //     data1.splice(i - counter, 1);
  //   }
  // }

  var data2 = [];
  var data1 = [];

  // Store data points for each study as a dictionary to keep the couple index/values.
  for (let i = 0; i < odata1.length; i++) {
    if (odata2[i] != null && odata2[i] != 'undefined'
      && odata1[i] != null && odata1[i] != 'undefined') {
      data2[i] = odata2[i];
      data1[i] = odata1[i];
    }
  }

  const data = {
    labels: [
      lbel + " ≥ 0.5",

      "  0.3  ≤ " + lbel + " < 0.5",
      "  0.1  ≤ " + lbel + " < 0.3",
      " 0.01 ≤ " + lbel + " <  0.1 ",
      lbel + " < 0.01  ",
    ],

    datasets: [

 {
        label: "# of "+props.name_2,
        data: [
          data2.filter((e) => {
            return e >= 0.5;
          }).length,
          data2.filter((e) => {
            return e >= 0.3 && e < 0.5;
          }).length,
          data2.filter((e) => {
            return e >= 0.1 && e < 0.3;
          }).length,

          data2.filter((e) => {
            return e >= 0.01 && e < 0.1;
          }).length,

          data2.filter((e) => {
            return e < 0.01;
          }).length,
        ],
        backgroundColor: [
          "#e7298a",
          "#d95f02",
          "#1b9e77",
          "#7570b3",
          "#bababa",
        ],
        borderColor: ["#ffff"],
        borderWidth: 1,
        yAxisID: "y1",
      },

      {
        label: "# of "+props.name_1,
        color: "red",
        data: [
          data1.filter((e) => {
            return e >= 0.5;
          }).length,
          data1.filter((e) => {
            return e >= 0.3 && e < 0.5;
          }).length,
          data1.filter((e) => {
            return e >= 0.1 && e < 0.3;
          }).length,

          data1.filter((e) => {
            return e >= 0.01 && e < 0.1;
          }).length,

          data1.filter((e) => {
            return e < 0.01;
          }).length,
        ],
        backgroundColor: [
          "#e7298a",
          "#d95f02",
          "#1b9e77",
          "#7570b3",
          "#bababa",
        ],
        borderColor: ["#ffff"],
        borderWidth: 1,
        yAxisID: "y",
      },

     
    ],
  };

  const ChartRef = useRef();

  useEffect(() => {
    const chart = ChartRef.current;
    const ctx = chart.ctx;
    var width = chart.width;
    var height = chart.height;
    ctx.restore();
    var fontSize = (height / 300).toFixed(2);
    ctx.font = fontSize + "em  sans-serif";
    ctx.textBaseline = "top";
    var text = props.name_1;
    var textX = Math.round((width - ctx.measureText(text).width) / 2);
    var textY = height / 2;
    ctx.fillText(text, textX, textY);
    ctx.save();
    chart.update();
  }, [props.study_1]);

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

  const DownloadAsImage = () => {
    const base64Image = ChartRef.current.toBase64Image();
    let fileName = "omicspred_doughnut_plot.png";
    let file = convertBase64ToFile(base64Image, fileName);
    saveAs(file, fileName);

    // window.open('data:application/octet-stream;base64,' + base64Image , '_blank' );
  };

  return (
    <>
        <div className="mt-5">
            <div className="d-flex justify-content-center mx-5">
                <div style={{height:'40vh', width:'40vh'}}>
                <Doughnut
                    // className="relative"
                    ref={ChartRef}
                    plugins={[{}]}
                    options={options}
                    data={data}
                />
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-op shadow" onClick={DownloadAsImage}>
                  <Download size={20} /><span className="px-2">Export as image</span><span className='extra_icon'><FiletypePng/></span>
                </button>
            </div>
        </div>
    </>
  );
}
