/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Colors,
	Text,
	View,
	LoaderScreen,
	TouchableOpacity,
	Modal,
} from 'react-native-ui-lib';
import { SafeAreaView, StyleSheet, FlatList, Dimensions } from 'react-native';
import ChatHeader from '../../components/ChatHeader';
import ChatInputBar from '../../components/ChatInputBar';
import GetChatMessage, {
	BucketInfo,
	ChatMessage,
} from '../../API/Chats/GetChatMessage';
import CstmShadowView from '../../components/CstmShadowView';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
import { GalleryIcon } from '../../Icons/GalleryIcon';
import { CameraIcon } from '../../Icons/CameraIcon';
import UpdateReadTimestamp from '../../API/Chats/UpdateReadTimestamp';
import KeyboardAvoidingViewCstm from '../../components/KeyboardAvoidingViewCstm';
import MilestonePaymentDetails from '../../components/ChatComponents/MilestonePaymentDetails';
import MilestonePaymentCompleted from '../../components/ChatComponents/MilestonePaymentCompleted';
import {
	CenterText,
	LeftImage,
	LeftText,
	RightImage,
	RightText,
} from '../../components/ChatComponents/OtherChatMessages';
import RazorpayCheckout from 'react-native-razorpay';
import config from '../../assets/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';
import { HomeStackParamList } from '../../Types/navigation';
import { Socket } from 'socket.io-client';
import { ChatItemType } from '../../Redux/ReduxStore';
import { ImageSource } from 'react-native-image-viewing/dist/@types';
const windowHeight = Dimensions.get('window').height;

/**
 * Status
 *      -1: Waiting for final budget.
 *      2: Order Placed, Order Status available
 *
 * Order Status
 *      0: Order just placed
 *      1: Production started
 *      2: Production Finished
 *      3: Out for delivery
 *      4: Order delivered
 *      5: Order opted for alteration
 *      6: Order fully completed
 *
 **/

interface ChatScreenProps {
	navigation: StackNavigationProp<HomeStackParamList, 'Chat'>;
	route: RouteProp<HomeStackParamList, 'Chat'>;
	AccessToken: string;
	Socket: Socket | null;
	ChatList: ChatItemType[];
	setChatList: (ChatList: ChatItemType[]) => void;
	Email: string;
	Mobile: number;
	Name: string;
	UserID: number;
}

interface ChatScreenState {
	Messages: ChatMessage[];
	LoadingMessages: boolean;
	ImageToDisplay: ImageSource;
	ModalVisible: boolean;
	ImagePickerModalVisible: boolean;
	TextInput: string;
	TextInputKey: string;
	ImageSent: { [key: string]: boolean };
	BucketInfo: BucketInfo;
}

class ChatScreen extends Component<ChatScreenProps, ChatScreenState> {
	Page: number;
	FlatListRef: React.RefObject<FlatList>;
	TimeOutArray: NodeJS.Timeout[];
	NewChatLoading: boolean;
	abortController: AbortController;

	constructor(props: ChatScreenProps) {
		super(props);
		this.state = {
			Messages: [],
			LoadingMessages: true,
			ImageToDisplay: {},
			ModalVisible: false,
			ImagePickerModalVisible: false,
			TextInput: this.props.route.params.Message
				? this.props.route.params.Message
				: '',
			TextInputKey: Math.random().toString(),
			ImageSent: {},
			BucketInfo: {},
		};
		this.Page = 0;
		this.FlatListRef = React.createRef();
		this.props.Socket?.on('ChatMessage', this.SocketListener);
		this.TimeOutArray = [];
		this.NewChatLoading = true;
		// eslint-disable-next-line no-undef
		this.abortController = new AbortController();
	}

	SocketListener = (Message: ChatMessage) => {
		if (Message.BucketID === this.props.route.params.BucketID) {
			this.state.Messages.unshift({
				...Message,
				BucketMessagesID: Math.random(),
				Timestamp: 'now',
			});

			this.setState({ Messages: this.state.Messages });
		}
	};

	componentDidMount = () => {
		GetChatMessage(
			this.props.route.params.BucketID,
			++this.Page,
			this.props.AccessToken,
			this.abortController.signal,
		)
			.then((Resp) => {
				this.setState({
					Messages: Resp.Messages,
					BucketInfo: Resp.BucketInfo,
					LoadingMessages: false,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	componentWillUnmount = () => {
		this.props.Socket?.off('ChatMessage', this.SocketListener);
		this.abortController.abort();
		UpdateReadTimestamp(
			this.props.route.params.BucketID,
			this.props.AccessToken,
		).catch((err) => console.log(err));
		this.TimeOutArray.forEach((item) => {
			clearTimeout(item);
		});
	};

	ChatOnEndReached = () => {
		if (this.NewChatLoading) {
			this.NewChatLoading = false;
			GetChatMessage(
				this.props.route.params.BucketID,
				++this.Page,
				this.props.AccessToken,
			)
				.then((Resp) => {
					if (Resp.Messages.length) {
						this.setState({
							Messages: [
								...this.state.Messages,
								...Resp.Messages,
							],
						});
						this.NewChatLoading = true;
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	NavigateBack = () => {
		this.props.navigation.goBack();
	};

	NavigateBrandProfile = () => {
		this.props.navigation.push('BrandProfile', {
			BrandID: this.props.route.params.BrandID,
		});
	};

	NavigateBucket = () => {
		if (this.props.route.params.ItemCount) {
			if (this.state.BucketInfo.OrderID) {
				this.props.navigation.push('MyOrders', {
					OrderID: this.state.BucketInfo.OrderID,
				});
			} else {
				this.props.navigation.push('Bucket', {
					BucketID: this.props.route.params.BucketID,
					BrandID: this.props.route.params.BrandID,
					BrandName: this.props.route.params.Name,
					imageSource: this.props.route.params.imageSource,
				});
			}
		}
	};

	PayMilestonePayment = async (
		Price: number | undefined,
		RazorpayOrderID?: string,
		SubOrderID?: number,
	) => {
		if (this.props.route.params.Status === -1) {
			this.props.navigation.navigate('CheckOut', {
				Status: this.props.route.params.Status,
				SubOrderID: SubOrderID,
				BrandName: this.props.route.params.Name,
				BucketID: this.props.route.params.BucketID,
			});
		} else if (Price && RazorpayOrderID) {
			try {
				const RazorPayPaymentResp = await RazorpayCheckout.open({
					image: 'https://levyne.com/images/favicon.png',
					currency: 'INR',
					key: config.RazorPayKeyID, // Your api key
					amount: Price * 100,
					name: 'Levyne',
					order_id: RazorpayOrderID,
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
				if (
					RazorPayPaymentResp &&
					RazorPayPaymentResp.razorpay_payment_id
				) {
					this.state.Messages.forEach((item) => {
						if (item.RazorpayOrderID === RazorpayOrderID) {
							item.PaymentTimestamp = new Date().toISOString();
						}
					});

					this.state.Messages.unshift({
						Type: 6,
						isSentByCustomer: 1,
						Price: Price,
						BucketMessagesID: Math.random().toString(),
						Timestamp: 'now',
					});

					this.setState({ Messages: [...this.state.Messages] });
				}
			} catch (err) {}
		}
	};

	CloseModal = () => {
		this.setState({ ModalVisible: false });
	};

	keyExtractor = (item: { BucketMessagesID: { toString: () => any } }) =>
		item.BucketMessagesID.toString();

	handleImagePicker = (response: Image) => {
		this.ImagePickerModalSwitchVisibility();

		const BucketMessagesID = Math.random().toString();

		this.state.ImageSent[BucketMessagesID] = false;

		this.setState({
			ImageSent: this.state.ImageSent,
		});

		this.state.Messages.unshift({
			Type: 2,
			isSentByCustomer: 1,
			ImageURL: `data:${response.mime};base64,${response.data}`,
			BucketMessagesID,
			Timestamp: 'now',
		});

		this.setState({ Messages: this.state.Messages });

		this.props.Socket?.emit(
			'SendMessage',
			{
				BucketID: this.props.route.params.BucketID,
				BrandID: this.props.route.params.BrandID,
				CustomerID: this.props.UserID,
				Type: 2,
				Base64Image: `data:${response.mime};base64,${response.data}`,
			},
			() => {
				if (this.state && this.state.Messages) {
					this.state.ImageSent[BucketMessagesID] = true;
					this.setState({
						ImageSent: this.state.ImageSent,
					});
				}
			},
		);

		this.ImageSendVerify(BucketMessagesID);
	};

	ImageSendVerify = (BucketMessagesID: string) => {
		this.TimeOutArray.push(
			setTimeout(() => {
				if (this.state && this.state.Messages) {
					if (!this.state.ImageSent[BucketMessagesID]) {
						console.log(BucketMessagesID, 'Image Not Sent');
					}
				}
			}, 60000),
		);
	};

	ShowGallery = async () => {
		ImagePicker.openPicker({
			width: 500,
			height: 500,
			cropping: true,
			mediaType: 'photo',
			includeBase64: true,
			writeTempFile: false,
			forceJpg: true,
		})
			.then(this.handleImagePicker)
			.catch(() => {});
	};

	ShowCamera = async () => {
		ImagePicker.openCamera({
			width: 500,
			height: 500,
			cropping: true,
			mediaType: 'photo',
			includeBase64: true,
			writeTempFile: false,
			forceJpg: true,
		})
			.then(this.handleImagePicker)
			.catch(() => {});
	};

	SendMessage = () => {
		if (this.state.TextInput) {
			this.props.Socket?.emit('SendMessage', {
				BucketID: this.props.route.params.BucketID,
				BrandID: this.props.route.params.BrandID,
				CustomerID: this.props.UserID,
				Type: 1,
				Text: this.state.TextInput,
			});

			this.state.Messages.unshift({
				Type: 1,
				isSentByCustomer: 1,
				Text: this.state.TextInput,
				BucketMessagesID: Math.random(),
				Timestamp: 'now',
			});

			this.setState({ Messages: this.state.Messages });

			this.EmptyTextInput();
		}
	};

	ImagePickerModalSwitchVisibility = () => {
		this.setState({
			ImagePickerModalVisible: !this.state.ImagePickerModalVisible,
		});
	};

	onChangeTextInput = (TextInput: any) => {
		this.setState({ TextInput });
	};

	EmptyTextInput = () => {
		this.setState({
			TextInput: '',
			TextInputKey: Math.random().toString(),
		});
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingViewCstm
					behavior={'padding'}
					style={{ flex: 1 }}
					keyboardVerticalOffset={35}>
					<ImageView
						images={[this.state.ImageToDisplay]}
						imageIndex={0}
						visible={this.state.ModalVisible}
						onRequestClose={this.CloseModal}
					/>
					<Modal
						animationType="slide"
						transparent={true}
						visible={this.state.ImagePickerModalVisible}>
						<CstmShadowView style={styles.Modal}>
							<View flex row centerV marginT-10>
								<Text flex-9 h1 secondary center>
									Choose Medium to Upload:
								</Text>
								<TouchableOpacity
									flex
									onPress={
										this.ImagePickerModalSwitchVisibility
									}>
									<Text primary hb1>
										X
									</Text>
								</TouchableOpacity>
							</View>
							<View row flex-5 marginH-30>
								<TouchableOpacity
									flex
									center
									onPress={this.ShowGallery}>
									<GalleryIcon
										size={28}
										Color={Colors.primary}
									/>
									<Text h3 secondary marginT-10>
										Gallery
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									flex
									center
									onPress={this.ShowCamera}>
									<CameraIcon
										size={32}
										Color={Colors.primary}
									/>
									<Text h3 secondary marginT-10>
										Camera
									</Text>
								</TouchableOpacity>
							</View>
						</CstmShadowView>
					</Modal>

					<ChatHeader
						{...this.props.route.params}
						BucketInfo={this.state.BucketInfo}
						NavigateBack={this.NavigateBack}
						NavigateBrandProfile={this.NavigateBrandProfile}
						NavigateBucket={this.NavigateBucket}
					/>

					{this.state.LoadingMessages ? (
						<LoaderScreen />
					) : (
						<FlatList
							data={this.state.Messages}
							inverted={true}
							renderItem={({ item }) => {
								switch (item.Type) {
									case 1:
										return item.isSentByCustomer ? (
											<RightText
												TextInput={item.Text}
												Timestamp={item.Timestamp}
											/>
										) : (
											<LeftText
												TextInput={item.Text}
												Timestamp={item.Timestamp}
											/>
										);
									case 2:
										return item.isSentByCustomer ? (
											<RightImage
												Source={{ uri: item.ImageURL }}
												Timestamp={item.Timestamp}
												onPress={() => {
													this.setState({
														ImageToDisplay: {
															uri: item.ImageURL,
														},
														ModalVisible: true,
													});
												}}
											/>
										) : (
											<LeftImage
												Source={{ uri: item.ImageURL }}
												Timestamp={item.Timestamp}
												onPress={() => {
													this.setState({
														ImageToDisplay: {
															uri: item.ImageURL,
														},
														ModalVisible: true,
													});
												}}
											/>
										);
									case 3:
										return (
											<CenterText
												TextInput={
													'You placed an order'
												}
											/>
										);
									case 4:
										return (
											<CenterText
												TextInput={
													'You cancelled an order'
												}
											/>
										);
									case 5:
										if (item.Price && item.Note) {
											return (
												<MilestonePaymentDetails
													Price={item.Price}
													Note={item.Note}
													PaymentTimestamp={
														item.PaymentTimestamp
													}
													onPress={() =>
														this.PayMilestonePayment(
															item.Price,
															item.RazorpayOrderID,
															item.SubOrderID,
														)
													}
												/>
											);
										}
										return <></>;
									case 6:
										return (
											<MilestonePaymentCompleted
												Price={item.Price}
											/>
										);
									default:
										return <></>;
								}
							}}
							keyExtractor={this.keyExtractor}
							onEndReached={this.ChatOnEndReached}
						/>
					)}
					<ChatInputBar
						DisplayImagePicker={
							this.ImagePickerModalSwitchVisibility
						}
						SendMessage={this.SendMessage}
						value={this.state.TextInput}
						onChangeText={this.onChangeTextInput}
						TextInputKey={this.state.TextInputKey}
					/>
				</KeyboardAvoidingViewCstm>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	SafeAreaViewCenter: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	Modal: {
		flex: 0.3,
		borderRadius: 20,
		marginHorizontal: 30,
		paddingTop: 0,
		marginTop: windowHeight / 2.5,
	},
});

const mapsStateToProps = (state: {
	Auth: { AccessToken: string; UserID: number; Mobile: number };
	Socket: { Socket: Socket };
	Chat: { ChatList: ChatItemType[] };
	Profile: { Name: string; Email: string };
}) => ({
	AccessToken: state.Auth.AccessToken,
	Socket: state.Socket.Socket,
	UserID: state.Auth.UserID,
	ChatList: state.Chat.ChatList,
	Name: state.Profile.Name,
	Email: state.Profile.Email,
	Mobile: state.Auth.Mobile,
});

const mapDispatchToProps = (
	dispatch: (arg0: { type: string; value: any }) => any,
) => {
	return {
		setChatList: (ChatList: any) =>
			dispatch({ type: 'setChatList', value: ChatList }),
	};
};

export default connect(mapsStateToProps, mapDispatchToProps)(ChatScreen);
