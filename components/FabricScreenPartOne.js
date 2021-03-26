import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import BookMarkIcon from "../Icons/BookMarkIcon";
import Colors from '../Style/Colors';
import {FlatList,StyleSheet} from "react-native";
import { connect } from 'react-redux';
const defaultColors = ["#ff99cc","#7ac1ff"];

class FabricScreenPartOne extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			isWishlist: !!this.props.WishlistFabrics.find(item => item === +this.props.FabricID),
		};
	}

    onBookmarkPress = () => {

        if (this.props.Token) {
            if (!this.state.isWishlist) {
                this.setState({isWishlist: !this.state.isWishlist});
                this.props.AddToWishlistFn(this.props.FabricID, this.props.Token);
                this.props.setFabricWishlist(this.props.FabricID);
            }
            else {
                this.setState({isWishlist: !this.state.isWishlist});
                this.props.RemoveFromWishlistFn(this.props.FabricID, this.props.Token);
                this.props.RemoveFromFabricWishlist(this.props.FabricID);
            }
        } else {
            this.props.NavigateLogin();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.WishlistFabricsLength !== prevProps.WishlistFabricsLength) {
            const isWishlist = !!this.props.WishlistFabrics.find(item => item === +this.props.FabricID);
            if (isWishlist !== this.state.isWishlist) {
                this.setState({ isWishlist });
            }
        }
    }

    navigateCategory = () => {
		this.props.navigation.push('SearchScreen', {SearchFilter: {Type: 0, Index: this.props.CategoryID, Label: this.props.Category}});
    }

    /**
     * @param {any} MaterialID
     * @param {any} Material
     */
    navigateMaterial = (MaterialID, Material) => {
		this.props.navigation.push('SearchScreen', {SearchFilter: {Type: 2, Index: MaterialID, Label: Material}});
	}

    render() {
        return (
            <View flex marginL-15 marginR-15>
                <View row marginV-5>
                    <View flex-7 centerV row>
                        <Text b1 black>
                            {this.props.Title}
                        </Text>
                        <View marginL-10 center style={{backgroundColor: Colors.shadow, width:'auto', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10}}>
                            <Text h2 secondary onPress={this.navigateCategory}>
                                {this.props.Category}
                            </Text>
                        </View>
                    </View>

                    <View flex-end>
                        <TouchableOpacity flex centerV onPress={this.onBookmarkPress}>
                            <BookMarkIcon Fill={this.state.isWishlist} size={28} Color={Colors.primary}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View centerV>
                    <Text b1 primary>₹{this.props.FabricPrice}</Text>
                </View>

                <View marginT-10 marginB-10 style={{marginHorizontal: -15}}>
                    <FlatList
                        data={this.props.Materials}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        keyExtractor={(item) => item}
                        renderItem={({item, index}) => (
                            <TouchableOpacity
                                centerV
                                onPress = {() => this.navigateMaterial(this.props.MaterialIDs[index], item)}
                                style={[{backgroundColor: defaultColors[index%2]}, styles.Tags]}>
                                <Text hb2 white>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    Tags: {
        height: 40,
        borderRadius:50,
        paddingHorizontal: 20,
        marginHorizontal: 6
    },
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

export default connect(mapsStateToProps, mapDispatchToProps)(FabricScreenPartOne);