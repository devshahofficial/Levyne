import React from 'react';
import {StyleSheet, BackHandler, ScrollView } from 'react-native';
import {Button, View, Text, Toast, Colors} from 'react-native-ui-lib';
import CstmInput from '../components/input';
import Logo from '../assets/images/Logo.svg';
import generateOTP from '../API/Login';
import SkipLogin from '../API/SkipLogin';
import CstmShadowView from "../components/CstmShadowView";
import Constants from '../assets/constants';
import {connect} from 'react-redux';

class LoginScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			Mobile : '',
            backPressed : 0,
            UUID : Constants.DeviceID,
			showCustomToast: false,
			showContent: '',
        }
	}

	backButtonHandler = () => {
		if(this.props.navigation.isFocused())
		{
			if(this.state.backPressed > 0){
				BackHandler.exitApp();
			} else {
				this.setState({backPressed : this.state.backPressed + 1});
				this.setState({showContent:'Press again to exit!'});
				this.setState({showCustomToast: !this.state.showCustomToast});
				this.BackHandlerTimeOut = setTimeout( () => { this.setState({backPressed : 0})}, 2000);
				return true;
			}
		}
	}

	renderCustomContent = () => {
		const {selectedColor} = this.state;
		const backgroundColor = selectedColor === 'none' ? undefined : selectedColor;

		return (
			<View flex padding-10 style={{backgroundColor}}>
				<Text white h1>
					{this.state.showContent}
				</Text>
			</View>
		);
	};

	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);
	}

	componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
        this.BackHandlerTimeOut && clearTimeout(this.BackHandlerTimeOut);
	}

	setMobileIntOnly = (Mobile) => {
        if(Mobile != this.state.Mobile)
		    this.setState({Mobile : Mobile.replace(/[^0-9]+/g, "")});
	}

	sendOTP = () => {
		this.setState({showCustomToast: !this.state.showCustomToast});
        this.setState({showContent:'You will receive an OTP!'});

		generateOTP(this.state.Mobile).then((json) => {
            console.log(json);
            this.setState({showCustomToast: !this.state.showCustomToast});
			this.props.navigation.navigate('OTP', {
				OTPTokenHash : json.OTPTokenHash,
                Mobile : this.state.Mobile,
                UUID : this.state.UUID
			});
		}).catch(err => {
            console.log(err);
			this.setState({showCustomToast: !this.state.showCustomToast});
			this.setState({showContent:err.message});
		});
    };

    skipLogin = () => {
        SkipLogin(this.props.setAuth, this.props.setProfile, 0).then(() => {
            this.props.navigation.navigate('MainHomeStack');
        }).catch(err => {
            console.log(err);
        })
    }


	render() {
		return (
            <ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{flex:1}}
			>
                <View flex center>
					<Toast
						visible={this.state.showCustomToast}
						position={'bottom'}
						backgroundColor={Colors.primary}
					>
						{this.renderCustomContent()}
					</Toast>
					<View centerV centerH style={styles.container}>
						<Logo width='60%' />
					</View>
					<View marginT-50>
						<Text h1 center marginL-60 marginR-60>Welcome to Levyne. {"\n"} We thank you for your service.</Text>
					</View>
					<View style={styles.inputLayout} marginT-50>
						<CstmInput
							placeholder='Mobile No.'
							value={this.state.Mobile}
							onChangeText={this.setMobileIntOnly}
							keyboardType='number-pad'
							maxLength={10}
						/>
						<CstmShadowView style={{marginTop:30}}>
							<Button
								hb2 flex
								onPress={this.sendOTP}
								label="Send OTP"
							/>
						</CstmShadowView>
					</View>
					<CstmShadowView style={styles.Skip}>
						<Button
							h2 onPress={this.skipLogin}
							label="Skip Login" flex
						/>
					</CstmShadowView>

				</View>
            </ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width:'100%',
	},
	logo: {
		width: 313*0.55,
		height:272*0.55,
	},
	inputLayout: {
		width:'85%',
	},
	Skip: {
		marginBottom:50,
		marginTop: 100
	}
});

const mapDispatchToProps = dispatch => {
	return {
        setAuth : (Auth) => dispatch({type: 'setAuth', value: Auth}),
        setProfile : (Profile) => dispatch({type: 'setProfile', value: Profile}),
	}
}

export default connect(null, mapDispatchToProps)(LoginScreen);
