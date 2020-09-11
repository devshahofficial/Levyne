import React, { Component } from 'react';
import { StyleSheet, ScrollView, Keyboard, SafeAreaView } from 'react-native';
import {View, ActionSheet} from 'react-native-ui-lib';
import MessageBubble from '../../components/MessageBubble'
import ChatInputBar from '../../components/ChatInputBar'
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import ChatHeader from "../../components/ChatHeader";
import SendChatMessage from '../../API/SendChatMessage';
import GetChatMessage from '../../API/GetChatMessage';


// The actual chat view itself- a ScrollView of BubbleMessages, with an InputBar at the bottom, which moves with the keyboard
class ChatScreen extends Component {

	constructor(props) {
		super(props);
        this.Socket = this.props.Socket;
		this.state = {
            messages: [],
            BrandID : this.props.route.params.BrandID,
            BrandName : this.props.route.params.BrandName,
            inputBarText: '',
            BrandImage : this.props.route.params.BrandImage,
            SelfBrandID : this.props.BrandID,
            showActionSheet : false,
        }
	}

	//fun keyboard stuff- we use these to get the end of the ScrollView to "follow" the top of the InputBar as the keyboard rises and falls
	async componentDidMount() {
        setTimeout(() => {
            this.scrollView.scrollToEnd({ animated: true });
        }, 500);
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
        this.messages = await GetChatMessage(this.state.SelfBrandID, this.state.BrandID) || [];
        if(this.props.route.params.ProductID) {
            var ReferenceID = Math.random();
            var Timestamp = {
                timeHours: new Date().getHours(),
                timeMinutes: new Date().getMinutes()
            }
            this.setState({
                messages : [...this.messages, {
                    Direction: "right",
                    Type: 3,
                    ProductImage: this.props.route.params.ProductImage,
                    ProductName: this.props.route.params.ProductName,
                    ProductShortDescription : this.props.route.params.ProductShortDescription,
                    ProductPrice : this.props.route.params.ProductPrice,
                    ProductID : this.props.route.params.ProductID,
                    ReferenceID : ReferenceID,
                    Timestamp: Timestamp
                }]
            })
			SendChatMessage(
                this.Socket,
                this.props.setChatList,
                this.state.SelfBrandID,
                this.messages,
                true,
                this.state.BrandID,
                this.state.BrandName,this.state.BrandImage,
                ReferenceID, Timestamp,
                3,
                null,
                null,
                null,
                this.props.route.params.ProductID,
                {
                    ProductImage: this.props.route.params.ProductImage,
                    ProductName: this.props.route.params.ProductName,
                    ProductShortDescription : this.props.route.params.ProductShortDescription,
                    ProductPrice : this.props.route.params.ProductPrice,
                    ReferenceID : ReferenceID,
                    Direction : 'right',
                    Type : 3
                }
            );
        }
        if(this.props.route.params.ChatID) {
            GetChatMessage(null, null, this.props.route.params.ChatID).then(resp => {
                this.setState({
                    messages : resp,
                })
            })
        }
	}

	componentWillUnmount() {
		Keyboard.removeListener('keyboardDidShow', this.keyboardDidShow.bind(this))
		Keyboard.removeListener('keyboardDidHide', this.keyboardDidHide.bind(this));
	}
    keyboardDidShow() {
		this.scrollView.scrollToEnd();
	}
	keyboardDidHide() {
		this.scrollView.scrollToEnd();
	}


	onCameraButtonPressed = () => {
		this.setState({
			showActionSheet : true
		})
    }

    HandlePickerResp = async (response) => {
        if (!response.didCancel && !response.error) {
            var ReferenceID = Math.random();
            var Timestamp = {
                timeHours: new Date().getHours(),
                timeMinutes: new Date().getMinutes()
            }
            this.state.messages.push({
                Direction: "right",
                Type: 2,
                Image: response.uri,
                ReferenceID : ReferenceID,
                Timestamp: Timestamp,
            })
            var PreviousMsgState = this.state.messages;
            this.setState({
                messages: this.state.messages,
                showActionSheet: false
            });
            setTimeout(() => {
                this.scrollView.scrollToEnd({ animated: true });
            }, 500);
            SendChatMessage(this.Socket, null, this.state.SelfBrandID, PreviousMsgState, false, this.state.BrandID,this.state.BrandName, this.state.BrandImage, ReferenceID, Timestamp, 2, null, response.data, response.type);
        }
    }

	ShowGallery = () => {
        ImagePicker.launchImageLibrary({
            mediaType : 'photo',
            allowsEditing : true,
            noData : false,
            storageOptions : {
                skipBackup : true
            }
        },this.HandlePickerResp)
    }

    ShowCamera = () => {
        ImagePicker.launchCamera({
            mediaType : 'photo',
            allowsEditing : true,
            noData : false,
            storageOptions : {
                skipBackup : true
            }
        },this.HandlePickerResp)
    }

	onSendTextMessage = () => {
		if (this.state.inputBarText) {
            var ReferenceID = Math.random();
            var Timestamp = {
                timeHours: new Date().getHours(),
                timeMinutes: new Date().getMinutes()
            }
            SendChatMessage(this.Socket, null, this.state.SelfBrandID, this.state.messages, false, this.state.BrandID, this.state.BrandName, this.state.BrandImage, ReferenceID, Timestamp, 1, this.state.inputBarText);
			this.state.messages.push({
				Direction: "right",
				Type: 1,
				Image: null,
				Text: this.state.inputBarText,
				ReferenceID : ReferenceID,
				Timestamp: Timestamp
			});
			this.setState({
				messages: this.state.messages,
				inputBarText: ''
            });
            setTimeout(() => {
                this.scrollView.scrollToEnd({ animated: true });
            }, 500);
        }
	}


	//This event fires way too often.
	//We need to move the last message up if the input bar expands due to the user's new message exceeding the height of the box.
	//We really only need to do anything when the height of the InputBar changes, but AutogrowInput can't tell us that.
	//The real solution here is probably a fork of AutogrowInput that can provide this information.

	render() {
        var messages = [];
		this.state.messages.forEach(function (message, index) {
			messages.push(
				<MessageBubble
					key={index.toString()}
					Direction={message.Direction}
					Type={message.Type}
					Image={message.Image}
					Text={message.Text}
					Timestamp={message.Timestamp || {timeHours : 12, timeMinutes : 34}}
					ProductPrice={message.ProductPrice}
					ProductImage={message.ProductImage}
					ProductName={message.ProductName}
					ProductShortDescription={message.ProductShortDescription}
					ProductPrice={message.ProductPrice}
				/>
			);
        });
		return (
            <SafeAreaView style={{flex: 1}}>
                <View flex style={styles.outer}>
                    <ChatHeader BrandName={this.props.route.params.BrandName} BrandIcon={this.state.BrandImage}/>
                    <ScrollView ref={(ref) => { this.scrollView = ref }} style={styles.messages}>{messages}</ScrollView>
                    <ChatInputBar
                        onSendPressed={this.onSendTextMessage}
                        onCameraButtonPressed={this.onCameraButtonPressed}
                        onSizeChange={this.onInputSizeChange}
                        onChangeText={(text) => this.setState({inputBarText : text})}
                        text={this.state.inputBarText}
                    />
                    <ActionSheet
                        useSafeArea
                        cancelButtonIndex={2}
                        options={[
                            {label: 'Camera', onPress: this.ShowCamera},
                            {label: 'Gallery', onPress: this.ShowGallery},
                            {label: 'Cancel', onPress: () => {}},
                        ]}
                        visible={this.state.showActionSheet}
                        onDialogDismissed={() => this.setState({showActionSheet: false})}
                    />
                </View>
            </SafeAreaView>
		);
	}
}
const styles = StyleSheet.create({
	outer: {
		justifyContent: 'space-between',
	},

	messages: {
		flex: 1
	},

})

const mapsStateToProps = state => ({
	AccessToken : state.Auth.AccessToken,
	Socket : state.Socket.Socket,
    BrandID : state.Auth.BrandID
});

const mapDispatchToProps = dispatch => {
	return {
        setChatList : (ChatList) => dispatch({type: 'setChatList', value: ChatList}),
	}
}


export default connect(mapsStateToProps, mapDispatchToProps)(ChatScreen);
