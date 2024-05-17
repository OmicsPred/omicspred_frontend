import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'react-bootstrap-icons';
import restApiCall from '../../../components/RestAPI';
import OPDoughnut from "../../Tests/Doughnut";
import { thousandifyNumber } from '../../../components/Generic';
import { omicspred_omics_type } from '../../../components/Common';


const Stats = (props) => {
    const [omicsChartData, setOmicsChartData] = useState([]);
    const [scoresCount, setScoresCount] = useState([]);
    const [platformsCount, setPlatformsCount] = useState([]);
    const [publicationsCount, setPublicationsCount] = useState([]);
    // const [omicsTypesCount, setOmicsTypesCount] = useState([]);
    const [omicsCount, setOmicsCount] = useState([]);
    const [pheWASCount, setPheWASCount] = useState([]);
    const [pathwaysCount, setPathwaysCount] = useState([]);

    const title = 'Scores distribution by Omics type'

    const project_name = process.env.PROJECT_NAME


    const type_colours = {
        "Metabolomics": 'orange',
        "Proteomics": '#D00',
        "Transcriptomics": '#800080'
    };


    const fetchCounts = async () => {
        const data = await restApiCall('info');
        if (data) {
            const count_data = data.data_count;
            setPheWASCount(count_data.phewas)
            setPathwaysCount(count_data.pathways)
            setScoresCount(count_data.scores);
            setPlatformsCount(count_data.platforms);
            setPublicationsCount(count_data.publications);
        }
    }

    const fetchOmicsChartData = async () => {
        // const platform_data = await restApiCall('platform/additional/summary');
        // if (platform_data.results) {
        //     setOmicsChartData(build_omics_data(platform_data.results));
        // }
        if (props.data) {
            setOmicsChartData(build_omics_data(props.data))
        }
    }


    const build_omics_data = (response) => {
        let global_scores_count = 0;
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
        // let platforms = [];
        // let publications = []
        console.log('response - start');
        console.log(response);
        console.log('response - end');
        for (let i=0;i<response.length;i++) {
            const resp = response[i];
            // const platform_name = resp.platform.name;
            // const publication_doi = resp.publication.doi;
            const type = resp.platform.type;
            const count = resp.scores_count;
            console.log('# '+type+': '+count)
            if (!data_types[type]) {
                data_types[type] = 0;
            }
            // if (!platforms.includes(platform_name)) {
            //     platforms.push(platform_name)
            // }
            // if (!publications.includes(publication_doi)) {
            //     publications.push(publication_doi)
            // }
            data_types[type] += count;
            global_scores_count += count;
        }

        const labels = Object.keys(data_types).sort();
        for (let j=0;j<labels.length;j++) {
            const category = labels[j];
            const label_data = data_types[category];
            const bg_colour = type_colours[category];
            const percent = (label_data/global_scores_count)*100;
            const percent_rounded = percent.toFixed(2)
            // data.labels.push(category+' ('+thousandifyNumber(label_data)+')');
            data.labels.push(category+' ('+percent_rounded+'%)');
            dataset.data.push(label_data);
            dataset.backgroundColor.push(bg_colour);
        }

        // setScoresCount(global_scores_count);
        // setPlatformsCount(platforms.length);
        // setPublicationsCount(publications.length);
        // setOmicsTypesCount(labels.length)
        setOmicsCount(data_types);

        data.datasets.push(dataset);
        console.log('plot data:')
        console.log(data)
        return data
    }

    const display_count_block = (title,count,url,type) => {
        if (!type) {
            type = title;
        }
        return (
            <div className='home_stats_box'>
                <div className='home_stats_title'><ChevronRight className='hl_color me-1' size="20px"/>{title}</div>
                <div className='home_stats_count'>{thousandifyNumber(count)}</div>
                <div className='home_stats_btn'>
                    <a className="btn btn-primary btn-sm shadow"  href={url} role="button">Browse</a>

                    {/* <a className="btn btn-primary btn-sm shadow"  href={url} role="button">Browse {type}</a> */}
                </div>
            </div>
        )
    }

    useEffect(() => {
        fetchCounts();
    },[])
    useEffect(() => {
        fetchOmicsChartData();
    },[])

    return (
        <div className='op_stats_container mt-5'>
            <div>
                <h5 className='mb-4'>{project_name} data summary</h5>
                <div className='op_stats2'>
                    { scoresCount && scoresCount > 0 ? display_count_block('Genetic Scores',scoresCount,'/scores' ,'Scores') : ''}
                    { pheWASCount && pheWASCount > 0 ? display_count_block('PheWAS associations',pheWASCount,'/applications/phecode/full' ,'PheWAS') : ''}
                    { pathwaysCount && pathwaysCount > 0 ? display_count_block('Pathways',pathwaysCount,'/pathways') : ''}
                    { platformsCount && platformsCount > 0 ? display_count_block('Platforms',platformsCount,'/platforms') : ''}
                    { publicationsCount && publicationsCount > 0 ? display_count_block('Publications',publicationsCount,'/publications') : ''}
                </div>
            </div>

            <div className='op_stats_separator'></div>
            { omicsChartData  && Object.keys(omicsChartData).length > 0 && omicsCount && Object.keys(omicsCount).length > 0 ?
                <div className='d-flex justify-content-center'>
                    <div>
                    <div>
                        <h5 className='mb-4'>{title}</h5>
                        <div className='d-flex justify-content-center op_stats_dist'>
                            {/* Chart */}
                            <OPDoughnut data={omicsChartData} width="200" display_legend="false"/>
                            {/* Legend */}
                            <div style={{borderLeft:"1px solid #CCC",paddingLeft:"1rem"}}>
                                {Object.keys(type_colours).map((type) => <div className="d-flex justify-content-between " key={type}><span className='me-3'>{omicspred_omics_type(type)}</span><span style={{fontWeight:'bold'}}>{thousandifyNumber(omicsCount[type])}</span></div>)}
                            </div>
                        </div>
                    </div></div>
                </div>
            :''}
        </div>
    )
}

export default Stats;