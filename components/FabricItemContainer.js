import React from 'react';
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { View, Text, AnimatedImage, TouchableOpacity, Colors } from 'react-native-ui-lib';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import AddWishlistFabricByID from '../API/Fabrics/AddWishlistFabricByID';
import RemoveWishlistFabricByID from '../API/Fabrics/RemoveWishlistFabricByID';
import CstmShadowView from "./CstmShadowView";
import BookMarkIcon from '../Icons/BookMarkIcon';
import { connect } from 'react-redux';

class FabricItemContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isWishlist: !!this.props.WishlistFabrics.find(item => item === +this.props.item.FabricID)
        }
    }

    onBookmarkPress = () => {

        if (this.props.Token) {
            if (!this.state.isWishlist) {
                this.setState({isWishlist: !this.state.isWishlist});
                AddWishlistFabricByID(this.props.item.FabricID, this.props.Token);
                this.props.setFabricWishlist(this.props.item.FabricID);
            }
            else {
                this.setState({isWishlist: !this.state.isWishlist});
                RemoveWishlistFabricByID(this.props.item.FabricID, this.props.Token);
                this.props.RemoveFromFabricWishlist(this.props.item.FabricID);
            }
        } else {
            this.props.NavigateLogin();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.WishlistFabricsLength !== prevProps.WishlistFabricsLength) {
            const isWishlist = !!this.props.WishlistFabrics.find(item => item === +this.props.item.FabricID);
            if (isWishlist !== this.state.isWishlist) {
                this.setState({ isWishlist });
            }
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
                            <Text h1 numberOfLines={1} secondary ellipsizeMode='tail'>{this.props.item.Name} </Text>
                            <Text hb2 numberOfLines={1} secondary ellipsizeMode='tail'>{this.props.item.Category}</Text>

                            <Text primary hb1 marginB-5 marginT-10>₹{this.props.item.FabricPrice}</Text>
                        </View>

                        <TouchableOpacity onPress={this.onBookmarkPress} style={styles.heartIconStyle}>
                            <BookMarkIcon Fill={this.state.isWishlist} Color={Colors.primary} size={25} />
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


const mapsStateToProps = ({ Wishlist }) => {
    return {
        WishlistFabrics: Wishlist.Fabrics,
        WishlistFabricsLength: Wishlist.Fabrics.length
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setFabricWishlist: (FabricID) => dispatch({ type: 'setFabricWishlist', value: parseInt(FabricID) }),
        RemoveFromFabricWishlist: (FabricID) => dispatch({ type: 'RemoveFromFabricWishlist', value: parseInt(FabricID) }),
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(FabricItemContainer);