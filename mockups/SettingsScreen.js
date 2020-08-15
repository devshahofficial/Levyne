import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, TouchableOpacity, Colors, Button, Toast} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import Logout from '../API/Logout';
import CstmShadowView from '../components/CstmShadowView';

class SettingsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCustomToast: false,
            showContent: '',
        }
    }

    navigateAdvertise = () => {
        this.props.navigation.navigate('Advertise')
    }

    navigateHelp = () => {
        this.props.navigation.navigate('Help')
    }

    navigateLogistics = () => {
        this.props.navigation.navigate('Logistics')
    }

    navigateTermAndConditions = () => {
        this.props.navigation.navigate('TermsAndCondition')
    }

    EditProfile = () => {
        this.setState({showCustomToast: !this.state.showCustomToast});
        this.setState({showContent:'We have successfully received request to edit your profile. Our team will get back to you in no time.'});
        this.showToastTimeOut = setTimeout(() => {
            this.setState({showCustomToast : false});
        }, 5000);
    }
    navigateFAQ = () => {
        this.props.navigation.navigate('FAQs')
    }

    componentWillUnmount() {
        this.showToastTimeOut && clearTimeout(this.showToastTimeOut)
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

    LogoutOnPress = () => {
        Logout(this.props.AccessToken).then(() => {
            PushNotification.abandonPermissions()
            this.props.ResetAuth();
            this.props.ResetProfile();
            this.props.ResetSocket();
            this.props.ResetChat();
            this.props.navigation.navigate('Login');
        }).catch((err) => {})
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Settings'}/>
                <View paddingH-15 flex>
                    <Toast
                        visible={this.state.showCustomToast}
                        position={'bottom'}
                        backgroundColor={Colors.primary}
                    >
                        {this.renderCustomContent()}
                    </Toast>
                    <View>
                        <TouchableOpacity marginT-5>
                            <View centerV style={styles.Tab}>
                                <Text>
                                    Notifications
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity marginT-5 onPress={this.EditProfile}>
                            <View centerV style={styles.Tab}>
                                <Text>
                                    Request an Edit Profile
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View marginT-50>
                        <TouchableOpacity onPress={this.navigateLogistics}>
                            <View centerV style={styles.Tab}>
                                <Text>
                                    Logistics and Support
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity marginT-5 onPress={this.navigateAdvertise}>
                            <View centerV style={styles.Tab}>
                                <Text>
                                    Advertisements
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View marginT-50>
                        <TouchableOpacity onPress={this.navigateHelp}>
                            <View centerV style={styles.Tab}>
                                <Text>
                                    Help and Support
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity marginT-5 onPress={this.navigateFAQ}>
                            <View centerV style={styles.Tab}>
                                <Text>
                                    FAQs
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity marginT-5 onPress={this.navigateTermAndConditions}>
                            <View centerV style={styles.Tab}>
                                <Text>
                                    Terms and Conditions
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <CstmShadowView style={{marginTop:40,marginBottom:20}}>
                            <Button
                                onPress={this.LogoutOnPress}
                                h1
                                label="Log Out"
                            />
                        </CstmShadowView>
                        <Text marginT-20 grey40 h3 center>APP VERSION 1.0.0</Text>
                    </View>
                </View>
            </>
        );
    }

};

const styles = StyleSheet.create({
    Tab :{
        height:50,
        borderBottomWidth:0.5,
        borderBottomColor:Colors.grey50
    }
});

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

const mapDispatchToProps = dispatch => {
	return {
        ResetAuth : () => dispatch({type: 'ResetAuth'}),
        ResetProfile : () => dispatch({type: 'ResetProfile'}),
        ResetSocket : () => dispatch({type: 'ResetSocket'}),
        ResetChat : () => dispatch({type: 'ResetChat'}),
	}
}

export default connect(mapsStateToProps, mapDispatchToProps)(SettingsScreen);
