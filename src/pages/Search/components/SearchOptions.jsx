import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { element_icon } from '../../../components/Common';

export const SearchOptions = (props) => {

    const options = props.options;
    const key = 'search_options';

    const display_entry = (data) => {
        return <>{element_icon(data.type.toLowerCase())}<span className='op_legend_label'>{data.label}</span></>
    }

    return (
        <Box className='advanced_search_container' key={key} sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Advanced search</FormLabel>
                <FormGroup>
                    { options.map((data) =>
                        <FormControlLabel
                            control={<Switch onChange={props.handleChange} name={data.label} checked={data.value == 1 ? true:false} />}
                            label={<div className='op_search_feature_legend'>{display_entry(data)}</div>}
                            key={key+"_"+data.label}
                        />
                    )}
                </FormGroup>
            </FormControl>
        </Box>
    );
}