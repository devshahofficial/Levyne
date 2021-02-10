import React, { Component } from 'react';
import {Text, View, Colors, TouchableOpacity} from 'react-native-ui-lib';
import NavBarBack from '../../components/NavBarBack';
import OrdersContainer from "../../components/OrdersContainer";
import {connect} from 'react-redux';
import FetchOrders from '../../API/Orders/FetchOrders';
import {FlatList, Modal} from 'react-native';
import Loader from '../../components/Loader';
import ActionSheet from '../../components/Modal/ActionSheet';
import CancelOrder from '../../API/Orders/CancelOrder';
import RazorpayCheckout from 'react-native-razorpay';
import config from '../../assets/constants';

class MyOrders extends Component {

    /**
     * @param {any} props
     */
    constructor(props) {
        super(props);
        this.state = {
            Orders : [],
            Loading: true,
            ModalBucketID: undefined,
            ModalVisible: false
        }
        this.abortController = new AbortController();
        this.Page = 0;
        this.LoadingNewOrders = false;
        if(!this.props.route.params) {
            this.props.route.params = {
                OrderID: null
            }
        }
    }

    handleCancelOrder = () => {

        /** @type {number} */
        // @ts-ignore
        const BucketID = this.state.ModalBucketID;
        this.setState({
            Loading: true,
            ModalVisible: false,
            ModalBucketID: undefined
        });

        CancelOrder(BucketID, this.props.AccessToken).then(() => {
            this.Page = 0;
            this.componentDidMount();
        }).catch(console.log);
    }

    componentDidMount() {
        FetchOrders(this.props.AccessToken, this.props.route.params.OrderID, ++this.Page, this.abortController.signal).then(Orders => {
            this.setState({
                Orders,
                Loading: false
            })
        }).catch(console.log);
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    /**
     * @param {any} OrderItem
     */
    RetryPayment = async (OrderItem) => {
        this.setState({ Loading: true });
        this.Page = 0;
        try {
            await RazorpayCheckout.open({
                image: 'https://levyne.com/images/favicon.png',
                currency: 'INR',
                key: config.RazorPayKeyID, // Your api key
                amount: OrderItem.FinalAmount*100,
                name: 'Levyne',
                order_id: OrderItem.RazorPayOrderID,
                prefill: {
                    email: this.props.Email,
                    contact: this.props.Mobile,
                    name: this.props.Name
                },
                theme: {color: Colors.primary,backdrop_color:Colors.black}
            });

            FetchOrders(this.props.AccessToken, this.props.route.params.OrderID, ++this.Page, this.abortController.signal).then(Orders => {
                // @ts-ignore
                Orders.forEach(item => {
                    if(item.OrderID === OrderItem.OrderID) {
                        item.OrderStatus = 3;
                    }
                });
                this.setState({
                    Orders,
                    Loading: false
                })
            }).catch(console.log);

        } catch(err) {}
    }

    /**
     * @param {any} BucketID
     */
    CancelOrder = (BucketID) => {
        this.setState({
            ModalVisible: true,
            ModalBucketID: BucketID
        });
    }


    /**
     * @param {number} OrderID
     * @param {number} BrandRating
     */
    RateExperience = (OrderID, BrandRating) => {
        this.props.navigation.navigate('AddReview', { OrderID, Rating: BrandRating });
    }

    FlatListRenderItem = ({item}) => (
        <OrdersContainer
            {...item}
            PaymentSuccess={this.props.route.params.PaymentSuccess}
            NavigateBrand={this.NavigateBrand}
            NavigateOrder={this.NavigateOrder}
            RetryPayment={this.RetryPayment}
            CancelOrder={this.CancelOrder}
            RateExperience={this.RateExperience}
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

    /**
     * @param {any} BucketID
     * @param {any} BrandID
     * @param {any} BrandName
     * @param {any} ProfileImage
     */
    NavigateOrder = (BucketID, BrandID, BrandName, ProfileImage) => {
        this.props.navigation.navigate('Order', {
            BucketID,
            BrandID,
            BrandName,
            ProfileImage
        });
    }

    /**
     * @param {any} BrandID
     */
    NavigateBrand = (BrandID) => {
        this.props.navigation.push('BrandProfile', {BrandID});
    }

    ChangeModalVisible = () => {
        this.setState({
            ModalVisible: !this.state.ModalVisible
        })
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
                        <Modal
                            animationType='fade'
                            transparent={true}
                            visible={this.state.ModalVisible}
                            presentationStyle={'overFullScreen'}
                        >
                            <TouchableOpacity
                                style={{
                                    flex:1,
                                    flexDirection: 'column-reverse',
                                    backgroundColor: 'rgba(52, 52, 52, 0.8)'
                                }}
                                onPress={this.ChangeModalVisible}
                                activeOpacity={1}
                            >
                                <ActionSheet
                                    actionItems={[{
                                        id: 1,
                                        label: 'Confirm',
                                        onPress: this.handleCancelOrder
                                    }]}
                                    onCancel={this.ChangeModalVisible}
                                />
                            </TouchableOpacity>
                        </Modal>
                    </View>
                }
            </>
        );
    }
}

/**
 * @param {{ Auth: { AccessToken: any; Mobile: any; }; Profile: { Name: any; Email: any; }; }} state
 */
const mapsStateToProps = state => ({
    AccessToken: state.Auth.AccessToken,
    Name: state.Profile.Name,
    Email: state.Profile.Email,
    Mobile: state.Auth.Mobile
});

export default connect(mapsStateToProps)(MyOrders);
