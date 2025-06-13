import { CodeSlash } from 'react-bootstrap-icons';
import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import { datasets_columns } from "../../components/table/columns/datasets";
import Href from '../../components/Href';
import { PageTitleSimple, op_subtitle_no_asso } from '../../components/Common';
import { Note } from '../../components/Generic';
import { download_labels, download_applications_labels } from '../../components/Downloads';


function Downloads() {
    const url_suffix = 'dataset/all';


    const rest_api_doc = () => {
        return (
            <>
                Programmatic access to the {process.env.PROJECT_NAME} metadata is also available via a REST API.
                <div className='mt-2'>
                    <a href={process.env.REST_API_URL_PUBLIC} className="btn btn-op btn-sm shadow"><CodeSlash size='0.9em' className='me-2'/>REST API documentation</a>
                </div>
            </>
        )
    }

    const dataset_cols_ids = ['publication__pmid','platform__name','name'];
    
    return(
        <div>
            <PageTitleSimple title='Downloads'/>

            <div className='mb-4'>
                {process.env.PROJECT_NAME} metadata and data files downloads.
            </div>

            <div className='mb-5'>
                <Note msg={rest_api_doc()}/>
            </div>

            <div>
                {op_subtitle_no_asso('hl','Genetic scores')}

                <h6 className='mt-4 mb-3'><b>The different data files available are listed below:</b></h6>
                <ul className='expanded'>
                    <li><span className='line_key'>{download_labels['scoring_files_pgsc_calc']['icon']} Scoring files</span>Collection of tab-delimited text files containing the list of variant information and effect alleles/weights of each genetic score. See more information about the file format in the <Href text='Polygenic Score (PGS) Catalog' href='https://www.pgscatalog.org/downloads/#dl_ftp_scoring'/> documentation.</li>
                    <li><span className='line_key'>{download_labels['scoring_files_hm_38']['icon']} Harmonised scoring files</span>Collection of tab-delimited text files containing the list of variant information and effect alleles/weights of each genetic score. The variants locations have been lifted/mapped to the <b>GRCh38</b> genome build. See more information about the file format in the <Href text='Polygenic Score (PGS) Catalog' href='https://www.pgscatalog.org/downloads/#dl_ftp_scoring_hm_pos'/> documentation.</li>
                    <li><span className='line_key'>{download_labels['validation_results']['icon']} Validation results</span>CSV file containing the metadata information and performance metrics associated with each genetic score.</li>
                    <li><span className='line_key'>{download_labels['score_variant_info']['icon']} Score variant information</span>CSV file containing information (rsID, location, alleles) about each variant retained in the dataset.</li>
                    <li><span className='line_key'>{download_labels['gwas_sumstats']['icon']} GWAS summary stats</span>List of GWAS summary stats files used to build the genetic score models.</li>
                </ul>

                <p>The data files are publicly accessible on the <Href href={process.env.URL_DOWNLOADS} text={<>Box<sup>TM</sup></>}/> platform.</p>

                <h6 className='mt-4 mb-3'><b>Data files availability by dataset:</b></h6>
                <div className='mt-2'>
                    <DataTableFromRestApi table_key="datasets" url_suffix={url_suffix} columns={datasets_columns} col_for_ids={dataset_cols_ids}/>
                </div>
            </div>

            <div className='mt-5'>
               {op_subtitle_no_asso('hl','PheWAS associations')}
                <ul className='expanded mt-3'>
                    { Object.keys(download_applications_labels).map((type) =>
                        <li key={type}>
                            <a href={download_applications_labels[type]['url']} title={download_applications_labels[type]['title']} target="_blank">
                                {download_applications_labels[type]['icon']} <span className='align-middle'>{download_applications_labels[type]['label']}</span>
                            </a><span className='align-middle'>: {download_applications_labels[type]['desc']}</span>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    )

}

export default Downloads;