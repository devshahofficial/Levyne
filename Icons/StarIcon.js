import React from 'react';
import {Svg, G, Path} from 'react-native-svg';

export const StarIcon = (props) => {
    if (props.Fill === false) {
        return (
            <Svg id="Iconly_Light_Star" data-name="Iconly/Light/Star" width={props.width} height={props.height} viewBox="0 0 24 24">
                <G id="Star" transform="translate(2.5 3)">
                    <Path id="Star-2" data-name="Star" d="M10.214.441,12.53,5.1a.8.8,0,0,0,.6.437l5.185.749a.8.8,0,0,1,.528.307.769.769,0,0,1-.085,1.031L15,11.259a.76.76,0,0,0-.226.7l.9,5.128a.786.786,0,0,1-.652.892.862.862,0,0,1-.516-.08L9.888,15.478a.779.779,0,0,0-.742,0L4.494,17.912a.811.811,0,0,1-1.077-.33.792.792,0,0,1-.081-.5l.9-5.128a.787.787,0,0,0-.226-.7L.232,7.621a.786.786,0,0,1,0-1.115.91.91,0,0,1,.452-.223L5.87,5.534a.813.813,0,0,0,.6-.437L8.784.441a.784.784,0,0,1,.458-.4.8.8,0,0,1,.61.044A.818.818,0,0,1,10.214.441Z" stroke={props.Color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/>
                </G>
            </Svg>

        );
    }
    else {
        return (
            <Svg id="Iconly_Bold_Star" data-name="Iconly/Bold/Star" width={props.width} height={props.height} viewBox="0 0 24 24">
                <G id="Star" transform="translate(2 2.5)">
                    <Path id="Star-2" data-name="Star" d="M15.92,11.82a1.1,1.1,0,0,0-.319.97l.889,4.92a1.081,1.081,0,0,1-.45,1.08,1.1,1.1,0,0,1-1.17.08l-4.429-2.31a1.136,1.136,0,0,0-.5-.131H9.67a.811.811,0,0,0-.27.09L4.97,18.84a1.166,1.166,0,0,1-.71.11,1.111,1.111,0,0,1-.89-1.271l.89-4.92a1.121,1.121,0,0,0-.319-.979L.33,8.28A1.08,1.08,0,0,1,.061,7.15,1.122,1.122,0,0,1,.95,6.4l4.97-.721A1.111,1.111,0,0,0,6.8,5.07L8.99.58a1.017,1.017,0,0,1,.2-.27L9.28.24A.66.66,0,0,1,9.441.11L9.55.07,9.72,0h.421a1.122,1.122,0,0,1,.88.6L13.24,5.07a1.112,1.112,0,0,0,.83.609l4.97.721a1.134,1.134,0,0,1,.91.75,1.086,1.086,0,0,1-.29,1.13Z" transform="translate(0 0)" fill={props.Color}/>
                </G>
            </Svg>
        );
    }

};
