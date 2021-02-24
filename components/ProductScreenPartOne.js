import React from 'react';
import {Share, FlatList, StyleSheet, Dimensions} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import {ShareIcon} from '../Icons/ShareIcon';
import BookMarkIcon from '../Icons/BookMarkIcon';
import Colors from '../Style/Colors';
import StarIconsComponent from "./StarIconsComponent";
import {DeliveryIcon} from '../Icons/Secondary/DeliveryIcon';
import analytics from '@react-native-firebase/analytics';

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

		if(this.props.Token) {
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
		} else {
			this.props.NavigateLogin();
		}
	};

	NavigateStyle = ({Index, Label}) => {
		this.props.navigation.push('SearchScreen', {SearchFilter: {Type: 1, Index, Label}});
	}

	navigateCategory = () => {
		this.props.navigation.push('SearchScreen', {SearchFilter: {Type: 0, Index: this.props.CategoryID, Label: this.props.Category}});
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

	onShare = () => {
		analytics().logShare({content_type: 'Product', item_id: this.props.ProductID}).catch(console.log);
		Share.share({
            message: "Hey, I'm sharing an amazing outfit from " + this.props.Title + "'s collection.\n\nCheck out the outfit here: https://collections.levyne.com/p/" + this.props.ProductID
        }).catch(() => {});
    };

	render() {
		return (
			<View flex primary>
				<View row bottom marginT-5 marginB-10 centerV>
					<Text b1 black marginL-15>
						{this.props.Title}
					</Text>
					<View marginL-10 center style={styles.Product}>
						<Text h2 secondary onPress={this.navigateCategory}>
							{this.props.Category}
						</Text>
					</View>
				</View>
				<View row paddingH-15>
					<View flex-7>
						<Text marginV-3 h1 secondary>
							{this.props.ShortDescription}
						</Text>

						<View row marginV-13>
							<View row marginR-15>
								<StarIconsComponent BrandRating={Math.round(this.props.BrandRating)} />
							</View>
							<Text h2>{this.props.RatingCount} Ratings</Text>
						</View>

						<View row bottom>
							<Text b1 primary>
								₹{this.props.MinPrice} - ₹{this.props.MaxPrice}
							</Text>
						</View>
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
							<ShareIcon size={28} Color={Colors.primary} />
						</TouchableOpacity>
					</View>
				</View>

				{this.props.Styles ? (
					<View marginT-20>
						<FlatList
							data={this.props.Styles}
							showsHorizontalScrollIndicator={false}
							horizontal={true}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({item, index}) => (
								<TouchableOpacity
									centerV
									onPress={() => this.NavigateStyle({Index: this.props.StyleIDs[index], Label: item})}
									style={[{backgroundColor: defaultColors[index%2]}, styles.Tags]}>
									<Text hb2 white>
										{item}
									</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				) : <></>}
				<View marginT-40 paddingH-15 center row style={styles.View}>
					<DeliveryIcon size={30} Color={Colors.black} />
					{this.props.MinPrice >= 2000 ? (
						<>
							<Text marginL-10 h2>
								Free Delivery!
							</Text>
						</>
					) : (
						<>
							<Text marginL-10 h2>
								Free Delivery on buckets over ₹2000{'/-'}
							</Text>
						</>
					)}
				</View>
			</View>
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
	Product: {
		backgroundColor: Colors.shadow,
		width:'auto',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10
	}
});
