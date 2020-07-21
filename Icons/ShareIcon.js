import React from 'react';
import {Svg,Path} from 'react-native-svg';

export const ShareIcon = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="22.51" height="20.529" viewBox="0 0 22.51 20.529">
            <Path id="multimedia-option" d="M22.51,10.757,13.155.5V6.62H11.167A11.166,11.166,0,0,0,0,17.786v3.243l.883-.968A15.852,15.852,0,0,1,12.593,14.9h.563v6.12Zm0,0" transform="translate(0 -0.5)" fill={props.Color}/>
        </Svg>

    )
};
