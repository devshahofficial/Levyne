import React, { Component } from 'react';
import {connect} from "react-redux";
import {Colors, View} from "react-native-ui-lib";
import {SafeAreaView, StyleSheet} from "react-native";
import ChatHeader from "../../components/ChatHeader";
import ChatInputBar from "../../components/ChatInputBar";
import ConfirmModal from "../../components/ConfirmModal";
import GetChatMessage from '../../API/GetChatMessage';

// The actual chat view itself- a ScrollView of BubbleMessages, with an InputBar at the bottom, which moves with the keyboard
class ChatScreen extends Component {

	constructor(props) {
		super(props)
		this.state = {
            Messages: []
        }
        this.Page = 0;

        this.props.Socket.on('ChatMessage', this.SocketListener);
    }
    
    SocketListener = (Message) => {
        if(Message.BucketID === this.props.route.params.BucketID) {
            console.log(Message);
        }
    }

    componentDidMount = () => {
        GetChatMessage(this.props.route.params.BucketID, ++this.Page, this.props.AccessToken).then(Messages => {
            console.log(Messages);
            //this.setState({Messages});
        }).catch(err => {
            console.log(err);
        });
    }


    componentWillUnmount = () => {
        this.props.Socket.off('ChatMessage', this.SocketListener);
    }
    

    Navigation = () => {
        this.props.navigation.goBack();
    }
	render() {
	    return (
            <SafeAreaView style={styles.container}>
                <View flex>
                    <ChatHeader
                        {...this.props.route.params}
                        Navigation={this.Navigation}
                    />
                </View>
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
});

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken,
    Socket: state.Socket.Socket
});

export default connect(mapsStateToProps)(ChatScreen);