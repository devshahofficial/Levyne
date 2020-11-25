import React from 'react';
import {SafeAreaView, ScrollView} from "react-native";
import ProductScreenPartOne from '../components/ProductScreenPartOne';
import ProductScreenPartTwo from '../components/ProductScreenPartTwo';
import ProductScreenPartThree from '../components/ProductScreenPartThree';
import ImageCarouselProduct from "../components/ImageCarouselProduct";
import ProductByID from '../API/ProductByID';
import AddWishlistProductByID from '../API/AddWishlistProductByID';
import RemoveWishlistProductByID from '../API/RemoveWishlistProductByID';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import { Colors, LoaderScreen, View } from "react-native-ui-lib";
import ConstBottomButton from "../components/constBottomButton";
import ImageView from "react-native-image-viewing";

class ProductScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            ProductObject : {},
            success : true,
            ModalVisible: false,
            ImageIndex: 0,
            EmbroideryModalVisible: false
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

    render() {
        return (
            <SafeAreaView style={{backgroundColor: Colors.white, flex:1}}>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={this.state.loading ? 'Product' : this.state.ProductObject.Name}/>
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
                                ProductRating={4.1}
                                Category={this.state.ProductObject.Category}
                                CategoryID={this.state.ProductObject.CategoryID}
                                Styles={this.state.ProductObject.Styles}
                                StyleIDs={this.state.ProductObject.StyleIDs}
                                ProductWishlist={this.state.ProductObject.IsWishlist}
                                ShortDescription={this.state.ProductObject.ShortDescription}
                                AddToWishlistFn={this.AddToWishlistFn}
                                RemoveFromWishlistFn={this.RemoveFromWishlistFn}
                                ProductID={this.props.route.params.ProductID}
                                navigation={this.props.navigation}
                                Token={this.props.AccessToken}
                            />
                            <ProductScreenPartTwo
                                LongDescription = {this.state.ProductObject.LongDescription}
                                FabricDescription = {this.state.ProductObject.FabricDescription}
                                ApprxDaysForProduction = {this.state.ProductObject.ApprxDaysForProduction}
                                Materials={this.state.ProductObject.Materials}
                                MaterialIDs={this.state.ProductObject.MaterialIDs}
                                FabricWashType={this.state.ProductObject.FabricWashType}
                                navigation={this.props.navigation}
                            />
                            <ProductScreenPartThree
                                EmbroideryDisplayModal = {this.EmbroideryDisplayModal}
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
                        <LoaderScreen />
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
