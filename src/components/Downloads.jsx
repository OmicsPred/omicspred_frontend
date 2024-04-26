import { FileEarmarkArrowDown } from 'react-bootstrap-icons';

{/* <tr><td>Scoring file</td><td><FileEarmarkText className="hl_color" size={24}/></td></tr> */}

export const DownloadButtons = (props) => {

    const download_labels = {
        "scoring_files": "Scoring files",
        "scoring_files_pgsc_calc": "Scoring files (pgsc_calc compatible)",
        "validation_results": "Validation Results",
        "score_variant_info": "Variants info",
        "gwas_sumstats": "GWAS summary stats"
    }

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

    return (
        <>
            { props.urls ? 
                <table className='table op_table'>
                    <tbody>
                        { Object.keys(props.urls).map((label) => <tr key={label}><td>{label}</td><td><a href={props.urls[label]} target="_blank"><FileEarmarkArrowDown className="hl_color" size={24}/></a></td></tr>)}
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