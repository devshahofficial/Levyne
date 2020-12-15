import React from 'react';
import {Svg,Path,G} from 'react-native-svg';

export const EditIcon = (props) => {
    return (
        <Svg id="Iconly_Light_Edit" data-name="Iconly/Light/Edit" xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24">
            <G id="Edit" transform="translate(3.5 3.5)">
                <Path id="Stroke_1" data-name="Stroke 1" d="M0,.5H6.377" transform="translate(10.2 15.898)" fill="none" stroke={props.Color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.5"/>
                <Path id="Stroke_3" data-name="Stroke 3" d="M8.6.706A1.947,1.947,0,0,1,11.473.553l1.39,1.09A1.946,1.946,0,0,1,13.4,4.464L5.11,15.039a1.481,1.481,0,0,1-1.15.568l-3.2.041L.039,12.533a1.486,1.486,0,0,1,.277-1.252Z" transform="translate(0.75 0.75)" fill="none" stroke={props.Color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.5"/>
                <Path id="Stroke_5" data-name="Stroke 5" d="M0,0,4.794,3.758" transform="translate(7.803 3.436)" fill="none" stroke={props.Color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.5"/>
            </G>
        </Svg>
    )
};
