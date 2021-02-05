import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native-ui-lib';
import NavBarBack from '../components/NavBarBack';
import { Image } from 'react-native';
import Colors from '../Style/Colors';
import { Dimensions, ScrollView } from 'react-native';
import StarIconsWithPress from '../components/StarIconsWithPress';
import CstmInput from '../components/input';
const width = Dimensions.get('window').width;
import InAppReview from "react-native-in-app-review";
import AddReviews from '../API/Orders/AddReviews';
import { connect } from 'react-redux';

class Review extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			BrandRating: this.props.route.params.Rating,
			DeliveryRating: 0,
			BrandReview: '',
			DeliveryReview: ''
		}
		this.SVR = null;
		this.InAppReviewAvailable = InAppReview.isAvailable();
	}

	UpdateBrandRating = (BrandRating) => {
		this.setState({ BrandRating });
	}

	setBrandReview = (BrandReview) => {
		this.setState({ BrandReview })
	}

	UpdateDeliveryRating = (DeliveryRating) => {
		this.setState({ DeliveryRating });
	}

	setDeliveryReview = (DeliveryReview) => {
		this.setState({ DeliveryReview })
	}

	goToDeliveryRating = () => {
		this.SVR.scrollTo({x: width, animated: true})
	}

	OpenInAppReview = () => {
		InAppReview.RequestInAppReview();
		AddReviews(
			this.props.route.params.OrderID,
			{
				Brand: this.state.BrandRating,
				Delivery: this.state.DeliveryRating
			},
			{
				Brand: this.state.BrandReview,
				Delivery: this.state.DeliveryReview
			},
			this.props.AccessToken
		)
		this.props.navigation.goBack();
	}

	render() {
		return (
			<>
				<NavBarBack
					Title={'Rating'}
					Navigation={this.props.navigation.goBack}
				/>
				<ScrollView horizontal pagingEnabled scrollEnabled={false} ref={(SVR) => this.SVR = SVR}>
				<View flex center width={width}>
					<Image
						style={{ width: 100, height: 100 }}
						source={{ uri: 'https://cdn.dribbble.com/users/508588/screenshots/14415916/media/b57f1898f0f5430c34d262a54fd9e010.jpg' }}
					/>
					<Text hb1>Tell us about your experience!</Text>
					<View marginV-10 style={{ flexDirection: 'row' }}>
						<StarIconsWithPress Rating={this.state.BrandRating || 0} UpdateRating={this.UpdateBrandRating} />
					</View>

					<CstmInput
						style={{ height: 100, width: '90%', borderRadius: 15 }}
						placeholder='Review'
						value={this.state.BrandReview}
						onChangeText={this.setBrandReview}
					/>

					<TouchableOpacity onPress={this.goToDeliveryRating} center marginV-10 style={{backgroundColor: Colors.primary, padding: 12, borderRadius: 10, width: 90}}>
						<Text hb1 white>Post</Text>
					</TouchableOpacity>
				</View>
				<View flex center width={width}>
					<Image
						style={{ width: 100, height: 100 }}
						source={{ uri: 'https://cdn.dribbble.com/users/508588/screenshots/14415916/media/b57f1898f0f5430c34d262a54fd9e010.jpg' }}
					/>
					<Text hb1>Tell us about your experience!</Text>
					<View marginV-10 style={{ flexDirection: 'row' }}>
						<StarIconsWithPress Rating={this.state.DeliveryRating || 0} UpdateRating={this.UpdateDeliveryRating} />
					</View>

					<CstmInput
						style={{ height: 100, width: '90%', borderRadius: 15 }}
						placeholder='Review'
						value={this.state.DeliveryReview}
						onChangeText={this.setDeliveryReview}
					/>

					<TouchableOpacity onPress={this.OpenInAppReview} center marginV-10 style={{backgroundColor: Colors.primary, padding: 12, borderRadius: 10, width: 90}}>
						<Text hb1 white>Post</Text>
					</TouchableOpacity>
				</View>
				</ScrollView>
			</>
		);
	}
}


const mapsStateToProps = (state) => ({
    AccessToken: state.Auth.AccessToken
});

export default connect(mapsStateToProps)(Review);
