import React from 'react';
import { View,StyleSheet, Platform, ImageBackground } from 'react-native';
import { TouchableOpacity, Text} from 'react-native-ui-lib';

export default class Category extends React.PureComponent {
    render() {
        return (
            <TouchableOpacity
                /*onPress={() => this.props.navigation.navigate('FilterSearchResult', {
                FilterObject : [{
                    key: 'Type',
                    value: this.props.FilterObjectvalue
                }]
            })}*/>
                <ImageBackground
                    imageStyle={{ borderRadius: 10 }}
                    source={{ uri: this.props.Image }}
                    style={[styles.image,this.props.ImageStyle]}
                >
                    <Text b1 white center>
                        {this.props.title}
                    </Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        paddingTop: Platform.OS === 'ios' ? 5 : 0,
        height: 65,
        width: 150,
        justifyContent: 'center',
        margin: 15,
        alignSelf: 'center'
    }
});
