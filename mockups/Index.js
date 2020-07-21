import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../assets/images/Logo.svg';
import colors from '../assets/colors';
import {AuthCheck} from '../API/index';
import {connect} from 'react-redux';


class IndexScreen extends React.Component {

	componentDidMount() {
		const setAccess_token = this.props.setAccess_token;
		const setRefresh_token = this.props.setRefresh_token;
		const setTimestamp = this.props.setTimestamp;
        const setName = this.props.setName;
        const setAbout = this.props.setAbout;
        const setAddress = this.props.setAddress;
		const setEmail = this.props.setEmail;
		const setProfileImage = this.props.setProfileImage;
		const setBrandID = this.props.setBrandID;
		const setMobile = this.props.setMobile;


		AuthCheck(setAccess_token, setRefresh_token, setTimestamp, setName, setEmail, setAddress, setAbout, setProfileImage, setBrandID, setMobile).then( value => {
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
			this.props.navigation.navigate('MainHomeStack', { screen: 'Home' });
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
		setAccess_token : (access_token) => dispatch({type: 'setAccess_token', value: access_token}),
		setRefresh_token : (refresh_token) => dispatch({type: 'setRefresh_token', value: refresh_token}),
		setTimestamp : (timestamp) => dispatch({type: 'setTimestamp', value: timestamp}),
        setName : (Name) => dispatch({type: 'setName', value: Name}),
        setAbout : (About) => dispatch({type: 'setAbout', value: About}),
        setAddress : (Address) => dispatch({type: 'setAddress', value: Address}),
        setEmail : (Email) => dispatch({type: 'setEmail', value: Email}),
		setProfileImage : (ProfileImage) => dispatch({type: 'setProfileImage', value: ProfileImage}),
		setBrandID : (BrandID) => dispatch({type: 'setBrandID', value: BrandID}),
		setMobile : (Mobile) => dispatch({type: 'setMobile', value: Mobile}),

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
