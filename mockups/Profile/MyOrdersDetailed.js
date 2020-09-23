import React from 'react';
import {Dimensions, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../../components/NavBarBack';
import {DeliveryIcon} from "../../Icons/Secondary/DeliveryIcon";
import Colors from "../../Style/Colors";
import BucketProduct from "../../components/BucketProduct";
import {TimerIcon} from "../../Icons/Secondary/TimerIcon";
import FetchOrderDetails from '../../API/FetchOrderDetails';
import RemoveFabricFromCart from '../../API/RemoveFabricFromCart';
import RemoveProductFromCart from '../../API/RemoveProductFromCart';
import DeliveryChargeComponent from '../../components/DeliveryChargeComponent';

/**
 *
 * Product Types
 *  1) Product
 *  2) Fabric
 *  3) Customize (3D)
 *  4) Product + Fabric
 *  5) Customize + Fabric
 *
 */


class MyOrdersDetailed extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            Buckets: [],
            Loading: true
        }
    }

    componentDidMount() {
        FetchOrderDetails(this.props.route.params.OrderID, this.props.AccessToken).then((Buckets) => {
            Buckets = Buckets[0].concat(Buckets[1],Buckets[2], Buckets[3]).sort(function(a,b){return (a.UpdatedTimestamp>b.UpdatedTimestamp)-(a.UpdatedTimestamp<b.UpdatedTimestamp)})
            this.setState({
                Buckets,
                Loading: false
            })
        }).catch(err => {console.log(err)});
    }

    FlatListRenderItem = ({item}) => (
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
                        <ActivityIndicator/>
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
                            keyExtractor={(item) => `T${item.ProductType}O${item.SubOrderID}`}
                            renderItem={this.FlatListRenderItem}
                        />
                    </View>
                }
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

export default connect(mapsStateToProps)(MyOrdersDetailed);