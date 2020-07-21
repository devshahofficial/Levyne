import React, { Component } from 'react';
import {Modal, Animated, FlatList} from 'react-native';
import Loader from '../components/Loader';
import {Text, View, Colors, Button} from 'react-native-ui-lib';
import ProductItemContainer from '../components/ProductItemContainer'
import ProfileTopSection from '../components/ProfileTopSection'
import {connect} from 'react-redux';
import ViewProfile from '../API/ViewProfile';
import FetchBrandProducts from '../API/FetchBrandProducts';
import { TabView, TabBar } from 'react-native-tab-view';

import {StarIcon} from "../Icons/StarIcon";
const Stars = (props) => {
    let i;
    const stars = [false, false, false, false, false];
    for(i = 0; i<props.BrandRating; i++)
    {
        stars[i] = true;
    }
    return (
        <View row marginL-15 marginV-5>
            {stars.map((fill, i) => <StarIcon key={i.toString()} Fill={fill} height={15} width={15} Color={Colors.primary}/>)}
        </View>
    );
}

import TextNavBar from '../components/TextNavBar';
import CstmShadowView from "../components/CstmShadowView";

// const HEADER_EXPANDED_HEIGHT = 285;
class MyProfile extends Component {

    constructor(props) {
        super(props);
        this.state={
            Search : '',
            ProfileLoading : true,
            ProductsLoading : true,
            Name : this.props.Name,
            Followers : '',
            BrandRating : 0,
            ProfileImage : this.props.ProfileImage,
            ArchivedProducts : [],
            selectedIndex : 0,
            upperComponenetHeight: 0,
            About : this.props.About,
            index : 0,
            Address : this.props.Address,
            BrandProducts : [],
            archiveModalVisible:false,
            unArchiveModalVisible:false,
            scrollY: new Animated.Value(0),
            TotalProducts: '0',
            routes : [
                { key: 'Products', title: 'Products' },
                { key: 'Fabrics', title: 'Fabrics' },
                { key: 'Archive', title: 'Archived' }
            ]
        }
        this.TotalProducts = 0;
        this.Page = 1;
    }

    navigateProduct = (ProductID) => {
        this.props.navigation.push('Product', {
            ProductID : ProductID
        })
    }

    componentDidMount() {
        this._isMounted = true;
        ViewProfile(this.props.access_token).then(ProfileObject => {
            if (this._isMounted) {
                this.setState({
                    Name : ProfileObject.Name,
                    Brokers : ProfileObject.Brokers,
                    Followings : ProfileObject.Followings,
                    BrandRating : ProfileObject.BrandRating,
                    ProfileImage : ProfileObject.ProfileImage,
                    About : ProfileObject.About,
                    Address : ProfileObject.Address,
                    TotalProducts: ProfileObject.TotalProducts,
                    Followers: ProfileObject.Followers
                });
            }
        }).catch(() => {});
        
        FetchBrandProducts(this.props.BrandID, this.Page, this.props.access_token).then(rows => {
            if (this._isMounted) {
                this.TotalProducts = rows.Total;
                this.setState({
                    BrandProducts : rows.Products,
                    ProductsLoading : false
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    archivePressed = () => {
        this.setState({archiveModalVisible : true})
    }

    unArchivePressed = () => {
        this.setState({unArchiveModalVisible: true})
    }

    ProductScreen = (props) => {
        //const [BrandProducts, setBrandProducts] = useState(props.BrandProducts);

        return (
            <View centerV centerH flex>
                <Modal
                    animationType="slide"
                    visible={this.state.archiveModalVisible}
                >
                    <View>
                        <View marginV-10 marginH-10 style={{borderWidth:1,borderColor:Colors.grey60}}>
                            <View marginV-10>
                                <Text center f1 grey40>
                                    Note:
                                </Text>
                                <Text h3 marginH-20 center primary>
                                    Intead of deleting the products, we allow you to archive products.
                                    Archived products do not appear in the search or on your profile.
                                    If you want them to re-appear, you can unarchive them!
                                </Text>
                            </View>
                        </View>
                        <View marginT-200>
                            <Text center h1>Are you sure you want to archive?</Text>
                            <View row marginB-10 marginH-20>
                                <CstmShadowView style={{flex:1,marginRight:8}}>
                                    <Button
                                        flex
                                        label="Archive"
                                        hb2
                                    />
                                </CstmShadowView>
                                <CstmShadowView style={{flex:1,marginLeft:8}}>
                                    <Button
                                        flex
                                        label={'No'}
                                        hb2
                                    />
                                </CstmShadowView>
                            </View>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={props.BrandProducts}
                    numColumns={2}
                    /*onScroll={Animated.event(
                        [
                            { nativeEvent: {
                                contentOffset: {
                                    y: this.state.scrollY
                                }
                            }}
                        ],
                        {useNativeDriver: true}
                    )}
                    scrollEventThrottle={10}*/
                    renderItem={({ item }) => <ProductItemContainer Token={this.props.access_token} item={item} navigateProduct={this.navigateProduct} archivePressed={this.archivePressed} showArchive={1}/>}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View flex centerV centerH>
                            <Text center paddingH-50 marginT-200 h2 grey40>No products found. </Text>
                        </View>
                    }
                    onEndReached = {() => {
                        if(props.BrandProducts.length < this.TotalProducts) {
                            FetchBrandProducts(this.props.BrandID, ++this.Page, this.props.access_token).then(rows => {
                                if(this._isMounted) {
                                    //setBrandProducts([...props.BrandProducts, ...rows.Products]);
                                    this.setState({
                                        BrandProducts : [...this.state.BrandProducts, ...rows.Products]
                                    })
                                }
                            })
                        }
                    }}
                    onEndReachedThreshold={0.75}
                />
            </View>
        );
    }


    FabricScreen = (props) => {
        //const [BrandProducts, setBrandProducts] = useState(props.BrandProducts);

        return (
            <View centerV centerH flex>
                <Modal
                    animationType="slide"
                    visible={this.state.archiveModalVisible}
                >
                    <View>
                        <View marginV-10 marginH-10 style={{borderWidth:1,borderColor:Colors.grey60}}>
                            <View marginV-10>
                                <Text center f1 grey40>
                                    Note:
                                </Text>
                                <Text h3 marginH-20 center primary>
                                    Intead of deleting the products, we allow you to archive products.
                                    Archived products do not appear in the search or on your profile.
                                    If you want them to re-appear, you can un-archive them!
                                </Text>
                            </View>
                        </View>
                        <View marginT-200>
                            <Text center h1>Are you sure you want to archive?</Text>
                            <View row marginB-10 marginH-20>
                                <CstmShadowView style={{flex:1,marginRight:8}}>
                                    <Button
                                        flex
                                        label="Archive"
                                        hb2
                                    />
                                </CstmShadowView>
                                <CstmShadowView style={{flex:1,marginLeft:8}}>
                                    <Button
                                        flex
                                        label={'No'}
                                        hb2
                                    />
                                </CstmShadowView>
                            </View>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={props.BrandProducts}
                    numColumns={2}
                    /*onScroll={Animated.event(
                        [
                            { nativeEvent: {
                                contentOffset: {
                                    y: this.state.scrollY
                                }
                            }}
                        ],
                        {useNativeDriver: true}
                    )}
                    scrollEventThrottle={10}*/
                    renderItem={({ item }) => <ProductItemContainer Token={this.props.access_token} item={item} navigateProduct={this.navigateProduct} archivePressed={this.archivePressed} showArchive={1}/>}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View flex centerV centerH>
                            <Text center paddingH-50 marginT-200 h2 grey40>No products found. </Text>
                        </View>
                    }
                    onEndReached = {() => {
                        if(props.BrandProducts.length < this.TotalProducts) {
                            FetchBrandProducts(this.props.BrandID, ++this.Page, this.props.access_token).then(rows => {
                                if(this._isMounted) {
                                    //setBrandProducts([...props.BrandProducts, ...rows.Products]);
                                    this.setState({
                                        BrandProducts : [...this.state.BrandProducts, ...rows.Products]
                                    })
                                }
                            })
                        }
                    }}
                    onEndReachedThreshold={0.75}
                />
            </View>
        );
    }

    ArchivedProductScreen = () => {
        return (
            <View centerV centerH flex>
                <Modal
                    animationType="slide"
                    visible={this.state.unArchiveModalVisible}
                >
                    <View>
                        <View marginV-10 marginH-10 style={{borderWidth:1,borderColor:Colors.grey60}}>
                            <View marginV-10>
                                <Text center f1 grey40>
                                    Note:
                                </Text>
                                <Text h3 marginH-20 center primary>
                                    We do not delete any data uploaded on our
                                    servers. Your data stays safe and only Levyne can
                                    access your data to improve your app experience.
                                </Text>
                            </View>
                        </View>
                        <View marginT-200>
                            <Text center h1>Are you sure you want to un-archive?</Text>
                            <View row marginB-10 marginH-20>
                                <CstmShadowView style={{flex:1,marginRight:8}}>
                                    <Button
                                        flex
                                        label="Un-archive"
                                        hb2
                                    />
                                </CstmShadowView>
                                <CstmShadowView style={{flex:1,marginLeft:8}}>
                                    <Button
                                        flex
                                        label={'No'}
                                        hb2
                                    />
                                </CstmShadowView>
                            </View>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={this.state.ArchivedProducts}
                    numColumns={2}
                    /*onScroll={Animated.event(
                        [
                            { nativeEvent: {
                                contentOffset: {
                                    y: this.state.scrollY
                                }
                            }}
                        ],
                        {useNativeDriver: true}
                    )}
                    scrollEventThrottle={16}*/
                    renderItem={({ item }) => <ProductItemContainer Token={this.props.access_token} item={item} navigateProduct={this.navigateProduct} unArchivePressed={this.unArchivePressed} showArchive={2}/>}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View flex centerV centerH>
                            <Text center paddingH-50 marginT-200 h2 grey40>Levyne archives products instead of deleting them. </Text>
                        </View>
                    }
                />
            </View>
        );
    }

    navigateProduct = (ProductID) => {

        this.props.navigation.push('Product', {
            ProductID : ProductID
        })
    }

    navigateClients = () => {
        this.props.navigation.navigate('Companies')
    }

    navigateMyBrokers = () => {
        this.props.navigation.navigate('MyBrokers')
    }

    render() {
        /*const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT],
            outputRange: [0, -HEADER_EXPANDED_HEIGHT],
            extrapolate: 'clamp'
        })
        */
        return (
            <View flex>
                {/*<Animated.View style={{transform: [{translateY: headerHeight}]}}>*/}
                <TextNavBar Title={"Portfolio"}/>
                <View>
                    <ProfileTopSection
                        ProfileImage={this.state.ProfileImage}
                        TotalProducts={this.state.TotalProducts}
                        Followings={this.state.Followings}
                        Followers={this.state.Followers}
                        NavigateClients={this.navigateClients}
                        NavigateBrokers={this.navigateMyBrokers}
                    />
                    <Text hb1 marginL-15 marginT-10>{this.state.Name}</Text>
                    <Stars BrandRating={this.state.BrandRating} />
                    <Text marginL-15 marginR-15 grey30>
                        {this.state.About.replace(/(\r\n|\r|\n){2,}/g, '\n')}
                    </Text>
                    <Text hb2 marginL-15 marginT-10 marginR-15 grey30>Address</Text>
                    <Text marginL-15 marginR-15 grey30>
                        {this.state.Address}
                    </Text>
                </View>
                {/*<View style={{height:Dimensions.get('window').height-43}}>*/}
                <View flex>
                    <TabView
                        navigationState={{index : this.state.index, routes : this.state.routes}}
                        onIndexChange={(index) => this.setState({index})}
                        renderTabBar={(props) => <TabBar
                            {...props}
                            activeColor={Colors.primary}
                            inactiveColor={Colors.secondary}
                            indicatorStyle={{ backgroundColor: Colors.primary }}
                            style={{ backgroundColor: Colors.white }}
                        />}
                        renderScene={({ route }) => {
                            switch (route.key) {
                                case 'Products':
                                    return this.state.ProductsLoading ? <Loader/> : <this.ProductScreen BrandProducts={this.state.BrandProducts} />
                                case 'Fabrics':
                                    return this.state.ProductsLoading ? <Loader/> : <this.FabricScreen />
                                case 'Archive':
                                    return this.state.ProductsLoading ? <Loader/> : <this.ArchivedProductScreen />
                            }
                        }}
                    />
                </View>
                {/*</View>*/}
                {/*</Animated.View>*/}
            </View>
        )
    }
}


const mapsStateToProps = state => ({
    access_token : state.Auth.access_token,
    BrandID : state.Auth.BrandID,
    About : state.Profile.About,
    Name : state.Profile.Name,
    Email : state.Profile.Email,
    ProfileImage : state.Profile.ProfileImage,
    Address : state.Profile.Address
});

export default connect(mapsStateToProps)(MyProfile);
