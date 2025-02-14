import React, { useState, useEffect } from 'react';
import { DashLg, Stack } from 'react-bootstrap-icons';
import Href from '../../../components/Href';
import { thousandifyNumber } from "../../../components/Generic";
import PlatformCohort from './components/PlatformCohort';


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
        let platforms_seen = []
        let platforms_by_omic = [];
        data_list.map(data => {
            const platform_type = data.platform.type;
            const platform_name = data.platform.name;
            const samples_validation = data.samples_validation
            const platform_tissue = data.tissue.label;
            if (!platforms_by_omic[platform_type]) {
                platforms_by_omic[platform_type] = [];
            }
            // Existing platform with more than 1 publications
            const type_length = platforms_by_omic[platform_type].length;
            if (type_length > 0) {
                for (let i=0;i<type_length;i++) {
                    // Existing platform entry
                    if (platforms_by_omic[platform_type][i].name == platform_name) {
                        platforms_by_omic[platform_type][i].o_count += data.omics_count
                        // Tissue
                        if (!platforms_by_omic[platform_type][i].tissues.includes(platform_tissue)) {
                            platforms_by_omic[platform_type][i].tissues.push(platform_tissue);
                        }
                        // Samples validation - Add cohort names to existing Plaform entry
                        let existing_samples_validation = platforms_by_omic[platform_type][i].samples_validation;
                        let existing_cohorts = [];
                        for (let j=0; j<existing_samples_validation.length;j++) {
                            const cohort_name = existing_samples_validation[j].cohorts[0].name_short;
                            if (!existing_cohorts.includes(cohort_name)) {
                                existing_cohorts.push(cohort_name);
                            }
                        }
                        console.log(existing_cohorts);
                        for (let k=0; k<samples_validation.length;k++) {
                            if (samples_validation[k].cohorts && samples_validation[k].cohorts.length > 0) {
                                const cohort_name = samples_validation[k].cohorts[0].name_short;
                                if (!existing_cohorts.includes(cohort_name)) {
                                    existing_cohorts.push(cohort_name);
                                    existing_samples_validation.push(samples_validation[k]);
                                }
                            }
                        }
                        platforms_by_omic[platform_type][i].samples_validation = existing_samples_validation;
                    }
                }
            }
            // New platform
            if (!platforms_seen.includes(platform_name)) {
                let obj = {};
                obj['name'] = data.platform.name;
                obj['o_type'] = data.omics_type;
                obj['o_count'] = data.omics_count;
                obj['tissues'] = [data.tissue.label];
                obj['tissue'] = data.tissue.label;
                obj['samples_validation'] = samples_validation;
                platforms_by_omic[platform_type].push(obj);
                platforms_seen.push(platform_name);
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
            <div className="op_section_title" id='platforms'><Stack size="0.9em" className='me-3'/><span>Platforms with Genetic Scores</span></div>
            {
                Object.keys(categorizedPlatform).sort().map((key) => {
                    return(
                        <div key={key+"_main"} className="mt-5">
                            <h2 className="py-2" key={key}><DashLg className={"color_"+key+" me-3"} size={50}/>{key}<DashLg className={"color_"+key+" ms-3"} size={50}/></h2>
                            <div className="card-deck d-flex justify-content-center flex-lg-row flex-md-row flex-sm-column" key={key+"_sub"}>
                            {categorizedPlatform[key].map((item, index) =>
                                <div className="card op_card_homepage mb-2" key={item.name}>
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
                                        <Href role='button' href={"/platform/"+item.name} text='Platform page' icon={<Stack size='0.9em'/>}/>
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