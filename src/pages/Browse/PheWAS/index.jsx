import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import FormLabel from '@mui/material/FormLabel';
import { Sliders, Download } from 'react-bootstrap-icons';
import DataTableServer from '../../../components/table/DataTableServer';
import { phewas_cols } from '../../../components/table/columns/phenotype';
import Href from '../../../components/Href';
import { PageTitle } from '../../../components/Common';
import { ToggleCard, consoleDev } from '../../../components/Generic';
import { fetch_count_data } from '../components/Browse';
import { select_form, input_form, radio_form } from '../../../components/Form';
import restApiCall from '../../../components/RestAPI';
import { molecular_trait_types } from '../../../components/Common';


function PheWAS() {
    const [phenotypeCount, setPhenotypesCount] = useState()
    const [publications, setPublications] = useState({});
    const [IDInput, setIDInput] = useState('');
    const [phenotypeInput, setPhenotypeInput] = useState('');
    const [molecularTraitInput, setMolecularTraitInput] = useState('');
    const [selectedMolecularTraitType, setSelectedMolecularTraitType] = useState('Gene');

    const [selectedPublication, setSelectedPublication] = useState('');

    const [searchParams] = useSearchParams();

    const data_type = 'phewas';

    const url_suffix = 'score/'+data_type+'/all';
    const [scorePheWASEndpoint, setScorePheWASEndpoint] = useState(url_suffix);
    

    const page_label = 'PheWAS Results';

    const fetchCount = async () => {
        const data_count = await fetch_count_data(data_type);
        setPhenotypesCount(data_count);
        const opp_filter = searchParams.get("opp_id");
        if (opp_filter) {
            if (opp_filter.startsWith('OPP')) {
                setSelectedPublication(opp_filter);
                updateScorePheWASEndpoint();
            }
        }
    }

    const fetchPheWASPublications = async () => {
        const publications = await restApiCall('publication/all');
        if (publications.results) {
            let publications_data = {};
            for (let i=0; i<publications.results.length; i++) {
                const publication = publications.results[i];
                if (publication.publication_type.includes('PheWAS')) {
                    publications_data[publication.id] = publication.id+' - '+publication.firstauthor
                }
            }
            setPublications(publications_data);
        }
    }

    const get_url_endpoint = () => {
        let endpoint_suffix = url_suffix;
        let filters_list = []

        if (IDInput && IDInput.length > 0) {
            filters_list.push(`phewas_score_id:${IDInput}`)
        }
        if (phenotypeInput && phenotypeInput.length > 0) {
            filters_list.push(`phenotype:${phenotypeInput}`)
        }
        if (selectedPublication && selectedPublication.length > 0) {
            filters_list.push(`phewas_publication:${selectedPublication}`)
        }
        if (molecularTraitInput && molecularTraitInput.length > 0) {
            filters_list.push(`phewas_mt_id:${molecularTraitInput}`)
            filters_list.push(`phewas_mt_type:${selectedMolecularTraitType}`)
        }
        if (filters_list.length > 0) {
            endpoint_suffix += '?table_filter='+filters_list.join(';')
        }
        consoleDev("NEW URL: "+endpoint_suffix);
        return endpoint_suffix;
    }
    
    const updateScorePheWASEndpoint = () => {
        setScorePheWASEndpoint(get_url_endpoint());
    }

    const handlePublicationChange = async (event) => {
        setSelectedPublication(event.target.value);
    }

    const handleIDInput = async (event) => {
        setIDInput(event.target.value.trim());
    }

    const handlePhenotypeInput = async (event) => {
        setPhenotypeInput(event.target.value.trim());
    }

    const handleMolecularTraitTypeChange = async (event) => {
        setSelectedMolecularTraitType(event.target.value);
    }

    const handleMolecularTraitInput = async (event) => {
        setMolecularTraitInput(event.target.value.trim());
    }

    useEffect(() => {
        fetchCount();
        fetchPheWASPublications();
    },[]);

    useEffect(() => {
        updateScorePheWASEndpoint();
    },[selectedPublication, IDInput, phenotypeInput, molecularTraitInput, selectedMolecularTraitType]);

    return (
        <div>
            <PageTitle type={data_type} category="Results" label='PheWAS' title={page_label} count={phenotypeCount}/>
            <div className="mt_minus_1">
                All the PheWAS results available in {process.env.PROJECT_NAME}.
            </div>
            <div className="mt-4">
                {/* Filter Form */}
                { publications ?
                    <div className='d-flex mb-2'>
                        <div className="card p-0 me-3">
                            <ToggleCard title={<><Sliders className='me-2 mt_minus_1px'/><span>PheWAS filter</span></>} id='filter_div' type='button_blue' open='1'/>
                            <div className="card-body d-table-cell p-2" id='filter_div'>
                                <div className="card-text">
                                    <div className='op_filter_container_3'>
                                        <div className='compact_form'>
                                            <div>
                                                <FormLabel id="study_label" className='op_form_label'>Study</FormLabel>
                                            </div>
                                            {/* Publication */}
                                            {select_form('Publication',selectedPublication,publications,handlePublicationChange)}
                                        </div>
                                        <div className='compact_form'>
                                            <div>
                                                <FormLabel id="phenotype_label" className='op_form_label'>Phenotype</FormLabel>
                                            </div>
                                            {/* Tissue */}
                                            {input_form('Phenotype ID / Name','phenotype',phenotypeInput,handlePhenotypeInput)}                                            {/* OmicsPred ID / Name */}
                                            <div className='mt-2'>
                                                <FormLabel id="score_label" className='op_form_label'>Genetic Score</FormLabel>
                                            </div>
                                            {input_form('OmicsPred ID / Name','opgs_id',IDInput,handleIDInput)}
                                        </div>
                                        <div className='compact_form'>
                                            {/* Molecular Trait - Type */}
                                            {radio_form('Molecular Trait',selectedMolecularTraitType,molecular_trait_types,handleMolecularTraitTypeChange)}
                                            {/* Molecular Trait */}
                                            <div className='no_mt'>
                                                {input_form('ID / Name','mt_name_id',molecularTraitInput,handleMolecularTraitInput)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='ms-2'>
                            <Href role='button' text='Downloads page' href='/downloads#data_files' title='PheWAS data is downloadable by dataset in the Downloads page' icon={<Download/> }/>
                        </div>
                    </div>
                     : ''
                }
            </div>
            <div className="mt-4">
                <DataTableServer key={scorePheWASEndpoint} table_key={data_type+'s'} url_suffix={scorePheWASEndpoint} columns={phewas_cols} hidden_columns={['z-score']} nosearchbar='1'/>
            </div>
        </div>
    );
}

export default PheWAS