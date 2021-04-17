/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, AnimatedImage, Colors } from 'react-native-ui-lib';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import NavBarBack from '../../components/NavBarBack';
const deviceHeight = Dimensions.get('window').height;
import FetchBlogByID from '../../API/Blogs/FetchBlogByID';
import BlogBody from '../../components/BlogBody';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../Types/navigation';
import { RouteProp } from '@react-navigation/core';

type BlogPostPropType = {
	navigation: StackNavigationProp<HomeStackParamList, 'BlogPost'>;
	route: RouteProp<HomeStackParamList, 'BlogPost'>;
};

type RootChildrens = {
	textContent: string;
	type: number;
	children: RootChildrens;
}[];

type BlogPostStateType = {
	BlogBodyChildren: RootChildrens;
};

class BlogPost extends React.Component<BlogPostPropType, BlogPostStateType> {
	abortController: AbortController;
	constructor(props: BlogPostPropType) {
		super(props);
		this.state = {
			BlogBodyChildren: [],
		};
		// eslint-disable-next-line no-undef
		this.abortController = new AbortController();
	}

	componentDidMount() {
		FetchBlogByID(
			this.props.route.params.PostID,
			this.abortController.signal,
		)
			.then((resp) => {
				this.setState({
					BlogBodyChildren: JSON.parse(resp.Body).children,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<>
				<NavBarBack
					Navigation={this.props.navigation.goBack}
					Title={this.props.route.params.Title}
				/>
				<ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
					<AnimatedImage
						style={styles.pic}
						source={{ uri: this.props.route.params.Image }}
					/>
					<View paddingH-20>
						<Text style={styles.heading}>
							{this.props.route.params.Title}
						</Text>
						<Text style={styles.time}>
							{this.props.route.params.Timestamp}
						</Text>
					</View>
					<View flex margin-20>
						<Text>
							<BlogBody
								RootChildrens={this.state.BlogBodyChildren}
							/>
						</Text>
					</View>
				</ScrollView>
			</>
		);
	}
}

const styles = StyleSheet.create({
	pic: {
		padding: 0,
		margin: 0,
		height: deviceHeight / 3,
	},
	heading: {
		paddingTop: 15,
		fontSize: 22,
		textAlign: 'left',
		lineHeight: 37,
	},
	time: {
		paddingTop: 15,
		paddingBottom: 5,
		fontSize: 15,
		color: Colors.primary,
	},
	date: {
		color: Colors.primary,
	},
	text: {
		color: Colors.secondary,
		textAlign: 'justify',
		lineHeight: 30,
		marginBottom: 20,
	},
});

export default BlogPost;
