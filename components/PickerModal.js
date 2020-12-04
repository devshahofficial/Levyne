import React from 'react';
import { Modal, TouchableOpacity as RNView } from 'react-native';
import ActionSheet from './Modal/ActionSheet';


export default class ImagePickerModal extends React.PureComponent {

	render() {
		return (
			<Modal
				animationType='fade'
				transparent={true}
                visible={this.props.modalVisible}
                presentationStyle={'overFullScreen'}
			>
                <RNView
                    style={{
                        flex:1,
                        flexDirection: 'column-reverse',
                        backgroundColor: 'rgba(52, 52, 52, 0.8)'
                    }}
                    onPress={this.props.setModalVisible}
                    activeOpacity={1}
                >
                    <ActionSheet
                        actionItems={this.props.ActionItems}
                        onCancel={this.props.setModalVisible}
                    />
                </RNView>
			</Modal>
		);
	}
}
