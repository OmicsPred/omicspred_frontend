import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Href from '../../components/Href';
import DataTableServer from '../../components/table/DataTableServer';
// import DataTableFromRestApi from '../../components/table/DataTableFromRestApi';
// import DataTable from '../../../components/table/DataTable';
// import { common_cols, common_data_cols } from '../../components/table/columns/common';

import { phenotype_cols } from '../../components/table/columns/phenotype';
import restApiCall from '../../components/RestAPI';
import { phewasBadge, loading_data, add_s_when_plural } from '../../components/Generic';
import { op_title, op_subtitle_no_asso, HeaderCard, no_entry_found } from '../../components/Common';
import { display_source } from '../MolecularTrait/components/links';


function Phenotype() {
    const { phenotype } = useParams();
    const [phenotypeData, setPhenotypeData] = useState()
    // Temporary
    // const [sampleData, setSampleData] = useState()
    // const [cohortData, setCohortData] = useState()
    // ---------
    const [noEntry, setNoEntry] = useState(false)

    const phenotype_id = phenotype;
    const url_suffix = "score/phewas/search?phenotype_id="+phenotype_id;
    // const child_columns = [
    //     common_cols['phenotype_id'],
    //     common_cols['phenotype_name'],
    //     common_cols['phenotype_category'],
    //     common_cols['scores_count']
    // ]

    const column_keys = ['score__id','data_values__FDR'];

    const fetchSummaryData = async () => {
        const data = await restApiCall('phenotype/'+phenotype_id);
        if (data && Object.keys(data).length) {
            setPhenotypeData(data);
        }
        else {
            setNoEntry(true);
        }
    }

    // Temporary
    // const fetchSampleData = async () => {
    //     const data = await restApiCall(url_suffix);
    //     if (data && Object.keys(data).length) {
    //         if (data.size != 0) {
    //             setSampleData(data.results[0].sample);
    //             setCohortData(data.results[0].cohort)
    //         }
    //     }
    // }
    // const display_sample_info = () => {
    //     return (
    //         <>
    //             <tr><td>Cohort</td><td>{cohortData.name_short != cohortData.name_full ? <span>{cohortData.name_full} <small>({cohortData.name_short})</small></span>: cohortData.name_short}</td></tr>
    //             <tr><td>Samples</td><td>{participantsBadge(sampleData.sample_number)}<small className='ms-2'><span className='op_color_2'>(</span>Cases: <span className='fw-bold'>{thousandifyNumber(sampleData.sample_cases)}</span> <span className='op_color_2'>/</span> Controls: {thousandifyNumber(sampleData.sample_controls)}<span className='op_color_2'>)</span></small></td></tr>
    //             <tr><td>Female samples</td><td>{sampleData.sample_percent_female}%</td></tr>
    //             <tr><td>Samples mean age</td><td>{sampleData.sample_age} ± {sampleData.sample_age_sd}</td></tr>
    //         </>
    //     )
    // }
    // ---------

    const display_reported_traits = (reported_traits) => {
        if (reported_traits.length != 0) {
            if (reported_traits.length > 1) {
                return (
                    <ul className='mb-0'>
                        {reported_traits.map((reported_trait) => <li key={reported_trait.id}>{reported_trait.label} ({reported_trait.source} {reported_trait.id})</li>)}
                    </ul>
                )
            }
            else {
                const reported_trait = reported_traits[0];
                return <span key={reported_trait.id}>{reported_trait.label} ({reported_trait.source} {reported_trait.id})</span>;
            }
        }
    }

    const get_information_content = () => {
        return (
            <>
                <tr><td>Identifier</td><td><Href href={phenotypeData.url} text={phenotypeData.id}/>{display_source(phenotypeData.source)}</td></tr>
                <tr><td>Category</td><td>{phenotypeData.category.join(', ')}</td></tr>
                {phenotypeData.traits_reported ? <tr><td>Trait{add_s_when_plural(phenotypeData.traits_reported.length)} reported</td><td>{display_reported_traits(phenotypeData.traits_reported)}</td></tr>:''}
                <tr><td>Number of linked PheWAS</td><td>{phewasBadge(phenotypeData.phewas_count)}</td></tr>
                {/* Temporary */}
                {/* { sampleData ? <>{display_sample_info()}</> : '' } */}
                {/* --------- */}
            </>
        )
    }
  
    useEffect(() => {
      fetchSummaryData();
      // Temporary
    //   fetchSampleData();
      // ---------
    },[])

    return (
        <div>
            { phenotypeData ?
                <>
                    {/* Phenotype Summary data */}
                    {op_title('phenotype', phenotypeData, phenotypeData.label)}
                    <HeaderCard type='Phenotype' content={get_information_content()} />

                    <div className='mt-5'></div>

                    {/* Score association */}
                    { phenotypeData.phewas_count > 0 ?
                        <div className='d-flex' style={{flexDirection:'column'}}>
                            {op_subtitle_no_asso('phenotype','Linked PheWAS data', phenotypeData.phewas_count)}
                            <DataTableServer table_key="phenotype" title='score' type='score' url_suffix={url_suffix} columns={phenotype_cols} col_for_ids={column_keys} hidden_columns={['z-score','var_gene_exp']}/>
                        </div> : ''
                    }
                    {/* Phenotype child terms */}
                    {/* {
                        phenotypeData.child_phenotype && phenotypeData.child_phenotype.length ?
                        <div className='mt-5'>
                            {op_subtitle_no_asso('phenotype','Children Phenotype entries',phenotypeData.child_phenotype.length)}
                            <DataTable data={phenotypeData.child_phenotype} columns={child_columns}/>
                        </div> : ''
                    } */}
                </>
                : noEntry ?
                    <>{ no_entry_found('phenotype',phenotype_id) }</> : loading_data()
            }
        </div>
    );
}

export default Phenotype