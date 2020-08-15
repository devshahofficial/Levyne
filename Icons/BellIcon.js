import React from 'react';
import {Svg,Path,G} from 'react-native-svg';

export const BellIcon = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 16.633 22.178">
            <G id="notification" transform="translate(-64)">
                <Path id="Path_5208" data-name="Path 5208" d="M79.94,15.247a1.388,1.388,0,0,1-1.386-1.386V9.01a6.247,6.247,0,0,0-4.4-5.963,2.079,2.079,0,1,0-3.676.005,6.307,6.307,0,0,0-4.4,6.018v4.791a1.388,1.388,0,0,1-1.386,1.386A.693.693,0,0,0,64,15.94v2.772a.693.693,0,0,0,.693.693h5.223a2.459,2.459,0,0,0-.025.347,2.426,2.426,0,1,0,4.826-.347H79.94a.693.693,0,0,0,.693-.693V15.94A.693.693,0,0,0,79.94,15.247ZM72.317,1.386a.693.693,0,1,1-.693.693A.694.694,0,0,1,72.317,1.386Zm1.04,18.366a1.04,1.04,0,1,1-2.02-.347H73.3A1.036,1.036,0,0,1,73.356,19.752Zm5.891-1.733H65.386V16.546a2.777,2.777,0,0,0,2.079-2.685V9.07A4.891,4.891,0,0,1,72.3,4.158h.018A4.852,4.852,0,0,1,77.168,9.01v4.851a2.777,2.777,0,0,0,2.079,2.685Z" fill={props.Color}/>
                <Path id="Path_5209" data-name="Path 5209" d="M176.693,132.158a.693.693,0,0,1-.693-.693A3.469,3.469,0,0,1,179.465,128a.693.693,0,1,1,0,1.386,2.082,2.082,0,0,0-2.079,2.079A.693.693,0,0,1,176.693,132.158Z" transform="translate(-107.149 -122.456)" fill={props.Color}/>
            </G>
        </Svg>


    )
};