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
import RemoveProductFromCart from '../../API/RemoveProductFromCart';
import DeliveryChargeComponent from '../../components/DeliveryChargeComponent';
import ImageView from "react-native-image-viewing";
import ConstBottomButton from "../../components/constBottomButton";
import PickerModal from "../../components/PickerModal";


class Bucket extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            Buckets: [],
            Loading: true,
            ImageViewVisible: false,
            ImageViewImage: {},
            CheckoutActive: false,
            CartIDForDeletion: undefined,
            ProductTypeForDeletion: undefined,
            DeleteModalVisible: false
        }
        this.abortController = new AbortController();
    }

    ActionSheetItems = [
        {
            id: 0,
            label: 'Confirm',
            onPress: () => {
                this.RemoveProductFromCart()
            }
        }
    ];

    componentDidMount() {
        FetchBucket(this.props.route.params.BucketID, this.props.AccessToken, this.abortController.signal).then((Buckets) => {
            let CheckoutActive = true;
            for(let i = 0;i<Buckets.length;i++) {
                if(!Buckets[i].DecidedPrice) {
                    CheckoutActive = false;
                    break;
                }
            }
            this.setState({
                Buckets,
                Loading: false,
                CheckoutActive
            });
        }).catch(() => {});

        this.willFocusSubscription = this.props.navigation.addListener(
            'focus', () => {
                this.setState({Loading: true});
                FetchBucket(this.props.route.params.BucketID, this.props.AccessToken, this.abortController.signal).then((Buckets) => {
                    let CheckoutActive = true;
                    for(let i = 0;i<Buckets.length;i++) {
                        if(!Buckets[i].DecidedPrice) {
                            CheckoutActive = false;
                            break;
                        }
                    }
                    this.setState({
                        Buckets,
                        Loading: false,
                        CheckoutActive
                    });
                }).catch(() => {});
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
            DisplayImageView={this.DisplayImageView}
            navigateProduct={this.navigateProduct}
            navigateFabric={this.navigateFabric}
            RemoveProductFromCart={this.setStateForProductDelete}
        />
    )

    navigateProduct = (ProductID) => {
        this.props.navigation.navigate('Product', {ProductID});
    }

    navigateFabric = (FabricID) => {
        this.props.navigation.navigate('Fabric', {FabricID});
    }

    navigateCheckout = () => {
        if(this.state.CheckoutActive && !this.state.Loading) {
            this.props.navigation.navigate('CheckOut', {
                BucketID: this.props.route.params.BucketID,
                BrandName: this.props.route.params.BrandName
            });
        }
    }

    DisplayImageView = (ImageURL) => {
        this.setState({
            ImageViewVisible: true,
            ImageViewImage: {uri: ImageURL}
        })
    }

    CloseImageView = () => {
        this.setState({ImageViewVisible: false})
    }

    RemoveProductFromCart = () => {
        this.setState({
            Buckets : this.state.Buckets.filter(item => !(item.CartID === this.state.CartIDForDeletion && item.ProductType === this.state.ProductTypeForDeletion)),
            DeleteModalVisible : !this.state.DeleteModalVisible
        })
        RemoveProductFromCart(this.props.route.params.BucketID, this.state.CartIDForDeletion, this.state.ProductTypeForDeletion, this.props.AccessToken).catch(console.log);
    }

    setDeleteModalVisible = () => {
        this.setState({
            DeleteModalVisible : !this.state.DeleteModalVisible
        })
    }

    setStateForProductDelete = (CartID, ProductType) => {
        this.setState({
            DeleteModalVisible : !this.state.DeleteModalVisible,
            CartIDForDeletion: CartID,
            ProductTypeForDeletion: ProductType
        })
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
                                <View marginV-20 paddingH-15 center row style={styles.View}>
                                    <DeliveryIcon size={30} Color={Colors.black} />
                                    <DeliveryChargeComponent TotalPrice = {this.props.route.params.DecidedPrice} />
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
                <ImageView
                    images={[this.state.ImageViewImage]}
                    visible={this.state.ImageViewVisible}
                    onRequestClose={this.CloseImageView}
                    imageIndex={0}
                />
                <PickerModal
                    ActionItems={this.ActionSheetItems}
                    modalVisible={this.state.DeleteModalVisible}
                    setModalVisible={this.setDeleteModalVisible}
                />
                <ConstBottomButton
                    ButtonA={"Chat"}
                    ButtonB={"Checkout"}
                    ButtonActionB={this.navigateCheckout}
                />
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
        width: 'auto',
        backgroundColor: Colors.primary,
    }
});


const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(Bucket);
