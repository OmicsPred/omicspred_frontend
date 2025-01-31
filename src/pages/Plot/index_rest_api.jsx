import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router';
import Charts from "./components/Chart";
import restApiCall from '../../../components/RestAPI';
import restApiCallPaginated from '../../../components/RestAPIPaginated';



const Plot = (props) => {
    let { platform } = useParams();
    const [plotData, setPlotData] = useState([])
    const [scoreData, setScoreData] = useState([])

    const default_cohort = 'INTERVAL';

    const fetchPlotData = async () => {
        const platform_data = await restApiCall('plot/search?platform='+platform);
        setPlotData(platform_data);
    }

    const fetchScoreData = async () => {
        const score_data = await restApiCallPaginated('plot/score/search?platform='+platform);
        setScoreData(score_data);
        // console.log(score_data);
        // const score_data = await restApiCall('plot/score/search?platform='+platform);
        // setScoreData(score_data.results);
        // console.log(score_data.results);
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