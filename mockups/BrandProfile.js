import React, { Component } from 'react';
import {FlatList, StyleSheet, ScrollView} from 'react-native';
import {View, Text, Colors, TouchableOpacity, Button} from 'react-native-ui-lib';
import ProductItemContainer from '../components/ProductItemContainer';
import ProfileTopSection from '../components/ProfileTopSection';
import ViewBrandProfile from '../API/Brand/ViewBrandProfile';
import FetchBrandProducts from '../API/Products/FetchBrandProducts';
import {connect} from 'react-redux';
import BrandFollowing from '../API/Brand/BrandFollowing'
import NavBarBack from '../components/NavBarBack';
import {TabBar, TabView} from "react-native-tab-view";
import Loader from "../components/Loader";
import FabricItemContainer from "../components/FabricItemContainer";
import FetchBrandFabrics from "../API/Fabrics/FetchFabricByBrandID";
import ProfileBottomSection from "../components/MyProfileBottomSection";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import CstmShadowView from "../components/CstmShadowView";
import ReviewForProducts from "../components/ReviewForProducts";
import FetchBrandReviews from "../API/Brand/FetchBrandReviews";

/**
 * @type {React.Component}
 * @typedef {import('../Types/index').HomeStackParamList} HomeStackParamList
 * @typedef {{AccessToken: string, SkipLogin: boolean}} ReduxProps
 * @typedef {RouteProp<HomeStackParamList, 'BrandProfile'>} ReviewScreenRouteProp
 * @typedef {StackNavigationProp<HomeStackParamList, "BrandProfile">} ReviewScreenNavigationProps
 * @typedef {ReduxProps & { navigation: ReviewScreenNavigationProps, route: ReviewScreenRouteProp }} Props
 * @extends {React.Component<Props>}
 */



class BrandProfile extends Component {

    /**
     * @param {Props | Readonly<Props>} props
     */
    constructor(props) {
        super(props);
        this.state = {
            BackgroundColor: Colors.white,
            TextColor: Colors.primary,
            ProfileLoading : true,
            FabricsLoading: true,
            ReviewLoading: false,
            Name : '',
            Followers : '',
            Followings : '',
            BrandRating : '',
            ProfileImage : '',
            Latitude: '',
            Longitude: '',
            TotalProducts: 0,
            index: 0,
            BrandProducts : [],
            BrandFabrics: [],
            BrandGenre: [],
            StudioDaysOpen: [0,0,0,0,0,0,0],
            StudioStartTiming: "0000",
            StudioCloseTiming: "0000",
            BrandProductOffering: [],
            Delivery: 0,
            Reviews: [],
            MeasurementService: 0,
            Parking: 0,
            Tailoring: 0,
            TrialRoom: 0,
            Type: 0,
            DoIFollow : false,
            BrokerShipStatus : -1,
            routes : [
                { key: 'Profile', title: 'Profile' },
                { key: 'Products', title: 'Products' },
                { key: 'Fabrics', title: 'Fabrics' },
                { key: 'Reviews', title: 'Reviews' }
            ]
        }

        this.ProductPage = 1;
        this.FabricPage = 1;
        this.abortController = new AbortController();
        this.BrandID = Number(this.props.route.params.BrandID);
    }

    componentDidMount() {
        ViewBrandProfile(this.props.route.params.BrandID,this.props.AccessToken, this.abortController.signal).then(ProfileObject => {
            this.setState({
                Name : ProfileObject.Name,
                Brokers : ProfileObject.Brokers,
                Followings : ProfileObject.Followings,
                Followers: ProfileObject.Followers,
                DoIFollow: ProfileObject.DoIFollow ? true : false,
                BrandRating : ProfileObject.BrandRating,
                ProfileImage : ProfileObject.ProfileImage,
                About : ProfileObject.About,
                Latitude: ProfileObject.Latitude,
                Longitude: ProfileObject.Longitude,
                TotalProducts: ProfileObject.TotalProducts,
                ProfileLoading: false,
                StudioDaysOpen: ProfileObject.StudioDaysOpen,
                StudioStartTiming: ProfileObject.StartTiming,
                StudioCloseTiming: ProfileObject.CloseTiming,
                Address : ProfileObject.Address + "\nPinCode : " + ProfileObject.PinCode,
                BrandGenre: ProfileObject.BrandGenre || [],
                BrandProductOffering: ProfileObject.BrandProductOffering || [],
                Delivery: ProfileObject.Delivery,
                MeasurementService: ProfileObject.MeasurementService,
                Parking: ProfileObject.Parking,
                Tailoring: ProfileObject.Tailoring,
                TrialRoom: ProfileObject.TrialRoom,
                Type: ProfileObject.Type
            });
        }).catch(() => {});

        FetchBrandReviews({BrandID: this.props.route.params.BrandID, Limit: 10}).then(Reviews => {
            this.setState({ Reviews });
        }).catch(() => {})


        FetchBrandProducts(this.props.route.params.BrandID, this.ProductPage, this.props.AccessToken, this.abortController.signal).then(rows => {
            this.TotalProducts = rows.Total;
            this.setState({
                BrandProducts : rows.Products,
                ProductsLoading : false
            })
        }).catch(() => {});

        FetchBrandFabrics(this.props.route.params.BrandID, this.FabricPage, this.props.AccessToken, this.abortController.signal).then(rows => {
            this.TotalFabrics = rows.Total;
            this.setState({
                BrandFabrics : rows.Fabrics,
                FabricsLoading : false
            })
        }).catch(() => {});

    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    navigateFollowers = () => {}

    navigateFollowings = () => {
        this.props.navigation.push('BrandList', {
            BrandID: this.props.route.params.BrandID
        })
    }

    /**
     * @param {number} ProductID
     */
    navigateProduct = (ProductID) => {
        this.props.navigation.push('Product', {ProductID})
    }

    /**
     * @param {number} FabricID
     */
    navigateFabric = (FabricID) => {
        this.props.navigation.push('Fabric', {FabricID})
    }

    NavigateLogin = () => {
        this.props.navigation.push("Auth", {screen: 'Login'});
    }

    ProductRenderItem = ({ item }) =>
        <ProductItemContainer
            Token={this.props.AccessToken}
            item={item} navigateProduct={this.navigateProduct}
            NavigateLogin={this.NavigateLogin}
        />

    FabricRenderItem = ({ item }) =>
        <FabricItemContainer
            Token={this.props.AccessToken}
            item={item}
            NavigateLogin={this.NavigateLogin}
            navigateFabric={this.navigateFabric}
        />

    ProductScreenOnEndReached = () => {
        if(!this.ProductsLoading && this.state.BrandProducts.length < this.TotalProducts) {
            this.ProductsLoading = true;
            FetchBrandProducts(this.props.route.params.BrandID, ++this.ProductPage, this.props.AccessToken, this.abortController.signal).then(rows => {
                this.setState({
                    BrandProducts : [...this.state.BrandProducts, ...rows.Products]
                })
                this.ProductsLoading = false;
            }).catch((err) => {});
        }
    }

    FabricScreenOnEndReached = () => {
        if(!this.FabricsLoading && this.state.BrandFabrics.length < this.TotalFabrics) {
            this.FabricsLoading = true;
            FetchBrandFabrics(this.props.route.params.BrandID, ++this.FabricPage, this.props.AccessToken, this.abortController.signal).then(rows => {
                this.setState({
                    BrandFabrics : [...this.state.BrandFabrics, ...rows.Fabrics]
                })
                this.FabricsLoading = false;
            }).catch(() => {})
        }
    }

    ProfileScreen = () => {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{flex:1}}
            >
                <ProfileTopSection
                    ProfileImage={this.state.ProfileImage}
                    TotalProducts={this.state.TotalProducts}
                    Followings={this.state.Followings}
                    Followers={this.state.Followers}
                    BrandRating={this.state.BrandRating}
                    Name={this.state.Name}
                    navigateFollowers={this.navigateFollowers}
                    navigateFollowings={this.navigateFollowings}
                    Type={this.state.Type}
                />
                <View padding-20 row center>
                    <CstmShadowView style={{flex:1, marginRight:10, height:45}}>
                        <Button
                            flex hb2
                            label={"Order"}
                        />
                    </CstmShadowView>
                    <CstmShadowView style={{flex:1, marginLeft:10, height:45}}>
                        <Button
                            flex onPress={this.Follow} hb2
                            style={[
                                {
                                    backgroundColor: this.state.DoIFollow ? Colors.primary : Colors.white,
                                },
                            ]}
                            label={this.state.DoIFollow ? "Following" : "Follow" }
                            labelStyle={{color: this.state.DoIFollow ? Colors.white : Colors.primary}}
                        />
                    </CstmShadowView>
                </View>
                <ProfileBottomSection
                    Address={this.state.Address}
                    Longitude={this.state.Longitude}
                    Latitude={this.state.Latitude}
                    Name={this.state.Name}
                    About={this.state.About}
                    StudioStartTiming={this.state.StudioStartTiming}
                    StudioCloseTiming={this.state.StudioCloseTiming}
                    StudioDaysOpen={this.state.StudioDaysOpen}
                    BrandGenre={this.state.BrandGenre}
                    BrandProductOffering = {this.state.BrandProductOffering}
                    Delivery={this.state.Delivery}
                    MeasurementService={this.state.MeasurementService}
                    Parking={this.state.Parking}
                    Tailoring={this.state.Tailoring}
                    TrialRoom={this.state.TrialRoom}
                />
            </ScrollView>
        )
    }

    /**
     * @param {{ BrandProducts: readonly any[] | null | undefined; }} props
     */
    ProductScreen = (props) => {
        return (
            <View flex>
                <FlatList
                    data={props.BrandProducts}
                    numColumns={2}
                    scrollEventThrottle={10}
                    renderItem={this.ProductRenderItem}
                    keyExtractor={item => item.ProductID}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View flex center>
                            <Text center marginT-250 paddingH-50 h1 grey40>No products found.</Text>
                        </View>
                    }
                    onEndReached = {this.ProductScreenOnEndReached}
                    onEndReachedThreshold={0.75}
                />
            </View>
        );
    }


    /**
     * @param {{ BrandFabrics: readonly any[] | null | undefined; }} props
     */
    FabricScreen = (props) => {
        return (
            <>
                <View center padding-10 style={{backgroundColor:Colors.shadow, height: 'auto'}}>
                    <Text>Fabric price is per product.</Text>
                </View>
                <View flex>
                    <FlatList
                        data={props.BrandFabrics}
                        numColumns={2}
                        scrollEventThrottle={10}
                        renderItem={this.FabricRenderItem}
                        keyExtractor={item => item.FabricID}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View flex center>
                                <Text center marginT-250 paddingH-50 h1 grey40>No fabrics found.</Text>
                            </View>
                        }
                        onEndReached = {this.FabricScreenOnEndReached}
                        onEndReachedThreshold={0.75}
                    />
                </View>
            </>
        );
    }

    ReviewScreen = (props) => {
        return (
            <>
                <View center padding-10 style={{backgroundColor:Colors.shadow, height: 'auto'}}>
                    <Text>Reviews from customers!</Text>
                </View>
                <View flex>
                    <ReviewForProducts Reviews={this.props.BrandReviews} />
                </View>
            </>
        );
    }

    Follow = () => {

        if(this.props.SkipLogin) {
            this.NavigateLogin();
        } else {
            if(this.state.DoIFollow) {
                BrandFollowing.UnFollowTheBrand(this.props.route.params.BrandID, this.props.AccessToken).catch((err) => {
                    console.log(err);
                })
                this.setState({
                    DoIFollow : false
                })
            } else {
                BrandFollowing.FollowTheBrand(this.props.route.params.BrandID, this.props.AccessToken).catch((err) => {
                    console.log(err);
                })
                this.setState({
                    DoIFollow : true
                })
            }
        }
    }

    render() {
        return (
            <>
                <NavBarBack Title={this.state.Name} Navigation={this.props.navigation.goBack}/>
                <View flex>
                    <TabView
                        navigationState={{index : this.state.index, routes : this.state.routes}}
                        onIndexChange={(index) => this.setState({index})}
                        renderTabBar={(props) => <TabBar
                            {...props}
                            bounces={false}
                            scrollEnabled={true}
                            activeColor={Colors.white}
                            labelStyle={styles.Label}
                            inactiveColor={Colors.secondary}
                            indicatorStyle={styles.IndicatorStyle}
                            tabStyle={styles.TabStyle}
                            style={styles.Tab}
                        />}
                        renderScene={({ route }) => {
                            switch (route.key) {
                                case 'Profile':
                                    return this.state.ProfileLoading ? <Loader/> : <this.ProfileScreen BrandProducts={this.state.BrandProducts} />
                                case 'Products':
                                    return this.state.ProductsLoading ? <Loader/> : <this.ProductScreen BrandProducts={this.state.BrandProducts} />
                                case 'Fabrics':
                                    return this.state.FabricsLoading ? <Loader/> : <this.FabricScreen BrandFabrics={this.state.BrandFabrics} />
                                case 'Reviews':
                                    return this.state.ReviewLoading ? <Loader/> : <this.ReviewScreen BrandReviews={this.state.Reviews} />
                            }
                        }}
                    />
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        height: 40,
        width: '100%',
        marginTop: 30,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 14,
        color: Colors.primary,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    Tab: {
        backgroundColor: Colors.white,
    },
    Label: {
        fontSize: 14,
        fontFamily: "Mulish-ExtraBold",
        flex:1,
    },
    TabStyle: {
        height:50,
    },
    IndicatorStyle: {
        backgroundColor: Colors.grey50,
        height:35,
        marginVertical:7.5,
        borderRadius:10,
    }
})
/**
 * @param {{ Auth: { AccessToken: string; SkipLogin: boolean; }; }} state
 */
const mapsStateToProps = state => ({
    AccessToken: state.Auth.AccessToken,
    SkipLogin: state.Auth.SkipLogin
});

export default connect(mapsStateToProps)(BrandProfile)
