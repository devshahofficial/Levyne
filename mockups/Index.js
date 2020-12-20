import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import Logo from '../assets/images/Logo.svg';
import {AuthCheck} from '../API/index';
import {connect} from 'react-redux';
import { Colors } from 'react-native-ui-lib';

class IndexScreen extends React.Component {

	componentDidMount() {

		const {setAuth, setProfile, setSocket, setChatList, MarkBucketAsUnRead, setIsAnyProductInCart} = this.props;


		AuthCheck(setAuth, setProfile, setSocket,  setChatList, MarkBucketAsUnRead, setIsAnyProductInCart).then( NavigateScreen => {

			Linking.getInitialURL().then(url => this.HandleLinkingInitialURL(url, NavigateScreen)).catch(() => {});
			
		}).catch(() => {
			this.props.navigation.navigate('Login');
		});
		
		Linking.addEventListener('url', this.handleOpenURL);
	}

	componentWillUnmount = () => {
		Linking.removeEventListener('url', this.handleOpenURL);
	}

	handleOpenURL = ({url}) => {
		if(url) {
			const Paths = (new URL(url)).pathname.split('/');
			if(Paths.length === 3) {
				switch(Paths[1]) {
					case 'p', 'P' :
						const ProductID = parseInt(Paths[2])
						if(ProductID) {
							this.props.navigation.push('Product', {ProductID})
							return true;
						}
					case 'd', 'D' :
						const DesignID = parseInt(Paths[2])
						if(DesignID) {
							this.props.navigation.push('ProductDetailsPage', {DesignID})
							return true;
						}
				}
			}
		}
		return false;
	}

	HandleLinkingInitialURL = (url, NavigateScreen) => {
		
		if(!this.handleOpenURL({url})) {
			if(NavigateScreen === 'Home')
			{
				this.props.navigation.navigate('MainHomeStack', { screen: 'Home' });
			}
			else
			{
				this.props.navigation.navigate(NavigateScreen);
			}
		}

	}

	render() {
		return (
			<>
				<View style={styles.container}>
					<Logo width='60%'/>
				</View>
			</>
		);
	}
};

const mapDispatchToProps = dispatch => {
	return {
        setAuth : (AuthObject) => dispatch({type: 'setAuth', value: AuthObject}),
		setProfile : (ProfileObject) => dispatch({type: 'setProfile', value: ProfileObject}),
		setSocket : (Socket) => dispatch({type: 'setSocket', value: Socket}),
		setChatList : (ChatList) => dispatch({type: 'setChatList', value: ChatList}),
		MarkBucketAsUnRead: (Buckets) => dispatch({type: 'MarkBucketAsUnRead', value: Buckets}),
		setIsAnyProductInCart : (value) => dispatch({type: 'setIsAnyProductInCart', value}),
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:Colors.white
	},
	logo: {
		width:'100%',
	},
});

export default connect(null, mapDispatchToProps)(IndexScreen);
