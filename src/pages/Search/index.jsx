import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronRight, Search as SearchIcon, Stack} from 'react-bootstrap-icons';
import DocumentTitle from '../../components/DocumentTitle';
import restApiCall from '../../components/RestAPI';
import ResultCard from './components/ResultCard';
import { SidePanelFilter } from './components/SidePanelFilter';
import { loading_data } from '../../components/Generic';
import { element_icon } from '../../components/Common';



function Search() {
    // Get search query
    const [searchParams, setSearchParams] = useSearchParams();
    const [esResults, setEsResults] = useState([])
    const [esOptions, setEsOptions] = useState([])
    const [resultsReturned, setResultsReturned] = useState(false)
    const [omicsChecked, setOmicsChecked] = useState([]);
    const [platformChecked, setPlatformChecked] = useState([]);
    const [resultTypes, setResultTypes] = useState([]);

    let query = '';
    for (const [key, value] of searchParams.entries()) {
        if (key == 'q') {
            query = value;
        }
    }
    DocumentTitle('Search "'+query+'"');

    const es_url = process.env.OMICSPRED_ES_URL+'?q='+query;

    const fetchESResults = async () => {
        const results = await restApiCall(es_url);

        // console.log(">>> results for "+query+":");
        const results_list = results;

        console.log(results_list);
        let omics_counts = {};
        let platform_counts = {};
        let options = [];
        for (let i=0; i < results_list.length; i++) {
            // Omics types
            if (results_list[i]['_source']['omics_type']) {
                const res_omics = results_list[i]['_source']['omics_type'];
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
        }
        const omics = Object.keys(omics_counts).sort();
        const platforms = Object.keys(platform_counts).sort();

        setEsResults(results);
        setResultsReturned(true);
        options.push({header:'Omics', type:'omics', list: omics.sort(), counts: omics_counts})
        options.push({header:'Platform', type:'platform', list: platforms.sort(), counts: platform_counts})
        setEsOptions(options);
        // console.log(">>> options");
        // console.log(options);
        filter_result_types(results);
    }


    function handleChange(e) {
        if (e.target.name == 'omics') {
            console.log(">> handleChange: omics");
            if (e.target.checked) {
                setOmicsChecked([...omicsChecked, e.target.value]);
            } else {
                setOmicsChecked(omicsChecked.filter((item) => item !== e.target.value));
            }
        }
        else if (e.target.name == 'platform') {
            console.log(">> handleChange: platform");
            if (e.target.checked) {
                setPlatformChecked([...platformChecked, e.target.value]);
            } else {
                setPlatformChecked(platformChecked.filter((item) => item !== e.target.value));
            }
        }
    }


    function isFiltered(result) {
        let filter_count = 0;
        const result_source = result._source;
        // Omics filter
        const omics = result_source.omics_type;
        if (omicsChecked && omicsChecked.length > 0) {
            for (let i=0; i < omics.length; i++) {
                if (omicsChecked.includes(omics[i])) {
                    filter_count += 1;
                    break;
                }
            }
        }
        else {
            filter_count += 1;
        }

        // Platforms filter
        const platforms = result_source.platform_name;
        if (platformChecked && platformChecked.length > 0) {
            for (let i=0; i < platforms.length; i++) {
                if (platformChecked.includes(platforms[i])) {
                    filter_count += 1;
                    break;
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

    // Fetch search results
    useEffect(() => {
        fetchESResults();
    },[])

    // Update the list of result types whenever a button is clicked on the side panel filters
    useEffect(() => {
        filter_result_types(esResults);
    },[omicsChecked,platformChecked])

    return (
        <>
            <div className='d-flex'>
                <h2 className='page_title'><SearchIcon size="0.9em" className="color_hl me-3"/>Search results<ChevronRight className={'op_title_separator color_hl'}/><span>{query}</span></h2>
                <div className='mt-4 ms-3'><span className="badge rounded-pill badge-op">{esResults ? esResults.length: 0 } hits</span></div>
            </div>
            <div className='d-flex'>
                <Suspense fallback={<div>Loading results ...</div>}>
                {
                    resultsReturned == true ?
                        esResults && esResults.length > 0 ?
                        <>
                            {/* Selection Panel */}
                            <div className='search_selection_panel'>
                                { esOptions && esOptions.length > 0 ? esOptions.map((data) => <SidePanelFilter handleChange={handleChange} filter={data} key={data.type+'_side'}/>) : <div>No data</div>}

                                {/* Legend of feature type in the results */}
                                <div className="MuiBox-root search_selection_block">
                                    <fieldset>
                                        <legend className="mb-3">Result types</legend>
                                        { resultTypes && Object.keys(resultTypes).length > 0 ? Object.keys(resultTypes).map((data) => <div key={'legend_'+data} className="op_search_feature_legend mb-1" >
                                            {/* <span className={'px-2 py-2 me-3 mb-1 bg_'+data}></span> */}
                                            { element_icon(data.toLowerCase()) }
                                            <span className='op_legend_label'>{data}</span>
                                            <span className='badge badge-sq-op-sm op_color_default_font bg_white ms-2'>{resultTypes[data]}</span>
                                        </div>): ''}
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

function LegendItem(props) {
    const item = props.item;
    return (
        <div key={'legend_'+item} className="op_search_feature_legend mb-1" >
            <span className={'px-2 py-2 me-3 mb-1 bg_'+item}></span>
            <span>{item}</span>
        </div>
    );
}