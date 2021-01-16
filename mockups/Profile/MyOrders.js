import React, { Component } from 'react';
import {Text, View, Colors} from 'react-native-ui-lib';
import NavBarBack from '../../components/NavBarBack';
import OrdersContainer from "../../components/OrdersContainer";
import {connect} from 'react-redux';
import FetchOrders from '../../API/Orders/FetchOrders';
import {StyleSheet, FlatList} from 'react-native';
import Loader from '../../components/Loader';

class MyOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Orders : [],
            Loading: true
        }
        this.abortController = new AbortController();
        this.Page = 0;
        this.LoadingNewOrders = false;
    }

    componentDidMount() {
        FetchOrders(this.props.AccessToken, ++this.Page, this.abortController.signal).then(Orders => {
            this.setState({
                Orders,
                Loading: false
            })
        }).catch(console.log);
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    FlatListRenderItem = ({item}) => (
        <OrdersContainer
            {...item}
            CompanyRating={5}
            NavigateBrand={this.NavigateBrand}
            NavigateOrder={this.NavigateOrder}
        />
    )

    onEndReached = () => {
        if(this.state.Orders.length === this.Page*20 && !this.LoadingNewOrders) {
            this.LoadingNewOrders = true;
            FetchOrders(this.props.AccessToken, ++this.Page, this.abortController.signal).then(Orders => {
                this.LoadingNewOrders = false;
                this.setState({
                    Orders : this.state.Orders.push(...Orders)
                });
            }).catch(() => {})
        }
    }

    NavigateOrder = (BucketID, BrandID, BrandName, ProfileImage) => {
        this.props.navigation.navigate('Order', {
            BucketID,
            BrandID,
            BrandName,
            ProfileImage
        });
    }

    NavigateBrand = (BrandID) => {
        this.props.navigation.push('BrandProfile', {BrandID});
    }

    Header = () => {
        return(
            <View style={styles.Header} marginB-10>
                <Text center hb2>Note:</Text>
                <Text h2 secondary>Once the order gets accepted from our side, you won't be able to cancel the order.</Text>
                <Text marginT-5 h2 secondary>For order cancellation call us on +91-9819077182.</Text>
            </View>
        )
    }
    render() {
        return(
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Wardrobe'}/>
                {this.state.Loading ?
                    <Loader /> :
                    <View flex>
                        <FlatList
                            data={this.state.Orders}
                            ListEmptyComponent={
                                <View flex centerV centerH style={{height:655}} paddingH-40>
                                    <Text center b1 grey40>No Orders Found.</Text>
                                </View>
                            }
                            renderItem={this.FlatListRenderItem}
                            onEndReached = {this.onEndReached}
                            onEndReachedThreshold={0.75}
                            keyExtractor={(item) => item.OrderID.toString()}
                        />
                    </View>
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    Header: {
        borderWidth:1,
        borderColor: Colors.shadow,
        borderRadius: 5,
        padding: 10

    }
})

const mapsStateToProps = state => ({
    AccessToken: state.Auth.AccessToken,
});

export default connect(mapsStateToProps)(MyOrders);
