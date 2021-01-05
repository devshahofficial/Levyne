import React from 'react';
import {ImageBackground, StyleSheet, Dimensions} from 'react-native';
import {View, Text, TouchableOpacity, Button, Avatar,Colors} from 'react-native-ui-lib';
import {DeliveryIcon} from "../Icons/Secondary/DeliveryIcon";
import DeliveryChargeComponent from '../components/DeliveryChargeComponent';
import StarIconsComponent from "./StarIconsComponent";
import CstmShadowView from "./CstmShadowView";
const screenWidth = Dimensions.get('window').width;

export default class BucketComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.NavigateBucket(
                    this.props.item.BucketID,
                    this.props.item.BrandID,
                    this.props.item.Name,
                    this.props.item.TotalProducts,
                    {uri : this.props.item.ProfileImage}
                )}
                marginB-20 paddingH-10
                activeOpacity={0.8} marginT-10
            >
                <CstmShadowView style={styles.ShadowContainer}>
                    <View row>
                        <Avatar
                            size={50}
                            source={{uri : this.props.item.ProfileImage}}
                            onPress={() => this.props.navigateBrand(this.props.item.BrandID)}
                        />
                        <View marginL-25 centerV>
                            <Text hb1 numberOfLines={1} ellipsizeMode='tail'>
                                {this.props.item.Name}
                            </Text>
                            <View row marginT-5>
                                <StarIconsComponent BrandRating="4" />
                            </View>
                        </View>
                    </View>
                    <View centerV row marginT-20>
                        <View row flex-2>
                            <View>
                                <Text secondary hb2>Expected</Text>
                                <Text secondary hb2>Final</Text>
                            </View>
                            <View marginH-10>
                                <Text hb1>₹{this.props.item.AveragePrice}</Text>
                                <Text h3 primary>{this.props.item.Status ? '₹' + this.props.item.DecidedPrice : 'Chat to finalize!'}</Text>
                            </View>
                        </View>
                        <View flex center marginL-30>
                            <ImageBackground
                                source={{uri: this.props.item.PrimaryImage}}
                                style={styles.imageBackground}
                                blurRadius={5}
                            >
                                <Text center b1 white style={styles.text}>{"+"}{this.props.item.ProductsCount}</Text>
                            </ImageBackground>
                        </View>
                    </View>
                    <View center marginT-20 row style={styles.View}>
                        <DeliveryIcon size={30} Color={Colors.black} />
                        <DeliveryChargeComponent TotalPrice={this.props.item.DecidedPrice} />
                    </View>
                    <View row marginT-20 style={{marginHorizontal:-15,borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}>
                        <Button
                            hb2 flex style={styles.ButtonLeft}
                            label={'Chat'}
                            onPress={() => this.props.navigateChat(this.props.item.BucketID, this.props.item.Name, this.props.item.BrandID, {uri : this.props.item.ProfileImage})}
                        />
                        <Button
                            hb2 flex style={styles.ButtonRight}
                            label={'Checkout'} color={Colors.white}
                            onPress={() => this.props.navigateCheckout(this.props.item.BucketID, this.props.item.Name, this.props.item.Status)}
                        />
                    </View>
                </CstmShadowView>
            </TouchableOpacity>
        );
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
        marginTop:10,
        backgroundColor: Colors.shadow,
    },
    ShadowContainer: {
        height: "auto",
        width: screenWidth*0.9,
        borderRadius: 10,
        paddingTop:15,
        paddingHorizontal:15,
        marginTop:0,
    },
    ButtonRight: {
        backgroundColor: Colors.primary,
        borderRadius: 0,
        borderBottomRightRadius:10
    },
    ButtonLeft: {
        borderRadius: 0,
        borderBottomLeftRadius:10,
        borderWidth:0.5,
        borderColor:Colors.primary
    },
    imageBackground: {
        height:100,
        width:100,
        resizeMode: "cover",
        justifyContent: "center",
        alignContent: "center"
    }
});
