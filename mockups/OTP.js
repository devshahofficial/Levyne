import React from 'react';
import { StyleSheet} from 'react-native';
import {Button,Text, View, Colors, LoaderScreen, Toast} from 'react-native-ui-lib';
import CstmInput from '../components/input';
import Logo from '../assets/images/Logo.svg';
import VerifyOTP from '../API/OTP';
import {generateOTP} from '../API/Login';
import {connect} from 'react-redux';
import CstmShadowView from "../components/CstmShadowView";
import KeyboardAwareView from '../components/KeyBoardAwareView';
const PushNotification = require("react-native-push-notification");
import PushNotificationIOS from "@react-native-community/push-notification-ios";

class OTPScreen extends React.Component {

    constructor(props) {
        _isMounted = false;
        super(props);
        this.state = {
            OTP: '',
            Time: '180',
            Size: 50,
            Color: Colors.secondary,
            LoaderVisible: false,
            showCustomToast: false,
            showContent : 'Please enter a valid OTP'
        }

        this.FirebaseToken = '';

        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: (token) => {
                this.FirebaseToken = token.token;
            },
            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: (notification) => {
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            requestPermissions: true,
        });

    }

    componentDidMount() {
        this._isMounted = true;
        this.intervalId = setInterval(() => {
            if(isNaN(parseInt(this.state.Time)))
            {
                return;
            }
            else
            {
                var change = parseInt(this.state.Time);
                change--;
                if(change<=0)
                {
                    clearInterval(this.intervalId);
                    change = 'Resend it';
                    if(this._isMounted) {
                        this.setState({
                            Color : '#E83F94',
                            Size : 14,
                            Time: change
                        });
                    }
                }
                if(this._isMounted) {
                    this.setState({
                        Time: change
                    })
                }
            }
        }, 1000);
        //this.setState({intervalId : intervalId});
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
        this.showToastTimeOut && clearTimeout(this.showToastTimeOut);
    }

    setOTP = OTP => {
        this.setState({
            OTP : OTP.replace(/[^0-9]+/g, "")
        });
    }

    ValidateOTP = () => {
        this.setState({
            LoaderVisible : true
        })
        const Mobile = this.props.route.params.Mobile;
        const OTPTokenHash = this.props.route.params.OTPTokenHash;
        const UUID = this.props.route.params.UUID;
        VerifyOTP(
            Mobile,
            this.state.OTP,
            OTPTokenHash,
            UUID,
            this.FirebaseToken,
            this.props.setAuth,
            this.props.setProfile,
            this.props.setSocket,
            this.props.setChatList,
            this.props.MarkBucketAsUnRead,
        ).then(NavigateTo => {
            clearInterval(this.state.intervalId);
            this.props.navigation.navigate(NavigateTo);
            if(this._isMounted) {
                this.setState({LoaderVisible : false})
            }

        }).catch((err) => {
            console.log(err);
            this.setState({
                LoaderVisible : false,
                showCustomToast : true
            });
            this.showToastTimeOut = setTimeout(() => {
                this.setState({showCustomToast : false});
            }, 3000);
        });
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

    ResendOTP = () => {
        if(this.state.Time === 'Resend it')
        {
            Toast.hide(); //Hide if any toast
            Toast.showLoading();
            generateOTP(this.props.route.params.Mobile).then((OTPTokenHash) => {
                Toast.hide();
                this.props.navigation.navigate('OTP', {
                    OTPTokenHash : OTPTokenHash,
                    Mobile : this.state.Mobile
                });
            }).catch(() => {
                Toast.hide();
                Toast.show('Network error, Please try again later.', Toast.SHORT);
            });
        }
    }
    render() {

        return (
            <KeyboardAwareView>
                <View style={styles.containerMain} flex>
                    <View style={styles.container} paddingT-100>
                        <Logo width='60%' />
                    </View>
                    <View style={styles.container} paddingT-100>
                        <Text h1 marginB-15>You will receive OTP via sms.</Text>
                        <View style={styles.inputLayout}>
                            <CstmInput
                                placeholder='OTP'
                                value={this.state.OTP}
                                onChangeText={this.setOTP}
                                keyboardType='number-pad'
                                maxLength={6}
                            />
                            {this.state.LoaderVisible && <LoaderScreen loaderColor={Colors.primary} />}
                            <CstmShadowView>
                                <Button onPress={this.ValidateOTP} hb2 label='Login' flex/>
                            </CstmShadowView>
                            <View style={styles.container} marginT-30>
                                <Text style={styles.Text} marginB-20>Didn't receive it ?</Text>
                                <Text onPress={this.ResendOTP} h1 style={[styles.Text, {fontSize:this.state.Size, color:this.state.Color, lineHeight:60}]}>{this.state.Time}</Text>
                            </View>
                        </View>
                    </View>
                    <Toast
                        visible={this.state.showCustomToast}
                        position={'bottom'}
                        backgroundColor={Colors.primary}
                    >
                        {this.renderCustomContent()}
                    </Toast>
                </View>
            </KeyboardAwareView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        alignItems: 'center',
        justifyContent:'center',
    },
    containerMain : {
        width:'100%',
        alignItems: 'center',
    },
    logo: {
        width: 313*0.55,
        height:272*0.55,
    },

    inputLayout: {
        width:'85%',
    },
    Text: {
        marginTop: 15,
        alignSelf:"center",
    },

});

const mapDispatchToProps = dispatch => {
	return {
		setAuth : (AuthObject) => dispatch({type: 'setAuth', value: AuthObject}),
		setSocket : (Socket) => dispatch({type: 'setSocket', value: Socket}),
		setProfile : (ProfileObject) => dispatch({type: 'setProfile', value: ProfileObject}),
		setChatList : (ChatList) => dispatch({type: 'setChatList', value: ChatList}),
		MarkBucketAsUnRead: (Buckets) => dispatch({type: 'MarkBucketAsUnRead', value: Buckets}),
	}
}

export default connect(null, mapDispatchToProps)(OTPScreen);
