import { useState } from "react";

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export const SidePanelFilter = (props) => {

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
                        // label={data+' ('+filter.counts[data]+')'}
                        label={<>{data}<span className='badge badge-sq-op-sm op_color_default_font bg_white ms-2' style={{backgroundColor:'#FFF'}}>{filter.counts[data]}</span></>}
                        key={key+"_"+data}
                    />
                    ) : <div>No data</div>
                }
                </FormGroup>
            </FormControl>
        </Box>
    );
}