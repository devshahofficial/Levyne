import React from 'react';
import {StyleSheet} from 'react-native';
import {View,TouchableOpacity} from 'react-native-ui-lib';
import colors from "../assets/colors";
import FabricBySearch from '../API/FabricsBySearch';
import CstmInput from "../components/input";
import ProductBySearch from '../API/ProductsBySearch';
import BrandBySearch from '../API/BrandBySearch';
import {connect} from 'react-redux';
import {SearchIcon} from '../Icons/SearchIcon';
import Colors from '../Style/Colors';
import { TabView, TabBar } from 'react-native-tab-view';
import ProductSearch from '../mockups/Search/ProductSearch';
import FabricSearch from '../mockups/Search/FabricSearch';
import BrandSearch from '../mockups/Search/BrandSearch';
import {BackArrowIcon} from '../Icons/BackArrowIcon';

const TabViewRoutes = [
    { key: 'Products', title: 'Products' },
    { key: 'Fabrics', title: 'Fabrics'},
    { key: 'Brands', title: 'Brands'}
]

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            SearchKey: '',
            BrandPage: 1,
            ProductPage: 1,
            BrokerPage: 1,
            index : 0,
            BrandData : [],
            ProductsData : [],
            FabricData : [],
            Loading: false,
            ProductSort: undefined,
            FabricSort: undefined,
            BrandSort: undefined,
            LoadingProduct: false,
            LoadingFabrics: false,
            LoadingBrands: false
        }
        this.TotalProducts = 0;
        this.TotalFabrics = 0;
        this.TotalBrand = 0;
        this.BrandPage = 0;
        this.ProductPage = 0;
        this.FabricPage = 0;
        this.ProductLoadNewPage = true;
        this.FabricLoadNewPage = true;
        this.BrandLoadNewPage = true;
        this.abortController = new AbortController();
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    onProductEndReached = () => {
        if(this.ProductLoadNewPage && this.state.ProductsData.length !== this.TotalProducts) {
            this.ProductLoadNewPage = false;
            ProductBySearch(this.state.SearchKey, ++this.ProductPage, this.state.ProductSort, this.props.AccessToken, this.abortController.signal).then(resp => {
                this.ProductLoadNewPage = true;
                if(this.state.SearchKey && this._isMounted) {
                    this.setState({ProductsData: [...this.state.ProductsData, ...resp.Products]})
                }
            }).catch(() => {
                this.ProductLoadNewPage = true;
            });
        }
    }

    onFabricEndReached = () => {
        if(this.FabricLoadNewPage && this.state.FabricData.length !== this.TotalFabrics) {
            this.FabricLoadNewPage = false;
            FabricBySearch(this.state.SearchKey, ++this.FabricPage, this.state.FabricSort, this.props.AccessToken, this.abortController.signal).then(resp => {
                this.FabricLoadNewPage = true;
                if(this.state.SearchKey && this._isMounted) {
                    this.setState({FabricData: [...this.state.FabricData, ...resp.Fabrics]})
                }
            }).catch(() => {
                this.FabricLoadNewPage = true;
            });
        }
    }

    onBrandEndReached = () => {
        if(this.BrandLoadNewPage && this.state.BrandData.length !== this.TotalBrand) {
            this.BrandLoadNewPage = false;
            BrandBySearch(this.state.SearchKey, ++this.BrandPage, this.state.BrandSort, this.props.AccessToken, this.abortController.signal).then(resp => {
                this.BrandLoadNewPage = true;
                if(this.state.SearchKey && this._isMounted) {
                    this.setState({
                        BrandData : [...this.state.BrandData,...resp.Brands]
                    });
                }
            }).catch(() => {
                this.BrandLoadNewPage = true;
            });
        }
    }

    navigateProduct = (ProductID) => {
        this.props.navigation.push('Product', {ProductID : ProductID})
    }
    navigateFabric = (FabricID) => {
        this.props.navigation.push('Fabric', {FabricID : FabricID})
    }
    navigateBrand = (BrandID) => {
        this.props.navigation.push('BrandProfile', {BrandID : BrandID})
    }

    setProductSort = (ProductSort) => {
        this.setState({
            ProductSort,
            ProductsData: []
        });
        this.ProductPage = 0;
        ProductBySearch(this.state.SearchKey, ++this.ProductPage, ProductSort, this.props.AccessToken, this.abortController.signal).then(resp => {
            if(this._isMounted && this.state.SearchKey) {
                this.setState({
                    ProductsData : resp.Products
                })
                this.TotalProducts = resp.Total
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    setFabricSort = (FabricSort) => {
        this.setState({
            FabricSort,
            FabricData: []
        });
        this.FabricPage = 0;
        FabricBySearch(this.state.SearchKey, ++this.FabricPage, FabricSort, this.props.AccessToken, this.abortController.signal).then(resp => {
            if(this._isMounted && this.state.SearchKey) {
                this.setState({
                    FabricData : resp.Fabrics
                })
                this.TotalFabrics = resp.Total
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    setBrandSort = (BrandSort) => {
        this.setState({
            BrandSort,
            BrandData: []
        });
        this.BrandPage = 0;
        BrandBySearch(this.state.SearchKey, ++this.BrandPage, this.props.AccessToken, this.abortController.signal).then(resp => {
            if(this._isMounted && this.state.SearchKey) {
                this.setState({
                    BrandData : resp.Brands
                })
                this.TotalBrand = resp.Total
            }
        }).catch(() => {});
    }

    setSearchKey = (SearchKey) => {
        this.setState({
            SearchKey: SearchKey
        });
        if(SearchKey != '')
        {

            this.setState({
                LoadingProduct: true,
                LoadingFabrics: true,
                LoadingBrands: true
            });

            //Searching Products
            this.ProductPage = 0;
            ProductBySearch(SearchKey, ++this.ProductPage, this.state.ProductSort, this.props.AccessToken, this.abortController.signal).then(resp => {
                if(this._isMounted && SearchKey) {
                    this.setState({
                        ProductsData: resp.Products,
                        LoadingProduct: false
                    })
                    this.TotalProducts = resp.Total
                }
            }).catch(() => {});

            //Searching Fabrics
            this.FabricPage = 0;
            FabricBySearch(SearchKey, ++this.FabricPage, this.state.FabricSort, this.props.AccessToken, this.abortController.signal ).then(resp => {
                if(this._isMounted && SearchKey) {
                    this.setState({
                        FabricData : resp.Fabrics,
                        LoadingFabrics: false
                    })
                    this.TotalFabrics = resp.Total
                }
            }).catch(() => {});

            //Searching Brands

            this.BrandPage = 0;
            BrandBySearch(SearchKey, ++this.BrandPage, this.props.AccessToken, this.abortController.signal).then(resp => {
                if(this._isMounted && SearchKey) {
                    this.setState({
                        BrandData : resp.Brands,
                        LoadingBrands: false
                    })
                    this.TotalBrand = resp.Total
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.setState({
                BrandData: [],
                ProductsData: [],
                FabricData: []
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
                        navigationState={{index : this.state.index, routes : TabViewRoutes}}
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
                                    return <ProductSearch
                                        ProductsData={this.state.ProductsData}
                                        AccessToken={this.props.AccessToken}
                                        setProductSort={this.setProductSort}
                                        navigateProduct={this.navigateProduct}
                                        onProductEndReached={this.onProductEndReached}
                                        LoadingProduct={this.state.LoadingProduct}
                                    />
                                case 'Fabrics':
                                    return <FabricSearch
                                        FabricsData={this.state.FabricData}
                                        AccessToken={this.props.AccessToken}
                                        setFabricSort={this.setFabricSort}
                                        navigateFabric={this.navigateFabric}
                                        onFabricEndReached={this.onFabricEndReached}
                                        LoadingFabrics={this.state.LoadingFabrics}
                                    />
                                case 'Brands':
                                    return <BrandSearch 
                                        BrandData={this.state.BrandData}
                                        AccessToken={this.props.AccessToken}
                                        setBrandSort={this.setBrandSort}
                                        navigateBrand={this.navigateBrand}
                                        onBrandEndReached={this.onBrandEndReached}
                                        LoadingBrands={this.state.LoadingBrands}
                                    />
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
