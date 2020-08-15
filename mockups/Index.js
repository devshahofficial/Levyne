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
        

		AuthCheck(setAuth, setProfile).then( value => {
			if(value === 'Home')
			{
				this.props.navigation.navigate('MainHomeStack', { screen: 'Home' });
			}
			else
			{
				this.props.navigation.navigate(value);
			}
		}).catch(value => {
			//this.props.navigation.navigate('MainHomeStack', { screen: 'Home' });
			this.props.navigation.navigate('Login');
        });
	}
	render() {
		return (
			<>
				<View style={styles.container}>
					<Logo width='90%'/>
				</View>
			</>
		);
	}
};

const mapDispatchToProps = dispatch => {
	return {
        setAuth : (AuthObject) => dispatch({type: 'setAuth', value: AuthObject}),

		setProfile : (ProfileObject) => dispatch({type: 'setProfile', value: ProfileObject}),
        
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