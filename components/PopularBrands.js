import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {View,Text, TouchableOpacity,Colors, AnimatedImage} from 'react-native-ui-lib';
import StarIconsComponent from "./StarIconsComponent";
import CstmShadowView from "./CstmShadowView";


export default class PopularBrands extends React.Component {
    render() {
        return (
            <CstmShadowView style={styles.Shadow}>
                <TouchableOpacity
                    activeOpacity={0.6} centerH
                    style={styles.Container}
                    onPress={() => {
                        this.props.navigateBrand(this.props.item.BrandID)
                    }}
                >
                    <AnimatedImage
                        style={styles.headerImage}
                        source={{ uri: this.props.item.ProfileImage }}
                        loader={<ActivityIndicator/>}
                        containerStyle={styles.AnimatedImageContainerStyle}
                    />
                    <Text
                        hb2 secondary marginT-10
                        numberOfLines={2} ellipsizeMode='tail'
                    >
                        {this.props.item.Name}
                    </Text>
                    <View row flex marginT-5>
                        <StarIconsComponent
                            BrandRating={Math.round(this.props.item.BrandRating)}
                        />
                    </View>
                </TouchableOpacity>
            </CstmShadowView>
        )
    }
}
const styles = StyleSheet.create({
    headerImage: {
        height: 100,
        width: 100,
        flex:1,
        borderRadius:10
    },
    AnimatedImageContainerStyle: {
        backgroundColor: Colors.white,
        width:100,
        height:100,
    },
    Container: {
        borderRadius: 10,
        paddingTop: 10
    },
    Shadow: {
        borderRadius: 10,
        margin: 15,
        padding: 10,
        height: 'auto',
        width: 140,
        marginBottom: 20
    }
})


