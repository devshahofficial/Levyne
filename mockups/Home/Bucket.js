import React from 'react';
import {Dimensions, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../../components/NavBarBack';
import {DeliveryIcon} from "../../Icons/Secondary/DeliveryIcon";
import Colors from "../../Style/Colors";
import BucketProduct from "../../components/BucketProduct";
import {TimerIcon} from "../../Icons/Secondary/TimerIcon";
import FetchBucket from '../../API/FetchBucket';
import RemoveFabricFromCart from '../../API/RemoveFabricFromCart';
import RemoveProductFromCart from '../../API/RemoveProductFromCart';
import {CheckoutIcon} from "../../Icons/CheckoutIcon";
import DeliveryChargeComponent from '../../components/DeliveryChargeComponent';

/**
 *
 * Product Types
 *  1) Product
 *  2) Fabric
 *  3) Product With Customer Fabric
 *  4) Product + Fabric
 *  5) Customize + Fabric
 *
 */


class Bucket extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            Buckets: [],
            Loading: true
        }
        this.TotalActualPrice = 0;
        this.TotalDiscountPrice = 0;
        this.TotalProducts = 0;
        this.abortController = new AbortController();
    }

    componentDidMount() {
        FetchBucket(this.props.route.params.BucketID, this.props.AccessToken, this.abortController.signal).then((Buckets) => {

            console.log(Buckets);

            this.setState({
                Buckets,
                Loading: false
            });
        }).catch(err => {console.log(err)});

        this.willFocusSubscription = this.props.navigation.addListener(
            'focus', () => {
                this.setState({Loading: true});
                FetchBucket(this.props.route.params.BucketID, this.props.AccessToken, this.abortController.signal).then((Buckets) => {
                    this.setState({
                        Buckets,
                        Loading: false
                    });
                }).catch(err => {console.log(err)});
            }
        );
    }

    componentWillUnmount() {
        if(this.willFocusSubscription) {
            this.willFocusSubscription();
        }
        this.abortController.abort();
    }

    FatListRenderItem = ({item}) => (
        <BucketProduct
            item={item}
            navigateProduct={this.navigateProduct}
            navigateFabric={this.navigateFabric}
            RemoveProductFromCart={this.RemoveProductFromCart}
            RemoveFabricFromCart={this.RemoveFabricFromCart}
        />
    )

    navigateProduct = (ProductID) => {
        this.props.navigation.navigate('Product', {ProductID});
    }

    navigateFabric = (FabricID) => {
        this.props.navigation.navigate('Fabric', {FabricID});
    }

    navigateCheckout = () => {
        if(this.TotalDiscountPrice > 0) {
            this.props.navigation.navigate('CheckOut', {
                TotalActualPrice: this.TotalActualPrice,
                TotalDiscountPrice: this.TotalDiscountPrice,
                TotalProducts: this.TotalProducts,
                BrandName: this.props.route.params.BrandName,
                BrandID: this.props.route.params.BrandID
            });
        }
    }

    RemoveProductFromCart = (CartID, ProductType) => {
        this.setState({
            Buckets : this.state.Buckets.filter(item => !(item.CartID === CartID && item.ProductType === ProductType))
        })
        RemoveProductFromCart(CartID, ProductType, this.props.AccessToken).catch(console.log);
    }

    RemoveFabricFromCart = async (FabricID) => {
        this.setState({
            Buckets : this.state.Buckets.filter(item => !(item.FabricID === FabricID && item.ProductType === 2))
        })
        RemoveFabricFromCart(FabricID, this.props.AccessToken).catch(console.log);
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={this.props.route.params.BrandName}/>
                {this.state.Loading ?
                    <View flex center>
                        <ActivityIndicator />
                    </View> :
                    <View flex>
                        <FlatList
                            ListFooterComponent={
                                <View margin-20 paddingH-15 center row style={styles.View}>
                                    <DeliveryIcon size={30} Color={Colors.black} />
                                    <DeliveryChargeComponent TotalPrice = {this.props.route.params.TotalDiscountPrice} />
                                </View>
                            }
                            ListHeaderComponent={
                                <View marginT-20 paddingH-15 center row style={styles.View}>
                                    <TimerIcon size={30} Color={Colors.black} />
                                    <Text marginL-10 h2>
                                        Delivery within 15 days!
                                    </Text>
                                </View>
                            }
                            showsVerticalScrollIndicator={false}
                            data={this.state.Buckets}
                            keyExtractor={(item) => `T${item.ProductType}C${item.CartID}`}
                            renderItem={this.FatListRenderItem}
                        />
                    </View>
                }
                <TouchableOpacity
                    center row style={styles.Button} activeOpacity={0.8}
                    onPress={this.navigateCheckout}
                >
                    <CheckoutIcon size={30} Color={Colors.white} />
                    <Text marginL-20 hb1 white>
                        Check out
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
        marginLeft: -15,
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
