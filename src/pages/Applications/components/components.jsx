import { Download } from 'react-bootstrap-icons';
import { download_applications_labels } from '../../../../src/components/Downloads';


{/* /!\ Hard coded information /!\ */}
export const get_information_content = () => {
    return (
        <>
            <tr><td>Cohort</td><td>UK BioBank <small>(White British)</small></td></tr>
            <tr><td>Testing Model for disease</td><td>Age as the time scale Cox regression models (y ~ omic genetic score* + strat(sex) + genotyping array + 10PCs)</td></tr>
            <tr><td>Selection criterion</td><td>FDR-adjusted p-value &lt; 0.05</td></tr>
        </>
    )
}


export const PheWASDownloadButton = (props) => {
    const type = props.type;
    return (
        <div className='mb-5'>
            <a className="btn btn-op shadow" href={download_applications_labels[type]['url']} title={download_applications_labels[type]['title']} target="_blank">
                <Download className='align-middle me-2' size="20"/><span className='align-middle pe-2'>{download_applications_labels[type]['label']}</span>{download_applications_labels[type]['icon']}
            </a>
        </div>
    )
}