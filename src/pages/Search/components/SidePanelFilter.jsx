import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { element_icon } from '../../../components/Common';

export const SidePanelFilter = (props) => {

    const filter = props.filter;
    const key = 'filter_'+filter.type;

    const display_entry = (data) => {
        if (props.filter.header == 'Group type') {
            return <>{element_icon(data.toLowerCase())}<span className='op_legend_label'>{data}</span></>
        }
        else {
            return data
        }
    }

    return (
        <Box key={key} sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">{filter.header}</FormLabel>
                <FormGroup>
                { filter.list && filter.list.length > 0 ?
                    filter.list.map((data) =>
                    <FormControlLabel
                        control={<Checkbox onChange={props.handleChange} name={filter.type} value={data} />}
                        label={<div className='op_search_feature_legend'>{display_entry(data)}<span className='badge badge-sq-op-sm op_color_default_font bg_white ms-2'>{filter.counts[data]}</span></div>}
                        key={key+"_"+data}
                    />
                    ) : <div>No data</div>
                }
                </FormGroup>
            </FormControl>
        </Box>
    );
}