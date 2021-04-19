import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet, FlatList, Image } from 'react-native';
import CstmShadowView from '../../components/CstmShadowView';
import NavBarBack from '../../components/NavBarBack';

const notification = [
	{
		id: 1,
		comment: 'This is sample notification.',
		photo:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
	},
	{
		id: 2,
		comment:
			'Here is what you placed! The delivery will arrive on 9th December 2020',
		photo:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
	},
	{
		id: 3,
		comment:
			"Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
		photo:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
	},
	{
		id: 4,
		comment:
			'Here is what you placed! The delivery will arrive on 10th December 2020',
		photo:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
	},
];

const renderItem = ({ item }) => {
	return (
		<CstmShadowView style={styles.msg}>
			<TouchableOpacity flex row padding-10>
				<View flex>
					<Image source={{ uri: item.photo }} style={styles.img} />
				</View>
				<View flex-4>
					<Text h1>{item.comment}</Text>
				</View>
			</TouchableOpacity>
		</CstmShadowView>
	);
};

export default class Notify extends React.Component {
	render() {
		return (
			<>
				<NavBarBack
					Navigation={this.props.navigation.goBack}
					Title={'Notifications'}
				/>
				<View flex>
					<FlatList
						showsVerticalScrollIndicator={false}
						data={notification}
						renderItem={renderItem}
					/>
				</View>
			</>
		);
	}
}

const styles = StyleSheet.create({
	img: {
		width: 60,
		height: 60,
		borderRadius: 10,
		marginRight: 10,
	},
	msg: {
		margin: 10,
		padding: 10,
		borderRadius: 10,
		height: 'auto',
		marginTop: 0,
	},
});
