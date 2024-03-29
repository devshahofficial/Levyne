import React from 'react';
import {Share, FlatList, StyleSheet, Dimensions, Platform} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import {ShareIcon} from '../Icons/ShareIcon';
import Colors from '../Style/Colors';
import CstmShadowView from "./CstmShadowView";

const defaultColors = ['#ff99cc', '#7ac1ff'];
const deviceWidth = Dimensions.get('window').width;

export default class ProductScreenPartOne extends React.Component {

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

    onShare = () => {
        Share.share({
            message: "Hey, I'm sharing an amazing outfit designed with ❤️ by Levyne.\n\nVisit here: https://collections.levyne.com/d/" + this.props.DesignID
        }).catch(() => {});
    };

    render() {
        return (
            <View flex primary>
                <View row paddingH-15>
                    <View flex-7>
                        <View row bottom marginT-5 marginB-10 centerV>
                            <Text b1 black>
                                #{this.props.Title}
                            </Text>
                            <View marginL-15 center style={styles.Product}>
                                <Text h2 secondary onPress={this.navigateCategory}>
                                    {this.props.Category || "Others"}
                                </Text>
                            </View>
                        </View>

                        <Text marginV-3 h1 secondary>
                            {this.props.ShortDescription}
                        </Text>
                        {
                            this.props.MinPrice ?
                                <View row bottom>
                                    <Text b1 primary>
                                        ₹{this.props.MinPrice} - ₹{this.props.MaxPrice}
                                    </Text>
                                </View>
                                :
                                <></>
                        }
                    </View>

                    <View flex-end>
                        {/*<TouchableOpacity marginV-5 onPress={this.onBookmarkPress}>
                            <BookMarkIcon
                                Fill={this.state.ProductWishlist}
                                size={28}
                                Color={Colors.primary}
                            />
                        </TouchableOpacity>*/}
                        <TouchableOpacity marginV-10 onPress={this.onShare}>
                            <ShareIcon size={28} Color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View marginT-10>
                    <FlatList
                        data={this.props.ColorCode}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        keyExtractor={(item, index) => item}
                        renderItem={({item}) => (
                            <CstmShadowView
                                style={styles.Shadow}
                            >
                                <View style={[styles.Color,{backgroundColor: item,}]}/>
                            </CstmShadowView>
                        )}
                    />
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
                    <Text h1>{this.props.LongDescription}</Text>

                    <Text hb1 marginT-20>
                        Disclaimer
                    </Text>
                    <Text h1>
                        Product colour may slightly vary due to photographic lighting sources or your monitor/screen setting.
                    </Text>
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
    },
    Color: {
        height: 50,
        width: 50,
        borderRadius: 50,
        alignSelf: 'center',
    },
    Shadow: {
        marginTop:0,
        paddingTop:0,
        height: 60,
        width: 60,
        margin: 10,
        justifyContent: 'center'
    }
});
