// import Platform from "../../components/Platform"
import React, { useState, useEffect } from 'react';
import Href from "../../components/Href";
import restApiCall from '../../components/RestAPI';


function Scores() {

    const [scorePlatforms, setScorePlatforms] = useState([])
    const [categorizedPlatform, setCategorizedPlatform] = useState([])


    const fetchScorePlatforms = async () => {
        const score_platform_data = await restApiCall('platform/all');
        const results = score_platform_data.results;
        setScorePlatforms(results);
        const platforms_by_omic = buildPlatformListByOmic(results);
        setCategorizedPlatform(platforms_by_omic);
    }


    const buildPlatformListByOmic = (data_list) => {
        if (data_list) {
            const platforms_by_omic = [];
            data_list.map(data => {
                let type = data.type;
                if (!platforms_by_omic[type]) {
                    platforms_by_omic[type] = [];
                }
                let obj = {};
                obj['name'] = data.name;
                obj['count'] = data.scores_count;
                platforms_by_omic[type].push(obj);
            });
            return platforms_by_omic;
        }
    }


    useEffect(() => {
        fetchScorePlatforms();
    },[])
  

    return (
        <>
            <h2 className='page_title'>Scores by Omics/Platform</h2>
            <div style={{ flex: "1 1 auto" }} className="flex-col w-screen ">
                {
                    Object.keys(categorizedPlatform).sort().map((key, index) => {
                        return(
                            <div key={key}>
                                <h5>{key}</h5>
                                <ul>
                                {categorizedPlatform[key].map((item, index) => 
                                    <li key={item.name}>
                                        <Href 
                                            text={item.name}
                                            href={'/Platform/'+item.name}
                                        ></Href> ({item.count} scores)
                                    </li>
                                )}
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Scores