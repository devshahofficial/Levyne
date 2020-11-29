import React, { Component } from 'react'
import {StyleSheet} from "react-native"
import {View, Image, Text, Checkbox} from "react-native-ui-lib"
import Colors from "../Style/Colors";
import {StarIcon} from '../Icons/StarIcon';
import CstmShadowView from './CstmShadowView';

// Props of the component:-
// OrderId
// ImageUrl
// Type
// CurrentPrice
// SlashedPrice

export default class ProductStatus extends Component {
    constructor(props){
        super(props)
        this.state = {
            enable1 : false,
            enable2: false,
            enable3: false,
            step:1,
        }
    }

    setSelection(){
        this.state.step = !this.state.enable1 ? 2:1
        // {console.log(this.state.step)}
        this.setState({enable1: !this.state.enable1, step: this.state.step})
    }

    setSelection2(){
        this.state.step = !this.state.enable2 ? 3:2
        // {console.log(this.state.step)}
        this.setState({enable2: !this.state.enable2, step: this.state.step})
    }

    render() {
        return (
            <CstmShadowView style={styles.Container}>
                <View paddingV-10 style={styles.TopText}>
                    <Text>
                        Order received on: 8th August, 2020
                    </Text>
                </View>
                <View row>
                    <Image
                        style={styles.Image}
                        source={{uri: this.props.ImageUrl}}
                    />
                    <View paddingH-30>
                        <Text style={styles.OrderId}>
                            Order ID : {this.props.OrderId}
                        </Text>
                        <Text style={styles.Type}>
                            {this.props.Type}
                        </Text>
                        <View row paddingT-15>
                            <Text style={styles.CurrentPrice}>
                                ₹{this.props.CurrentPrice}
                            </Text>
                            <Text style={styles.SlashedPrice}>
                                ₹{this.props.SlashedPrice}
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    {/* First one */}
                    <View row paddingL-20 paddingT-15 paddingB-10 >
                        <Checkbox 
                            value={this.state.enable1}
                            onValueChange={() => this.setSelection()}
                            style={styles.CheckBox}
                            color={Colors.primary}
                            size={28}
                        />
                        <Text style={styles.CheckBoxText}>
                            Production Started
                        </Text>
                        <Text style={styles.Icon}>
                            <StarIcon 
                            key={1} 
                            fill={true} 
                            height={28} 
                            width={28}
                            Color={Colors.primary} 
                        />
                        </Text>
                    </View>
                    {/* Second one */}
                    {!this.state.enable1 && (
                        <View row paddingL-20 paddingV-10>
                            <Checkbox 
                                value={this.state.enable2}
                                onValueChange={() => this.setSelection2()}
                                style={styles.CheckBoxFalse}
                                color={Colors.primary}
                                disabled={true}
                                size={28}
                            />
                            <Text style={styles.CheckBoxTextFalse}>
                                Production Started
                            </Text>
                            <Text style={styles.Icon}>
                                <StarIcon 
                                key={1} 
                                fill={true} 
                                height={28} 
                                width={28}
                                Color={Colors.secondary} 
                            />
                            </Text>
                        </View>
                    )}
                    {this.state.enable1 && (
                        <View row paddingL-20 paddingV-10>
                            <Checkbox 
                                value={this.state.enable2}
                                onValueChange={() => this.setSelection2()}
                                style={styles.CheckBox}
                                color={Colors.primary}
                                size={28}
                            />
                            <Text style={styles.CheckBoxText}>
                                Production Started
                            </Text>
                            <Text style={styles.Icon}>
                                <StarIcon 
                                key={1} 
                                fill={true} 
                                height={28} 
                                width={28}
                                Color={Colors.primary} 
                            />
                            </Text>
                        </View>
                    )}
                    {/* Third one */}
                    {!this.state.enable2 && (
                        <View row paddingL-20 paddingV-10>
                            <Checkbox 
                                value={this.state.enable2}
                                onValueChange={() => this.setSelection2()}
                                style={styles.CheckBoxFalse}
                                color={Colors.primary}
                                disabled={true}
                                size={28}
                            />
                            <Text style={styles.CheckBoxTextFalse}>
                                Production Started
                            </Text>
                            <Text style={styles.Icon}>
                                <StarIcon 
                                key={1} 
                                fill={true} 
                                height={28} 
                                width={28}
                                Color={Colors.secondary} 
                            />
                            </Text>
                        </View>
                    )}

                    {this.state.enable2 && (
                        <View row paddingL-20 paddingV-10>
                            <Checkbox 
                                value={this.state.enable3}
                                onValueChange={() => this.setState({enable3: !this.state.enable3})}
                                style={styles.CheckBox}
                                color={Colors.primary}
                                size={28}
                            />
                            <Text style={styles.CheckBoxText}>
                                Production Started
                            </Text>
                            <Text style={styles.Icon}>
                                <StarIcon 
                                key={1} 
                                fill={true} 
                                height={28} 
                                width={28}
                                Color={Colors.primary} 
                            />
                            </Text>
                        </View>
                    )}
                </View>
            </CstmShadowView>
        )
    }
}

const styles = StyleSheet.create({
    Container:{
        borderRadius: 25,
        margin:15,
        height:355,
        shadowColor: Colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 30,
        shadowOffset: {width: 0,height: 3},
        backgroundColor: Colors.white,
    },
    TopText:{
        alignItems: "center",
        borderRadius: 25,
    },
    Image:{
        height: 150,
        width: 150
    },
    OrderId:{
        fontWeight:"bold",
        paddingTop:20,
        fontSize: 15
    },
    Type:{
        paddingTop:5
    },
    CurrentPrice:{
        color: Colors.primary,
        fontWeight:"700"
    },
    SlashedPrice:{
        paddingLeft:10,
        color: Colors.secondary,
        textDecorationLine: 'line-through',
    },
    CheckBox:{
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    CheckBoxFalse:{
        borderWidth: 2,
        borderColor: Colors.secondary,
    },
    CheckBoxText:{
        width: "60%",
        paddingTop:5,
        paddingLeft: 40,
        fontSize: 17,
        fontWeight: "500"
    },
    CheckBoxTextFalse:{
        width: "60%",
        paddingTop:5,
        paddingLeft: 40,
        fontSize: 17,
        fontWeight: "500",
        color: Colors.secondary
    },
    Icon:{
        paddingTop:5,
    }
})