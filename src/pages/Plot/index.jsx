import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useParams } from 'react-router';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ChevronRight, GraphUp } from 'react-bootstrap-icons';
import DocumentHead from '../../components/DocumentHead';
import restApiCall from '../../components/RestAPI';
import Charts from "./components/Chart";
import { get_data_type, publication_ref } from '../../components/Common';
import { loading_data } from '../../components/Generic';


const Plot = () => {
    let { platform, opp_id } = useParams();
    const [searchParams] = useSearchParams();
    const [platformSumData, setPlatformSumData] = useState([])
    const [publicationSumData, setPublicationSumData] = useState([])
    const [plotData, setPlotData] = useState([])
    const [scoreData, setScoreData] = useState([])
    const [datasetsList, setDatasetsList] = useState([])
    const [datasetsEntries, setDatasetsEntries] = useState({})
    const [platformName, setPlatformName] = useState([])
    const [defaultCohort, setDefaultCohort] = useState([])

    // Dataset
    let default_dataset_id = undefined;
    for (const [key, value] of searchParams.entries()) {
        if (key == 'dataset') {
            default_dataset_id = value;
        }
    }
    const [selectedDataset, setSelectedDataset] = useState()
    const [selectedDatasetId, setSelectedDatasetId] = useState(default_dataset_id)

    const default_cohort = {
        'OPP000001' :'INTERVAL (internal validation)',
        'OPP000002' : 'UKB (internal validation)'
    };

    const fetchDatasetData = async () => {
        const dataset_data = await restApiCall('dataset/search?opp_id='+opp_id+'&platform='+platform);
        if (dataset_data.results) {
            const results = dataset_data.results;
            const result = results[0];
            setPublicationSumData(result.publication);
            setPlatformSumData(result.platform);
            setDefaultCohort(default_cohort[opp_id]);
            setPlatformName(platform);

            let datasets = []
            let datasets_entries = {}
            for (let i=0; i<results.length; i++) {
                const dataset_val = {'id': results[i].id, 'name': results[i].name};
                datasets.push(dataset_val)
                datasets_entries[results[i].id] = dataset_val
            }
            setDatasetsEntries(datasets_entries);

            if (datasets.length > 0) {
                setDatasetsList(datasets);
                const default_dataset = datasets[0]
                if (!selectedDataset || selectedDataset == '') {
                    if (default_dataset_id) {
                        const sel_dataset = datasets_entries[default_dataset_id];
                        setData(sel_dataset);
                    }
                    else {
                        setData(default_dataset);
                    }
                }
                else {
                    setData(selectedDataset);
                }
            }
        }
    }

    const fetchData = async () => {
        let url = 'plot/search?opp_id='+opp_id+'&platform='+platform;
        if (selectedDatasetId) {
            url += '&dataset='+selectedDatasetId
        }
        const plot_data = await restApiCall(url);
        let plot_result = [];
        if (plot_data.results) {
            const results = plot_data.results;
            // Select plot results
            if (selectedDatasetId) {
                for (let i=0; i<results.length; i++) {
                    const result = results[i];
                    if (result.dataset_id == selectedDatasetId) {
                        plot_result = result;
                        break;
                    }
                }
            }
            else {
                plot_result = results[0];
                setData({'id': plot_result.dataset_id, 'name': plot_result.dataset_name})
            }
            setPlotData(plot_result.plot_data);
            setScoreData(plot_result.score_data);
        }
    }

    const handleChange = async (event) => {
        const dataset = datasetsEntries[event.target.value];
        setData(dataset);
    };

    const setData = (dataset) => {
        setSelectedDataset(dataset);
        setSelectedDatasetId(dataset.id)
    }

    useEffect(() => {
        fetchDatasetData();
        fetchData();
    },[])

    // Re-render form and charts when a different dataset is selected
    useEffect(() => {
        fetchData();
    },[selectedDataset])

    return (
        <>
            <DocumentHead title={'Plot | '+opp_id+' / '+platform} standard_desc='1'/>
            {platformSumData ? <h2 className='page_title'><GraphUp className={'op_title_prefix color_'+get_data_type(platformSumData.type)}/><span>Visualize performance of genetic scores</span><ChevronRight className={'op_title_separator color_'+get_data_type(platformSumData.type)}/><span>{platformSumData.name}</span></h2>:''}
            {publicationSumData ? <h4 className='page_subtitle'>Publication:{publication_ref(publicationSumData,true)}</h4>: ''}

            {/* { datasetNames && datasetNames.length > 1 && selectedDatasetId ? */}
            { datasetsList && datasetsList.length > 1 && selectedDataset ?
                <div className='d-flex mb-4'>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                            <InputLabel id="dataset_select_label">Dataset</InputLabel>
                            <Select
                                labelId="dataset_select_label"
                                id="dataset_select"
                                value={selectedDatasetId}
                                label="Dataset"
                                onChange={handleChange}
                            >
                                {datasetsList.map((dataset) => <MenuItem key={dataset.id+'_sel'} value={dataset.id}>{dataset.id}{dataset.name ? ' ('+dataset.name+') ' : ''}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                </div> : ''
            }
            <div>
                { platformName != '' && plotData.length && scoreData.length ?
                    <div key={selectedDataset.id+'_plot'}>
                        <Suspense fallback={<div>Data is coming !</div>}>
                            <Charts key={selectedDataset.id+'_chart'} dataset={selectedDataset.id} pagename={platformName} tdata={scoreData} data={plotData} default_cohort={defaultCohort}/>
                        </Suspense>
                    </div> : loading_data()
                }
            </div>
        </>
    );
}
export default Plot