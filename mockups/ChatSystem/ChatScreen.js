import React, { Component } from 'react';
import {connect} from "react-redux";
import {Colors, Text, AnimatedImage, View, LoaderScreen, TouchableOpacity, Modal} from "react-native-ui-lib";
import {SafeAreaView, StyleSheet, ActivityIndicator, FlatList} from "react-native";
import ChatHeader from "../../components/ChatHeader";
import ChatInputBar from "../../components/ChatInputBar";
import ConfirmModal from "../../components/ConfirmModal";
import GetChatMessage from '../../API/GetChatMessage';
import CstmShadowView from '../../components/CstmShadowView';
import ImageView from "react-native-image-viewing";
import Hyperlink from 'react-native-hyperlink';

// The actual chat view itself- a ScrollView of BubbleMessages, with an InputBar at the bottom, which moves with the keyboard
class ChatScreen extends Component {

	constructor(props) {
		super(props)
		this.state = {
            Messages: [],
            LoadingMessages: true,
            ImageToDisplay: [],
            ModalVisible: false
        }
        this.Page = 0;
        this.FlatListRef = React.createRef();
        this.props.Socket.on('ChatMessage', this.SocketListener);

	}

    SocketListener = (Message) => {
        if(Message.BucketID === this.props.route.params.BucketID) {
            console.log("ChatList", Message);
        }
    }

    componentDidMount = () => {
        GetChatMessage(this.props.route.params.BucketID, ++this.Page, this.props.AccessToken).then(Messages => {
            this.setState({Messages, LoadingMessages: false});
        }).catch(err => {
            console.log(err);
        })
    }

    componentWillUnmount = () => {
        this.props.Socket.off('ChatMessage', this.SocketListener);
    }

    Navigation = () => {
        this.props.navigation.goBack();
    }

    RightText = ({TextInput, Timestamp}) => (
        <CstmShadowView style={{...styles.Msg, alignSelf: 'flex-end'}}>
            <Hyperlink linkDefault={ true }  linkStyle = {{ color: Colors.blue10 }}>
                <Text>{TextInput}</Text>
            </Hyperlink>
            <Text secondary style={{alignSelf: 'flex-end'}}>{Timestamp}</Text>
        </CstmShadowView>
    )

    LeftText = ({TextInput, Timestamp}) => (
        <CstmShadowView style={{...styles.Msg, alignSelf: 'flex-start'}}>
            <Hyperlink linkDefault={ true } linkStyle = {{ color: Colors.blue10 }}>
                <Text>{TextInput}</Text>
            </Hyperlink>
            <Text secondary>{Timestamp}</Text>
        </CstmShadowView>
    )

    CenterText = ({TextInput}) => (
        <View style={styles.CenterText}>
            <Hyperlink linkDefault={ true } linkStyle = {{ color: Colors.blue10 }}>
                <Text>{TextInput}</Text>
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
            <Text secondary>{Timestamp}</Text>
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
            <Text secondary style={{alignSelf: 'flex-end'}}>{Timestamp}</Text>
        </CstmShadowView>
    )

    CloseModal = () => {
        this.setState({ModalVisible: false})
    }

    keyExtractor = (item) => item.BucketMessagesID.toString();

	render() {
	    return (
            <SafeAreaView style={styles.container}>
                <ImageView
                    images={[this.state.ImageToDisplay]}
                    visible={this.state.ModalVisible}
                    onRequestClose={this.CloseModal}
                />
                <ChatHeader
                    {...this.props.route.params}
                    Navigation={this.Navigation}
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
                                default:
                                    return <this.CenterText TextInput={item.Message.Text}/>
                            }
                        }}
                        keyExtractor = {this.keyExtractor}
                    />
                }
                <ConfirmModal/>
                <ChatInputBar/>
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
        minWidth: 200,
        alignItems: 'center',
        maxWidth: 300,
        alignSelf: 'center',
        backgroundColor: Colors.shadow,
        borderRadius: 100
    },
    SafeAreaViewCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken,
    Socket: state.Socket.Socket,
    UserID: state.Auth.UserID
});

export default connect(mapsStateToProps)(ChatScreen);
