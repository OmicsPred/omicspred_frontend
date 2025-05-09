import { ArrowRight, Hexagon } from 'react-bootstrap-icons';
import { PageTitleSimple } from '../../components/Common';
import Href from '../../components/Href';
import Container from "./components/Container";

const project_name = process.env.PROJECT_NAME;

const all_mt = <Hexagon className='color_hl element_icon_close' title='All'/>;
const gene = <Hexagon className='color_gene element_icon_close' title='Gene'/>;
const transcript = <Hexagon className='color_transcript element_icon_close'title='Transcript'/>;
const protein = <Hexagon className='color_protein element_icon_close' title="Protein"/>;
const metabolite = <Hexagon className='color_metabolite element_icon_close'/>;

const documentation_op = {
    'Publication': {
        'label': 'publication',
        'desc': 'For each publication the following information is extracted and stored:',
        'struct': [
            {'name': project_name+' Publication ID (OPP)', 'desc': 'Unique identifier created for the publication entries in '+project_name+'.'},
            {'name': 'PubMed ID (PMID)', 'desc': 'PubMed Identification number.'},
            {'name': 'Digital Object Identifier (doi)', 'desc': 'The doi of the publication.'},
            {'name': 'Title', 'desc': 'Title of the publication.'},
            {'name': 'Author(s)', 'desc': 'List of publication authors, the first author is also extracted for a shorter display.'},
            {'name': 'Journal', 'desc': 'The name of the publication source.'},
            {'name': 'Publication Date', 'desc': 'Date of publication (with respect to the PMID or doi).'}
        ]
    },
    'Platform':{
        'label': 'platform',
        'desc': 'Omics platform used to analyse the samples',
        'struct': [
            {'name': 'Platform name', 'desc': 'Name of the platform.'},
            {'name': 'Platform full name', 'desc': 'Full name of the platform.'},
            {'name': 'Technic', 'desc': 'Short description of the technic used on the platform.'},
            {'name': 'Type', 'desc': 'Omics type detected by the platform.'},
            {'name': 'Version', 'desc': 'Platform version (if available).'}
        ]
    },
    'Cohort': {
        'label': 'cohort',
        'desc': 'Cohorts used in the to build the samples',
        'struct': [
            {'name': 'Cohort name', 'desc': 'Cohort short name.'},
            {'name': 'Cohort full name', 'desc': 'Full name of the cohort.'},
            {'name': 'URL', 'desc': 'Link to the cohort/study website.'}
        ]
    },
    'Sample': {
        'label': 'sample',
        'desc': 'Information describing the samples used to train and validate each Genetic Score.',
        'struct': [
            {'name': 'Sample Number', 'desc': 'Number of individuals included in the sample.'},
            {'name': 'Sample Cases', 'desc': 'Number of individual cases in the sample.'},
            {'name': 'Sample Controls', 'desc': 'Number of individual controls in the sample.'},
            {'name': 'Sample Male Percent', 'desc': 'Percentage of male individuals in the sample'},
            // {'name': 'Age of Study Participants', 'desc': 'A summary (mean/median, range/confidence intervals) of study participants ages.'},
            {'name': 'Broad Ancestry Category', 'desc': <>Author reported ancestry is mapped to the best matching ancestry category from the NHGRI-EBI GWAS Catalog framework (<Href href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5815218/table/Tab1/?report=objectonly' text='Table 1, Morales et al. (2018)'/>).</>},
            {'name': 'Cohort(s)', 'desc': 'List of Cohorts used to create the Sample.'},
        ]
    },
    'Genetic Score': {
        'label': 'score',
        'desc': 'Each Genetic Score in the database is given a unique '+project_name+' ID to identify it. The following information is extracted, and associated with each Genetic Score in '+project_name+':',
        'struct': [
            {'name': project_name+' ID', 'desc': 'Unique identifier created for the genetic score in '+project_name+'.'},
            {'name': project_name+' name', 'desc': 'Name used by the author to refer to the genetic score before an '+project_name+' identifier has been assigned.'},
            {'name': 'Reported Molecular Trait', 'desc': 'Molecular trait (Gene, Protein, Metabolite, ...) identifier and/or name as reported by the author.'},
            {'name': 'Original Genome Build', 'desc': 'The version of the genome that the variants present in the Genetic Score are associated with.'},
            {'name': 'Number of Variants', 'desc': 'Number of variants used to calculate the PGS. In the future this will include a more detailed description of the types of variants present.'},
            {'name': 'Genetic Score Development Method', 'desc': 'The name or description of the method or computational algorithm used to develop the Genetic Score.'},
            // {'name': 'Genetic Score Development Details/Relevant Parameters', 'desc': 'A description of the relevant inputs and parameters relevant to the Genetic Score development method/process.'},
            // {'name': 'Species', 'desc': 'Species targeted in this Genetic Score'},
            {'name': 'Molecular Traits',  'desc': <>Molecular Traits linked to the Genetic Score: <span className='fw-bold'>Gene</span>, <span className='fw-bold'>Transcript</span>, <span className='fw-bold'>Protein</span>, <span className='fw-bold'>Metabolite</span>.</>},
            {'name': 'Ancestry distribution', 'desc': 'Distribution of the ancestries in the training and validation of the Genetic Score.'},
            {'name': 'License/Terms of Use', 'desc': 'License/Terms of Use that applies to the Genetic Score.'}
        ]
    },
    'Dataset': {
        'label': 'dataset',
        'desc': 'A dataset in '+project_name+' helps to separate different groups of data within a same study (e.g. use of different versions of a same platform, or different samples).',
        'struct': [
            {'name': project_name+' Dataset ID (OPD)', 'desc': 'Unique identifier created for the dataset entries in '+project_name+'.'},
            {'name': 'Dataset Name', 'desc': 'Name of the dataset (if available).'},
            {'name': 'Publication', 'desc': 'Associated Publication.'},
            {'name': 'Platform', 'desc': 'Associated Platform.'},
            {'name': 'Omics Type', 'desc': 'Data type detected by the platform (e.g. gene, protein, metabolite).'},
            {'name': 'Genetic Score Count', 'desc': 'Number of Genetic Scores associated with the dataset'},
            {'name': 'Tissue', 'desc': 'Biological tissue collected to be analyzed on the platform'},
            {'name': 'Training Sample(s)', 'desc': 'Set of Samples used to create and train the Genetic Scores in the dataset'},
            {'name': 'Validation Sample(s)', 'desc': 'Set of Samples used to validate the Genetic Scores in the dataset'},
            // {'name': 'Species', 'desc': 'Species targeted in this study'},
            {'name': 'Data files URLs', 'desc': 'JSON structure listing the URLs of the different types of datafiles available for download.'}
        ]
    },
    'Performance Metrics': {
        'label': 'perf',
        'desc': 'Each evaluation of a Genetic Score is stored as Performance Metric, with information about the linked Genetic Score and Sample information',
        'struct': [
            {'name': 'Genetic Score', 'desc': 'Associated Genetic Score'},
            {'name': 'Dataset', 'desc': 'Associated Dataset (includes Publication, Platform and Tissue'},
            {'name': 'Sample', 'desc': 'Associated Sample'},
            {'name': 'Cohort label', 'desc': 'Shortcut to retrieve the cohort short name/label'},
            {'name': 'Metric value', 'desc':
                <div>
                    <div className='mb-2'>A list of metrics used to evaluate the performance of the Genetic Score within a Sample/Cohort</div>
                    <ul className='mb-0'>
                        <li key="name"><span className='fw-bold'>Name</span>: Name of the metric method (e.g. Proportion of the variance explained).</li>
                        <li key="name_short"><span className='fw-bold'>Name short</span>: Shorter name of the metric method (e.g. R<sup>2</sup>).</li>
                        <li key="type"><span className='fw-bold'>Type</span>: Type of metric (e.g. Pearson's correlation).</li>
                        <li key="estimate"><span className='fw-bold'>Estimate value</span>: Metric estimate value.</li>
                        <li key="p-value"><span className='fw-bold'>P-value</span>: P-value associated with the Metric.</li>
                    </ul>
                </div>
            }
        ]
    },
    'Pathway': {
        'label': 'pathway',
        'desc': <>
                    <p>The Pathways come from <Href text="Reactome" href="https://reactome.org/"/> and the mapping pathways-genes and pathways-metabolites have be done using the mappings files from the <Href href='https://reactome.org/download-data' text={<>Reactome "Identifier mapping files <ArrowRight /> Lowest level pathway diagram"</>}/>.</p>
                    <span>From the file category "Lowest level pathway diagram" we used:</span>
                    <ul>
                        <li>The <Href text="ENSEMBL to pathways" href="https://reactome.org/download/current/Ensembl2Reactome.txt"/> file to map the genes (Ensembl2Reactome.txt), and to map the proteins by extension.</li>
                        <li>The <Href text="ChEBI to pathways" href="https://reactome.org/download/current/ChEBI2Reactome.txt"/> file to map the metabolites (ChEBI2Reactome.txt).</li>
                    </ul>
                </>,
        'struct': [
            {'name': 'Name', 'desc': 'Name of the Pathway'},
            {'name': 'External Identifier', 'desc': 'Pathway external identifier (e.g. R-HSA-156582 from Reactome)'},
            {'name': 'External Source', 'desc': 'Pathway external source (e.g. Reactome)'},
            {'name': 'Super Pathways', 'desc': 'List of parent Pathways'}
        ]
    },
    'Molecular Trait': {
        'label': 'molecular_trait',
        'desc': <>
                    <div>It describes the different Molecular Traits (e.g. Gene, Transcript, Protein and Metabolite).</div>
                    <div>The data structure <span className='fw-bold'>common to all</span> Molecular Traits are labelled with the icon<span className='ms-1'>{all_mt}</span>.</div>
                    <div>The specific structures of each Molecular Trait are labelled with the corresponding icons:</div>
                    <div>
                        <span className='me-1'>{gene}</span><span className='fw-bold'>Gene</span>
                        <span className='ms-2 me-1'>{transcript}</span><span className='fw-bold'>Transcript</span>
                        <span className='ms-2 me-1'>{protein}</span><span className='fw-bold'>Protein</span>
                        <span className='ms-2 me-1'>{metabolite}</span><span className='fw-bold'>Metabolite</span>
                    </div>
                </>,
        'struct': [
            {'name': <div className='d-flex justify-content-between'><span>Name</span><span>{all_mt}</span></div>, 'desc': 'Name of the Molecular Trait.'},
            {'name': <div className='d-flex justify-content-between'><span>External Identifier</span><span>{all_mt}</span></div>, 'desc': 'Molecular Trait external identifier (e.g. P16581 from UniProt).'},
            {'name': <div className='d-flex justify-content-between'><span>External Source</span><span>{all_mt}</span></div>, 'desc': 'Molecular Trait external source (e.g. Ensembl, UniProt, ChEBI).'},
            {'name': <div className='d-flex justify-content-between'><span>Synonyms</span><span>{all_mt}</span></div>, 'desc': 'List of Molecular Trait synonyms.'},
            {'name': <div className='d-flex justify-content-between'><span>External References</span><span>{all_mt}</span></div>, 'desc': 'List of Molecular Trait external references.'},
            {'name': <div className='d-flex justify-content-between'><span>Biotype</span><span><span className='ms-2'>{gene}</span><span className='ms-1'>{transcript}</span></span></div>, 'desc': 'Molecular trait biotype.'},
            {'name': <div className='d-flex justify-content-between'><span>Retired gene model</span><span className='ms-2'>{gene}</span></div>, 'desc': 'Indicate if the Molecular Trait entry has been retired/removed for the external source.'},
            {'name': <div className='d-flex justify-content-between'><span>Gene</span><span className='ms-2'>{protein}</span></div>, 'desc': 'Associated Gene.'},
            {'name': <div className='d-flex justify-content-between'><span>Pathways</span><span><span className='ms-2'>{gene}</span><span className='ms-1'>{protein}</span><span className='ms-1'>{metabolite}</span></span></div>, 'desc': 'Associated Pathways.'},
        ]
    },
    'Tissue': {
        'label': 'tissue',
        'desc': 'Tissue entries are mapped to ontologies in order to facilitate the tissue comparaison, grouping and filtering.',
        'struct': [
            {'name': 'Identifier', 'desc': 'External identifier from an ontology (e.g. Uberon)'},
            {'name': 'Label', 'desc': 'Tissue short name/label'},
            {'name': 'Description', 'desc': 'Detailed description of the Tissue'},
            {'name': 'URL', 'desc': 'External URL to the ontology entry'}
        ]
    },
    'Phenotype [Applications]': {
        'label': 'phenotype',
        'desc': 'Phenotypes used in the Applications part of '+project_name+', i.e. Phenome-wide association analysis (PheWAS). All the phenotypes are associated to an ontology to facilitate grouping and comparability.',
        'struct': [
            {'name': 'Identifier', 'desc': 'External identifier of the Phenotype.'},
            {'name': 'Name', 'desc': 'Phenotype name/label.'},
            {'name': 'Category', 'desc': 'Phenotype category.'},
            {'name': 'Source', 'desc': 'External source of the Phenotype (e.g. PheCode).'},
            {'name': 'Child phenotype(s)', 'desc': 'Children entries of the Phenotype from the ontology.'}
        ]
    },
    'Genetic Score [Applications]': {
        'label': 'score_app',
        'desc': 'This data structure is similar to the `Genetic Score` but for the Applications part of '+project_name+', i.e. Phenome-wide association analysis (PheWAS).',
        'struct': [
            {'name': project_name+' ID', 'desc': project_name+' Score Identifier.'},
            {'name': 'Phenotype', 'desc': 'Associated Phenotype.'},
            {'name': 'Publication', 'desc': 'Associated Publication.'},
            {'name': 'Platform', 'desc': 'Associated Platform.'},
            {'name': 'Sample', 'desc': 'Associated Sample (control/cases, percentage female participants).'},
            {'name': 'Cohort', 'desc': 'Cohort use to evaluate the Score/Phenotype association.'},
            {'name': 'Molecular Traits', 'desc': 'List of linked Molecular Traits (genes, transcripts, protein, metabolites) - simplifed structure with only `External ID` and `name`.'},
            // {'name': <>R<sup>2</sup></>, 'desc': 'Proportion of the variance explained.'},
            {'name': 'HR', 'desc': 'Hazard Ratio with confidence interval.'},
            {'name': 'FDR', 'desc': 'False Discovery Rate-adjusted P-value (<0.5).'},

        ]
    }
}

// const documentation_app = {
//     'Phenotype': {
//         'label': 'phenotype',
//         'desc': '',
//         'struct': [
//         ]
//     },
//     'Score Application (Phenotype)': {
//         'label': 'score_app',
//         'desc': '',
//         'struct': [
//         ]
//     },
// }

const data_prefix = "struct_";

const max_per_col = Math.round(Object.keys(documentation_op).length/2);

const items = Object.keys(documentation_op); // Will be used as "items_right"
const items_left = items.splice(0,max_per_col);

function Documentation() {
    return (
      <>
        <PageTitleSimple title='Data Description'/>
        <div>
            <p>
                This page contains information regarding the contents of {project_name} and the data structure of its main components.
            </p>
        </div>
        <div className='d-flex mb-5'>
            <div className="card p-0">
                <div className="card-header"><h6 className="mb-0">List of data structures</h6></div>
                <div className="card-body p-2">
                    <div className='d-flex'>
                        {/* First half */}
                        <ul className='mb-0'>
                            {
                                items_left.map((model_name) => <li key={"item_"+documentation_op[model_name].label}><Href href={'#'+data_prefix+documentation_op[model_name].label} text={model_name}/></li>)
                            }
                        </ul>
                        {/* Second half */}
                        <ul className='mb-0 ms-2'>
                            {
                                items.map((model_name) => <li key={"item_"+documentation_op[model_name].label}><Href href={'#'+data_prefix+documentation_op[model_name].label} text={model_name}/></li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        {
          Object.keys(documentation_op).map((model_name) => <Container key={data_prefix+documentation_op[model_name].label} title={model_name} content={documentation_op[model_name]} prefix={data_prefix}/>)
        }
      </>
    );
};

export default Documentation;