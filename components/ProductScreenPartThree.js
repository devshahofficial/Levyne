import React from 'react';
import {Dimensions, ActivityIndicator} from 'react-native';
import {View, Text, Colors, AnimatedImage, TouchableOpacity} from 'react-native-ui-lib';
import ReviewForProducts from "./ReviewForProducts";

const deviceWidth = Dimensions.get('window').width;

export default class ProductScreenPartThree extends React.PureComponent {
	render() {
		return (
			<View marginT-20 marginH-15>
				{this.props.EmbroideryImage && (
					<View marginB-20>
						<Text hb1 marginB-10>
							Embroidery Overlook
						</Text>
						<TouchableOpacity activeOpacity={0.8} onPress={this.props.EmbroideryDisplayModal}>
							<AnimatedImage
								containerStyle={{backgroundColor: Colors.blue60}}
								loader={<ActivityIndicator />}
								style={{width: deviceWidth, height: 200, marginLeft: -15}}
								source={{
									uri: this.props.EmbroideryImage,
								}}
							/>
						</TouchableOpacity>
					</View>
				)}

				<Text hb1>
					Disclaimer
				</Text>
				<Text h1>
					Product colour may slightly vary due to photographic lighting sources or your monitor/screen setting.
				</Text>

				<Text hb1 marginV-20>
					Reviews
				</Text>
				<ReviewForProducts Reviews={this.props.Reviews} />
			</View>
		);
	}
}
