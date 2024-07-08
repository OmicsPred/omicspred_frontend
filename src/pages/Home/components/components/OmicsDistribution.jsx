import React, { useState, useEffect } from 'react';
import OPDoughnut from "../../../Tests/Doughnut";
import { thousandifyNumber } from '../../../../components/Generic';
import { omicspred_omics_type } from '../../../../components/Common';


const OmicsDistribution = (props) => {

    const [omicsChartData, setOmicsChartData] = useState([]);
    const [omicsCount, setOmicsCount] = useState({});

    const title = 'Scores distribution by Omics type'

    const type_colours = props.colours;
    const global_scores_count = props.scores_count;

    const fetchOmicsChartData = async () => {
        if (props.data) {
            setOmicsChartData(build_omics_data(props.data))
        }
    }

    const build_omics_data = (response) => {
        let data = {
            'labels': [] ,
            'datasets': []
        }
        let dataset = {
            'label': '# of scores',
            'data': [],
            'backgroundColor': [],
        }
        let data_types = {};
        for (let i=0;i<response.length;i++) {
            const resp = response[i];
            const type = resp.platform.type;
            const count = resp.scores_count;
            if (!data_types[type]) {
                data_types[type] = 0;
            }
            data_types[type] += count;
        }

        const labels = Object.keys(data_types).sort();
        for (let j=0;j<labels.length;j++) {
            const category = labels[j];
            const label_data = data_types[category];
            const bg_colour = type_colours[category];
            const percent = (label_data/global_scores_count)*100;
            const percent_rounded = percent.toFixed(2)
            data.labels.push(category+' ('+percent_rounded+'%)');
            dataset.data.push(label_data);
            dataset.backgroundColor.push(bg_colour);
        }

        setOmicsCount(data_types);

        data.datasets.push(dataset);
        return data
    }

    useEffect(() => {
        fetchOmicsChartData();
    },[])

    return (
        <>
            { omicsChartData && Object.keys(omicsChartData).length > 0 && omicsCount && Object.keys(omicsCount).length > 0 ?
                <div className='d-flex justify-content-center'>
                    <div>
                        <h5 className='mb-4'>{title}</h5>
                        <div className='d-flex justify-content-center op_stats_dist'>
                            {/* Chart */}
                            <OPDoughnut data={omicsChartData} width="180" display_legend="false"/>
                            {/* Legend */}
                            <div>
                                {Object.keys(type_colours).map((type) => <div className="d-flex justify-content-between " key={type}><span className='me-3'>{omicspred_omics_type(type)}</span><span style={{fontWeight:'bold'}}>{thousandifyNumber(omicsCount[type])}</span></div>)}
                            </div>
                        </div>
                    </div>
                </div>
            :''}
        </>
    )
}

export default OmicsDistribution;