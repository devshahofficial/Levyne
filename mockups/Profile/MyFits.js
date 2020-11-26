import React, { Component } from 'react';
import {View, FlatList, Text} from 'react-native-ui-lib';
import {StyleSheet} from "react-native"
import Input from "../../components/input"
import NavBarBack from '../../components/NavBarBack';

export default class MyFits extends Component {
    constructor(props){
        super(props)
        this.state = {
            apiTemp : [
                {
                    name:"Arms",
                    subCategories: [
                        {
                            name:"Biceps",
                            val: 15
                        },
                        {
                            name:"Triiceps",
                            val: 15
                        },
                        {
                            name:"Wrist",
                            val: 15
                        },
                    ]
                },
                {
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
                }
            ]
        }
    }

    render() {
        return(
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Fits and Sizes'}/>
                <View row>
                    {this.state.apiTemp.map(item=>{
                        <View row>
                            <Text style={styles.HeaderStyle}>
                                {item.name}
                            </Text>
                            <View row style={styles.InnerElementsContainer}>
                                {item.subCategories.map(ele => {
                                    <>
                                        <Text style={styles.InnerElements}>{ele.name}</Text>
                                        <Input placeholder={ele.val}></Input>
                                    </>
                                })}
                            </View>
                        </View>
                    })}
                </View>
            </>
        );
    }
}

const apiTemp = [
    {
        name:"Arms",
        subCategories: [
            {
                name:"Biceps",
                val: 15
            },
            {
                name:"Triiceps",
                val: 15
            },
            {
                name:"Wrist",
                val: 15
            },
        ]
    },
    {
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
    }
]

const styles = StyleSheet.create({
    HeaderStyle:{

    },
    InnerElementsContainer:{

    },
    InnerElements:{

    },
    Values:{

    }
})