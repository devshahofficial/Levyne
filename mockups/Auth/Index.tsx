import React, { Dispatch } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import Logo from '../../assets/images/Logo.svg';
import AuthCheck, {
	setAuthType,
	setProfileType,
	setSocketType,
	setChatListType,
	MarkBucketAsUnReadType,
	setIsAnyProductInCartType,
	AuthObjectType,
	ProfileObjectType,
} from '../../API/Auth/index';
import { connect } from 'react-redux';
import { Colors, AvatarHelper } from 'react-native-ui-lib';
import { CommonActions } from '@react-navigation/native';
import HandleShareURL from '../../API/Home/HandleShareURL';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../Types/navigation';
import { Socket as SocketType } from 'socket.io-client';
import { ChatItemType } from '../../Redux/ReduxStore';

interface IndexProps {
	setAuth: setAuthType;
	setProfile: setProfileType;
	setSocket: setSocketType;
	setChatList: setChatListType;
	MarkBucketAsUnRead: MarkBucketAsUnReadType;
	setIsAnyProductInCart: setIsAnyProductInCartType;
	navigation: StackNavigationProp<AuthStackParamList, 'Index'>;
}

class IndexScreen extends React.Component<IndexProps> {
	componentDidMount() {
		const {
			setAuth,
			setProfile,
			setSocket,
			setChatList,
			MarkBucketAsUnRead,
			setIsAnyProductInCart,
		} = this.props;

		AuthCheck(
			setAuth,
			setProfile,
			setSocket,
			setChatList,
			MarkBucketAsUnRead,
			setIsAnyProductInCart,
		)
			.then((NavigateScreen) => {
				if (global.NotificationObject) {
					if (global.NotificationObject.BucketID) {
						this.props.navigation.dispatch(
							CommonActions.reset({
								index: 1,
								routes: [
									{
										name: 'Auth',
										state: {
											routes: [{ name: 'Login' }],
											index: 1,
										},
									},
									{
										name: 'MainHomeStack',
										state: {
											routes: [
												{ name: 'Home' },
												{
													name: 'Chat',
													params: {
														// @ts-ignore
														BucketID:
															global
																.NotificationObject
																.BucketID,
														// @ts-ignore
														Name:
															global
																.NotificationObject
																.Name,
														// @ts-ignore
														Status:
															global
																.NotificationObject
																.Status,
														// @ts-ignore
														BrandID:
															global
																.NotificationObject
																.BrandID,
														imageSource: null,
														// @ts-ignore
														initials: AvatarHelper.getInitials(
															global
																.NotificationObject
																.Name,
														),
													},
												},
											],
											index: 1,
										},
									},
								],
							}),
						);
					} else {
						Linking.getInitialURL()
							.then((url) =>
								this.HandleLinkingInitialURL(
									url,
									NavigateScreen,
								),
							)
							.catch(() => {});
					}

					// @ts-ignore
					delete global.NotificationObject;
					//return;
				} else {
					Linking.getInitialURL()
						.then((url) =>
							this.HandleLinkingInitialURL(url, NavigateScreen),
						)
						.catch(() => {});
				}
			})
			.catch((err) => {
				console.log(err);
				this.props.navigation.navigate('Login');
			});
	}

	handleOpenURL = ({ url }: { url: string | null }) => {
		if (!url) {
			return false;
		}

		url = url.toLowerCase();

		const ScreenIDs = {
			p: 1,
			P: 1,
			f: 2,
			F: 2,
			d: 3,
			D: 3,
			m: 4,
			M: 4,
			B: 5,
			b: 5,
		};

		if (url.includes('https://collections.levyne.com/')) {
			const Paths: (keyof typeof ScreenIDs)[] = url
				.replace('https://collections.levyne.com', '')
				.split('/') as (keyof typeof ScreenIDs)[];

			if (Paths[1] in ScreenIDs) {
				if (Paths.length === 3) {
					HandleShareURL(
						ScreenIDs[Paths[1]] as 1 | 2 | 3 | 4 | 5,
						parseInt(Paths[2], 10),
						this.props.navigation,
					);
					return true;
					// @ts-ignore
				} else if (ScreenIDs[Paths[1]] === 4 && Paths.length === 4) {
					// @ts-ignore
					HandleShareURL(
						ScreenIDs[Paths[1]] as 1 | 2 | 3 | 4 | 5,
						Paths[3],
						this.props.navigation,
						Paths[2],
					);
					return true;
				}
			}
		} else if (url.includes('levyne://collections/')) {
			const Paths: (keyof typeof ScreenIDs)[] = url
				.replace('levyne://collections', '')
				.split('/') as (keyof typeof ScreenIDs)[];

			if (Paths[1] in ScreenIDs) {
				if (Paths.length === 3) {
					// @ts-ignore
					HandleShareURL(
						ScreenIDs[Paths[1]] as 1 | 2 | 3 | 4 | 5,
						parseInt(Paths[2], 10),
						this.props.navigation,
					);
					return true;
					// @ts-ignore
				} else if (ScreenIDs[Paths[1]] === 4 && Paths.length === 4) {
					// @ts-ignore
					HandleShareURL(
						ScreenIDs[Paths[1]] as 1 | 2 | 3 | 4 | 5,
						Paths[3],
						this.props.navigation,
						Paths[2],
					);
					return true;
				}
			}
		}
		return false;
	};

	HandleLinkingInitialURL = (
		url: string | null,
		NavigateScreen: 'MainHomeStack' | string,
	) => {
		if (!this.handleOpenURL({ url })) {
			if (NavigateScreen === 'MainHomeStack') {
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
							},
						],
						index: 1,
					}),
				);
			} else {
				this.props.navigation.dispatch(
					CommonActions.reset({
						routes: [
							{
								name: NavigateScreen,
							},
						],
					}),
				);
			}
		}
	};

	render() {
		return (
			<>
				<View style={styles.container}>
					<Logo width="60%" />
				</View>
			</>
		);
	}
}

const mapDispatchToProps = (
	dispatch: Dispatch<{
		type: string;
		value:
			| AuthObjectType
			| ProfileObjectType
			| SocketType
			| ChatItemType[]
			| number
			| number[]
			| boolean;
	}>,
) => {
	return {
		setAuth: (AuthObject: AuthObjectType) =>
			dispatch({ type: 'setAuth', value: AuthObject }),

		setProfile: (ProfileObject: ProfileObjectType) =>
			dispatch({ type: 'setProfile', value: ProfileObject }),

		setSocket: (Socket: SocketType) =>
			dispatch({ type: 'setSocket', value: Socket }),

		setChatList: (ChatList: ChatItemType[]) =>
			dispatch({ type: 'setChatList', value: ChatList }),

		MarkBucketAsUnRead: (Buckets: number | number[]) =>
			dispatch({ type: 'MarkBucketAsUnRead', value: Buckets }),

		setIsAnyProductInCart: (value: boolean) =>
			dispatch({ type: 'setIsAnyProductInCart', value }),
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.white,
	},
	logo: {
		width: '100%',
	},
});

export default connect(null, mapDispatchToProps)(IndexScreen);
