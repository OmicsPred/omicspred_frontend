import React, { Suspense, useState } from "react";

import _ from "underscore";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ChartPlot from "./ChartPlot";
import ChartDoughnut from "./ChartDoughnut";


export default function Charts(props) {
  const d = props.data.map((e) => {
    return { name: e.name };
  });

  const [cd, setcd] = useState(d);
  const [names, setNames] = useState(_.uniq(cd, "name"));

  const n = props.data.map((e) => {
    return { type: e.type };
  });
  const [cn, setc] = useState(n);
  const [types, setTypes] = useState(_.uniq(cn, "type"));


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
        else if (props.data[i].type == '_MissingRate') {
          default_study_2_mr = props.data[i];
        }
      }
    }
    return [default_study_2,default_study_2_mr];
  }

  const default_study_1 = get_default_study_1();
  const [default_study_2,default_study_2_mr] = get_default_study_2();

  // Missing Rate
  let default_study_2_mr_name;
  let default_study_2_mr_data = [];
  if (default_study_2_mr) {
    default_study_2_mr_name = default_study_2_mr.name;
    default_study_2_mr_data = default_study_2_mr.data;
  }

  const [study1, setStudy1] = useState(default_study_1.name);
  const [study2, setStudy2] = useState(default_study_2.name);

  const [missed, setMissed] = useState(default_study_2_mr_name);
  const [matrix, setMatrix] = useState(default_study_1.type);

  const [datastudy1, setdataStudy1] = useState(default_study_1.data);
  const [datastudy2, setdataStudy2] = useState(default_study_2.data);
  const [misseddata, setMisseddata] = useState(default_study_2_mr_data);

  const handleChange_1 = async (event) => {
    setStudy1(event.target.value);
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
    setMissed(event.target.value);
    props.data.map((e) => {
      if (e.title == event.target.value + matrix) {
        setdataStudy2(e.data);
      }
    });
    if (event.target.value == "INTERVAL (internal validation)") {
      props.data.map((e) => {
        if (e.title == "INTERVAL (internal validation)_R2") {
          let tdata = Object.values(e.data).map((c) => {
            return 0;
          });
          setMisseddata(tdata);
        }
      });
    } else {
      props.data.map((e) => {
        if (e.title == event.target.value + "_MissingRate") {
          setMisseddata(e.data);
          return;
        }
      });
    }
  };

  return (
    <React.Fragment>
      <div className="h-full">
        <div className="w-full h-[50px] flex">
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="select-label-1" className="bg-white pr-2">
              Cohort 1{" "}
            </InputLabel>
            <Select
              value={study1}
              onChange={handleChange_1}
              labelId="select-label-1"
              label="Label"
            >
              {names.map((r, index) => {
                return (
                  <MenuItem key={index} value={r.name}>
                    {r.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="select-label-2" className="bg-white pr-2">
              {" "}
              Cohort 2{" "}
            </InputLabel>

            <Select
              value={study2}
              onChange={handleChange_2}
              inputProps={{ "aria-label": "study 2" }}
              labelId="select-label-2"
              label="Label"
            >
              {names.map((r, index) => {
                return (
                  <MenuItem key={index} value={r.name}>
                    {r.name}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText className="text-indigo-600" />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 100 }}>
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
                return r.type != "_MissingRate" ? (
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
          <h3 className="mt-3"><span style={{color:'blue'}}>{study1}</span> <small>VS</small> <span style={{color:'blue'}}>{study2}</span></h3>
          <ChartPlot
            data_1={datastudy1}
            data_2={datastudy2}
            name_1={study1}
            name_2={study2}
            tdata={props.tdata}
            missed={misseddata}
            missed_name={missed}
            matrix={matrix}
            pagename={props.pagename}
          />
          <hr className="mt-5"/>
          {/* Doughnut Plot */}
          <ChartDoughnut
            study_1={datastudy1}
            missed={misseddata}
            name_1={study1}
            name_2={study2}
            study_2={datastudy2}
            missed_name={missed}
            matrix={matrix}
          />
        </Suspense>
      </div>
    </React.Fragment>
  );
}
