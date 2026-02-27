import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'react-router';
import { ChevronRight, InfoCircleFill, Search as SearchIcon } from 'react-bootstrap-icons';
import Tooltip from "@mui/material/Tooltip";
import DocumentHead from '../../components/DocumentHead';
import restApiCall from '../../components/RestAPI';
import ResultCard from './components/ResultCard';
import { SidePanelFilter } from './components/SidePanelFilter';
import { consoleDev, loading_data, ToggleID } from '../../components/Generic';
import { element_icon } from '../../components/Common';
import Href from '../../components/Href';
import { SearchOptions } from './components/SearchOptions';


function Search() {

    const search_options = { 'pathway': {'type': 'pathway', 'label': 'Exclude pathways', 'value': 0 } }

    // Get search query
    const [searchParams] = useSearchParams();
    const [esResults, setEsResults] = useState([])
    const [esOptions, setEsOptions] = useState([])
    const [resultsReturned, setResultsReturned] = useState(false)
    const [omicsChecked, setOmicsChecked] = useState([]);
    const [platformChecked, setPlatformChecked] = useState([]);
    const [excludePathwaysState, setExcludePathwaysState] = useState(0);
    const [searchOptions, setSearchOptions] = useState([Object.values(search_options)]);
    const [resultTypes, setResultTypes] = useState([]);

    let query = '';
    let exclude_pathways = 0;
    for (const [key, value] of searchParams.entries()) {
        if (key == 'q') {
            if (value) {
                query = value.trim(); // Remove whitespaces
            }
        }
        else if (key == 'exclude_pathways') {
            if (value) {
                exclude_pathways = value.trim(); // Remove whitespaces
            }
        }
    }

    const es_url = process.env.OMICSPRED_ES_URL+'?q='+query;
    const entities = {
        'pathway': 'Pathways',
        'phenotype': 'Phenotypes',
        'tissue': 'Tissues'
    }
    const entity_keys = Object.keys(entities);

    const fetchESResults = async () => {
        let es_url_full = es_url
        if (excludePathwaysState && excludePathwaysState == 1) {
            es_url_full += '&exclude_pathways='+excludePathwaysState;
        }

        const results = await restApiCall(es_url_full);

        // consoleDev(">>> results for "+query+":");
        const results_list = results;

        consoleDev(results_list);
        let omics_counts = {};
        let platform_counts = {};
        let options = [];
        for (let i=0; i < results_list.length; i++) {
            // Omics types
            // /!\ Temporary updates - begin
            if (results_list[i]['_source']['omics_type']) {
                const res_omics = Array.isArray(results_list[i]['_source']['omics_type']) ? results_list[i]['_source']['omics_type'] : [results_list[i]['_source']['omics_type']];
                for (let j=0; j < res_omics.length; j++) {
                    const omic_label = res_omics[j];
                    if (omics_counts[omic_label]) {
                        omics_counts[omic_label] += 1;
                    }
                    else {
                        omics_counts[omic_label] = 1;
                    }
                }
            }
            // /!\ Temporary updates - end
            // if (results_list[i]['_source']['omics_type']) {
            //     const res_omics = results_list[i]['_source']['omics_type'];
            //     for (let j=0; j < res_omics.length; j++) {
            //         const omic_label = res_omics[j];
            //         if (omics_counts[omic_label]) {
            //             omics_counts[omic_label] += 1;
            //         }
            //         else {
            //             omics_counts[omic_label] = 1;
            //         }
            //     }
            // }

            // Platforms
            if (results_list[i]['_source']['platform_name']) {
                const res_platforms = results_list[i]['_source']['platform_name'];
                for (let j=0; j < res_platforms.length; j++) {
                    const platform_label = res_platforms[j];
                    if (platform_counts[platform_label]) {
                        platform_counts[platform_label] += 1;
                    }
                    else {
                        platform_counts[platform_label] = 1;
                    }
                }
            }

            // Others
            for (let j=0; j<entity_keys.length; j++) {
                const entity = entity_keys[j]; // e.g. pathway
                const label = entities[entity]; // e.g. Pathways
                if (results_list[i]['_index']==entity) {
                    if (omics_counts[label]) {
                        omics_counts[label] += 1;
                    }
                    else {
                        omics_counts[label] = 1;
                    }
                    break;
                }
            }
        }
        const omics = Object.keys(omics_counts).sort();
        const platforms = Object.keys(platform_counts).sort();

        setEsResults(results);
        setResultsReturned(true);
        options.push({header:'Group type', type:'omics', list: omics.sort(), counts: omics_counts})
        options.push({header:'Platform', type:'platform', list: platforms.sort(), counts: platform_counts})
        setEsOptions(options);
        // consoleDev(">>> options");
        // consoleDev(options);
        filter_result_types(results);
    }

    // Update the search options
    const setAllSearchOptions = (values) => {
        let updated_options_list = [];
        const options_keys = Object.keys(values);
        for (let i=0; i<options_keys.length;i++) {
            const option_type = options_keys[i];
            const value = values[option_type];
            // Pathway option
            if (option_type == 'pathway') {
                setExcludePathwaysState(value);
            }
            const updated_option = {...search_options[option_type], 'value': value};
            updated_options_list.push(updated_option)
        }
        setSearchOptions(updated_options_list);
    }

    function handleChange(e) {
        // Update search option(s)
        if (e.target.name == 'Exclude pathways') {
            consoleDev(">> handleChange: Exclude pathways");
            const ep_value = (e.target.checked) ? 1 : 0;
            setAllSearchOptions({'pathway': ep_value})
        }
        // Update Group selection
        else if (e.target.name == 'omics') {
            consoleDev(">> handleChange: omics");
            // Add element value to the array
            if (e.target.checked) {
                setOmicsChecked([...omicsChecked, e.target.value]);
            }
            // Remove element value from the array
            else {
                setOmicsChecked(omicsChecked.filter((item) => item !== e.target.value));
            }
        }
        // Update Platform selection
        else if (e.target.name == 'platform') {
            consoleDev(">> handleChange: platform");
            // Add element value to the array
            if (e.target.checked) {
                setPlatformChecked([...platformChecked, e.target.value]);
            }
            // Remove element value from the array
            else {
                setPlatformChecked(platformChecked.filter((item) => item !== e.target.value));
            }
        }
    }


    function isFiltered(result) {
        let filter_count = 0;
        const result_source = result._source;

        // Omics/Types filter
        if (omicsChecked && omicsChecked.length > 0) {
            let omics = []
            // Value copy only
            if (result_source.omics_type) {
                // /!\ Temporary updates - begin
                const omics_types = Array.isArray(result_source.omics_type) ? result_source.omics_type : [result_source.omics_type];
                const omics_copy = omics_types.slice();
                // /!\ Temporary updates - end
                // const omics_copy = result_source.omics_type.slice();
                if (omics_copy) {
                    omics = omics_copy;
                }
            }
            // Add "other" filtered omics entities
            for (let i=0; i < entity_keys.length; i++) {
                const entity = entity_keys[i]; // e.g. pathway
                const label = entities[entity]; // e.g. Pathways
                if (result._index==entity) {
                    consoleDev(Array.isArray(omics))
                    if (!omics.includes(label)) {
                        omics.push(label);
                    }
                }
            }
            for (let j=0; j < omics.length; j++) {
                if (omicsChecked.includes(omics[j])) {
                    filter_count += 1;
                    break;
                }
            }
        }
        else {
            filter_count += 1;
        }

        // Platforms filter
        if (platformChecked && platformChecked.length > 0) {
            const platforms = result_source.platform_name;
            if (platforms) {
                for (let i=0; i < platforms.length; i++) {
                    if (platformChecked.includes(platforms[i])) {
                        filter_count += 1;
                        break;
                    }
                }
            }
        }
        else {
            filter_count += 1;
        }
        return (filter_count > 1) ? true : false;
    }


    function filter_result_types(results) {
        let result_types = [];
        let result_types_count = {}
        for (let i=0; i < results.length; i++) {
            const data = results[i];
            if (isFiltered(data)) {
                const data_type = data._index;
                if (!result_types.includes(data_type)) {
                    result_types.push(data_type)
                    result_types_count[data_type] = 1;
                }
                else {
                    result_types_count[data_type] += 1
                }
            }
        }
        setResultTypes(result_types_count);
    }


    function display_result_card(data) {
        if (isFiltered(data)) {
            let result_key = data._index;
            result_key += (data._source.id) ? data._source.id : data._source.name;
            return <ResultCard data={data._source} type={data._index} key={result_key}/>
        }
    }


    // Set option(s)
    useEffect(() => {
        setAllSearchOptions({'pathway': exclude_pathways})
    },[])


    // Fetch search results
    useEffect(() => {
        fetchESResults();
    },[excludePathwaysState])


    // Update the list of result types whenever a button is clicked on the side panel filters
    useEffect(() => {
        filter_result_types(esResults);
    },[omicsChecked,platformChecked])


    return (
        <>
            <DocumentHead title={'Search "'+query+'"'} standard_desc='1'/>
            <div className='d-flex'>
                <h2 className='page_title' style={{verticalAlign:"middle"}}>
                    <SearchIcon size="0.9em" className="color_hl me-3"/>
                    <span>Search results</span>
                    <span className='search_query_title'>
                        <ChevronRight className={'op_title_separator color_hl'}/>
                        <span className='fw-bold'>{query}</span>
                        <span className="badge rounded-pill badge-op ms-3" style={{fontSize:"14px",marginTop:"4px"}}>{esResults ? esResults.length: 0 } hit{esResults && esResults.length > 1 ? 's':'' }</span>
                    </span>
                    { resultsReturned == true ?
                        <span className='advanced_search_btn_container'>
                            { searchOptions && searchOptions.length > 0 ?
                                <>
                                    <span>
                                        <ToggleID title='Advanced search' id="advanced_search" key='search_options_side'/>
                                    </span>
                                    <Tooltip className='ms-2' title="Website search documentation">
                                        <span style={{marginTop:"0px"}}>
                                            <Href href="/about#website_search" icon={<InfoCircleFill size={18}/>} target='blank'/>
                                        </span>
                                    </Tooltip>
                                </> : ''
                            }
                        </span> : ''
                    }
                </h2>
            </div>
            {/* Advanced Search form */}
            { resultsReturned == true ?
                <div id="advanced_search" className='d-none'>
                    <SearchOptions handleChange={handleChange} options={searchOptions} key='search_options_side'/>
                </div> : ''
            }
            <div className='search_result_container'>
                <Suspense fallback={<div>Loading results ...</div>}>
                {
                    resultsReturned == true ?
                        esResults && esResults.length > 0 ?
                        <>
                            {/* Selection Panel */}
                            <div className='search_selection_panel'>
                                {/* Filter results */}
                                <div className='search_section_header'>Filter by:</div>
                                <div className='search_selection_container'>
                                    { esOptions && esOptions.length > 0 ? esOptions.map((data) => <SidePanelFilter handleChange={handleChange} filter={data} key={data.type+'_side'}/>) : <div>No data</div>}
                                </div>
                                {/* Legend of feature type in the results */}
                                <hr/>
                                <div className="MuiBox-root search_result_types">
                                    <div className='search_section_header'>Result types</div>
                                    <fieldset>
                                        <div className='op_search_result_legend'>
                                            { resultTypes && Object.keys(resultTypes).length > 0 ? Object.keys(resultTypes).map((data) => <div key={'legend_'+data} className="op_search_feature_legend mb-1" >
                                                { element_icon(data.toLowerCase()) }
                                                <span className='op_legend_label'>{data}</span>
                                                <span className='badge badge-sq-op-sm op_color_default_font bg_white ms-2'>{resultTypes[data]}</span>
                                            </div>): ''}
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            {/* Result panel */}
                            <div>
                                { esResults.map((data) => display_result_card(data))}
                            </div>
                        </>: <h4>No result found</h4>
                    : loading_data()
                }
                </Suspense>
            </div>
        </>
    );
}

export default Search;