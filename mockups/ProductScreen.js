import React from 'react';
import {SafeAreaView, ScrollView, ActivityIndicator, Modal,Text} from "react-native";
import {Button} from 'react-native-ui-lib';
import ProductScreenPartOne from '../components/ProductScreenPartOne';
import ProductScreenPartTwo from '../components/ProductScreenPartTwo';
import ProductScreenPartThree from '../components/ProductScreenPartThree';
import ImageCarouselProduct from "./ImageCarouselProduct";
import ProductByID from '../API/ProductbyID';
import AddWishlistProductbyid from '../API/AddWishlistProductbyid';
import RemoveWishlistProductbyid from '../API/RemoveWishlistProductbyid';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import { Colors, View } from "react-native-ui-lib";
import ConstBottomButton from "../components/constBottomButton";
import AddToCartModal from "../components/AddToCartModal";
import CstmShadowView from "../components/CstmShadowView";

class ProductScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            ProductObject : {},
            success : true,
            AddtoCartModal: false,
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
            this.setState({
                loading : false,
                success : true
            })
        })
    }

    BrandNavigation = (OtherBrandID) => {
        this.props.navigation.push('BrandProfile', {
            BrandID : OtherBrandID,
        });
    }

    AddToWishlistFn(ProductID, Token) {
        AddWishlistProductbyid(ProductID, Token).catch(err => {console.log(err)});
    }
    RemoveFromWishlistFn(ProductID, Token) {
        RemoveWishlistProductbyid(ProductID, Token).catch(err => {console.log(err)});
    }

    OpenModal = () => {
        this.setState({AddtoCartModal: !this.state.AddtoCartModal})
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
                            visible={this.state.AddtoCartModal}
                        >
                            <AddToCartModal Modal={this.OpenModal}/>
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
