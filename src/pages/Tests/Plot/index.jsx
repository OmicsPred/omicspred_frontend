import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useParams } from 'react-router-dom';
import { ChevronRight, Book, GraphUp } from 'react-bootstrap-icons';
import DocumentTitle from '../../../components/DocumentTitle';
import restApiCall from '../../../components/RestAPI';
import Charts from "./components/Chart";
import { get_data_type, publication_ref } from '../../../components/Common';
import { loading_data } from '../../../components/Generic';


const Plot = (props) => {
    let { platform, pmid } = useParams();
    DocumentTitle('Plot | PMID:'+pmid+' / '+platform);
    const [searchParams, setSearchParams] = useSearchParams();
    const [platformSumData, setPlatformSumData] = useState([])
    const [publicationSumData, setPublicationSumData] = useState([])
    const [plotData, setPlotData] = useState([])
    const [scoreData, setScoreData] = useState([])
    const [datasetNames, setDatasetNames] = useState([])
    // const [plotFile, setPlotFile] = useState([])
    // const [plotScoreFile, setPlotScoreFile] = useState([])
    const [platformName, setPlatformName] = useState([])
    const [defaultCohort, setDefaultCohort] = useState([])

    // Dataset
    let default_dataset = undefined;
    for (const [key, value] of searchParams.entries()) {
        if (key == 'dataset') {
            default_dataset = value;
        }
    }
    const [selectedDataset, setSelectedDataset] = useState(default_dataset)

    const default_cohort = {
        '36991119' :'INTERVAL (internal validation)',
        '12345' : 'UKB (internal validation)'
    };

    const platform_file_name = platform.replace(" ", "_");

    const data_dir = process.env.PROJECT_DATA_DIR+pmid+'/';
    const data_file_prefix = data_dir+platform_file_name;

    const fetchDatasetData = async () => {
        const dataset_data = await restApiCall('dataset/search?pmid='+pmid+'&platform='+platform);
        if (dataset_data.results) {
            const results = dataset_data.results;
            const result = results[0];
            setPublicationSumData(result.publication);
            setPlatformSumData(result.platform);
            setDefaultCohort(default_cohort[pmid]);
            setPlatformName(platform);
            // Set list of dataset names
            let dataset_names = []
            for (let i=0; i<results.length; i++) {
                if (results[i].name) {
                    dataset_names.push(results[i].name)
                }
            }
            if (dataset_names.length > 0) {
                setDatasetNames(dataset_names);
                const default_dataset = dataset_names[0]
                if (!selectedDataset || selectedDataset == '') {
                    setData(default_dataset);
                }
                else {
                    setData(selectedDataset);
                }
            }
            // else {
            //     setPlotFile(data_file_prefix+'_plot.json');
            //     setPlotScoreFile(data_file_prefix+'_plot_score.json');
            // }
        }
    }

    // const fetchPlotData = async () => {
    //     if (plotFile != '') {
    //         const platform_plot_data = await fetch(plotFile)
    //             .then(response => {
    //                 return response.json()
    //             })
    //             setPlotData(platform_plot_data);
    //     }
    // }

    // const fetchScoreData = async () => {
    //     if (plotScoreFile != '') {
    //         const platform_plot_score_data = await fetch(plotScoreFile)
    //             .then(response => {
    //                 return response.json()
    //             })
    //             setScoreData(platform_plot_score_data);
    //     }
    // }

    const fetchData = async () => {
        let url = 'plot/search?pmid='+pmid+'&platform='+platform;
        if (selectedDataset) {
            url += '&dataset='+selectedDataset
        }
        const plot_data = await restApiCall(url);
        if (plot_data.results) {
            const results = plot_data.results;
            const result = results[0];
            setPlotData(result.plot_data);
            setScoreData(result.score_data);
        }
    }

    const handleChange = async (event) => {
        setData(event.target.value);
    };

    const setData = (dataset) => {
        setSelectedDataset(dataset);
        const file_prefix = data_file_prefix+'_'+dataset.replace(" ", "_");
        // setPlotFile(file_prefix+'_plot.json');
        // setPlotScoreFile(file_prefix+'_plot_score.json');
    }

    useEffect(() => {
        fetchDatasetData();
        // fetchPlotData();
        // fetchScoreData();
        fetchData();
    },[])

    // Re-render form and charts when a different dataset is selected
    useEffect(() => {
        // fetchPlotData();
        // fetchScoreData();
        fetchData();
    },[selectedDataset])
    // },[plotFile,plotScoreFile,selectedDataset])

    return (
        <>
            {platformSumData ? <h2 className='page_title'><GraphUp className={'op_title_prefix color_'+get_data_type(platformSumData.type)}/><span>Visualize performance of genetic scores</span><ChevronRight className={'op_title_separator color_'+get_data_type(platformSumData.type)}/><span>{platformSumData.name}</span></h2>:''}
            {publicationSumData ? <h4 className='page_subtitle'>Publication:{publication_ref(publicationSumData,true)}</h4>: ''}

            { datasetNames && datasetNames.length > 1 && selectedDataset ?
                <div className='d-flex mb-4'>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                            <InputLabel id="dataset_select_label">Dataset</InputLabel>
                            <Select
                                labelId="dataset_select_label"
                                id="dataset_select"
                                value={selectedDataset}
                                label="Dataset"
                                onChange={handleChange}
                            >
                                {datasetNames.map((d_name) => <MenuItem key={d_name+'_sel'} value={d_name}>{d_name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                </div> : ''
            }
            <div>
                {/* { plotFile != '' && plotScoreFile != '' && plotData.length && scoreData.length ? */}
                { platformName != '' && plotData.length && scoreData.length ?
                    <div key={selectedDataset+'_plot'}>
                        <Suspense fallback={<div>Data is coming !</div>}>
                            <Charts key={selectedDataset+'_chart'} dataset={selectedDataset} pagename={platformName} tdata={scoreData} data={plotData} default_cohort={defaultCohort}/>
                        </Suspense>
                    </div> : loading_data()
                }
            </div>
        </>
    );
}
export default Plot