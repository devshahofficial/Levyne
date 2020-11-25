import React from 'react';
import {Svg,Path,G} from 'react-native-svg';

export const CancelIcon = (props) => {
    return (
        <Svg id="Iconly_Light_Close_Square" data-name="Iconly/Light/Close Square" xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24">
            <G id="Close_Square" data-name="Close Square" transform="translate(2 2)">
                <Path id="Stroke_1" data-name="Stroke 1" d="M4.792,0,0,4.792" transform="translate(7.603 7.595)" fill="none" stroke={props.Color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                <Path id="Stroke_2" data-name="Stroke 2" d="M4.8,4.8,0,0" transform="translate(7.601 7.593)" fill="none" stroke={props.Color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" />
                <Path id="Stroke_3" data-name="Stroke 3" d="M13.584,0H4.915C1.894,0,0,2.139,0,5.166v8.168C0,16.361,1.885,18.5,4.915,18.5h8.668c3.031,0,4.917-2.139,4.917-5.166V5.166C18.5,2.139,16.614,0,13.584,0Z" transform="translate(0.751 0.75)" fill="none" stroke={props.Color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
            </G>
        </Svg>




    )
};
