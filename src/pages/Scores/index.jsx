import React, { useState, useEffect } from 'react';
import protein_img from "../../assets/protein.png";
import metabolite_img from "../../assets/metabolite.png";
import rna_img from "../../assets/rna.png";
import Href from "../../components/Href";
import restApiCallPaginated from '../../components/RestAPIPaginated';

function Scores() {

    // const [scorePlatforms, setScorePlatforms] = useState([])
    const [categorizedPlatform, setCategorizedPlatform] = useState([])

    const type2css = {
        'Metabolomics': 'me_color_bg',
        'Proteomics': 'pr_color_bg',
        'Transcriptomics': 'tr_color_bg'
    }


    const fetchScorePlatforms = async () => {
        const score_platform_data = await restApiCallPaginated('platform/all');
        const platforms_by_omic = buildPlatformListByOmic(score_platform_data);
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
            <h2 className='page_title'>Scores by Omics & Platform</h2>
            <div style={{ flex: "1 1 auto" }} className="flex-col w-screen ">
                {
                    Object.keys(categorizedPlatform).sort().map((key, index) => {
                        return(
                            <div className="mb-4" key={key}>
                                <h5><span className={type2css[key]+" py-1 px-3 me-2"}></span>{key}</h5>
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