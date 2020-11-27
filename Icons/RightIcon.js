import React from 'react';
import {Svg,Path,G} from 'react-native-svg';

export const RightIcon = (props) => {
    return (
        <Svg id="Iconly_Light_Tick_Square" data-name="Iconly/Light/Tick Square" xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24">
            <G id="Tick_Square" data-name="Tick Square" transform="translate(2 2)">
                <Path id="Stroke_1" data-name="Stroke 1" d="M13.584,0H4.915C1.894,0,0,2.139,0,5.166v8.168C0,16.361,1.885,18.5,4.915,18.5h8.668c3.031,0,4.917-2.139,4.917-5.166V5.166C18.5,2.139,16.614,0,13.584,0Z" transform="translate(0.75 0.75)" fill="none" stroke={props.Color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                <Path id="Stroke_3" data-name="Stroke 3" d="M0,2.373,2.374,4.746,7.12,0" transform="translate(6.44 7.627)" fill="none" stroke={props.Color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
            </G>
        </Svg>

    )
};
