import {G, Path, Svg} from "react-native-svg";
import React from "react";

export const CustomizeIcon = (props) => {
    return (
        <Svg id="Iconly_Light_Edit_Square" data-name="Iconly/Light/Edit Square" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <G id="Edit_Square" data-name="Edit Square" transform="translate(2 2)">
                <Path id="Stroke_1" data-name="Stroke 1" d="M8.742,0H5C1.928,0,0,2.177,0,5.259v8.314c0,3.082,1.919,5.259,5,5.259h8.824c3.085,0,5-2.177,5-5.259V9.545" transform="translate(0.75 0.789)" fill="none" stroke={props.Color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                <Path id="Stroke_3" data-name="Stroke 3" d="M.729,8.17,8.2.7a2.385,2.385,0,0,1,3.371,0L12.79,1.914a2.383,2.383,0,0,1,0,3.371L5.281,12.795a2.171,2.171,0,0,1-1.535.636H0l.094-3.78A2.17,2.17,0,0,1,.729,8.17Z" transform="translate(6.099 0.75)" fill="none" stroke={props.Color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                <Path id="Stroke_5" data-name="Stroke 5" d="M0,0,4.566,4.566" transform="translate(13.165 2.602)" fill="none" stroke={props.Color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
            </G>
        </Svg>

    )
};
