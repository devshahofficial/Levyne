import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {Button, Colors} from "react-native-ui-lib";
import ShadowView from "react-native-simple-shadow-view/src/ShadowView";

/**
 * @type {React.PureComponent}
 * @extends {React.PureComponent<{ButtonA: string, ButtonActionA: (BrandID: number) => void, ButtonB: string, ButtonActionB: () => void, BrandID: number}>}
 **/


export default class ConstBottomButton extends React.PureComponent {

    render() {
        return (
            <SafeAreaView style={styles.Main}>
                {this.props.ButtonA && (
                    <ShadowView style={styles.ShadowView}>
                        <Button
                            onPress={() => this.props.ButtonActionA(this.props.BrandID)}
                            style={[styles.Button,{borderColor: Colors.white}]}
                            h1 label={this.props.ButtonA}
                        />
                    </ShadowView>
                )}
                <ShadowView style={styles.ShadowView}>
                    <Button
                        onPress={this.props.ButtonActionB}
                        disabled={this.props.disabled}
                        style={[styles.Button,{backgroundColor: Colors.primary}]}
                        h1 label={this.props.ButtonB} color={Colors.white}
                    />
                </ShadowView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    Main: {
        flexDirection:'row',
        backgroundColor:Colors.white
    },
    ShadowView: {
        flex:1,
        shadowColor: Colors.grey50,
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {width: 0,height: -0.5},
        backgroundColor:Colors.white,
    },
    Button: {
        height:50,
        borderRadius:0,
        backgroundColor:Colors.white,
        borderColor: Colors.white
    }
});
