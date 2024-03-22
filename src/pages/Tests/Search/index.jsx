import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronRight } from 'react-bootstrap-icons';
import restApiCallWithData from '../../../components/RestAPIWithData';
import ResultCard from './components/ResultCard';
import SidePanelFilter from './components/SidePanelFilter';

function Search() {
    // Get search query
    const [searchParams, setSearchParams] = useSearchParams();
    const [esResults, setEsResults] = useState([])
    const [esOptions, setEsOptions] = useState([])
    const [omicsChecked, setOmicsChecked] = useState([]);
    const [platformChecked, setPlatformChecked] = useState([]);
    const [resultTypes, setResultTypes] = useState([]);

    let query = '';
    for (const [key, value] of searchParams.entries()) {
        if (key == 'q') {
            query = value;
        }
    }

    const indexes = ['gene','metabolite','phecode','protein','score'];

    const es_url = process.env.OMICSPRED_ES_URL+indexes.join(',')+'/_search?pretty=true';

    const query_content = { 
        "size": 20,
        "query": { "query_string": {"query": query} } 
    };

    const fetchESResults = async () => {
        let credentials = undefined;
        if (process.env.OMICSPRED_ES_USERNAME && process.env.OMICSPRED_ES_PASSWORD) {
            credentials = `Basic ${btoa(process.env.OMICSPRED_ES_USERNAME + ':' + process.env.OMICSPRED_ES_PASSWORD)}`;
        }
        console.log("!!!!! FETCH RESULTS !!!!!");
        const results = await restApiCallWithData(es_url,query_content,credentials);
        console.log(">>> results for "+query+":");
        const results_list = results.hits.hits;
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

        setEsResults(results.hits.hits);
        options.push({header:'Omics', type:'omics', list: omics.sort(), counts: omics_counts})
        options.push({header:'Platform', type:'platform', list: platforms.sort(), counts: platform_counts})
        setEsOptions(options);
        console.log(">>> options");
        console.log(options);
        filter_result_types(results.hits.hits);
    }


    function handleChange(e) {
        console.log('\n\nXXXX handleChange XXXX');
        if (e.target.name == 'omics') {
            if (e.target.checked) {
                setOmicsChecked([...omicsChecked, e.target.value]);
            } else {
                setOmicsChecked(omicsChecked.filter((item) => item !== e.target.value));
            }
        }
        else if (e.target.name == 'platform') {
            if (e.target.checked) {
                setPlatformChecked([...platformChecked, e.target.value]);
            } else {
                setPlatformChecked(platformChecked.filter((item) => item !== e.target.value));
            }
        }
        console.log('platformChecked:');
        console.log(platformChecked);
    }


    function isFiltered(result) {
        let filter_count = 0;
        // Omics filter
        const omics = result.omics_type;
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
        const platforms = result.platform_name;
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
        for (let i=0; i < results.length; i++) {
            const data = results[i];
            if (isFiltered(data._source)) {
                const data_type = data._index;
                if (!result_types.includes(data_type)) {
                    result_types.push(data_type)
                }
            }
        }
        setResultTypes(result_types);
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
            <h2 className='page_title'>Search results<ChevronRight className={'op_title_separator color_hl'}/><span>{query}</span></h2>
            <div className='d-flex'>
                <Suspense fallback={<div>Loading results ...</div>}>
                { 
                    esResults && esResults.length > 0 ?
                    <>
                        {/* Options Panel */}
                        <div className='hl_grey_box me-5 py-2 px-4' style={{minWidth:"250px"}}>
                            { esOptions && esOptions.length > 0 ? esOptions.map((data) => <SidePanelFilter handleChange={handleChange} filter={data} key={data.type+'_side'}/>) : <div>No data</div>}
                            {/* Legend of feature type in the results */}
                            <div style={{marginLeft:"24px",marginTop:"24px"}}>
                                <legend className="mb-3" style={{fontWeight:"bold",fontSize:"1rem",color:"rgba(0, 0, 0, 0.6)"}}>Result types</legend>
                                { resultTypes && resultTypes.length ? resultTypes.map((data) => <div key={'legend_'+data} className="op_search_feature_legend mb-1" >
                                    <span className={'px-2 py-2 me-3 mb-1 bg_'+data}></span>
                                    <span>{data}</span>
                                </div>): ''}
                            </div>
                        </div>
                        {/* Result panel */}
                        <div>
                            { esResults.map((data) => isFiltered(data._source) && <ResultCard data={data._source} type={data._index} key={data._index+'_'+data._id}/>)}
                        </div>
                    </>: <h4>No result found</h4>
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