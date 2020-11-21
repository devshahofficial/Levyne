import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {View,Text, TouchableOpacity,Colors, AnimatedImage} from 'react-native-ui-lib';
import StarIconsComponent from "./StarIconsComponent";


export default class BrandItemContainer extends React.Component {
    render() {
        console.log(this.props);
        return (
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
                    <Text hb1 style={styles.headerText}>
                        {this.props.item.Name}
                    </Text>
                    <Text h2 grey40 marginH-10 left numberOfLines={3} ellipsizeMode='tail'>{this.props.item.About.replace(/(\r\n|\r|\n){2,}/g, '\n')}</Text>
                    <View row flex marginT-10 paddingL-10>
                        <StarIconsComponent BrandRating={Math.round(this.props.item.ratings)} />
                    </View>
                </View>
            </TouchableOpacity>
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
        flex:1
    },
    AnimatedImageContainerStyle: {
        backgroundColor: Colors.shadow,
        width:150,
        height:150
    },
    Container: {
        borderWidth: 1,
        borderColor: Colors.shadow,
        borderRadius: 10,
        padding: 10,
        margin: 15,
        flexDirection: "row",
    }
})


