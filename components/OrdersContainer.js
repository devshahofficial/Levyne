import {StyleSheet} from "react-native";
import React from 'react';
import {View, Text, Colors, TouchableOpacity, Image, Button} from 'react-native-ui-lib';
import StarIconsComponent from "./StarIconsComponent";
import CstmShadowView from "./CstmShadowView";
import {DeliveryIcon} from "../Icons/Secondary/DeliveryIcon";
import {TailorIcon} from "../Icons/Secondary/TailorIcon";
import {OrderReceivedIcon} from "../Icons/Secondary/OrderReceived";
import {ProductionCompletedIcon} from "../Icons/Secondary/ProductionCompleted";
import DeliveryChargeComponent from "./DeliveryChargeComponent";
import {CashIcon} from "../Icons/Secondary/CashIcon";

/**
 * 1) Customer created order, and Razorpay has provided the orderID
 * 2) Payment canceled by a customer or something wrong happened in mid of payment.
 * 3) Payment verified and Order transferred to the Brand.
 *
 * Above all was part of the standard order stages, now coming to part if the customer has canceled the order before manufacturing starts.
 * 4) Customer has canceled the order, and a refund is pending.
 * 5) Refund completed.
 *
 * 6) Manufacturing started.
 * 7) Manufacturing completed and Order Ready for shipping.
 * 8) Order shipped.
 * 9) Order out of delivery.
 * 10) Order delivered.
 *
 * Now comes to the alteration part.
 * 11) Customer request for alteration.
 * 12) Brand agreed for alteration
 * 13) Order collected for alteration and transferred to the Brand
 * 14) Alteration started.
 * 15) Alteration completed and Order Ready for shipping again.
 * 16) Order shipped
 * 17) Order out of delivery.
 * 18) Order Delivered.
 *
 * Now Final feedback
 * 19) Customer has provided the feedback.
 */

export default class OrdersContainer extends React.Component {


    Process = () => {
        if(this.props.PaymentSuccess) {
            // @ts-ignore
            this.props.OrderStatus = 3;
        }
        switch(this.props.OrderStatus) {
            case 1:
                return (
                    <View row centerV marginV-15>
                        <View flex>
                            <OrderReceivedIcon size={35} Color={Colors.primary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 primary>Payment Pending.</Text>
                    </View>
                )
            case 2:
                return (
                    <View flex>
                        <View row centerV marginV-15>
                            <View flex>
                                <OrderReceivedIcon size={35} Color={Colors.primary}/>
                            </View>
                            <Text flex-8 marginL-20 h1 primary>Payment Declined.</Text>
                        </View>
                        <CstmShadowView style={{flex: 1, marginBottom: 20}}>
							<Button
								h2 onPress={() => this.props.RetryPayment(this.props)}
								label="Retry Payment" flex
							/>
						</CstmShadowView>
                    </View>
                )
            case 3:
                return (
                    <View row centerV marginV-15>
                        <View flex>
                            <OrderReceivedIcon size={35} Color={Colors.primary}/>
                        </View>
                        <Text flex-8 marginL-20 h1 primary>Order placed</Text>
                        <CstmShadowView style={{marginBottom: 20}}>
                            <Button
                                h2 onPress={() => this.props.CancelOrder(this.props.BucketID)}
                                label="Cancel Order" flex
                            />
                        </CstmShadowView>
                    </View>
                )
            case 4:
                return (
                    <>
                        <View row centerV marginV-15>
                            <View flex>
                                <OrderReceivedIcon size={35} Color={Colors.primary}/>
                            </View>
                            <Text flex-8 marginL-20 h1 primary>Order cancelled</Text>
                        </View>
                    </>
                );
            case 5:
                return (
                    <>
                        <View row centerV marginB-15 marginT-15>
                            <View flex>
                                <OrderReceivedIcon size={35} Color={Colors.secondary}/>
                            </View>
                            <Text flex-8 marginL-20 h1 secondary>Order cancelled</Text>
                        </View>
                        <View row centerV marginB-15 marginV-15>
                            <View flex>
                                <TailorIcon size={35} Color={Colors.primary}/>
                            </View>
                            <Text flex-8 marginL-20 h1 primary>Refund Completed.</Text>
                        </View>
                    </>
                );
            case 6:
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
            case 7:
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
            case 8:
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
                            <Text flex-8 marginL-20 h1 primary>Order Shipped</Text>
                        </View>
                    </>
                )
            case 9:
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
                            <Text flex-8 marginL-20 h1 primary>Order Out of delivery</Text>
                        </View>
                    </>
                )
            case 10: 
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
                            <Text flex-8 marginL-20 h1 primary>Order Delivered.</Text>
                        </View>
                        <CstmShadowView style={{flex: 1, marginBottom: 20}}>
							<Button
								h2 onPress={() => this.props.RateExperience(this.props.BucketID)}
								label="Rate Your Experience" flex
							/>
						</CstmShadowView>
                    </>
                )
            default: 
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
                            <Text flex-8 marginL-20 h1 primary>Order Delivered.</Text>
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
