/* eslint-disable react-native/no-inline-styles */
import { StyleSheet } from 'react-native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';

/**
 * @type {React.PureComponent}
 * @typedef {() => void} NavigateLogin
 * @extends {React.PureComponent<{Title: string, Navigation?: () => void, children?: React.ReactElement<{}>}>}
 **/

export default class TextNavBar extends React.PureComponent {
	render() {
		return (
			<View row centerV style={styles.NavBar}>
				<Text flex-9 hb1 marginL-15>
					{this.props.Title}
				</Text>
				<TouchableOpacity
					flex
					style={{ height: 'auto', padding: 10 }}
					onPress={this.props.Navigation}>
					{this.props.children}
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	NavBar: {
		height: 50,
	},
});
