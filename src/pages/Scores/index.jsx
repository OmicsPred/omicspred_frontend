import React, { useState, useEffect } from 'react';
// import protein_img from "../../assets/protein.png";
// import metabolite_img from "../../assets/metabolite.png";
// import rna_img from "../../assets/rna.png";
import { HexagonFill, Stack, BoxFill, SlashSquareFill} from 'react-bootstrap-icons';
import Href from "../../components/Href";
import { numberBadge } from "../../components/Generic";
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
        const score_platform_data = await restApiCallPaginated('platform/additional/all');
        const platforms_by_omic = buildPlatformListByOmic(score_platform_data);
        setCategorizedPlatform(platforms_by_omic);
    }


    const buildPlatformListByOmic = (data_list) => {
        if (data_list) {
            const platforms_by_omic = [];
            data_list.map(data => {
                let type = data.platform.type;
                if (!platforms_by_omic[type]) {
                    platforms_by_omic[type] = [];
                }
                let obj = {};
                obj['name'] = data.platform.name;
                obj['count'] = data.platform.scores_count;
                obj['tissue'] = data.tissue.label;
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
                            <div className="result_card mb-4" key={key}>
                                <div className="card-deck" key={key+"_card"}>
                                    <div className={"card border_"+key} style={{padding:"0px", maxWidth:"500px"}}>
                                        <div className="card-body">
                                            <h4 className="card-title" style={{verticalAlign:'middle'}}><Stack className={"color_"+key+" me-3"} size={26} style={{ fontWeight:'bold'}}/>{key}</h4>
                                            {/* <h4 className="card-title"><span className={"omics_header bg_"+key+" py-0 px-3 me-3"}></span>{key}</h4> */}

                                            <div className="card-text mt-3">
                                                <div>Platform{categorizedPlatform[key].length > 1 && 's'}:</div>
                                                <ul className='mb-0'>
                                                {categorizedPlatform[key].map((item, index) => 
                                                    <li key={item.name} >
                                                        {/* <div className="row no-gutters">
                                                        <span className="col-4"><Href text={item.name} href={'/Platform/'+item.name}/></span>
                                                        <span className="col-4"><span class="badge rounded-pill text-bg-success ms-2">{item.count}</span> scores</span>
                                                        <span className="col-4"><span className='badge bg-secondary ms-2'>{item.tissue}</span></span>
                                                        </div> */}
                                                        <span className="me-2" style={{display:"inline-block", minWidth:"75px"}}><Href text={item.name} href={'/Platform/'+item.name}/>:</span>
                                                        <span style={{display:"inline-block", minWidth:"95px", textAlign:"right"}}>{numberBadge(item.count)} scores</span>
                                                        <span className="ms-3 me-3">-</span>
                                                        <span><span className='badge bg-secondary'>{item.tissue}</span></span>
                                                    </li>
                                                )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {/* {
                    Object.keys(categorizedPlatform).sort().map((key, index) => {
                        return(
                            <div className="mb-4" key={key}>
                                <h5><SquareFill className={"omics_header color_"+key+" me-2"} size={22}/><span className={"omics_header bg_"+key+" py-0 px-2 me-2"}></span>{key}</h5>
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
                } */}
            </div>
        </>
    )
}

export default Scores