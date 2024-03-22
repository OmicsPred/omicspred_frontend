import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Diagram3 } from 'react-bootstrap-icons';
import Href from '../../../components/Href';
import DataTable from '../../../components/table/DataTable';
import { common_cols } from '../../../components/table/columns/common';
import restApiCall from '../../../components/RestAPI';
import { op_title, op_subtitle } from '../../../components/Common';


function Pathway() {
	let { pathway } = useParams();
	const [elementData, setElementData] = useState([])
	const [geneData, setGeneData] = useState([])
	const [metaboliteData, setMetaboliteData] = useState([])
	const [superpathwayData, setSuperpathwayData] = useState([])

    const element = 'pathway';

    const gene_columns = [
		common_cols['gene_id_from_list'],
		common_cols['gene_name_from_list']
        // common_cols['gene_id'],
		// common_cols['gene_name'],
	]
    const metabolite_columns = [
		common_cols['metabolite_id_from_list'],
		common_cols['metabolite_id_source_from_list'],
		common_cols['metabolite_name_from_list']
        // common_cols['metabolite_id'],
        // common_cols['metabolite_name']
    ]

    const fetchData = async () => {
		const data = await restApiCall(element+'/'+pathway);
		console.log(data);
		setElementData(data);
		if (data.genes) {
			setGeneData(data.genes)
		}
		if (data.metabolites) {
			setMetaboliteData(data.metabolites)
		}
		if (data.superpathways) {
			setSuperpathwayData(data.superpathways)
		}
	}

    useEffect(() => {
		fetchData();
	},[])

    return (
		<div>
			{ elementData ?
				<>
					{op_title('pathway', elementData, pathway)}
					<ul className='key_val_line'>
					{
						elementData.external_id_source=='Reactome' && elementData.name ? <li key="reactome_id"><span className='line_key'>Reactome ID</span><Href href={process.env.URL_REACTOME_ENTRY+elementData.external_id} text={elementData.external_id}/></li> : ''
					}
					{
						elementData.synonyms ? <li key="reactome_syn"><span className='line_key'>Synonym{elementData.synonyms.length > 1 ? 's' : ''}</span>{elementData.synonyms.map((synonym, index) => <span key={synonym.name}>{index ? ', ' : ''}{synonym.name}</span>)}</li> : ''
					}
					{
						superpathwayData.length ? <li key="reactome_top_level"><span className='line_key'>Top Level Pathway{superpathwayData.length > 1 ? 's' : ''}</span>{superpathwayData.map((pathway, index) => <span>{index ? ', ' : ''}{pathway.name} (<Href key={pathway.external_id} href={process.env.URL_REACTOME_ENTRY+pathway.external_id} text={pathway.external_id}/>)</span>)}</li> : ''
					}
					</ul>
					<div className="mt-3 sm:mt-0 sm:ml-3">
						<a className="btn btn-primary shadow" href={"/test/reactome/"+elementData.external_id} role="button"><Diagram3 className='me-2' size="16"/>Reactome Diagram</a>
					</div>
					{
						geneData.length ? <div className="mt-4">{op_subtitle('gene')}<DataTable key="gene" data={geneData} columns={gene_columns}/></div> : ''
					}
					{
						metaboliteData.length ? <div className="mt-4">{op_subtitle('metabolite')}<DataTable key="metabolite" data={metaboliteData} columns={metabolite_columns}/></div> : ''
					}
				</>
				: <div>Loading data ...</div> 
			}
		</div>
	);
}
export default Pathway