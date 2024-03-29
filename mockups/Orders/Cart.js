import React from 'react';
import {View, Text, AvatarHelper, Colors} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import BucketComponent from "../../components/BucketComponent";
import FetchCart from '../../API/Cart/FetchCart';
import {FlatList} from 'react-native';
import UnLoggedScreen from '../../components/UnLoggedScreen';
import TextNavBar from "../../components/TextNavBar";
import {CheckoutIcon} from "../../Icons/CheckoutIcon";
import Loader from '../../components/Loader';

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Buckets: [],
            Loading: true,
            showToast: false,
            refreshing: false,
        }
        this.abortController = new AbortController();
        this.willFocusSubscription = null;
        this.Timeout = null;
    }

    componentDidMount() {
        if(!this.props.SkipLogin) {
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
                    FetchCart(this.props.AccessToken, this.abortController.signal).then(Cart => {
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
    }

    componentWillUnmount() {
        this.abortController.abort();
        if(this.willFocusSubscription) {
            this.willFocusSubscription();
        }
        this.Timeout && clearTimeout(this.Timeout);
    }

    onBucketPress = (BucketID, BrandID, BrandName, TotalProducts, imageSource) => {
        this.props.navigation.navigate("Bucket", {BucketID, BrandID, BrandName, TotalProducts, imageSource});
    }

    navigateCheckout = (BucketID, BrandName, Status) => {
        if(this.props.ProfileCompleted) {
            this.props.navigation.navigate('CheckOut', { BucketID, BrandName, Status });
        } else {
            this.props.navigation.navigate('EditProfile');
        }

    }

    navigateBrand = (BrandID) => {
        this.props.navigation.navigate("BrandProfile", {BrandID});
    }

    navigateChat = (BucketID, Name, BrandID, imageSource) => {
        this.props.navigation.navigate('Chat', {
            BucketID, Name,
            Status: 0,
            BrandID,
            OrderID: 0,
            imageSource,
            initials: AvatarHelper.getInitials(Name)
        })
    }

    FlatListRenderItem = ({item}) => (
        <BucketComponent
            item={item}
            NavigateBucket={this.onBucketPress}
            navigateCheckout={this.navigateCheckout}
            navigateBrand={this.navigateBrand}
        />
    )

    NavigateLogin = () => {
        this.props.navigation.push("Auth", {screen: 'Login'});
    }

    NavigateOrders = () => {
        this.props.navigation.navigate("MyOrders");
    }

    onRefresh = () => {
        this.setState({refreshing: true})
        FetchCart(this.props.AccessToken, this.abortController.signal).then(Cart => {
            Cart = Cart.map(item => {
                item.BucketID = item.BucketID.toString();
                return item;
            });
            this.setState({Cart, refreshing: false});
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <>
                {
                    !this.props.SkipLogin ?
                        <TextNavBar Title={"My Cart"} Navigation={this.NavigateOrders}>
                            <CheckoutIcon Color={Colors.black} size={24}/>
                        </TextNavBar> :
                        <TextNavBar Title={"My Cart"} />
                }
                {this.props.SkipLogin ?
                    <UnLoggedScreen NavigateLogin={this.NavigateLogin} />
                    :
                    this.state.Loading ?
                        <Loader />
                        :
                        <View flex centerH>
                            <FlatList
                                data={this.state.Cart}
                                renderItem={this.FlatListRenderItem}
                                keyExtractor={(item) => item.BucketID}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={
                                    <View flex centerV centerH style={{height:655}} paddingH-40>
                                        <Text center b1 grey40>We didn't find anything in your cart.</Text>
                                    </View>
                                }
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        </View>


                }
            </>
        );
    }

};

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken,
    SkipLogin: state.Auth.SkipLogin,
    ProfileCompleted: (state.Profile.ProfileStatus === 2)
});

export default connect(mapsStateToProps)(Cart);
