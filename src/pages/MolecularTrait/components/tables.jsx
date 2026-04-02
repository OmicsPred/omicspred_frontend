import DataTableServer from '../../../components/table/DataTableServer';
import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import AncestryLegend from '../../../components/ancestry/AncestryLegend';
import { performance_metrics_columns_large_ext } from '../../../components/table/columns/score';
import { score_molecular_trait_columns } from '../../../components/table/columns/scores';
import { op_subtitle, op_subtitle_no_asso } from '../../../components/Common';


export const ScoresTable = (props) => {
    const columns = props.columns ? props.columns : score_molecular_trait_columns;
    return (
        <div className="mt-5">
            {op_subtitle('score',undefined,props.count)}
            <div className='d-flex mb-3'>
                <AncestryLegend />
            </div>
            <DataTableServer key="score" url_suffix={props.url_score} columns={columns}/>
		</div>
    )
}

export const PerformanceMetricsTable = (props) => {
    const cols_ids = ['associated_opgs_id','cohort_label','sample__ancestry_broad','sample__sample_number','evaluation_type'];
    return (
        <div className='mt-5'>
            {op_subtitle_no_asso('hl','Performance metrics')}
            <DataTableFromRestApi key="performance_metrics" url_suffix={props.url_perf} columns={performance_metrics_columns_large_ext} hidden_columns={['platform__name','platform__platform_master__type']} col_for_ids={cols_ids}/>
        </div>
    )
}