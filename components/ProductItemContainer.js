import React from 'react';
import { StyleSheet, Dimensions,ActivityIndicator } from 'react-native';
import {View,Text, AnimatedImage,TouchableOpacity,Colors} from 'react-native-ui-lib';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import AddWishlistProductByID from '../API/Products/AddWishlistProductByID';
import RemoveWishlistProductByID from '../API/Products/RemoveWishlistProductByID';
import CstmShadowView from "./CstmShadowView";
import BookMarkIcon from '../Icons/BookMarkIcon';

export default class ProductItemContainer extends React.Component {

    constructor(props)
    {
        super(props);
        _HeartIcon = React.createRef();
        this.state={
            addToWishlist: this.props.item.IsWishlist === 1 ? true : false
        }
    }

    onBookmarkPress = async () => {

        if(this.props.Token) {
            if(!this.state.addToWishlist)
            {
                AddWishlistProductByID(this.props.item.ProductID,this.props.Token);
                this.setState({addToWishlist: !this.state.addToWishlist});
            }
            else
            {
                RemoveWishlistProductByID(this.props.item.ProductID,this.props.Token)
                this.setState({addToWishlist: !this.state.addToWishlist});
            }
        } else {
            this.props.NavigateLogin();
        }
    }

    render() {
        return (
            <CstmShadowView style={styles.shadow}>
                <TouchableOpacity
                    activeOpacity={0.7} style={{borderRadius:10}}
                    onPress={() => {this.props.navigateProduct(this.props.item.ProductID)}}
                >
                    <AnimatedImage
                        source={{uri:this.props.item.ProductImage}}
                        style={styles.drawerCover}
                        loader={<ActivityIndicator />}
                        containerStyle={{backgroundColor: Colors.shadow, borderRadius: 10}}
                    />

                    <View row marginL-10 marginT-15>
                        <View style={{flex: 0.8}}>
                            <Text h1 numberOfLines={1} secondary ellipsizeMode='tail'>{this.props.item.ShortDescription} </Text>
                            <Text hb2 numberOfLines={1} secondary ellipsizeMode='tail'>{this.props.item.Name}</Text>
                        </View>

                        <TouchableOpacity onPress={this.onBookmarkPress} style={styles.heartIconStyle}>
                            <BookMarkIcon Fill={this.state.addToWishlist} Color={Colors.primary} size={25}/>
                        </TouchableOpacity>

                    </View>
                    <View row>
                        <View marginL-10 flex>
                            <View row>
                                <Text marginT-2 h2 secondary>min</Text>
                                <Text marginT-2 hb2 primary marginL-5>₹{this.props.item.MinPrice}</Text>
                            </View>
                            <View row>
                                <Text marginT-2 h2 secondary>max</Text>
                                <Text marginT-2 hb2 primary marginL-5>₹{this.props.item.MaxPrice}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

            </CstmShadowView>

        )
    }
}


const styles = StyleSheet.create({
    shadow: {
        height: deviceHeight * 0.50,
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
    drawerCover: {
        //image
        alignSelf: "stretch",
        borderRadius:4,
        height: deviceHeight * 0.35,
        width: deviceWidth * 0.45,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    Icon : {
        height:30,
        width:30,
        marginHorizontal: 6,
        flex:0.25
    }
})



