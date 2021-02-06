import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import Colors from "../Style/Colors";
/**
 * @extends {RNView}
 */
// @ts-ignore
const ShadowView = require("react-native-simple-shadow-view").default;

/**
 * @type {React.PureComponent}
 * @extends {React.PureComponent<{style: ViewStyle}>}
 **/


export default class CstmShadowView extends React.PureComponent {

    render() {
        return (
            <ShadowView style={{...styles.ShadowView,...this.props.style}}>
                {this.props.children}
            </ShadowView>
        );
    };
}


const styles = StyleSheet.create({
    ShadowView: {
        borderRadius: 100,
        marginTop:15,
        height:50,
        shadowColor: Colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {width: 0,height: 1},
        backgroundColor: Colors.white,
    }
});

