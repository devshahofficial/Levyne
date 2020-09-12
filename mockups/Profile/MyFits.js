import React, { Component } from 'react';
import {View} from 'react-native-ui-lib';
import NavBarBack from '../../components/NavBarBack';

export default class MyFits extends Component {
    render() {
        return(
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Fits and Sizes'}/>
                <View flex></View>
            </>
        );
    }
}

