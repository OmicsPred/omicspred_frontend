import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import DataTable from '../../../components/table/DataTable';
import { common_cols, common_data_cols } from '../../../components/table/columns/common';
import { applications_cols } from '../../../components/table/columns/phenotype';
import restApiCall from '../../../components/RestAPI';
import { scoresBadge, participantsBadge, thousandifyNumber, loading_data } from '../../../components/Generic';
import { op_title, op_subtitle_no_asso, HeaderCard, no_entry_found } from '../../../components/Common';
import { display_source } from '../../MolecularTrait/components/links';


function PhenotypeOld() {
    const { phenotype } = useParams();
    const [phenotypeData, setPhenotypeData] = useState()
    // Temporary
    const [sampleData, setSampleData] = useState()
    const [cohortData, setCohortData] = useState()
    // ---------
    const [noEntry, setNoEntry] = useState(false)

    const phenotype_id = phenotype.replace('_','.');
    const url_suffix = "applications_score/search?phenotype_id="+phenotype_id;
    const columns = [
        common_cols['omicspred_id'],
        applications_cols['gene'],
        applications_cols['protein'],
        applications_cols['metabolite'],
        applications_cols['sample_age'],
        applications_cols['sample_number'],
        applications_cols['sample_percent_female'],
        applications_cols['cohort'],
        common_cols['platform_type'],
        common_cols['platform_name'],
        // common_data_cols['r2'],
        common_data_cols['hazard_ratio'],
        common_data_cols['fdr']
    ]
    const child_columns = [
        common_cols['phenotype_id'],
        common_cols['phenotype_name'],
        common_cols['phenotype_category'],
        common_cols['scores_count']
    ]

    // const column_keys = ['phenotype__id','score_id'];
    const column_keys = ['score_id'];

    const fetchSummaryData = async () => {
        const data = await restApiCall('phenotype_old/'+phenotype_id+'?include_children=1');
        if (data && Object.keys(data).length) {
            setPhenotypeData(data);
        }
        else {
            setNoEntry(true);
        }
    }

    // Temporary
    const fetchSampleData = async () => {
        const data = await restApiCall(url_suffix);
        if (data && Object.keys(data).length) {
            if (data.size != 0) {
                setSampleData(data.results[0].sample);
                setCohortData(data.results[0].cohort)
            }
        }
    }
    const display_sample_info = () => {
        return (
            <>
                <tr><td>Cohort</td><td>{cohortData.name_short != cohortData.name_full ? <span>{cohortData.name_full} <small>({cohortData.name_short})</small></span>: cohortData.name_short}</td></tr>
                <tr><td>Samples</td><td>{participantsBadge(sampleData.sample_number)}<small className='ms-2'><span className='op_color_2'>(</span>Cases: <span className='fw-bold'>{thousandifyNumber(sampleData.sample_cases)}</span> <span className='op_color_2'>/</span> Controls: {thousandifyNumber(sampleData.sample_controls)}<span className='op_color_2'>)</span></small></td></tr>
                <tr><td>Female samples</td><td>{sampleData.sample_percent_female}%</td></tr>
                <tr><td>Samples mean age</td><td>{sampleData.sample_age} ± {sampleData.sample_age_sd}</td></tr>
            </>
        )
    }
    // ---------

    const get_information_content = () => {
		return (
			<>
                <tr><td>Identifier</td><td>{phenotypeData.id}{display_source(phenotypeData.source)}</td></tr>
                <tr><td>Category</td><td>{phenotypeData.category}</td></tr>
                <tr><td># Score{phenotypeData.scores_count > 1 ? 's' : ''}</td><td>{scoresBadge(phenotypeData.scores_count)}</td></tr>
                {/* Temporary */}
                { sampleData ? <>{display_sample_info()}</> : '' }
                {/* --------- */}
            </>
        )
    }
  
    useEffect(() => {
      fetchSummaryData();
      // Temporary
      fetchSampleData();
      // ---------
    },[])

    return (
        <div>
            { phenotypeData ?
                <>
                    {/* Phenotype Summary data */}
                    {op_title('phenotype', phenotypeData, phenotype_id)}
                    <HeaderCard type='Phenotype' content={get_information_content()} />

                    <div className='mt-5'></div>

                    {/* Score association */}
                    { phenotypeData.scores_count > 0 ?
                        <div className='d-flex' style={{flexDirection:'column'}}>
                            <DataTableFromRestApi table_key="phenotype" title='score' type='score' url_suffix={url_suffix} columns={columns} col_for_ids={column_keys}/>
                        </div> : ''
                    }
                    {/* Phenotype child terms */}
                    {
                        phenotypeData.child_phenotype && phenotypeData.child_phenotype.length ?
                        <div className='mt-5'>
                            {op_subtitle_no_asso('phenotype','Children Phenotype entries',phenotypeData.child_phenotype.length)}
                            <DataTable data={phenotypeData.child_phenotype} columns={child_columns}/>
                        </div> : ''
                    }
                </>
                : noEntry ?
                    <>{ no_entry_found('phenotype',phenotype_id) }</> : loading_data()
            }
        </div>
    );
}

export default PhenotypeOld