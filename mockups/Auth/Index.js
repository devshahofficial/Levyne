import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import Logo from '../../assets/images/Logo.svg';
import AuthCheck from '../../API/Auth/index';
import { connect } from 'react-redux';
import { Colors, AvatarHelper } from 'react-native-ui-lib';
import { CommonActions } from '@react-navigation/native';
import HandleShareURL from '../../API/Home/HandleShareURL';

class IndexScreen extends React.Component {

	componentDidMount() {
		const { setAuth, setProfile, setSocket, setChatList, MarkBucketAsUnRead, setIsAnyProductInCart } = this.props;


		AuthCheck(setAuth, setProfile, setSocket, setChatList, MarkBucketAsUnRead, setIsAnyProductInCart).then(NavigateScreen => {

			// @ts-ignore
			if(global.NotificationObject) {
				
				// @ts-ignore
				if(global.NotificationObject.BucketID) {
					this.props.navigation.dispatch(
						CommonActions.reset({
							index: 1,
							routes: [
								{
									name: 'Auth',
									state: {
										routes: [
											{ name: 'Login' }
										],
										index: 1,
									}
								},
								{
									name: 'MainHomeStack',
									state: {
										routes: [
											{ name: 'Home' },
											{ name: 'Chat', params: {
                                                // @ts-ignore
                                                BucketID : global.NotificationObject.BucketID,
                                                // @ts-ignore
                                                Name : global.NotificationObject.Name,
                                                // @ts-ignore
                                                Status: global.NotificationObject.Status,
                                                // @ts-ignore
                                                BrandID: global.NotificationObject.BrandID,
                                                imageSource: null,
                                                // @ts-ignore
                                                initials: AvatarHelper.getInitials(global.NotificationObject.Name)
                                            } },
										],
										index: 1,
									}
								},
							]
						})
					);
				} else {
					Linking.getInitialURL().then(url => this.HandleLinkingInitialURL(url, NavigateScreen)).catch(() => { });
				}

				// @ts-ignore
				delete global.NotificationObject;
				//return;
			} else {
				Linking.getInitialURL().then(url => this.HandleLinkingInitialURL(url, NavigateScreen)).catch(() => { });
			}

		}).catch((err) => {
			console.log(err);
			this.props.navigation.navigate('Login');
		});

	}

	/**
	 * 
	 * @param {{url: string | null}} urlObject 
	 */
	handleOpenURL = ({ url }) => {
		if(!url) return false;
		url = url.toLowerCase();

		const ScreenIDs = {
			'p': 1,
			'P': 1,
			'f': 2,
			'F': 2,
			'd': 3,
			'D': 3,
			'm': 4,
			'M': 4,
			'B': 5,
			'b': 5
		}

		if (url.includes('https://collections.levyne.com/')) {

            const Paths = url.replace('https://collections.levyne.com', '').split('/');
			if(Paths[1] in ScreenIDs) {
				if (Paths.length === 3) {
					// @ts-ignore
					HandleShareURL(ScreenIDs[Paths[1]], parseInt(Paths[2]), this.props.navigation);
					return true;
				// @ts-ignore
				} else if(ScreenIDs[Paths[1]] === 4 && Paths.length === 4) {
					// @ts-ignore
					HandleShareURL(ScreenIDs[Paths[1]], Paths[3], this.props.navigation, Paths[2]);
					return true;
				}
			}
		} else if(url.includes('levyne://collections/')) {
			const Paths = url.replace('levyne://collections', '').split('/');
			if(Paths[1] in ScreenIDs) {
				if (Paths.length === 3) {
					// @ts-ignore
					HandleShareURL(ScreenIDs[Paths[1]], parseInt(Paths[2]), this.props.navigation);
					return true;
				// @ts-ignore
				} else if(ScreenIDs[Paths[1]] === 4 && Paths.length === 4) {
					// @ts-ignore
					HandleShareURL(ScreenIDs[Paths[1]], Paths[3], this.props.navigation, Paths[2]);
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * @param {?string} url
	 * @param {string} NavigateScreen
	 */
	HandleLinkingInitialURL = (url, NavigateScreen) => {

		
		if (!this.handleOpenURL({ url })) {
			if (NavigateScreen === 'MainHomeStack') {

				this.props.navigation.dispatch(
					CommonActions.reset({
						routes: [
							{
								name: 'Auth',
								state: {
									routes: [
										{ name: 'Login' }
									]
								}
							},
							{
								name: 'MainHomeStack',
							},
						],
						index: 1
					})
				);
			}
			else {
				this.props.navigation.dispatch(
					CommonActions.reset({
						routes: [
							{
								name: NavigateScreen,
							},
						]
					})
				);
			}
		}
	}

	render() {
		return (
			<>
				<View style={styles.container}>
					<Logo width='60%' />
				</View>
			</>
		);
	}
};

/**
 * @param {(arg0: { type: string; value: any; }) => any} dispatch
 */
const mapDispatchToProps = dispatch => {
	return {
		// @ts-ignore
		setAuth: (AuthObject) => dispatch({ type: 'setAuth', value: AuthObject }),
		// @ts-ignore
		setProfile: (ProfileObject) => dispatch({ type: 'setProfile', value: ProfileObject }),
		// @ts-ignore
		setSocket: (Socket) => dispatch({ type: 'setSocket', value: Socket }),
		// @ts-ignore
		setChatList: (ChatList) => dispatch({ type: 'setChatList', value: ChatList }),
		// @ts-ignore
		MarkBucketAsUnRead: (Buckets) => dispatch({ type: 'MarkBucketAsUnRead', value: Buckets }),
		// @ts-ignore
		setIsAnyProductInCart: (value) => dispatch({ type: 'setIsAnyProductInCart', value }),
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.white
	},
	logo: {
		width: '100%',
	},
});

export default connect(null, mapDispatchToProps)(IndexScreen);
