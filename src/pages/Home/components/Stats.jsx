import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'react-bootstrap-icons';
import restApiCall from '../../../components/RestAPI';
import { thousandifyNumber } from '../../../components/Generic';
import OmicsDistribution from './components/OmicsDistribution';
import PlatformsDistribution from './components/PlatformsDistribution';


const Stats = (props) => {
    const [scoresCount, setScoresCount] = useState([]);
    const [platformsCount, setPlatformsCount] = useState([]);
    const [publicationsCount, setPublicationsCount] = useState([]);;
    const [pheWASCount, setPheWASCount] = useState([]);
    const [pathwaysCount, setPathwaysCount] = useState([]);

    const project_name = process.env.PROJECT_NAME

    const type_colours = {
        "Metabolomics": '#FFA500',   // Orange
        "Proteomics": '#DD0000',     // Red shade
        "Transcriptomics": '#800080' // Patriarch (purple)
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

    const display_count_block = (title,count,url,type) => {
        if (!type) {
            type = title;
        }
        const small_title = title.replace('associations', 'asso.')
        return (
            <div className='home_stats_box'>
                <div className='home_stats_title'>
                    <ChevronRight className='r me-1' size="20px"/>
                    <span className='d-sm-none'>{small_title}</span>
                    <span className='d-none d-sm-inline'>{title}</span>
                </div>
                <div className='home_stats_count'>{thousandifyNumber(count)}</div>
                <div className='home_stats_btn'>
                    {/* <a className="btn btn-primary btn-sm shadow" href={url} role="button">Browse</a> */}
                    <a className="btn btn-op btn-sm shadow" href={url} role="button">Browse</a>
                </div>
            </div>
        )
    }

    useEffect(() => {
        fetchCounts();
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
            {  scoresCount &&  scoresCount != 0 ?
                <>
                    <div className='op_stats_separator'></div>
                    <div className='d-flex flex-column'>
                        <OmicsDistribution data={props.data} scores_count={scoresCount} colours={type_colours} />
                        <PlatformsDistribution scores_count={scoresCount} colours={type_colours} />
                    </div>
                </>:''
            }
        </div>
    )
}

export default Stats;