import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {cohort_cols, common_column_groups} from '../../../components/table/columns/common';
import DataTable from "../../../components/table/DataTable";
import {common_cols} from "../../../components/table/columns/common";
import restApiCall from '../../../components/RestAPI';
import Href from '../../../components/Href';


function ProteinTest() {
  let { protein } = useParams();
  const [elementData, setElementData] = useState([])
  const [scoreData, setScoreData] = useState([])

  const element = 'protein';
  const url_suffix = "score/searchby"+element+"/"+protein;
  const columns = [
      common_cols['omicspred_id'],
      common_cols['platform_type'],
      common_cols['platform_name'],
      common_cols['publication'],
      common_cols['variants_number'],
      common_cols['scoring_file']
  ]

  const gene_details = (gene) => {
    const gene_name = gene.name;
    const gene_ext_id = gene.external_id;
    if (gene_name) {
      return (
        <>
          <Href text={gene_name} href={'/gene/'+gene_name}/>{gene_ext_id ? <small className='ps-2'>({gene_ext_id})</small>:''}
        </>
      );
    }
    else {
      return <Href text={gene_ext_id} href={'/gene/'+gene_ext_id}/>
    }
  }


  const get_table_columns = (columns,data) => {
    let table_columns = columns
    let cohorts = [];
    for (let i=0; i<data.length; i++) {
      for (let j=0; j<data[i].score_performance.length; j++) {
        const cohort_label = data[i].score_performance[j].cohort_label;
        if (cohort_cols[cohort_label] && !cohorts.includes(cohort_label)) {
          cohorts.push(cohort_label);
        }
      }
    }
    // const metric_cols = ['R2','Rho','Missing Rate'];
    const metric_cols = ['R2'];
    for (let i=0; i< cohorts.length; i++) {
        const cohort = cohorts[i];
        if (cohort_cols[cohort]) {
            for (let j=0; j<metric_cols.length; j++) {
                const metric = metric_cols[j];
                if (cohort_cols[cohort][metric]) {
                    columns.push(cohort_cols[cohort][metric])
                }
            }
        }
    }
    return table_columns
  }



  const get_table_column_groups = (data) => {
    let col_groups = [];
    let cohorts = [];
    for (let i=0; i<data.length; i++) {
      for (let j=0; j<data[i].score_performance.length; j++) {
        const cohort_label = data[i].score_performance[j].cohort_label;
        if (common_column_groups[cohort_label] && !cohorts.includes(cohort_label)) {
          cohorts.push(cohort_label);
        }
      }
    }

    // Fetch column group details
    for (let i=0; i< cohorts.length; i++) {
      const cohort = cohorts[i];
      if (common_column_groups[cohort]) {
          col_groups.push(common_column_groups[cohort])
      }
    }
    return col_groups;
  }


  const fetchSummaryData = async () => {
    const data = await restApiCall(element+'/'+protein+'?include_gene=1');
    console.log(data);
    setElementData(data);
    console.log(data.gene)
  }


  const fetchScoreData = async () => {
    const score_data = await restApiCall('score/performance/searchby'+element+'/'+protein);
    console.log(score_data);
    setScoreData(score_data.results);
  }


  useEffect(() => {
      fetchSummaryData();
      fetchScoreData();
  },[])

  return (
    <div>
      <h2 className='page_title'>Protein <span>{protein}</span></h2>
      <ul className='key_val_line'>
        <li><span className='line_key'>Name</span>{elementData.name}</li>
        { elementData.gene ? <li><span className='line_key'>Gene</span>{gene_details(elementData.gene)}</li>:''}
      </ul>
      { scoreData ?
        <div className='d-flex mt-3'>
          <DataTable key="protein_scores" data={scoreData} columns={get_table_columns(columns,scoreData)} groups={get_table_column_groups(scoreData)}/>
        </div>
        :
        <div>Loading ...</div>
      }  
    </div>
  );
}

export default ProteinTest