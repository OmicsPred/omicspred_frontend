import { Book, Download } from 'react-bootstrap-icons';
import { TooltipText } from '../../../components/Generic';
import { download_applications_labels } from '../../../../src/components/Downloads';
import Href from '../../../components/Href';


// /!\ Hard coded information /!\
export const get_information_content = () => {
    const opp_id = 'OPP000001'
    return (
        <>
            <tr><td>Publication</td><td>
            <TooltipText
                title = "An atlas of genetic scores to predict multi-omic traits."
                text = {
                    <>
                        <Book className='me-2 color_hl'/>
                        <Href href={"/publication/"+opp_id} text={<>Xu Y <i>et al.</i> Nature (2023)</>} />
                    </>
                }
            />  <span>({opp_id})</span>
            </td></tr>
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
            <a className="btn btn-op shadow" href={download_applications_labels[type]['url']} title={download_applications_labels[type]['title']} target="_blank" rel="noreferrer">
                <Download className='align-middle me-2' size="20"/><span className='align-middle pe-2'>{download_applications_labels[type]['label']}</span><span className='extra_icon'>{download_applications_labels[type]['icon']}</span>
            </a>
        </div>
    )
}