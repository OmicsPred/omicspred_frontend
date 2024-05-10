import React, { useState, useEffect } from 'react';
import restApiCall from '../../../components/RestAPI';
import OPDoughnut from "../../Tests/Doughnut";
import { thousandifyNumber } from '../../../components/Generic';
import { omicspred_omics_type } from '../../../components/Common';


const Stats = (props) => {
    const [omicsChartData, setOmicsChartData] = useState([]);
    const [scoresCount, setScoresCount] = useState([]);
    const [platformsCount, setPlatformsCount] = useState([]);
    const [publicationsCount, setPublicationsCount] = useState([]);
    const [omicsTypesCount, setOmicsTypesCount] = useState([]);
    const [omicsCount, setOmicsCount] = useState([]);
    const [pheWASCount, setPheWASCount] = useState([]);

    const title = 'Scores distribution by Omics type'

    const type_colours = {
        "Metabolomics": 'orange',
        "Proteomics": '#D00',
        "Transcriptomics": '#800080'
    };


    const fetchPheWasAssoCount = async () => {
        const phecode_data = await restApiCall('applications_score/all?limit=1');
        if (phecode_data) {
            setPheWASCount(phecode_data.count)
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
        let platforms = [];
        let publications = []
        for (let i=0;i<response.length;i++) {
            const resp = response[i];
            const platform_name = resp.platform.name;
            const publication_doi = resp.publication.doi;
            const type = resp.platform.type;
            const count = resp.scores_count;
            console.log('# '+type+': '+count)
            if (!data_types[type]) {
                data_types[type] = 0;
            }
            if (!platforms.includes(platform_name)) {
                platforms.push(platform_name)
            }
            if (!publications.includes(publication_doi)) {
                publications.push(publication_doi)
            }
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

        setScoresCount(global_scores_count);
        setPlatformsCount(platforms.length);
        setPublicationsCount(publications.length);
        setOmicsTypesCount(labels.length)
        setOmicsCount(data_types);

        data.datasets.push(dataset);
        console.log('plot data:')
        console.log(data)
        return data
    }

    useEffect(() => {
        fetchPheWasAssoCount();
        fetchOmicsChartData();
    },[])

    return (
        <div className='d-flex flex-column'>
            <div className="home_box mb-4">
                { scoresCount && scoresCount > 0 ?<div className='home_category mb-2' onClick={() => {location.href = '/scores'}}><span>Scores</span><span>{thousandifyNumber(scoresCount)}</span></div>:''}
                { pheWASCount && pheWASCount > 0 ? <div className='home_category mb-2' onClick={() => {location.href = '/applications/phecode/full'}} title="PheWAS Associations"><span>PheWAS</span><span>{thousandifyNumber(pheWASCount)}</span></div>:''}
                { platformsCount && platformsCount > 0 ? <div className='home_category mb-2' onClick={() => {location.href = '/platforms'}}><span>Platforms</span><span>{platformsCount}</span></div>:''}
                { publicationsCount && publicationsCount > 0 ? <div className='home_category mb-2' onClick={() => {location.href = '/publications'}}><span>Publications</span><span>{publicationsCount}</span></div>:''}
                { omicsTypesCount && omicsTypesCount > 0 ?<div className='home_category' onClick={() => {location.href = '#platforms'}}><span>Omics Types</span><span>{omicsTypesCount}</span></div>:''}
            </div>
            { omicsChartData  && omicsChartData.labels ? 
            <div className="home_box">
                <div className='mb-2' style={{fontSize:"13px",fontWeight:200}}>{title}</div>
                <OPDoughnut data={omicsChartData} width="200" display_legend="false"/>
                {/* <OPDoughnut data={omicsChartData} title={title} width="200" display_legend="false"/> */}
                { omicsCount ?
                    <>
                        <hr/>
                        <div>
                            {Object.keys(type_colours).map((type) => <div className="d-flex justify-content-between " key={type}><span className='me-3'>{omicspred_omics_type(type)}</span><span style={{fontWeight:'bold'}}>{thousandifyNumber(omicsCount[type])}</span></div>)}
                        </div>
                    </>:''
                }
            </div>
             :''}
        </div>
    )
}

export default Stats;