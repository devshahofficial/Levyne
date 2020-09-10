import React, { Component } from 'react';
import {View,Text} from 'react-native-ui-lib';
import NavBarBack from '../../components/NavBarBack';

export default class TermsConditionsScreen extends Component {
    render() {
        return(
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Terms and Conditions'}/>
                <View flex></View>
            </>
        );
    }
}

