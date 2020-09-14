import {Dimensions, ImageBackground, Platform, StyleSheet} from "react-native";
import React from 'react';
import {View, Text, Colors, TouchableOpacity, Avatar, Button} from 'react-native-ui-lib';
import {DeliveryIcon} from "../Icons/Secondary/DeliveryIcon";
import DeliveryChargeComponent from "./DeliveryChargeComponent";
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

    render() {
        return (
            <TouchableOpacity
                style={styles.Container}
                paddingH-20
                marginB-20
                activeOpacity={0.8} marginT-10
            >
                <View row>
                    <Avatar
                        size={50}
                        source={{uri : "https://www.sherrihill.com/dw/image/v2/BDBR_PRD/on/demandware.static/-/Sites-master-catalog-sherrihill/default/dw36182b79/images/Sherri-Hill-52368-nude-silver-41043.jpg?sw=1332&sh=2000"}}
                    />
                    <View marginL-25 centerV>
                        <Text hb2>
                            {"Couture"}
                        </Text>
                        <View row>
                            <Stars BrandRating="0" />
                        </View>
                    </View>
                </View>
                <View row marginV-10 centerV>
                    <ImageBackground
                        blurRadius={1}
                        imageStyle={{ borderRadius: 10}}
                        source={{ uri: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" }}
                        style={styles.image}
                    >
                        <Text f1 style={{lineHeight:30}} white center>
                            +{3}
                        </Text>
                    </ImageBackground>
                    <View row marginL-30>
                        <View>
                            <Text h2>Total</Text>
                            <Text h2>Discount</Text>
                        </View>
                        <View marginL-10>
                            <Text hb1>₹{10000}</Text>
                            <Text h1 primary>{10}% off</Text>
                        </View>
                    </View>
                </View>
                <Text h3 center secondary>Delivers for free within 15 days!</Text>
                <View marginT-5 style={styles.COD} center>
                    <Text hb1 secondary>Cash On Delivery</Text>
                </View>
                <Text marginT-20 h3 secondary>Note: Once the order gets accepted from our side, you won't be able to cancel the order.</Text>

                <View marginT-5>
                    <Button
                        label={"Cancel"}
                        style={styles.Cancel}
                        labelStyle={{fontSize: 12}}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
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
    }
});
