import React, { Component } from 'react';
import {View,  Text} from 'react-native-ui-lib';
import {StyleSheet, FlatList} from "react-native"
import Input from "../../components/input"
import Colors from '../../Style/Colors';
import NavBarBack from '../../components/NavBarBack';

export default class MyFits extends Component {
    constructor(props){
        super(props)
        this.state = {
            apiTemp : [
                {
                    id:1,
                    name:"Arms",
                    subCategories: [
                        {
                            name:"Biceps",
                            val: 15
                        },
                        {
                            name:"Triceps",
                            val: 15
                        },
                        {
                            name:"Wrist",
                            val: 15
                        },
                    ]
                },
                {
                    id:2,
                    name:"Legs",
                    subCategories: [
                        {
                            name:"Calves",
                            val: 20
                        },
                        {
                            name:"Thighs",
                            val: 20
                        },
                        {
                            name:"Ankle",
                            val: 20
                        },
                    ]
                },
                {
                    id:3,
                    name:"Upper Body",
                    subCategories: [
                        {
                            name:"Chest",
                            val: 32
                        },
                        {
                            name:"Waist",
                            val: 28
                        },
                        {
                            name:"Hips",
                            val: 32
                        },
                    ]
                },
            ]
        }
    }

    // wordSizing(word){
    //     return word + " ".repeat(15-word.length)
    // }

    renderItem({item}){
        return (
            <View style={styles.Outer}>
                <Text style={styles.HeaderStyle}>
                    {item.name}
                </Text>
                <View style={styles.InnerElementsContainer}>
                    {item.subCategories.map(ele => (
                        <View row>
                            <View style={styles.InnerText}>
                                <Text style={styles.InnerElements}>{ ele.name }</Text>
                            </View>
                            <View style={styles.InputBox}>
                                <Input placeholder={`${ele.val}`} style={{width:"60%",paddingLeft:"25%",paddingTop:5}}></Input>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        )
    }

    render() {
        return(
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Fits and Sizes'}/>
                <FlatList
                    data={this.state.apiTemp}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
                <View>
                    {/* {this.state.apiTemp.map(item=>(
                        <View style={styles.Outer}>
                            <Text style={styles.HeaderStyle}>
                                {item.name}
                            </Text>
                            <View style={styles.InnerElementsContainer}>
                                {item.subCategories.map(ele => (
                                    <View row>
                                        <View style={styles.InnerText}>
                                            <Text style={styles.InnerElements}>{this.wordSizing( ele.name )}</Text>
                                        </View>
                                        <View style={styles.InputBox}>
                                            <Input placeholder={`${ele.val}`} style={{width:"60%",paddingLeft:"25%",paddingTop:5}}></Input>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))} */}
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    Outer:{
        flexDirection: "column",
        paddingLeft: 20
    },
    HeaderStyle:{
        margin: 10,
        fontSize: 18,
        // paddingLeft: 10,
        marginRight: "70%",
        borderColor: "white",
        borderBottomColor: Colors.primary,
        borderWidth: 2
    },
    InnerElementsContainer:{

    },
    InnerElements:{
        padding: 28,
        fontSize: 15
    },
    InnerText:{
        width: "40%",
        marginRight:"10%"
    },
    InputBox: {
        width: "60%",
        justifyContent: "center"
    }
})