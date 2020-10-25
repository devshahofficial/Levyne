import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../assets/images/Logo.svg';
import colors from '../assets/colors';
import {AuthCheck} from '../API/index';
import {connect} from 'react-redux';


class IndexScreen extends React.Component {

	componentDidMount() {

		const setAuth = this.props.setAuth;
		const setProfile = this.props.setProfile;
		const setSocket = this.props.setSocket;


		AuthCheck(setAuth, setProfile, setSocket).then( value => {
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
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:colors.trivisionWhite
	},
	logo: {
		width:'100%',
	},
});

export default connect(null, mapDispatchToProps)(IndexScreen);
