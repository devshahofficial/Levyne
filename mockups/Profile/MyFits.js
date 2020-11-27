import React, { Component } from 'react';
import {View,  Text, Image, Carousel,TouchableOpacity} from 'react-native-ui-lib';
import {StyleSheet, ScrollView} from "react-native";
import Input from "../../components/input";
import Colors from '../../Style/Colors';
import SearchBar from "../../components/SearchBar";
import CstmShadowView from "../../components/CstmShadowView";
import NavBarBack from '../../components/NavBarBack';
import {RightIcon} from "../../Icons/RightIcon";

export default class MyFits extends Component {
    constructor(props){
        super(props)
        this.state = {
            imgUrls:[
                {
                    id:1,
                    src:"https://images.unsplash.com/photo-1562373353-7db88744f982?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGRyZXNzfGVufDB8fDB8&auto=format&fit=crop&w=500&q=60",
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
                    src:"https://images.unsplash.com/photo-1530893608544-cd10fda1ac14?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8ZHJlc3N8ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60",
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
                    src:"https://images.unsplash.com/photo-1599255260684-682356f09ab1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTh8fGRyZXNzfGVufDB8fDB8&auto=format&fit=crop&w=500&q=60",
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
                }
            ],
        }
    }

    render() {
        return(
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Fits and Sizes'}/>
                <View row centerV paddingH-10>
                    <SearchBar flex={8}/>
                    <CstmShadowView style={styles.Submit}>
                        <TouchableOpacity flex center style={{borderRadius: 20}}>
                            <RightIcon size={20} Color={Colors.primary}/>
                        </TouchableOpacity>
                    </CstmShadowView>
                </View>
                <Carousel>

                    {this.state.imgUrls.map((page, index) => (
                        <ScrollView>
                            <CstmShadowView style={{height: 375, borderRadius: 20,margin: 15, padding:0}}>
                                <Image
                                    source = {{uri: page.src}}
                                    height={350}
                                    style={styles.ImageCSS}
                                />
                            </CstmShadowView>
                            <View style={styles.Outer}>
                                <Text style={styles.HeaderStyle}>
                                    {page.name}
                                    {console.log(page)}
                                </Text>
                                <View style={styles.InnerElementsContainer}>
                                    {page.subCategories.map((ele) => (
                                        <View row key={ele.name}>
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
                        </ScrollView>
                    ))}
                </Carousel>
            </>
        );
    }
}

const styles = StyleSheet.create({
    ImageCSS: {
        marginHorizontal: 15,
        marginTop: 12,
        borderRadius: 15
    },
    Outer:{
        flexDirection: "column",
        paddingLeft: 20
    },
    HeaderStyle:{
        margin: 10,
        paddingTop: 10,
        fontSize: 18,
        paddingLeft: 5,
        marginRight: "70%",
        borderColor: "white",
        borderBottomColor: Colors.primary,
        borderWidth: 2
    },
    InnerElementsContainer:{
        paddingBottom: 50
    },
    InnerElements:{
        padding: 25,
        fontSize: 15
    },
    InnerText:{
        width: "40%",
        marginRight:"10%"
    },
    InputBox: {
        width: "60%",
        justifyContent: "center"
    },
    Submit: {
        flex:1,
        height:"auto",
        width:"auto",
        margin:10,
        justifyContent: "center",
        alignContent: "center",
    }
})
