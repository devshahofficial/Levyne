import React from 'react';
import {Svg,Rect,G} from 'react-native-svg';

export const MenuIcon = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22">
            <G id="Group_3911" data-name="Group 3911" transform="translate(6439 335)">
                <Rect id="Rectangle_449" data-name="Rectangle 449" width="2" height="22" rx="1.5" transform="translate(-6432.835 -335)" fill={props.Color}/>
                <Rect id="Rectangle_450" data-name="Rectangle 450" width="2" height="11" rx="1.5" transform="translate(-6426 -329)" fill={props.Color}/>
                <Rect id="Rectangle_451" data-name="Rectangle 451" width="2" height="11" rx="1.5" transform="translate(-6439 -329)" fill={props.Color}/>
            </G>
        </Svg>



    )
};
