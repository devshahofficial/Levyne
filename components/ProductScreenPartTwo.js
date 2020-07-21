import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import colors from "../assets/colors";
import {DescriptionCard} from "./ReadMore";

export default class ProductScreenPartTwo extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            pressCounter: 0
        }
    }

    render() {
        return (
            <View style={styles.partSecond}>
                <View style={{margin:10}}>
                    <View>
                        <Text style={{color:colors.trivisionBlue, fontWeight:'bold'}}>Product Description</Text>
                    </View>
                    <View>
                        <DescriptionCard CompleteDescription = {this.props.LongDescription} />
                    </View>
                </View>
            </View>

        );
    }

};

const styles = StyleSheet.create({
    partSecond:{
        marginTop: 30,
    },
    partSecondButton: {
        marginTop:10,
        flexDirection:'row',
        alignSelf:'center',
    },
    buttonPartSecond:{
        height:60,
        width:60,
        borderRadius:40,
        backgroundColor:colors.trivisionWhite,
        borderColor:colors.trivisionWhite,
        color:colors.trivisionBlue,
    },
    buttonGPartSecond:{
        backgroundColor:colors.trivisionWhite,
        borderColor:colors.trivisionWhite,
        borderRadius:30,
    },
    buttonG:{
        flex:1,
        marginLeft:10,
        marginRight:10,
        borderRadius:20,
        shadowColor: colors.trivisionShadow,
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {width: 0,height: 3},
        backgroundColor: colors.trivisionWhite,
    },
    buttonQuantity:{
        backgroundColor:colors.trivisionWhite,
        height:50,
        width:50,
        borderRadius:50,
        borderColor:colors.trivisionWhite
    },
    ShadowView: {
        borderRadius: 40,
        height:60,
        width:60,
        margin:10,
        shadowColor: colors.trivisionShadow,
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {width: 0,height: 3},
        backgroundColor: colors.trivisionWhite,
    },
    QuantityShadow:{
        borderRadius:50,
        shadowColor: colors.trivisionShadow,
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {width: 0,height: 3},
        backgroundColor: colors.trivisionWhite,
    }
});
