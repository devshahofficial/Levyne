import React, { Component } from 'react';
import {View, Text} from 'react-native-ui-lib';
import TextNavBar from '../components/TextNavBar';

export default class Pending extends Component {
    render() {
        return(
            <>
                <TextNavBar Title={'Account Status'}/>
                <View flex centerV centerH paddingH-50>
                    <Text b1 grey30 center>Your documents are getting verified by our team.</Text>
                    <Text h3 marginT-10 primary center>You will be informed as soon as your account is ready to be used.</Text>
                </View>
            </>
        );
    }
}
