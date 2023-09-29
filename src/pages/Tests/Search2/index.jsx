import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import restApiCallWithData from '../../../components/RestAPIWithData';
import ResultCard from './components/ResultCard';
import SidePanelFilter from './components/SidePanelFilter';

function Search2() {
    const { query } = useParams();

    const [esResults, setEsResults] = useState([])
    // const [esPlatforms, setEsPlatforms] = useState([])
    // const [esOmics, setEsOmics] = useState([])
    const [esOptions, setEsOptions] = useState([])

    const es_url = 'http://localhost:9400/gene,protein,score/_search?pretty=true';

    const query_content = { "query": { "query_string": {"query": query} } };

    const fetchESResults = async () => {
        const results = await restApiCallWithData(es_url,query_content);
        console.log(">>> results:");
        const results_list = results.hits.hits;
        console.log(results_list);
        let omics = [];
        let platforms = [];
        let options = [];
        for (let i=0; i < results_list.length; i++) {
            // Omics types
            if (results_list[i]['_source']['omics_type']) { 
                // const res_omics = results_list[i]['_source']['omics_type'].split(',');
                const res_omics = results_list[i]['_source']['omics_type'];
                // console.log(res_omics);
                for (let j=0; j < res_omics.length; j++) {
                    if (! omics.includes(res_omics[j])) {
                        omics.push(res_omics[j]);
                    }
                }
            }
            // Platforms
            if (results_list[i]['_source']['platform_name']) {
                // const res_platforms = results_list[i]['_source']['platform_name'].split(',');
                const res_platforms = results_list[i]['_source']['platform_name'];
                for (let j=0; j < res_platforms.length; j++) {
                    if (! platforms.includes(res_platforms[j])) {
                        platforms.push(res_platforms[j]);
                    }
                }
            }
        }
        setEsResults(results.hits.hits);
        options.push({header:'Omics', type:'omics', list: omics.sort()})
        options.push({header:'Platform', type:'platform', list: platforms.sort()})
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
        console.log("FILTERED DATA: "+result.omics_type+' | '+result.platform_name);
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
            <div>Selection: {omicsChecked.join(', ') }</div>
            <div>Selection: {platformChecked.join(', ') }</div>
            <div className='d-flex'>
                <div className='me-5 py-2 px-4' style={{backgroundColor: "rgb(252, 252, 252)", minWidth:"150px"}}>
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

export default Search2