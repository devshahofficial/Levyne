import React from 'react';
import {StyleSheet, ScrollView,Modal, Dimensions} from 'react-native';
import colors from '../assets/colors';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import EditProfileAPI from '../API/EditProfile';
import CstmInput from "../components/input";
import {Text, TouchableOpacity, Button, Image, LoaderScreen, Colors, View, Toast, Picker} from 'react-native-ui-lib';
import CstmShadowView from '../components/CstmShadowView';
import {GalleryIcon} from "../Icons/GalleryIcon";
import {CameraIcon} from "../Icons/CameraIcon";
import Type from "../assets/Type";
import Spinner from 'react-native-loading-spinner-overlay';


const windowHeight = Dimensions.get('window').height;

class EditProfile extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
            Name : this.props.Name || '',
            Email : this.props.Email || '',
            About : this.props.About || '',
            profilePic : require('../assets/images/icon.png'),
            Address : this.props.About || '',
            showLoading : false,
            ProfilePicChanged : false,
            ShowActionSheet : false,
            ShowToast : false,
            ToastContent : 'Oops! Something went wrong',
            modalVisible: false,
            City : {},
            PinCode : '',
            LoaderContent: ''
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
        this.setState({PinCode});
    }

    setAddress = (Address) => {
        this.setState({Address});
    }

    componentDidMount() {
        this._isMounted = true;
    }

    handleImagePicker = (response) => {
        var Image = {
            uri: response.path,
            name: response.path.split("/").pop(),
            type: response.mime
        };
        this.setState({
            profilePic: Image,
            ProfilePicChanged: true,
            modalVisible : false
        })
    }

    ShowGallery = async() => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            mediaType: 'photo',
            forceJpg: true
        }).then(this.handleImagePicker).catch(err => {})
        //this.setState({ modalVisible: !this.state.modalVisible });
    }

    ShowCamera = async() => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            mediaType: 'photo',
            forceJpg: true
        }).then(this.handleImagePicker).catch(err => {})
        //this.setState({ modalVisible: !this.state.modalVisible });

    }

    renderCustomContent = () => {
        return (
            <View flex padding-10 paddingB-30 style={{backgroundColor : Colors.primary}}>
                <Text white h1>{this.state.ToastContent}</Text>
            </View>
        );
    };

    setUploadedPercentage = (Percentage) => {
        this.setState({
            LoaderContent : Percentage + '/100'
        })
    }

    EditProfileSubmit = () => {

        this.setState({ LoaderContent: '0/100', showLoading: true });

        const Name = this.state.Name;
        const Email = this.state.Email;
        const About = this.state.About;
        const Address = this.state.Address;
        const City = this.state.City;
        const PinCode = this.state.PinCode;
        const ProfilePic = this.state.profilePic;
        const Token = this.props.access_token;



        EditProfileAPI(Name, Email, About, this.state.ProfilePicChanged, ProfilePic, Address, City, PinCode, Token, this.setUploadedPercentage).then((resp) => {
            this.props.setName(Name);
            this.props.setEmail(Email);
            this.props.setAbout(About);
            if(resp) {
                this.props.setProfileImage(resp.ProfileImage);
            }
            this.props.navigation.navigate('DocumentUpload');
        }).catch(err => {
            this.setState({showLoading : false, ShowToast : true, ToastContent : err});
            setTimeout(() => {
                if(this._isMounted) {
                    this.setState({ShowToast : false});
                }
            }, 3000);
        })
    }

    setModalVisible = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    render() {
        const { modalVisible } = this.state;

        return (
            <>
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
                                <GalleryIcon size={28} Color={Colors.primary}/>
                                <Text h3 secondary marginT-10>Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity flex center onPress={this.ShowCamera}>
                                <CameraIcon size={32} Color={Colors.primary}/>
                                <Text h3 secondary marginT-10>Camera</Text>
                            </TouchableOpacity>
                        </View>
                    </CstmShadowView>
                </Modal>
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableOpacity style={styles.avatarView} onPress={() => this.setState({modalVisible : true})}>
                        <Image
                            style={styles.avatar}
                            source={this.state.profilePic}
                            fill={colors.trivisionGrey}
                        />
                    </TouchableOpacity>

                    <Text h1 marginT-30>Name </Text>
                    <CstmInput
                        placeholder='Name'
                        value={this.state.Name}
                        onChangeText={this.setName}
                    />
                    <Spinner
						visible={this.state.showLoading}
						textContent={this.state.LoaderContent}
						textStyle={styles.spinnerTextStyle}
					/>
                    <Text h1 marginT-30>Email </Text>
                    <CstmInput
                        placeholder='Email'
                        value={this.state.Email}
                        onChangeText={this.setEmail}
                    />

                    <Text h1 marginT-30>Office Address </Text>
                    <CstmInput
                        placeholder='Address'
                        value={this.state.Address}
                        onChangeText={this.setAddress}
                    />

                    <Text h1 marginT-30>Pin Code </Text>
                    <CstmInput
                        style={{marginBottom: 20}}
                        placeholder='Pin Code'
                        value={this.state.PinCode}
                        keyboardType='number-pad'
                        maxLength={6}
                        onChangeText={this.setPinCode}
                    />

                    <Text h1 marginT-5 marginB-20>Enterprise Type </Text>
                    <Picker
                        placeholder="Enterprise Type"
                        value={this.state.City}
                        enableModalBlur={false}
                        onChange={item => this.setState({City: item})}
                        topBarProps={{title: 'Enterprise Type'}}
                        searchPlaceholder={'Enterprise Type'}
                        searchSClatyle={{placeholderTextColor: Colors.dark50}}
                    >
                        {Type[0].map((item, index) => (
                            <Picker.Item key={index.toString()} value={{
                                value: item.title,
                                label: item.title
                            }}/>
                        ))}
                    </Picker>

                    <Text h1 marginT-10>About </Text>
                    <CstmInput
                        placeholder='About'
                        value={this.state.About}
                        onChangeText={this.setAbout}
                    />

                    <CstmShadowView style={styles.ShadowView}>
                        <Button
                            flex hb2
                            label='Submit'
                            onPress={this.EditProfileSubmit}
                        />
                    </CstmShadowView>
                    <View marginT-10></View>
                </ScrollView>
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
        paddingHorizontal: 20,
        backgroundColor : Colors.white
    },
    Modal:{
        flex:0.3,
        borderRadius: 20,
        marginHorizontal:30,
        paddingTop: 0,
        marginTop: windowHeight/2.5
    },
    spinnerTextStyle: {
        color: Colors.primary
	},
});

const mapsStateToProps = state => ({
    access_token : state.Auth.access_token,
    ProfileImage : state.Profile.ProfileImage,
    Name : state.Profile.Name,
    Email : state.Profile.Email,
    About : state.Profile.About
})

const mapDispatchToProps = dispatch => {
    return {
        setName : (Name) => dispatch({type: 'setName', value: Name}),
        setEmail : (Email) => dispatch({type: 'setEmail', value: Email}),
        setProfileImage : (ProfileImage) => dispatch({type: 'setProfileImage', value: ProfileImage}),
        setAbout : (About) => dispatch({type: 'setAbout', value: About}),
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(EditProfile);
