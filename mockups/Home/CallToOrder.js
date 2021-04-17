/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Button, Text } from 'react-native-ui-lib';
import CstmShadowView from '../../components/CstmShadowView';
import NavBarBack from '../../components/NavBarBack';
import { Linking } from 'react-native';

export default class CallToOrder extends React.Component {
	render() {
		return (
			<>
				<NavBarBack
					Title={'Call to place an order'}
					Navigation={this.props.navigation.goBack}
				/>
				<View flex>
					<View marginH-20>
						<Text marginV-15 h1 center>
							You can now quickly call us to place an order. Share
							your design plan, and we'll take care of the rest.
						</Text>
						<CstmShadowView style={{ marginBottom: 10 }}>
							<Button
								onPress={() =>
									Linking.openURL('tel:+91 9819 077182')
								}
								h1
								label={'Call us'}
								flex
							/>
						</CstmShadowView>
					</View>
				</View>
			</>
		);
	}
}
