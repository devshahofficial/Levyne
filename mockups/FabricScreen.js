import {SafeAreaView, ScrollView, ActivityIndicator, Dimensions, Share} from "react-native";
import React from 'react';
import FabricScreenPartOne from '../components/FabricScreenPartOne';
import FabricScreenPartTwo from '../components/FabricScreenPartTwo';
import FabricByID from '../API/Fabrics/FabricByID';
import AddWishlistFabricByID from '../API/Fabrics/AddWishlistFabricByID';
import RemoveWishlistFabricByID from '../API/Fabrics/RemoveWishlistFabricByID';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import { Colors, AnimatedImage, TouchableOpacity, Text, View} from "react-native-ui-lib";
import ImageView from "react-native-image-viewing";
import Loader from "../components/Loader";
import {ShareIcon} from "../Icons/ShareIcon";
import {MachineWashIcon} from "../Icons/Secondary/MachineWashIcon";


const screenWidth = Dimensions.get('window').width;

class FabricScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            FabricObject : {},
            success : true,
            ImageViewVisible: false,
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
        }).catch(() => {})
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    ToggleImageView = () => {
        this.setState({ImageViewVisible: !this.state.ImageViewVisible})
    }

    AddToWishlistFn(FabricID, Token) {
        AddWishlistFabricByID(FabricID, Token).catch(err => {console.log(err)});
    }

    RemoveFromWishlistFn(FabricID, Token) {
        RemoveWishlistFabricByID(FabricID, Token).catch(err => {console.log(err)});
    }

    NavigateLogin = () => {
        this.props.navigation.push("Auth", {screen: 'Login'});
    }

    onShare = () => {
        Share.share({
            message: "Hey, I thought you would like this pattern. Wanna order some?.\n\nVisit here: https://collections.levyne.com/f/" + this.props.route.params.FabricID
        }).catch(() => {});
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor: Colors.white, flex:1}}>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={this.state.loading ? 'Fabric' : this.state.FabricObject.Name}/>
                {!this.state.loading && this.state.success ?
                    <>
                        <View marginT-10 paddingH-15 center row style={{height:50,width:Dimensions.get('window').width,backgroundColor:Colors.shadow}}>
                            <MachineWashIcon size={30} Color={Colors.black}/>
                            <Text marginL-10 h2>Dry cleaning is recommended for the first wash!</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <ImageView
                                images={[{uri: this.state.FabricObject.FabricImage}]}
                                visible={this.state.ImageViewVisible}
                                onRequestClose={this.ToggleImageView}
                                imageIndex={0}
                            />
                            <TouchableOpacity onPress={this.ToggleImageView}>
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
                                navigation={this.props.navigation}
                                Category={this.state.FabricObject.Category}
                                FabricPrice={this.state.FabricObject.FabricPrice}
                                CategoryID={this.state.FabricObject.CategoryID}
                                FabricID={this.state.FabricObject.FabricID}
                                MaterialIDs={this.state.FabricObject.MaterialIDs}
                                Materials={this.state.FabricObject.Materials}
                                FabricWishlist={this.state.FabricObject.IsWishlist}
                                AddToWishlistFn={this.AddToWishlistFn}
                                RemoveFromWishlistFn={this.RemoveFromWishlistFn}
                                Token={this.props.AccessToken}
                                Dyeable={this.state.FabricObject.Dyeable}
                                NavigateLogin={this.NavigateLogin}
                            />
                            <FabricScreenPartTwo/>
                        </ScrollView>
                        <TouchableOpacity
                            style={{height: 50, borderWidth: 1, borderColor:Colors.shadow}}
                            center row
                            onPress={this.onShare}
                        >
                            <Text h1 primary>Share</Text>
                            <View marginL-10><ShareIcon size={25} Color={Colors.primary}/></View>
                        </TouchableOpacity>
                    </>
                    :
                    <Loader />
                }
            </SafeAreaView>
        );
    }
};

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(FabricScreen)
