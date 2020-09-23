import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {View,Text, TouchableOpacity,Colors, AnimatedImage} from 'react-native-ui-lib';
import StarIconsComponent from "./StarIconsComponent";


export default class BrandItemContainer extends React.Component {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.6} row paddingL-10 marginB-10 flex
                onPress={() => {
                    this.props.navigateBrand(this.props.item.BrandID)
                }}
            >
                <View>
                    <AnimatedImage
                        style={styles.headerImage}
                        source={{ uri: this.props.item.ProfileImage }}
                        loader={<ActivityIndicator />}
                        containerStyle={{backgroundColor: Colors.blue60}}
                    />
                </View>
                <View>
                    <Text hb1 style={styles.headerText}>
                        {this.props.item.Name}
                    </Text>
                    <Text h2 grey40 marginL-10 marginR-200 left>{this.props.item.About.replace(/(\r\n|\r|\n){2,}/g, '\n')}</Text>
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
        paddingTop: 20,
        marginLeft: 10,
        marginRight: 100,
    },
    headerImage: {
        height: 150,
        width: 150,
        flex:1
    },
})


