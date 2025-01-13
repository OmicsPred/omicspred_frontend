
import Href from "../../../components/Href";
import { Note } from "../../../components/Generic";
import { ArrowRight } from "react-bootstrap-icons";


const SearchDocs = () => {
    const project_name = process.env.PROJECT_NAME;

    const parse_list = (entry_list) => {
        return (
            <small>
                <span className="op_color_2 px-1">[</span>
                { entry_list.map((entry, index) => <span key={entry}>{ index != 0 ? <span className="op_color_2 px-1">/</span> : ''}{entry}</span>)} 
                <span className="op_color_2 ps-1">]</span>
            </small>
        ) 
    }

    const seach_example = (query, type) => {
        return <><ArrowRight className="me-2"/><Href href={'/search?q='+query} text={query}/>{type ? <small className="ms-2">({type})</small>:''}</>
    } 

    return (
        <>
            <p>
                The website search uses <Href href='https://www.elastic.co/elasticsearch' text='ElasticSearch'/> (v.7.17) to index and search {project_name} metadata.
            </p>    
            The different metadata indexed are:
            <ul>
                <li key="scores">Genomic Scores</li>
                <li key="traits">Molecular traits (Gene, Protein, Metabolite)</li>
                <li key="pathways">Pathways</li>
                <li key="phenotypes">Phenotypes</li>
            </ul>
            <div className='d-flex mt-3 mb-4'>
                <Note msg={<>The results are limited to the <span className="fw-bold">25</span> best hits.</>}/>
            </div>
            <p>
                Here are the attributes you can search for each element:
            </p>
            <table className="table table_doc my-2">
                <thead>
                    <tr>
                        <th style={{minWidth:"200px"}}>Element</th>
                        <th>Searchable attributes</th>
                        <th>Examples</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="fw-bold">Genomic Scores</td>
                        <td>
                            <ul className="ps-4 mb-0">
                                <li>{project_name} Score ID</li>
                                <li>Score name</li>
                                <li>Associated Genes {parse_list(['name','ID','synonyms','description'])}</li>
                                <li>Associated Proteins {parse_list(['name','ID','synonyms','description(s)'])}</li>
                                <li>Associated Metabolites {parse_list(['name','ID','synonyms','description'])}</li>
                            </ul>
                        </td>
                        <td>
                            <ul className="example_list">
                                <li>{seach_example('OPGS000002')}</li>
                                <li>{seach_example('MST1.4407.10.1')}</li>
                                <li>{seach_example('COL1A1','name')}</li>
                                <li>{seach_example('Visceral adipose-specific serpin', 'synonym')}</li>
                                <li>{seach_example('N-acetyltyrosine', 'name')}</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td><div className="fw-bold">Molecular traits</div><small>(Gene, Protein, Metabolite)</small></td>
                        <td>
                            <ul className="ps-4 mb-0">
                                <li>Name</li>
                                <li>External ID (e.g. UniProt ID)</li>
                                <li>Synonyms</li>
                                <li>Description(s)</li>
                            </ul>
                        </td>
                        <td>
                            <ul className="example_list">
                                <li>{seach_example('E-selectin')}</li>
                                <li>{seach_example('P16581')}</li>
                                <li>{seach_example('CD62 antigen-like family member E')}</li>
                                <li>{seach_example('Cell-surface glycoprotein having a role in immunoadhesion.')}</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Pathways</td>
                        <td>
                            <ul className="ps-4 mb-0">
                                <li>Pathway ID (e.g. Reactome ID)</li>
                                <li>Name</li>
                                <li>Associated Genes {parse_list(['name','ID','synonyms','description'])}</li>
                                <li>Associated Proteins {parse_list(['name','ID','synonyms','description(s)'])}</li>
                                <li>Associated Metabolites {parse_list(['name','ID','synonyms','description'])}</li>
                            </ul>
                        </td>
                        <td>
                            <ul className="example_list">
                                <li>{seach_example('R-HSA-1369062')}</li>
                                <li>{seach_example('Activation of Matrix Metalloproteinases')}</li>
                                <li>{seach_example('ENSG00000034693', 'ID')}</li>
                                <li>{seach_example('ATP-binding cassette sub-family A member 2', 'name')}</li>
                                <li>{seach_example('p-Xanthine', 'synonym')}</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Phenotypes</td>
                        <td>
                            <ul className="ps-4 mb-0">
                                <li>Phenotype ID (e.g. PheCode ID)</li>
                                <li>Name</li>
                                <li>Category</li>
                                <li>Associated {project_name} Score ID(s)</li>
                            </ul>
                        </td>
                        <td>
                            <ul className="example_list">
                                <li>{seach_example('250.2')}</li>
                                <li>{seach_example('Type 2 diabetes')}</li>
                                <li>{seach_example('endocrine/metabolic')}</li>
                                <li>{seach_example('OPGS001665')}</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )

}
export default SearchDocs;
