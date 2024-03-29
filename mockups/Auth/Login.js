import React from 'react';
import {StyleSheet, ScrollView } from 'react-native';
import {Button, View, Text, Toast, Colors} from 'react-native-ui-lib';
import CstmInput from '../../components/input';
// @ts-ignore
import Logo from '../../assets/images/Logo.svg';
import generateOTP from '../../API/Auth/Login';
import SkipLogin from '../../API/Auth/SkipLogin';
import CstmShadowView from "../../components/CstmShadowView";
import Constants from '../../assets/constants';
import {connect} from 'react-redux';
import KeyboardAvoidingViewCstm from '../../components/KeyboardAvoidingViewCstm';

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

	renderCustomContent = () => {

		return (
			<View flex padding-10 style={{backgroundColor: undefined}}>
				<Text white h1>
					{this.state.showContent}
				</Text>
			</View>
		);
	};

	setMobileIntOnly = (Mobile) => {
        if(Mobile != this.state.Mobile) this.setState({Mobile : Mobile.replace(/[^0-9]+/g, "")});
	}

	sendOTP = () => {
		this.setState({showCustomToast: !this.state.showCustomToast});
        this.setState({showContent:'You will receive an OTP!'});

		generateOTP(this.state.Mobile).then(({json, Mobile}) => {
            this.setState({showCustomToast: !this.state.showCustomToast});
			this.props.navigation.navigate('OTP', {
				OTPTokenHash : json.OTPTokenHash,
                Mobile : Mobile,
				UUID : this.state.UUID,
				OTP: json.OTP
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
				<KeyboardAvoidingViewCstm
					behavior={ 'padding' }
					style={ { flex: 1, backgroundColor: 'white' } }
					keyboardVerticalOffset={95}
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
				</KeyboardAvoidingViewCstm>
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
