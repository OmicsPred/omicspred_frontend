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

    const title = 'Scores distribution by Omics type'

    const type_colours = {
        "Metabolomics": 'orange',
        "Proteomics": '#D00',
        "Transcriptomics": '#800080'
    };


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
            data.labels.push(category+' ('+thousandifyNumber(label_data)+')');
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
        fetchOmicsChartData();
    },[])

    return (
        <div className='d-flex flex-column'>
            <div className="mb-4" style={{border:"1px solid #CCC",borderRadius:"6px",padding:"1rem",backgroundColor:'white'}}>
                { scoresCount && scoresCount > 0 ?<div className='d-flex justify-content-between mb-2'><span style={{fontWeight:'200',fontSize:'24px',paddingRight:'2rem'}}>Scores</span><span style={{fontWeight:'bold',fontSize:'24px'}}>{thousandifyNumber(scoresCount)}</span></div>:''}
                { platformsCount && platformsCount > 0 ? <div className='d-flex justify-content-between mb-2'><span style={{fontWeight:'200',fontSize:'24px',paddingRight:'2rem'}}>Platforms</span><span style={{fontWeight:'bold',fontSize:'24px'}}>{platformsCount}</span></div>:''}
                { publicationsCount && publicationsCount > 0 ? <div className='d-flex justify-content-between mb-2'><span style={{fontWeight:'200',fontSize:'24px',paddingRight:'2rem'}}>Publications</span><span style={{fontWeight:'bold',fontSize:'24px'}}>{publicationsCount}</span></div>:''}
                { omicsTypesCount && omicsTypesCount > 0 ?<div className='d-flex justify-content-between mb-2'><span style={{fontWeight:'200',fontSize:'24px',paddingRight:'2rem'}}>Omics Types</span><span style={{fontWeight:'bold',fontSize:'24px'}}>{omicsTypesCount}</span></div>:''}
                {/* { omicsCount ?
                    <>
                        <hr/>
                        <div>
                            {Object.keys(type_colours).map((type) => <div className="d-flex justify-content-between " key={type}><span className='me-3'>{omicspred_omics_type(type)}</span><span style={{fontWeight:'bold'}}>{thousandifyNumber(omicsCount[type])}</span></div>)}
                        </div>
                    </>:''
                } */}
            </div>
            { omicsChartData  && omicsChartData.labels ? 
            <div style={{border:"1px solid #CCC",borderRadius:"6px",padding:"1rem",backgroundColor:'white'}}>
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