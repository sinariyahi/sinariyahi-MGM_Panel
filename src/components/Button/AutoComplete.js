import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import stylisRTLPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

function StyleSelect(props){
    const testOptions=props.options

    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [stylisRTLPlugin]
      });
    const cacheltR = createCache({
        key: "muiltr",
        stylisPlugins: []
      });
    return( 
        //<CacheProvider value={props.direction==="rtl"?cacheRtl:cacheltR}>
            <Autocomplete
            getOptionLabel={(option) => (option&&option[props.label])?
                option[props.label]:option}
            //className={stylisRTLPlugin}
            disabled={props.disabled}
            isOptionEqualToValue={(option, value) => option&&(option.id === value.id)}
            options={testOptions||[]}
            className={props.class}
            value={props.value}
            defaultValue={props.defaultValue||null}
            style={{minWidth:"200px"}}
            onChange={(e,value)=>props.action(value)}
            renderInput={(params) => (
            <TextField {...params} label={props.title}
                onChange={(e)=>props.textChange?props.textChange(e.target.value):''}
            />)}
            />
        //</CacheProvider>
    )
}
export default StyleSelect