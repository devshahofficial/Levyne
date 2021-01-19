import React from 'react';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {StyleSheet, Dimensions, Image} from 'react-native';

const {height} = Dimensions.get('window');


export default class Square extends React.Component {
    render() {
        return (
            <View>
                <View row>
                    <TouchableOpacity flex style={styles.msgLeft}>
                        <Image source={{uri: "https://i.ibb.co/h7LXd3D/Group-4177.png"}} style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity flex style={styles.msgRight}>
                        <Image source={{uri: "https://i.ibb.co/b1HxvjL/Group-4178.png"}} style={styles.img} />
                    </TouchableOpacity>
                </View>
                <View row>
                    <TouchableOpacity flex style={styles.msgLeft}>
                        <Image source={{uri: "https://i.ibb.co/w4YN5Sw/Group-4176.png"}} style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity flex style={styles.msgRight}>
                        <Image source={{uri: "https://i.ibb.co/r7zSrJ3/Group-4179.png"}} style={styles.img} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    msgLeft: {
        marginTop: 0,
        height: height * 0.15,
        borderRadius: 5,
        marginVertical: 10,
        marginLeft: 10,
        marginRight: 5
    },
    msgRight: {
        marginTop: 0,
        height: height * 0.15,
        borderRadius: 5,
        marginVertical: 10,
        marginRight: 10,
        marginLeft: 5
    },
});
