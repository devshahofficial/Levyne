import React from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import {Button,Text, View, Colors, Toast} from 'react-native-ui-lib';
import CstmInput from '../../components/input';
// @ts-ignore
import Logo from '../../assets/images/Logo.svg';
import VerifyOTP from '../../API/Auth/OTP';
import generateOTP from '../../API/Auth/Login';
import {connect} from 'react-redux';
import CstmShadowView from "../../components/CstmShadowView";
import PushNotification from "react-native-push-notification";
import Loader from '../../components/Loader';

class OTPScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            OTP: this.props.route.params.OTP ? this.props.route.params.OTP.toString() : '',
            Time: '180',
            Size: 50,
            Color: Colors.secondary,
            LoaderVisible: false,
            showCustomToast: false,
            showContent : 'Please enter a valid OTP'
        }

        this.FirebaseToken = '';

        PushNotification.configure({

            //Called when Token is generated (iOS and Android)
            onRegister: (token) => {
                this.FirebaseToken = token.token;
            },

            requestPermissions: true,
        });

    }

    componentDidMount() {
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
                    this.setState({
                        Color : '#E83F94',
                        Size : 14,
                        Time: change
                    });
                }
                this.setState({
                    Time: change
                })
            }
        }, 1000);
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
            this.props.setIsAnyProductInCart,
        ).then(NavigateTo => {

            PushNotification.channelExists("chatmessages", function (exists) {
                if(!exists) {
                    PushNotification.createChannel({
                        channelId: 'chatmessages',
                        channelName: 'Chat Messages',
                        channelDescription: 'To Receive Chat Messages'
                    })
                }
            });

            clearInterval(this.state.intervalId);
            this.props.navigation.navigate(NavigateTo);
            this.setState({LoaderVisible : false})
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
            this.setState({
                showCustomToast : false,
                LoaderVisible: true
            });
            generateOTP(this.props.route.params.Mobile).then((OTPTokenHash) => {
                this.setState({
                    LoaderVisible: false
                });
                this.props.navigation.navigate('OTP', {
                    OTPTokenHash : OTPTokenHash,
                    Mobile : this.state.Mobile
                });
            }).catch(() => {
                this.setState({
                    showCustomToast : true,
                    LoaderVisible: false,
                    showContent: 'Network error, Please try again later.'
                });
                this.showToastTimeOut && clearTimeout(this.showToastTimeOut);
                this.showToastTimeOut = setTimeout(() => {
                    this.setState({showCustomToast : false, showContent: 'Please enter a valid OTP'});
                }, 3000);
            });
        }
    }
    render() {

        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flex:1}}
            >
                {this.state.LoaderVisible ?
                    <Loader /> :
                    <View center flex>
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
                }
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        alignItems: 'center',
        justifyContent:'center',
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
        setIsAnyProductInCart : (value) => dispatch({type: 'setIsAnyProductInCart', value}),
	}
}

export default connect(null, mapDispatchToProps)(OTPScreen);
