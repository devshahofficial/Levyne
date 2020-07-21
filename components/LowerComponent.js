import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import colors from "../assets/colors";
import ShadowView from 'react-native-simple-shadow-view';
import Logo from '../assets/images/Logo.svg';


export default class LowerComponent extends Component {

    render() {
        return (
            <TouchableOpacity onPress={() => (this.props.onLowerPressed(this.props.item.number))}>
                <ShadowView style={styles.shadow}>
                    <View style={this.props.item.number === this.props.selected ? styles.boxSelected : styles.box}>
                        <Logo width={50}/>
                    </View>
                </ShadowView>
                <Text style={styles.insideText}> {this.props.item.title} </Text>
            </TouchableOpacity>
        )
    }
}

const BOX_WIDTH = 70;
const BOX_HEIGHT = 70;
const BORDER_RADIUS = 16;

const styles = StyleSheet.create({
    shadow: {
        height: BOX_HEIGHT,
        width: BOX_WIDTH,
        shadowColor: colors.trivisionShadow,
        margin: 8,
        borderRadius: BORDER_RADIUS,
        shadowOpacity: 2,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: colors.trivisionWhite,
        marginBottom: 20,
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        overflow:'visible',
    },
    box:{
        alignItems: 'center',
        justifyContent: 'center',
        height: BOX_HEIGHT,
        width: BOX_WIDTH,
    },
    boxSelected:{
        borderRadius: BORDER_RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        height: BOX_HEIGHT,
        width: BOX_WIDTH,
        borderColor:colors.trivisionPink,
        borderWidth:1.5,
        borderStyle:'solid',
    },
    insideText: {
        fontSize: 15,
        textAlign:'center',
        textAlignVertical:'center',
        color: colors.trivisionBlue,
    }
})


