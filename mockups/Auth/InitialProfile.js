import React from 'react';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import EditProfileAPI from '../../API/Profile/EditProfile';
import CstmInput from "../../components/input";
import { Text, TouchableOpacity, Button, Colors, View, Toast } from 'react-native-ui-lib';
import CstmShadowView from '../../components/CstmShadowView';
import NavBarBack from "../../components/NavBarBack";
import { EmailValidator } from 'commons-validator-js';
import KeyboardAvoidingViewCstm from '../../components/KeyboardAvoidingViewCstm';


class InitialProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: '',
            Email: '',
            Address: '',
            PinCode: '',
            Female: true,
            Loading: false,
            ShowToast: false,
            ToastContent: 'Oops! Something went wrong',
        }
        this.timeouts = [];
    }

    setName = Name => {
        this.setState({
            Name: Name
        });
    }

    setEmail = Email => {
        this.setState({
            Email: Email
        });
    }

    setPinCode = (PinCode) => {
        this.setState({ PinCode });
    }

    setAddress = (Address) => {
        this.setState({ Address });
    }

    renderCustomContent = () => {
        return (
            <View flex padding-10 paddingB-30 style={{ backgroundColor: Colors.primary }}>
                <Text white h1>{this.state.ToastContent}</Text>
            </View>
        );
    };

    EditProfileSubmit = () => {

        this.setState({ Loading: true });

        const Name = this.state.Name;
        const Email = this.state.Email;
        const Gender = this.state.Female ? '0' : '1';
        const Address = this.state.Address;
        const PinCode = this.state.PinCode.toString();
        const Token = this.props.AccessToken;

        if (!Name) {
            this.setState({ Loading: false, ShowToast: true, ToastContent: 'Please Enter your Name !' });
            this.timeouts.push(setTimeout(() => {
                this.setState({ ShowToast: false });
            }, 3000));
            return
        }

        if (!(new EmailValidator({ allowLocal: true, allowTld: true }).isValid(Email))) {
            this.setState({ Loading: false, ShowToast: true, ToastContent: 'Please Enter a valid Email !' });
            this.timeouts.push(setTimeout(() => {
                this.setState({ ShowToast: false });
            }, 3000));
            return
        }

        if (!Address) {
            this.setState({ Loading: false, ShowToast: true, ToastContent: 'Please Enter your Address !' });
            this.timeouts.push(setTimeout(() => {
                this.setState({ ShowToast: false });
            }, 3000));
            return
        }

        if (PinCode.length !== 6) {
            this.setState({ Loading: false, ShowToast: true, ToastContent: 'Please Enter valid PinCode !' });
            this.timeouts.push(setTimeout(() => {
                this.setState({ ShowToast: false });
            }, 3000));
            return;
        }

        EditProfileAPI(Name, Email, Address, Gender, PinCode, Token).then(() => {
            this.props.setProfile({
                Name,
                Email,
                Address,
                PinCode,
                ProfileStatus: 2,
                Gender: this.state.Female ? 0 : 1
            });
            this.setState({ Loading: false });
            this.props.navigation.navigate('MainHomeStack');
        }).catch(err => {
            this.setState({ Loading: false, ShowToast: true, ToastContent: err });
            setTimeout(() => {
                this.setState({ ShowToast: false });
            }, 3000);
        })
    }

    componentWillUnmount = () => {
        this.timeouts.forEach(clearTimeout);
    }

    setGender = () => {
        this.setState({ Female: !this.state.Female });
    }

    navigateHome = () => {
        this.props.navigation.navigate('MainHomeStack');
    }

    render() {

        return (
            <>
                <NavBarBack Navigation={this.navigateHome} Title={"Edit Profile"} />
                <KeyboardAvoidingViewCstm
                    behavior={'padding'}
                    style={styles.container}
                    keyboardVerticalOffset={35}
                >
                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View paddingH-20 marginB-20>

                            <Text h1 marginT-10>Name</Text>
                            <CstmInput
                                placeholder='Name'
                                value={this.state.Name}
                                onChangeText={this.setName}
                                textContentType={'name'}
                            />

                            <Text h1 marginT-30>Email</Text>
                            <CstmInput
                                placeholder='Email'
                                value={this.state.Email}
                                onChangeText={this.setEmail}
                                keyboardType={'email-address'}
                                textContentType={'emailAddress'}
                            />

                            <View row marginT-30>
                                <TouchableOpacity
                                    center
                                    onPress={this.setGender}
                                    style={this.state.Female === true ? [styles.Gender, { borderColor: Colors.primary }] : styles.Gender}
                                >
                                    <Text h1 secondary>Female</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    center
                                    onPress={this.setGender}
                                    style={this.state.Female === false ? [styles.Gender, { borderColor: Colors.primary }] : styles.Gender}
                                >
                                    <Text h1 secondary>Male</Text>
                                </TouchableOpacity>
                            </View>

                            <Text h1 marginT-30>Address</Text>
                            <CstmInput
                                style={{ height: 100, borderRadius: 20 }}
                                placeholder='Address'
                                value={this.state.Address}
                                onChangeText={this.setAddress}
                            />

                            <Text h1 marginT-30>Pin Code</Text>
                            <CstmInput
                                style={{ marginBottom: 20 }}
                                placeholder='Pin Code'
                                value={this.state.PinCode}
                                keyboardType='number-pad'
                                maxLength={6}
                                onChangeText={this.setPinCode}
                            />

                            <CstmShadowView style={styles.ShadowView}>
                                <Button
                                    flex hb2
                                    label='Submit'
                                    onPress={this.EditProfileSubmit}
                                />
                            </CstmShadowView>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingViewCstm>
                <Toast
                    visible={this.state.ShowToast}
                    position={'bottom'}
                    backgroundColor={Colors.primary}
                >
                    {this.renderCustomContent()}
                </Toast>
                {this.state.Loading ? <View style={styles.overlayContainer}>
                    <ActivityIndicator color={Colors.primary} />
                </View> : <></>}
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    Gender: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.shadow,
        height: 50
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#707070",
        opacity: 0.6,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

const mapsStateToProps = state => ({
    AccessToken: state.Auth.AccessToken,
})

const mapDispatchToProps = dispatch => {
    return {
        setProfile: (Profile) => dispatch({ type: 'setProfile', value: Profile }),
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(InitialProfile);
