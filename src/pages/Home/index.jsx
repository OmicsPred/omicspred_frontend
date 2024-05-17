import React, { useState, useEffect } from 'react';
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

  const [platformData, setPlatformData] = useState([])

  const fetchPlatformAdditionalData = async () => {
    const platform_data = await restApiCallPaginated('platform/additional/all');
    setPlatformData(platform_data);
  }

  useEffect(() => {
    fetchPlatformAdditionalData();
  },[])

  return (
    <>
      <Header/>
      { platformData && platformData.length > 0 ? <Stats data={platformData}/> : ''}
      <About/>
      { platformData && platformData.length > 0 ? <Platforms data={platformData}/> : ''}
      <Applications/>
      <Citation/>
      <Feedback/>
      <Supports/>
    </>
  );
}

export default Home;