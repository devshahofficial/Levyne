import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import colors from "../../assets/colors";
import ProductBySearch from '../../API/ProductsBySearch';
import BrandBySearch from '../../API/BrandBySearch';
import {connect} from 'react-redux';
import Colors from '../../Style/Colors';
import { TabView, TabBar } from 'react-native-tab-view';
import ProductSearch from './ProductSearch';
import BrandSearch from './BrandSearch';
import NavBarBack from '../../components/NavBarBack';

const TabViewRoutes = [
    { key: 'Products', title: 'Products' },
    { key: 'Brands', title: 'Brands'}
]

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index : 0,
            BrandData : [],
            ProductsData : [],
            ProductSort: 0,
            BrandSort: 0,
            LoadingProduct: true,
            LoadingBrands: true
        }
        this.TotalProducts = 0;
        this.TotalBrand = 0;
        this.BrandPage = 0;
        this.ProductPage = 0;
        this.ProductLoadNewPage = true;
        this.BrandLoadNewPage = true;
        this.abortController = new AbortController();
        

        this.Filter = {};

        switch(this.props.route.params.SearchFilter.Type) {
            case 0 :
                this.Filter.Category = [this.props.route.params.SearchFilter.Index];
                break;
            case 1 :
                this.Filter.Styles = [this.props.route.params.SearchFilter.Index];
                break;
            case 2 :
                this.Filter.Materials = [this.props.route.params.SearchFilter.Index];
                break;
            case 3 :
                this.Filter.SearchKey = this.props.route.params.SearchFilter.Label;
        }

        this.SearchProduct(this.state.ProductSort);
        this.SearchBrand(this.state.BrandSort);
    }

    SearchProduct = (ProductSort) => {
        ProductBySearch(this.Filter, ++this.ProductPage, ProductSort, this.props.AccessToken, this.abortController.signal).then(resp => {
            if(this._isMounted) {
                this.setState({
                    ProductsData: [...this.state.ProductsData, ...resp.Products],
                    LoadingProduct: false
                })
                this.TotalProducts = resp.Total
            }
        }).catch(() => {});
    }

    SearchBrand = (BrandSort) => {
        BrandBySearch(this.props.route.params.SearchFilter.Label, ++this.BrandPage, BrandSort, this.props.AccessToken, this.abortController.signal).then(resp => {
            if(this._isMounted) {
                this.setState({
                    BrandData : [...this.state.BrandData, ...resp.Brands],
                    LoadingBrands: false
                })
                this.TotalBrand = resp.Total
            }
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    onProductEndReached = async () => {
        if(this.ProductLoadNewPage && this.state.ProductsData.length !== this.TotalProducts) {
            this.ProductLoadNewPage = false;
            this.SearchProduct(this.state.ProductSort);
        }
    }

    onBrandEndReached = async () => {
        if(this.BrandLoadNewPage && this.state.BrandData.length !== this.TotalBrand) {
            this.BrandLoadNewPage = false;
            this.SearchBrand(this.state.BrandSort);
        }
    }

    navigateProduct = (ProductID) => {
        this.props.navigation.push('Product', {ProductID : ProductID})
    }

    navigateBrand = (BrandID) => {
        this.props.navigation.push('BrandProfile', {BrandID : BrandID})
    }

    setProductSort = async (ProductSort) => {
        this.setState({
            ProductSort,
            ProductsData: [],
            LoadingProduct: true,
        });
        this.ProductPage = 0;
        this.SearchProduct(ProductSort);
    }

    setBrandSort = async (BrandSort) => {
        this.setState({
            BrandSort,
            BrandData: [],
            LoadingBrands: true,
        });
        this.BrandPage = 0;
        this.SearchBrand(BrandSort);
    }

    NavigateBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View flex>
                <NavBarBack Title={this.props.route.params.SearchFilter.Label} Navigation={this.NavigateBack} />
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
    searchRow: {
        flex:1,
        backgroundColor: colors.trivisionWhite
    },
});

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(Search);
