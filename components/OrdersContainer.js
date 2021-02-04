import {StyleSheet} from "react-native";
import React from 'react';
import {View, Text, Colors, TouchableOpacity, Image} from 'react-native-ui-lib';
import StarIconsComponent from "./StarIconsComponent";
import CstmShadowView from "./CstmShadowView";
import {DeliveryIcon} from "../Icons/Secondary/DeliveryIcon";
import {TailorIcon} from "../Icons/Secondary/TailorIcon";
import {OrderReceivedIcon} from "../Icons/Secondary/OrderReceived";
import {ProductionCompletedIcon} from "../Icons/Secondary/ProductionCompleted";
import DeliveryChargeComponent from "./DeliveryChargeComponent";
import {CashIcon} from "../Icons/Secondary/CashIcon";


export default class OrdersContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    Process = () => {
        if(this.props.PaymentSuccess) {
            this.props.OrderStatus = 3;
        }
        switch(this.props.OrderStatus) {
            case 1:
                return (
                    <View row centerV marginB-15 marginT-15>
                        <View flex>
                            <OrderReceivedIcon size={35} Color={Colors.primary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 primary>Payment Processing...</Text>
                    </View>
                )
            case 2:
                return (
                    <View row centerV marginB-15 marginT-15>
                        <View flex>
                            <OrderReceivedIcon size={35} Color={Colors.primary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 primary>Payment Declined.</Text>
                    </View>
                )
            case 3:
                return (
                    <View row centerV marginB-15 marginT-15>
                        <View flex>
                            <OrderReceivedIcon size={35} Color={Colors.primary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 primary>Order placed</Text>
                    </View>
                )
            case 4:
                return (
                    <>
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
                    </>
                );
            case 5:
                return (
                    <>
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
                    </>
                )
            case 6:
                return (
                    <>
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
                    </>
                )
        }
    }

    render() {
        return (
            <CstmShadowView style={styles.Main}>
                <TouchableOpacity
                    paddingH-20
                    activeOpacity={0.8}
                    flex
                    style={{borderRadius: 10}}
                    onPress={() => this.props.NavigateOrder(this.props.BucketID, this.props.BrandID, this.props.Name, this.props.ProfileImage)}
                >
                    <View row marginT-10 marginB-15 spread>
                        <Text h2 secondary>Order ID</Text>
                        <Text hb1>{this.props.OrderID}</Text>
                    </View>
                    <View row>
                        <TouchableOpacity onPress={() => this.props.NavigateBrand(this.props.BrandID)}>
                            <Image
                                style={{
                                    width:75,
                                    height:75,
                                    borderRadius: 10
                                }}
                                source={{uri : this.props.ProfileImage}}
                            />
                        </TouchableOpacity>
                        <View marginL-20>
                            <Text hb2>
                                {this.props.Name}
                            </Text>
                            <View row>
                                <StarIconsComponent BrandRating={this.props.BrandRating}/>
                            </View>
                        </View>
                    </View>

                    <View marginV-20 paddingH-15 center row style={styles.View}>
                        <DeliveryIcon size={30} Color={Colors.black} />
                        <DeliveryChargeComponent TotalPrice={this.props.FinalAmount} />
                    </View>

                    <View row marginV-20>
                        <Text h2 secondary>Total Amount</Text>
                        <Text hb1 marginL-20>₹{this.props.FinalAmount}</Text>
                    </View>

                    <this.Process/>

                    <View marginV-20 paddingH-15 center row style={styles.View}>
                        <CashIcon size={30} Color={Colors.black} />
                        <Text marginL-20>Cash On Delivery</Text>
                    </View>

                </TouchableOpacity>
            </CstmShadowView>
        );
    }
}


const styles = StyleSheet.create({
    Main: {
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 15,
        height:'auto',
        marginBottom: 10
    },
    View: {
        height: 50,
        width: 'auto',
        backgroundColor: Colors.shadow
    },
});
