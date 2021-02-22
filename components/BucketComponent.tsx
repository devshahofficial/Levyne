import React from 'react';
import { ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { View, Text, TouchableOpacity, Button, Avatar, Colors } from 'react-native-ui-lib';
import { DeliveryIcon } from "../Icons/Secondary/DeliveryIcon";
import DeliveryChargeComponent from '../components/DeliveryChargeComponent';
import StarIconsComponent from "./StarIconsComponent";
import CstmShadowView from "./CstmShadowView";
const screenWidth = Dimensions.get('window').width;


type NavigateBucket = (BucketID: number, BrandID: number, Name: string, TotalProducts: string, ProfileImage: { uri: string }) => void

type item = {
    BucketID: number,
    BrandID: number,
    Name: string,
    TotalProducts: string,
    ProfileImage: string,
    BrandRating: number,
    Status: 1 | 0 | boolean,
    BucketPrice: number,
    PrimaryImage: string,
    ProductsCount: number
}

type navigateChat = (BucketID: number, BrandName: string, BrandID: number, ChatProfileImage: { uri: string }) => void;

type navigateCheckout = (BucketID: number, BrandName: string, Status: 1 | 0 | boolean) => void;

type navigateBrand = (BrandID: number) => void;

export default class BucketComponent extends React.PureComponent<{ NavigateBucket: NavigateBucket, item: item, navigateBrand: navigateBrand, navigateChat: navigateChat, navigateCheckout: navigateCheckout }> {

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.NavigateBucket(
                    this.props.item.BucketID,
                    this.props.item.BrandID,
                    this.props.item.Name,
                    this.props.item.TotalProducts,
                    { uri: this.props.item.ProfileImage }
                )}
                marginB-20 paddingH-10
                activeOpacity={0.8} marginT-10
            >
                <CstmShadowView style={styles.ShadowContainer}>
                    <View row>
                        <Avatar
                            size={50}
                            source={{ uri: this.props.item.ProfileImage }}
                            onPress={() => this.props.navigateBrand(this.props.item.BrandID)}
                        />
                        <View marginL-25 centerV>
                            <Text hb1 numberOfLines={1} ellipsizeMode='tail'>
                                {this.props.item.Name}
                            </Text>
                            <View row marginT-5>
                                <StarIconsComponent BrandRating={Math.round(this.props.item.BrandRating)} />
                            </View>
                        </View>
                    </View>
                    <View centerV row marginT-20>
                        <View row flex-2>
                            <View>
                                <Text secondary hb2>Price:</Text>
                            </View>
                            <View marginH-10>
                                <Text hb2 primary>₹{this.props.item.BucketPrice}</Text>
                            </View>
                        </View>
                        <View flex center marginL-30>
                            <ImageBackground
                                source={{ uri: this.props.item.PrimaryImage || "https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2016/06/3d.png" }}
                                style={styles.imageBackground}
                                blurRadius={5}
                            >
                                <Text center b1 white>{"+"}{this.props.item.ProductsCount}</Text>
                            </ImageBackground>
                        </View>
                    </View>
                    <View center marginT-20 row style={styles.View}>
                        <DeliveryIcon size={30} Color={Colors.black} />
                        <DeliveryChargeComponent TotalPrice={this.props.item.BucketPrice} />
                    </View>
                    <View row marginT-20 style={{ marginHorizontal: -15, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                        <Button
                            hb2 flex style={styles.ButtonRight}
                            label={'Checkout'} color={Colors.white}
                            onPress={() => this.props.navigateCheckout(this.props.item.BucketID, this.props.item.Name, this.props.item.Status)}
                        />
                    </View>
                </CstmShadowView>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    View: {
        height: 50,
        marginTop: 10,
        backgroundColor: Colors.shadow,
    },
    ShadowContainer: {
        height: "auto",
        width: screenWidth * 0.9,
        borderRadius: 10,
        paddingTop: 15,
        paddingHorizontal: 15,
        marginTop: 0,
    },
    ButtonRight: {
        backgroundColor: Colors.primary,
        borderRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    imageBackground: {
        height: 100,
        width: 100,
        resizeMode: "cover",
        justifyContent: "center",
        alignContent: "center"
    }
});
