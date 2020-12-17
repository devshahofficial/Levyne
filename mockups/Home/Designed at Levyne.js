import React, { Component } from 'react'
import {FlatList, Linking, ScrollView, StyleSheet} from "react-native";
import {Text, TouchableOpacity, Colors, View} from 'react-native-ui-lib';

import NavbarBack from "../../components/NavBarBack"
import ProductItemContainer from "../../components/ProductItemContainer";
import LevyneProductContainer from "../../components/LevyneProductContainer";

export default class DesignedAtLevyne extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };

    render() {
        return (
            <>
                <NavbarBack Title={"Designed At Levyne"} Navigation={this.props.navigation.goBack}/>
                <View flex>
                    <LevyneProductContainer
                        Image={"https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-images.jpg"}
                        Name={"#RS0011"}
                    />
                </View>
                <View
                    center padding-10
                    style={{height:"auto", backgroundColor: Colors.grey70}}
                >
                    <Text h1 secondary center>"Designs at Levyne" is currently under testing, you can still place an order by calling us.</Text>
                </View>
            </>
        )
    }
}
