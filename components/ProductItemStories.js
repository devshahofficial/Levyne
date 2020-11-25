import React from 'react';
import { StyleSheet, Dimensions,ActivityIndicator } from 'react-native';
import {View,Text, AnimatedImage,TouchableOpacity,Colors} from 'react-native-ui-lib';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import CstmShadowView from "./CstmShadowView";

export default class ProductItemStories extends React.PureComponent {

    render() {
        return (
            <CstmShadowView style={styles.shadow}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {this.props.navigateProduct(this.props.ProductID)}}
                >
                    <AnimatedImage
                        source={{uri:this.props.ProductImage}}
                        style={styles.drawerCover}
                        loader={<ActivityIndicator />}
                        containerStyle={{backgroundColor: Colors.shadow, borderRadius: 10}}
                    />

                    <View row marginL-10 marginT-15>
                        <View style={{flex: 0.8}}>
                            <Text hb1 numberOfLines={1} secondary ellipsizeMode='tail'>{this.props.BrandName}</Text>
                            <Text h3 numberOfLines={1} secondary ellipsizeMode='tail'>{this.props.ShortDescription} </Text>
                        </View>

                    </View>
                    <View row>
                        <View marginL-10 flex>
                            <View row>
                                <Text marginT-2 h2 secondary>min</Text>
                                <Text marginT-2 hb2 primary marginL-5>₹{this.props.MinPrice}</Text>
                            </View>
                            <View row>
                                <Text marginT-2 h2 secondary>max</Text>
                                <Text marginT-2 hb2 primary marginL-5>₹{this.props.MaxPrice}</Text>
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
    },
    Icon : {
        height:30,
        width:30,
        marginHorizontal: 6,
        flex:0.25
    }
})



