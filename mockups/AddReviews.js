import React from 'react';
import { Text, View, Button } from 'react-native-ui-lib';
import NavBarBack from '../components/NavBarBack';
import { Dimensions, ScrollView } from 'react-native';
import StarIconsWithPress from '../components/StarIconsWithPress';
import CstmInput from '../components/input';
const width = Dimensions.get('window').width;
import InAppReview from "react-native-in-app-review";
import AddReviews from '../API/Orders/AddReviews';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import CstmShadowView from "../components/CstmShadowView";
// @ts-ignore
import RateIcon from "../assets/images/AppImages/Ratings.svg";

/**
 * @type {React.PureComponent}
 * @typedef {object} AccessTokenProps
 * @prop {string} AccessToken
 * @typedef {import('../Types/index').HomeStackParamList} HomeStackParamList
 * @typedef {RouteProp<HomeStackParamList, 'AddReview'>} ReviewScreenRouteProp
 * @typedef {StackNavigationProp<HomeStackParamList, "AddReview">} ReviewScreenNavigationProps
 * @typedef {AccessTokenProps & { navigation: ReviewScreenNavigationProps, route: ReviewScreenRouteProp }} Props
 * @extends {React.PureComponent<Props>}
 */
class Review extends React.PureComponent {

	/**
	 * @param {Props | Readonly<Props>} props
	 */
	constructor(props) {
		super(props);
		this.state = {
			BrandRating: this.props.route.params.Rating,
			LevyneRating: 0,
			BrandReview: ''
		}
		this.InAppReviewAvailable = InAppReview.isAvailable();
	}

	/**
	 * @param {number} BrandRating
	 */
	UpdateBrandRating = (BrandRating) => {
		this.setState({ BrandRating });
	}

	/**
	 * @param {string} BrandReview
	 */
	setBrandReview = (BrandReview) => {
		this.setState({ BrandReview })
	}

	/**
	 * @param {number} LevyneRating
	 */
	UpdateLevyneRating = (LevyneRating) => {
		this.setState({ LevyneRating });
	}

	OpenInAppReview = () => {
		InAppReview.RequestInAppReview();
		AddReviews(
			this.props.route.params.OrderID,
			{
				Brand: this.state.BrandRating,
				Delivery: this.state.LevyneRating
			},
			{
				Brand: this.state.BrandReview
			},
			this.props.AccessToken
		)
		this.props.navigation.goBack();
	}

	render() {
		return (
			<>
				<NavBarBack
					Title={'Rate'}
					Navigation={this.props.navigation.goBack}
				/>
				<ScrollView
					contentContainerStyle={{paddingHorizontal:15}}
				>
					<View center width={width} height={0.5*width}><RateIcon width={"50%"}/></View>

					<View centerH>
						<Text h1 marginT-20 secondary>Rate your experience with Levyne!</Text>
						<View marginV-10 style={{ flexDirection: 'row' }}>
							<StarIconsWithPress Rating={this.state.LevyneRating || 0} UpdateRating={this.UpdateLevyneRating} />
						</View>


						<Text h1 marginT-20 secondary>Rate your experience with the Brand!</Text>
						<View marginV-10 row>
							<StarIconsWithPress Rating={this.state.BrandRating || 0} UpdateRating={this.UpdateBrandRating} />
						</View>

						<Text marginT-20 h1 secondary>Leave back your valuable brand review.</Text>
						<CstmInput
							style={{ height: 100, width:"100%", borderRadius: 15 }}
							placeholder='Review'
							value={this.state.BrandReview}
							onChangeText={this.setBrandReview}
						/>

						<CstmShadowView style={{alignSelf: "center", marginBottom: 30, marginTop:30}}>
							<Button flex label={"Post"} onPress={this.OpenInAppReview}/>
						</CstmShadowView>
					</View>
				</ScrollView>
			</>
		);
	}
}
/**
 * @param {{ Auth: { AccessToken: string; }; }} state
 */
const mapsStateToProps = (state) => ({
	AccessToken: state.Auth.AccessToken
});

export default connect(mapsStateToProps)(Review);
