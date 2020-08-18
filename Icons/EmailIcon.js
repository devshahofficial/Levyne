import React from 'react';
import {Svg,Path} from 'react-native-svg';

export const EmailIcon = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={props.Size} height={props.Size - 4} viewBox="0 0 20 16">
            <Path id="ic_mail_outline_24px" d="M20,4H4A2,2,0,0,0,2.01,6L2,18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V6A2.006,2.006,0,0,0,20,4Zm0,14H4V8l8,5,8-5Zm-8-7L4,6H20Z" transform="translate(-2 -4)" fill={props.Color}/>
        </Svg>


    )
};
