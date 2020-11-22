import React from 'react';
import { StyleSheet, Platform,Image } from 'react-native';
import {
	TouchableOpacity,
} from 'react-native-ui-lib';
import Colors from "../Style/Colors";

export default class Stories extends React.PureComponent {

	render() {
		return (
			<TouchableOpacity
				onPress={this.props.ReadStory} center
				style={
					this.props.UnRead
						? styles.ViewBefore
						: styles.ViewAfter
				}
			>
				<Image
					source={this.props.ProfileImage}
					style={styles.image}
				>
				</Image>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	ViewBefore: {
		height:75,
		width:75,
		marginHorizontal:10,
		borderRadius:100,
		borderWidth:2,
		backgroundColor: Colors.white,
		borderColor: Colors.primary

	},
	ViewAfter: {
		height:75,
		width:75,
		marginHorizontal:10,
		borderRadius:100,
		borderWidth:2,
		backgroundColor: Colors.white,
		borderColor: Colors.shadow
	},
	image: {
        paddingTop: Platform.OS === 'ios' ? 5 : 0,
        width: 60,
        height: 60,
        borderRadius: 70

	}
});
