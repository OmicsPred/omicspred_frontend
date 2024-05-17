import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight } from 'react-bootstrap-icons';
import restApiCall from '../../components/RestAPI';
import Href from "../../components/Href";
import PlatformTable from './components/PlatformTable';
import { publication_platform_columns } from "../../components/table/columns/platforms";
import { op_subtitle_no_asso, publication_ref } from '../../components/Common';
import { numberBadge } from '../../components/Generic';


function Publication() {
    let { pubmed_id } = useParams();
    const [publicationData, setPublicationData] = useState([])
    const [publicationYear, setPublicationYear] = useState([])
    const [platformsData, setPlatformsData] = useState([])

    const url_endpoint = 'score/search?pmid='+pubmed_id;

    const columns = publication_platform_columns;


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

    // Convert date into DD/MM/YYYY format
    const convertPublicationDate = () => {
        if (publicationData.date_publication) {
            const date_array = publicationData.date_publication.split('-')
            return date_array[2]+"/"+date_array[1]+"/"+date_array[0]
        }
    }

    const get_scores_count = () => {
        let scores_count = 0;
        for (let i=0; i< platformsData.length; i++) {
            scores_count += platformsData[i].scores_count;
        }
        return numberBadge(scores_count);
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
                                            { platformsData ?  <tr><td>Number of scores</td><td>{get_scores_count()}</td></tr>:''}
                                        </tbody>
                                    </table> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>

            {op_subtitle_no_asso('hl','List of Scores by Platform')}
            <div className='d-flex mt-3'>
                <div>
                    { platformsData && publicationData.pmid ? platformsData.map((platform) => <PlatformTable key={platform.platform.name+"_platform_table"} data={platform} pmid={publicationData.pmid} />):''}
                </div>
            </div>
        </>
    )
}

export default Publication
