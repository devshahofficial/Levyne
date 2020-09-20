import React from 'react';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {View, Text, RadioButton, TouchableOpacity} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import Colors from "../Style/Colors";
import CstmInput from "../components/input";
import {CheckoutIcon} from "../Icons/CheckoutIcon";
import {DeliveryIcon} from "../Icons/Secondary/DeliveryIcon";
import DeliveryChargeComponent from '../components/DeliveryChargeComponent';
import CheckoutAPI from '../API/Checkout';
import Spinner from 'react-native-loading-spinner-overlay';



class CheckOut extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state= {
            CustomProducts: true,
            Products: true,
            Fabrics: true,
            Loading: false,
            Comment: ""
        }
        this.abortController = new AbortController();
    }

    CheckoutOnPress = () => {
        this.setState({
            Loading: true
        });
        CheckoutAPI(
            this.props.Address,
            this.props.PinCode,
            this.state.Comment,
            this.props.route.params.BrandID,
            this.props.AccessToken,
            this.abortController.signal
        ).then(OrderID => {
            console.log(OrderID);
        }).catch(err => {
            this.setState({
                Loading: false
            });
            console.log(err);
        })
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    setComment = (Comment) => this.setState({Comment});


    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={this.props.route.params.BrandName}/>

                <ScrollView
                    style={{flex:1}}
                    contentContainerStyle={{backgroundColor:Colors.white, flex:1}}
                >
                    <View paddingH-10 centerV style={styles.View}>
                        <View row>
                            <Text flex hb1 secondary>Total</Text>
                            <View centerV row>
                                <Text hb1 primary>₹{this.props.route.params.TotalDiscountPrice}</Text>
                                <Text marginT-5 marginL-10 h2 secondary style={{textDecorationLine: "line-through"}}>₹{this.props.route.params.TotalActualPrice}</Text>
                                <Text marginL-10 hb2 primary>{parseInt((this.props.route.params.TotalActualPrice - this.props.route.params.TotalDiscountPrice)*100/this.props.route.params.TotalActualPrice)}% off</Text>
                            </View>
                        </View>

                        <View marginT-20 row>
                            <Text hb1 flex secondary>Number of Products</Text>
                            <Text hb1 primary>{this.props.route.params.TotalProducts}</Text>
                        </View>
                    </View>

                    <View marginT-20 paddingH-15 center row style={styles.view}>
                        <DeliveryIcon size={30} Color={Colors.black} />
                        <DeliveryChargeComponent TotalPrice={this.props.route.params.TotalDiscountPrice} />
                    </View>
                    <Spinner
                        visible={this.state.Loading}
                    />
                    <View style={styles.View} marginT-20>
                        <Text hb1 secondary>Address</Text>
                        <View marginT-20>
                            <RadioButton
                                selected={true}
                                color={Colors.shadow}
                                label={this.props.Address + "-" + this.props.PinCode}
                                labelStyle={{fontSize:16, color:Colors.secondary}}
                            />
                        </View>
                    </View>

                    <View style={styles.View} marginT-20>
                        <Text hb1 secondary>Comment (Optional)</Text>
                        <View marginT-20>
                            <CstmInput
                                placeholder='Comment'
                                value={this.state.Comment}
                                onChangeText={this.setComment}
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

                <TouchableOpacity onPress={this.CheckoutOnPress} center row style={styles.Button} activeOpacity={0.8}>
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
    AccessToken: state.Auth.AccessToken,
    Address: state.Profile.Address,
    PinCode: state.Profile.PinCode,
});

export default connect(mapsStateToProps)(CheckOut);
