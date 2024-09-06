import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DocumentTitle from '../../components/DocumentTitle';
import restApiCall from '../../components/RestAPI';
import Href from "../../components/Href";
import PlatformTable from './components/PlatformTable';
import { op_subtitle_no_asso, op_title, publication_ref, HeaderCard } from '../../components/Common';
import { loading_data, scoresBadge } from '../../components/Generic';


function Publication() {
    let { pubmed_id } = useParams();
    const [publicationData, setPublicationData] = useState([])
    const [publicationTitle, setPublicationTitle] = useState('')
    // const [publicationYear, setPublicationYear] = useState([])
    const [datasetsData, setDatasetsData] = useState([])


    const fetchPublicationData = async () => {
        const publication_data = await restApiCall('publication/'+pubmed_id);
        console.log(publication_data);
        setPublicationData(publication_data);
        const year = publication_data.date_publication ? ' ('+publication_data.date_publication.split('-')[0]+')' : undefined
        setPublicationTitle("Publication: "+publication_data.firstauthor+year)
        // buildPublicationYear(publication_data.date_publication);
        publication_data.datasets.sort((a, b) => a.platform.name.localeCompare(b.platform.name))
        setDatasetsData(publication_data.datasets);
    }

    // const buildPublicationYear = (date_publication) => {
    //     const year = date_publication.split('-')[0]
    //     setPublicationYear(year);
    // }

    // Convert date into DD/MM/YYYY format
    const convertPublicationDate = () => {
        if (publicationData.date_publication) {
            const date_array = publicationData.date_publication.split('-')
            return date_array[2]+"/"+date_array[1]+"/"+date_array[0]
        }
    }

    const get_scores_count = () => {
        let scores_count = 0;
        for (let i=0; i< datasetsData.length; i++) {
            scores_count += datasetsData[i].scores_count;
        }
        return scoresBadge(scores_count);
    }

    const get_information_content = () => {
		return (
			<>
                { publicationData.title ? <tr><td>Title</td><td>{publicationData.title}</td></tr>:''}
                { publicationData.pmid ? <tr><td>PubMed ID</td><td><Href href={process.env.URL_ROOT_PUBMED+publicationData.pmid} text={publicationData.pmid}/></td></tr>:''}
                { publicationData.doi ? <tr><td>doi</td><td><Href href={process.env.URL_ROOT_DOI+publicationData.doi} text={publicationData.doi}/></td></tr>:''}
                { publicationData.date_publication ? <tr><td>Publication Date</td><td>{convertPublicationDate()}</td></tr>:''}
                { publicationData.journal ? <tr><td>Journal</td><td>{publicationData.journal}</td></tr>:''}
                { datasetsData ? <tr><td>Number of scores</td><td>{get_scores_count()}</td></tr>:''}
            </>
        )
    }

    useEffect(() => {
        fetchPublicationData();
    },[])

    return (
        <>
            {  publicationData ?
                <>
                    { DocumentTitle(publicationTitle) }
                    {op_title('publication', publicationData, publication_ref(publicationData, true))}
                    <HeaderCard type='publication' content={get_information_content()} />
                </>
                :''
            }
            <div className='mt-5'></div>

            {/* Scores by Platform */}
            {op_subtitle_no_asso('hl','List of Scores by Platform')}
            { datasetsData ?
                <div className='d-flex mt-3'>
                    <div>
                        { datasetsData && publicationData.pmid ? datasetsData.map((dataset, index) => <PlatformTable key={index+'_'+dataset.name+'_'+dataset.platform.name+"_platform_table"} data={dataset} pmid={publicationData.pmid} />):''}
                    </div>
                </div>
                : loading_data()
            }
        </>
    )
}

export default Publication
