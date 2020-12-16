import React from 'react';
import {Share, FlatList, StyleSheet, Dimensions} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import {ShareIcon} from '../Icons/ShareIcon';
import BookMarkIcon from '../Icons/BookMarkIcon';
import Colors from '../Style/Colors';
import StarIconsComponent from "./StarIconsComponent";
import {DescriptionCard} from "./ReadMore";
import Category from "./Category";

const defaultColors = ['#ff99cc', '#7ac1ff'];

export default class ProductScreenPartOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductWishlist: this.props.ProductWishlist === 1 ? true : false,
            Fabric: 1,
        };
    }

    onBookmarkPress = () => {

        if(this.props.Token) {
            if (!this.state.ProductWishlist) {
                this.props.AddToWishlistFn(this.props.ProductID, this.props.Token);
                this.setState({
                    ProductWishlist: !this.state.ProductWishlist,
                });
            } else {
                this.props.RemoveFromWishlistFn(this.props.ProductID, this.props.Token);
                this.setState({
                    ProductWishlist: !this.state.ProductWishlist,
                });
            }
        } else {
            this.props.NavigateLogin();
        }
    };

    NavigateStyle = ({Index, Label}) => {
        this.props.navigation.push('SearchScreen', {SearchFilter: {Type: 1, Index, Label}});
    }

    navigateCategory = () => {
        this.props.navigation.push('SearchScreen', {SearchFilter: {Type: 0, Index: this.props.CategoryID, Label: this.props.Category}});
    }

    StylesRenderItem = ({item, index}) => (
        <TouchableOpacity
            centerV
            style={[{backgroundColor: defaultColors[index%2]}, styles.Tags]}
            onPress={() => this.NavigateStyle({Label: item, Index: this.props.StyleIDs[index]})}
        >
            <Text hb2 white>
                {item}
            </Text>
        </TouchableOpacity>
    );

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    //console.log(result.activityType);
                } else {
                    //console.log(result.activityType);
                }
            } else if (result.action === Share.dismissedAction) {
                //console.log(result.action);
            }
        } catch (error) {
            //console.log(error.message);
        }
    };

    render() {
        return (
            <View flex primary>

                <View row paddingH-15>
                    <View flex-7>
                        <View row bottom marginT-5 marginB-10 centerV>
                            <Text b1 black>
                                {this.props.Title}
                            </Text>
                            <View marginL-15 center style={styles.Product}>
                                <Text h2 secondary onPress={this.navigateCategory}>
                                    {this.props.Category}
                                </Text>
                            </View>
                        </View>

                        <Text marginV-3 h1 secondary>
                            {this.props.ShortDescription}
                        </Text>

                        <View row bottom>
                            <Text b1 primary>
                                ₹{this.props.MinPrice} - ₹{this.props.MaxPrice}
                            </Text>
                        </View>
                    </View>

                    <View flex-end>
                        <TouchableOpacity marginV-5 onPress={this.onBookmarkPress}>
                            <BookMarkIcon
                                Fill={this.state.ProductWishlist}
                                size={28}
                                Color={Colors.primary}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity marginV-10 onPress={this.onShare}>
                            <ShareIcon size={28} Color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
                {this.props.Styles ? (
                    <View marginT-20>
                        <FlatList
                            data={this.props.Styles}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => (
                                <TouchableOpacity
                                    centerV
                                    onPress={() => this.NavigateStyle({Index: this.props.StyleIDs[index], Label: item})}
                                    style={[{backgroundColor: defaultColors[index%2]}, styles.Tags]}>
                                    <Text hb2 white>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                ) : <></>}

                <View marginT-30 marginB-20 marginH-15>
                    <Text hb1>Product Description</Text>
                    <DescriptionCard CompleteDescription={this.props.LongDescription} />

                    <Text hb1 marginT-20>Fabric Description</Text>
                    <DescriptionCard CompleteDescription={this.props.FabricDescription} />
                    <TouchableOpacity>
                        <View style={{marginHorizontal: -15}}>
                            <FlatList
                                data={this.props.Materials}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                extraData={this.props.navigation}
                                keyExtractor={(item) => item}
                                renderItem={({item, index}) => (
                                    <Category
                                        title={item}
                                        NavigateSearch={() => this.NavigateSearch({Type: 2, Index: this.props.MaterialIDs[index], Label: item})}
                                        ImageStyle={styles.Image}
                                    />
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    Tags: {
        height: 40,
        borderRadius: 50,
        paddingHorizontal: 20,
        marginHorizontal: 6,
    },
    View: {
        height: 50,
        width: Dimensions.get('window').width,
        backgroundColor: Colors.shadow,
    },
    Product: {
        backgroundColor: Colors.shadow,
        width:'auto',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    }
});
