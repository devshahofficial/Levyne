import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import ShadowView from 'react-native-simple-shadow-view';
import Colors from "../Style/Colors";

export default class CstmShadowView extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ShadowView style={[styles.ShadowView,{...this.props.style}]}>
                {this.props.children}
            </ShadowView>
        );
    };
}


const styles = StyleSheet.create({
    ShadowView: {
        borderRadius: 100,
        paddingTop:Platform.OS === 'ios' ? 5:0,
        marginTop:15,
        height:50,
        shadowColor: Colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {width: 0,height: 3},
        backgroundColor: Colors.white,
    }
});

