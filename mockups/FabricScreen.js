import {SafeAreaView, ScrollView, ActivityIndicator, Dimensions} from "react-native";
import React from 'react';
import FabricScreenPartOne from '../components/FabricScreenPartOne';
import FabricScreenPartTwo from '../components/FabricScreenPartTwo';
import FabricByID from '../API/FabricByID';
import AddWishlistFabricByID from '../API/AddWishlistFabricByID';
import RemoveWishlistFabricByID from '../API/RemoveWishlistFabricByID';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import { Colors, View, AnimatedImage, TouchableOpacity } from "react-native-ui-lib";
import ConstBottomButton from "../components/constBottomButton";
import AddFabricToCart from '../API/AddFabricToCart';
import ImageView from "react-native-image-viewing";

const screenWidth = Dimensions.get('window').width;

class FabricScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            FabricObject : {},
            success : true,
            ModalVisible: false
        }
        this.abortController = new AbortController();
    }

    componentDidMount() {
        if(!this.props.route.params.FabricID) {
            return this.props.navigation.goBack();
        }
        FabricByID(this.props.route.params.FabricID, this.props.AccessToken, this.abortController.signal).then(resp => {
            this.setState({
                FabricObject : resp,
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

    componentWillUnmount() {
        this.abortController.abort();
    }

    BrandNavigation = (OtherBrandID) => {
        this.props.navigation.push('BrandProfile', {
            BrandID : OtherBrandID,
        });
    }

    AddToCart = () => {
        AddFabricToCart(this.props.route.params.FabricID, 1, this.props.AccessToken, this.abortController.signal).then(() => {
            this.props.navigation.push('Cart');
        }).catch(console.log);
    }

    AddToWishlistFn(FabricID, Token) {
        AddWishlistFabricByID(FabricID, Token).catch(err => {console.log(err)});
    }

    RemoveFromWishlistFn(FabricID, Token) {
        RemoveWishlistFabricByID(FabricID, Token).catch(err => {console.log(err)});
    }

    CloseModal = () => {
        this.setState({ModalVisible: false})
    }

    DisplayModal = () => {
        this.setState({ModalVisible: true})
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor: Colors.white, flex:1}}>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={this.state.loading ? 'Fabric' : this.state.FabricObject.Name}/>
                {!this.state.loading && this.state.success ?
                    <>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <ImageView
                                images={[{uri: this.state.FabricObject.FabricImage}]}
                                visible={this.state.ModalVisible}
                                onRequestClose={this.CloseModal}
                            />
                            <TouchableOpacity onPress={this.DisplayModal}>
                                <AnimatedImage
                                    containerStyle={{backgroundColor: Colors.blue60, marginBottom: 20}}
                                    source={{uri: this.state.FabricObject.FabricImage}}
                                    loader={<ActivityIndicator />}
                                    style={{width:screenWidth,height:screenWidth}}
                                    animationDuration={300}
                                />
                            </TouchableOpacity>
                            <FabricScreenPartOne
                                Title={this.state.FabricObject.Name}
                                FabricPrice={this.state.FabricObject.FabricPrice}
                                BrandID={this.state.FabricObject.BrandID}
                                FabricRating={4.1}
                                Styles={this.state.FabricObject.Styles || []}
                                FabricID={this.state.FabricObject.FabricID}
                                FabricWishlist={this.state.FabricObject.IsWishlist}
                                BrandNavigation={this.BrandNavigation}
                                ShortDescription={this.state.FabricObject.ShortDescription}
                                AddToWishlistFn={this.AddToWishlistFn}
                                RemoveFromWishlistFn={this.RemoveFromWishlistFn}
                                Token={this.props.AccessToken}
                                Dyeable={this.state.FabricObject.Dyeable}
                            />
                            <FabricScreenPartTwo
                                LongDescription = {this.state.FabricObject.LongDescription}
                                ColorFades = {this.state.FabricObject.ColorFades}
                                shrinkable = {this.state.FabricObject.Shrinkable}
                            />
                        </ScrollView>
                        <ConstBottomButton
                            ButtonA={"Visit Brand"}
                            ButtonB={"Add to Cart"}
                            ButtonActionA={this.BrandNavigation}
                            ButtonActionB={this.AddToCart}
                            BrandID={this.state.FabricObject.BrandID}
                        />
                    </>
                    : 
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

export default connect(mapsStateToProps)(FabricScreen)
