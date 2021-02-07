import React from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import ActionSheet from './ActionSheet';


export default class ImagePickerModal extends React.PureComponent {

	render() {
        const actionItems = [
            {
                id: 1,
                label: 'Show Gallery',
                onPress: this.props.ShowGallery
            },
            {
                id: 2,
                label: 'Show Camera',
                onPress: this.props.ShowCamera
            }
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
