import React, { useState, useEffect } from 'react';
import { DashLg} from 'react-bootstrap-icons';

import { thousandifyNumber } from "../../../components/Generic";
import PlatformCohort from './PlatformCohort';


const Platforms = (props) => {

  const [categorizedPlatform, setCategorizedPlatform] = useState([])

  const fetchPlatformAdditionalData = async () => {
    if (props.data) {
      const platforms_by_omic = buildPlatformListByOmic(props.data);
      setCategorizedPlatform(platforms_by_omic);
    }
  }


  const buildPlatformListByOmic = (data_list) => {
    if (data_list) {
        const platforms_by_omic = [];
        data_list.map(data => {
            const platform_type = data.platform.type;
            const platform_name = data.platform.name;
            const platform_tissue = data.tissue.label;
            let new_platform = true;
            if (!platforms_by_omic[platform_type]) {
                platforms_by_omic[platform_type] = [];
            }
            // Existing platform with more than 1 publications
            const type_length = platforms_by_omic[platform_type].length;
            if (type_length > 0) {
              for (let i=0;i<type_length;i++) {
                if (platforms_by_omic[platform_type][i].name == platform_name) {
                  new_platform = false;
                  platforms_by_omic[platform_type][i].o_count += data.omics_count
                  // Tissue
                  if (!platforms_by_omic[platform_type][i].tissues.includes(platform_tissue)) {
                    platforms_by_omic[platform_type][i].tissues.push(platform_tissue);
                  }
                  // for (let j=0;j<data.cohorts.length;j++) {
                  //   const cohort_name = data.cohorts[j].name_short;
                  // TODO compare with existing list to add new cohorts
                  // }
                }
              }
            }
            if (new_platform == true) {
              let obj = {};
              obj['name'] = data.platform.name;
              obj['o_type'] = data.omics_type;
              obj['o_count'] = data.omics_count;
              obj['tissues'] = [data.tissue.label];
              obj['tissue'] = data.tissue.label;
              obj['samples_validation'] = data.samples_validation;
              platforms_by_omic[platform_type].push(obj);
            }
        });
        return platforms_by_omic;
    }
  }


  useEffect(() => {
    fetchPlatformAdditionalData();
  },[])

    return (
        <div className="odd_section">
            <div className="op_section_title">Platforms with Genetic Scores</div>
            {
                Object.keys(categorizedPlatform).sort().map((key) => {
                    return(
                    <div key={key+"_main"} className="mt-5">
                        <h2 className="py-2" key={key}><DashLg className={"color_"+key+" me-3"} size={50}/>{key}<DashLg className={"color_"+key+" ms-3"} size={50}/></h2>
                        <div className="card-deck d-lg-flex flex-lg-row justify-content-center d-md-flex flex-md-row d-sm-flex flex-sm-column" key={key+"_sub"}>
                        {categorizedPlatform[key].map((item, index) =>
                            <div className="card ms-2 me-2" key={item.name} style={{padding:"0px",maxWidth:"580px"}}>
                            <div className="card-body">
                                <h4 className={"card-title hl_"+key+" mb-2 pb-2"}>{item.name}</h4>
                                <div className="card-text">
                                <div style={{textAlign:"left"}}>
                                    Number of genetic scores: <b>{thousandifyNumber(item.o_count)}</b>
                                </div>
                                {item.samples_validation ?
                                    <div style={{textAlign:"left"}}>
                                    Validation cohort{item.samples_validation.length > 1 && 's'}: <PlatformCohort sample_cohorts={item.samples_validation}/>
                                    </div>:''
                                }
                                <div className='mt-2 mb-3'>
                                    <span className={'badge bg_'+item.o_type+' me-2'}>{item.o_type}</span>{item.tissues.map((tissue) => <span key={item.name+'-'+tissue} className='badge text-bg-dark'>{tissue}</span>)}
                                </div>
                                </div>
                                <a href={"/platform/"+item.name} className="btn btn-primary shadow">Platform page</a>
                            </div>
                            </div>
                        )}
                        </div>
                    </div>
                    )
                })
            }
        </div>
    );
};
export default Platforms;