import {StyleSheet} from "react-native";
import React from 'react';
import {View, Text} from 'react-native-ui-lib';
export default class TextNavBar extends React.PureComponent {

    render() {
        return (
            <View row centerV style={styles.NavBar}>
                <Text flex-8 hb1 marginL-15>
                    {this.props.Title}
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    NavBar:{
        height:50
    },
});
