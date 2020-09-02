import React from 'react';
import {SafeAreaView, ScrollView, ActivityIndicator, Modal} from "react-native";
import ProductScreenPartOne from '../components/ProductScreenPartOne';
import ProductScreenPartTwo from '../components/ProductScreenPartTwo';
import ProductScreenPartThree from '../components/ProductScreenPartThree';
import ImageCarouselProduct from "./ImageCarouselProduct";
import ProductByID from '../API/ProductByID';
import AddWishlistProductByID from '../API/AddWishlistProductByID';
import RemoveWishlistProductByID from '../API/RemoveWishlistProductByID';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import { Colors, View, Toast, Text } from "react-native-ui-lib";
import ConstBottomButton from "../components/constBottomButton";
import AddToCartModal from "../components/AddToCartModal";
import FetchFabricByBrandID from '../API/FetchFabricByBrandID';
import AddProductToCartAPI from '../API/AddProductToCart';

class ProductScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            ProductObject : {},
            success : true,
            AddToCartModal: false,
            SelectedSize: 0,
            CustomerFabric: false,
            Fabrics: [],
            FabricLoading: true,
            FirstTimeModel: true,
            FabricPage: 1,
            SelectedFabric: undefined,
            showCustomToast: false,
        }
        this.FabricPage = 0;
        this.FabricTotal = 0;
        this._isMounted = true;
    }

    setSelectedSize = (SelectedSize) => {
        this.setState({SelectedSize})
    }

    SelectFabric = (SelectedFabric) => {
        this.setState({SelectedFabric})
    }

    setCustomerFabric = () => {
        this.setState({
            CustomerFabric: !this.state.CustomerFabric
        });
    }

    componentDidMount() {
        if(!this.props.route.params.ProductID) {
            return this.props.navigation.goBack();
        }
        ProductByID(this.props.route.params.ProductID, this.props.AccessToken).then(resp => {
            if(this._isMounted) {
                this.setState({
                    ProductObject : resp,
                    loading : false
                })
            }
            
        }).catch(() => {
            if(this._isMounted) {
                this.setState({
                    loading : false,
                    success : false
                })
            }
            
        })
    }

    BrandNavigation = (OtherBrandID) => {
        this.props.navigation.push('BrandProfile', {
            BrandID : OtherBrandID,
        });
    }

    AddToWishlistFn(ProductID, Token) {
        AddWishlistProductByID(ProductID, Token).catch(err => {console.log(err)});
    }
    RemoveFromWishlistFn(ProductID, Token) {
        RemoveWishlistProductByID(ProductID, Token).catch(err => {console.log(err)});
    }

    OpenModal = () => {
        this.setState({AddToCartModal: !this.state.AddToCartModal});
        if(this.state.FirstTimeModel) {
            FetchFabricByBrandID(this.state.ProductObject.BrandID, ++this.FabricPage, this.props.AccessToken).then(resp => {
                this._isMounted && this.setState({
                    Fabrics: resp.Fabrics,
                    FirstTimeModel: false
                });
                this.FabricTotal = resp.Total;
            }).catch(err => {
                console.log(err);
            })
        }
    }

    LoadMoreFabrics = () => {
        if(this.FabricTotal > this.state.Fabrics.length) {
            FetchFabricByBrandID(this.state.ProductObject.BrandID, ++this.FabricPage, this.props.AccessToken).then(resp => {
                this._isMounted && this.setState({
                    Fabrics: [...this.state.Fabrics, ...resp.Fabrics]
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }

    navigateFabric = (FabricID) => {
        this.setState({
            AddToCartModal: !this.state.AddToCartModal
        })
        this.props.navigation.push('Fabric', {FabricID : FabricID})
    }

    AddProductToCart = () => {
        if(!this.state.CustomerFabric && !this.state.SelectedFabric) {
            this._isMounted && this.setState({
                showCustomToast: true
            });
            setTimeout(() => {
                this._isMounted && this.setState({
                    showCustomToast: false
                });
            }, 3000)
            return;
        }
        AddProductToCartAPI(
            this.props.route.params.ProductID,
            1,
            this.state.SelectedSize,
            this.state.SelectedFabric,
            1,
            this.props.AccessToken
        ).then(() => {
            this.setState({
                SelectedSize: 0,
                SelectedFabric: undefined,
                AddToCartModal: false
            });
            this.props.navigation.push('Cart');
        }).catch(console.log)
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor: Colors.white, flex:1}}>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={this.state.loading ? 'Product' : this.state.ProductObject.Name}/>
                {!this.state.loading && this.state.success ?
                    <>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            presentationStyle={'overFullScreen'}
                            visible={this.state.AddToCartModal}
                        >
                            <AddToCartModal
                                Modal={this.OpenModal}
                                ProductID={this.props.route.params.ProductID}
                                AvailableSizes={this.state.ProductObject.AvailableSizes}
                                BrandID={this.state.ProductObject.BrandID}
                                setSelectedSize={this.setSelectedSize}
                                SelectedSize={this.state.SelectedSize}
                                CustomerFabric={this.state.CustomerFabric}
                                setCustomerFabric={this.setCustomerFabric}
                                LoadMoreFabrics={this.LoadMoreFabrics}
                                Fabrics={this.state.Fabrics}
                                SelectedFabric={this.state.SelectedFabric}
                                SelectFabric={this.SelectFabric}
                                navigateFabric={this.navigateFabric}
                                AddProductToCart={this.AddProductToCart}
                                showCustomToast={this.state.showCustomToast}
                            />
                        </Modal>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <ImageCarouselProduct ProductImages={this.state.ProductObject.ProductImages}/>
                            <ProductScreenPartOne
                                Title={this.state.ProductObject.Name}
                                DiscountPrice={this.state.ProductObject.DiscountPrice}
                                ActualPrice={this.state.ProductObject.ActualPrice}
                                BrandID={this.state.ProductObject.BrandID}
                                ProductRating={4.1}
                                Materials={this.state.ProductObject.Materials}
                                MaterialCost={this.state.ProductObject.MaterialCost}
                                ProductionCost={this.state.ProductObject.ProductionCost}
                                Category={this.state.ProductObject.Category}
                                CategoryID={this.state.ProductObject.CategoryID}
                                Styles={this.state.ProductObject.Styles}
                                ProductWishlist={this.state.ProductObject.IsWishlist}
                                BrandNavigation={this.BrandNavigation}
                                ShortDescription={this.state.ProductObject.ShortDescription}
                                AddToWishlistFn={this.AddToWishlistFn}
                                RemoveFromWishlistFn={this.RemoveFromWishlistFn}
                                ProductID={this.props.route.params.ProductID}
                                Token={this.props.AccessToken}
                                ProductImage={this.state.ProductObject.ProductImages}
                            />
                            <ProductScreenPartTwo
                                LongDescription = {this.state.ProductObject.LongDescription}
                                FabricDescription = {this.state.ProductObject.FabricDescription}
                                ApprxDaysForProduction = {this.state.ProductObject.ApprxDaysForProduction}
                                Materials={this.state.ProductObject.Materials}
                                FabricWashType={this.state.ProductObject.FabricWashType}
                                navigation={this.props.navigation}
                            />
                            <ProductScreenPartThree
                                EmbroideryImage = {this.state.ProductObject.EmbroideryImage}
                            />
                        </ScrollView>
                        <ConstBottomButton
                            ButtonA={"Visit Brand"}
                            ButtonB={"Add to Cart"}
                            ButtonActionB={this.OpenModal}
                            ButtonActionA={this.BrandNavigation}
                            BrandID={this.state.ProductObject.BrandID}
                        />
                    </> :
                    <View flex center>
                        <ActivityIndicator />
                    </View>
                }
            </SafeAreaView>
        );
    }
};

const mapsStateToProps = state => ({
	AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(ProductScreen)
