import React, {
    useEffect,
    useState,
    useRef,
} from "react";
  
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    registerables,
} from "chart.js";

import { Download, FiletypePng } from 'react-bootstrap-icons';
import { saveAs } from "file-saver";

import { Chart } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    annotationPlugin,
    Title,
    Tooltip,
    Legend,
    ...registerables
);

export default function ChartPlot(props) {

    var odata2 = Object.values(props.data_2);
    var odata1 = Object.values(props.data_1);
  
    var ids_data1 = Object.keys(props.data_1);
  
    var data2 = [];
    var data1 = [];
    var data1_array = [];
    var data2_array = [];
    var ids_data1_array = [];
  
    const tdata = props.tdata;
  
    // console.log(
    //   "circle the lenghts are : " + data1.length + " second " + data2.length
    // );
  
    // Store data points for each study as a dictionary to keep the couple index/values.
    // The index is used to retrieve the metadata from the "tdata" variable.
    for (let i = 0; i < odata1.length; i++) {
      if (odata2[i] != null && odata2[i] != 'undefined'
        && odata1[i] != null && odata1[i] != 'undefined') {
        data2[i] = odata2[i];
        data1[i] = odata1[i];
        // Simple array of the data1 subset in order to draw the chart
        data1_array.push(data1[i]);
        // Simple array of the data2 subset in order to help in drawing the chart
        data2_array.push(data2[i]);

        ids_data1_array[i] = ids_data1[i];
      }
    }

    const data1_max = Math.max(...data1_array);
    // const data2_max = Math.max(...data2_array);
  
    const [colors, setColors] = useState([]);
  
    const updatecolors = async () => {
      let datatocolor = Object.values(props.missed);
  
      // Set the default value to 0 if there is no missing rate data
      if (!datatocolor || datatocolor.length == 0) {
        datatocolor = data2.map((item) => { return 0;});
      }

      const toreturn = datatocolor.map((e) => {
        if (e >= 0 && e < 0.35) {
          return "blue";
        }
        if (e >= 0.35 && e < 0.65) {
          return "green";
        }
        if (e >= 0.65) {
          return "red";
        }
      });
  
      setColors(toreturn);
    };
  
    const ChartRef = useRef(null);
  
    const footer = (tooltipItems) => {
      let study1 = 0;
      let study2 = 0;
      let index = tooltipItems[0].dataIndex;
  
      let score_id = ids_data1_array[index];
      tooltipItems.forEach(function (tooltipItem, i) {
        study1 += tooltipItem.parsed.y;
      });
  
      tooltipItems.forEach(function (tooltipItem, i) {
        study2 += tooltipItem.parsed.x;
        index += i;
      });
  
      var metadata = [];
      for (let i = 0; i < props.tdata.length; i++) {
        const data_id = props.tdata[i].num;
        if (data_id == score_id) {
          metadata.push({
              name: 'OmicsPred ID',
              value: props.tdata[i].id
          });
          metadata.push({
            name: '#SNP',
            value: props.tdata[i].variants_number
          });
          // Genes
          if (props.tdata[i].genes && props.tdata[i].genes.length) {
            const genes = props.tdata[i].genes.map((g) => {
                if (g.name) {
                    return g.name;
                }
                else {
                    return g.external_id;
                }
            });
            metadata.push({
                name: 'Gene(s)',
                value: genes.join()
            });
          }
          // Transcripts
          if (props.tdata[i].transcripts && props.tdata[i].transcripts.length) {
            const transcripts = props.tdata[i].transcripts.map((t) => {
                if (t.name) {
                    return t.name;
                }
                else {
                    return t.external_id;
                }
            });
            metadata.push({
                name: 'Transcript(s)',
                value: transcripts.join()
            });
          }
          // Proteins
          if (props.tdata[i].proteins && props.tdata[i].proteins.length) {
            const proteins = props.tdata[i].proteins.map((p) => {
                if (p.name) {
                    if (p.external_id) {
                        return p.name+' ['+p.external_id+']';
                    }
                    else {
                        return p.name;
                    }
                }
                else {
                    return p.external_id;
                }
            });
            metadata.push({
                name: 'Protein(s)',
                value: proteins.join()
            });
          }
          // Metabolites
          if (props.tdata[i].metabolites && props.tdata[i].metabolites.length) {
            const metabolites = props.tdata[i].metabolites.map((m) => {
                if (m.name) {
                    return m.name;
                }
                else {
                    return m.external_id;
                }
            });
            metadata.push({
                name: 'Metabolite(s)',
                value: metabolites.join()
            });
          }
        }
      }
  
      return [
        props.name_2 + " : " + study1,
        props.name_1 + " : " + study2,
        "Missing Rate ("+props.name_2+") : "+
          Object.values(props.missed)[tooltipItems[0].dataIndex],
        '----------------------------------',
        ...metadata.map((e) => {
          return e.name + " : " + e.value;
        }),
      ];
    };

    const options = {
      responsive: true,
  
      plugins: {
        legend: {
          //position: "top",
          display: false
        },
        subtitle: {
          display: false,
        },
        annotation: {
          annotations: [
            {
              type: "box",
              drawTime: "beforeDatasetsDraw",
              // yScaleID: "y-axis-0",
              yScaleID: 'y1',
            //   yMin: 0.4,
            //   yMax: 0.5,
              yMin: 0,
              yMax: 1,//data2_max + 0.01,
              xMin: data1_max + 0.01,
              xMax: data1_max + 0.01 + (data1_max * 100) / 5000,

            //   yMax: Math.max(...data2_array) + 0.01, //1,
            //   xMin: Math.max(...data1_array) + 0.01,
            //   xMax: Math.max(...data1_array) + 0.01 + (Math.max(...data1_array) * 100) / 5000,
              width: "100px",
              backgroundColor: function (context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) {
                  // This case happens on initial chart load
                  return;
                }
                return getGradient(ctx, chartArea);
              },
            },
            {
              type: "line", // x = y
              width: 10,
              xMin: 0,
              xMax: data1_max,
              yMin: 0,
              yMax: data1_max,
              backgroundColor: "rgba(255, 99, 132, 0.25)",
            },
          ],
        },
        title: {
          display: true,
          text: "",
        },
        tooltip: {
          yAlign: "bottom",
          callbacks: {
            footer: footer,
            title: () => {
              return "";
            },
            label: () => {
              return "";
            },
          },
        },
        datalabels: {
          display: false,
          formatter: function (value, context) {
            return value;
          },
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: props.matrix.substring(1) + " in " + props.name_2,
            align: "center",
          },
        },
  
        y1: {
          min: 0,
          max: 1,
          title: {
            display: true,
            text: props.name_2 + " Missingness Rate",
            align: "center",
          },
          type: "linear",
          display: true,
          position: "right",
          grid: {
            drawOnChartArea: false,
          },
        },
        x: {
          suggestedMax: 1.05,
          max: data1_max + 0.01 + (data1_max * 100) / 5000,
          // max: Math.max(...data1_array) + 0.01 + (Math.max(...data1_array) * 100) / 5000,
          title: {
            display: true,
            text: props.matrix.substring(1) + " in " + props.name_1,
            align: "center",
          },
        },
      },
    };
  
    const labels = data1;
    let width, height, gradient;
    function getGradient(ctx, chartArea) {
      const chartWidth = chartArea.right - chartArea.left;
      const chartHeight = chartArea.bottom - chartArea.top;
      if (!gradient || width !== chartWidth || height !== chartHeight) {
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(0.5, "green");
        gradient.addColorStop(1, "red");
      }
  
      return gradient;
    }
  
    const data = {
      labels,
      datasets: [
        {
          label: props.name_1 + " VS " + props.name_2,
          type: "scatter",
          elements: {
            point: {
              radius: 4,
            },
            title: {
              display: false,
              color: "red",
            },
          },
          data: data2,
          yAxisID: "y",
        //   backgroundColor: ["rgba(255, 99, 132, 0.0)"],
        //   borderColor: ["rgba(255, 99, 132, 0.0)"],
        //   labelString: "hello",
          pointBackgroundColor: colors,
        },
      ],
    };
  
    useEffect(() => {
      updatecolors();
      const chart = ChartRef.current;
      chart.update();
    }, [props.missed, props.data_2, props.data_1]);
  
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
      console.log("img ", base64Image);
      let fileName = "omicspred_data_plot.png";
      let file = convertBase64ToFile(base64Image, fileName);
      saveAs(file, fileName);
    };
  
    return (
        <>
            <div className="d-flex mx-5" style={{justifyContent:'center'}}>
                <div style={{position:'relative', height:'65vh', width:'80vw'}}>
                    <Chart ref={ChartRef} options={options} data={data} />
                </div>
            </div>
            <div className="d-flex ms-5 mt-3" style={{justifyContent:'start'}}>
                <button className="btn btn-op shadow mb-3" onClick={DownloadAsImage}>
                  <Download size={20} /><span className="px-2">Export as image</span><span className='extra_icon'><FiletypePng/></span>
                </button>
            </div>
        </>
    );
  };