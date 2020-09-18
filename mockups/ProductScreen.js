import React from 'react';
import {SafeAreaView, ScrollView, ActivityIndicator} from "react-native";
import ProductScreenPartOne from '../components/ProductScreenPartOne';
import ProductScreenPartTwo from '../components/ProductScreenPartTwo';
import ProductScreenPartThree from '../components/ProductScreenPartThree';
import ImageCarouselProduct from "./ImageCarouselProduct";
import ProductByID from '../API/ProductByID';
import AddWishlistProductByID from '../API/AddWishlistProductByID';
import RemoveWishlistProductByID from '../API/RemoveWishlistProductByID';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import { Colors, View } from "react-native-ui-lib";
import ConstBottomButton from "../components/constBottomButton";

class ProductScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            ProductObject : {},
            success : true,
        }
        this._isMounted = true;
        this.abortController = new AbortController();
    }

    componentDidMount() {
        if(!this.props.route.params.ProductID) {
            return this.props.navigation.goBack();
        }
        ProductByID(this.props.route.params.ProductID, this.props.AccessToken, this.abortController.signal).then(resp => {
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

    componentWillUnmount() {
        this.abortController.abort();
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

    AddToCart = () => {
        this.props.navigation.push('ProductAddToCart', {
            BrandID: this.state.ProductObject.BrandID,
            AvailableSizes: this.state.ProductObject.AvailableSizes,
            MaterialIDs: this.state.ProductObject.MaterialIDs,
            ProductID: this.props.route.params.ProductID
        })
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor: Colors.white, flex:1}}>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={this.state.loading ? 'Product' : this.state.ProductObject.Name}/>
                {!this.state.loading && this.state.success ?
                    <>
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
                            ButtonActionB={this.AddToCart}
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
