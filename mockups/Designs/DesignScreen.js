import React, { Component } from 'react'
import {SafeAreaView, ScrollView} from "react-native";
import {Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import ImageView from "react-native-image-viewing";
import NavbarBack from "../../components/NavBarBack"
import LevyneProduct from "../../components/LevyneProduct";
import ImageCarouselLevyne from "../../components/ImageCarouselLevyne";
import FetchDesignByID from '../../API/DesignByLevyne/FetchDesignByID';
import Loader from '../../components/Loader';


export default class DesignScreen extends Component {

    state = {
        DesignImages : [],
        DesignCode: '',
        ShortDescription: '',
        LongDescription: '',
        Category: '',
        CategoryID: null,
        StyleIDs: [],
        Styles: [],
        MinPrice: null,
        MaxPrice: null,
        Loading: true,
        ModalVisible: false,
        ImageIndex: 0,
        ColorCode: []
    }

    abortController = new AbortController();

    componentWillUnmount = () => {
        this.abortController.abort();
    }

    componentDidMount = () => {
        FetchDesignByID(this.props.route.params.DesignID, this.abortController.signal).then(item => {
            item.Loading = false;
            this.setState(item);
        }).catch(err => {
            console.log(err);
        })
    }

    AddToCart = () => {
        this.props.navigation.navigate("BrandsForDesignByLevyne", {
            DesignID: this.props.route.params.DesignID
        })
    }

    DisplayModal = (ImageIndex) => {
        this.setState({ModalVisible: true, ImageIndex})
    }

    CloseModal = () => {
        this.setState({ModalVisible: false})
    }

    render() {
        return (
            <>
                <NavbarBack Title={this.state.DesignCode} Navigation={this.props.navigation.goBack}/>
                <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
                    {this.state.Loading ?
                        <Loader />
                        :
                        <>
                            <ScrollView>
                                <ImageCarouselLevyne
                                    ProductImages={this.state.DesignImages}
                                    DisplayModal={this.DisplayModal}
                                />
                                <ImageView
                                    images={this.state.DesignImages.map(item => {return {uri: item}})}
                                    visible={this.state.ModalVisible}
                                    onRequestClose={this.CloseModal}
                                    imageIndex={this.state.ImageIndex}
                                />
                                <LevyneProduct
                                    Title={this.state.DesignCode}
                                    ShortDescription={this.state.ShortDescription}
                                    CategoryID={this.state.CategoryID}
                                    Category={this.state.Category}
                                    DesignID={this.props.route.params.DesignID}
                                    Styles={this.state.Styles}
                                    MinPrice={this.state.MinPrice}
                                    MaxPrice={this.state.MaxPrice}
                                    StyleIDs={this.state.StyleIDs}
                                    LongDescription={this.state.LongDescription}
                                    navigation={this.props.navigation}
                                    ColorCode={this.state.ColorCode}
                                />
                            </ScrollView>
                            <TouchableOpacity
                                style={{height:50, backgroundColor: Colors.primary}} center
                                onPress={this.AddToCart} row
                            >
                                <Text h1 white>Add to Cart</Text>
                            </TouchableOpacity>
                        </>
                    }
                </SafeAreaView>
            </>
        )
    }
}
