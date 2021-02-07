import React from 'react';
import {StyleSheet,ImageBackground, Dimensions, Platform} from 'react-native';
import {Text,TouchableOpacity,Colors,View} from 'react-native-ui-lib';

/**
 * @type {React.PureComponent}
 * @extends {React.PureComponent<{onPress: () => void, source: string, title: string, }>}
 **/


export default class ImageContainer extends React.PureComponent {

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                activeOpacity={1}
            >
                <Text marginL-15 marginT-15 hb1 secondary>{this.props.title}</Text>
                <View style={styles.shadow}>
                    <ImageBackground
                        source={{uri:this.props.source}}
                        style={styles.ImageContainer}
                        imageStyle={styles.Image}
                    >
                        <View style={styles.ButtonView}>
                            <Text marginL-20 secondary h3>SEE MORE</Text>
                            <TouchableOpacity centerV centerH style={styles.ButtonIcon}>
                                <Text flex b1 white marginT-8>
                                    {">"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        );
    };
}

const styles = StyleSheet.create({
    ImageContainer: {
        width: Dimensions.get('window').width*0.95,
        height:(Dimensions.get('window').width/300)*180*0.95,
        flex:1,
        justifyContent:'flex-end'
    },
    Image: {
        borderRadius:20,
        resizeMode:'cover',
    },
    ButtonView: {
        justifyContent: 'space-between',
        alignItems: "center",
        width:Platform.OS == 'android' ? 150 : 140,
        height:58,
        backgroundColor: Colors.white,
        borderRadius: 40,
        flexDirection:"row",
        marginBottom:25,
        marginTop:25,
        marginLeft:22
    },
    TitleView: {
        margin:15,
        marginBottom:0,
    },

    ButtonIcon: {
        backgroundColor: Colors.primary,
        borderRadius: 40,
        marginRight:4,
        width:48,
        height:48,
    },

    DescView: {
        marginLeft: 25,
    },
    shadow: {
        borderRadius: 20,
        height:(Dimensions.get('window').width/300)*180*0.95,
        width:Dimensions.get('window').width*0.95,
        margin : 15,
        marginLeft:10
    }
});
