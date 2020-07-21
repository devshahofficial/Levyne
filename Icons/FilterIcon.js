import React from 'react';
import {Svg,Path,G} from 'react-native-svg';

export const FilterIcon = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24">
            <G id="Group_3780" data-name="Group 3780" transform="translate(-34 74)">
                <G id="Group_3760" data-name="Group 3760" transform="translate(34 -74)">
                    <Path id="Path_1824" data-name="Path 1824" d="M90.447,94.172a1.227,1.227,0,0,0-1.094-.719H67.832a1.227,1.227,0,0,0-1.094.719,1.462,1.462,0,0,0,.065,1.394L75.122,109.1v7.68a.7.7,0,0,0,.28.567.582.582,0,0,0,.34.111.574.574,0,0,0,.247-.056l5.7-2.716a.683.683,0,0,0,.372-.622v-4.964l8.318-13.529A1.462,1.462,0,0,0,90.447,94.172ZM80.929,108.51a.724.724,0,0,0-.105.378v4.727l-4.463,2.126v-6.174H78.6a.681.681,0,0,0,0-1.356H76.071L69.833,98.063H82.354a.681.681,0,0,0,0-1.356H69l-1.167-1.9h21.52Z" transform="translate(-66.593 -93.453)" fill={props.Color}/>
                </G>
            </G>
        </Svg>


    )
};
