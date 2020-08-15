import {SafeAreaView, ScrollView} from "react-native";
import React from 'react';
import ProductScreenPartOne from '../components/ProductScreenPartOne';
import ProductScreenPartTwo from '../components/ProductScreenPartTwo';
import ImageCarouselProduct from "./ImageCarouselProduct";
import ProductByID from '../API/ProductbyID';
import AddWishlistProductbyid from '../API/AddWishlistProductbyid';
import RemoveWishlistProductbyid from '../API/RemoveWishlistProductbyid';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import { Colors } from "react-native-ui-lib";



class ProductScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            ProductObject : {},
            success : true
        }
    }

    componentDidMount() {
        if(!this.props.route.params.ProductID) {
            return this.props.navigation.goBack();
        }
        ProductByID(this.props.route.params.ProductID, this.props.AccessToken).then(resp => {
            this.setState({
                ProductObject : resp,
                loading : false
            })
        }).catch(err => {
            console.log(err);
            this.setState({
                loading : false,
                success : false
            })
        })
    }


    RequestADealNavigation = (OtherBrandID, OtherBrandName, ProductID, ProductName, ProductImage, ProductShortDescription, ProductPrice, BrandImage) => {
        this.props.navigation.navigate('Chat', {
            NewChat : true,
            BrandID : OtherBrandID,
            ProductID : ProductID,
            ProductName : ProductName,
            ProductImage : ProductImage,
            ProductShortDescription : ProductShortDescription,
            ProductPrice : ProductPrice,
            BrandName : OtherBrandName,
            BrandImage : BrandImage
        });
    }

    BrandNavigation = (OtherBrandID) => {
        this.props.navigation.navigate('BrandProfile', {
            BrandID : OtherBrandID,
        });
    }

    AddToWishlistFn(ProductID, Token) {
        AddWishlistProductbyid(ProductID, Token).catch(err => {console.log(err)});
    }
    RemoveFromWishlistFn(ProductID, Token) {
        RemoveWishlistProductbyid(ProductID, Token).catch(err => {console.log(err)});
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor: Colors.white, flex:1}}>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={this.state.loading ? 'Product' : this.state.ProductObject.Name}/>
                {!this.state.loading && this.state.success &&
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <ImageCarouselProduct ProductImages={this.state.ProductObject.ProductImages} height={this.props.route.params.height}/>
                        <ProductScreenPartOne
                            Title={this.state.ProductObject.Name}
                            DiscountPrice={this.state.ProductObject.DiscountPrice}
                            ActualPrice={this.state.ProductObject.ActualPrice}
                            BrandID={this.state.ProductObject.BrandID}
                            ProductRating={4.1}
                            ProductWishlist={this.state.ProductObject.ProductWishlist}
                            BrandNavigation={this.BrandNavigation}
                            ShortDescription={this.state.ProductObject.ShortDescription}
                            AddToWishlistFn={this.AddToWishlistFn}
                            RemoveFromWishlistFn={this.RemoveFromWishlistFn}
                            ProductID={this.props.route.params.ProductID}
                            Token={this.props.AccessToken}
                            RequestADealNavigation={this.RequestADealNavigation}
                            ProductImage={this.state.ProductObject.ProductImages}
                        />
                        <ProductScreenPartTwo LongDescription = {this.state.ProductObject.LongDescription}/>

                    </ScrollView>
                }
            </SafeAreaView>
        );
    }
};

const mapsStateToProps = state => ({
	AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(ProductScreen)
