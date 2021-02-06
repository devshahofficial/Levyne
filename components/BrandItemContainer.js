import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {View,Text, TouchableOpacity,Colors, AnimatedImage} from 'react-native-ui-lib';
import StarIconsComponent from "./StarIconsComponent";
import CstmShadowView from "./CstmShadowView";

/**
 * @type {React.PureComponent}
 * @extends {React.PureComponent<{navigateBrand: (BrandID: number) => void, item: {BrandID: number, ProfileImage: string, Name: string, About: string, Rating: number}}>}
 **/


export default class BrandItemContainer extends React.PureComponent {
    render() {
        return (
            <CstmShadowView style={styles.Shadow}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.Container}
                    onPress={() => {
                        this.props.navigateBrand(this.props.item.BrandID)
                    }}
                >
                    <View>
                        <AnimatedImage
                            style={styles.headerImage}
                            source={{ uri: this.props.item.ProfileImage }}
                            loader={<ActivityIndicator />}
                            containerStyle={styles.AnimatedImageContainerStyle}
                        />
                    </View>
                    <View flex>
                        <Text
                            hb1
                            style={styles.headerText}
                            numberOfLines={2} ellipsizeMode='tail'
                        >
                            {this.props.item.Name}
                        </Text>
                        <Text h2 grey40 marginH-10 left numberOfLines={3} ellipsizeMode='tail'>{this.props.item.About.replace(/(\r\n|\r|\n){2,}/g, '\n')}</Text>
                        <View row flex marginT-10 paddingL-10>
                            <StarIconsComponent BrandRating={Math.round(this.props.item.Rating)} />
                        </View>
                    </View>
                </TouchableOpacity>
            </CstmShadowView>
        )
    }
}
const styles = StyleSheet.create({
    headerText: {
        paddingTop: 0,
        marginLeft: 10,
        marginRight: 100,
    },
    headerImage: {
        height: 150,
        width: 150,
        flex:1,
        borderRadius:10
    },
    AnimatedImageContainerStyle: {
        backgroundColor: Colors.white,
        width:150,
        height:150,
    },
    Container: {
        borderRadius: 10,
        flexDirection: "row",
        paddingTop: 10
    },
    Shadow: {
        borderRadius: 10,
        margin: 15,
        padding: 10,
        height: 'auto'
    }
})


