import React from 'react';
import {TextArea,Colors} from "react-native-ui-lib";
import CstmShadowView from "./CstmShadowView";

export default class CstmInput extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <CstmShadowView style={{paddingLeft: 20,...this.props.style}}>
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
