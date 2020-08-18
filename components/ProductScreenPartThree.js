import React from 'react';
import {Dimensions, ActivityIndicator} from 'react-native';
import {View, Text, Colors, AnimatedImage} from 'react-native-ui-lib';

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
						<AnimatedImage
                            containerStyle={{backgroundColor: Colors.blue60}}
                            loader={<ActivityIndicator />}
							style={{width: deviceWidth, height: 200, marginLeft: -15}}
							source={{
								uri: this.props.EmbroideryImage,
							}}
						/>
					</View>
				)}
				<View
					marginT-10
					center
					style={{
						marginLeft: -15,
						height: 50,
						backgroundColor: Colors.shadow,
						width: deviceWidth,
					}}>
					<Text h1>Terms and Condition apply.</Text>
				</View>
			</View>
		);
	}
}
