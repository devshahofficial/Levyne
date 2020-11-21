import React from 'react';
import {StyleSheet, Dimensions, Animated} from 'react-native';
import {View,TouchableOpacity,Colors,Text} from 'react-native-ui-lib';
import CstmInput from "../../components/input";
import ProductBySearch from '../../API/ProductsBySearch';
import BrandBySearch from '../../API/BrandBySearch';
import {connect} from 'react-redux';
import {SearchIcon} from '../../Icons/SearchIcon';
import {BackArrowIcon} from '../../Icons/BackArrowIcon';
import CstmShadowView from "../../components/CstmShadowView";
import BrandItemContainer from "../../components/BrandItemContainer";

const screenWidth = Dimensions.get('window').width;

class SearchText extends React.Component {
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
            Loading: false,
            ProductSort: 0,
            BrandSort: 0,
            LoadingProduct: false,
            LoadingBrands: false
        }
        this.TotalProducts = 0;
        this.TotalBrand = 0;
        this.BrandPage = 0;
        this.ProductPage = 0;
        this.ProductLoadNewPage = true;
        this.BrandLoadNewPage = true;
        this.abortController = new AbortController();
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    SearchProduct = (SearchKey, ProductSort) => {
        if(SearchKey) {
            ProductBySearch(SearchKey, ++this.ProductPage, ProductSort, this.props.AccessToken, this.abortController.signal).then(resp => {
                if(this._isMounted && SearchKey) {
                    this.setState({
                        ProductsData: [...this.state.ProductsData, ...resp.Products],
                        LoadingProduct: false
                    })
                    this.TotalProducts = resp.Total
                }
            }).catch(() => {});
        } else {
            this.setState({
                LoadingProduct: false
            })
        }
    }

    SearchBrand = (SearchKey, BrandSort) => {
        if(SearchKey) {
            BrandBySearch(SearchKey, ++this.BrandPage, BrandSort, this.props.AccessToken, this.abortController.signal).then(resp => {
                if(this._isMounted && SearchKey) {
                    this.setState({
                        BrandData : [...this.state.BrandData, ...resp.Brands],
                        LoadingBrands: false
                    })
                    this.TotalBrand = resp.Total
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.setState({
                LoadingBrands: false
            })
        }
    }

    onProductEndReached = async () => {
        if(this.ProductLoadNewPage && this.state.ProductsData.length !== this.TotalProducts) {
            this.ProductLoadNewPage = false;
            this.SearchProduct(this.state.SearchKey, this.state.ProductSort);
        }
    }

    onBrandEndReached = async () => {
        if(this.BrandLoadNewPage && this.state.BrandData.length !== this.TotalBrand) {
            this.BrandLoadNewPage = false;
            this.SearchBrand(this.state.SearchKey, this.state.BrandSort);
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
        this.SearchProduct(this.state.SearchKey, ProductSort);
    }

    setBrandSort = async (BrandSort) => {
        this.setState({
            BrandSort,
            BrandData: [],
            LoadingBrands: true,
        });
        this.BrandPage = 0;
        this.SearchBrand(this.state.SearchKey, BrandSort);
    }

    setSearchKey = (SearchKey) => {
        this.setState({
            SearchKey: SearchKey
        });
        if(SearchKey !== '')
        {

            this.setState({
                LoadingProduct: true,
                LoadingBrands: true
            });

            //Searching Products
            this.ProductPage = 0;
            this.state.ProductsData = [];
            this.SearchProduct(SearchKey, this.state.ProductSort);

            //Searching Brands
            this.BrandPage = 0;
            this.state.BrandData = [];
            this.SearchBrand(SearchKey, this.state.BrandSort);

        } else {
            this.setState({
                BrandData: [],
                ProductsData: [],
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
                <View centerH marginT-10>
                    <Animated.FlatList
                        data={this.props.BrandData}
                        ListHeaderComponent={<View marginV-20></View>}
                        renderItem={
                            ({ item }) =>
                                <TouchableOpacity activeOpacity={0.5} style={styles.TextResultContainer}>
                                    <CstmShadowView style={styles.TextResult}>
                                        <Text marginL-15 h1 secondary>Put props here</Text>
                                    </CstmShadowView>
                                </TouchableOpacity>
                        }
                        keyExtractor={(item) => 'Brand' + item.BrandID}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View flex centerV centerH style={{height:605}} paddingH-40>
                                <Text center b1 grey50>Your brand is what other people say about you when you are not in the room.  </Text>
                                <Text center h3 grey50 marginT-10>- Jeff Bezoz, Founder & CEO of Amazon  </Text>
                            </View>
                        }
                        onEndReached={this.props.onBrandEndReached}
                        onEndReachedThreshold={0.75}
                    />
                </View>
            </View>
        );
    }

};


const styles = StyleSheet.create({
    TextResult: {
        borderRadius: 10,
        marginTop:0,
        flex:1,
        justifyContent: "center"
    },
    TextResultContainer: {
        width: screenWidth*0.95,
        height:50,
        marginTop:2,
    }
});

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(SearchText);
