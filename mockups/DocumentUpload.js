import React from 'react';
import { StyleSheet, ScrollView, Modal, Dimensions} from 'react-native';
import colors from '../assets/colors';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentUpload from '../API/DocumentUpload';
import {Text, Button, View, LoaderScreen, Colors, ActionSheet, TouchableOpacity, Image} from 'react-native-ui-lib';
import CstmShadowView from '../components/CstmShadowView';
import {CameraIcon} from "../Icons/CameraIcon";
import {GalleryIcon} from "../Icons/GalleryIcon";


const windowHeight = Dimensions.get('window').height;

class EditProfile extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            IDProof : null,
            AddressProof : null,
            BrandProof : null,
            ShowActionSheet : false,
            CurrentActionSheetProp : '',
            Loading : false,
            LoaderContent : '1/100',
            modalVisible: false,
            Doc1: false,
            Doc2: false,
            Doc3: false,
            profilePic : '',
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    setUploadedPercentage = (Percentage) => {
        this.setState({
            LoaderContent : Percentage + '/100'
        })
    }

    UploadDocumentSubmit = () => {
        this.setState({
            Loading : true
        })
        const Token = this.props.AccessToken;
        const IDProof = this.state.IDProof;
        const AddressProof = this.state.AddressProof;
        const BrandProof = this.state.BrandProof;
        DocumentUpload(IDProof, AddressProof, BrandProof, Token, this.setUploadedPercentage).then((resp) => {
            this.props.navigation.navigate('Pending');
        }).catch(err => {
            console.log(err);
            this.setState({Loading : false, ShowToast : true});
            setTimeout(() => {
                if(this._isMounted) {
                    this.setState({ShowToast : false});
                }
            }, 3000);
        })
    }

    handleImagePicker = (response) => {
        var Image = {
            uri: response.path,
            name: this.state.CurrentActionSheetProp + '.' + response.path.split('.').pop(),
            type: response.mime
        };
        this.state[this.state.CurrentActionSheetProp] = Image;
        this.state.ShowActionSheet = false;
        this.setState(this.state);
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    ShowGallery = async() => {
        ImagePicker.openPicker({
            width: 1000,
            height: 1000,
            cropping: true,
            mediaType: 'photo',
            forceJpg: true
        }).then(this.handleImagePicker).catch(err => {})
        //this.setState({ modalVisible: !this.state.modalVisible });
    }

    ShowCamera = async() => {
        ImagePicker.openCamera({
            width: 1000,
            height: 1000,
            cropping: true,
            mediaType: 'photo',
            forceJpg: true
        }).then(this.handleImagePicker).catch(err => {})
        //this.setState({ modalVisible: !this.state.modalVisible });

    }

    UploadIDProof = () => {
        this.setState({
            CurrentActionSheetProp : 'IDProof',
            modalVisible: !this.state.modalVisible
        })
    }

    UploadAddressProof = () => {
        this.setState({
            CurrentActionSheetProp : 'AddressProof',
            modalVisible: !this.state.modalVisible
        })
    }

    UploadBrandProof = () => {
        this.setState({
            CurrentActionSheetProp : 'BrandProof',
            modalVisible: !this.state.modalVisible
        })
    }

    setModalVisible = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <ScrollView style={styles.container}>

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

                <View style={{borderWidth:0.5,borderColor: Colors.secondary,borderRadius:20}}>
                    <View marginH-10 marginV-10 center>
                        <Text primary h2>All 3 documents are necessary for verification.</Text>
                    </View>
                </View>
                <View marginT-20>
                    <Text hb1 onPress={this.UploadIDProof}>ID Proof </Text>
                    <Text h3 primary>Aadhar Card, Pan Card, etc.</Text>
                    <TouchableOpacity style={styles.avatarView} onPress={this.UploadIDProof}>
                        <Image
                            style={styles.avatar}
                            source={this.state.IDProof}
                            fill={colors.trivisionGrey}
                        />
                    </TouchableOpacity>
                </View>

                <View marginT-20>
                    <Text hb1 onPress={this.UploadAddressProof}>Office Address Proof </Text>
                    <Text h2 primary>Office light bill, Rent agreement paper, etc.</Text>
                    <Text h3 secondary>If you do not have a registered Brand, you may upload your respective diamond market's identity card. </Text>
                    <TouchableOpacity style={styles.avatarView} onPress={this.UploadAddressProof}>
                        <Image
                            style={styles.avatar}
                            source={this.state.AddressProof}
                            fill={colors.trivisionGrey}
                        />
                    </TouchableOpacity>
                </View>

                <View marginT-20>
                    <Text hb1 onPress={this.UploadBrandProof}>Brand Existence Proof</Text>
                    <Text h2 primary>Brand registration papers, etc.</Text>
                    <Text h3 secondary>If you do not have a registered Brand, you may upload your respective diamond market's identity card. </Text>
                    <TouchableOpacity style={styles.avatarView} onPress={this.UploadBrandProof}>
                        <Image
                            style={styles.avatar}
                            source={this.state.BrandProof}
                            fill={colors.trivisionGrey}
                        />
                    </TouchableOpacity>
                </View>

                {this.state.Loading && <LoaderScreen
                    loaderColor={Colors.primary}
                    message={this.state.LoaderContent}
                />}
                <CstmShadowView style={styles.ShadowView}>
                    <Button
                        flex
                        label='Submit'
                        onPress={this.UploadDocumentSubmit}
                    />
                </CstmShadowView>
                <ActionSheet
                    showCancelButton
                    cancelButtonIndex={2}
                    options={[
                        {label: 'Camera', onPress: this.ShowCamera},
                        {label: 'Gallery', onPress: this.ShowGallery},
                        {label: 'Cancel', onPress: () => {}},
                    ]}
                    visible={this.state.ShowActionSheet}
                    onDialogDismissed={() => this.setState({ShowActionSheet: false})}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    labels: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.trivisionBlue,
    },
    Button: {
		borderRadius: 40,
		backgroundColor:colors.trivisionWhite,
		borderColor:colors.trivisionWhite,
    },
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor : Colors.white
    },
	ShadowView:{
		marginTop:20,
		marginBottom:50
    },
    Modal:{
        flex:0.3,
        borderRadius: 20,
        marginHorizontal:30,
        paddingTop: 0,
        marginTop: windowHeight/2.5
    },
    avatar: {
        height: 300,
        width: 300,
        borderColor: Colors.secondary,
        borderWidth: 0.5,
        borderRadius: 5,
    },
    avatarView: {
        marginBottom: 10,
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken,
})

export default connect(mapsStateToProps)(EditProfile);