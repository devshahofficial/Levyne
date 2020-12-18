import React, { Component } from 'react'
import {Linking, SafeAreaView, ScrollView} from "react-native";
import {Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import ImageView from "react-native-image-viewing";
import NavbarBack from "../../components/NavBarBack"
import LevyneProduct from "../../components/LevyneProduct";
import ImageCarouselLevyne from "../../components/ImageCarouselLevyne";
import {CallIcon} from "../../Icons/CallIcon";
import FetchDesignByID from '../../API/FetchDesignByID';
import Loader from '../../components/Loader';

const imgUrls = [
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1566491888763-e71518bbe846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
]

export default class ProductDetailsPage extends Component {

    state = {
        DesignImages : [],
        DesignCode: '',
        ShortDescription: '',
        LongDescription: '',
        Category: '',
        CategoryID: null,
        StyleIDs: [],
        Styles: [],
        Loading: true,
        ModalVisible: false,
        ImageIndex: 0,
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
                                    Styles={this.state.Styles}
                                    StyleIDs={this.state.StyleIDs}
                                    LongDescription={this.state.LongDescription}
                                    navigation = {this.props.navigation}
                                />
                            </ScrollView>
                            <TouchableOpacity
                                style={{height:50, backgroundColor: Colors.primary}} center
                                onPress={() => Linking.openURL('tel:+91 9819 077182')} row
                            >
                                <CallIcon Size={18} Color={Colors.white}/>
                                <Text h1 white marginL-20>Call us for product enquire</Text>
                            </TouchableOpacity>
                        </>
                    }
                </SafeAreaView>
            </>
        )
    }
}
