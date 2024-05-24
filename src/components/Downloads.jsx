import { FileEarmarkArrowDown } from 'react-bootstrap-icons';

{/* <tr><td>Scoring file</td><td><FileEarmarkText className="hl_color" size={24}/></td></tr> */}

export const download_labels = {
    "scoring_files": {"label": "Scoring files"},
    "scoring_files_pgsc_calc": {"label": "Scoring files", "sub_label": "pgsc_calc compatible"},
    "validation_results": {"label": "Validation Results"},
    "score_variant_info": {"label": "Variants info"},
    "gwas_sumstats": {"label": "GWAS summary stats"}
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


export const DownloadButtons = (props) => {

    return (
        <>
            { props.urls ? 
                <div className="d-grid gap-3 d-md-block">
                    { Object.keys(props.urls).map((label) => <DownloadButton key={label} label={label} url={props.urls[label]} />)}
                </div>
                :''
            }
        </>
    )
}


export const DownloadList = (props) => {

    const icon_size = 24;
    const div_size = icon_size + (8 * 2); // 40

    return (
        <>
            { props.urls ? 
                <table className='table op_dwnld_table'>
                    <tbody>
                        { Object.keys(props.urls).map((entry) =>
                            <tr key={'download_'+entry}>
                                <td>{props.urls[entry]['label']}{props.urls[entry]['sub_label'] ? <small> ({props.urls[entry]['sub_label']})</small>:''}</td>
                                <td className="p-0">
                                    <a href={props.urls[entry]['url']} title={'Download '+props.urls[entry]['label']} target="_blank">
                                        <div className="p-2" style={{width:div_size+"px",height:div_size+"px"}}><FileEarmarkArrowDown className="hl_color" size={icon_size}/></div>
                                    </a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                :''
            }
        </>
    )
}


const DownloadButton = (props) => {

    // return (
    //     <div className='btn shadow me-2' onClick={() => {location.href = props.url;}}><div className='mb-1'>{props.label}</div><FileEarmarkArrowDown className="hl_color" size={24}/></div>
    // )
    return (
        <a className='btn shadow me-2' href={props.url} target="_blank"><span className='mb-1'>{props.label}</span><br/><FileEarmarkArrowDown className="hl_color" size={24}/></a>
    )
}