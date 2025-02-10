import React, { Suspense, useState, useEffect } from "react";

import _ from "underscore";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ChartPlot from "./ChartPlot";
// import ChartDoughnut from "./ChartDoughnut";
import ChartBar from "./ChartBar";
import Href from "../../../components/Href";


export default function Charts(props) {
  const d = props.data.map((e) => {
    return { name: e.name };
  });

  const rate_label = '_MatchRate';

  // const [cd, setcd] = useState(d);
  // const [names, setNames] = useState(_.uniq(cd, "name"));
  const names = _.uniq(d, "name");
  names.sort((a, b) => a.name.localeCompare(b.name));

  const n = props.data.map((e) => {
    return { type: e.type };
  });
  // const [cn, setc] = useState(n);
  // const [types, setTypes] = useState(_.uniq(cn, "type"));
  const types = _.uniq(n, "type");

  // Set default study 1
  const get_default_study_1 = () => {
    for (let i=0; i < props.data.length; i++) {
      if (props.data[i].name == props.default_cohort) {
        return props.data[i];
      }
    }
  }

  // Get default study 2 name
  const get_default_study_2_name = () => {
    for (let i=0; i < props.data.length; i++) {
      if (props.data[i].name != props.default_cohort) {
        return props.data[i].name;
      }
    }
  }

  // Set default study 2
  const get_default_study_2 = () => {
    let default_study_2;
    let default_study_2_mr;
    const study_2_name = get_default_study_2_name();
    for (let i=0; i < props.data.length; i++) {
      if (props.data[i].name == study_2_name) {
        if (props.data[i].type == '_R2') {
          default_study_2 = props.data[i];
        }
        else if (props.data[i].type == rate_label) {
          default_study_2_mr = props.data[i];
        }
      }
    }
    return [default_study_2,default_study_2_mr];
  }


  // const default_study_1 = get_default_study_1();
  // const [default_study_2,default_study_2_mr] = get_default_study_2();

  const [study1, setStudy1] = useState('');
  const [study2, setStudy2] = useState('');

  const [study1Label, setStudy1Label] = useState('');
  const [study2Label, setStudy2Label] = useState('');

  const [matchRate, setMatchRate] = useState([]);
  const [matrix, setMatrix] = useState('');

  const [datastudy1, setdataStudy1] = useState([]);
  const [datastudy2, setdataStudy2] = useState([]);
  const [matchRateData, setMatchRateData] = useState([]);

  // const [study1, setStudy1] = useState(default_study_1.name);
  // const [study2, setStudy2] = useState(default_study_2.name);

  // const [matchRate, setMatchRate] = useState(default_study_2_mr_name);
  // const [matrix, setMatrix] = useState(default_study_1.type);

  // const [datastudy1, setdataStudy1] = useState(default_study_1.data);
  // const [datastudy2, setdataStudy2] = useState(default_study_2.data);
  // const [matchRateData, setMatchRateData] = useState(default_study_2_mr_data);


  // const default_study_1 = get_default_study_1();
  // const [default_study_2,default_study_2_mr] = get_default_study_2();

  // setStudy1(default_study_1.name);
  // setStudy2(default_study_2.name);

  const setup_studies = () => {
    const default_study_1 = get_default_study_1();
    const [default_study_2,default_study_2_mr] = get_default_study_2();

    setStudy1(default_study_1.name);
    setStudy2(default_study_2.name);
    setdataStudy1(default_study_1.data);
    setdataStudy2(default_study_2.data);
    setMatrix(default_study_1.type)

    setStudy1Label(get_study_label(default_study_1.name))
    setStudy2Label(get_study_label(default_study_2.name))

    if (default_study_2_mr) {
      setMatchRate(default_study_2_mr.name);
      setMatchRateData(default_study_2_mr.data);
    }
  }

  const get_study_label = (study_name) => {

    // Training cohort
    study_name = study_name.replace(' (internal validation)','')

    // e.g. MEC_IN -> MEC
    const lastIndexOf = study_name.lastIndexOf("_");
    if (lastIndexOf > 0 ) {
      study_name = study_name.substring(0, lastIndexOf).replaceAll('_',' ');
    }
    // e.g. UKB withheld EUR -> UKB withheld
    else if (study_name.match(/\s[A-Z]{3}$/)) {
        const lastIndexOfSpace = study_name.lastIndexOf(" ");
        study_name = study_name.substring(0, lastIndexOfSpace);
    }
    return study_name
  }


  const handleChange_1 = async (event) => {
    setStudy1(event.target.value);
    setStudy1Label(get_study_label(event.target.value))
    props.data.map((e) => {
      if (e.title == event.target.value + matrix) {
        setdataStudy1(e.data);
      }
    });
  };

  const handleChange_matrix = async (event) => {
    setMatrix(event.target.value);
    props.data.map((e) => {
      if (e.title == study1 + event.target.value) {
        setdataStudy1(e.data);
      }
    });
    props.data.map((e) => {
      if (e.title == study2 + event.target.value) {
        setdataStudy2(e.data);
      }
    });
  };

  const handleChange_2 = async (event) => {
    setStudy2(event.target.value);
    setStudy2Label(get_study_label(event.target.value))
    setMatchRate(event.target.value);
    props.data.map((e) => {
      if (e.title == event.target.value + matrix) {
        setdataStudy2(e.data);
      }
    });
    if (event.target.value.endsWith("(internal validation)")) {
      props.data.map((e) => {
        if (e.title.endsWith("(internal validation)_R2")) {
          let tdata = Object.values(e.data).map((c) => {
            return 0;
          });
          setMatchRateData(tdata);
        }
      });
    } else {
      props.data.map((e) => {
        if (e.title == event.target.value + rate_label) {
          setMatchRateData(e.data);
          return;
        }
      });
    }
  };


  useEffect(() => {
    setup_studies();
  },[])


  // Force refresh whenever we switch to a different dataset (having different data)
  useEffect(() => {
    setup_studies();
  },[props.data])


  return (
    <>{ study1 != '' && study2 != '' && matrix != '' ?
    <div key={props.dataset} className="h-full">
      <div className="w-full h-[50px] flex">
        <FormControl key="select_study_1" sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="select-label-1" className="bg-white pr-2">
            Cohort 1{" "}
          </InputLabel>
          <Select
            value={study1}
            onChange={handleChange_1}
            labelId="select-label-1"
            label="Label"
          >
            {names.map((r) => {
              return (
                <MenuItem key={r.name} value={r.name}>
                  {r.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl key="select_study_2" sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="select-label-2" className="bg-white pr-2">
            Cohort 2{" "}
          </InputLabel>
          <Select
            value={study2}
            onChange={handleChange_2}
            labelId="select-label-2"
            label="Label"
          >
            {names.map((r) => {
              return (
                <MenuItem key={r.name} value={r.name}>
                  {r.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="test-select-label">Metric </InputLabel>
          <Select
            value={matrix}
            onChange={handleChange_matrix}
            displayEmpty
            inputProps={{ "aria-label": "study 2" }}
            labelId="test-select-label"
            label="Label"
          >
            {types.map((r, index) => {
              return r.type != rate_label ? (
                <MenuItem key={index} value={r.type}>
                  {r.type.substring(1)}
                </MenuItem>
              ) : null;
            })}
          </Select>
        </FormControl>
      </div>
      {/* Data Plot */}
      <Suspense fallback={<div>Data is coming !</div>}>
        <h4 key={study1+"_"+study2} className="mt-3"><Href href={'/cohort/'+study1Label}  text={study1}/> <small>vs</small> <Href href={'/cohort/'+study2Label}  text={study2}/></h4>
        <ChartPlot
          data_1={datastudy1}
          data_2={datastudy2}
          name_1={study1}
          name_2={study2}
          tdata={props.tdata}
          rate={matchRateData}
          rate_name={matchRate}
          matrix={matrix}
        />
        <hr className="mt-5"/>
        {/* Doughnut Plot */}
        {/* <ChartDoughnut
          study_1={datastudy1}
          matchRate={matchRateData}
          name_1={study1}
          name_2={study2}
          study_2={datastudy2}
          matchRate_name={matchRate}
          matrix={matrix}
        /> */}
        {/* Vertical Bar Plot */}
        <ChartBar
          study_1={datastudy1}
          name_1={study1}
          name_2={study2}
          study_2={datastudy2}
          matrix={matrix}
        />
      </Suspense>
    </div>:''}</>
  );
}
