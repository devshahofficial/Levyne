import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../assets/colors';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import EditProfileAPI from '../API/EditProfile';
import Toast from 'react-native-tiny-toast';
import CstmInput from "../components/input";
import {ActionSheet, View, Text, TouchableOpacity, Button, Avatar} from 'react-native-ui-lib';
import CstmShadowView from '../components/CstmShadowView';

class Profile extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
            Name : this.props.Name || '',
            Email : this.props.Email || '',
            About : this.props.About || '',
            ProfilePic : require('../assets/images/icon.png'),
            Address : '',
            ProfilePicChanged : false,
            ShowActionSheet : false
        }
    }
    componentWillUnmount(){
        Toast.hide()
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

    ShowGallery = async() => {
        ImagePicker.launchImageLibrary({
            mediaType : 'photo',
            allowsEditing : true,
            noData : true,
            storageOptions : {
                skipBackup : true
            },
            maxWidth: 1080,
            maxHeight: 1080,
            quality: 0.8
        }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                var Image = {
                    uri: response.uri,
                    name: response.fileName || response.uri.split("/").pop(),
                    type: response.type
                };
                this.setState({
                    ProfilePic: Image,
                    ProfilePicChanged: true,
                    ShowActionSheet : false
                })
            }
        })
    }

    ShowCamera = async() => {
        ImagePicker.launchCamera({
            mediaType : 'photo',
            allowsEditing : true,
            noData : true,
            storageOptions : {
                skipBackup : true
            },
            maxWidth: 1080,
            maxHeight: 1080,
            quality: 0.8
        }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                var Image = {
                    uri: response.uri,
                    name: response.fileName || response.uri.split("/").pop(),
                    type: response.type
                };
                this.setState({
                    ProfilePic: Image,
                    ProfilePicChanged: true,
                    ShowActionSheet : false
                })
            }
        })
    }

    showLoadingWithPercentage = (Percentage) => {
        Toast.hide();
        Toast.showLoading(Percentage + '/100');
    }

    EditProfileSubmit = () => {
        Toast.showLoading('0/100');
        const Name = this.state.Name;
        const Email = this.state.Email;
        const About = this.state.About;
        const ProfilePic = this.state.ProfilePic;
        const Token = this.props.AccessToken;
        EditProfileAPI(Name, Email, About, this.state.ProfilePicChanged, ProfilePic, Token, this.showLoadingWithPercentage).then((resp) => {
            this.props.setName(Name);
            this.props.setEmail(Email);
            this.props.setAbout(About);
            if(resp) {
                this.props.setProfileImage(resp.ProfileImage);
            }
            Toast.hide();
            this.props.navigation.navigate('DocumentUpload');
        }).catch(err => {
            Toast.hide()
            Toast.show(err);
        })
    }

    render() {
        return (
            <>
                <View flex paddingH-20>
                    <TouchableOpacity style={styles.avatarView} onPress={() => this.setState({ShowActionSheet : true})}>
                        <Avatar
                            style={styles.avatar}
                            source={this.state.ProfilePic}
                            fill={colors.trivisionGrey}
                            size={100}
                        />
                    </TouchableOpacity>

                    <Text marginT-20 hb1>Name</Text>
                    <CstmInput
                        placeholder='Name'
                        value={this.state.Name}
                        onChangeText={this.setName}
                    />

                    <Text marginT-20 hb1>Email</Text>
                    <CstmInput
                        //maxLength={20}
                        placeholder='Email'
                        value={this.state.Email}
                        onChangeText={this.setEmail}
                    />

                    <Text marginT-20 hb1> About </Text>
                    <CstmInput
                        multiline={true}
                        numberOfLines={5}
                        placeholder='About'
                        value={this.state.About}
                        onChangeText={this.setAbout}
                    />

                    <CstmShadowView style={{marginBottom: 10, marginTop:20}}>
                        <Button
                            label='Submit'
                            onPress={this.EditProfileSubmit}
                        />
                    </CstmShadowView>
                </View>
                <ActionSheet
                    cancelButtonIndex={2}
                    height={100}
                    options={[
                        {label: 'Camera', onPress: this.ShowCamera},
                        {label: 'Gallery', onPress: this.ShowGallery},
                        {label: 'Cancel', onPress: () => {}},
                    ]}
                    visible={this.state.ShowActionSheet}
                    //onDismiss={() => this.setState({ShowActionSheet: false})}
                />

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
        borderColor: colors.trivisionPink,
        borderWidth: 2,
    },

    Button: {
		borderRadius: 40,
		backgroundColor:colors.trivisionWhite,
		borderColor:colors.trivisionWhite,
	},

});

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken,
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

export default connect(mapsStateToProps, mapDispatchToProps)(Profile);
