import { display_gene_link,display_protein_link,display_metabolite_link } from '../../MolecularTrait/components/links'

const MolecularTraits = (props) =>{
    const genes = props.data.genes;
    const proteins = props.data.proteins;
    const metabolites = props.data.metabolites;

    return (
        <div>
            <div className='font-bold'>Molecular trait(s)</div>
            <ul className="key_val_line mb-1">
                { genes && genes.length > 0 ?
                    <li key="score_genes">
                        {console.log('||| GENES |||')}
                        {console.log(genes)}
                        <span className="line_key">Gene{genes.length > 1 ? 's':''}</span>
                        { genes.map((gene, index) => display_gene_link(gene,index)) }
                    </li> : ''
                }
                { proteins && proteins.length > 0 ?
                    <li key="score_proteins">
                        <span className="line_key">Protein{proteins.length > 1 ? 's':''}</span>
                        { proteins.map((protein, index) => display_protein_link(protein,index)) }
                    </li> : ''
                }
                { metabolites && metabolites.length > 0 ?
                    <li key="score_metabolites">
                        <span className="line_key">Metabolite{metabolites.length > 1 ? 's':''}</span>
                        { metabolites.map((metabolite, index) => display_metabolite_link(metabolite,index)) }
                    </li> : ''
                }
            </ul>
        </div>
    );
};
export default MolecularTraits;