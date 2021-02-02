import React from 'react';
import {SafeAreaView, ScrollView} from "react-native";
import ProductScreenPartOne from '../components/ProductScreenPartOne';
import ProductScreenPartTwo from '../components/ProductScreenPartTwo';
import ProductScreenPartThree from '../components/ProductScreenPartThree';
import ImageCarouselProduct from "../components/ImageCarouselProduct";
import ProductByID from '../API/Products/ProductByID';
import FetchBrandReviews from '../API/Brand/FetchBrandReviews';
import AddWishlistProductByID from '../API/Products/AddWishlistProductByID';
import RemoveWishlistProductByID from '../API/Products/RemoveWishlistProductByID';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import { Colors } from "react-native-ui-lib";
import BottomButton from "../components/BottomButtons";
import ImageView from "react-native-image-viewing";
import Loader from '../components/Loader';

class ProductScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            ProductObject : {},
            success : true,
            ModalVisible: false,
            ImageIndex: 0,
            EmbroideryModalVisible: false,
            Reviews: [],
        }
        this.abortController = new AbortController();
    }

    async componentDidMount() {
        if(!this.props.route.params.ProductID) {
            return this.props.navigation.goBack();
        }
        try {
            const ProductObject = await ProductByID(this.props.route.params.ProductID, this.props.AccessToken, this.abortController.signal);
            this.setState({ ProductObject, loading : false })

            const Reviews = await FetchBrandReviews({BrandID: ProductObject.BrandID, Limit: 10});
            this.setState({ Reviews });
        } catch(err) {
            console.log(err);
        }
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
        if(this.props.SkipLogin) {
            this.props.navigation.navigate("Login");
        } else {
            this.props.navigation.push('ProductAddToCart', {
                BrandID: this.state.ProductObject.BrandID,
                AvailableSizes: this.state.ProductObject.AvailableSizes,
                MaterialIDs: this.state.ProductObject.MaterialIDs,
                ProductID: this.props.route.params.ProductID
            })
        }
    }

    CloseModal = () => {
        this.setState({ModalVisible: false})
    }

    EmbroideryCloseModal = () => {
        this.setState({EmbroideryModalVisible: false})
    }

    EmbroideryDisplayModal = () => {
        this.setState({EmbroideryModalVisible: true})
    }

    DisplayModal = (ImageIndex) => {
        this.setState({ModalVisible: true, ImageIndex})
    }

    NavigateLogin = () => {
        this.props.navigation.push("Auth", {screen: 'Login'});
    }

    NavBarBackNavigation = () => {
        if(this.props.route.params.onBackHome) {
            this.props.navigation.navigate('Home');
        } else {
            this.props.navigation.goBack();
        }
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor: Colors.white, flex:1}}>
                <NavBarBack Navigation={this.NavBarBackNavigation} Title={this.state.loading ? 'Product' : this.state.ProductObject.Name}/>
                {!this.state.loading && this.state.success ?
                    <>
                        <ImageView
                            images={this.state.ProductObject.ProductImages.map(item => {return {uri: item}})}
                            visible={this.state.ModalVisible}
                            onRequestClose={this.CloseModal}
                            imageIndex={this.state.ImageIndex}
                        />
                        <ImageView
                            images={[{uri: this.state.ProductObject.EmbroideryImage}]}
                            visible={this.state.EmbroideryModalVisible}
                            onRequestClose={this.EmbroideryCloseModal}
                        />
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <ImageCarouselProduct
                                ProductImages={this.state.ProductObject.ProductImages}
                                DisplayModal={this.DisplayModal}
                            />
                            <ProductScreenPartOne
                                Title={this.state.ProductObject.Name}
                                MinPrice={this.state.ProductObject.MinPrice}
                                MaxPrice={this.state.ProductObject.MaxPrice}
                                BrandID={this.state.ProductObject.BrandID}
                                ProductRating={0}
                                Category={this.state.ProductObject.Category}
                                CategoryID={this.state.ProductObject.CategoryID}
                                Styles={this.state.ProductObject.Styles}
                                StyleIDs={this.state.ProductObject.StyleIDs}
                                ProductWishlist={this.state.ProductObject.IsWishlist}
                                ShortDescription={this.state.ProductObject.ShortDescription}
                                AddToWishlistFn={this.AddToWishlistFn}
                                RemoveFromWishlistFn={this.RemoveFromWishlistFn}
                                NavigateLogin={this.NavigateLogin}
                                ProductID={this.props.route.params.ProductID}
                                navigation={this.props.navigation}
                                Token={this.props.AccessToken}
                            />
                            <ProductScreenPartTwo
                                LongDescription = {this.state.ProductObject.LongDescription}
                                FabricDescription = {this.state.ProductObject.FabricDescription}
                                ApproxDaysForProduction = {this.state.ProductObject.ApproxDaysForProduction}
                                Materials={this.state.ProductObject.Materials}
                                MaterialIDs={this.state.ProductObject.MaterialIDs}
                                Reviews={this.state.Reviews}
                                FabricWashType={this.state.ProductObject.FabricWashType}
                                navigation={this.props.navigation} 
                            />
                            <ProductScreenPartThree
                                EmbroideryDisplayModal = {this.EmbroideryDisplayModal}
                                EmbroideryImage = {this.state.ProductObject.EmbroideryImage}
                            />
                        </ScrollView>
                        <BottomButton
                            ButtonA={"Visit Brand"}
                            ButtonB={"Add to Cart"}
                            ButtonActionB={this.AddToCart}
                            ButtonActionA={this.BrandNavigation}
                            BrandID={this.state.ProductObject.BrandID}
                        />
                    </> :
                    <Loader />
                }
            </SafeAreaView>
        );
    }
};

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken,
    SkipLogin: state.Auth.SkipLogin
});

export default connect(mapsStateToProps)(ProductScreen)
