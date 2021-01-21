import React from 'react';
import {Dimensions, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import {View, Text, Button, AvatarHelper} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../../components/NavBarBack';
import {DeliveryIcon} from "../../Icons/Secondary/DeliveryIcon";
import Colors from "../../Style/Colors";
import BucketProduct from "../../components/BucketProduct";
import {TimerIcon} from "../../Icons/Secondary/TimerIcon";
import FetchBucket from '../../API/Cart/FetchBucket';
import DeliveryChargeComponent from '../../components/DeliveryChargeComponent';
import ImageView from "react-native-image-viewing";
import ShadowView from "react-native-simple-shadow-view/src/ShadowView";
import Loader from '../../components/Loader';


class Bucket extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            Buckets: [],
            Loading: true,
            ImageViewVisible: false,
            ImageViewImage: {},
        }
        this.abortController = new AbortController();
    }

    componentDidMount() {
        FetchBucket(this.props.route.params.BucketID, this.props.AccessToken, this.abortController.signal).then((Buckets) => {
            this.setState({
                Buckets,
                Loading: false
            });
        }).catch((err) => {
            console.log(err);
        });

    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    FatListRenderItem = ({item}) => (
        <BucketProduct
            item={item}
            OrderCompleted={true}
            DisplayImageView={this.DisplayImageView}
            navigateProduct={this.navigateProduct}
            navigateFabric={this.navigateFabric}
            navigateDesign={this.navigateDesign}
        />
    )

    navigateDesign = (DesignID) => {
        this.props.navigation.navigate('ProductDetailsPage', {DesignID});
    }

    navigateProduct = (ProductID) => {
        this.props.navigation.navigate('Product', {ProductID});
    }

    navigateFabric = (FabricID) => {
        this.props.navigation.navigate('Fabric', {FabricID});
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

    NavigateChat = () => {
        this.props.navigation.navigate('Chat', {
            BucketID: this.props.route.params.BucketID,
            BrandID: this.props.route.params.BrandID,
            Name: this.props.route.params.BrandName,
            Status: 2,
            initials: AvatarHelper.getInitials(this.props.route.params.BrandName),
            imageSource: this.props.route.params.ProfileImage ? {uri: this.props.route.params.ProfileImage} : null
        });
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={this.props.route.params.BrandName}/>
                {this.state.Loading ?
                    <Loader /> :
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
                <SafeAreaView style={styles.Main}>
                    <ShadowView style={styles.ShadowView}>
                        <Button
                            onPress={this.NavigateChat}
                            style={{borderRadius:0, backgroundColor:Colors.primary}}
                            hb1 label={'Chat'} color={Colors.white}
                        />
                    </ShadowView>
                </SafeAreaView>
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
