import React from 'react';
import {TouchableOpacity} from 'react-native-ui-lib';
import {StyleSheet, Dimensions, Image} from 'react-native';

const {height} = Dimensions.get('window');

/**
 * @type {React.PureComponent}
 * @extends {React.PureComponent<{onPress: (arg0: any) => void, Image: string}>}
 **/


export default class Rectangle extends React.PureComponent {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress} style={styles.msg}>
                <Image source={{uri: this.props.Image}} style={styles.img} />
            </TouchableOpacity>
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
        height: height * 0.15,
        borderRadius: 10,
        margin: 10,
    },
});
