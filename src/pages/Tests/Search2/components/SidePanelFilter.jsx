import { useState } from "react";

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function SidePanelFilter(props) {
//   const [state, setState] = React.useState({
//     gilad: true,
//     jason: false,
//     antoine: false,
//   });

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setState({
//       ...state,
//       [event.target.name]: event.target.checked,
//     });
//   };
    // const [checked, setChecked] = useState(false); 

    // const handleChange = (e) => {
    //     setChecked(e.target.checked);
    // }

    // const [omicsChecked, setOmicsChecked] = useState([]);
    // const [platformChecked, setPlatformChecked] = useState([]);

    // function handleChange(e) {
    //     if (e.target.name == 'omics') {
    //         if (e.target.checked) {
    //             setOmicsChecked([...omicsChecked, e.target.value]);
    //         } else {
    //             setOmicsChecked(omicsChecked.filter((item) => item !== e.target.value));
    //         }
    //     }
    //     else if (e.target.name == 'platform') {
    //         if (e.target.checked) {
    //             setPlatformChecked([...platformChecked, e.target.value]);
    //         } else {
    //             setPlatformChecked(platformChecked.filter((item) => item !== e.target.value));
    //         }
    //     }
    //     console.log("Omics: "+omicsChecked);
    //     console.log("Platform: "+platformChecked);
    //     console.log("--------------------");
    // }

//   const { gilad, jason, antoine } = state;
//   const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

    const filter = props.filter;
    const key = 'filter_'+filter.type;

    return (
        <Box key={key} sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">{filter.header}</FormLabel>
                <FormGroup>
                { filter.list && filter.list.length > 0 ? 
                    filter.list.map((data) => 
                    <FormControlLabel 
                        control={<Checkbox onChange={props.handleChange} name={filter.type} value={data} />}
                        label={data}
                        key={key+"_"+data}
                    />
                    ) : <div>No data</div>
                }
                </FormGroup>
            </FormControl>
            {/* { 
                filter.type == 'omics' ?
                <div>Selection: {omicsChecked.join(', ') }</div> : <div>Selection: {platformChecked.join(', ') }</div>
            } */}

        </Box>
    );
}