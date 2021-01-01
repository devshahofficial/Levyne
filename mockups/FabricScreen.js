import {SafeAreaView, ScrollView, ActivityIndicator, Dimensions} from "react-native";
import React from 'react';
import FabricScreenPartOne from '../components/FabricScreenPartOne';
import FabricScreenPartTwo from '../components/FabricScreenPartTwo';
import FabricByID from '../API/FabricByID';
import AddWishlistFabricByID from '../API/AddWishlistFabricByID';
import RemoveWishlistFabricByID from '../API/RemoveWishlistFabricByID';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import { Colors, AnimatedImage, TouchableOpacity, Text, View} from "react-native-ui-lib";
import ImageView from "react-native-image-viewing";
import Loader from "../components/Loader";
import {ShareIcon} from "../Icons/ShareIcon";


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

    render() {
        return (
            <SafeAreaView style={{backgroundColor: Colors.white, flex:1}}>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={this.state.loading ? 'Fabric' : this.state.FabricObject.Name}/>
                {!this.state.loading && this.state.success ?
                    <>
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
                                FabricID={this.state.FabricObject.FabricID}
                                FabricWishlist={this.state.FabricObject.IsWishlist}
                                AddToWishlistFn={this.AddToWishlistFn}
                                RemoveFromWishlistFn={this.RemoveFromWishlistFn}
                                Token={this.props.AccessToken}
                                Dyeable={this.state.FabricObject.Dyeable}
                                NavigateLogin={this.NavigateLogin}
                            />
                            <FabricScreenPartTwo LongDescription = {this.state.FabricObject.LongDescription}/>
                        </ScrollView>
                        <TouchableOpacity
                            style={{height: 50, borderWidth: 1, borderColor:Colors.shadow}}
                            center row
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
