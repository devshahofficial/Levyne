import React, { Component } from 'react';
import {Text, View, Colors, TouchableOpacity} from 'react-native-ui-lib';
import NavBarBack from '../../components/NavBarBack';
import OrdersContainer from "../../components/OrdersContainer";
import {connect} from 'react-redux';
import FetchOrders from '../../API/Orders/FetchOrders';
import {FlatList, Linking, Modal, StyleSheet, TouchableHighlight} from 'react-native';
import Loader from '../../components/Loader';
import CancelOrder from '../../API/Orders/CancelOrder';

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

    TrackOrder = (Slug, TrackingID) => {
        Linking.openURL(`https://track.aftership.com/trackings?courier=${Slug}&tracking-numbers=${TrackingID}`).catch(console.log);
    }

    FlatListRenderItem = ({item}) => (
        <OrdersContainer
            {...item}
            TrackOrder={this.TrackOrder}
            NavigateBrand={this.NavigateBrand}
            NavigateOrder={this.NavigateOrder}
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
                                <View style={styles.modalContent}>
                                    <View marginT-20 style={{borderBottomColor: Colors.grey60, borderBottomWidth:1}}>
                                        <Text center marginH-20 marginB-20 hb1>
                                           5% will be deducted as order cancellation fee.
                                        </Text>
                                    </View>
                                    <TouchableHighlight
                                        style={styles.actionSheetView}
                                        underlayColor={'#f7f7f7'}
                                        onPress={this.handleCancelOrder}
                                    >
                                        <Text h1
                                            allowFontScaling={false}
                                            style={styles.actionSheetText}
                                        >
                                            Confirm
                                        </Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={styles.actionSheetView}
                                        underlayColor={'#f7f7f7'}
                                        onPress={this.ChangeModalVisible}
                                    >
                                        <Text h1
                                            allowFontScaling={false}
                                            style={styles.actionSheetText}
                                        >
                                            Cancel
                                        </Text>
                                    </TouchableHighlight>
                                </View>
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

const PRIMARY_COLOR = Colors.secondary;
const WHITE = Colors.white;
const BORDER_COLOR = Colors.grey60;

const styles = StyleSheet.create({
    modalContent: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 20,
    },
    actionSheetView: {
        backgroundColor: WHITE,
        display: 'flex',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: BORDER_COLOR
    },
    actionSheetText: {
        fontSize: 18,
        color: PRIMARY_COLOR
    },
})

export default connect(mapsStateToProps)(MyOrders);
