import { ChevronRight, CodeSlash } from 'react-bootstrap-icons';
import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import { datasets_columns, datasets_phewas_columns } from "../../components/table/columns/datasets";
import Href from '../../components/Href';
import { PageTitleSimple, TableOfContent, op_subtitle_no_asso, phewas_mention } from '../../components/Common';
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
                                <div>"phewas_full": "{box_prefix}8x1glgr7qk6i87fmr6a0linmck1g2rzm",</div>
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
                <ToggleDiv content={div_content} title={<><ChevronRight size="14"/>Example</>}/>
            </>
        )
    }

    const dataset_cols_ids = ['publication__pmid','platform__name','name'];

    const phewas_note = <span>The Website and the <Href href={process.env.REST_API_URL_PUBLIC} text='REST API'/> only display the filtered PheWAS data (i.e. having the {phewas_mention()}).</span>

    const phewas_export_format = <div className='highlight_section px-4 py-3'>
        List of the columns in the PheWAS export format:
        <table className='table table_doc mt-2'>
            <thead>
                <tr><th>Column name</th><th>Column description</th></tr>
            </thead>
            <tbody>
                <tr><td className='fw-bold'>omicspred_id</td><td>{project_name} Genetic Score ID</td></tr>
                <tr><td className='fw-bold'>gene_ids</td><td>List of Gene external IDs (semi-colon separated)</td></tr>
                <tr><td className='fw-bold'>gene_names</td><td>List of Gene names (semi-colon separated)</td></tr>
                <tr><td className='fw-bold'>protein_ids</td><td>List of Protein external IDs (semi-colon separated)</td></tr>
                <tr><td className='fw-bold'>protein_names</td><td>List of Protein names (semi-colon separated)</td></tr>
                <tr><td className='fw-bold'>metabolite_ids</td><td>List of Metabolite external IDs (semi-colon separated)</td></tr>
                <tr><td className='fw-bold'>metabolite_names</td><td>List of Metabolite names (semi-colon separated)</td></tr>
                <tr><td className='fw-bold'>phenotype_ids</td><td>List of Phenotype IDs, e.g. EFO IDs (semi-colon separated)</td></tr>
                <tr><td className='fw-bold'>phenotype_labels</td><td>List of Phenotype names (semi-colon separated)</td></tr>
                <tr><td className='fw-bold'>trait_reported</td><td>Reported trait (e.g. PheCode)</td></tr>
                <tr><td className='fw-bold'>method_description</td><td>Method/Tool used to generate the PheWAS</td></tr>
                <tr><td className='fw-bold'>phewas_publication_id</td><td>{project_name} Publication ID where the PheWAS have been generated</td></tr>
                <tr><td className='fw-bold'>sample_number</td><td>Total number of participants</td></tr>
                <tr><td className='fw-bold'>sample_cases</td><td>Number of cases participants</td></tr>
                <tr><td className='fw-bold'>sample_controls</td><td>Number of controls participants</td></tr>
                <tr><td className='fw-bold'>ancestry</td><td>Ancestry(ies) of the participants (semi-colon separated)</td></tr>
                <tr><td className='fw-bold'>cohorts</td><td>List of cohorts used (semi-colon separated)</td></tr>
                <tr><td className='fw-bold'>gwas_catalog_id</td><td>GWAS Catalog Study ID (GCST ID)</td></tr>
                <tr><td className='fw-bold'>effect_size</td><td>Effect Size value</td></tr>
                <tr><td className='fw-bold'>HR</td><td>Hasard Ratio (HR) or Odds Ratio (OR) value</td></tr>
                <tr><td className='fw-bold'>HR_lower_upper</td><td>Confidence interval (CI) of the HR/OR. The format is `[lower; upper]` (e.g. [0.86, 0.91])</td></tr>
                <tr><td className='fw-bold'>z-score</td><td>Z-score value</td></tr>
                <tr><td className='fw-bold'>p-value</td><td>P-value</td></tr>
                <tr><td className='fw-bold'>adjusted_p-value</td><td>Adjusted P-value</td></tr>
                <tr><td className='fw-bold'>adjusted_pvalue_method</td><td>Method used to adjust the P-value</td></tr>
                <tr><td className='fw-bold'>var_gene_exp</td><td>Variance of the gene expression</td></tr>
            </tbody>
        </table>
    </div>;

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
                <div className='mt-4'>
                    <p><span className='fw-bold'>Tab-delimited</span> files containing Phenome-wide association studies information linked to {project_name} Genetic Scores.<br />
                        Two types of export files are available:
                        <ul className='mt-2'>
                            <li>PheWAS file containing only the filtered associations, i.e. {phewas_mention()} (<span className='fw-bold'>PheWAS</span> column).</li>
                            <li>PheWAS file containing all the associations (<span className='fw-bold'>PheWAS Full</span> column).</li>
                        </ul>
                    </p>
                    <div className='mb-3'>
                        <Note msg={phewas_note}/>
                    </div>
                </div>
                <ToggleDiv type='button_blue' content={phewas_export_format} title='PheWAS export file format '/>
                <h6 className='mt-4 mb-3' id='data_files'><b>Downloadable data files by dataset:</b></h6>
                <div>
                    <DataTableFromRestApi table_key="datasets_phewas" url_suffix={url_suffix_phewas} columns={datasets_phewas_columns} col_for_ids={dataset_cols_ids} expanded_search="1"/>
                </div>
            </div>
        </div>
    )
}

export default Downloads;