import React from 'react';
import {Svg,Path,G} from 'react-native-svg';

export const PlusIcon = (props) => {
    return (
        <Svg id="Iconly_Light-outline_Plus" data-name="Iconly/Light-outline/Plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <G id="Plus" transform="translate(2 2)">
                <Path id="Plus-2" data-name="Plus" d="M5.641,20a5.478,5.478,0,0,1-4.092-1.642A6.024,6.024,0,0,1,0,14.107V5.893A6.018,6.018,0,0,1,1.552,1.644,5.475,5.475,0,0,1,5.641,0h8.717a5.478,5.478,0,0,1,4.092,1.643A6.024,6.024,0,0,1,20,5.893v8.213a6.024,6.024,0,0,1-1.549,4.251A5.478,5.478,0,0,1,14.359,20ZM1.395,5.893v8.213c0,2.732,1.667,4.5,4.246,4.5h8.717c2.579,0,4.246-1.766,4.246-4.5V5.893c0-2.732-1.667-4.5-4.246-4.5H5.641C3.062,1.395,1.395,3.161,1.395,5.893Zm7.914,7.6L9.3,13.4V10.688H6.589A.7.7,0,0,1,6.494,9.3l.095-.006H9.3V6.584a.7.7,0,0,1,1.389-.095l.006.095v2.71h2.714a.7.7,0,0,1,.095,1.389l-.095.006H10.7V13.4a.7.7,0,0,1-1.389.094Z" fill={props.Color}/>
            </G>
        </Svg>
    )
};
