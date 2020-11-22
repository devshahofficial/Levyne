import React from 'react';
import {Share, FlatList, StyleSheet, Dimensions} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import {ShareIcon} from '../Icons/ShareIcon';
import {BookMarkIcon} from '../Icons/BookMarkIcon';
import Colors from '../Style/Colors';
import StarIconsComponent from "./StarIconsComponent";
import {MachineWashIcon} from '../Icons/Secondary/MachineWashIcon';
import {DeliveryIcon} from '../Icons/Secondary/DeliveryIcon';

const defaultColors = ['#ff99cc', '#7ac1ff'];

export default class ProductScreenPartOne extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ProductWishlist: this.props.ProductWishlist === 1 ? true : false,
			Fabric: 1,
		};
	}

	onBookmarkPress = () => {
		if (!this.state.ProductWishlist) {
			this.props.AddToWishlistFn(this.props.ProductID, this.props.Token);
			this.setState({
				ProductWishlist: !this.state.ProductWishlist,
			});
		} else {
			this.props.RemoveFromWishlistFn(this.props.ProductID, this.props.Token);
			this.setState({
				ProductWishlist: !this.state.ProductWishlist,
			});
		}
	};
	onShare = async () => {
		try {
			const result = await Share.share({
				message:
					'React Native | A framework for building native apps using React',
			});

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					//console.log(result.activityType);
				} else {
					//console.log(result.activityType);
				}
			} else if (result.action === Share.dismissedAction) {
				//console.log(result.action);
			}
		} catch (error) {
			//console.log(error.message);
		}
	};

	NavigateCategory = () => {
		this.props.navigation.push('SearchScreen', {SearchFilter: {Type: 0, Index: this.props.CategoryID, Label: this.props.Category}});
	}

	NavigateStyle = ({Index, Label}) => {
		this.props.navigation.push('SearchScreen', {SearchFilter: {Type: 1, Index, Label}});
	}

	StylesRenderItem = ({item, index}) => (
		<TouchableOpacity
			centerV
			style={[{backgroundColor: defaultColors[index%2]}, styles.Tags]}
			onPress={() => this.NavigateStyle({Label: item, Index: this.props.StyleIDs[index]})}
		>
			<Text hb2 white>
				{item}
			</Text>
		</TouchableOpacity>
	);

	render() {
		return (
			<>
			<View flex primary>
				<View row bottom>
					{this.props.Title && (
						<Text b1 black marginV-3 marginL-15>
							{this.props.Title}
						</Text>
					)}
					{this.props.Category && (
						<Text marginL-10 h2 secondary marginV-3 onPress={this.NavigateCategory}>
							({this.props.Category})
						</Text>
					)}
					
				</View>
			{ this.props.DryCleaning && (
				<>
				<View
					marginT-10
					paddingH-15
					center
					row
					style={{
						height: 50,
						width: Dimensions.get('window').width,
						// marginLeft: -15,
						backgroundColor: Colors.shadow,
					}}>
					<MachineWashIcon size={30} Color={Colors.black} />
					<Text marginL-10 h2>
						Dry cleaning is recommended for the first wash!
					</Text>
				</View>
				</>
			)}
				<View row paddingH-15>
					<View flex-7>
						{this.props.ShortDescription && (
							<Text marginV-3 h1 secondary>
								{this.props.ShortDescription}
							</Text>
						)}

						{this.props.ProductRating && (
							<View row marginV-13>
								<View row marginR-15>
									<StarIconsComponent BrandRating={Math.round(this.props.ProductRating)} />
								</View>
								<Text h2>{this.props.ProductRating} Ratings</Text>
							</View>
						)}
						
						{this.props.MinPrice && this.props.MaxPrice && (
							<View row bottom>
								<Text b1 primary>
									₹{this.props.MinPrice} - ₹{this.props.MaxPrice}
								</Text>
							</View>
						)}
					</View>
					
					<View flex-end>
						<TouchableOpacity marginV-5 onPress={this.onBookmarkPress}>
							<BookMarkIcon
								Fill={this.state.ProductWishlist}
								size={28}
								Color={Colors.primary}
							/>
						</TouchableOpacity>
						<TouchableOpacity marginV-10 onPress={this.onShare}>
							<ShareIcon size={24} Color={Colors.primary} />
						</TouchableOpacity>
					</View>
				</View>
				{this.props.Styles && (
					<View marginT-20>
						<FlatList
							data={this.props.Styles}
							showsHorizontalScrollIndicator={false}
							horizontal={true}
							keyExtractor={(item, index) => index.toString()}
							renderItem={this.StylesRenderItem}
						/>
					</View>
				)}
				{this.props.FreeDelivery && (
					<View marginT-10 paddingH-15 center row style={styles.View}>
						<DeliveryIcon size={30} Color={Colors.black} />
						{this.props.Delivery === 1 ? (
							<>
								<Text marginL-10 h2>
									Free Delivery!
								</Text>
							</>
						) : (
							<>
								<Text marginL-10 h2>
									Free Delivery on buckets over ₹1000{'/-'}
								</Text>
							</>
						)}
					</View>
				)}
				
			</View>
			</>
		);
	}
}

const styles = StyleSheet.create({
	Tags: {
		height: 40,
		borderRadius: 50,
		paddingHorizontal: 20,
		marginHorizontal: 6,
	},
	View: {
		height: 50,
		width: Dimensions.get('window').width,
		// marginLeft: -15,
		backgroundColor: Colors.shadow,
	},
});
