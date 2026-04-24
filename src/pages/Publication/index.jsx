import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import restApiCall from '../../components/RestAPI';
import Href from "../../components/Href";
import DatasetTable from '../../components/DatasetTable';
import { op_subtitle, op_title, HeaderCard } from '../../components/Common';
import { consoleDev, ToggleText, scoresBadge, datasetBadge, phewasButton } from '../../components/Generic';


function Publication() {
    let { opp_id } = useParams();
    const [publicationData, setPublicationData] = useState([])
    const [publicationTitle, setPublicationTitle] = useState('')
    // const [publicationYear, setPublicationYear] = useState([])
    const [datasetsData, setDatasetsData] = useState([])


    const fetchPublicationData = async () => {
        consoleDev('publication/'+opp_id)
        const publication_data = await restApiCall('publication/'+opp_id);
        consoleDev(publication_data);
        setPublicationData(publication_data);
        const year = publication_data.date_publication ? publication_data.date_publication.split('-')[0] : undefined
        setPublicationTitle("Publication: "+publication_data.id+' ('+publication_data.firstauthor+' - '+year+')')
        publication_data.datasets.sort((a, b) => a.id.localeCompare(b.id))
        for (let i=0; i<publication_data.datasets.length;i++) {
            publication_data.datasets[i]['publication'] = publication_data.id;
        }
        setDatasetsData(publication_data.datasets);
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
        for (let i=0; i< datasetsData.length; i++) {
            scores_count += datasetsData[i].scores_count;
        }
        return scoresBadge(scores_count);
    }

    const get_information_content = () => {
		return (
			<>
                { publicationData.title ? <tr><td>Title</td><td>{publicationData.title}</td></tr>:''}
                { publicationData.pmid ?
                    <>
                        <tr><td>PubMed ID</td><td><Href href={process.env.URL_ROOT_PUBMED+publicationData.pmid} text={publicationData.pmid}/></td></tr>
                    </> : ''
                }
                { publicationData.doi ? <tr><td>doi</td><td><Href href={process.env.URL_ROOT_DOI+publicationData.doi} text={publicationData.doi}/></td></tr>:''}
                { publicationData.date_publication ? <tr><td>Publication Date</td><td>{convertPublicationDate()}</td></tr>:''}
                { publicationData.journal ? <tr><td>Journal</td><td>{publicationData.journal}</td></tr>:''}
                { publicationData.authors ? <tr><td>Authors</td><td><ToggleText text={publicationData.authors} limit='80' /></td></tr>:''}
                { datasetsData ? <tr><td>Number of scores</td><td>{get_scores_count()}{ datasetsData.length > 1 ? <span className='fw-bold separator_1'>Datasets: {datasetBadge(datasetsData.length)}</span>:''}</td></tr>:''}
                { publicationData.phewas_count ? <tr><td>Number of linked PheWAS</td><td>{phewasButton(publicationData.phewas_count,publicationData.id)}</td></tr>:''}
            </>
        )
    }

    useEffect(() => {
        fetchPublicationData();
    },[])

    return (
        <>
            { publicationData && publicationTitle ?
                <>
                    {op_title('publication', publicationData, publicationData.id, false, publicationTitle)}
                    <HeaderCard type='publication' content={get_information_content()} />
                </>
                :''
            }
            <div className='mt-5'></div>

            { datasetsData.length > 0 ?
                <>
                    {op_subtitle('hl','Dataset',datasetsData.length)}
                    <div className='d-flex mb-5' id='dataset_table'>
                        <DatasetTable data={datasetsData} page="publication" key='datasets' />
                    </div>
                </> : ''
            }
        </>
    )
}

export default Publication
