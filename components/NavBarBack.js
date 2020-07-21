import {StyleSheet} from "react-native";
import React from 'react';
import {View, Text, Colors, TouchableOpacity} from 'react-native-ui-lib';
import {BackArrowIcon} from '../Icons/BackArrowIcon';

export default class NavBarBack extends React.PureComponent {

    render() {
        return (
            <View row centerV left paddingL-10 style={styles.NavBar}>
                <TouchableOpacity onPress={this.props.Navigation}><BackArrowIcon/></TouchableOpacity>
                <Text h1 marginL-20>{this.props.Title}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    NavBar:{
        height:50
    },
});
