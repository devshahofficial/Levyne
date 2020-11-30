
import React from 'react';
import {View, Text, AvatarHelper} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../../components/NavBarBack';
import BucketComponent from "../../components/BucketComponent";
import FetchCart from '../../API/FetchCart';
import {ActivityIndicator, FlatList, Alert} from 'react-native';
import UnLoggedScreen from '../../components/UnLoggedScreen';

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
    }

    onBucketPress = (BucketID, BrandID, BrandName, TotalProducts) => {
        this.props.navigation.navigate("Bucket", {BucketID, BrandID, BrandName, TotalProducts});
    }

    navigateCheckout = (BucketID, Status) => {
        if(Status === 0) {
            Alert.alert('Warning', 'Checkout is disabled')
        } else {
            this.props.navigation.navigate("CheckOut", {BucketID});
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
            navigateChat={this.navigateChat}
        />
    )

    NavigateLogin = () => {
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Your Wardrobe'}/>
                {this.props.SkipLogin ?
                    <UnLoggedScreen NavigateLogin={this.NavigateLogin} />
                    :
                    this.state.Loading ?
                        <View flex center>
                            <ActivityIndicator />
                        </View>
                        :
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
    AccessToken : state.Auth.AccessToken,
    SkipLogin: state.Auth.SkipLogin
});

export default connect(mapsStateToProps)(Cart);
