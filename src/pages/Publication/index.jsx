import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight } from 'react-bootstrap-icons';
import restApiCall from '../../components/RestAPI';
import Href from "../../components/Href";
import { publication_score_columns, publication_transcriptomics_columns, publication_proteomics_columns, publication_metabolomics_columns } from '../../components/table/columns/scores';
import DataTable from "../../components/table/DataTable";
import DataTableServer from '../../components/table/DataTableServer';
import PlatformCard from './components/PlatformCard';
import {omicspred_omics_type, omicspred_internal_link, common_cols} from "../../components/table/columns/common";
import { op_subtitle, publication_ref } from '../../components/Common';
import { numberBadge } from '../../components/Generic';


function Publication() {
    let { pubmed_id } = useParams();
    const [publicationData, setPublicationData] = useState([])
    const [publicationYear, setPublicationYear] = useState([])
    const [platformsData, setPlatformsData] = useState([])

    const url_endpoint = 'score/search?pmid='+pubmed_id;

    const get_cohorts_list = (sample_data) => {
        const cohorts = [];
        // Loop over the samples
        for (let i=0; i< sample_data.length; i++) {
            const sample_cohorts = sample_data[i].cohorts;
            // Loop over the cohorts
            for (let j=0; j< sample_cohorts.length; j++) {
                const cohort_name = sample_cohorts[j].name_short;
                if (!cohorts.includes(cohort_name)) {
                    cohorts.push(cohort_name)
                }
            } 
        }
        return cohorts.sort().join(', ');
    }

    const columns = [
        { 
            field: 'name', 
            headerName: 'Name', 
            minWidth: 150,
            flex: 1,
            renderCell: (params) => {
                return omicspred_internal_link({'label': params.row.platform.name},'platform');
            },
            valueGetter: (params) => { return params.row.platform.name }
        },
        { 
            field: 'full_name', 
            headerName: 'Full Name', 
            minWidth: 200,
            valueGetter: (params) => { return params.row.platform.full_name }
        
        },
        { 
            field: 'version', 
            headerName: 'Version',
            valueGetter: (params) => { return params.row.platform.version }
        },
        { 
            field: 'technic', 
            headerName: 'Technic', 
            minWidth: 450,
            valueGetter: (params) => { return params.row.platform.technic }
        },
        { 
            field: 'type', 
            headerName: 'Type',
            minWidth: 180,
            flex: 1,
            renderCell: (params) => {
                return omicspred_omics_type(params.row.platform.type);
            },
            valueGetter: (params) => { return params.row.platform.type }
        },
        {
            field: 'cohorts_training',
            headerName: 'Cohort Training',
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return get_cohorts_list(params.row.samples_training);
            },
            valueGetter: (params) => {
                return get_cohorts_list(params.row.samples_training);
            }
        },
        {
            field: 'cohorts_validation',
            headerName: 'Cohort Validation',
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return get_cohorts_list(params.row.samples_validation);
            },
            valueGetter: (params) => {
                return get_cohorts_list(params.row.samples_validation);
            }
        },
        common_cols['scores_count']
    ]


    const fetchPublicationData = async () => {
        const publication_data = await restApiCall('publication/'+pubmed_id);
        console.log(publication_data);
        setPublicationData(publication_data);
        buildPublicationYear(publication_data.date_publication);
        setPlatformsData(publication_data.platforms);
    }

    const buildPublicationYear = (date_publication) => {
        const year = date_publication.split('-')[0]
        setPublicationYear(year);
    }

    // Generate the columns for the scores table
    const score_columns = (platforms) => {
        let score_columns = publication_score_columns.start;
        let platform_types = []
        for (const platform of platforms) {
            const p_type = platform.platform.type;
            if (!platform_types.includes(p_type)) {
                platform_types.push(p_type);
            }
        }
        // Proteomics and Transcriptomics share the Gene column
        if (platform_types.includes('Proteomics')) {
            score_columns = score_columns.concat(publication_proteomics_columns)
        }
        else if (platform_types.includes('Transcriptomics')) {
            score_columns = score_columns.concat(publication_transcriptomics_columns)
        }
        if (platform_types.includes('Metabolomics')) {
            score_columns = score_columns.concat(publication_metabolomics_columns)
        }
        score_columns = score_columns.concat(publication_score_columns.end);
        return score_columns;
    }

    const get_scores_count = () => {
        let scores_count = 0;
        for (let i=0; i< platformsData.length; i++) {
            scores_count += platformsData[i].scores_count;
        }
        return numberBadge(scores_count);
    }


    // Convert date into DD/MM/YYYY format
    const convertPublicationDate = () => {
        if (publicationData.date_publication) {
            const date_array = publicationData.date_publication.split('-')
            return date_array[2]+"/"+date_array[1]+"/"+date_array[0]
        }
    }

    useEffect(() => {
        fetchPublicationData();
    },[])

    return (
        <>
            <h2 className='page_title'>Publication<ChevronRight className={'op_title_separator color_hl'}/>{publication_ref(publicationData, true)}</h2>
            <div className='mb-4'>
                <div className='d-flex'>
                    <div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column me-4">
                        <div className="card mb-3 me-5" style={{padding:"0px",maxWidth:"800px"}}>
                            <div className="card-header"><h5 className="mb-0">Publication Information</h5></div>
                            <div className="card-body">
                                <div className="card-text">
                                    <table className='table_card table_card_col_centered'>
                                        <tbody>
                                            { publicationData.title ? <tr><td>Title</td><td>{publicationData.title}</td></tr>:''}
                                            { publicationData.pmid ? <tr><td>PubMed ID</td><td><Href href={process.env.URL_ROOT_PUBMED+publicationData.pmid} text={publicationData.pmid}/></td></tr>:''}
                                            { publicationData.doi ? <tr><td>doi</td><td><Href href={process.env.URL_ROOT_DOI+publicationData.doi} text={publicationData.doi}/></td></tr>:''}
                                            { publicationData.date_publication ? <tr><td>Publication Date</td><td>{convertPublicationDate()}</td></tr>:''}
                                            { publicationData.journal ? <tr><td>Journal</td><td>{publicationData.journal}</td></tr>:''}
                                            { platformsData ?  <tr><td># Scores</td><td>{get_scores_count()}</td></tr>:''}
                                        </tbody>
                                    </table> 
                                </div>
                            </div>
                        </div>
                    </div>
                    { platformsData && platformsData.length ?
                        <div>
                            {op_subtitle('hl','samples by platform')}
                            <div className="d-flex flex-column">
                                { platformsData.map((platform_data) => <PlatformCard data={platform_data} pmid={publicationData.pmid} key={platform_data.platform.name} />)}
                            </div>
                        </div>: ''
                    }
                </div>   
            </div>

            {op_subtitle('hl','platform')}
            { platformsData ?
                <>
                    <div className='mb-4'>
                        <DataTable key="platforms" data={platformsData} columns={columns}/>
                    </div>
                    {op_subtitle('score')}
                    <div>
                        <DataTableServer url_suffix={url_endpoint} columns={score_columns(platformsData)} />
                    </div>
                </> : ''
            }
        </>
    )
}

export default Publication
