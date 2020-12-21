import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import Logo from '../assets/images/Logo.svg';
import { AuthCheck } from '../API/index';
import { connect } from 'react-redux';
import { Colors } from 'react-native-ui-lib';
import { CommonActions } from '@react-navigation/native';

class IndexScreen extends React.Component {

	componentDidMount() {

		const { setAuth, setProfile, setSocket, setChatList, MarkBucketAsUnRead, setIsAnyProductInCart } = this.props;


		AuthCheck(setAuth, setProfile, setSocket, setChatList, MarkBucketAsUnRead, setIsAnyProductInCart).then(NavigateScreen => {

			if(global.NotificationObject) {
				//Handle Notification Object and Navigate accordingly
				delete global.NotificationObject;
				//return;
			}

			Linking.getInitialURL().then(url => this.HandleLinkingInitialURL(url, NavigateScreen)).catch(() => { });

		}).catch(() => {
			this.props.navigation.navigate('Login');
		});

	}

	/**
	 * 
	 * @param {{url: string}} param0 
	 */
	handleOpenURL = ({ url }) => {
		if (url && url.includes('https://collections.levyne.com')) {

			const Paths = url.replace('https://collections.levyne.com', '').split('/');
			if (Paths.length === 3) {
				switch (Paths[1]) {
					case 'p':
					case 'P':
						const ProductID = parseInt(Paths[2]);
						if (ProductID) {

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
													{ name: 'Product', params: { ProductID } },
												],
												index: 1,
											}
										},
									]
								})
							);

							return true;
						}
					case 'd':
					case 'D':
						const DesignID = parseInt(Paths[2])
						if (DesignID) {

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
													{ name: 'ProductDetailsPage', params: { DesignID } },
												],
												index: 1,
											}
										},
									]
								})
							);

							return true;
						}
				}
			}
		}
		return false;
	}

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

const mapDispatchToProps = dispatch => {
	return {
		setAuth: (AuthObject) => dispatch({ type: 'setAuth', value: AuthObject }),
		setProfile: (ProfileObject) => dispatch({ type: 'setProfile', value: ProfileObject }),
		setSocket: (Socket) => dispatch({ type: 'setSocket', value: Socket }),
		setChatList: (ChatList) => dispatch({ type: 'setChatList', value: ChatList }),
		MarkBucketAsUnRead: (Buckets) => dispatch({ type: 'MarkBucketAsUnRead', value: Buckets }),
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
