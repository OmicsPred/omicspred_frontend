import { useState, useEffect } from 'react';
import FormLabel from '@mui/material/FormLabel';
import { Sliders } from 'react-bootstrap-icons';
import restApiCall from '../../../components/RestAPI';
// import DataTableFromRestApi from '../../../components/table/DataTableFromRestApi';
import DataTableServer from '../../../components/table/DataTableServer';
import { datasets_browse_columns } from '../../../components/table/columns/datasets';
import { fetch_count_data, browse_title } from '../components/Browse';
import { Note, ToggleCard, consoleDev, sort_case_insensitive } from '../../../components/Generic';
import { ancestry_labels, stages_list } from '../../../components/Common';
import AncestryLegend from '../../../components/ancestry/AncestryLegend';
import { select_form, select_form_no_empty_value } from '../../../components/Form';


function Datasets() {
    const data_type = 'dataset';
    const url_suffix = data_type+'/all?website=1';

    const [datasetsCount, setDatasetsCount] = useState()
    const [publications, setPublications] = useState({});
    const [platforms, setPlatforms] = useState([]);
	const [omicsTypes, setOmicsTypes] = useState([]);
    const [tissues, setTissues] = useState({});
    const [tissuesLabels, setTissuesLabels] = useState([]);
    const [selectedAncestry, setSelectedAncestry] = useState('');
	const [selectedStage, setSelectedStage] = useState('a');
    const [selectedPublication, setSelectedPublication] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('');
	const [selectedOmicsType, setSelectedOmicsType] = useState('');
    const [selectedTissue, setSelectedTissue] = useState('')
    const [datasetsEndpoint, setDatasetsEndpoint] = useState(url_suffix);

    const ancestry_labels_data = ancestry_labels();

    const fetchCount = async () => {
        const data_count = await fetch_count_data(data_type+'s');
        setDatasetsCount(data_count);
    }

    const fetchPublications = async () => {
        const publications = await restApiCall('publication/all');
        if (publications.results) {
            let publications_data = {};
            for (let i=0; i<publications.results.length; i++) {
                const publication = publications.results[i];
                publications_data[publication.id] = publication.id+' - '+publication.firstauthor;
            }
            setPublications(publications_data);
        }
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

        // Ancestry
        if (selectedAncestry && selectedAncestry.length > 0) {
            filters_list.push(`anc:${selectedAncestry}`);
            const default_stage = 'a';
            if (selectedStage && selectedStage != default_stage) {
				filters_list.push(`stage:${selectedStage}`);
			}
			else {
                filters_list.push(`stage:${default_stage}`)
            }
        }
        if (selectedPublication && selectedPublication.length > 0) {
            filters_list.push(`publication:${selectedPublication}`)
        }
		if (selectedPlatform && selectedPlatform.length > 0) {
            filters_list.push(`platform:${selectedPlatform}`)
        }
        if (selectedOmicsType && selectedOmicsType.length > 0) {
            filters_list.push(`omics_type:${selectedOmicsType}`)
        }
        if (selectedTissue && selectedTissue.length > 0) {
            filters_list.push(`tissue:${selectedTissue}`)
        }
        if (filters_list.length > 0) {
            endpoint_suffix += (!endpoint_suffix.includes('?')) ? '?' : '&';
            endpoint_suffix += 'table_filter='+filters_list.join(';')
        }
        consoleDev("NEW URL: "+endpoint_suffix);
        return endpoint_suffix;
    }

    const updateDatasetsEndpoint = () => {
        setDatasetsEndpoint(get_url_endpoint());
        consoleDev("NEW endpoint: "+datasetsEndpoint);
    }

    const handleAncestryChange = async (event) => {
        setSelectedAncestry(event.target.value);
    }

    const handleStageChange = async (event) => {
        setSelectedStage(event.target.value);
    }

    const handlePublicationChange = async (event) => {
        setSelectedPublication(event.target.value);
    }

    const handlePlatformChange = async (event) => {
        setSelectedPlatform(event.target.value);
    }

    const handleOmicsTypeChange = async (event) => {
        setSelectedOmicsType(event.target.value);
    }

    const handleTissueChange = async (event) => {
        setSelectedTissue(event.target.value);
    }

    useEffect(() => {
        fetchCount();
		fetchPlatforms();
        fetchPublications();
        fetchTissues();
	},[])

    useEffect(() => {
        updateDatasetsEndpoint();
    },[selectedAncestry, selectedStage, selectedPublication, selectedPlatform, selectedOmicsType, selectedTissue])

    return (
        <div>
            { browse_title(datasetsCount,'hl','Datasets',data_type+'s') }
            <div className="mt_minus_1">
                Browse all the Datasets available in {process.env.PROJECT_NAME}.
                <div className='d-flex mt-2'>
                    <Note compact="1" msg={"In "+process.env.PROJECT_NAME+", a dataset is a set of genetic scores, within a same study, that have a common platform and tissue. In most cases, the genetic scores share the same ancestries."}/>
                </div>
                {/* <div>In {process.env.PROJECT_NAME}, a dataset is a set of genetic scores, within a same study, that have a common platform and tissue. In most cases, the genetic scores have the same ancestry.</div> */}
            </div>
            <div className='cards_filter_container_cols_3 mt-3 mb-3'>
                {/* Filter Form */}
                <div>
                    { platforms  && publications && tissues && omicsTypes ?
                        <div className="card p-0 me-3">
                            {/* <div className="card-header"><h6 className="mb-0">Ancestry filter</h6></div> */}
                            <ToggleCard title={<><Sliders className='me-2 mt_minus_1px'/><span className='mt-1'>Datasets filter</span></>} id='filter_div' type='button_blue' open='1'/>
                            <div className="card-body d-table-cell p-2" id='filter_div'>
                                <div className="card-text">
                                    <div className='op_filter_container_3'>
                                        <div className='compact_form'>
                                            <div>
                                                {/* Ancestry */}
                                                <div>
                                                    <FormLabel id="anc_label" className='op_form_label'>Ancestry filter</FormLabel>
                                                </div>
                                                {select_form('Ancestry',selectedAncestry,ancestry_labels_data,handleAncestryChange)}
                                                {select_form_no_empty_value('Stage',selectedStage,stages_list,handleStageChange)}
                                                <div className="op_form_h_sep"></div>
                                                {/* Tissue */}
                                                {select_form('Tissue',selectedTissue,tissuesLabels,handleTissueChange,tissues)}
                                            </div>
                                        </div>
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
                                    </div>
                                </div>
                            </div>
                        </div> : ''
                    }
                </div>
                <div>
                    <div>
                        <AncestryLegend />
                    </div>
                </div>
            </div>
            <div>
                { datasetsEndpoint && datasetsEndpoint.length > 0 ?
                    <DataTableServer key={datasetsEndpoint} url_suffix={datasetsEndpoint} columns={datasets_browse_columns} nosearchbar='1'/>
                :''}
            </div>
        </div>
    );
}

export default Datasets