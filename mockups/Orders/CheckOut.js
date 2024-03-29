/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import {
	View,
	Text,
	TouchableOpacity,
	Toast,
	Button,
} from 'react-native-ui-lib';
import { connect } from 'react-redux';
import NavBarBack from '../../components/NavBarBack';
import Colors from '../../Style/Colors';
import CstmInput from '../../components/input';
import { CheckoutIcon } from '../../Icons/CheckoutIcon';
import { DeliveryIcon } from '../../Icons/Secondary/DeliveryIcon';
import DeliveryChargeComponent from '../../components/DeliveryChargeComponent';
import CheckoutAPI from '../../API/Cart/Checkout';
import FetchPartialBucket from '../../API/Cart/FetchPartialBucket';
import Loader from '../../components/Loader';
import { CommonActions } from '@react-navigation/native';
import config from '../../assets/constants';
import RazorpayCheckout from 'react-native-razorpay';
import IsAnyProductInCartAPI from '../../API/Profile/IsAnyProductInCart';
import { EditIcon } from '../../Icons/EditIcon';
import { CancelIcon } from '../../Icons/Cancel';
import { RightIcon } from '../../Icons/RightIcon';
import CstmShadowView from '../../components/CstmShadowView';
import ValidateCoupon from '../../API/Cart/ValidateCoupon';
import HandlePaymentResponse from '../../API/Cart/HandlePayment';
import HandleFailedPaymentResponse from '../../API/Cart/HandlePaymentFailed';
import RetryPayment from '../../API/Cart/RetryPayment';
import { EmailValidator } from 'commons-validator-js';
import FetchSubOrder from '../../API/Cart/FetchSubOrderChatToPlace';

class CheckOut extends React.PureComponent {
	/**
	 * @param {any} props
	 */
	constructor(props) {
		super(props);
		this.state = {
			Loading: true,
			Comment: '',
			Coupon: '',
			Name: this.props.Name,
			Address: this.props.Address,
			PinCode: this.props.PinCode,
			Mobile: this.props.Mobile,
			Email: this.props.Email,
			BackupDetails: {},
			BucketPrice: 0,
			TotalProducts: 0,
			FinalPrice: 0,
			EditAddress: false,
			Checkout: false,
			isCouponApplied: false,
			CouponMessage: '',
			ToastMessage: 'Oops! Something went wrong.',
			showCustomToast: false,
			CouponKey: Math.random().toString(),
		};
		// eslint-disable-next-line no-undef
		this.abortController = new AbortController();
		/** @type {number[]} */
		this.Timeouts = [];
	}

	componentDidMount = async () => {
		try {
			if (this.props.route.params.Status === 2) {
				await RetryPayment(
					this.props.route.params.BucketID,
					this.props.AccessToken,
					this.abortController.signal,
				);
			}
			let item;
			if (this.props.route.params.Status === -1) {
				item = await FetchSubOrder(
					this.props.route.params.SubOrderID,
					this.props.route.params.BucketID,
					this.props.AccessToken,
					this.abortController.signal,
				);
			} else {
				item = await FetchPartialBucket(
					this.props.route.params.BucketID,
					this.props.AccessToken,
					this.abortController.signal,
				);
			}

			// eslint-disable-next-line react/no-did-mount-set-state
			this.setState({
				BucketPrice: item.BucketPrice,
				FinalPrice: item.BucketPrice,
				TotalProducts: item.TotalProducts,
				Loading: false,
			});
		} catch (err) {
			console.log(err);
		}
	};

	CheckoutOnPress = async () => {
		this.setState({ Checkout: !this.state.Checkout });
		this.setState({ Loading: true });
		try {
			const { RazorPayOrderID, TotalAmount } = await CheckoutAPI(
				this.state.Address,
				this.state.PinCode,
				this.state.Comment,
				this.state.Name,
				this.state.Email,
				this.state.Mobile,
				this.state.isCouponApplied ? this.state.Coupon : undefined,
				this.props.route.params.BucketID,
				this.props.route.params.SubOrderID,
				this.props.AccessToken,
				this.abortController.signal,
			);

			IsAnyProductInCartAPI(this.props.AccessToken)
				.then(({ IsAnyProductInCart }) => {
					this.props.setIsAnyProductInCart(IsAnyProductInCart);
				})
				.catch(() => {});

			try {
				const RazorPayPaymentResp = await RazorpayCheckout.open({
					image: 'https://levyne.com/images/favicon.png',
					currency: 'INR',
					key: config.RazorPayKeyID, // Your api key
					amount: TotalAmount,
					name: 'Levyne',
					order_id: RazorPayOrderID,
					prefill: {
						email: this.props.Email,
						contact: this.props.Mobile,
						name: this.props.Name,
					},
					theme: {
						color: Colors.primary,
						backdrop_color: Colors.black,
					},
				});

				const { OrderID } = await HandlePaymentResponse(
					RazorPayOrderID,
					RazorPayPaymentResp.razorpay_payment_id,
					RazorPayPaymentResp.razorpay_order_id,
					RazorPayPaymentResp.razorpay_signature,
					this.abortController.signal,
				);

				this.setState({ Loading: false });
				this.props.navigation.dispatch(
					CommonActions.reset({
						routes: [
							{
								name: 'Auth',
								state: {
									routes: [{ name: 'Login' }],
								},
							},
							{
								name: 'MainHomeStack',
								state: {
									routes: [
										{ name: 'Home' },
										{
											name: 'MyOrders',
											params: {
												OrderID,
												PaymentSuccess: true,
											},
										},
									],
									index: 1,
								},
							},
						],
						index: 1,
					}),
				);
			} catch (err) {
				await HandleFailedPaymentResponse(
					RazorPayOrderID,
					this.props.route.params.BucketID,
					this.props.AccessToken,
					this.abortController.signal,
				);
				this.setState({ Loading: false });
				console.log(err);
				//Handle Payment Failure.
			}
		} catch (err) {
			this.setState({ Loading: false });
			console.log(err);
		}
	};

	componentWillUnmount() {
		this.abortController.abort();
		this.Timeouts.forEach(clearTimeout);
	}

	/**
	 * @param {string} Comment
	 */
	setComment = (Comment) => this.setState({ Comment });

	/**
	 * @param {string} Address
	 */
	setAddress = (Address) => {
		if (Address) {
			this.setState({ Address });
		} else {
			this.setState({ Address: this.props.Address });
		}
	};

	setName = (Name) => {
		if (Name) {
			this.setState({ Name });
		} else {
			this.setState({ Name: this.props.Name });
		}
	};

	setMobile = (Mobile) => {
		if (Mobile) {
			this.setState({ Mobile });
		} else {
			this.setState({ Mobile: this.props.Mobile });
		}
	};

	setEmail = (Email) => {
		if (Email) {
			this.setState({ Email });
		} else {
			this.setState({ Name: this.props.Email });
		}
	};

	/**
	 * @param {string} PinCode
	 */
	setPinCode = (PinCode) => {
		if (PinCode) {
			this.setState({ PinCode });
		} else {
			this.setState({ PinCode: this.props.PinCode });
		}
	};

	/**
	 * @param {string} Coupon
	 */
	setCoupon = (Coupon) => this.setState({ Coupon });

	removeCoupon = () => {
		this.setState({
			FinalPrice: this.state.BucketPrice,
			isCouponApplied: false,
			Loading: true,
			Coupon: '',
			CouponKey: Math.random().toString(),
		});
		this.Timeouts.push(
			setTimeout(() => {
				this.setState({
					Loading: false,
				});
			}, 1000),
		);
	};

	ApplyCoupon = async () => {
		if (this.state.Coupon && this.state.Coupon.length >= 5) {
			this.setState({
				Loading: true,
			});
			try {
				const CouponResp = await ValidateCoupon(
					this.state.Coupon,
					this.props.route.params.BucketID,
					this.props.AccessToken,
					this.abortController.signal,
				);
				if (CouponResp.PercentageDiscount) {
					this.setState({
						FinalPrice:
							this.state.BucketPrice -
							Math.min(
								CouponResp.MaxDiscount,
								(this.state.BucketPrice *
									CouponResp.PercentageDiscount) /
									100,
							),
						CouponMessage: CouponResp.Message,
						isCouponApplied: true,
						Loading: false,
					});
				} else {
					this.setState({
						FinalPrice:
							this.state.BucketPrice - CouponResp.MaxDiscount,
						CouponMessage: CouponResp.Message,
						isCouponApplied: true,
						Loading: false,
					});
				}
			} catch (err) {
				if (err.Status) {
					if (err.Status === 406 || err.Status === 400) {
						this.setState({
							Loading: false,
							showCustomToast: true,
							ToastMessage: err.Error.description,
						});
						this.Timeouts.push(
							setTimeout(() => {
								this.setState({ showCustomToast: false });
							}, 3000),
						);
					} else {
						this.setState({
							Loading: false,
							showCustomToast: true,
							ToastMessage: 'Something went wrong from our end.',
						});
						this.Timeouts.push(
							setTimeout(() => {
								this.setState({ showCustomToast: false });
							}, 3000),
						);
					}
				}
			}
		} else {
			this.setState({
				Loading: false,
				showCustomToast: true,
				ToastMessage: 'Not a valid coupon code.',
			});
			this.Timeouts.push(
				setTimeout(() => {
					this.setState({ showCustomToast: false });
				}, 3000),
			);
		}
	};

	setEditAddress = () => {
		if (!this.state.EditAddress) {
			this.setState({
				EditAddress: !this.state.EditAddress,
				Name: '',
				Email: '',
				Address: '',
				PinCode: '',
				Mobile: '',
				BackupDetails: {
					Name: this.state.Name,
					Email: this.state.Email,
					Address: this.state.Address,
					PinCode: this.state.PinCode,
					Mobile: this.state.Mobile,
				},
			});
		} else {
			this.setState({
				EditAddress: !this.state.EditAddress,
				...this.state.BackupDetails,
			});
		}
	};

	SubmitEditAddress = () => {
		this.Timeouts.push(
			setTimeout(() => this.setState({ showCustomToast: false }), 3000),
		);

		if (!this.state.Name) {
			return this.setState({
				showCustomToast: true,
				ToastMessage: 'Please Enter a valid Name',
			});
		}

		if (this.state.Address.length < 5) {
			return this.setState({
				showCustomToast: true,
				ToastMessage: 'Please Enter a valid Address',
			});
		}

		if (this.state.PinCode.length !== 6) {
			return this.setState({
				showCustomToast: true,
				ToastMessage: 'Please Enter a valid PinCode',
			});
		}

		if (this.state.Mobile.length !== 10) {
			return this.setState({
				showCustomToast: true,
				ToastMessage: 'Please Enter a valid Mobile Number',
			});
		}

		if (this.state.Email) {
			if (
				!new EmailValidator({
					allowLocal: true,
					allowTld: true,
				}).isValid(this.state.Email)
			) {
				return this.setState({
					showCustomToast: true,
					ToastMessage: 'Please Enter a valid Email Address',
				});
			}
		}

		this.setState({ EditAddress: false });
	};

	setCheckout = () => {
		this.setState({ Checkout: !this.state.Checkout });
	};

	render() {
		return (
			<>
				<NavBarBack
					Navigation={this.props.navigation.goBack}
					Title={this.props.route.params.BrandName}
				/>

				<Toast
					visible={this.state.showCustomToast}
					position={'bottom'}
					backgroundColor={Colors.primary}>
					<View
						flex
						padding-10
						style={{ backgroundColor: undefined }}>
						<Text center white h1>
							{this.state.ToastMessage}
						</Text>
					</View>
				</Toast>

				{this.state.Loading ? (
					<Loader />
				) : (
					<SafeAreaView style={{ flex: 1 }}>
						<ScrollView
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{
								backgroundColor: Colors.white,
							}}>
							<View paddingH-10 centerV style={styles.View}>
								<View row>
									<Text flex hb1 secondary>
										Item Total
									</Text>
									<View centerV row>
										<Text hb1 primary>
											₹{this.state.BucketPrice}
										</Text>
									</View>
								</View>

								<View marginT-20 row>
									<Text hb1 flex secondary>
										Number of Products
									</Text>
									<Text hb1 primary>
										{this.state.TotalProducts}
									</Text>
								</View>

								<View marginT-20 row>
									<Text flex hb1 secondary>
										Gross Total
									</Text>
									<View centerV row>
										<Text hb1 primary>
											₹{this.state.FinalPrice}
										</Text>
									</View>
								</View>
							</View>

							<View
								marginT-20
								paddingH-15
								center
								row
								style={styles.view}>
								<DeliveryIcon size={30} Color={Colors.black} />
								<DeliveryChargeComponent
									TotalPrice={this.state.BucketPrice}
								/>
							</View>
							<View style={styles.View} marginT-20>
								<View row>
									<Text flex hb1 secondary>
										Shipping Details
									</Text>
									{!this.state.EditAddress ? (
										<TouchableOpacity
											flex
											right
											onPress={this.setEditAddress}>
											<EditIcon
												size={22}
												Color={Colors.secondary}
											/>
										</TouchableOpacity>
									) : (
										<TouchableOpacity
											flex
											right
											onPress={this.setEditAddress}>
											{this.state.Address &&
											this.state.PinCode ? (
												<RightIcon
													size={22}
													Color={Colors.secondary}
												/>
											) : (
												<CancelIcon
													size={22}
													Color={Colors.secondary}
												/>
											)}
										</TouchableOpacity>
									)}
								</View>
								<View marginT-20>
									{this.state.EditAddress ? (
										<>
											<CstmInput
												placeholder="Name"
												value={this.state.Name}
												onChangeText={this.setName}
											/>
											<CstmInput
												style={{
													height: 100,
													borderRadius: 15,
												}}
												placeholder="Address"
												value={this.state.Address}
												onChangeText={this.setAddress}
											/>
											<CstmInput
												placeholder="Pin code"
												value={this.state.PinCode}
												onChangeText={this.setPinCode}
											/>
											<CstmInput
												placeholder="Mobile Number"
												value={this.state.Mobile}
												onChangeText={this.setMobile}
											/>
											<CstmInput
												placeholder="Email Address (Optional)"
												value={this.state.Email}
												onChangeText={this.setEmail}
											/>
											<CstmShadowView
												style={{ marginTop: 30 }}>
												<Button
													hb2
													flex
													onPress={
														this.SubmitEditAddress
													}
													label="Save"
												/>
											</CstmShadowView>
										</>
									) : (
										<>
											<Text h1 secondary>
												{this.state.Name}
											</Text>
											<Text h1 secondary>
												{this.state.Address}
											</Text>
											<Text h1 secondary>
												{this.state.PinCode}
											</Text>
										</>
									)}
								</View>
							</View>

							{this.props.route.params.Status !== -1 ? (
								<View style={styles.View} marginT-20>
									<Text hb1 secondary>
										Coupon Code (Optional)
									</Text>
									<View marginT-20 row center>
										<CstmInput
											placeholder="Happy Discounting"
											value={this.state.Coupon}
											key={this.state.CouponKey}
											style={{
												borderRadius: 10,
												flex: 4,
											}}
											onChangeText={this.setCoupon}
										/>
										<CstmShadowView
											style={{
												height: 50,
												width: 50,
												flex: 1,
												marginLeft: 20,
											}}>
											<TouchableOpacity
												onPress={this.ApplyCoupon}
												flex
												center
												style={{ borderRadius: 50 }}>
												<RightIcon
													size={22}
													Color={Colors.secondary}
												/>
											</TouchableOpacity>
										</CstmShadowView>
									</View>
									{this.state.isCouponApplied ? (
										<>
											<Text h3 secondary marginV-10>
												{this.state.CouponMessage}
											</Text>
											<TouchableOpacity
												onPress={this.removeCoupon}>
												<Text h3 primary>
													Remove Code
												</Text>
											</TouchableOpacity>
										</>
									) : (
										<></>
									)}
								</View>
							) : (
								<></>
							)}

							<View style={styles.View} marginT-20>
								<Text hb1 secondary>
									Comment (Optional)
								</Text>
								<View marginT-20>
									<CstmInput
										style={{
											height: 100,
											borderRadius: 15,
										}}
										placeholder="Comment"
										value={this.state.Comment}
										onChangeText={this.setComment}
									/>
								</View>
							</View>
						</ScrollView>
						<TouchableOpacity
							onPress={this.CheckoutOnPress}
							center
							row
							style={styles.Button}
							activeOpacity={0.8}>
							<CheckoutIcon size={26} Color={Colors.white} />
							<Text marginL-20 hb1 white>
								Place an Order
							</Text>
						</TouchableOpacity>
					</SafeAreaView>
				)}
			</>
		);
	}
}

const styles = StyleSheet.create({
	View: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.shadow,
		padding: 10,
		paddingVertical: 20,
		margin: 10,
	},
	Product: {
		backgroundColor: Colors.shadow,
		flex: 1,
	},
	Button: {
		height: 50,
		width: Dimensions.get('window').width,
		backgroundColor: Colors.primary,
	},
	view: {
		height: 50,
		width: Dimensions.get('window').width,
		backgroundColor: Colors.shadow,
	},
});

/**
 * @param {{ Auth: { AccessToken: any; Mobile: any; }; Profile: { Address: any; Name: any; Email: any; PinCode: any; }; }} state
 */
const mapsStateToProps = (state) => ({
	AccessToken: state.Auth.AccessToken,
	Address: state.Profile.Address,
	Name: state.Profile.Name,
	Email: state.Profile.Email,
	PinCode: state.Profile.PinCode,
	Mobile: state.Auth.Mobile,
});

/**
 * @param {(arg0: { type: string; value: any; }) => any} dispatch
 */
const mapDispatchToProps = (dispatch) => {
	return {
		setIsAnyProductInCart: (value) =>
			dispatch({ type: 'setIsAnyProductInCart', value }),
	};
};

export default connect(mapsStateToProps, mapDispatchToProps)(CheckOut);
