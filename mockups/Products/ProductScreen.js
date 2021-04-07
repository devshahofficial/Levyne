import React from 'react';
import {Modal, SafeAreaView, ScrollView} from "react-native";
import ProductScreenPartOne from '../../components/ProductScreenPartOne';
import ProductScreenPartTwo from '../../components/ProductScreenPartTwo';
import ProductScreenPartThree from '../../components/ProductScreenPartThree';
import ProductScreenPartFour from "../../components/ProductScreenPartFour";
import ImageCarouselProduct from "../../components/ImageCarouselProduct";
import ProductByID from '../../API/Products/ProductByID';
import FetchBrandReviews from '../../API/Brand/FetchBrandReviews';
import AddWishlistProductByID from '../../API/Products/AddWishlistProductByID';
import RemoveWishlistProductByID from '../../API/Products/RemoveWishlistProductByID';
import {connect} from 'react-redux';
import AddProductToCartAPI from '../../API/Cart/AddProductToCart';
import NavBarBack from '../../components/NavBarBack';
import { Colors, View, Text, TouchableOpacity } from "react-native-ui-lib";
import BottomButton from "../../components/BottomButtons";
import ImageView from "react-native-image-viewing";
import Loader from '../../components/Loader';

const SizeCircle = ({onPress, Size}) => (
    <TouchableOpacity onPress={onPress} marginH-5 center style={{borderColor: Colors.primary, borderRadius: 50, borderWidth: 1, minWidth: 40, height: 40, padding: 10}}>
        <Text>{Size}</Text>
    </TouchableOpacity>
)

class ProductScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Loading : true,
            ProductObject : {},
            success : true,
            ModalVisible: false,
            SizeModalVisible: false,
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
            const ProductObject = await ProductByID(this.props.route.params.ProductID, this.abortController.signal);
            this.setState({ ProductObject, Loading : false })

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

    OpenSizeModal = () => {
        if(this.props.SkipLogin) {
            this.props.navigation.navigate("Login");
        } else {
            this.setState({
                SizeModalVisible: true
            });
        }
    }

    AddToCart = (Size) => {
        this.setState({
            SizeModalVisible: false,
            Loading: true
        });
        AddProductToCartAPI(
            this.props.route.params.ProductID,
            Size,
            this.props.AccessToken,
            this.abortController.signal
        ).then(() => {
            this.props.setIsAnyProductInCart(true);
            this.setState({
                Loading: false
            });
            this.props.navigation.push('Cart');
        }).catch(console.log)
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

    ToggleSizeModal = () => {
        this.setState({SizeModalVisible: !this.state.SizeModalVisible})
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
                <NavBarBack Navigation={this.NavBarBackNavigation} Title={this.state.Loading ? 'Product' : this.state.ProductObject.Name}/>
                {!this.state.Loading && this.state.success ?
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
                                BrandRating={this.state.ProductObject.BrandRating}
                                RatingCount={this.state.ProductObject.RatingCount}
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
                                FabricWashType={this.state.ProductObject.FabricWashType}
                                navigation={this.props.navigation}
                            />
                            <ProductScreenPartThree
                                Reviews={this.state.Reviews}
                                EmbroideryDisplayModal = {this.EmbroideryDisplayModal}
                                EmbroideryImage = {this.state.ProductObject.EmbroideryImage}
                            />
                            <ProductScreenPartFour/>
                        </ScrollView>
                        <BottomButton
                            ButtonA={"Visit Brand"}
                            ButtonB={"Add to Cart"}
                            ButtonActionB={this.OpenSizeModal}
                            ButtonActionA={this.BrandNavigation}
                            BrandID={this.state.ProductObject.BrandID}
                        />
                        <Modal visible={this.state.SizeModalVisible} transparent={true}>
                            <TouchableOpacity onPress={this.ToggleSizeModal} flex bottom style={{backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
                                <SafeAreaView style={{backgroundColor: 'white'}}>
                                    <Text secondary margin-20 hb1>Select Size</Text>
                                    <View row margin-20 marginT-0>
                                        <SizeCircle onPress={() => this.AddToCart('S')} Size="S" />
                                        <SizeCircle onPress={() => this.AddToCart('M')} Size="M" />
                                        <SizeCircle onPress={() => this.AddToCart('L')} Size="L" />
                                        <SizeCircle onPress={() => this.AddToCart('XL')} Size="XL" />
                                        <SizeCircle onPress={() => this.AddToCart('XXL')} Size="XXL" />
                                        <SizeCircle onPress={() => this.AddToCart('C')} Size="Custom" />
                                    </View>
                                </SafeAreaView>
                            </TouchableOpacity>
                        </Modal>
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

const mapDispatchToProps = dispatch => {
	return {
		setIsAnyProductInCart : (value) => dispatch({type: 'setIsAnyProductInCart', value}),
	}
}

export default connect(mapsStateToProps, mapDispatchToProps)(ProductScreen)
