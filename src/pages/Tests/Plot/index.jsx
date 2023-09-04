import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Charts from "./components/Chart";
import restApiCall from '../../../components/RestAPI';
import restApiCallPaginated from '../../../components/RestAPIPaginated';



const Plot = (props) => {
    let { platform } = useParams();
    const [plotData, setPlotData] = useState([])
    const [scoreData, setScoreData] = useState([])

    const default_cohort = 'INTERVAL';

    const platform_file_name = platform.replace(" ", "_");

    const plot_file = '/src/data/'+platform_file_name+'_plot.json';
    const plot_score_file = '/src/data/'+platform_file_name+'_plot_score.json';

    // const fetchPlotData = async () => {
    //     const platform_data = await restApiCall('plot/search?platform='+platform);
    //     setPlotData(platform_data);
    // }

    // const fetchScoreData = async () => {
    //     const score_data = await restApiCallPaginated('http://127.0.0.1:7000/rest/plot/score/search?platform='+platform);
    //     setScoreData(score_data);
    // }

    const fetchPlotData = async () => {
        const platform_plot_data = await fetch(plot_file)
            .then(response => {
                return response.json()
            })
            setPlotData(platform_plot_data);
    }

    const fetchScoreData = async () => {
        const platform_plot_score_data = await fetch(plot_score_file)
            .then(response => {
                return response.json()
            })
            setScoreData(platform_plot_score_data);
    }

    useEffect(() => {
        fetchPlotData();
        fetchScoreData(); 
    },[])

    return (
        <>
            <h2 className='page_title'>Visualize performance of genetic scores for <span>{platform}</span></h2>
            <div>
                { plotData.length && scoreData.length ?
                    <Suspense fullback={<div className="h-[600px] w-full bg-red-600">Loading ...</div>}>
                        <Charts pagename={platform} tdata={scoreData} data={plotData} default_cohort={default_cohort}/>
                    </Suspense> : 'Loading chart data ...'
                }
            </div>
        </>
    );
}
export default Plot;