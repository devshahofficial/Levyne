import React, { Component } from 'react';
import {connect} from "react-redux";
import {Colors, Text, AnimatedImage, View, LoaderScreen, TouchableOpacity, Modal} from "react-native-ui-lib";
import {SafeAreaView, StyleSheet, ActivityIndicator, FlatList, Dimensions, KeyboardAvoidingView, Platform} from "react-native";
import ChatHeader from "../../components/ChatHeader";
import ChatInputBar from "../../components/ChatInputBar";
import GetChatMessage from '../../API/GetChatMessage';
import CstmShadowView from '../../components/CstmShadowView';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from "react-native-image-viewing";
import Hyperlink from 'react-native-hyperlink';
import {GalleryIcon} from "../../Icons/GalleryIcon";
import {CameraIcon} from "../../Icons/CameraIcon";
import UpdateReadTimestamp from '../../API/UpdateReadTimestamp';
const windowHeight = Dimensions.get('window').height;

/**
 * Status
 *      0: Added to cart, price not decided
 *      1: Price Decided, but order not placed
 *      2: Order Placed, Order Status available
 *
 * Order Status
 *      0: Order just placed
 *      1: Production started
 *      2: Production Finished
 *      3: Out for delivery
 *      4: Order delivered
 *      5: Order opted for alteration
 *      6: Order fully completed
 *
 **/

// The actual chat view itself- a ScrollView of BubbleMessages, with an InputBar at the bottom, which moves with the keyboard
class ChatScreenIos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Messages: [],
            LoadingMessages: true,
            ImageToDisplay: [],
            ModalVisible: false,
            ImagePickerModalVisible: false,
            TextInput: '',
            TextInputKey: Math.random(),
            ImageSent: {},
            BucketInfo: {}
        }
        this.Page = 0;
        this.FlatListRef = React.createRef();
        this.props.Socket.on('ChatMessage', this.SocketListener);
        this.TimeOutArray = [];
        this.NewChatLoading = true;
    }

    SocketListener = (Message) => {
        if(Message.BucketID === this.props.route.params.BucketID) {
            this.state.Messages.unshift({
                Message,
                BucketMessagesID: Math.random(),
                Timestamp: 'now'
            });

            this.setState({Messages: this.state.Messages});
        }
    }

    componentDidMount = () => {
        GetChatMessage(this.props.route.params.BucketID, ++this.Page, this.props.AccessToken).then(Resp => {
            this.setState({Messages: Resp.Messages, BucketInfo: Resp.BucketInfo, LoadingMessages: false});
        }).catch(err => {
            console.log(err);
        });
    }

    componentWillUnmount = () => {
        this.props.Socket.off('ChatMessage', this.SocketListener);
        UpdateReadTimestamp(this.props.route.params.BucketID, this.props.AccessToken).catch(err => console.log(err));
        this.TimeOutArray.forEach(item => {
            clearTimeout(item);
        })
    }

    ChatOnEndReached = () => {
        if(this.NewChatLoading) {
            this.NewChatLoading = false;
            GetChatMessage(this.props.route.params.BucketID, ++this.Page, this.props.AccessToken).then(Resp => {
                if(Resp.Messages.length) {
                    this.setState({Messages: [...this.state.Messages, ...Resp.Messages]});
                    this.NewChatLoading = true;
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    NavigateBack = () => {
        this.props.navigation.goBack();
    }

    NavigateBrandProfile = () => {
        this.props.navigation.push('BrandProfile', {BrandID: this.props.route.params.BrandID})
    }

    NavigateBucket = () => {
        this.props.navigation.push('Bucket', {
            BucketID: this.props.route.params.BucketID,
            BrandID: this.props.route.params.BrandID,
            BrandName: this.props.route.params.Name,
            imageSource: this.props.route.params.imageSource
        })
    }

    RightText = ({TextInput, Timestamp}) => (
        <CstmShadowView style={{...styles.Msg, alignSelf: 'flex-end', paddingTop: 10}}>
            <Hyperlink linkDefault={ true }  linkStyle = {{ color: Colors.blue10 }}>
                <Text h1>{TextInput}</Text>
            </Hyperlink>
            <Text secondary h3 style={{alignSelf: 'flex-end'}}>{Timestamp}</Text>
        </CstmShadowView>
    )

    LeftText = ({TextInput, Timestamp}) => (
        <CstmShadowView style={{...styles.Msg, alignSelf: 'flex-start', paddingTop: 10}}>
            <Hyperlink linkDefault={ true } linkStyle = {{ color: Colors.blue10 }}>
                <Text h1>{TextInput}</Text>
            </Hyperlink>
            <Text h3 secondary>{Timestamp}</Text>
        </CstmShadowView>
    )

    CenterText = ({TextInput}) => (
        <View style={styles.CenterText} center>
            <Hyperlink linkDefault={ true } linkStyle = {{ color: Colors.blue10 }}>
                <Text center h3>{TextInput}</Text>
            </Hyperlink>
        </View>
    )

    LeftImage = ({Source, Timestamp}) => (
        <CstmShadowView style={{...styles.Msg, alignSelf: 'flex-start'}}>
            <TouchableOpacity onPress={() => {
                this.setState({
                    ImageToDisplay: Source,
                    ModalVisible: true
                })
            }}>
                <AnimatedImage
                    loader={<ActivityIndicator />}
                    containerStyle={{backgroundColor: Colors.secondary, marginBottom: 5}}
                    style={{height: 250, width:250, resizeMode: 'cover'}}
                    source={Source}
                />
            </TouchableOpacity>
            <Text h3 secondary>{Timestamp}</Text>
        </CstmShadowView>
    )

    RightImage = ({Source, Timestamp}) => (
        <CstmShadowView style={{...styles.Msg, alignSelf: 'flex-end'}}>
            <TouchableOpacity onPress={() => {
                this.setState({
                    ImageToDisplay: Source,
                    ModalVisible: true
                })
            }} activeOpacity={0.90}>
                <AnimatedImage
                    loader={<ActivityIndicator />}
                    containerStyle={{backgroundColor: Colors.secondary, marginBottom: 5}}
                    style={{height: 250, resizeMode: 'cover', width:250}}
                    source={Source}
                />
            </TouchableOpacity>
            <Text h3 secondary style={{alignSelf: 'flex-end'}}>{Timestamp}</Text>
        </CstmShadowView>
    )

    CloseModal = () => {
        this.setState({ModalVisible: false})
    }

    keyExtractor = (item) => item.BucketMessagesID.toString();

    handleImagePicker = (response) => {

        this.ImagePickerModalSwitchVisibility();

        const BucketMessagesID = Math.random().toString();

        this.state.ImageSent[BucketMessagesID] = false;

        this.setState({
            ImageSent: this.state.ImageSent
        });

        this.state.Messages.unshift({
            Message: {
                Type: 2,
                Sender: 1,
                ImageURL: `data:${response.mime};base64,${response.data}`,
            },
            BucketMessagesID,
            Timestamp: 'now'
        });

        this.setState({Messages: this.state.Messages});

        this.props.Socket.emit('SendMessage', {
            BucketID: this.props.route.params.BucketID,
            BrandID: this.props.route.params.BrandID,
            CustomerID: this.props.UserID,
            Type: 2,
            Base64Image: `data:${response.mime};base64,${response.data}`
        }, () => {
            console.log(BucketMessagesID, 'Image Sent');
            if(this.state && this.state.Messages) {
                this.state.ImageSent[BucketMessagesID] = true;
                this.setState({
                    ImageSent: this.state.ImageSent
                });
            }
        })

        this.ImageSendVerify(BucketMessagesID);
    }

    ImageSendVerify = (BucketMessagesID) => {
        this.TimeOutArray.push(setTimeout(() => {
            if(this.state && this.state.Messages) {
                if(!this.state.ImageSent[BucketMessagesID]) {
                    console.log(BucketMessagesID, 'Image Not Sent');
                }
            }
        }, 60000));
    }

    ShowGallery = async() => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            mediaType: 'photo',
            includeBase64: true,
            writeTempFile: false,
            forceJpg: true
        }).then(this.handleImagePicker).catch(err => {})
    }

    ShowCamera = async() => {
        ImagePicker.openCamera({
            width: 500,
            height: 500,
            cropping: true,
            mediaType: 'photo',
            includeBase64: true,
            writeTempFile: false,
            forceJpg: true
        }).then(this.handleImagePicker).catch(err => {})
    }

    SendMessage = () => {
        if(this.state.TextInput) {
            this.props.Socket.emit('SendMessage', {
                BucketID: this.props.route.params.BucketID,
                BrandID: this.props.route.params.BrandID,
                CustomerID: this.props.UserID,
                Type: 1,
                Text: this.state.TextInput
            });

            this.state.Messages.unshift({
                Message: {
                    Type: 1,
                    Sender: 1,
                    Text: this.state.TextInput,
                },
                BucketMessagesID: Math.random(),
                Timestamp: 'now'
            });

            this.setState({Messages: this.state.Messages});

            this.EmptyTextInput();
        }
    }

    ImagePickerModalSwitchVisibility = () => {
        this.setState({ImagePickerModalVisible: !this.state.ImagePickerModalVisible})
    }

    onChangeTextInput = (TextInput) => {
        this.setState({TextInput});
    }

    EmptyTextInput = () => {
        this.setState({TextInput: '', TextInputKey: Math.random()});
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageView
                    images={[this.state.ImageToDisplay]}
                    visible={this.state.ModalVisible}
                    onRequestClose={this.CloseModal}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.ImagePickerModalVisible}
                >
                    <CstmShadowView style={styles.Modal}>
                        <View flex row centerV marginT-10>
                            <Text flex-9 h1 secondary center>Choose Medium to Upload:</Text>
                            <TouchableOpacity
                                flex
                                onPress={this.ImagePickerModalSwitchVisibility}
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
                <ChatHeader
                    {...this.props.route.params}
                    BucketInfo={this.state.BucketInfo}
                    NavigateBack={this.NavigateBack}
                    NavigateBrandProfile={this.NavigateBrandProfile}
                    NavigateBucket={this.NavigateBucket}
                />
                {this.state.LoadingMessages ? <LoaderScreen /> :
                    <FlatList
                        data = {this.state.Messages}
                        inverted={true}
                        renderItem = {({item}) => {
                            switch(item.Message.Type) {
                                case 1 :
                                    return item.Message.Sender ?
                                        <this.RightText TextInput={item.Message.Text} Timestamp={item.Timestamp} />
                                        :
                                        <this.LeftText TextInput={item.Message.Text} Timestamp={item.Timestamp} />
                                case 2 :
                                    return item.Message.Sender ?
                                        <this.RightImage Source={{uri: item.Message.ImageURL}} Timestamp={item.Timestamp} />
                                        :
                                        <this.LeftImage Source={{uri: item.Message.ImageURL}} Timestamp={item.Timestamp} />
                                case 3 :
                                    return <this.CenterText TextInput={'Brand has decided the price'}/>
                                case 4 :
                                    return <this.CenterText TextInput={'You added the product in the cart'}/>
                                case 5 :
                                    return <this.CenterText TextInput={'You removed the product from the cart'}/>
                                case 6 :
                                    return <this.CenterText TextInput={'Brand removed the product from the cart'}/>
                                case 7 :
                                    return <this.CenterText TextInput={'You placed an order'}/>
                            }
                        }}
                        keyExtractor = {this.keyExtractor}
                        onEndReached = {this.ChatOnEndReached}
                    />
                }
                <ChatInputBar
                    DisplayImagePicker = {this.ImagePickerModalSwitchVisibility}
                    SendMessage = {this.SendMessage}
                    value = {this.state.InputText}
                    onChangeText={this.onChangeTextInput}
                    TextInputKey={this.state.TextInputKey}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    Msg: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        height: 'auto',
        minWidth: '25%',
        maxWidth: 270,
    },
    CenterText: {
        margin: 10,
        padding: 10,
        height: 'auto',
        minWidth: 150,
        maxWidth: 200,
        alignSelf: 'center',
        backgroundColor: Colors.shadow,
        borderRadius: 10
    },
    SafeAreaViewCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Modal:{
        flex:0.3,
        borderRadius: 20,
        marginHorizontal:30,
        paddingTop: 0,
        marginTop: windowHeight/2.5
    },
});

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken,
    Socket: state.Socket.Socket,
    UserID: state.Auth.UserID
});

export default connect(mapsStateToProps)(ChatScreenIos);
