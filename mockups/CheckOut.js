import React from 'react';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {View, Text, RadioButton, TouchableOpacity} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import Colors from "../Style/Colors";
import {CheckoutIcon} from "../Icons/CheckoutIcon";
import ShadowView from "react-native-simple-shadow-view";
import {DeliveryIcon} from "../Icons/Secondary/DeliveryIcon";


class CheckOut extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            CustomProducts: true,
            Products: true,
            Fabrics: true
        }
    }


    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Tailor name'}/>

                <ScrollView
                    style={{flex:1}}
                    contentContainerStyle={{backgroundColor:Colors.white, flex:1}}
                >
                    <View paddingH-10 centerV style={styles.View}>
                        <View row>
                            <Text flex hb1 secondary>Total</Text>
                            <View centerV row>
                                <Text hb1 primary>₹{100}</Text>
                                <Text marginT-5 marginL-10 h2 secondary style={{textDecorationLine: "line-through"}}>₹{150}</Text>
                                <Text marginL-10 hb2 primary>15% off</Text>
                            </View>
                        </View>

                        <View marginT-20 row>
                            <Text hb1 flex secondary>Quantity</Text>
                            <Text hb1 primary>1</Text>
                        </View>
                    </View>

                    <View marginT-20 paddingH-15 center row style={styles.view}>
                        <DeliveryIcon size={30} Color={Colors.black} />
                        {this.props.Delivery === 1 ? (
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

                    <View style={styles.View} marginT-20>
                        <Text hb1 secondary>Address</Text>
                        <View marginT-20>
                            <RadioButton
                                selected={true}
                                color={Colors.shadow}
                                label={"Address goes here"}
                                labelStyle={{fontSize:16, color:Colors.secondary}}
                            />
                        </View>
                    </View>

                    <View style={styles.View} marginT-20>
                        <Text hb1 secondary>Payment Mode</Text>
                        <View marginT-20>
                            <RadioButton
                                selected={true}
                                color={Colors.shadow}
                                label={"Cash On Delivery"}
                                labelStyle={{fontSize:16, color:Colors.secondary}}
                            />
                        </View>

                        <Text h3 secondary marginT-20>Online payment mode may soon be available.</Text>
                    </View>

                </ScrollView>

                <TouchableOpacity center row style={styles.Button} activeOpacity={0.8}>
                    <CheckoutIcon size={30} Color={Colors.white} />
                    <Text marginL-20 hb1 white>
                        Place an Order
                    </Text>
                </TouchableOpacity>
            </>
        );
    }

};

const styles = StyleSheet.create({
    View: {
        borderRadius: 10,
        borderColor: Colors.shadow,
        borderWidth: 1,
        padding:10,
        margin:10
    },
    Product: {
        backgroundColor: Colors.shadow,
        flex: 1
    },
    Button: {
        height: 50,
        width: Dimensions.get('window').width,
        backgroundColor: Colors.primary,
    },
    view: {
        height: 50,
        width: Dimensions.get('window').width,
        backgroundColor: Colors.shadow,
    },
});


const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(CheckOut);
