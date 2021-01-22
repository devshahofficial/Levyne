import React from 'react';
import {StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {View, Text, TouchableOpacity, AnimatedImage} from 'react-native-ui-lib';
import Colors from '../Style/Colors';
import CstmShadowView from "./CstmShadowView";

const deviceWidth = Dimensions.get("window").width;

export default class ProductScreenPartOne extends React.PureComponent {

    render() {
        return (
            <CstmShadowView style={styles.Shadow}>
                <TouchableOpacity
                    style={styles.Container}
                    activeOpacity={0.7}
                    onPress={() => this.props.NavigateDesign(this.props.DesignID)}
                >
                    {this.props.NewDesign ? (
                        <View absR style={styles.New}>
                            <Text h4 center white>New</Text>
                        </View>
                    ) : <></>}
                    <AnimatedImage
                        source={{uri:this.props.Image}}
                        style={styles.drawerCover}
                        loader={<ActivityIndicator />}
                        containerStyle={{backgroundColor: Colors.shadow, borderRadius: 10}}
                    />

                    <View row centerV marginL-10 style={{borderRadius: 10, height:40}}>
                        <Text hb1 numberOfLines={1} secondary ellipsizeMode='tail'>{this.props.Name}</Text>
                    </View>
                </TouchableOpacity>
            </CstmShadowView>
        );
    }
}

const styles = StyleSheet.create({
    drawerCover: { //image
        alignSelf: "stretch",
        height: deviceWidth * 0.45,
        width: deviceWidth * 0.45,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    Shadow: {
        height: 'auto',
        width: deviceWidth * 0.45,
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden'
    },
    Container: {
        borderRadius: 10
    },
    New: {
        transform: [{ rotate: '45deg' }],
        backgroundColor: Colors.red40,
        zIndex:99,
        width:100,
        right: 0,
        marginTop:10,
        marginRight:-30
    }
});
