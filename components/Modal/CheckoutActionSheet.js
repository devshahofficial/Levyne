import React from 'react';
import { Modal } from 'react-native';
import {TouchableOpacity,View,Text,Button,Colors} from 'react-native-ui-lib';
import {CancelIcon} from "../../Icons/Cancel";
import CstmShadowView from "../CstmShadowView";


export default class ChatModal extends React.PureComponent {

    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.modalVisible}
                presentationStyle={'overFullScreen'}
            >
                <TouchableOpacity
                    style={{
                        flex:1,
                        flexDirection: 'column-reverse',
                        backgroundColor: 'rgba(52, 52, 52, 0.8)'
                    }}
                    onPress={this.props.setModalVisible}
                    activeOpacity={1}
                />
                <View padding-20>
                    <TouchableOpacity onPress={this.props.setModalVisible} right>
                        <CancelIcon Color={Colors.secondary} size={22}/>
                    </TouchableOpacity>
                    <Text marginT-20 h1 secondary center>Confirm your Checkout?</Text>
                    <CstmShadowView style={{width:150, alignSelf:'center'}}>
                        <Button
                            flex label={'Confirm'}
                            onPress={this.props.CheckOut}
                        />
                    </CstmShadowView>
                </View>
            </Modal>
        );
    }
}
