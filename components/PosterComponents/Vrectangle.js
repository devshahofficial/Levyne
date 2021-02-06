import React from 'react';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {StyleSheet, Dimensions, Image} from 'react-native';

const {height} = Dimensions.get('window');

/**
 * @type {React.PureComponent}
 * @extends {React.PureComponent<{onPress: (arg0: any) => void}>}
 **/

export default class Vrectangle extends React.PureComponent {
    render() {
        return (
            <View row>
                <TouchableOpacity onPress={this.props.onPress} flex style={styles.msg}>
                    <Image source={{uri: "https://i.ibb.co/KLVCrJm/Group-4188.jpg"}} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onPress} flex style={styles.msg}>
                    <Image source={{uri: "https://i.ibb.co/5sZrzP0/Group-4189.jpg"}} style={styles.img} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    msg: {
        marginTop: 10,
        height: height * 0.30,
        borderRadius: 10,
        margin: 10,
    },
});
