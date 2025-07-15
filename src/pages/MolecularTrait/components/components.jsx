import { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { Table } from 'react-bootstrap-icons';
import restApiCall from '../../../components/RestAPI';
import { op_title, element_icon, Header2Cards } from '../../../components/Common';
import { ToogleID }  from '../../../components/Generic';
import { ScoresTable, PerformanceMetricsTable } from './tables';
import { display_gene_link, display_protein_link, display_metabolite_link, display_phenotype_link, display_pathway_link, sort_data } from './links';
import Href from '../../../components/Href';
import DataTree from '../../../components/DataTree';

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
		if (score_metric_data.results) {
			setPerformanceMetricData(score_metric_data.results);
		}
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
	const phenotypes = props.phenotypes ? sort_data(props.phenotypes) : props.phenotypes;
	const pathways = props.pathways ? sort_data(props.pathways) : props.pathways;

	return (
		<>
			{ genes && genes.length > 0 ? <tr><td>{element_icon('gene')}<span>Gene{genes.length > 1 && 's'}</span></td><td key='genes_data'>{genes.map((data,index) => display_gene_link(data,index))}</td></tr> : '' }
			{ transcripts && transcripts.length > 0 ? <tr key='transcripts'><td>{element_icon('transcript')}<span>Transcript{transcripts.length > 1 && 's'}</span></td><td>{transcripts.map((data, index) => <span key={'trans_'+data.name}>{index ? ', ': ''}<span key={data.name}>{data.name}</span></span>)}</td></tr> : '' }
			{ proteins && proteins.length > 0 ? <tr key='proteins'><td>{element_icon('protein')}<span>Protein{proteins.length > 1 && 's'}</span></td><td>{proteins.map((data, index) => display_protein_link(data,index))}</td></tr> : '' }
			{ metabolites && metabolites.length > 0 ? <tr key='metabolites'><td>{element_icon('metabolite')}<span>Metabolite{metabolites.length > 1 && 's'}</span></td><td>{metabolites.map((data, index) => display_metabolite_link(data,index))}</td></tr> : '' }
			{ phenotypes && phenotypes.length > 0 ?
				<>
					<tr key='phenotypes'><td>{element_icon('phenotype')}<span>PheWAS</span></td><td>
						<div className='d-flex'>
							<div>
								{ phenotypes.length > 1 ?
									<ToogleID key={'toggle_phenotypes'} title={<><span className='font-bold'>{phenotypes.length}</span> associated phenotype entries</>} id="phenotypes_list"/>
									: phenotypes.map((data) => display_phenotype_link(data,phenotypes.length))
								}
							</div>
							<Tooltip title="See details in the Phenotype table at the bottom of the current page">
								<div className="ms-3">
									<Href href="#phenotype_table" icon={<Table/>}/>
								</div>
							</Tooltip>
						</div>
					</td></tr>
					{
						phenotypes.length > 1 ?
							<tr>
								<td colSpan="2" id="phenotypes_list" className='op_sub_list d-none'>
									<ul className="mb-1" style={{paddingLeft:"4rem"}}>{phenotypes.map((data) => display_phenotype_link(data,phenotypes.length))}</ul>
								</td>
							</tr>:''
					}
				</> : ''
			}
			{ pathways && pathways.length > 0 ?
				<>
					<tr key='pathways'><td>{element_icon('pathway')}<span>Pathway{pathways.length > 1 && 's'}</span></td><td>
						{
							pathways.length > 1 ?
								<ToogleID key={'toggle_pathways'} title={<><span className='font-bold'>{pathways.length}</span> associated pathways</>} id="pathways"/>
								: pathways.map((data) => display_pathway_link(data,pathways.length))
						}
					</td></tr>
					{
						pathways.length > 1 ?
							<tr>
								<td colSpan="2" id="pathways" className='op_sub_tree d-none'>
									<DataTree tree_items={build_pathway_tree(pathways)} />
								</td>
							</tr>:''
					}
				</> : ''
			}
		</>
	)
}


const build_pathway_tree = (pathways_list) => {
	const data = build_tree_data(pathways_list);
	let tree = [];
	let item_ids = [];
	tree = build_tree(data, item_ids);
	return tree;
}

export const build_tree = (data, item_ids, parentId = null) => {
	let tree = [];
    data.forEach(item => {
        // Check if the item belongs to the current parent
		if (item.parentId === parentId) {
			let new_item = {...item};
            // Recursively build the children of the current item
			let children = build_tree(data, item_ids, item.external_id);
			// If children exist, assign them to the current item
			if (children.length) {
				new_item.children = children;
			}
			if (item_ids.includes(new_item.id)) {
				let suffix = 0
				let tmp_id = new_item.id+'_'+suffix;
				while (item_ids.includes(tmp_id)) {
					suffix += 1;
					tmp_id = new_item.id+'_'+suffix;
				}
				new_item.id = tmp_id
			}
			item_ids.push(new_item.id)

            // Add the current item to the tree
			tree.push(new_item);
        }
    });
    return tree;
}

const build_tree_data = (pathways_list) => {
	let items = [];

	for (let i=0; i<pathways_list.length; i++) {
		const pathway = pathways_list[i];
		const pathway_id = pathway.external_id;
		const parent_ids = pathway.parent_external_ids;

		const pathway_link = display_pathway_link(pathway,1)

		if (parent_ids.length > 0) {
			for (let i=0;i<parent_ids.length;i++) {
				items.push({
					'id': pathway_id+"_"+parent_ids[i],
					'external_id': pathway_id,
					'label': <small>{pathway_link}</small>,
					'parentId': parent_ids[i]
				})
			}
		}
		else {
			items.push({
				'id': pathway_id,
				'external_id': pathway_id,
				'label': <small>{pathway_link}</small>,
				'parentId': null
			})
		}
	}
	return items;
}