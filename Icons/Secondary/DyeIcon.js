import React from 'react';
import {Svg,Path} from 'react-native-svg';

export const DyeIcon = (props) => {
    return (
        <Svg id="hair-color-sample" xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 512 512">
            <Path id="Path_5302" data-name="Path 5302" d="M375.822,220.844,268.258,68.354a15,15,0,0,0-24.516,0L136.178,220.844A146.02,146.02,0,0,0,109.3,297.979,148.481,148.481,0,0,0,177.479,429.5a148.257,148.257,0,0,0,157.042,0A148.481,148.481,0,0,0,402.7,297.979,146.017,146.017,0,0,0,375.822,220.844Zm-223.371,138.2c-20.436-39.422-17.354-84.62,8.241-120.9L256,103.022l39.526,56.035L245.584,209.6c-4.273,3.94-38.194,36.535-38.194,78.02,0,29.073,16.661,53.772,28.108,67.316l-44.182,47.857a116.691,116.691,0,0,1-38.865-43.753ZM256,332.643c-8.259-10.4-18.611-27.02-18.611-45.021S247.746,252.992,256,242.6c8.259,10.4,18.611,27.02,18.611,45.02S264.254,322.253,256,332.643Zm103.548,26.4C339.114,398.464,300.4,422,256,422a119.241,119.241,0,0,1-36.409-5.606l47.019-50.931c5.036-4.689,38-36.949,38-77.841,0-28.807-16.36-53.323-27.8-66.945l36.278-36.715,38.214,54.175c25.6,36.285,28.677,81.483,8.242,120.9Z" fill={props.Color}/>
            <Path id="Path_5303" data-name="Path 5303" d="M467,0H45A45.051,45.051,0,0,0,0,45V467a45.051,45.051,0,0,0,45,45H467a45.051,45.051,0,0,0,45-45V45A45.051,45.051,0,0,0,467,0Zm15,467a15.017,15.017,0,0,1-15,15H45a15.017,15.017,0,0,1-15-15V45A15.017,15.017,0,0,1,45,30H467a15.017,15.017,0,0,1,15,15Z" fill={props.Color}/>
            <Path id="Path_5304" data-name="Path 5304" d="M180,75a15,15,0,0,0-15-15H75a15,15,0,0,0,0,30h90A15,15,0,0,0,180,75Z" fill={props.Color}/>
        </Svg>

    )
};