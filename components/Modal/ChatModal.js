import React from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import ActionSheet from './ActionSheet';


export default class ChatModal extends React.PureComponent {

    render() {
        const actionItems = [
            {
                id: 1,
                label: 'Confirm',
                onPress: this.props.ConfirmOrder
            },
        ];
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
                >
                    <ActionSheet
                        actionItems={actionItems}
                        onCancel={this.props.setModalVisible}
                    />
                </TouchableOpacity>
            </Modal>
        );
    }
}
