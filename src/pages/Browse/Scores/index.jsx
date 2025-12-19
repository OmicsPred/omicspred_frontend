import { useState, useEffect } from 'react';
import { Sliders } from 'react-bootstrap-icons';
import FormLabel from '@mui/material/FormLabel';

import { scores_columns } from '../../../components/table/columns/scores';
import { common_column_groups } from '../../../components/table/columns/common';
import DataTableServer from '../../../components/table/DataTableServer';
import { fetch_count_data, browse_title } from '../components/Browse';
import restApiCall from '../../../components/RestAPI';
import { ToggleCard, sort_case_insensitive } from '../../../components/Generic';
import { select_form, input_form, radio_form } from '../../../components/Form';
import { molecular_trait_types } from '../../../components/Common';


function Scores() {
    const [scoresCount, setScoresCount] = useState();
    const [platforms, setPlatforms] = useState([]);
    const [omicsTypes, setOmicsTypes] = useState([]);
    const [publications, setPublications] = useState({});
    const [tissues, setTissues] = useState({});
    const [tissuesLabels, setTissuesLabels] = useState([]);
    const [IDInput, setIDInput] = useState('');
    const [molecularTrait, setMolecularTrait] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedOmicsType, setSelectedOmicsType] = useState('');
    const [selectedPublication, setSelectedPublication] = useState('');
    const [selectedTissue, setSelectedTissue] = useState('')
    const [selectedMolecularTraitType, setSelectedMolecularTraitType] = useState('Gene');

    const data_type = 'score';

    const url_suffix = data_type+'/all';
    const [scoreEndpoint, setScoreEndpoint] = useState(url_suffix);

    const fetchCount = async () => {
        const data_count = await fetch_count_data(data_type+'s');
        setScoresCount(data_count);
        updateScoreEndpoint();
    }

    const fetchPlatforms = async () => {
        const platforms = await restApiCall('platform/all');
        if (platforms.results) {
            let platforms_data = {};
            let omics_types_list = [];
            for (let i=0; i<platforms.results.length; i++) {
                const platform_item = platforms.results[i];
                const platform_type = platform_item.type;
                platforms_data[platform_item.name] = platform_type;
                if (!omics_types_list.includes(platform_type)) {
                    omics_types_list.push(platform_type);
                }
            }
            setPlatforms(platforms_data);
            setOmicsTypes(omics_types_list.sort());
        }
    }

    const fetchPublications = async () => {
        const publications = await restApiCall('publication/all');
        if (publications.results) {
            let publications_data = {};
            for (let i=0; i<publications.results.length; i++) {
                const publication = publications.results[i];
                publications_data[publication.id] = publication.id+' - '+publication.firstauthor
            }
            setPublications(publications_data);
        }
    }


    const fetchTissues = async () => {
        const tissues = await restApiCall('tissue/all');
        if (tissues.results) {
            let tissue_data = {};
            for (let i=0; i<tissues.results.length; i++) {
                const tissue = tissues.results[i];
                tissue_data[tissue.label] = tissue.id;
            }
            const tissue_label = Object.keys(tissue_data);
            setTissues(tissue_data);
            const sorted_labels = sort_case_insensitive(tissue_label)
            setTissuesLabels(sorted_labels);
        }
    }

    const get_url_endpoint = () => {
        let endpoint_suffix = url_suffix;
        let filters_list = []

        if (IDInput && IDInput.length > 0) {
            filters_list.push(`score_id:${IDInput}`)
        }
        if (molecularTrait && molecularTrait.length > 0) {
            filters_list.push(`mt_id:${molecularTrait}`)
            filters_list.push(`mt_type:${selectedMolecularTraitType}`)
        }
        if (selectedPlatform && selectedPlatform.length > 0) {
            filters_list.push(`platform:${selectedPlatform}`)
        }
        if (selectedOmicsType && selectedOmicsType.length > 0) {
            filters_list.push(`omics_type:${selectedOmicsType}`)
        }
        if (selectedPublication && selectedPublication.length > 0) {
            filters_list.push(`publication:${selectedPublication}`)
        }
        if (selectedTissue && selectedTissue.length > 0) {
            filters_list.push(`tissue:${selectedTissue}`)
        }
        if (filters_list.length > 0) {
            endpoint_suffix += '?table_filter='+filters_list.join(';')
        }
        console.log("NEW URL: "+endpoint_suffix);
        return endpoint_suffix;
    }

    const updateScoreEndpoint = () => {
        setScoreEndpoint(get_url_endpoint());
    }

    const handleIDInput = async (event) => {
        setIDInput(event.target.value.trim());
    }

    const handlePlatformChange = async (event) => {
        setSelectedPlatform(event.target.value);
    }

    const handleOmicsTypeChange = async (event) => {
        setSelectedOmicsType(event.target.value);
    }

    const handlePublicationChange = async (event) => {
        setSelectedPublication(event.target.value);
    }

    const handleTissueChange = async (event) => {
        setSelectedTissue(event.target.value);
    }

    const handleMolecularTraitTypeChange = async (event) => {
        setSelectedMolecularTraitType(event.target.value);
    }

    const handleMolecularTraitInput = async (event) => {
        setMolecularTrait(event.target.value.trim());
        // if (event.target.value.length > 2) { // OPGSXXXXXX
        //     console.log("MT INPUT: "+event.target.value);
        // }
        // else {
        //      console.log("MT INPUT: too short!");
        // }
    }

    useEffect(() => {
        fetchCount();
        fetchPlatforms();
        fetchPublications();
        fetchTissues();
    },[])

    useEffect(() => {
        updateScoreEndpoint();
    },[IDInput, molecularTrait, selectedPlatform, selectedOmicsType, selectedPublication, selectedTissue, selectedMolecularTraitType]);

    return (
        <>
            { browse_title(scoresCount,data_type,'Genetic Scores','Genetic Scores') }
            <div className="mt_minus_1">
                Browse all the Genetic Scores available in {process.env.PROJECT_NAME}.
            </div>
            <div className="mt-4">
                {/* Filter Form */}
                { platforms && omicsTypes && publications && tissues ?
                    <div className='d-flex mb-2'>
                        <div className="card p-0 me-3">
                            <ToggleCard title={<><Sliders className='me-2 mt_minus_1px'/><span>Scores filter</span></>} id='filter_div' type='button_blue' open='1'/>
                            <div className="card-body d-table-cell p-2" id='filter_div'>
                                <div className="card-text">
                                    <div className='op_filter_container_3'>
                                        <div className='compact_form'>
                                            <div>
                                                <FormLabel id="study_label" className='op_form_label'>Study type</FormLabel>
                                            </div>
                                            {/* Publication */}
                                            {select_form('Publication',selectedPublication,publications,handlePublicationChange)}
                                            {/* Platform */}
                                            {select_form('Platform',selectedPlatform,platforms,handlePlatformChange)}
                                            {/* Omics Type */}
                                            {select_form('Omics Type',selectedOmicsType,omicsTypes,handleOmicsTypeChange)}
                                        </div>
                                        <div className='compact_form'>
                                            <div>
                                                <FormLabel id="metadata_label" className='op_form_label'>Tissue/Score</FormLabel>
                                            </div>
                                            {/* Tissue */}
                                            {select_form('Tissue',selectedTissue,tissuesLabels,handleTissueChange,tissues)}
                                            {/* OmicsPred ID */}
                                            {input_form('OmicsPred ID','opgs_id',IDInput,handleIDInput)}
                                        </div>
                                        <div className='compact_form'>
                                            {/* Molecular Trait - Type */}
                                            {radio_form('Molecular Trait',selectedMolecularTraitType,molecular_trait_types,handleMolecularTraitTypeChange)}
                                            {/* Molecular Trait */}
                                            <div className='no_mt'>
                                                {input_form('Name / ID','mt_name_id',molecularTrait,handleMolecularTraitInput)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : ''
                }
                <DataTableServer key={scoreEndpoint} url_suffix={scoreEndpoint} columns={scores_columns} groups={[common_column_groups['molecular_trait_id']]} nosearchbar='1'/>
            </div>
        </>
    )
}

export default Scores;