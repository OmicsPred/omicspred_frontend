import { cohort_cols, common_column_groups, cohort_valueGetter } from '../../../components/table/columns/common';
import {score_molecular_trait_columns}  from "../../../components/table/columns/scores";

const training_suffix = '__training';

export const get_cohort_columns = (scores) => {
    // Fetch Cohort columns
    let cohorts = {}
    for (let i=0; i<scores.length; i++) {
        const score = scores[i];
        const perf_cols = Object.keys(score.performance_data);
        for (let j=0; j<perf_cols.length; j++) {
            let cohort_label = perf_cols[j];
            let eval_type = 'Validation';
            if (cohort_label.endsWith(training_suffix)) {
                eval_type = 'Training'
                cohort_label = cohort_label.replace(training_suffix,'')
            }
            // console.log("- COHORT: "+cohort_label);
            if (cohorts[eval_type]) {
                if (!cohorts[eval_type].includes(cohort_label)) {
                    cohorts[eval_type].push(cohort_label);
                }
            }
            else {
                cohorts[eval_type] = [cohort_label];
            }
        }
    }
    // console.log("- COHORT TRAINING: ");
    // console.log(cohorts['Training']);
    // console.log("- COHORT VALIDATION: ");
    // console.log(cohorts['Validation']);
    return cohorts;
}
    
export const get_table_columns = (cohorts) => {
    let columns = score_molecular_trait_columns;
    // Fetch columns details
    // Training
    for (let i=0; i< cohorts['Training'].length; i++) {
        const cohort_info = cohorts['Training'][i];
        const lastIndexOf = cohort_info.lastIndexOf("_");
        const cohort = cohort_info.substring(0, lastIndexOf).replaceAll(' ','_');
        const metric = cohort_info.substring(lastIndexOf+1);
        if (cohort_cols[cohort]) {
            // Redefine the column object to adapt the "training" status
            if (cohort_cols[cohort][metric]) {
                let training_header_class = 'training_col'
                if (cohort_cols[cohort][metric].headerClassName == 'col_border_left') {
                    training_header_class = ['training_col','col_border_left']
                }
                const training_field = cohort_cols[cohort][metric].field+training_suffix;
                const cohort_metric_col = {...cohort_cols[cohort][metric], field: training_field, headerClassName: training_header_class, valueGetter: (value, row) => {return cohort_valueGetter(row,cohort,metric,true);}}
                columns.push(cohort_metric_col);
            }
        }
    }
    // Validation
    for (let i=0; i< cohorts['Validation'].length; i++) {
        const cohort_info = cohorts['Validation'][i];
        const lastIndexOf = cohort_info.lastIndexOf("_");
        const cohort = cohort_info.substring(0, lastIndexOf).replaceAll(' ','_');
        const metric = cohort_info.substring(lastIndexOf+1)
        if (cohort_cols[cohort]) {
            if (cohort_cols[cohort][metric]) {
                columns.push(cohort_cols[cohort][metric]);
            }
        }
    }
    return columns;
}

export const get_table_column_groups = (cohorts) => {
    let cohort_seen_training = [];
    let cohort_seen_validation = [];
    let col_groups = []
    for (let i=0; i< cohorts['Training'].length; i++) {
        const cohort_info = cohorts['Training'][i];
        const lastIndexOf = cohort_info.lastIndexOf("_");
        const cohort = cohort_info.substring(0, lastIndexOf).replaceAll(' ','_');
        if (!cohort_seen_training.includes(cohort)) {
            cohort_seen_training.push(cohort);
            // Redefine the column group object to adapt the "training" status of the child columns
            if (common_column_groups[cohort]) {
                const training_group_id = common_column_groups[cohort].groupId+' (training)';
                let training_field_children = []
                for (let j=0; j<common_column_groups[cohort].children.length; j++) {
                    const child_field= common_column_groups[cohort].children[j].field
                    training_field_children.push({field: child_field+training_suffix})
                }
                col_groups.push({...common_column_groups[cohort], groupId: training_group_id, children: training_field_children, headerClassName: ['training_col','col_border_left']})
            }
        }
    }
    for (let i=0; i< cohorts['Validation'].length; i++) {
        const cohort_info = cohorts['Validation'][i];
        const lastIndexOf = cohort_info.lastIndexOf("_");
        const cohort = cohort_info.substring(0, lastIndexOf).replaceAll(' ','_');
        if (!cohort_seen_validation.includes(cohort)) {
            cohort_seen_validation.push(cohort);
            if (common_column_groups[cohort]) {
                col_groups.push(common_column_groups[cohort]);
            }
        }
    }
    return col_groups
}