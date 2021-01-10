import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import BookMarkIcon from "../Icons/BookMarkIcon";
import Colors from '../Style/Colors';
import {FlatList,StyleSheet} from "react-native";
const defaultColors = ["#ff99cc","#7ac1ff"];

export default class FabricScreenPartOne extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            FabricWishlist : this.props.FabricWishlist === 1 ? true : false
        }
    }

    onBookmarkPress = () => {

        if(this.props.Token) {
            if(!this.state.FabricWishlist)
            {
                this.props.AddToWishlistFn(this.props.FabricID, this.props.Token);
                this.setState({
                    FabricWishlist : !this.state.FabricWishlist
                })
            }
            else
            {
                this.props.RemoveFromWishlistFn(this.props.FabricID, this.props.Token);
                this.setState({
                    FabricWishlist : !this.state.FabricWishlist
                })
            }
        } else {
            this.props.NavigateLogin();
        }
    };

    navigateCategory = () => {
		this.props.navigation.push('SearchScreen', {SearchFilter: {Type: 0, Index: this.props.CategoryID, Label: this.props.Category}});
	}

    render() {
        return (
            <View flex primary marginL-15 marginR-15>
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
                            <BookMarkIcon Fill={this.state.FabricWishlist} size={28} Color={Colors.primary}/>
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
                        keyExtractor={(item, index) => item}
                        renderItem={({item, index}) => (
                            <View
                                centerV
                                style={[{backgroundColor: defaultColors[index%2]}, styles.Tags]}>
                                <Text hb2 white>
                                    {item}
                                </Text>
                            </View>
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
