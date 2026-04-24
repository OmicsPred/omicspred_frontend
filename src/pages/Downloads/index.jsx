import { ChevronRight, CodeSlash } from 'react-bootstrap-icons';
import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import { datasets_columns, datasets_phewas_columns } from "../../components/table/columns/datasets";
import Href from '../../components/Href';
import { PageTitleSimple, TableOfContent, op_subtitle_no_asso } from '../../components/Common';
import { Note, ToggleDiv } from '../../components/Generic';
import { download_labels } from '../../components/Downloads';


function Downloads() {
    const url_suffix = 'dataset/all';
    const url_suffix_phewas = 'dataset/all?only_phewas=1';

    const project_name = process.env.PROJECT_NAME

    const table_of_content = {
        'genetic_scores': 'Genetic scores',
        'phewas_associations': 'PheWAS associations'
    }

    const rest_api_doc = () => {
        return (
            <>
                Programmatic access to the {project_name} metadata is also available via a REST API.
                <div className='mt-2'>
                    <a href={process.env.REST_API_URL_PUBLIC} className="btn btn-op btn-sm shadow"><CodeSlash size='0.9em' className='me-2'/>REST API documentation</a>
                </div>
            </>
        )
    }

    const box_prefix = 'https://app.box.com/shared/static/';

    const file_links_in_rest_api_endpoint = () => {
        const endpoint = '/api/dataset/OPD000001'
        const div_content = <div className='mt-1'>
            <div>Endpoint: <Href text={endpoint} href={'https://rest.omicspred.org'+endpoint}/> (the links are under the field <i>scoring_files_urls</i>)</div>
            <div className='highlight2 mt-2'>
                <pre><code>
                    <span className='grey_color'>&#123;</span>
                    <div className='ms-3'>
                        <div className='grey_color'>"id": "OPD000001",</div>
                        <div className='grey_color'>...,</div>
                        <div className='op_color_2'>"<b>scoring_files_urls</b>": &#123;
                            <div className='ms-3'>
                                <div>"covariance": "{box_prefix}3ag9r684h83riq093g7oc8916dicjud9",</div>
                                <div>"gwas_sumstats": "{box_prefix}u3flbp13zjydegrxjb2uepagp1vb6bj2",</div>
                                <div>"metadata": "{box_prefix}anwpkxcpaixbfj67vd6odzqbsb7rk8a8",</div>
                                <div>"phewas": "{box_prefix}u4gq3qypwley3m0wfduuisrou3ij0iso",</div>
                                <div>"predictdb": "{box_prefix}06ugvdomcsalytpuocbywn60qvibcyl4",</div>
                                <div>"scoring_files": "{box_prefix}z86fg93jg5gwdmmu4xn6u287mre2g5o7",</div>
                                <div>"score_variant_info": "{box_prefix}eac8psw30dxh9evwu9z0bj8hncru2ioa",</div>
                                <div>"validation_results": "{box_prefix}7j7233otah0yxl4rypqx44wzsj7xywxp",</div>
                                <div>"scoring_files_hm_38": "{box_prefix}sec454h1eyu4ns687q1fvydl7tlwn05d",</div>
                                <div>"scoring_files_pgsc_calc": "{box_prefix}7qgaa2ci00x9kggyd48qodxd1ffo3ol7"</div>
                            </div>
                        &#125;,</div>
                        <div className='grey_color'>...</div>
                    </div>
                   <span className='grey_color'>&#125;</span>
                </code></pre>
            </div>
        </div>;
        return (
            <>
                <div className='mb-1'>The Box<sup>TM</sup> links to the data files are also available in the <Href text='REST API Dataset endpoints' href={process.env.REST_API_URL_PUBLIC}/>.</div>
                {/* <ToggleDiv content={div_content} title={<><ChevronRight size="14"/>Example</>}/> */}
                <ToggleDiv content={div_content} title={<><ChevronRight size="14"/>Example</>}/>
            </>
        )
    }

    const dataset_cols_ids = ['publication__pmid','platform__name','name'];

    return(
        <div>
            <PageTitleSimple title='Downloads'/>

            <div className='mb-3'>
                {project_name} metadata and data files downloads.
            </div>

            <TableOfContent title={project_name+' downloads'} content_headers={table_of_content}/>

            <div className='mb-5'>
                <Note msg={rest_api_doc()}/>
            </div>

            <div id='genetic_scores'>
                {op_subtitle_no_asso('hl','Genetic scores')}

                <h6 className='mt-4 mb-3'><b>The different data files available are listed below:</b></h6>
                <ul className='expanded'>
                    <li><span className='line_key'>{download_labels['scoring_files_pgsc_calc']['icon']} Scoring files</span>Collection of tab-delimited text files containing the list of variant information and effect alleles/weights of each genetic score. See more information about the file format in the <Href text='Polygenic Score (PGS) Catalog' href='https://www.pgscatalog.org/downloads/#dl_ftp_scoring'/> documentation.</li>
                    <li><span className='line_key'>{download_labels['scoring_files_hm_38']['icon']} Harmonised scoring files</span>Collection of tab-delimited text files containing the list of variant information and effect alleles/weights of each genetic score. The variants locations have been lifted/mapped to the <b>GRCh38</b> genome build. See more information about the file format in the <Href text='Polygenic Score (PGS) Catalog' href='https://www.pgscatalog.org/downloads/#dl_ftp_scoring_hm_pos'/> documentation.</li>
                    <li><span className='line_key'>{download_labels['predictdb']['icon']} PredictDB SQLite</span>SQLite database compatible with the <Href text='PredictDB' href='https://predictdb.org/'/> prediction weights format.</li>
                    <li><span className='line_key'>{download_labels['covariance']['icon']} Covariance</span>Covariance file to be used with the <Href text='PredictDB' href='https://predictdb.org/'/> SQLite databases in <Href text='MetaXcan' href='https://github.com/hakyimlab/MetaXcan'/> set of tools (PrediXcan, SPrediXcan, MultiXcan and SMultiXcan).</li>
                    <li><span className='line_key'>{download_labels['metadata']['icon']} Metadata</span>Excel spreadsheet containing the metadata of the dataset (Publication, Scores, Samples, Performances and Cohort(s)).</li>
                    {/* <li><span className='line_key'>{download_labels['phewas']['icon']} PheWAS</span>Tab-delimited file containing Phenome-wide association studies information linked to {project_name} Genetic Scores. It only contains the significant associations (FDR Adjusted P-value&lt;0.05)</li> */}
                    <li><span className='line_key'>{download_labels['validation_results']['icon']} Validation results</span>CSV file containing the metadata information and performance metrics associated with each genetic score.</li>
                    <li><span className='line_key'>{download_labels['score_variant_info']['icon']} Score variant information</span>CSV file containing information (rsID, location, alleles) about each variant retained in the dataset.</li>
                    <li><span className='line_key'>{download_labels['gwas_sumstats']['icon']} GWAS summary stats</span>List of GWAS summary stats files used to build the genetic score models.</li>
                </ul>

                <p>The data files are publicly accessible on the <Href href={process.env.URL_DOWNLOADS} text={<>Box<sup>TM</sup></>}/> platform (this includes the PheWAS data files listed at the bottom of the page).</p>

                <div className='mb-3'>
                    <Note msg={file_links_in_rest_api_endpoint()}/>
                </div>

                <h6 className='mt-4 mb-3' id='data_files'><b>Data files availability by dataset:</b></h6>
                <div className='mt-2'>
                    <DataTableFromRestApi table_key="datasets" url_suffix={url_suffix} columns={datasets_columns} col_for_ids={dataset_cols_ids} expanded_search="1"/>
                </div>
            </div>

            <div className='mt-5' id='phewas_associations'>
                {op_subtitle_no_asso('hl','PheWAS associations')}
                <h6 className='mt-4 mb-3'>Tab-delimited files containing Phenome-wide association studies information linked to {project_name} Genetic Scores. It only contains the significant associations (FDR Adjusted P-value&lt;0.05)</h6>
                <h6 className='mt-4 mb-3' id='data_files'><b>Downloadable data files by dataset:</b></h6>
                <div>
                    <DataTableFromRestApi table_key="datasets_phewas" url_suffix={url_suffix_phewas} columns={datasets_phewas_columns} col_for_ids={dataset_cols_ids} expanded_search="1"/>
                </div>
                {/* <ul className='expanded mt-3'>
                    { Object.keys(download_applications_labels).map((type) =>
                        <li key={type}>
                            <a href={download_applications_labels[type]['url']} title={download_applications_labels[type]['title']} target="_blank">
                                {download_applications_labels[type]['icon']} <span className='align-middle'>{download_applications_labels[type]['label']}</span>
                            </a><span className='align-middle'>: {download_applications_labels[type]['desc']}</span>
                        </li>)
                    }
                </ul> */}
            </div>
        </div>
    )

}

export default Downloads;