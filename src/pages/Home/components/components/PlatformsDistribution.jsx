import React, { useState, useEffect } from 'react';
// import { ChevronRight, Stack } from 'react-bootstrap-icons';
import { Stack } from 'react-bootstrap-icons';
import restApiCall from '../../../../components/RestAPI';
// import OPDoughnut from "../../../Tests/Doughnut";
import { thousandifyNumber } from '../../../../components/Generic';
// import { omicspred_omics_type } from '../../../../components/Common';
import Href from '../../../../components/Href';



const PlatformsDistribution = (props) => {
    const [platformChartData, setPlatformChartData] = useState([]);
    const [scoresPlatformCount, setScoresPlatformCount] = useState({});
    const [platformColours, setPlatformColours] = useState({});

    const title = 'Genetic Scores distribution by Platform';

    const type_colours = props.colours;
    const global_scores_count = props.scores_count;

    const fetchPlatformChartData = async () => {
        const data = await restApiCall('platform/all');
        if (data.results) {
            setPlatformChartData(build_platform_data(data.results))
        }
    }

    const build_platform_data = (response) => {
        let colours_by_type = {};
        let colours_by_platform = {};

        let data = {
            'labels': [] ,
            'datasets': []
        }
        let dataset = {
            'label': '# of scores',
            'data': [],
            'backgroundColor': [],
        }
        let platforms = {};

        let sorted_response = response.sort((a, b) => a.type.localeCompare(b.type));

        for (let i=0;i<sorted_response.length;i++) {
            const platform = sorted_response[i];
            const platform_name = platform.name;
            const platform_scores = platform.scores_count;
            const platform_type = platform.type;
            const percent = (platform_scores/global_scores_count)*100;
            const percent_rounded = percent.toFixed(2)
            if (colours_by_type[platform_type]) {
                colours_by_type[platform_type] = shadeColor(colours_by_type[platform_type],25);
            }
            else {
                colours_by_type[platform_type] = type_colours[platform_type]
            }
            const bg_colour = colours_by_type[platform_type];
            data.labels.push(platform_name+' ('+percent_rounded+'%)');
            dataset.data.push(platform_scores);
            dataset.backgroundColor.push(bg_colour);
            if (!Object.keys(platforms).includes(platform_type)) {
                platforms[platform_type] = {};
            }
            platforms[platform_type][platform_name] = platform_scores
            // }
            // else {
            //     platforms[platform_type] = { platform_name: platform_scores};
            // }
            colours_by_platform[platform_name] = bg_colour
        }

        setScoresPlatformCount(platforms);
        setPlatformColours(colours_by_platform);

        data.datasets.push(dataset);
        return data
    }

    const shadeColor = (color, percent) => {

        let R = parseInt(color.substring(1,3),16);
        let G = parseInt(color.substring(3,5),16);
        let B = parseInt(color.substring(5,7),16);

        R = (R > 0) ? parseInt(R + (R * percent) / 100) : parseInt(R + (255 * Math.abs(percent)) / 100);
        G = (G > 0) ? parseInt(G + (G * percent) / 100) : parseInt(G + (255 * Math.abs(percent)) / 100);
        B = (B > 0) ? parseInt(B + (B * percent) / 100) : parseInt(B + (255 * Math.abs(percent)) / 100);

        R = (R<255) ? R : 255;  
        G = (G<255) ? G : 255;  
        B = (B<255) ? B : 255;  
    
        R = Math.round(R)
        G = Math.round(G)
        B = Math.round(B)
    
        let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
        let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
        let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
    
        return "#"+RR+GG+BB;
    }

    useEffect(() => {
        fetchPlatformChartData();
    },[])

    return (
        <>
            { platformChartData  && Object.keys(platformChartData).length > 0 && Object.keys(scoresPlatformCount).length > 0 && Object.keys(platformColours).length > 0?
                <div className='d-flex justify-content-center'>
                    <div>
                        <h6 className='text-center mb-3 mt-2'>{title}</h6>
                        <div className='d-flex justify-content-center op_stats_dist'>
                            <div className='home_chart_legend d-flex'>
                                {Object.keys(scoresPlatformCount).map((platform_type) =>
                                    <div className="home_dist" key={platform_type}>
                                        <div className="p-2">
                                            <div className={"mb-2 pb-2 fw-bold text-center border_color_"+platform_type} style={{width:"100%",borderBottom:"1px solid"}}>{platform_type}</div>
                                            <div>
                                                { Object.keys(scoresPlatformCount[platform_type]).map((platform) =>
                                                    <div className="d-flex justify-content-between" key={platform}><span className='me-3'><Stack size="0.9em" className={"me-2 color_"+platform_type}/><Href href={"/platform/"+platform} text={platform} style={{verticalAlign:'middle'}}/></span><span style={{fontWeight:'bold'}}>{thousandifyNumber(scoresPlatformCount[platform_type][platform])}</span></div>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            :''}
        </>
    )

}

export default PlatformsDistribution;