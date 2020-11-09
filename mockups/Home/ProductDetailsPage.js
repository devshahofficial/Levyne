import React, { Component,Fragment } from 'react'
import {ScrollView} from "react-native"

import NavbarBack from "../../components/NavBarBack"
import ImageCarousel from "../../components/ImageCarousel"

export default class ProductDetailsPage extends Component {
    render() {
        return (
            <Fragment>
                <NavbarBack Title={"#RS00011"} Navigation={this.props.navigation.goBack}/>
                <ScrollView>
                    {/* <ImageCarousel></ImageCarousel> */}
                </ScrollView>
            </Fragment>
        )
    }
}
