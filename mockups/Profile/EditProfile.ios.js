import React from 'react';
import { StyleSheet, ScrollView, Modal, BackHandler, Dimensions, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import EditProfileAPI from '../../API/EditProfile';
import CstmInput from "../../components/input";
import { Text, TouchableOpacity, Button, Image, Colors, View, Toast } from 'react-native-ui-lib';
import CstmShadowView from '../../components/CstmShadowView';
import { GalleryIcon } from "../../Icons/GalleryIcon";
import { CameraIcon } from "../../Icons/CameraIcon";
import Spinner from 'react-native-loading-spinner-overlay';
import NavBarBack from "../../components/NavBarBack";

//Gender 0 means Female and 1 means Male

const windowHeight = Dimensions.get('window').height;

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.Profile.Name || '',
            Email: this.props.Profile.Email || '',
            ProfileImage: {
                uri: this.props.Profile.ProfileImage,
                name: 'ProfileImage.webp',
                type: 'image/webp'
            },
            Address: this.props.Profile.Address || '',
            PinCode: this.props.Profile.PinCode || '',
            Female: !this.props.Profile.Gender,
            showLoading: false,
            ProfileImageChanged: true,
            ShowActionSheet: false,
            ShowToast: false,
            ToastContent: 'Oops! Something went wrong',
            modalVisible: false,
            LoaderContent: '',
            ProfileImageNotRequired: true
        }
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

    setAbout = (About) => {
        this.setState({
            About: About
        });
    }

    setPinCode = (PinCode) => {
        this.setState({ PinCode });
    }

    setAddress = (Address) => {
        this.setState({ Address });
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => { });
    }

    handleImagePicker = (response) => {
        var Image = {
            uri: Platform.OS === 'ios' ? 'file:///' + response.path : response.path,
            name: response.path.split('/').pop(),
            type: response.mime
        };
        this.setState({
            ProfileImage: Image,
            ProfileImageChanged: true,
            modalVisible: false,
            ProfileImageNotRequired: false
        })
    }

    ShowGallery = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            mediaType: 'photo',
            forceJpg: true
        }).then(this.handleImagePicker).catch(err => { })
        //this.setState({ modalVisible: !this.state.modalVisible });
    }

    ShowCamera = async () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            mediaType: 'photo',
            forceJpg: true
        }).then(this.handleImagePicker).catch(err => { })
        //this.setState({ modalVisible: !this.state.modalVisible });

    }

    renderCustomContent = () => {
        return (
            <View flex padding-10 paddingB-30 style={{ backgroundColor: Colors.primary }}>
                <Text white h1>{this.state.ToastContent}</Text>
            </View>
        );
    };

    setUploadedPercentage = (Percentage) => {
        this.setState({
            LoaderContent: Percentage + '/100'
        })
    }

    EditProfileSubmit = () => {

        this.setState({ LoaderContent: '0/100', showLoading: true });

        const Name = this.state.Name;
        const Email = this.state.Email;
        const Gender = this.state.Female ? '0' : '1';
        const Address = this.state.Address;
        const PinCode = this.state.PinCode;
        const ProfileImage = this.state.ProfileImage;
        const Token = this.props.AccessToken;
        const ProfileImageChanged = this.state.ProfileImageChanged;
        const ProfileImageNotRequired = this.state.ProfileImageNotRequired;

        EditProfileAPI(Name, Email, ProfileImageChanged, ProfileImage, Address, Gender, PinCode, Token, this.setUploadedPercentage, ProfileImageNotRequired).then((resp) => {
            this.props.setProfile({
                Name,
                Email,
                Address,
                PinCode,
                ProfileStatus: 2,
                Gender: this.state.Female ? 0 : 1,
                ...ProfileImageNotRequired ? {} : { ProfileImage: resp.ProfileImage }
            });
            this.setState({ showLoading: false });
            this.props.navigation.goBack();
        }).catch(err => {
            this.setState({ showLoading: false, ShowToast: true, ToastContent: err });
            setTimeout(() => {
                this.setState({ ShowToast: false });
            }, 3000);
        })
    }

    setModalVisible = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    setGender = () => {
        this.setState({ Female: !this.state.Female });
    }

    navigateHome = () => {
        this.props.navigation.goBack();
    }

    render() {
        const { modalVisible } = this.state;

        return (
            <>
                <NavBarBack Navigation={this.navigateHome} Title={"Edit Profile"} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <CstmShadowView style={styles.Modal}>
                        <View flex row centerV marginT-10>
                            <Text flex-9 h1 secondary center>Choose Medium to Upload:</Text>
                            <TouchableOpacity
                                flex
                                onPress={this.setModalVisible}
                            >
                                <Text primary hb1>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View row flex-5 marginH-30>
                            <TouchableOpacity flex center onPress={this.ShowGallery}>
                                <GalleryIcon size={28} Color={Colors.primary} />
                                <Text h3 secondary marginT-10>Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity flex center onPress={this.ShowCamera}>
                                <CameraIcon size={32} Color={Colors.primary} />
                                <Text h3 secondary marginT-10>Camera</Text>
                            </TouchableOpacity>
                        </View>
                    </CstmShadowView>
                </Modal>
                <KeyboardAvoidingView
                    behavior={ 'padding' }
                    style={ styles.container}
                    keyboardVerticalOffset={35}
                >
                    <ScrollView
                        style={ { flex: 1 } }
                        showsVerticalScrollIndicator={false}
                    >
                        <View paddingH-15 marginB-20>

                            <Text h1 marginT-10>Name</Text>
                            <CstmInput
                                placeholder='Name'
                                value={this.state.Name}
                                onChangeText={this.setName}
                                textContentType={'name'}
                            />
                            <Spinner
                                visible={this.state.showLoading}
                                textContent={this.state.LoaderContent}
                                textStyle={styles.spinnerTextStyle}
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
                                    style={this.state.Female ? [styles.Gender, { borderColor: Colors.primary }] : styles.Gender}
                                >
                                    <Text h1 secondary>Female</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    center
                                    onPress={this.setGender}
                                    style={!this.state.Female ? [styles.Gender, { borderColor: Colors.primary }] : styles.Gender}
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
                                value={this.state.PinCode.toString()}
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
                </KeyboardAvoidingView>
                <Toast
                    visible={this.state.ShowToast}
                    position={'bottom'}
                    backgroundColor={Colors.primary}
                >
                    {this.renderCustomContent()}
                </Toast>
            </>
        )
    }
}

const styles = StyleSheet.create({
    avatarView: {
        marginBottom: 10,
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        height: 100,
        width: 100,
        borderColor: Colors.secondary,
        borderWidth: 1,
        borderRadius: 50,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    Modal: {
        flex: 0.3,
        borderRadius: 20,
        marginHorizontal: 30,
        paddingTop: 0,
        marginTop: windowHeight / 2.5
    },
    spinnerTextStyle: {
        color: Colors.primary
    },
    Gender: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.shadow,
        height: 50
    }
});

const mapsStateToProps = state => ({
    AccessToken: state.Auth.AccessToken,
    Profile: state.Profile
})

const mapDispatchToProps = dispatch => {
    return {
        setProfile: (Profile) => dispatch({ type: 'setProfile', value: Profile }),
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(EditProfile);
