import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../assets/images/Logo.svg';
import {AuthCheck} from '../API/index';
import {connect} from 'react-redux';
import { Colors } from 'react-native-ui-lib';


class IndexScreen extends React.Component {

	componentDidMount() {

		const {setAuth, setProfile, setSocket, setChatList, MarkBucketAsUnRead, setIsAnyProductInCart} = this.props;


		AuthCheck(setAuth, setProfile, setSocket,  setChatList, MarkBucketAsUnRead, setIsAnyProductInCart).then( value => {
			if(value === 'Home')
			{
				this.props.navigation.navigate('MainHomeStack', { screen: 'Home' });
			}
			else
			{
				this.props.navigation.navigate(value);
			}
		}).catch(value => {
			this.props.navigation.navigate('Login');
        });
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
