import React from 'react';
import { StyleSheet, Dimensions} from 'react-native';
import {Text, TouchableOpacity, View, Colors } from "react-native-ui-lib";
import ShadowView from 'react-native-simple-shadow-view'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class LowerComponent extends React.Component {

    render() {
        return (
            <TouchableOpacity onPress={() => (this.props.onLowerPressed(this.props.item.number))}>
                <ShadowView style={styles.shadow}>
                    <View style={this.props.item.number === this.props.selected ? styles.boxSelected : styles.box}>
                        <Text>hi</Text>
                    </View>
                </ShadowView>
                <Text style={styles.insideText}> {this.props.item.title} </Text>
            </TouchableOpacity>
        )
    }
}

const BOX_WIDTH = 70
const BOX_HEIGHT = 70
const BORDER_RADIUS = 16

const styles = StyleSheet.create({
    shadow: {
        height: BOX_HEIGHT,
        width: BOX_WIDTH,
        shadowColor: Colors.shadow,
        margin: 8,
        borderRadius: BORDER_RADIUS,
        shadowOpacity: 5,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 4 },
        backgroundColor: Colors.white,
        marginBottom: 20,
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        overflow:'hidden',
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
        borderColor:Colors.primary,
        borderWidth:2,
        borderStyle:'solid',
    },
    insideText: {
        fontSize: 15,
        textAlign:'center',
        textAlignVertical:'center',
        color: Colors.secondary,
    }
})


