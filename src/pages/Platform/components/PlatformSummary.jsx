import { numberBadge } from "../../../components/Generic";


const PlatformSummary = (props) => {
    const platform_sum = props.metadata
    const platform_versions = props.versions

    return (
        <div className="me-4">
            <div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column me-4">
                <div className="card mb-3 me-5" style={{padding:"0px",maxWidth:"800px"}}>
                    <div className="card-header"><h5 className="mb-0">Platform information</h5></div>
                    <div className="card-body">
                        <div className="card-text">
                            <table className='table_card table_card_col_centered'>
                                <tbody>
                                    <tr><td>Omics type</td><td><span className={'badge badge_'+platform_sum.type}>{platform_sum.type}</span></td></tr>
                                    <tr><td>Long Name</td><td>{platform_sum.full_name}</td></tr>
                                    { platform_versions != '' ? <tr><td>Versions</td><td>{platform_versions}</td></tr> : ''}
                                    <tr><td>Technic</td><td>{platform_sum.technic}</td></tr>
                                    <tr><td>Number of scores</td><td>{numberBadge(platform_sum.scores_count)}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PlatformSummary
