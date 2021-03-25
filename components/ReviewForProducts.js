import React from 'react';
import { Text, View, Avatar, AvatarHelper, Colors } from 'react-native-ui-lib';
import {Dimensions, StyleSheet} from 'react-native';
import StarIconsComponent from './StarIconsComponent';
import { DescriptionCard } from './ReadMore';
// @ts-ignore
import Review from "../assets/images/AppImages/Reviews.svg";

const width = Dimensions.get("window").width;

export default class ReviewForProducts extends React.PureComponent {

	render() {
		return (
			<View flex>

				{
					this.props.Reviews.length ? this.props.Reviews.map(((item, index) => {
						const Initials = AvatarHelper.getInitials(item.CustomerName);
						return (
							<View key={index.toString()} style={styles.container}>
								<View row>
									<Avatar label={Initials} style={styles.img} />
									<View marginL-10 marginT-5>
										<Text hb2>{item.CustomerName}</Text>
										<Text h3>{item.HoursAgo > 24 ? parseInt(item.HoursAgo/24) + " Days ago" : item.HoursAgo + " Hours ago" }</Text>
									</View>
									<View flex marginV-10 row right>
										<StarIconsComponent BrandRating={item.Rating}></StarIconsComponent>
									</View>
								</View>
								<View marginV-10 marginL-5>
									<DescriptionCard CompleteDescription={item.Review} />
								</View>
							</View>
						)
					}))
					:
						<View flex center>
							<View center height={width*0.4} width={width}>
								<Review width={"50%"}/>
							</View>
							<Text h1>Be the first one to review!</Text>
						</View>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		borderBottomColor: Colors.shadow,
		borderBottomWidth: 1,
		marginBottom: 10
	},
	img: {
		width: 60,
		height: 60,
		borderRadius: 100,
	},
});
