import {StyleSheet} from "react-native";
import React from 'react';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import {BackArrowIcon} from '../Icons/BackArrowIcon';
import {RightIcon} from "../Icons/RightIcon";

export default class NavBarBack extends React.PureComponent {

    render() {
        return (
            <View row centerV left paddingL-10 spread style={styles.NavBar}>
                <View row centerV>
                    <TouchableOpacity onPress={this.props.NavigateBack}>
                        <BackArrowIcon/>
                    </TouchableOpacity>
                    <Text h1 marginL-20>{this.props.Title}</Text>
                </View>
                <TouchableOpacity paddingR-10 onPress={this.props.SubmitForm}>
                    <RightIcon Color={Colors.black} size={26}/>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    NavBar:{
        height:50
    },
});
