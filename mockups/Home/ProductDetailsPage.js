import React, { Component } from 'react'
import {ScrollView} from "react-native"

import NavbarBack from "../../components/NavBarBack"
import ImageCarousel from "../../components/ImageCarousel"

export default class ProductDetailsPage extends Component {
    render() {
        return (
            <>
                <NavbarBack Title={"#RS00011"} Navigation={this.props.navigation.goBack}/>
                <ScrollView>
                    {/* <ImageCarousel></ImageCarousel> */}
                </ScrollView>
            </>
        )
    }
}
