
import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../../components/NavBarBack';
import BucketComponent from "../../components/BucketComponent";
import FetchCart from '../../API/FetchCart';
import {ActivityIndicator, FlatList} from 'react-native';

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Buckets: [],
            Loading: true
        }
        this.abortController = new AbortController();
        this.willFocusSubscription = null;
    }

    componentDidMount() {
        FetchCart(this.props.AccessToken, this.abortController.signal).then(Cart => {
            Cart = Cart.map(item => {
                item.BucketID = item.BucketID.toString();
                return item;
            });
            this.setState({Cart, Loading: false});
        }).catch(err => {
            console.log(err);
        });

        this.willFocusSubscription = this.props.navigation.addListener(
            'focus', () => {
                this.setState({Loading: true});
                FetchCart(this.props.AccessToken).then(Cart => {
                    Cart = Cart.map(item => {
                        item.BucketID = item.BucketID.toString();
                        return item;
                    });
                    this.setState({Cart, Loading: false});
                }).catch(err => {
                    console.log(err);
                });
            }
        );
    }

    componentWillUnmount() {
        if(this.willFocusSubscription) {
            this.willFocusSubscription();
        }
        this.abortController.abort();
    }

    onBucketPress = (BucketID, BrandID, BrandName, TotalProducts) => {
        this.props.navigation.navigate("Bucket", {BucketID, BrandID, BrandName, TotalProducts});
    }

    navigateCheckout = (BucketID, BrandID, BrandName, TotalProducts) => {
        this.props.navigation.navigate("CheckOut", {BucketID, BrandID, BrandName, TotalProducts});
    }

    navigateBrand = (BrandID) => {
        this.props.navigation.navigate("BrandProfile", {BrandID});
    }

    FlatListRenderItem = ({item}) => (
        <BucketComponent
            item={item}
            Navigation={this.onBucketPress}
            navigateCheckout={this.navigateCheckout}
            navigateBrand={this.navigateBrand}
        />
    )

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Your Wardrobe'}/>
                {this.state.Loading ?
                    <View flex center>
                        <ActivityIndicator />
                    </View> :
                    <View flex centerH>
                        <FlatList
                            data={this.state.Cart}
                            renderItem={this.FlatListRenderItem}
                            keyExtractor={(item) => item.BucketID}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                <View flex centerV centerH style={{height:655}} paddingH-40>
                                    <Text center b1 grey40>Make a wish and we'll make sure that it comes true.</Text>
                                </View>
                            }
                        />
                    </View>
                }
            </>
        );
    }

};

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(Cart);
