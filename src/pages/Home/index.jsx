import React, { useState, useEffect } from 'react';
import DocumentTitle from '../../components/DocumentTitle';
import restApiCallPaginated from '../../components/RestAPIPaginated';
import Header from "./components/Header"
import Stats from "./components/Stats"
import About from "./components/About"
import Platforms from "./components/Platforms"
import Applications from "./components/Applications"
import Citation from "./components/Citation"
import Feedback from "./components/Feedback"
import Supports from "./components/Supports"


function Home() {
  DocumentTitle('Homepage');
  const [datasetData, setDatasetData] = useState([])

  const fetchDatasetData = async () => {
    const dataset_data = await restApiCallPaginated('dataset/all');
    setDatasetData(dataset_data);
  }

  useEffect(() => {
    fetchDatasetData();
  },[])

  return (
    <>
      <Header/>
      { datasetData && datasetData.length > 0 ? <Stats data={datasetData}/> : ''}
      <About/>
      { datasetData && datasetData.length > 0 ? <Platforms data={datasetData}/> : ''}
      <Applications/>
      <Citation/>
      <Feedback/>
      <Supports/>
    </>
  );
}

export default Home;