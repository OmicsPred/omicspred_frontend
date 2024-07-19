import React, { useState, useEffect } from 'react';
import restApiCall from '../../../components/RestAPI';
import { op_title, element_icon, Header2Cards } from '../../../components/Common';
import { ToogleDiv }  from '../../../components/Generic';
import { ScoresTable, PerformanceMetricsTable } from './tables';
import { display_gene_link, display_protein_link, display_metabolite_link, display_phecode_link, display_pathway_link, sort_data } from './links';


export const MolecularTraitContent = (props) => {

    const [scoreData, setScoreData] = useState([])
	const [performanceMetricData, setPerformanceMetricData] = useState([])

    const mt_type = props.type;
    const mt_id = props.id;
    const mt_sum_data = props.sum_data;
    const mt_sum_display_left = props.sum_display_left;
    const mt_sum_display_right = props.sum_display_right;
    const scores_columns = props.scores_columns ? props.scores_columns : undefined;

    const url_score = "score/search/"+mt_type+"/"+mt_id;

    const fetchScoreData = async () => {
		const data = await restApiCall(url_score);
		if (data.results) {
			setScoreData(data.results)
		}
	}

    const fetchPerformanceMetrics = async () => {
		const score_metric_data = await restApiCall('performance/search/'+mt_type+'/'+mt_id);
        setPerformanceMetricData(score_metric_data.results);
    }

    useEffect(() => {
		fetchScoreData();
		fetchPerformanceMetrics();
	},[])


    return (
		<div>
			{ mt_sum_data ?
				<>
					{/* Summary Data */}
					{op_title(mt_type, mt_sum_data, mt_id)}
					<div className='op_card_container_info'>
						<Header2Cards type_left={mt_type} content_left={mt_sum_display_left} content_right={mt_sum_display_right}/>
					</div>

					{/* Associated scores */}
					{ scoreData && scoreData.length ? <ScoresTable data={scoreData} columns={scores_columns} />:'' }

					{/* Performance metrics table */}
					{ performanceMetricData && performanceMetricData.length ? <PerformanceMetricsTable data={performanceMetricData}/>:'' }
				</>
				: ''
            }
        </div>
	);
}


export const MolecularTraitAssociation = (props) => {

	const genes = props.genes;
	const transcripts = props.transcripts;
	const proteins = props.proteins;
	const metabolites = props.metabolites;
	const phecodes = props.phecodes ? sort_data(props.phecodes) : props.phecodes;
	const pathways = props.pathways ? sort_data(props.pathways) : props.pathways;

	return (
		<>
			{ genes && genes.length > 0 ? <tr><td>{element_icon('gene')}<span>Gene{genes.length > 1 && 's'}</span></td><td key='genes_data'>{genes.map((data,index) => display_gene_link(data,index))}</td></tr> : '' }
			{ transcripts && transcripts.length > 0 ? <tr key='transcripts'><td>{element_icon('transcript')}<span>Transcript{transcripts.length > 1 && 's'}</span></td><td>{transcripts.map((data, index) => <span key={'trans_'+data.name}>{index ? ', ': ''}<span key={data.name}>{data.name}</span></span>)}</td></tr> : '' }
			{ proteins && proteins.length > 0 ? <tr key='proteins'><td>{element_icon('protein')}<span>Protein{proteins.length > 1 && 's'}</span></td><td>{proteins.map((data, index) => display_protein_link(data,index))}</td></tr> : '' }
			{ metabolites && metabolites.length > 0 ? <tr key='metabolites'><td>{element_icon('metabolite')}<span>Metabolite{metabolites.length > 1 && 's'}</span></td><td>{metabolites.map((data, index) => display_metabolite_link(data,index))}</td></tr> : '' }
			{
				phecodes && phecodes.length > 0 ? <tr key='phenotypes'><td>{element_icon('phecode')}<span>PheWAS</span></td><td>
					{
						phecodes.length > 1 ?
							<ToogleDiv key={'toggle_phecodes'} title={<><span className='font-bold'>{phecodes.length}</span> associated PheCode entries</>} content={<ul className="ps-3">{phecodes.map((data, index) => display_phecode_link(data,index,phecodes.length))}</ul>}/>
							: phecodes.map((data, index) => display_phecode_link(data,index,phecodes.length))
					}
					</td></tr> : ''
			}
			{
				pathways && pathways.length > 0 ? <tr key='pathways'><td>{element_icon('pathway')}<span>Pathway{pathways.length > 1 && 's'}</span></td><td>
					{
						pathways.length > 1 ?
							<ToogleDiv key={'toggle_pathways'} title={<><span className='font-bold'>{pathways.length}</span> associated pathways</>} content={<ul className="ps-3">{pathways.map((data, index) => display_pathway_link(data,index,pathways.length))}</ul>}/>
							: pathways.map((data, index) => display_pathway_link(data,index,pathways.length))
					}
				</td></tr> : ''
			}
		</>
	)

}
