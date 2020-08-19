import React from 'react';
import {ImageBackground, StyleSheet, TouchableWithoutFeedback, Dimensions, Platform,} from 'react-native';
import {View, Text, Image, TouchableOpacity, Button, Avatar,Colors} from 'react-native-ui-lib';
import {StarIcon} from '../Icons/StarIcon';
import CstmShadowView from "./CstmShadowView";
import {DeliveryIcon} from "../Icons/Secondary/DeliveryIcon";

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

export default class BucketComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <TouchableOpacity
            style={styles.Container}
            paddingH-20
            activeOpacity={0.8} marginT-10
        >
            <View row>
                <Avatar
                    size={50}
                    source={{uri : "https://hivelife.com/wp-content/uploads/2019/12/Empire-International-Tailors-5-tips-suits-Hive-Life-banner.jpg"}}
                />
                <View marginL-25 centerV>
                    <Text hb2>
                        Levyne
                    </Text>
                    <View row>
                        <Stars BrandRating="4" />
                    </View>
                </View>
            </View>
            <View row marginV-10 centerV>
                <ImageBackground
                    blurRadius={1}
                    imageStyle={{ borderRadius: 10}}
                    source={{ uri: "https://sc02.alicdn.com/kf/HTB1nlCBKVXXXXXMXVXXq6xXFXXXO.jpg_350x350.jpg" }}
                    style={styles.image}
                >
                    <Text f1 style={{lineHeight:30}} white center>
                        +{2}
                    </Text>
                </ImageBackground>
                <View spread marginL-30>
                    <View row>
                        <View>
                            <Text h2>Total</Text>
                            <Text h2>Discount</Text>
                        </View>
                        <View marginL-10>
                            <Text hb1>10000</Text>
                            <Text h1 primary>10% off</Text>
                        </View>
                    </View>
                    <CstmShadowView>
                        <Button flex label="Checkout"/>
                    </CstmShadowView>
                </View>
            </View>
            <View center row style={styles.View}>
                <DeliveryIcon size={30} Color={Colors.black} />
                {1 === 1 ? (
                    <>
                        <Text marginL-10 h2>
                            Free Delivery!
                        </Text>
                    </>
                ) : (
                    <>
                        <Text marginL-10 h2>
                            Free Delivery on buckets over ₹1000{'/-'}
                        </Text>
                    </>
                )}
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
    }
});
