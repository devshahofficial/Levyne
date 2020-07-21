import {G, Rect, Svg} from "react-native-svg";
import React from "react";

export const CategoriesIcon = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 26 26">
            <G id="Group_3914" data-name="Group 3914" transform="translate(-3212 221)">
                <Rect id="Rectangle_456" data-name="Rectangle 456" width="10" height="10" rx="3" transform="translate(3213 -220)" fill="#fff" stroke={props.Color} stroke-width="2"/>
                <Rect id="Rectangle_457" data-name="Rectangle 457" width="10" height="10" rx="3" transform="translate(3227 -220)" fill="none" stroke={props.Color} stroke-width="2"/>
                <Rect id="Rectangle_458" data-name="Rectangle 458" width="10" height="10" rx="3" transform="translate(3213 -206)" fill="none" stroke={props.Color} stroke-width="2"/>
                <Rect id="Rectangle_459" data-name="Rectangle 459" width="10" height="10" rx="3" transform="translate(3227 -206)" fill="none" stroke={props.Color} stroke-width="2"/>
            </G>
        </Svg>

    )
};
