import React, { Component } from 'react'
import { StyleSheet, Dimensions,} from 'react-native'
import {View, Text, Avatar,TouchableOpacity} from 'react-native-ui-lib';
const deviceWidth = Dimensions.get("screen").width
import colors from "../assets/colors";


export default class ChatListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => {
                this.props.navigate('Chat', {
                    OtherBrandID : 1
                });
                //this.props.navigation.navigate('Chat');
            }}>
                <View style={styles.avatarView}>
                    <Avatar
                        style={styles.avatar}
                        source={this.props.item.profilePic}
                    />
                </View>
                <View style={styles.textView}>
                    <Text h1>{this.props.item.title}</Text>
                </View>
                <View style={styles.unreadView}>
                    <Text style={styles.unreadText} h1 >{this.props.item.unreadTexts}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: deviceWidth - 28,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 14,
        borderWidth:1,
        borderTopColor:colors.trivisionWhite,
        borderRightColor:colors.trivisionWhite,
        borderLeftColor:colors.trivisionWhite,
        borderBottomColor:colors.trivisionShadow,
        backgroundColor: colors.trivisionWhite,
    },
    avatarView: {
        flex: 0.2,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        height: 55,
        width: 55,
        borderRadius: 30,
    },
    textView:{
        flex:0.6,
    },
    text: {
        fontSize: 16,
        textAlign: 'left',
    },
    unreadView:{
        flex:0.2,
        alignItems:'center',
        justifyContent:'center',
    },
    unreadText: {
        backgroundColor: colors.trivisionWhite,
        borderColor: colors.trivisionPink,
        borderRadius: 20,
        borderWidth: 1,
        height: 30,
        width: 30,
        textAlign:'center',
        textAlignVertical:'center',
        color: colors.trivisionPink,
    }
})
