import {Platform, StyleSheet} from "react-native";
import React from 'react';
import {View, Text, Colors, TouchableOpacity, Avatar, Image} from 'react-native-ui-lib';
import StarIconsComponent from "./StarIconsComponent";
import CstmShadowView from "./CstmShadowView";


import {DeliveryIcon} from "../Icons/Secondary/DeliveryIcon";
import {TailorIcon} from "../Icons/Secondary/TailorIcon";
import {OrderReceivedIcon} from "../Icons/Secondary/OrderReceived";
import {ProductionCompletedIcon} from "../Icons/Secondary/ProductionCompleted";


export default class OrdersContainer extends React.Component {

    constructor() {
        super();
        console.log(this.props);
    }

    Process(param) {
        switch(param) {
            case 0:
                return <>
                    <View row centerV marginB-15 marginT-15>
                        <View flex>
                            <OrderReceivedIcon size={35} Color={Colors.primary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 primary>Order placed</Text>
                    </View>
                    </>;
            case 1:
                return <>
                    <View row centerV marginT-15>
                        <View flex>
                            <OrderReceivedIcon size={35} Color={Colors.secondary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 secondary>Order placed</Text>
                    </View>
                    <View row centerV marginV-15>
                        <View flex>
                            <TailorIcon size={35} Color={Colors.primary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 primary>Production Started</Text>
                    </View>
                </>;
            case 2:
                return <>
                    <View row centerV marginT-15>
                        <View flex>
                            <OrderReceivedIcon size={35} Color={Colors.secondary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 secondary>Order placed</Text>
                    </View>
                    <View row centerV marginT-15>
                        <View flex>
                            <TailorIcon size={35} Color={Colors.secondary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 secondary>Production Started</Text>
                    </View>
                    <View row centerV marginV-15>
                        <View flex>
                            <ProductionCompletedIcon size={35} Color={Colors.primary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 primary>Production Completed</Text>
                    </View>
                </>;
            case 3:
                return <>
                    <View row centerV marginT-15>
                        <View flex>
                            <OrderReceivedIcon size={35} Color={Colors.secondary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 secondary>Order placed</Text>
                    </View>
                    <View row centerV marginT-15>
                        <View flex>
                            <TailorIcon size={35} Color={Colors.secondary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 secondary>Production Started</Text>
                    </View>
                    <View row centerV marginT-15>
                        <View flex>
                            <ProductionCompletedIcon size={35} Color={Colors.secondary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 secondary>Production Completed</Text>
                    </View>
                    <View row centerV marginV-15>
                        <View flex>
                            <DeliveryIcon size={35} Color={Colors.primary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 primary>Out for Delivery</Text>
                    </View>
                </>;
        }
    }

    render() {
        return (
            <CstmShadowView style={styles.Main}>
                <TouchableOpacity
                    paddingH-20 activeOpacity={0.8} style={{borderRadius: 10}}
                    onPress={() => this.props.NavigateMyOrdersDetailed(this.props.OrderID)}
                >
                    <View row marginT-10 marginB-15 spread>
                        <Text h2 secondary>Order ID</Text>
                        <Text hb1>{this.props.OrderID}</Text>
                    </View>
                    <View row>
                        <Image
                            style={{
                                width:75,
                                height:75,
                                borderRadius: 10
                            }}
                            source={{uri : this.props.ProfileImage}}
                        />
                        <View marginL-20>
                            <Text hb2>
                                {this.props.Name}
                            </Text>
                            <View row>
                                <StarIconsComponent BrandRating={this.props.CompanyRating}/>
                            </View>
                        </View>
                    </View>

                    <View row marginV-20>
                        <Text h2 secondary>Total Amount</Text>
                        <Text hb1 marginL-20>₹1000</Text>
                    </View>

                    {this.Process(2)}

                    <View style={styles.Discount}>

                    </View>
                </TouchableOpacity>
            </CstmShadowView>
        );
    }
}


const styles = StyleSheet.create({
    Main: {
        height: "auto",
        borderRadius: 10,
        paddingTop: 0,
        width: '100%'
    },
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
    },
    Discount: {
        width: 'auto',
        height:50,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        marginHorizontal: -20
    }

});
