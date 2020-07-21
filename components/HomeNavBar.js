import {StyleSheet} from "react-native";
import React from 'react';
import {View, TouchableOpacity} from 'react-native-ui-lib';
import Colors from '../Style/Colors';
import {BookMarkIcon} from "../Icons/BookMarkIcon";
import {SearchIcon} from '../Icons/SearchIcon';
import {SettingsIcon} from '../Icons/SettingsIcon';
import Logo from '../assets/images/Logo.svg';

export default class HomeNavBar extends React.PureComponent {

    render() {
        return (
            <View row centerV style={styles.NavBar}>
                <View marginL-15 flex-1>
                    <Logo width='70%'/>
                </View>
                <View flex row centerV right>
                    <TouchableOpacity
                        marginL-5 marginR-8 br100
                        onPress={() => {
                            this.props.navigateSearch();
                        }}
                    >
                        <SearchIcon size={28} Color={Colors.black}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        marginL-8 marginR-8 br100
                        onPress={() => {
                            this.props.navigateBookMark();
                        }}
                    >
                        <BookMarkIcon size={24} Fill={false} Color={Colors.black}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        marginL-8 marginR-15 br100
                        onPress={() => {
                            this.props.navigateSettings();
                        }}
                    >
                        <SettingsIcon size={22} Color={Colors.black}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    NavBar:{
        height:50,
    },
});
