import { useState, useEffect } from 'react';
import { Radar } from "react-chartjs-2";


const OPRadar = (props) => {

    const [radarData, setRadarData] = useState([])
    const [radarOptions, setRadarOptions] = useState([])
    

    const default_options = {
        responsive: true,
        scales: {
            r: {
                // angleLines: {
                //     display: false
                // },
                suggestedMin: 0,
                suggestedMax: 1
            }
        },
        // aspectRatio: props.aratio ? props.aratio : defaut_aratio,
        // borderWidth: 1,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    'boxWidth' : 20
                }
            },
            datalabels: {
                display: true
            }
        }
    };

    const d_width = (props.width) ? props.width : '300';


    const fetchRadarData = async () => {
        let options = {...default_options};

        
        if (props.data) {
            const radar_data = props.data;
            setRadarData(radar_data);
            // let has_negative_data = false;
            let has_only_small_data = true;
            for (let i=0; i<radar_data.datasets.length; i++) {
                for (let j=0; j<radar_data.datasets[i].data.length; j++) {
                    // if (radar_data.datasets[i].data[j] < 0) {
                    //     has_negative_data = false;
                    // }
                    if (radar_data.datasets[i].data[j] >= 0.5) {
                        has_only_small_data = false;
                        break;
                    }
                }
            }
            // if (has_negative_data) {
            //     options.scales.r.suggestedMin = -1
            // }
            if (has_only_small_data) {
                options.scales.r.suggestedMax = 0.5
            }
            setRadarOptions(options)
        }
        // else {
        //     const dataset_data = await restApiCall('dataset/all');
        //     if (dataset_data.results) {
        //         // consoleDev('# dataset_data:');
        //         // consoleDev(dataset_data);
        //         setDoughnutData(build_omics_distribution(dataset_data.results));
        //     }
        // }
    }

    useEffect(() => {
        fetchRadarData();
    },[])
    
    return (
        <div style={{width:d_width+"px"}}>
            { radarData && radarData.labels && radarOptions ? <Radar data={radarData} options={radarOptions}/>: ''}
        </div>
    )
}
export default OPRadar