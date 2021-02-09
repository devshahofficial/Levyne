import React from 'react';
import {TextArea,Colors} from "react-native-ui-lib";
import CstmShadowView from "./CstmShadowView";
import {TextInputProps, ViewStyle} from 'react-native';

/**
 * @type {React.PureComponent}
 * @extends {React.PureComponent<TextInputProps & {style?: ViewStyle}>}
 **/



export default class CstmInput extends React.PureComponent {

    render() {
        return (
            <CstmShadowView style={{paddingHorizontal: 30,
// @ts-ignore
            ...this.props.style}}>
                <TextArea
                    // @ts-ignore
                    hideUnderline
                    blurOnSubmit = {true}
                    placeholderTextColor = {Colors.secondary}
                    {...this.props}
                />
            </CstmShadowView>
        );
    };
}
