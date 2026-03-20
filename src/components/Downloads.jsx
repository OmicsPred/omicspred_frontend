import { Database, Download, FileEarmarkSpreadsheet, FileEarmarkZip, FileEarmarkZipFill, FiletypeCsv, FiletypeXlsx, Folder2, InfoCircleFill } from 'react-bootstrap-icons';
import { ToggleDiv } from './Generic';
import Href from './Href';


const icon_size = 20;

export const download_labels = {
    "scoring_files": {
        "label": "Scoring files",
        "title": "Download zipped file",
        "icon": <FileEarmarkZip className="hl_color" size={icon_size}/>,
    },
    "scoring_files_pgsc_calc": {
        "label": "Scoring files",
        "sub_label": "pgsc_calc compatible",
        "title": "Download compresssed file - pgsc_calc compatible",
        "icon": <FileEarmarkZip className="hl_color" size={icon_size}/>
    },
    "scoring_files_hm_38": {
        "label": "Scoring files",
        "sub_label": "lifted over to GRCh38",
        "title": "Download compresssed file - lifted over to GRCh38 (harmonized)",
        "icon": <FileEarmarkZipFill className="hl_color" size={icon_size}/>
    },
    "predictdb": {
        "label": "PredictDB",
        "sub_label": "SQLite",
        "title": "Download SQLite compressed file",
        "icon": <Database className="hl_color" size={icon_size}/>
    },
    "covariance": {
        "label": "Covariance",
        "title": "Download covariance compressed text file",
        "icon": <FileEarmarkZip className="hl_color" size={icon_size}/>
    },
    "metadata": {
        "label": "Metadata",
        "title": "Download Excel spreadsheet",
        "icon": <FileEarmarkSpreadsheet className="hl_color" size={icon_size}/>
    },
    "validation_results": {
        "label": "Validation results",
        "title": "Download CSV file",
        "icon": <FiletypeCsv className="hl_color" size={icon_size}/>
    },
    "score_variant_info": {
        "label": "Variants info",
        "title": "Download CSV file",
        "icon": <FiletypeCsv className="hl_color" size={icon_size}/>
    },
    "gwas_sumstats": {
        "label": "GWAS summary stats",
        "title": "Browse data files",
        "icon": <Folder2 className="hl_color" size={icon_size}/>
    }
}

// Applications (PheWAS)
export const download_applications_labels = {
    'phewas_sumstats': {
        "label": "PheWAS summary stats",
        "title": "Download CSV file",
        "icon": <FiletypeCsv className="align-middle" size={icon_size}/>,
        "url": "https://app.box.com/s/e0t5v55ul588z7ls0qk5slo9lmp8yync",
        'desc': "List the number of OmicsPred genetic scores by Platform, for each Phenotype."
    },
    'phewas_associations': {
        "label": "PheWAS associations",
        "title": "Download Excel file",
        "icon": <FiletypeXlsx className="align-middle" size={icon_size}/>,
        "url": "https://app.box.com/s/2kbj2exeexuab51hjaveyzkftpc6ehdj",
        'desc': "List the identified associations between Phenotype entries and OmicsPred genetic scores."
    }
}

export const get_download_list = (scoring_files_urls) => {
    let urls = {};
    for (const key of Object.keys(download_labels)) {
        if (scoring_files_urls[key]) {
            urls[key] = {'url': scoring_files_urls[key], "label": download_labels[key]["label"]};
            if (download_labels[key]['sub_label']) {
                urls[key]['sub_label'] = download_labels[key]['sub_label']
            }
        }
    }
    return urls
}

export const DownloadList = (props) => {
    return (
        <>
            { props.urls ? 
                <div className='op_dwnld_container'>
                    { Object.keys(props.urls).map((entry) =>
                        <div key={entry}>
                            <a href={props.urls[entry]['url']} title={download_labels[entry]['title']} target="_blank" rel="noreferrer">
                                <div>{download_labels[entry]['icon']}</div>
                                <div>{props.urls[entry]['label']}{props.urls[entry]['sub_label'] ? <small> ({props.urls[entry]['sub_label']})</small>:''}</div>
                            </a>
                       </div>
                    )}
                    {/* Link to data files doc */}
                    <span className='d-flex justify-content-center mt-2 mb-1'>
                        <Href href="/downloads#genetic_scores" icon={<InfoCircleFill className="align-middle" size={18}/>} text="Information about the data files" target='blank'/>
                    </span>
                </div>
                :''
            }
        </>
    )
}


export const ExpandableDownloadButton = (props) => {

    const download_urls = props.download_urls;

    return (
        <div className='mb-3'>
            <ToggleDiv key='toggle_downloads_button' type='button' class_name='card px-2 pt-2 pb-1' title={<><Download className='me-2'/>Downloads</>} content={<DownloadList urls={download_urls}/>}/>
        </div>
    )
}