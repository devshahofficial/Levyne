import React, { PureComponent } from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-ui-lib';
import {ShareIcon} from "../Icons/ShareIcon";
import {CameraIcon} from "../Icons/CameraIcon";
import CstmInput from "./input";
import CstmShadowView from "./CstmShadowView";
import Colors from '../Style/Colors';
//The bar at the bottom with a textbox and a send button.
export default class ChatInputBar extends PureComponent {

    render() {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom:5, marginRight:5, marginLeft:5,}}>
                <View style={{flex:5,marginHorizontal:5}}>
                    <CstmInput
                        placeholder='Type a message...'
                        value={this.props.text}
                        onChangeText={(text) => this.props.onChangeText(text)}
                        editable
                        multiline={true}
                    />
                </View>
                <CstmShadowView style={{flex:1, marginRight: 5, marginLeft: 5}}>
                    <TouchableOpacity onPress={this.props.onCameraButtonPressed} flex centerV centerH marginB-4 style={{borderRadius: 50}}><CameraIcon size={27} Color={Colors.primary}/></TouchableOpacity>
                </CstmShadowView>
                <CstmShadowView style={{flex:1, marginLeft: 5, marginRight: 5}}>
                    <TouchableOpacity onPress={this.props.onSendPressed} flex centerV centerH marginB-4 style={{borderRadius: 50}}><ShareIcon Color={Colors.primary}/></TouchableOpacity>
                </CstmShadowView>
            </View>
        );
    }
}