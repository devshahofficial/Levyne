import {Platform, StyleSheet} from "react-native";
import React from 'react';
import {View, TouchableOpacity} from 'react-native-ui-lib';
import Colors from '../Style/Colors';
import BookMarkIcon from "../Icons/BookMarkIcon";
import {SearchIcon} from '../Icons/SearchIcon';
import Logo from '../assets/images/Logo.svg';
import {CheckoutIcon} from "../Icons/CheckoutIcon";
import {QRCodeIcon} from "../Icons/QRCodeIcon";
import { withSafeAreaInsets } from 'react-native-safe-area-context';

type HomeNavBarProps = {
    navigateSearchText: () => void,
    navigateQRCode: () => void,
    navigateBookMark: () => void,
    navigateOrders: () => void,
}

class HomeNavBar extends React.PureComponent<HomeNavBarProps> {

    render() {
        return (
            <View row centerV style={styles.NavBar}>
                <View marginH-20 row>
                    <Logo width='55%' height='50'/>
                </View>
                <View flex row centerV right>
                    <TouchableOpacity
                        marginL-12 marginR-12 br100
                        onPress={this.props.navigateSearchText}
                    >
                        <SearchIcon size={28} Color={Colors.black}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        marginR-12 br100
                        onPress={this.props.navigateQRCode}
                    >
                        <QRCodeIcon size={22} Color={Colors.black}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        marginR-12 br100
                        onPress={this.props.navigateBookMark}
                    >
                        <BookMarkIcon size={24} Fill={false} Color={Colors.black}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        marginR-16 br100
                        onPress={this.props.navigateOrders}
                    >
                        <CheckoutIcon size={22} Fill={false} Color={Colors.black}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    NavBar:{
        height:50,
        zIndex:100
    },
});


export default withSafeAreaInsets(HomeNavBar);