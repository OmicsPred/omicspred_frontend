import React, { useState, useEffect } from 'react';

import protein_img from "../../../assets/protein.png";
import metabolite_img from "../../../assets/metabolite.png";
import rna_img from "../../../assets/rna.png";
import restApiCallPaginated from '../../../components/RestAPIPaginated';
import {ChevronDoubleRight, DashLg} from 'react-bootstrap-icons';
import { thousandifyNumber } from "../../../components/Generic";
import PlatformCohort from './PlatformCohort';

function Platforms() {

  const [categorizedPlatform, setCategorizedPlatform] = useState([])

  const type2img = {
    'Metabolomics': metabolite_img,
    'Proteomics': protein_img,
    'Transcriptomics': rna_img
  }


  const fetchPlatforms = async () => {
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
            obj['o_type'] = data.omics_type;
            obj['o_count'] = data.omics_count;
            obj['tissue'] = data.tissue.label;
            obj['cohorts'] = data.cohorts;
            platforms_by_omic[type].push(obj);
        });
        return platforms_by_omic;
    }
  }


  useEffect(() => {
    fetchPlatforms();
  },[])

  return (
    <div className="odd_section">
      <div className="op_section_title">Platforms with Genetic Scores</div>
        {
          Object.keys(categorizedPlatform).sort().map((key) => {
            return(
              <div key={key+"_main"} className="mt-5">
                <h2 className="py-2" key={key}><DashLg className={"color_"+key+" me-3"} size={50}/>{key}<DashLg className={"color_"+key+" ms-3"} size={50}/></h2>
                {/* <h2 className="mt-4 op_subsection_header" key={key}><img className="me-3" src={type2img[key]} alt={key}/>{key}</h2> */}
                <div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column" key={key+"_sub"}>
                  {categorizedPlatform[key].map((item, index) => 
                    <div className="card ms-2 me-2" key={item.name} style={{padding:"0px",maxWidth:"580px"}}>
                      <div className="card-body">
                        <h4 className={"card-title hl_"+key+" mb-2 pb-2"}>{item.name}</h4>
                        <div className="card-text">
                          <div style={{textAlign:"left"}}>
                            Number of genetic scores: <b>{thousandifyNumber(item.o_count)}</b>
                          </div>
                          <div style={{textAlign:"left"}}>
                            Validation cohort{item.cohorts.length > 1 && 's'}: <PlatformCohort cohorts={item.cohorts}/>
                          </div>
                          <div className='mt-2 mb-3'>
                            <span className='badge bg-secondary me-2'>{item.o_type}</span><span className='badge bg-secondary'>{item.tissue}</span>
                          </div>
                        </div>
                        <a href={"/platform/"+item.name} className="btn btn-primary">Learn more</a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          }
        )
      }
    </div> 
  );
};
export default Platforms;