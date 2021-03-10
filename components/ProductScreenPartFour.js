import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import Colors from '../Style/Colors';
import PaymentSVG from "../assets/images/AppImages/Payment.svg";

const deviceWidth = Dimensions.get('window').width;

export default class ProductScreenPartFour extends React.Component {

    render() {
        return (
            <View marginT-40 marginH-15>
                <View center style={{height:80}}>
                    <PaymentSVG width={"80%"}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
