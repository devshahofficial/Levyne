import React from 'react';
import { StyleSheet, Dimensions,ActivityIndicator } from 'react-native';
import {View,Text, AnimatedImage, TouchableOpacity, Colors, Button} from 'react-native-ui-lib';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import AddWishlistFabricByID from '../API/AddWishlistFabricByID';
import RemoveWishlistFabricByID from '../API/RemoveWishlistFabricByID';
import CstmShadowView from "./CstmShadowView";
import {BookMarkIcon} from '../Icons/BookMarkIcon';

export default class FabricOrderContainer extends React.Component {

    constructor(props)
    {
        super(props);
        _HeartIcon = React.createRef();
        this.state={
            addToWishlist: this.props.item.IsWishlist === 1 ? true : false
        }
    }

    onBookmarkPress = () => {
        if(!this.state.addToWishlist)
        {
            try {
                AddWishlistFabricByID(this.props.item.FabricID,this.props.Token)
            }
            catch(err) {
                console.log(err);
                this.setState({addToWishlist: !this.state.addToWishlist});
            }
            this.setState({addToWishlist: !this.state.addToWishlist});
        }
        else
        {
            try {
                RemoveWishlistFabricByID(this.props.item.FabricID,this.props.Token)
            }
            catch(err) {
                this.setState({addToWishlist: !this.state.addToWishlist});
            }
            this.setState({addToWishlist: !this.state.addToWishlist});
        }
    }

    render() {
        return (
            <CstmShadowView style={styles.shadow}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{borderColor: Colors.primary}}
                    onPress={() => {this.props.navigateFabric(this.props.item.FabricID)}}
                >
                    <AnimatedImage
                        source={{uri:this.props.item.FabricImages[0]}}
                        style={styles.drawerCover}
                        loader={<ActivityIndicator/>}
                        containerStyle={{backgroundColor: Colors.blue60}}
                    />

                    <View row marginL-6 marginT-15>
                        <View style={{flex: 0.8}}>
                            <Text hb2 numberOfLines={1} ellipsizeMode='tail'>{this.props.item.Name}</Text>
                            <Text h3 numberOfLines={2} secondary ellipsizeMode='tail'>{this.props.item.ShortDescription} </Text>
                        </View>

                        <TouchableOpacity onPress={this.onBookmarkPress} style={styles.heartIconStyle}>
                            <BookMarkIcon Fill={this.state.addToWishlist} Color={Colors.primary} size={25}/>
                        </TouchableOpacity>

                    </View>
                    <View row>
                        <Text paddingR-10 marginL-5 marginT-2 hb2 primary>₹{this.props.item.DiscountPrice}</Text>
                        <Text paddingR-10 marginL-5 marginT-2 hb2 secondary style={{textDecorationLine: 'line-through'}}>₹{this.props.item.ActualPrice}</Text>
                    </View>
                </TouchableOpacity>

                <Button
                    label={this.props.SelectedFabric === this.props.item.FabricID ? "Your Choice" : "Choose"}
                    h2
                    onPress={() => {
                        this.props.SelectFabric(this.props.item.FabricID)
                    }}
                    labelStyle={this.props.SelectedFabric === this.props.item.FabricID ? {color: Colors.white} : {color: Colors.primary}}
                    style={this.props.SelectedFabric === this.props.item.FabricID ? styles.Choose : styles.Choosen}
                />
            </CstmShadowView>

        )
    }
}
const styles = StyleSheet.create({
    shadow: {
        height: deviceHeight * 0.45,
        width: deviceWidth * 0.45,
        margin: 8,
        borderRadius:10,
        marginBottom: 20,
    },
    heartIconStyle: {
        marginHorizontal: 6,
        alignContent: 'flex-end',
        flex: 0.2,
    },
    drawerCover: { //image
        alignSelf: "stretch",
        borderRadius:4,
        height: deviceHeight * 0.25,
        width: deviceWidth * 0.45,
    },
    Choose: {
        backgroundColor: Colors.primary,
        height: 30,
        marginHorizontal: 20,
        marginVertical: 10,
        color: Colors.white
    },
    Choosen: {
            backgroundColor: Colors.white,
            height: 30,
            borderColor: Colors.primary,
            borderWidth: 1,
            marginHorizontal: 20,
            marginVertical: 10,
            color: Colors.white
    }
})

