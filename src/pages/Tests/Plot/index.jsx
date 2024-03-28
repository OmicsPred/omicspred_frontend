import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight } from 'react-bootstrap-icons';
import restApiCall from '../../../components/RestAPI';
import Charts from "./components/Chart";
import { get_data_type } from '../../../components/Common';

const Plot = (props) => {
    let { platform } = useParams();
    const [platformSumData, setPlatformSumData] = useState([])
    const [plotData, setPlotData] = useState([])
    const [scoreData, setScoreData] = useState([])

    const default_cohort = 'INTERVAL';

    const platform_file_name = platform.replace(" ", "_");

    const data_dir = process.env.OMICSPRED_DATA_DIR;
    const plot_file = data_dir+platform_file_name+'_plot.json';
    const plot_score_file = data_dir+platform_file_name+'_plot_score.json';

    const fetchPlatformSumData = async () => {
        const platform_sum_data = await restApiCall('platform/'+platform);
        setPlatformSumData(platform_sum_data);
    }

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
        fetchPlatformSumData();
        fetchPlotData();
        fetchScoreData(); 
    },[])

    return (
        <>
            {platformSumData ? <h2 className='page_title'>Visualize performance of genetic scores<ChevronRight className={'op_title_separator color_'+get_data_type(platformSumData.type)}/><span>{platformSumData.name}</span></h2>:''}
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