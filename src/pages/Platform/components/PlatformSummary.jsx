import { HeaderCard } from '../../../components/Common';

import { numberBadge } from "../../../components/Generic";


const PlatformSummary = (props) => {
    const platform_sum = props.metadata
    const platform_versions = props.versions

    const get_information_content = () => {
		return (
			<>
                <tr><td>Omics type</td><td><span className={'badge badge_'+platform_sum.type}>{platform_sum.type}</span></td></tr>
                <tr><td>Long Name</td><td>{platform_sum.full_name}</td></tr>
                { platform_versions != '' ? <tr><td>Version{platform_versions.includes(',') ? 's':''}</td><td>{platform_versions}</td></tr> : ''}
                <tr><td>Technic</td><td>{platform_sum.technic}</td></tr>
                <tr><td>Number of scores</td><td>{numberBadge(props.scores_count)}</td></tr>
            </>
        )
    }

    return (<HeaderCard type='platform' content={get_information_content()} />);
}
export default PlatformSummary
