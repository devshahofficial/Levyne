import {Dimensions, ImageBackground, Platform, StyleSheet} from "react-native";
import React from 'react';
import {View, Text, Colors, TouchableOpacity, Avatar} from 'react-native-ui-lib';
import {StarIcon} from "../Icons/StarIcon";

const screenWidth = Dimensions.get('window').width;

const Stars = (props) => {
    let i;
    const stars = [];
    for (i = 0; i < props.BrandRating; i++) {
        stars.push(true);
    }
    for (i = props.BrandRating; i < 5; i++) {
        stars.push(false);
    }
    return stars.map((name, i) => {
        return (
            <StarIcon
                key={i.toString()}
                Fill={name}
                height={15}
                width={15}
                Color={Colors.primary}
            />
        );
    });
};

export default class OrdersContainer extends React.Component {

    Process(param) {
        switch(param) {
            case 0:
                return <><Text hb3>Order Accepted</Text></>;
            case 1:
                return <><Text hb3>Under production</Text></>;
            case 2:
                return <><Text hb3>Out for delivery</Text></>;
            case 3:
                return <><Text hb3>Delivered</Text></>;
        }
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.Container}
                paddingH-20
                marginB-20
                onPress={() => this.props.NavigateMyOrdersDetailed(this.props.OrderID)}
                activeOpacity={0.8} marginT-10
            >
                <View style={styles.OrderID} spread>
                    <Text h2 secondary>Order ID</Text>
                    <Text hb1>128876</Text>
                </View>
                <View row>
                    <Avatar
                        size={50}
                        source={{uri : this.props.ProfileImage}}
                    />
                    <View marginL-25 centerV>
                        <Text hb2>
                            {this.props.Name}
                        </Text>
                        <View row>
                            <Stars BrandRating="0" />
                        </View>
                    </View>
                </View>
                <View row marginV-15>
                    <View>
                        <Text h2 secondary>Total</Text>
                        <Text h2 secondary>Discount</Text>
                    </View>
                    <View marginL-10>
                        <Text hb1>₹{this.props.TotalDiscountAmount}</Text>
                        <Text h1 primary>{parseInt(((this.props.TotalAmount - this.props.TotalDiscountAmount)/this.props.TotalAmount)*100)}% off</Text>
                    </View>
                </View>
                <Text h3 center secondary>Delivers for free within 15 days!</Text>
                <View marginT-5 style={styles.COD} center>
                    <Text hb1 secondary>Cash On Delivery</Text>
                </View>

                <View style={styles.Process} center>
                    <Text hb3 white>{this.Process(2)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    OrderID:{
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 5
    },
    image: {
        paddingTop: Platform.OS === 'ios' ? 5 : 0,
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    View: {
        height: 50,
        margin: -20,
        marginTop:10,
        backgroundColor: Colors.shadow,
    },
    Container: {
        width: screenWidth*0.9,
        borderWidth: 1,
        padding: 10,
        borderColor: Colors.shadow
    },
    COD: {
        height: 50,
        backgroundColor: Colors.shadow
    },
    Cancel: {
        borderWidth: 1,
        borderColor: Colors.shadow,
        width: 70,
        borderRadius: 5,
        height: 30
    },
    Process: {
        backgroundColor: Colors.primary,
        borderRadius: 5,
        marginVertical: 10,
        height: 30
    }
});
