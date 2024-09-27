import DataTable from '../../../components/table/DataTable';
import { score_columns_ext } from '../../../components/table/columns/score';
import { score_molecular_trait_columns } from '../../../components/table/columns/scores';
// import { pathway_molecular_trait_columns } from '../../../components/table/columns/pathways';
import { op_subtitle,op_subtitle_no_asso } from '../../../components/Common';


export const ScoresTable = (props) => {
    const columns = props.columns ? props.columns : score_molecular_trait_columns
    return (
        <div className="mt-5">
            {op_subtitle('score',undefined,props.data.length)}
            <DataTable key="score" data={props.data} columns={columns}/>
		</div>
    )
}

export const PerformanceMetricsTable = (props) => {
    return (
        <div className='mt-5'>
            {op_subtitle_no_asso('hl','Performance Metrics',props.data.length)}
            <DataTable key="score" data={props.data} columns={score_columns_ext}/>
        </div>
    )
}

// export const PathwaysTable = (props) => {
//     return (
//         <div className="mt-5">{op_subtitle('pathway',undefined,props.data.length)}
// 			<DataTable key="pathway" data={props.data} columns={pathway_molecular_trait_columns}/>
// 		</div>
//     )
// }