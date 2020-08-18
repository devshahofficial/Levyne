import React from 'react';
import {Svg,Path,G} from 'react-native-svg';

export const MapIcon = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 42.759 57.876">
            <G id="location" transform="translate(-48.08)">
                <G id="Group_3978" data-name="Group 3978" transform="translate(48.08)">
                    <G id="Group_3977" data-name="Group 3977" transform="translate(0)">
                        <Path id="Path_5255" data-name="Path 5255" d="M69.46,0A21.4,21.4,0,0,0,48.08,21.38a24.667,24.667,0,0,0,1.813,8.231,34.478,34.478,0,0,0,2.471,4.622L67.024,56.443a2.788,2.788,0,0,0,4.872,0l14.66-22.212a34.335,34.335,0,0,0,2.471-4.622,24.66,24.66,0,0,0,1.812-8.231A21.4,21.4,0,0,0,69.46,0ZM86.708,28.635a31.591,31.591,0,0,1-2.252,4.213L69.8,55.06c-.289.439-.381.439-.67,0L54.465,32.848a31.606,31.606,0,0,1-2.252-4.214A22.39,22.39,0,0,1,50.6,21.38a18.864,18.864,0,0,1,37.729,0A22.409,22.409,0,0,1,86.708,28.635Z" transform="translate(-48.08)" fill={props.Color}/>
                        <Path id="Path_5256" data-name="Path 5256" d="M123.4,64.008a11.319,11.319,0,1,0,11.319,11.319A11.332,11.332,0,0,0,123.4,64.008Zm0,20.122a8.8,8.8,0,1,1,8.8-8.8A8.814,8.814,0,0,1,123.4,84.13Z" transform="translate(-102.019 -53.946)" fill={props.Color}/>
                    </G>
                </G>
            </G>
        </Svg>

    )
};
