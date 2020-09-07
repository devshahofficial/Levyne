import React from 'react';
import {Dimensions, FlatList,StyleSheet} from 'react-native';
import {View,Text,Button, TouchableOpacity} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import {DeliveryIcon} from "../Icons/Secondary/DeliveryIcon";
import Colors from "../Style/Colors";
import BucketProduct from "../components/BucketProduct";
import {TimerIcon} from "../Icons/Secondary/TimerIcon";
import FetchCart from '../API/FetchCart';
import {CheckoutIcon} from "../Icons/CheckoutIcon";

const data = [
    {
        id: "bkjbw",
        name: "Hello",
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1209112782.jpg?crop=0.669xw:1.00xh;0.183xw,0&resize=640:*"
    },
    {
        id: "bkjdwbw",
        name: "Hello",
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1209112782.jpg?crop=0.669xw:1.00xh;0.183xw,0&resize=640:*"
    },
    {
        id: "bkjwbw",
        name: "Hello",
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1209112782.jpg?crop=0.669xw:1.00xh;0.183xw,0&resize=640:*"
    },
    {
        id: "bkj12bw",
        name: "Hello",
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1209112782.jpg?crop=0.669xw:1.00xh;0.183xw,0&resize=640:*"
    },
    {
        id: "bkdde2jbw",
        name: "Hello",
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1209112782.jpg?crop=0.669xw:1.00xh;0.183xw,0&resize=640:*"
    }
]

class Bucket extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            CustomProducts: true,
            Products: true,
            Fabrics: true
        }
    }

    componentDidMount() {
        FetchCart(this.props.route.params.BrandID, this.props.AccessToken).then(resp => {
            console.log(resp)
        }).catch(err => {console.log(err)});
    }


    navigateCheckout = () => {
        this.props.navigation.navigate("CheckOut");
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Tailor name'}/>
                <FlatList
                    ListFooterComponent={
                        <View paddingV-20>
                            <View paddingH-15 center row style={styles.View}>
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
                        </View>
                    }
                    ListHeaderComponent={
                        <View paddingH-15 center row style={styles.View}>
                            <TimerIcon size={30} Color={Colors.black} />
                            <Text marginL-10 h2>
                                Delivery within 15 days!
                            </Text>
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={({ item }) =>
                        <BucketProduct/>
                    }
                    // renderItem={({ item }) => <ProductItemContainer Token={this.props.AccessToken} item={item} navigateProduct={this.navigateProduct}/>}
                />
                <TouchableOpacity
                    center row style={styles.Button}
                    activeOpacity={0.8}
                    onPress={this.navigateCheckout}
                >
                    <CheckoutIcon size={30} Color={Colors.white} />
                    <Text marginL-20 hb1 white>
                        Check Out
                    </Text>
                </TouchableOpacity>
            </>
        );
    }

};

const styles = StyleSheet.create({
    View: {
        height: 50,
        width: Dimensions.get('window').width,
        backgroundColor: Colors.shadow,
    },
    Product: {
        backgroundColor: Colors.shadow,
        flex: 1
    },
    Button: {
        height: 50,
        width: Dimensions.get('window').width,
        backgroundColor: Colors.primary,
    }
});


const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(Bucket);
