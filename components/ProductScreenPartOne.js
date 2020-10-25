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

	render() {
		return (
			<View flex primary marginH-15>
				<View row bottom>
					<Text b1 black marginV-3>
						{this.props.Title}
					</Text>
					<Text marginL-10 h2 secondary marginV-3>
						({this.props.Category})
					</Text>
				</View>
				<View
					marginT-10
					paddingH-15
					center
					row
					style={{
						height: 50,
						width: Dimensions.get('window').width,
						marginLeft: -15,
						backgroundColor: Colors.shadow,
					}}>
					<MachineWashIcon size={30} Color={Colors.black} />
					<Text marginL-10 h2>
						Dry cleaning is recommended for the first wash!
					</Text>
				</View>
				<View row>
					<View flex-7>
						<Text marginV-3 h1 secondary>
							{this.props.ShortDescription}
						</Text>
						<View row marginV-10>
							<View row marginR-15>
								<StarIconsComponent BrandRating={Math.round(this.props.ProductRating)} />
							</View>
							<Text h2>{this.props.ProductRating} Ratings</Text>
						</View>
						<View row bottom>
							<Text b1 primary>
								₹{this.props.MinPrice} - ₹{this.props.MaxPrice}
							</Text>
						</View>
					</View>
					<View flex-end>
						<TouchableOpacity marginV-10 onPress={this.onBookmarkPress}>
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

				<View marginT-20 style={{marginHorizontal: -15}}>
					<FlatList
						data={this.props.Styles}
						showsHorizontalScrollIndicator={false}
						horizontal={true}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({item, index}) => (
							<View
								centerV
								style={[{backgroundColor: defaultColors[index%2]}, styles.Tags]}>
								<Text hb2 white>
                                    {item}
								</Text>
							</View>
						)}
					/>
				</View>
				<View marginT-20 paddingH-15 center row style={styles.View}>
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
		marginLeft: -15,
		backgroundColor: Colors.shadow,
	},
});
