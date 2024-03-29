import React from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { View, Text, AvatarHelper } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import NavBarBack from '../../components/NavBarBack';
import { DeliveryIcon } from '../../Icons/Secondary/DeliveryIcon';
import Colors from '../../Style/Colors';
import BucketProduct from '../../components/BucketProduct';
import { TimerIcon } from '../../Icons/Secondary/TimerIcon';
import FetchBucket from '../../API/Cart/FetchBucket';
import RemoveProductFromCart from '../../API/Cart/RemoveProductFromCart';
import DeliveryChargeComponent from '../../components/DeliveryChargeComponent';
import ImageView from 'react-native-image-viewing';
import BottomButton from '../../components/BottomButtons';
import PickerModal from '../../components/PickerModal';
import Loader from '../../components/Loader';

class Bucket extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Buckets: [],
			Loading: true,
			ImageViewVisible: false,
			ImageViewImage: {},
			CartIDForDeletion: undefined,
			ProductTypeForDeletion: undefined,
			DeleteModalVisible: false,
			showToast: false,
		};
		// eslint-disable-next-line no-undef
		this.abortController = new AbortController();
		this.Timeout = null;
	}

	ActionSheetItems = [
		{
			id: 0,
			label: 'Confirm',
			onPress: () => {
				this.RemoveProductFromCart();
			},
		},
	];

	componentDidMount() {
		FetchBucket(
			this.props.route.params.BucketID,
			this.props.AccessToken,
			this.abortController.signal,
		)
			.then((Buckets) => {
				if (!Buckets[0]) {
					this.props.navigation.goBack();
				}

				this.setState({
					Buckets,
					Loading: false,
				});
			})
			.catch(() => {});

		this.willFocusSubscription = this.props.navigation.addListener(
			'focus',
			() => {
				this.setState({ Loading: true });
				FetchBucket(
					this.props.route.params.BucketID,
					this.props.AccessToken,
					this.abortController.signal,
				)
					.then((Buckets) => {
						let CheckoutActive = true;
						if (Buckets[0].Status === 1) {
							CheckoutActive = true;
						}
						this.setState({
							Buckets,
							Loading: false,
							CheckoutActive,
						});
					})
					.catch(() => {});
			},
		);
	}

	componentWillUnmount() {
		if (this.willFocusSubscription) {
			this.willFocusSubscription();
		}
		this.abortController.abort();
		this.Timeout && clearTimeout(this.Timeout);
	}

	FlatListRenderItem = ({ item }) => (
		<BucketProduct
			item={item}
			BrandImage={this.props.route.params.imageSource}
			DisplayImageView={this.DisplayImageView}
			navigateProduct={this.navigateProduct}
			navigateChat={this.navigateChat}
			navigateFabric={this.navigateFabric}
			navigateDesign={this.navigateDesign}
			RemoveProductFromCart={this.setStateForProductDelete}
		/>
	);

	navigateProduct = (ProductID) => {
		this.props.navigation.navigate('Product', { ProductID });
	};

	navigateDesign = (DesignID) => {
		this.props.navigation.navigate('DesignScreen', { DesignID });
	};

	navigateFabric = (FabricID) => {
		this.props.navigation.navigate('Fabric', { FabricID });
	};

	navigateCheckout = () => {
		if (!this.state.Loading) {
			if (this.props.ProfileCompleted) {
				this.props.navigation.navigate('CheckOut', {
					BucketID: this.props.route.params.BucketID,
					BrandName: this.props.route.params.BrandName,
					Status: this.state.Buckets[0].Status,
				});
			} else {
				this.props.navigation.navigate('EditProfile');
			}
		} else {
			this.setState({ showToast: true });
			this.Timeout = setTimeout(() => {
				this.setState({ showToast: false });
			}, 3000);
		}
	};

	DisplayImageView = (ImageURL) => {
		this.setState({
			ImageViewVisible: true,
			ImageViewImage: { uri: ImageURL },
		});
	};

	CloseImageView = () => {
		this.setState({ ImageViewVisible: false });
	};

	RemoveProductFromCart = () => {
		const NewBucket = this.state.Buckets.filter(
			(item) => !(item.CartID === this.state.CartIDForDeletion),
		);
		if (NewBucket.length) {
			this.setState({
				Buckets: NewBucket,
				DeleteModalVisible: !this.state.DeleteModalVisible,
			});
		} else {
			this.setState({
				DeleteModalVisible: !this.state.DeleteModalVisible,
			});
			this.props.navigation.goBack();
		}
		RemoveProductFromCart(
			this.state.CartIDForDeletion,
			this.props.AccessToken,
		).catch(console.log);
	};

	setDeleteModalVisible = () => {
		this.setState({
			DeleteModalVisible: !this.state.DeleteModalVisible,
		});
	};

	setStateForProductDelete = (CartID) => {
		this.setState({
			DeleteModalVisible: !this.state.DeleteModalVisible,
			CartIDForDeletion: CartID,
		});
	};

	navigateChat = () => {
		this.props.navigation.push('Chat', {
			BucketID: this.props.route.params.BucketID,
			Name: this.props.route.params.BrandName,
			Status: 0,
			BrandID: this.props.route.params.BrandID,
			OrderID: 0,
			imageSource: this.props.route.params.imageSource,
			initials: AvatarHelper.getInitials(
				this.props.route.params.BrandName,
			),
		});
	};

	Footer = ({ Status, OrderCreatedDifference }) => {
		switch (Status) {
			case 1:
				if (!OrderCreatedDifference) {
					return (
						<BottomButton
							ButtonB={'Checkout'}
							ButtonActionB={this.navigateCheckout}
						/>
					);
				}
				if (OrderCreatedDifference < 15) {
					return (
						<BottomButton
							ButtonB={'Payment Pending'}
							disabled={true}
							ButtonActionB={this.navigateCheckout}
						/>
					);
				}
				return (
					<BottomButton
						ButtonB={'Retry Payment'}
						ButtonActionB={this.navigateCheckout}
					/>
				);
			default:
				return <></>;
		}
	};

	render() {
		return (
			<>
				<NavBarBack
					Navigation={this.props.navigation.goBack}
					Title={this.props.route.params.BrandName}
				/>
				{this.state.Loading ? (
					<Loader />
				) : (
					<View flex>
						<FlatList
							ListFooterComponent={
								<View
									marginV-20
									paddingH-15
									center
									row
									style={styles.View}>
									<DeliveryIcon
										size={30}
										Color={Colors.black}
									/>
									<DeliveryChargeComponent
										TotalPrice={
											this.props.route.params.DecidedPrice
										}
									/>
								</View>
							}
							ListHeaderComponent={
								<View
									marginT-20
									paddingH-15
									center
									row
									style={styles.View}>
									<TimerIcon size={30} Color={Colors.black} />
									<Text marginL-10 h2>
										Delivery within 15 days!
									</Text>
								</View>
							}
							showsVerticalScrollIndicator={false}
							data={this.state.Buckets}
							keyExtractor={(item) =>
								item.CartID?.toString() ||
								'S' + item.SubOrderID?.toString()
							}
							renderItem={this.FlatListRenderItem}
						/>
						<this.Footer
							OrderCreatedDifference={
								this.state.Buckets[0].OrderCreatedDifference
							}
							Status={this.state.Buckets[0].Status}
						/>
					</View>
				)}
				<ImageView
					images={[this.state.ImageViewImage]}
					visible={this.state.ImageViewVisible}
					onRequestClose={this.CloseImageView}
					imageIndex={0}
				/>
				<PickerModal
					ActionItems={this.ActionSheetItems}
					modalVisible={this.state.DeleteModalVisible}
					setModalVisible={this.setDeleteModalVisible}
				/>
			</>
		);
	}
}

const styles = StyleSheet.create({
	View: {
		height: 50,
		width: Dimensions.get('window').width,
		backgroundColor: Colors.shadow,
	},
	Product: {
		backgroundColor: Colors.shadow,
		flex: 1,
	},
	Button: {
		height: 50,
		width: 'auto',
		backgroundColor: Colors.primary,
	},
});

const mapsStateToProps = (state) => ({
	AccessToken: state.Auth.AccessToken,
	ProfileCompleted: state.Profile.ProfileStatus === 2,
});

export default connect(mapsStateToProps)(Bucket);
