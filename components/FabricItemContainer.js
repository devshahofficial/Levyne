import React from 'react';
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { View, Text, AnimatedImage, TouchableOpacity, Colors } from 'react-native-ui-lib';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import AddWishlistFabricByID from '../API/Fabrics/AddWishlistFabricByID';
import RemoveWishlistFabricByID from '../API/Fabrics/RemoveWishlistFabricByID';
import CstmShadowView from "./CstmShadowView";
import BookMarkIcon from '../Icons/BookMarkIcon';

/**
 * @type {React.PureComponent}
 * @typedef {{IsWishlist: 1 | 0 | boolean, FabricID: number, FabricImage: string, Category: string, FabricPrice: number, Name: string}} FabricItem
 * @typedef {{NavigateSearch: () => void, item: FabricItem, navigateFabric: (FabricID: number) => void, Token: string, NavigateLogin: () => void}} FabricItemContainerProps
 * @extends {React.Component<FabricItemContainerProps>}
 **/

export default class FabricItemContainer extends React.Component {

    /**
     * @param {FabricItemContainerProps | Readonly<FabricItemContainerProps>} props
     */
    constructor(props) {
        super(props);
        this.state = {
            addToWishlist: this.props.item.IsWishlist === 1 ? true : false
        }
    }

    onBookmarkPress = () => {

        if (this.props.Token) {
            if (!this.state.addToWishlist) {
                try {
                    AddWishlistFabricByID(this.props.item.FabricID, this.props.Token)
                }
                catch (err) {
                    //console.log(err);
                    this.setState({ addToWishlist: !this.state.addToWishlist });
                }
                this.setState({ addToWishlist: !this.state.addToWishlist });
            }
            else {
                try {
                    RemoveWishlistFabricByID(this.props.item.FabricID, this.props.Token)
                }
                catch (err) {
                    this.setState({ addToWishlist: !this.state.addToWishlist });
                }
                this.setState({ addToWishlist: !this.state.addToWishlist });
            }
        } else {
            this.props.NavigateLogin();
        }
    }

    render() {
        return (
            <CstmShadowView style={styles.shadow}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => { this.props.navigateFabric(this.props.item.FabricID) }}
                >
                    <AnimatedImage
                        source={{ uri: this.props.item.FabricImage }}
                        style={styles.drawerCover}
                        loader={<ActivityIndicator />}
                        containerStyle={{ backgroundColor: Colors.shadow, borderRadius: 10 }}
                    />

                    <View row marginL-10 marginT-15>
                        <View style={{ flex: 0.8 }}>
                            <Text hb1 numberOfLines={1} secondary ellipsizeMode='tail'>{this.props.item.Name}</Text>

                            <View padding-5 marginV-10 center style={{ backgroundColor: Colors.shadow, borderRadius: 5 }}>
                                <Text h2 black>
                                    {this.props.item.Category}
                                </Text>
                            </View>

                            <Text primary hb1 marginB-5>₹{this.props.item.FabricPrice}</Text>
                        </View>

                        <TouchableOpacity onPress={this.onBookmarkPress} style={styles.heartIconStyle}>
                            <BookMarkIcon Fill={this.state.addToWishlist} Color={Colors.primary} size={25} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </CstmShadowView>

        )
    }
}
const styles = StyleSheet.create({
    shadow: {
        height: deviceHeight * 0.41,
        width: deviceWidth * 0.45,
        margin: 8,
        borderRadius: 10,
        marginBottom: 20,
    },
    heartIconStyle: {
        marginHorizontal: 6,
        alignContent: 'flex-end',
        flex: 0.2,
    },
    drawerCover: { //image
        alignSelf: "stretch",
        borderRadius: 4,
        height: deviceHeight * 0.25,
        width: deviceWidth * 0.45,
    },
    Icon: {
        height: 30,
        width: 30,
        marginHorizontal: 6,
        flex: 0.25
    }
})


