import {StyleSheet} from "react-native";
import React from 'react';
import {View, TouchableOpacity} from 'react-native-ui-lib';
import Colors from '../Style/Colors';
import {BookMarkIcon} from "../Icons/BookMarkIcon";
import {SearchIcon} from '../Icons/SearchIcon';
import Logo from '../assets/images/Logo.svg';
import {MenuIcon} from "../Icons/MenuIcon";
import {OrdersIcon} from "../Icons/OrdersIcon";
import {BellIcon} from "../Icons/BellIcon";

export default class HomeNavBar extends React.PureComponent {

    render() {
        return (
            <View row centerV style={styles.NavBar}>
                <TouchableOpacity
                    marginH-20 br100
                    onPress={() => {
                        this.props.navigateMenu();
                    }}
                >
                    <MenuIcon size={28} Color={Colors.black}/>
                </TouchableOpacity>
                <View marginR-20 marginL-10 flex-1 row>
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
                        marginH-8 br100
                        onPress={() => {
                            this.props.navigateNotifications();
                        }}
                    >
                        <BellIcon size={22} Color={Colors.black}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        marginH-8 br100
                        onPress={() => {
                            this.props.navigateBookMark();
                        }}
                    >
                        <BookMarkIcon size={24} Fill={false} Color={Colors.black}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        marginL-8 marginR-20 br100
                        onPress={() => {
                            this.props.navigateCart();
                        }}
                    >
                        <OrdersIcon size={22} Color={Colors.black}/>
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
