import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import restApiCallWithData from '../../../components/RestAPIWithData';
import ResultCard from './components/ResultCard';
import SidePanelFilter from './components/SidePanelFilter';

function Search() {
    // Get search query
    const [searchParams, setSearchParams] = useSearchParams();
    let query = '';
    for (const [key, value] of searchParams.entries()) {
        if (key == 'q') {
            query = value;
        }
    }

    const [esResults, setEsResults] = useState([])
    // const [esPlatforms, setEsPlatforms] = useState([])
    // const [esOmics, setEsOmics] = useState([])
    const [esOptions, setEsOptions] = useState([])

    const indexes = ['gene','metabolite','phecode','protein','score'];

    const es_url = process.env.OMICSPRED_ES_URL+indexes.join(',')+'/_search?pretty=true';

    const query_content = { 
        "size": 20,
        "query": { "query_string": {"query": query} } 
    };

    const fetchESResults = async () => {
        const results = await restApiCallWithData(es_url,query_content);
        console.log(">>> results:");
        const results_list = results.hits.hits;
        console.log(results_list);
        let omics_counts = {};
        let platform_counts = {};
        // let platforms = [];
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

    }

    const [omicsChecked, setOmicsChecked] = useState([]);
    const [platformChecked, setPlatformChecked] = useState([]);

    function handleChange(e) {
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
        console.log("Omics: "+omicsChecked);
        console.log("Platform: "+platformChecked);
        console.log("--------------------");
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
        if (filter_count > 1) {
            return true;
        }
        else {
            return false
        }
    }


    useEffect(() => {
        fetchESResults();
    },[])

    return (
        <>
            <h2 className='page_title'>Search results for <span>{query}</span></h2>
            {/* <div>Sel. Omics: {omicsChecked.join(', ') }</div>
            <div>Sel. Platform: {platformChecked.join(', ') }</div> */}
            <div className='d-flex'>
                <div className='hl_grey_box me-5 py-2 px-4' style={{minWidth:"150px"}}>
                { 
                    esOptions && esOptions.length > 0 ? esOptions.map((data) => <SidePanelFilter handleChange={handleChange} filter={data} key={data.type+'_side'}/>) : <div>No data</div>
                }
                </div>
                <div>
                { 
                    esResults && esResults.length > 0 ? esResults.map((data) =>
                        isFiltered(data._source) && <ResultCard data={data._source} type={data._index} key={data._index+'_'+data._id}/>) : <div>No data</div>
                }
                </div>
            </div>
        </>
    );
}

export default Search;