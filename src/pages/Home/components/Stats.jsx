import React, { useState, useEffect } from 'react';
import { PersonArmsUp, Lungs, Bezier2, Stack, Book } from 'react-bootstrap-icons';
import restApiCall from '../../../components/RestAPI';
import { thousandifyNumber } from '../../../components/Generic';
// import OmicsDistribution from './components/OmicsDistribution';
import PlatformsDistribution from './components/PlatformsDistribution';


const Stats = () => {
    const [scoresCount, setScoresCount] = useState(0);
    const [platformsCount, setPlatformsCount] = useState(0);
    const [publicationsCount, setPublicationsCount] = useState(0);
    const [phenotypeAssoCount, setPhenotypeAssoCount] = useState(0);
    const [pathwaysCount, setPathwaysCount] = useState(0);
    const [tissuesCount, setTissuesCount] = useState(0);

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
            setPhenotypeAssoCount(count_data.phenotype_associations);
            setPathwaysCount(count_data.pathways);
            setScoresCount(count_data.scores);
            setTissuesCount(count_data.tissues);
            setPlatformsCount(count_data.platforms);
            setPublicationsCount(count_data.publications);
        }
    }

    const display_count_block = (title,count,url,type) => {
        if (!type) {
            type = title;
        }
        let icon = undefined;
        switch(type) {
            case 'phenotype':
                // icon =  <Lungs className='me-2' size="20px"/>;
                icon = <PersonArmsUp className='me-2' size="20px"/>;
                break;
            case 'Pathways':
                icon = <Bezier2 className='me-2' size="20px"/>;
                break;
            case 'Platforms':
                icon = <Stack className='me-2' size="20px"/>;
                break;
            case 'Tissues':
                icon = <Lungs className='me-2' size="20px"/>;
                break;
            case 'Publications':
                icon = <Book className='me-2' size="20px"/>;
                break;
            default:
                icon = '';
                break;
        }

        const small_title = title.replace('associations', 'asso.');
        return (
            <div className='home_stats_box'>
                <div className='home_stats_title'>
                    {/* <ChevronRight className='me-1' size="20px"/> */}
                    {icon}
                    <span className='d-sm-none'>{small_title}</span>
                    <span className='d-none d-sm-inline' style={{minWidth:"200px"}}>{title}</span>
                </div>
                <div className='home_stats_count'>{thousandifyNumber(count)}</div>
                <div className='home_stats_btn'>
                    {/* <a className="btn btn-primary btn-sm shadow" href={url} role="button">Browse</a> */}
                    <a className="btn btn-op btn-sm shadow" href={url} role="button">Browse</a>
                </div>
            </div>
        )
    }

    const display_count_block_main = (title,count,url,type) => {
        if (!type) {
            type = title;
        }
        // const small_title = title.replace('associations', 'asso.')
        return (
            <div className='home_stats_box_main'>
                <div className='home_stats_title'>
                    <span>{title}</span>
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
        <div className='op_stats_container flex-xl-row flex-lg-row flex-md-column flex-sm-column flex-xs-column mt-4'>
            <div>
                {/* <h5 className='mb-4'>{project_name} data summary</h5> */}
                <h5 className='mt-2 mb-4'>{project_name} genetic scores</h5>
                <div className='op_stats2'>
                    { scoresCount && scoresCount > 0 ? display_count_block_main('Genetic Scores',scoresCount,'/scores' ,'Scores') : ''}
                    <PlatformsDistribution scores_count={scoresCount} colours={type_colours} />
                </div>
            </div>
            {  scoresCount &&  scoresCount != 0 ?
                <>
                    {/* <div className='op_stats_separator'></div> */}
                    <div className='d-flex flex-column'>
                        <h5 className='mt-2 mb-4'>{project_name} data summary</h5>
                        <div className='op_stats2'>
                            { phenotypeAssoCount && phenotypeAssoCount > 0 ? display_count_block('Phenotype associations',phenotypeAssoCount,'/applications/phenotype/full','phenotype') : ''}
                            { pathwaysCount && pathwaysCount > 0 ? display_count_block('Pathways',pathwaysCount,'/pathways') : ''}
                            { platformsCount && platformsCount > 0 ? display_count_block('Platforms',platformsCount,'/platforms') : ''}
                            { tissuesCount && tissuesCount > 0 ? display_count_block('Tissues',tissuesCount,'/tissues') : ''}
                            { publicationsCount && publicationsCount > 0 ? display_count_block('Publications',publicationsCount,'/publications') : ''}
                        </div>
                    </div>
                </>:''
            }
        </div>
    )
}

export default Stats;