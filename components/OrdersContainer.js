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
        switch(this.props.OrderStatus) {
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
                        <CstmShadowView style={{marginBottom: 20}}>
                            <Button
                                h2 onPress={() => this.props.TrackOrder(this.props.Slug, this.props.TrackingID)}
                                label="Track Order" flex
                            />
                        </CstmShadowView>
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
                        <CstmShadowView style={{marginBottom: 20}}>
                            <Button
                                h2 onPress={() => this.props.TrackOrder(this.props.Slug, this.props.TrackingID)}
                                label="Track Order" flex
                            />
                        </CstmShadowView>
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
								h2 onPress={() => this.props.RateExperience(this.props.OrderID, parseInt(this.props.BrandRating))}
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
                    {
                        this.props.BucketPrice - this.props.FinalAmount ? (
                            <View row flex spread>
                                <View>
                                    <Text h2 secondary marginT-20>Total Amount</Text>
                                    <Text h2 secondary marginT-20>Discount ({this.props.CouponCode})</Text>
                                    <Text h2 secondary marginT-20>Final Amount</Text>
                                    {this.props.ExtraCharges ?
                                        <Text h2 secondary marginT-20>Extra Charges</Text>
                                        :
                                        <></>
                                    }
                                    {this.props.TrackingID ?
                                        <>
                                            <Text h2 secondary marginT-20>Courier Partner</Text>
                                            <Text h2 secondary marginT-20>Tracking ID</Text>
                                        </>
                                        :
                                        <></>
                                    }
                                </View>
                                <View>
                                    <Text hb1 secondary marginT-20>₹{this.props.BucketPrice}</Text>
                                    <Text hb1 secondary marginT-20>-₹{this.props.BucketPrice - this.props.FinalAmount}</Text>
                                    <Text hb1 secondary marginT-20>₹{this.props.FinalAmount}</Text>
                                    {this.props.ExtraCharges ?
                                        <Text hb1 secondary marginT-20>₹{this.props.ExtraCharges}</Text>
                                        :
                                        <></>
                                    }
                                    {this.props.TrackingID ?
                                        <>
                                            <Text hb1 secondary marginT-20>{this.props.CourierPartnerName}</Text>
                                            <Text hb1 secondary marginT-20>{this.props.TrackingID}</Text>
                                        </>
                                        :
                                        <></>
                                    }
                                </View>
                            </View>
                        ) :
                        (
                            <View row flex spread>
                                <View>
                                    {this.props.FinalAmount ?
                                        <>
                                            <Text h2 secondary marginT-20>Final Amount</Text>
                                            {
                                                this.props.ExtraCharges ?
                                                    <Text h2 secondary marginT-20>Extra Charges</Text>
                                                :
                                                <></>
                                            }
                                        </>
                                        :
                                        <Text h2 secondary marginT-20>Final Amount</Text>
                                    }
                                    {this.props.TrackingID ?
                                        <>
                                            <Text h2 secondary marginT-20>Courier Partner</Text>
                                            <Text h2 secondary marginT-20>Tracking ID</Text>
                                        </>
                                        :
                                        <></>
                                    }
                                </View>
                                <View>
                                    {this.props.FinalAmount ?
                                        <>
                                            <Text hb1 secondary marginT-20>₹{this.props.FinalAmount}</Text>
                                            {
                                                this.props.ExtraCharges ?
                                                    <Text hb1 secondary marginT-20>₹{this.props.ExtraCharges}</Text>
                                                :
                                                <></>
                                            }
                                        </>
                                        :
                                        <Text hb1 secondary marginT-20>₹{this.props.ExtraCharges}</Text>
                                    }
                                    {this.props.TrackingID ?
                                        <>
                                            <Text hb1 secondary marginT-20>{this.props.CourierPartnerName}</Text>
                                            <Text hb1 secondary marginT-20>{this.props.TrackingID}</Text>
                                        </>
                                        :
                                        <></>
                                    }
                                </View>
                            </View>
                        )
                    }
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
