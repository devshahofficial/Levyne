import React from 'react';
import { Colors, View, TouchableOpacity, Text } from 'react-native-ui-lib';
import { StyleSheet, Dimensions, Modal } from 'react-native';
import CstmShadowView from '../../components/CstmShadowView';
import { CameraIcon } from '../../Icons/CameraIcon';
import { GalleryIcon } from '../../Icons/GalleryIcon';

const screenHeight = Dimensions.get('window').height;

export default class ImagePickerModal extends React.PureComponent {
	render() {
		return (
			<Modal
				animationType='slide'
				transparent={true}
				visible={this.props.modalVisible}
			>
				<CstmShadowView style={styles.Modal}>
					<View flex row centerV marginT-10>
						<Text flex-9 h1 secondary center>
							Choose Medium to Upload:
						</Text>
						<TouchableOpacity
							flex
							onPress={this.props.setModalVisible}
						>
							<Text primary hb1>
								X
							</Text>
						</TouchableOpacity>
					</View>
					<View row flex-5 marginH-30>
						<TouchableOpacity
							flex
							center
							onPress={this.props.ShowGallery}
						>
							<GalleryIcon size={28} Color={Colors.primary} />
							<Text h3 secondary marginT-10>
								Gallery
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							flex
							center
							onPress={this.props.ShowCamera}
						>
							<CameraIcon size={32} Color={Colors.primary} />
							<Text h3 secondary marginT-10>
								Camera
							</Text>
						</TouchableOpacity>
					</View>
				</CstmShadowView>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	Modal: {
		flex: 0.3,
		borderRadius: 20,
		marginHorizontal: 30,
		paddingTop: 0,
		marginTop: screenHeight / 2.5,
	},
});
