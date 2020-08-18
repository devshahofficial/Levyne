import React from 'react';
import {Svg,Path} from 'react-native-svg';

export const CallIcon = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={props.Size} height={props.Size} viewBox="0 0 18 18">
            <Path id="ic_settings_phone_24px" d="M20,15.5a11.36,11.36,0,0,1-3.57-.57,1.021,1.021,0,0,0-1.02.24l-2.2,2.2a15.074,15.074,0,0,1-6.59-6.58l2.2-2.21a.982.982,0,0,0,.25-1.01A11.36,11.36,0,0,1,8.5,4a1,1,0,0,0-1-1H4A1,1,0,0,0,3,4,17,17,0,0,0,20,21a1,1,0,0,0,1-1V16.5A1,1,0,0,0,20,15.5Z" transform="translate(-3 -3)" fill={props.Color}/>
        </Svg>


    )
};
