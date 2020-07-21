import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from "../assets/colors";
import {Button} from "@ui-kitten/components";
import ShadowView from "react-native-simple-shadow-view/src/ShadowView";

export default class ConstBottomButton extends React.PureComponent {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.Main}>
                <ShadowView style={styles.ShadowView}>
                    <Button onPress={this.props.ButtonActionA} style={[styles.Button,{borderColor: colors.trivisionWhite}]} textStyle={styles.Text}>{this.props.ButtonA}</Button>
                </ShadowView>
                <ShadowView style={styles.ShadowView}>
                    <Button onPress={this.props.ButtonActionB} style={[styles.Button,{backgroundColor: colors.trivisionPink}]} textStyle={{color:colors.trivisionWhite}}>{this.props.ButtonB}</Button>
                </ShadowView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Main: {
        flexDirection:'row',
        backgroundColor:colors.trivisionWhite
    },
    ShadowView: {
        flex:1,
        shadowColor: colors.trivisionGrey,
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {width: 0,height: -1},
        backgroundColor:colors.trivisionWhite,
    },
    Button: {
        height:50,
        borderRadius:0,
        backgroundColor:colors.trivisionWhite,
        borderColor: colors.trivisionPink
    },
    Text: {
        color: colors.trivisionPink
    }
});
