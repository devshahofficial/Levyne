import React from 'react';
import {ImageBackground, StyleSheet, Dimensions, Platform,} from 'react-native';
import {View, Text, TouchableOpacity, Button, Avatar,Colors} from 'react-native-ui-lib';
import {DeliveryIcon} from "../Icons/Secondary/DeliveryIcon";
import DeliveryChargeComponent from '../components/DeliveryChargeComponent';
import StarIconsComponent from "./StarIconsComponent";
const screenWidth = Dimensions.get('window').width;

export default class BucketComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <TouchableOpacity
            onPress={() => this.props.Navigation(
                this.props.item.BucketID,
                this.props.item.BrandID,
                this.props.item.Name,
                this.props.item.TotalProducts
            )}
            style={styles.Container}
            paddingH-20
            marginB-20
            activeOpacity={0.8} marginT-10
        >
            <View row>
                <Avatar
                    size={50}
                    source={{uri : this.props.item.ProfileImage}}
                    onPress={() => this.props.navigateBrand(this.props.item.BrandID)}
                />
                <View marginL-25 centerV>
                    <Text hb2>
                        {this.props.item.Name}
                    </Text>
                    <View row>
                        <StarIconsComponent BrandRating="0" />
                    </View>
                </View>
            </View>
            <View row marginV-10 centerV>
                <ImageBackground
                    blurRadius={2}
                    imageStyle={{ borderRadius: 10}}
                    source={{ uri: this.props.item.ProductImage }}
                    style={styles.image}
                >
                    <Text f1 style={{lineHeight:30}} white center>
                        +{this.props.item.TotalProducts}
                    </Text>
                </ImageBackground>
                <View spread marginL-30>
                    <View row flex-15>
                        <View>
                            <Text secondary h2>Total</Text>
                            <Text secondary h2>Discount</Text>
                        </View>
                        <View marginL-10>
                            <Text hb1>₹{this.props.item.TotalDiscountPrice}</Text>
                            <Text h1 primary>{this.props.item.TotalDiscount}% off</Text>
                        </View>
                    </View>
                    <View flex>
                        <Button
                            onPress={
                                () => this.props.navigateCheckout(
                                    this.props.item.BucketID,
                                    this.props.item.BrandID,
                                    this.props.item.Name,
                                    this.props.item.TotalProducts
                                )
                            }
                            flex style={styles.Checkout}
                            label="Checkout"
                        />
                    </View>
                </View>
            </View>
            <View center row style={styles.View}>
                <DeliveryIcon size={30} Color={Colors.black} />
                <DeliveryChargeComponent TotalPrice={this.props.item.TotalDiscountPrice} />
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
    Checkout: {
        width: 150,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 10,
        height: 30
    }
});
