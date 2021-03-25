import React from 'react';
import { ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { View, Text, TouchableOpacity, Button, Avatar, Colors } from 'react-native-ui-lib';
import { DeliveryIcon } from "../Icons/Secondary/DeliveryIcon";
import DeliveryChargeComponent from '../components/DeliveryChargeComponent';
import StarIconsComponent from "./StarIconsComponent";
import CstmShadowView from "./CstmShadowView";
import {CheckoutIcon} from "../Icons/CheckoutIcon";
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
                                source={{ uri: this.props.item.PrimaryImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUVmqdTj4fr4jTqR3t0EkEm_-YYxGBH9WU9g&usqp=CAU" }}
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
                    <TouchableOpacity 
                        flex row marginV-20 center
                        onPress={() => this.props.navigateCheckout(this.props.item.BucketID, this.props.item.Name, this.props.item.Status)}
                    >
                        <Text hb2 primary marginR-10 style={{justifyContent: 'flex-start'}}>Checkout</Text>
                        <View style={{justifyContent: 'flex-end'}}>
                            <CheckoutIcon size={22} Color={Colors.primary}/>
                        </View>
                    </TouchableOpacity>
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
    ButtonView :{
        alignSelf: 'flex-end',
        alignContent: 'center',
        justifyContent: 'center',
        height: 40,
        marginBottom:15,
        marginHorizontal: 5

    },
    ShadowContainer: {
        height: "auto",
        width: screenWidth * 0.9,
        borderRadius: 10,
        paddingTop: 15,
        paddingHorizontal: 15,
        marginTop: 0,
    },
    imageBackground: {
        height: 100,
        width: 100,
        resizeMode: "cover",
        justifyContent: "center",
        alignContent: "center"
    }
});