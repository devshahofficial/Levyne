import {SafeAreaView, ScrollView, ActivityIndicator} from "react-native";
import React from 'react';
import FabricScreenPartOne from '../components/FabricScreenPartOne';
import FabricScreenPartTwo from '../components/FabricScreenPartTwo';
import ImageCarouselFabric from "./ImageCarouselFabric";
import FabricByID from '../API/FabricByID';
import AddWishlistFabricByID from '../API/AddWishlistFabricByID';
import RemoveWishlistFabricByID from '../API/RemoveWishlistFabricByID';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import { Colors, View } from "react-native-ui-lib";
import ConstBottomButton from "../components/constBottomButton";

class FabricScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            FabricObject : {},
            success : true
        }
    }

    componentDidMount() {
        if(!this.props.route.params.FabricID) {
            return this.props.navigation.goBack();
        }
        FabricByID(this.props.route.params.FabricID, this.props.AccessToken).then(resp => {
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

    BrandNavigation = (OtherBrandID) => {
        this.props.navigation.push('BrandProfile', {
            BrandID : OtherBrandID,
        });
    }

    AddToWishlistFn(FabricID, Token) {
        AddWishlistFabricByID(FabricID, Token).catch(err => {console.log(err)});
    }
    RemoveFromWishlistFn(FabricID, Token) {
        RemoveWishlistFabricByID(FabricID, Token).catch(err => {console.log(err)});
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor: Colors.white, flex:1}}>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={this.state.loading ? 'Fabric' : this.state.FabricObject.Name}/>
                {!this.state.loading && this.state.success ?
                    <>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <ImageCarouselFabric FabricImages={this.state.FabricObject.FabricImages} height={this.props.route.params.height}/>
                            <FabricScreenPartOne
                                Title={this.state.FabricObject.Name}
                                DiscountPrice={this.state.FabricObject.DiscountPrice}
                                ActualPrice={this.state.FabricObject.ActualPrice}
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
                                FabricImages={this.state.FabricObject.FabricImages}
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
