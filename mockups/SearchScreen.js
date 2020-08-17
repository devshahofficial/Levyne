import React from 'react';
import {StyleSheet,FlatList, Dimensions, Animated} from 'react-native';
import {View,TouchableOpacity,Text} from 'react-native-ui-lib';
import colors from "../assets/colors";
import ProductItemContainer from "../components/ProductItemContainer";
import CstmInput from "../components/input";
import ProductbySearch from '../API/Productsbysearch';
import BrandBySearch from '../API/BrandBySearch';
import {connect} from 'react-redux';
import {SearchIcon} from '../Icons/SearchIcon';
import Colors from '../Style/Colors';
import { TabView, TabBar } from 'react-native-tab-view';

import {BackArrowIcon} from '../Icons/BackArrowIcon';
import BrandItemContainer from '../components/BrandItemContainer';
import PickerModal from "../components/PickerModal";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height * 0.75;

const actionItems = [
    {
        id: 1,
        label: 'Latest Arrival',
    },
    {
        id: 2,
        label: 'Popularity',
    },
    {
        id: 3,
        label: 'Price high to low',
    },
    {
        id: 4,
        label: 'Discount',
    },
    {
        id: 5,
        label: 'Customer Rating',
    },
    {
        id: 6,
        label: 'Price low to high',
    },
];

const actionCompanyItems = [
    {
        id: 1,
        label: 'Popularity',
    },
    {
        id: 5,
        label: 'Customer Rating',
    },
    {
        id: 6,
        label: 'Located near me',
    },
];


class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            SearchKey: '',
            BrandPage: 1,
            ProductPage: 1,
            BrokerPage: 1,
            index : 0,
            routes : [
                { key: 'Products', title: 'Products' },
                { key: 'Fabrics', title: 'Fabrics'},
                { key: 'Brands', title: 'Brands'}
            ],
            BrandData : [],
            ProductsData : [],
            FabricData : [],
            Loading: false,
            Sort: false,
            SortCompany: false,
        }
        this.TotalProducts = 0;
        this.TotalBrand = 0;
        this.BrandPage = 0;
        this.ProductPage = 0;
    }

    componentDidMount() {
        this._isMounted = true;
    }


    SortModal = () => {
        this.setState({Sort: !this.state.Sort});
    }

    SortBrandModal = () => {
        this.setState({Sort: !this.state.Sort});
    }

    ProductSearchScreen = (props) => {
        let loadNewPage = true;

        const scrollY = new Animated.Value(0);
        const diffClampScrollY = Animated.diffClamp(scrollY, 0, 90);
        const headerY = diffClampScrollY.interpolate({
            inputRange: [29, 125],
            outputRange: [-20, -85],
        });


        return (
            <View flex>
                <PickerModal
                    ActionItems={actionItems}
                    modalVisible={this.state.Sort}
                    setModalVisible={this.SortModal}
                />
                <Animated.View
                    style={{
                        transform: [{translateY: headerY}],
                        position: 'absolute',
                        zIndex: 1, flexDirection: 'row'
                    }}
                >
                    <TouchableOpacity
                        flex style={styles.Filter} center
                        onPress={this.SortModal}
                    >
                        <Text hb1 secondary>Sort</Text>
                    </TouchableOpacity>
                    <TouchableOpacity flex
                        style={styles.Filter} center
                    >
                        <Text hb1 secondary>Filter</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.FlatList
                    data={props.ProductsData}
                    numColumns={2}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollY}}}],
                        {useNativeDriver: true},
                    )}
                    ListHeaderComponent={<View marginV-25></View>}
                    renderItem={({ item }) => <ProductItemContainer Token={this.props.AccessToken} item={item} navigateProduct={this.navigateProduct} height={screenHeight}/>}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View flex centerV centerH paddingH-40 style={{height:605}}>
                            <Text center b1 grey50>Learning from mistakes and constantly improving products is a key in all successful companies. </Text>
                            <Text center h3 grey50 marginT-10>- Bill Gates, Founder & Former CEO of Microsoft </Text>
                        </View>
                    }
                    onEndReached={() => {
                        if(loadNewPage && props.ProductsData.length !== this.TotalProducts) {
                            loadNewPage = false;
                            ProductbySearch(this.state.SearchKey, ++this.ProductPage, null, this.props.AccessToken).then(resp => {
                                loadNewPage = true;
                                if(this.state.SearchKey && this._isMounted) {
                                    this.setState({
                                        ProductsData : [...props.ProductsData, ...resp.Products]
                                    })
                                }
                            }).catch(err => {
                            });
                        }
                    }}
                    onEndReachedThreshold={0.75}
                />
            </View>
        );
    }

    FabricSearchScreen = (props) => {
        let loadNewPage = true;
        const scrollY = new Animated.Value(0);
        const diffClampScrollY = Animated.diffClamp(scrollY, 0, 90);
        const headerY = diffClampScrollY.interpolate({
            inputRange: [30, 125],
            outputRange: [-20, -85],
        });

        return (
            <View flex>
                <Animated.View
                    style={{
                        transform: [{translateY: headerY}],
                        position: 'absolute',
                        zIndex: 1, flexDirection: 'row'
                    }}
                >
                    <TouchableOpacity
                        flex style={styles.Filter} center
                        onPress={this.SortModal}
                    >
                        <Text hb1 secondary>Sort</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        flex
                        style={styles.Filter} center
                    >
                        <Text hb1 secondary>Filter</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.FlatList
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollY}}}],
                        {useNativeDriver: true},
                    )}
                    data={props.ProductsData}
                    numColumns={2}
                    ListHeaderComponent={<View marginV-25></View>}
                    renderItem={({ item }) => <ProductItemContainer Token={this.props.AccessToken} item={item} navigateProduct={this.navigateFabric} height={screenWidth}/>}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View flex centerV centerH style={{height:605}} paddingH-40>
                            <Text center b1 grey50>Meeting deadlines is not good enough, beating the deadline is my expectation. </Text>
                            <Text center h3 grey50 marginT-10>- DhiruBhai Ambani, Founder of Reliance </Text>
                        </View>
                    }
                    onEndReached={() => {
                        if(loadNewPage && props.FabricData.length !== this.TotalProducts) {
                            loadNewPage = false;
                            ProductbySearch(this.state.SearchKey, ++this.ProductPage, null, this.props.AccessToken).then(resp => {
                                loadNewPage = true;
                                if(this.state.SearchKey && this._isMounted) {
                                    this.setState({
                                        FabricData : [...props.FabricData, ...resp.Products]
                                    })
                                }
                            }).catch(err => {
                            });
                        }
                    }}
                    onEndReachedThreshold={0.75}
                />
            </View>
        );
    }

    BrandSearchScreen = (props) => {
        let loadNewPage = true;
        const scrollY = new Animated.Value(0);
        const diffClampScrollY = Animated.diffClamp(scrollY, 0, 90);
        const headerY = diffClampScrollY.interpolate({
            inputRange: [30, 125],
            outputRange: [-20, -85],
        });

        return (
            <View flex>
                <PickerModal
                    ActionItems={actionCompanyItems}
                    modalVisible={this.state.SortCompany}
                    setModalVisible={this.SortBrandModal}
                />
                <Animated.View
                    style={{
                        transform: [{translateY: headerY}],
                        position: 'absolute',
                        zIndex: 1, flexDirection: 'row'
                    }}
                >
                    <TouchableOpacity
                        flex style={styles.Filter} center
                        onPress={this.SortBrandModal}
                    >
                        <Text hb1 secondary>Sort</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.FlatList
                    data={props.BrandData}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollY}}}],
                        {useNativeDriver: true},
                    )}
                    ListHeaderComponent={<View marginV-25></View>}
                    renderItem={({ item }) => <BrandItemContainer item={item} navigateBrand={this.navigateBrand}/>}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View flex centerV centerH style={{height:605}} paddingH-40>
                            <Text center b1 grey50>Your brand is what other people say about you when you are not in the room.  </Text>
                            <Text center h3 grey50 marginT-10>- Jeff Bezoz, Founder & CEO of Amazon  </Text>
                        </View>
                    }
                    onEndReached={() => {
                        if(loadNewPage && props.BrandData.length !== this.TotalBrand) {
                            loadNewPage = false;
                            BrandBySearch(this.state.SearchKey, ++this.BrandPage, null, this.props.AccessToken).then(resp => {
                                loadNewPage = true;
                                if(this.state.SearchKey && this._isMounted) {
                                    this.setState({
                                        BrandData : [...props.BrandData,...resp.Brands]
                                    });
                                }
                            }).catch(err => {
                            });
                        }
                    }}
                    onEndReachedThreshold={0.75}
                />
            </View>
        );
    }


    navigateProduct = (ProductID) => {
        this.props.navigation.push('Product', {ProductID : ProductID,height:screenHeight})
    }
    navigateFabric = (FabricID) => {
        this.props.navigation.push('Fabric', {FabricID : FabricID,height:screenWidth})
    }
    navigateBrand = (BrandID) => {
        this.props.navigation.push('BrandProfile', {BrandID : BrandID})
    }

    setSearchKey = (SearchKey) => {
        this.setState({
            SearchKey: SearchKey
        });
        if(SearchKey != '')
        {
            this.ProductPage = 0;
            ProductbySearch(SearchKey, ++this.ProductPage, null, this.props.AccessToken).then(resp => {
                if(this._isMounted && SearchKey) {
                    this.setState({
                        ProductsData : resp.Products
                    })
                    this.TotalProducts = resp.Total
                }
            }).catch(err => {});
            this.BrandPage = 0;
            BrandBySearch(SearchKey, ++this.BrandPage, this.props.AccessToken).then(resp => {
                if(this._isMounted && SearchKey) {
                    this.setState({
                        BrandData : resp.Brands
                    })
                    this.TotalBrand = resp.Total
                }
            }).catch(err => {
                console.log(err);
            });
            /*BrokerBySearch(SearchKey, 1, null, this.props.AccessToken).then(resp => {
                this.setState({
                    BrokersData : resp.Brokers
                })
                this.TotalBroker = resp.Total
            }).catch(err => {
                console.log(err);
            });
            */
        } else {
            this.setState({
                BrandData : [],
                ProductsData : []
            })
        }
    }

    render() {
        return (
            <View flex>
                <View row centerV paddingL-10 paddingR-30>
                    <TouchableOpacity
                        onPress={this.props.navigation.goBack}
                        marginT-10 centerV centerH
                        style={{height:30,width:40}}
                    >
                        <BackArrowIcon/>
                    </TouchableOpacity>
                    <View row centerV marginL-15 marginR-30 marginB-10>
                        <CstmInput
                            placeholder='Search...'
                            value={this.state.SearchKey}
                            onChangeText={this.setSearchKey}
                            style={{flex:10}}
                        />
                        <View flex-1 marginT-13 style={{marginLeft:-40}}>
                            <SearchIcon Color={Colors.grey40}/>
                        </View>
                    </View>
                </View>
                <View style={styles.searchRow}>
                    <TabView
                        navigationState={{index : this.state.index, routes : this.state.routes}}
                        onIndexChange={(index) => this.setState({index})}
                        renderTabBar={(props) => <TabBar
                            {...props}
                            activeColor={Colors.primary}
                            inactiveColor={Colors.secondary}
                            indicatorStyle={{ backgroundColor: Colors.primary }}
                            style={{ backgroundColor: 'white' }}
                        />}
                        renderScene={({ route }) => {
                            switch (route.key) {
                                case 'Products':
                                    return <this.ProductSearchScreen ProductsData={this.state.ProductsData}/>
                                case 'Fabrics':
                                    return <this.FabricSearchScreen FabricData={this.state.FabricData}/>
                                case 'Brands':
                                    return <this.BrandSearchScreen BrandData={this.state.BrandData}/>
                            }
                        }}
                    />
                </View>
            </View>
        );
    }

};


const styles = StyleSheet.create({
    Search: {
        width: 370,
        borderRadius: 40,
        borderColor: colors.trivisionWhite,
        backgroundColor: colors.trivisionWhite
    },
    searchRow: {
        flex:1,
        backgroundColor: colors.trivisionWhite
    },
    Input: {
        borderRadius: 30,
        height: 50,
        width: 380,
        marginTop: 10,
        marginHorizontal: 10,
        textAlign: 'center',
    },
    inputText: {
        fontSize: 12,
        color: colors.trivisionBlack,
        textAlign: 'center',
    },
    flatlist: {
        marginTop: 6,
        marginLeft: 2,
    },
    Filter: {
        height: 60,
        backgroundColor: Colors.shadow,
        borderColor: Colors.white,
        borderWidth: 5
    }
});

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(Search);
