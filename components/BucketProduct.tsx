/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { View, TouchableOpacity, Text, Colors } from 'react-native-ui-lib';
import { ArchiveIcon } from '../Icons/ArchiveIcon';
import WebView from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;

//@ts-ignore
import ShadowView from 'react-native-simple-shadow-view';
import MilestonePaymentDetails from './ChatComponents/MilestonePaymentDetails';

type navigateProduct = (ProductID: number) => void;

type DisplayImageView = (Image: string) => void;

type navigateFabric = (FabricID: number) => void;

type RemoveProductFromCart = (CartID: number) => void;

type navigateDesign = (DesignID: number) => void;

type navigateChat = () => void;

type BucketItem = {
	ProductImage: string;
	FabricImage: string;
	DesignImage: string;
	DesignID: number;
	BucketPrice: number;
	Status: 0 | 1 | 2;
	Quantity: number;
	ProductID: number;
	Size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'C';
	FabricID: number;
	Category: string;
	'3DModel': string | number;
	'3DModelID': number;
	CartID: number;
	Price: number;
	SubOrderID: number;
	Note: string;
	PaymentTimestamp: string;
};

export default class BucketProduct extends React.PureComponent<{
	OrderCompleted: boolean;
	BrandImage: { uri: string };
	item: BucketItem;
	navigateChat: navigateChat;
	navigateProduct: navigateProduct;
	DisplayImageView: DisplayImageView;
	navigateFabric: navigateFabric;
	RemoveProductFromCart: RemoveProductFromCart;
	navigateDesign: navigateDesign;
}> {
	ProductWithFabric = () => {
		return (
			<View padding-15>
				<ShadowView style={styles.View}>
					<View flex row centerH style={{ height: 'auto' }}>
						<TouchableOpacity
							flex-6
							style={{ borderTopLeftRadius: 10 }}
							onPress={() =>
								this.props.DisplayImageView(
									this.props.item.ProductImage,
								)
							}>
							<Image
								style={styles.ImageContainer}
								source={{ uri: this.props.item.ProductImage }}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							flex-2
							style={{ borderTopRightRadius: 10 }}
							onPress={() =>
								this.props.DisplayImageView(
									this.props.item.FabricImage,
								)
							}>
							<Image
								style={styles.FabricContainer}
								source={{ uri: this.props.item.FabricImage }}
							/>
						</TouchableOpacity>
					</View>

					<View marginT-10>
						<Text h2 secondary>
							Price
						</Text>
						<View row>
							<Text hb1 primary>
								₹{this.props.item.BucketPrice}
							</Text>
						</View>
					</View>

					<View flex marginV-20>
						<View row>
							<Text flex hb2 secondary>
								Size
							</Text>
							<Text flex-2 h1>
								{this.props.item.Size}
							</Text>
						</View>
					</View>

					<TouchableOpacity
						onPress={() =>
							this.props.navigateProduct(
								this.props.item.ProductID,
							)
						}
						center
						marginB-5
						style={styles.TouchableOpacity}>
						<Text h2 secondary flex-15>
							Visit the product
						</Text>
						<Text h2 secondary flex>
							{'>'}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							this.props.navigateFabric(this.props.item.FabricID)
						}
						center
						marginT-5
						marginB-15
						style={styles.TouchableOpacity}>
						<Text h2 secondary flex-15>
							Visit the Fabric
						</Text>
						<Text h2 secondary flex>
							{'>'}
						</Text>
					</TouchableOpacity>
					{this.props.OrderCompleted ? (
						<></>
					) : (
						<View flex style={{ alignItems: 'flex-end' }}>
							<TouchableOpacity
								onPress={() =>
									this.props.RemoveProductFromCart(
										this.props.item.CartID,
									)
								}
								activeOpacity={0.8}
								center
								style={{
									width: 35,
									height: 35,
									backgroundColor: '#FF0000',
									borderRadius: 5,
								}}>
								<ArchiveIcon Size={20} Color={Colors.white} />
							</TouchableOpacity>
						</View>
					)}
				</ShadowView>
			</View>
		);
	};

	ThreeDProductMale = () => {
		return (
			<View padding-15>
				<ShadowView style={styles.View}>
					<View flex row centerH style={{ height: 'auto' }}>
						<View flex-6 style={{ borderTopLeftRadius: 10 }}>
							<WebView
								style={styles.ImageContainer}
								source={{
									uri: `https://3d.levyne.com/${this.props.item.Category}/${this.props.item['3DModel']}`,
								}}
							/>
						</View>
						<TouchableOpacity
							flex-2
							style={{ borderTopRightRadius: 10 }}
							onPress={() =>
								this.props.DisplayImageView(
									this.props.item.FabricImage,
								)
							}>
							<Image
								style={styles.FabricContainer}
								source={{ uri: this.props.item.FabricImage }}
							/>
						</TouchableOpacity>
					</View>

					<View marginT-10>
						<Text h2 secondary>
							Price
						</Text>
						<View row>
							<Text hb1 primary>
								₹{this.props.item.BucketPrice}
							</Text>
						</View>
					</View>

					<View flex marginV-20>
						<View row>
							<Text flex hb2 secondary>
								Size
							</Text>
							<Text flex-2 h1>
								{this.props.item.Size}
							</Text>
						</View>
					</View>

					<View row center>
						<TouchableOpacity
							onPress={() =>
								this.props.navigateFabric(
									this.props.item.FabricID,
								)
							}
							flex-8
							center
							marginH-5
							style={styles.TouchableOpacity}>
							<Text h2 secondary flex-15>
								Visit the Fabric
							</Text>
							<Text h2 secondary flex>
								{'>'}
							</Text>
						</TouchableOpacity>
						{this.props.OrderCompleted ? (
							<></>
						) : (
							<TouchableOpacity
								onPress={() =>
									this.props.RemoveProductFromCart(
										this.props.item.CartID,
									)
								}
								flex
								marginH-5
								activeOpacity={0.8}
								center
								style={{
									width: 40,
									height: 40,
									backgroundColor: '#FF0000',
									borderRadius: 5,
								}}>
								<ArchiveIcon Size={20} Color={Colors.white} />
							</TouchableOpacity>
						)}
					</View>
				</ShadowView>
			</View>
		);
	};

	ThreeDProductFemale = () => {
		return (
			<View padding-15>
				<ShadowView style={styles.View}>
					<View flex row centerH style={{ height: 'auto' }}>
						<View flex style={{ borderRadius: 10 }}>
							<WebView
								style={styles.ImageContainerOnlyProduct}
								source={{
									uri: `https://3d.levyne.com/${this.props.item.Category}/${this.props.item['3DModel']}`,
								}}
							/>
						</View>
					</View>

					<View marginT-10>
						<Text h2 secondary>
							Price
						</Text>
						<View row>
							<Text hb1 primary>
								₹{this.props.item.BucketPrice}
							</Text>
						</View>
					</View>

					<View flex marginV-20>
						<View row>
							<Text flex hb2 secondary>
								Size
							</Text>
							<Text flex-2 h1>
								{this.props.item.Size}
							</Text>
						</View>
					</View>

					{this.props.OrderCompleted ? (
						<></>
					) : (
						<View flex style={{ alignItems: 'flex-end' }}>
							<TouchableOpacity
								onPress={() =>
									this.props.RemoveProductFromCart(
										this.props.item.CartID,
									)
								}
								activeOpacity={0.8}
								center
								style={{
									width: 35,
									height: 35,
									backgroundColor: '#FF0000',
									borderRadius: 5,
								}}>
								<ArchiveIcon Size={20} Color={Colors.white} />
							</TouchableOpacity>
						</View>
					)}
				</ShadowView>
			</View>
		);
	};

	OnlyProduct = () => {
		return (
			<View padding-15>
				<ShadowView style={styles.View}>
					<View flex row centerH style={{ height: 'auto' }}>
						<TouchableOpacity
							flex
							style={{ borderRadius: 10 }}
							onPress={() =>
								this.props.DisplayImageView(
									this.props.item.ProductImage,
								)
							}>
							<Image
								style={styles.ImageContainerOnlyProduct}
								source={{ uri: this.props.item.ProductImage }}
							/>
						</TouchableOpacity>
					</View>

					<View marginT-10>
						<Text h2 secondary>
							Price
						</Text>
						<View row>
							<Text hb1 primary>
								₹{this.props.item.BucketPrice}
							</Text>
						</View>
					</View>

					<View flex marginV-10>
						<View row>
							<Text flex hb2 secondary>
								Size
							</Text>
							<Text flex-2 h1>
								{this.props.item.Size}
							</Text>
						</View>
					</View>

					<View row center>
						<TouchableOpacity
							onPress={() =>
								this.props.navigateProduct(
									this.props.item.ProductID,
								)
							}
							flex-8
							center
							marginH-5
							style={styles.TouchableOpacity}>
							<Text h2 secondary flex-15>
								Visit the Product
							</Text>
							<Text h2 secondary flex>
								{'>'}
							</Text>
						</TouchableOpacity>
						{this.props.OrderCompleted ? (
							<></>
						) : (
							<TouchableOpacity
								onPress={() =>
									this.props.RemoveProductFromCart(
										this.props.item.CartID,
									)
								}
								flex
								marginH-5
								activeOpacity={0.8}
								center
								style={{
									width: 40,
									height: 40,
									backgroundColor: '#FF0000',
									borderRadius: 5,
								}}>
								<ArchiveIcon Size={20} Color={Colors.white} />
							</TouchableOpacity>
						)}
					</View>
				</ShadowView>
			</View>
		);
	};

	DesignByLevyne = () => {
		return (
			<View padding-15>
				<ShadowView style={styles.View}>
					<View flex row centerH style={{ height: 'auto' }}>
						<TouchableOpacity
							flex
							style={{ borderRadius: 10 }}
							onPress={() =>
								this.props.DisplayImageView(
									this.props.item.DesignImage,
								)
							}>
							<Image
								style={styles.ImageContainerOnlyProduct}
								source={{ uri: this.props.item.DesignImage }}
							/>
						</TouchableOpacity>
					</View>

					<View marginT-10>
						<Text h2 secondary>
							Price
						</Text>
						<View row>
							<Text hb1 primary>
								₹{this.props.item.BucketPrice}
							</Text>
						</View>
					</View>

					<View flex marginV-10>
						<View row>
							<Text flex hb2 secondary>
								Size
							</Text>
							<Text flex-2 h1>
								{this.props.item.Size}
							</Text>
						</View>
					</View>

					<View row center>
						<TouchableOpacity
							onPress={() =>
								this.props.navigateDesign(
									this.props.item.DesignID,
								)
							}
							flex-8
							center
							marginH-5
							style={styles.TouchableOpacity}>
							<Text h2 secondary flex-15>
								Visit the Design
							</Text>
							<Text h2 secondary flex>
								{'>'}
							</Text>
						</TouchableOpacity>

						{this.props.OrderCompleted ? (
							<></>
						) : (
							<TouchableOpacity
								onPress={() =>
									this.props.RemoveProductFromCart(
										this.props.item.CartID,
									)
								}
								flex
								marginH-5
								activeOpacity={0.8}
								center
								style={{
									width: 40,
									height: 40,
									backgroundColor: '#FF0000',
									borderRadius: 5,
								}}>
								<ArchiveIcon Size={20} Color={Colors.white} />
							</TouchableOpacity>
						)}
					</View>
				</ShadowView>
			</View>
		);
	};

	render() {
		if (this.props.item.ProductID) {
			if (this.props.item.FabricID) {
				return <this.ProductWithFabric />;
			}
			return <this.OnlyProduct />;
		} else if (this.props.item['3DModelID']) {
			//3D Model
			if (this.props.item.FabricID) {
				return <this.ThreeDProductMale />;
			}
			return <this.ThreeDProductFemale />;
		} else if (this.props.item.DesignID) {
			//Design By Levyne
			return <this.DesignByLevyne />;
		} else {
			//Custom Brand Product
			return (
				<MilestonePaymentDetails
					Price={this.props.item.Price}
					Note={this.props.item.Note}
					PaymentTimestamp={this.props.item.PaymentTimestamp}
				/>
			);
		}
	}
}

const styles = StyleSheet.create({
	View: {
		borderRadius: 10,
		borderColor: Colors.shadow,
		borderWidth: 1,
		padding: 10,
		shadowColor: Colors.shadow,
		shadowOpacity: 1,
		shadowRadius: 3,
		shadowOffset: { width: 0, height: 0 },
		backgroundColor: Colors.white,
	},
	TouchableOpacity: {
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: Colors.shadow,
		flexDirection: 'row',
		paddingHorizontal: 15,
	},
	ImageContainer: {
		height: windowWidth * 0.8,
		width: windowWidth * 0.6,
		borderTopLeftRadius: 10,
	},
	ImageContainerOnlyProduct: {
		height: windowWidth * 0.8,
		width: '100%',
		borderTopLeftRadius: 10,
	},
	FabricContainer: {
		height: windowWidth * 0.8,
		width: 'auto',
		borderTopRightRadius: 10,
	},
});
