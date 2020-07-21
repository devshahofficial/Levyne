import React, { Component } from 'react';
import {View} from 'react-native-ui-lib';
import NavBarBack from '../components/NavBarBack';

export default class FAQscreen extends Component {
    render() {
        return(
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Frequently Asked Questions'}/>
                <View flex></View>
            </>
        );
    }
}

