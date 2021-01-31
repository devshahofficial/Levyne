import React from 'react';
import {TextArea,Colors} from "react-native-ui-lib";
import CstmShadowView from "./CstmShadowView";
import {Platform} from 'react-native';

export default class CstmInput extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <CstmShadowView style={{paddingLeft: 30,...this.props.style}}>
                <TextArea
                    hideUnderline
                    blurOnSubmit = {true}
                    placeholderTextColor = {Colors.secondary}
                    {...this.props}
                />
            </CstmShadowView>
        );
    };
}
