import TextField from '@mui/material/TextField';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from '@mui/material/FormLabel';
import Select from "@mui/material/Select";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { BoxFill, Stack, Hexagon } from 'react-bootstrap-icons';


// Select form //
export const select_form = (label,selection,items_data,handleChange,extra_item_data=undefined) => {
    const label_lc = label.toLowerCase().replace(' ','_');
    const sel_id = 'select_'+label_lc;
    const sel_label = sel_id+'_label';
    return(
        <div>
            <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel id={sel_label}>{label}</InputLabel>
                <Select
                    labelId={sel_label}
                    id={sel_id}
                    value={selection}
                    label={label}
                    onChange={handleChange}
                    size="small"
                >
                    <MenuItem key='none_sel' value=''>-</MenuItem>
                    {select_items(label,items_data,extra_item_data)}
                </Select>
            </FormControl>
        </div>
    )   
}
// Select form - menu items list
const select_items = (label, items_data, extra_item_data=undefined) => {
    switch(label) {
        case 'Platform':
            return Object.keys(items_data).sort().map((item) => <MenuItem key={item+'_sel'} value={item}><Stack size="0.9em" className={"align-middle me-2 color_"+items_data[item]}/> {item}</MenuItem>);
        case 'Omics Type':
            return items_data.map((item) => <MenuItem key={item+'_sel'} value={item}><BoxFill className={"align-middle me-2 color_"+item}/> {item}</MenuItem>);
        case 'Tissue':
            return items_data.map((item) => <MenuItem key={extra_item_data[item]+'_sel'} value={extra_item_data[item]}>{item}</MenuItem>)
        default:
            return Object.keys(items_data).map((item) => <MenuItem key={item+'_sel'} value={item}>{items_data[item]}</MenuItem>)
    }
}

// Input form //
export const input_form = (label,form_id,input_value,handleInput) => {
    return(
        <div>
            <FormControl sx={{ minWidth: 150 }} size="small">
                <TextField
                    label={label}
                    id={form_id}
                    value={input_value}
                    onInput={handleInput}
                    size="small"
                />                                    
            </FormControl>
        </div>
    )   
}

// Radio form
export const radio_form = (label,selection,items_data,handleChange) => {
    const label_lc = label.toLowerCase().replace(' ','_');
    const rd_label = label_lc+'_label';
    return(
        <div>
            <FormControl className="op_radio_button" sx={{ minWidth: 150 }} size="small">   
                <FormLabel id={rd_label}>{label}</FormLabel>
                <RadioGroup
                    aria-labelledby={rd_label}
                    value={selection}
                    name={label_lc}
                    onChange={handleChange}
                    size="small"
                >
                {radio_items(label_lc, items_data)}
                </RadioGroup>
            </FormControl>
        </div>
    )   
}

// Select form - menu items list
const radio_items = (label_lc, items_data) => {
    switch(label_lc) {
        case 'molecular_trait':
            return items_data.map((item) => <FormControlLabel key={item} value={item} control={<Radio />} label={<><Hexagon className={"align-middle me-1 color_"+item.toLowerCase()}/><span className="align-middle">{item}</span></>} size="small"/>);
        default:
            return items_data.map((item) => <FormControlLabel key={item} value={item} control={<Radio />} label={item} size="small"/>);
    }
}