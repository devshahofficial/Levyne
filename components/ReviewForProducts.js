import React from 'react';
import { Text, View, Avatar, AvatarHelper } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import StarIconsComponent from './StarIconsComponent';
import { DescriptionCard } from './ReadMore';


export default class ReviewForProducts extends React.PureComponent {

	render() {
		return (
			<View>
				<Text hb1 marginV-20>
					Reviews
       			</Text>
				{this.props.Reviews.map(((item, index) => {
					const Initials = AvatarHelper.getInitials(item.CustomerName);
					return (
						<View key={index.toString()} style={styles.container}>
							<View style={styles.subContainer}>
								<Avatar label={Initials} style={styles.img} />
								<View marginL-10 marginT-5>
									<Text hb2>{item.CustomerName}</Text>
									<Text hb2>{item.HoursAgo} Hours Ago</Text>
								</View>
								<View flex margin-10 style={styles.txt}>
									<StarIconsComponent BrandRating={item.Rating}></StarIconsComponent>
								</View>
							</View>
							<View marginV-10>
								<DescriptionCard CompleteDescription={item.Review} />
							</View>
						</View>
					)
				}))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 'auto',
		borderRadius: 10,
	},
	subContainer: {
		flexDirection: 'row',
	},
	img: {
		width: 60,
		height: 60,
		borderRadius: 100,
	},
	txt: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
});
