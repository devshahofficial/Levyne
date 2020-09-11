import React, { Component } from 'react';
import {FlatList, StyleSheet, ScrollView} from 'react-native';
import {View, Text, Colors, TouchableOpacity} from 'react-native-ui-lib';
import ProductItemContainer from '../components/ProductItemContainer';
import ProfileTopSection from '../components/ProfileTopSection';
import ViewBrandProfile from '../API/ViewBrandProfile';
import FetchBrandProducts from '../API/FetchBrandProducts';
import {connect} from 'react-redux';
import BrandFollowing from '../API/BrandFollowing'
import NavBarBack from '../components/NavBarBack';
import {TabBar, TabView} from "react-native-tab-view";
import Loader from "../components/Loader";
import FabricItemContainer from "../components/FabricItemContainer";
import FetchBrandFabrics from "../API/FetchFabricByBrandID";
import ProfileBottomSection from "../components/MyProfileBottomSection";


class BrandProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            BackgroundColor: Colors.white,
            TextColor: Colors.primary,
            ProfileLoading : true,
            FabricsLoading: true,
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
            ]
        }
        this.BrandID = parseInt(this.props.route.params.BrandID);
        this.MyBrandID = parseInt(this.props.BrandID);
    }

    componentDidMount() {
        this._isMounted = true;
        this.ProductPage = 1;
        this.FabricPage = 1;
        ViewBrandProfile(this.props.route.params.BrandID,this.props.AccessToken).then(ProfileObject => {
            if (this._isMounted) {
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
            }
        }).catch((err) => {
            console.log(err);
        });

        FetchBrandProducts(this.props.route.params.BrandID, this.ProductPage, this.props.AccessToken).then(rows => {
            if (this._isMounted) {
                this.TotalProducts = rows.Total;
                this.setState({
                    BrandProducts : rows.Products,
                    ProductsLoading : false
                })
            }
        }).catch((err) => {
            console.log(err);
        });

        FetchBrandFabrics(this.props.route.params.BrandID, this.FabricPage, this.props.AccessToken).then(rows => {
            if (this._isMounted) {
                this.TotalFabrics = rows.Total;
                this.setState({
                    BrandFabrics : rows.Fabrics,
                    FabricsLoading : false
                })
            }
        }).catch((err) => {
            console.log(err);
        });


        /*ArchiveProductAPI.ListArchiveProducts(this.ArchivePage++, this.props.AccessToken).then(rows => {
            if (this._isMounted) {
                this.TotalArchiveProducts = rows.Total;
                this.setState({
                    ArchivedProducts : rows.Products,
                    ArchiveProductsLoading : false
                });
            }
        }).catch(err => {});
        */

    }

    navigateFollowers = () => {}

    navigateFollowings = () => {
        this.props.navigation.push('BrandList', {
            BrandID: this.props.route.params.BrandID,
            Type: 1
        })
    }

    navigateProduct = (ProductID) => {
        this.props.navigation.push('Product', {ProductID})
    }

    navigateFabric = (FabricID) => {
        this.props.navigation.push('Fabric', {FabricID})
    }

    ProductRenderItem = ({ item }) =>
        <ProductItemContainer
            Token={this.props.AccessToken}
            item={item} navigateProduct={this.navigateProduct}
            archivePressed={() => this.archivePressed({Type: 'Product', ID: item.ProductID})}
        />

    FabricRenderItem = ({ item }) =>
        <FabricItemContainer
            Token={this.props.AccessToken}
            item={item}
            navigateFabric={this.navigateFabric}
            archivePressed={() => this.archivePressed({Type: 'Fabric', ID: item.FabricID})}
        />

    ProductScreenOnEndReached = () => {
        if(!this.ProductsLoading && this.state.BrandProducts.length < this.TotalProducts) {
            this.ProductsLoading = true;
            FetchBrandProducts(this.props.BrandID, ++this.ProductPage, this.props.AccessToken).then(rows => {
                if(this._isMounted) {
                    this.setState({
                        BrandProducts : [...this.state.BrandProducts, ...rows.Products]
                    })
                    this.ProductsLoading = false;
                }
            }).catch(() => {});
        }
    }

    FabricScreenOnEndReached = () => {
        if(!this.FabricsLoading && this.state.BrandFabrics.length < this.TotalFabrics) {
            this.FabricsLoading = true;
            FetchBrandFabrics(this.props.BrandID, ++this.FabricPage, this.props.AccessToken).then(rows => {
                if(this._isMounted) {
                    this.setState({
                        BrandFabrics : [...this.state.BrandFabrics, ...rows.Fabrics]
                    })
                    this.FabricsLoading = false;
                }
            }).catch(err => {
                //console.log(err);
            })
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
                {this.BrandID === this.MyBrandID ? <></> :
                    <View marginH-20>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: this.state.DoIFollow ? Colors.primary : Colors.white,
                                    borderWidth: 1,
                                    borderColor: Colors.primary,
                                },
                            ]}
                            onPress={this.Follow}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    { color: this.state.DoIFollow ? Colors.white : Colors.primary },
                                ]}
                            >
                                {this.state.DoIFollow ? "Following" : "Follow" }
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
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

    ProductScreen = (props) => {
        return (
            <View center flex>
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


    FabricScreen = (props) => {
        return (
            <View center flex>
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
        );
    }

    Follow = () => {
        if(this.state.DoIFollow) {
            BrandFollowing.UnFollowTheBrand(this.props.route.params.BrandID, this.props.AccessToken).catch((err) => {
                //console.log(err);
            })
            this.setState({
                DoIFollow : false
            })
        } else {
            BrandFollowing.FollowTheBrand(this.props.route.params.BrandID, this.props.AccessToken).catch((err) => {
                //console.log(err);
            })
            this.setState({
                DoIFollow : true
            })
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
        borderRadius: 15,
        height: 35,
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
        backgroundColor: Colors.primary,
        height:35,
        marginVertical:7.5,
        borderRadius:50,
    }
})
const mapsStateToProps = state => ({
    AccessToken: state.Auth.AccessToken,
    BrandID: state.Auth.BrandID,
});

export default connect(mapsStateToProps)(BrandProfile)
