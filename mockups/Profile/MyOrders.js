import React, { Component } from 'react';
import {View} from 'react-native-ui-lib';
import NavBarBack from '../../components/NavBarBack';
import OrdersContainer from "../../components/OrdersContainer";

export default class MyOrders extends Component {
    render() {
        return(
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Orders'}/>
                <View paddingH-15 flex centerH>
                    <OrdersContainer/>
                </View>
            </>
        );
    }
}

