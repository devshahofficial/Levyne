import React, { Component } from 'react'
import {View, Text} from'react-native-ui-lib';
import TopDesigners from "../../components/topDesigners";
import BrandItemContainer from "../../components/BrandItemContainer";


export default class CustomHome extends Component {
    render() {
        return (
            <View flex>
                <TopDesigners Data={imgUrlsTopDesigners} />
                <BrandItemContainer item={urlsBrandItemContainer} />
            </View>
        )
    }
}

const imgUrlsTopDesigners = [
    {
        id:'1',
        source:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
        id:'2',
        source:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
        id:'3',
        source:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    }
]

const urlsBrandItemContainer = 
{
    ProfileImage:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    Name:"Hardy",
    About:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt sed at nihil consequatur repellat minima blanditiis quidem rem possimus ullam.",
    ratings:3.5,
}