import React from 'react';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {StyleSheet, Dimensions, Image} from 'react-native';

const {height} = Dimensions.get('window');

/**
 * @type {React.PureComponent}
 * @extends {React.PureComponent<{NavigateThreeD: (Type: number, Label: string) => void}>}
 **/

export default class Square extends React.PureComponent {
    render() {
        return (
            <View>
                <View row>
                    <TouchableOpacity onPress={() => this.props.NavigateThreeD(1, "Pants")} flex style={styles.msgLeft}>
                        <Image source={{uri: "https://d32kprqn8e36ns.cloudfront.net/TrousersHPDiscount.webp"}} style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.NavigateThreeD(0, "Shirt")} flex style={styles.msgRight}>
                        <Image source={{uri: "https://d32kprqn8e36ns.cloudfront.net/ShirtHPDiscount.webp"}} style={styles.img} />
                    </TouchableOpacity>
                </View>
                <View row>
                    <TouchableOpacity onPress={() => this.props.NavigateThreeD(3, "Kurti")} flex style={styles.msgLeft}>
                        <Image source={{uri: "https://d32kprqn8e36ns.cloudfront.net/KurtiHPDiscount.webp"}} style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.NavigateThreeD(4, "Choli")} flex style={styles.msgRight}>
                        <Image source={{uri: "https://d32kprqn8e36ns.cloudfront.net/CholiHPDiscount.webp"}} style={styles.img} />
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
