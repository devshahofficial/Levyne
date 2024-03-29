import React from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import { View,TouchableOpacity, Text, Colors} from 'react-native-ui-lib';
import {ArchiveIcon} from "../Icons/ArchiveIcon";
import ShadowView from "react-native-simple-shadow-view";

export default class BucketProduct extends React.PureComponent {

    ProductWithFabric = () => {
        return(
            <View padding-15>
                <ShadowView style={styles.View}>
                    <View flex row centerH style={{height:150}}>
                        <View flex paddingH-10>
                            <Image
                                style={{flex:1}}
                                source={{uri:this.props.item.FabricImage}}
                            />
                        </View>
                        <View flex paddingH-10>
                            <View>
                                <Text hb1 secondary>Total Cost</Text>
                                <View row>
                                    <Text hb1 primary>₹{this.props.item.DiscountPrice}</Text>
                                    <Text marginL-10 h2 secondary style={{textDecorationLine: "line-through"}}>₹{this.props.item.ActualPrice}</Text>
                                    <Text marginL-10 hb2 primary>{(this.props.item.ActualPrice - this.props.item.DiscountPrice)*100/this.props.item.ActualPrice}% off</Text>
                                </View>
                            </View>
                            <View marginT-10>
                                <Text hb1 secondary>Size</Text>
                                <View marginT-5 center style={{borderRadius:5,height:40,borderColor:Colors.shadow, borderWidth:1}}>
                                    <Text hb1 primary>{this.props.item.ProductSize}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View flex marginT-20 padding-20 center>
                        <Image
                            style={{height: 50,width: Dimensions.get('window').width-40, borderRadius:5}}
                            source={{uri:this.props.item.FabricImage}}
                        />
                    </View>

                    <View flex marginV-20>
                        <View row>
                            <Text flex hb2 secondary>Quantity</Text>
                            <Text flex-2 h1>{this.props.item.Quantity}</Text>
                        </View>
                        <View row>
                            <Text flex hb2 secondary>Fabric used</Text>
                            <Text flex-2 h1>{this.props.item.FabricQuantityPerProduct*this.props.item.Quantity} meters</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigateProduct(this.props.item.ProductID)} center marginB-5 style={styles.TouchableOpacity}>
                        <Text h2 secondary flex-15>Visit the product</Text>
                        <Text h2 secondary flex>{">"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigateFabric(this.props.item.FabricID)} center marginT-5 marginB-15 style={styles.TouchableOpacity}>
                        <Text h2 secondary flex-15>Visit the Fabric</Text>
                        <Text h2 secondary flex>{">"}</Text>
                    </TouchableOpacity>
                    <View style={{justifyContent: "flex-end"}}>
                        <TouchableOpacity onPress={() => this.props.RemoveProductFromCart(this.props.item.CartID, this.props.item.ProductType)} activeOpacity={0.8} center style={{width:35, height:35, backgroundColor:"#FF0000", borderRadius:5}}>
                            <ArchiveIcon Size={20} Color={Colors.white}/>
                        </TouchableOpacity>
                    </View>
                </ShadowView>
            </View>
        )
    }

    OnlyFabric = () => {
        return(
            <View padding-15>
                <ShadowView style={styles.View}>
                    <View flex center>
                        <Image
                            style={{height: 100,width: Dimensions.get('window').width-20, borderRadius:5}}
                            source={{uri: this.props.item.ProductImage}}
                        />
                    </View>
                    <View flex row paddingH-10 marginV-20 centerH>
                        <View flex>
                            <View>
                                <Text hb1 secondary>Total Cost</Text>
                                <View row>
                                    <Text hb1 primary>₹{this.props.item.DiscountPrice}</Text>
                                    <Text marginL-10 h2 secondary style={{textDecorationLine: "line-through"}}>₹{this.props.item.ActualPrice}</Text>
                                    <Text marginL-10 hb2 primary>{(this.props.item.ActualPrice - this.props.item.DiscountPrice)*100/this.props.item.ActualPrice}% off</Text>
                                </View>
                            </View>
                            <View marginT-10>
                                <Text hb1 secondary>Fabric size</Text>
                                <View marginT-5 center style={{borderRadius:5,height:40,borderColor:Colors.shadow, borderWidth:1}}>
                                    <Text hb1 primary>{this.props.item.QuantityInMeter} meters</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View row center>
                        <TouchableOpacity onPress={() => this.props.navigateFabric(this.props.item.FabricID)} flex-8 center marginH-5 style={styles.TouchableOpacity}>
                            <Text h2 secondary flex-15>Visit the Fabric</Text>
                            <Text h2 secondary flex>{">"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.RemoveFabricFromCart(this.props.item.FabricID)} flex marginH-5 activeOpacity={0.8} center style={{width:40, height:40, backgroundColor:"#FF0000", borderRadius:5}}>
                            <ArchiveIcon Size={20} Color={Colors.white}/>
                        </TouchableOpacity>
                    </View>
                </ShadowView>
            </View>
        )
    }


    OnlyProduct = () => {
        return(
            <View padding-15>
                <ShadowView style={styles.View}>
                    <View flex row centerH style={{height:150}}>
                        <View flex paddingH-10>
                            <Image
                                style={{flex:1}}
                                source={{uri:this.props.item.ProductImage}}
                            />
                        </View>
                        <View flex paddingH-10>
                            <View>
                                <Text hb1 secondary>Total Cost</Text>
                                <View row>
                                    <Text hb1 primary>₹{this.props.item.DiscountPrice}</Text>
                                    <Text marginL-10 h2 secondary style={{textDecorationLine: "line-through"}}>₹{this.props.item.ActualPrice}</Text>
                                    <Text marginL-10 hb2 primary>{(this.props.item.ActualPrice - this.props.item.DiscountPrice)*100/this.props.item.ActualPrice}% off</Text>
                                </View>
                            </View>
                            <View marginT-10>
                                <Text hb1 secondary>Size</Text>
                                <View marginT-5 center style={{borderRadius:5,height:40,borderColor:Colors.shadow, borderWidth:1}}>
                                    <Text hb1 primary>{this.props.item.ProductSize}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View row marginV-20>
                        <Text flex hb2 secondary>Quantity</Text>
                        <Text flex-2 h1>{this.props.item.Quantity}</Text>
                    </View>

                    <View row center>
                        <TouchableOpacity onPress={() => this.props.navigateProduct(this.props.item.ProductID)} flex-8 center marginH-5 style={styles.TouchableOpacity}>
                            <Text h2 secondary flex-15>Visit the Product</Text>
                            <Text h2 secondary flex>{">"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.RemoveProductFromCart(this.props.item.CartID, this.props.item.ProductType)} flex marginH-5 activeOpacity={0.8} center style={{width:40, height:40, backgroundColor:"#FF0000", borderRadius:5}}>
                            <ArchiveIcon Size={20} Color={Colors.white}/>
                        </TouchableOpacity>
                    </View>
                </ShadowView>
            </View>
        )
    }

    render() {
        switch (this.props.item.ProductType) {
            case 1 :
                return <this.OnlyProduct {...this.props} />
            case 2 :
                return <this.OnlyFabric {...this.props} />
            case 4 :
                return <this.ProductWithFabric {...this.props} />
            default:
                return <></>
        }

    }
}

const styles = StyleSheet.create({
    View: {
        borderRadius: 10,
        borderColor: Colors.shadow,
        borderWidth: 1,
        padding: 10,
        shadowColor: Colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {width: 0,height: 0},
        backgroundColor: Colors.white,
    },
    TouchableOpacity: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.shadow,
        flexDirection: "row",
        paddingHorizontal: 15
    }
});
