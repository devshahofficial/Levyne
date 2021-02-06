import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import MainNavigator from './navigations/NavigatorMain';
import {Provider} from 'react-redux';
import constants from './assets/constants';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {Colors} from 'react-native-ui-lib';

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

import './Style/Components';
import './Style/Colors';
import './Style/LoadTypography';
import './assets/globals';
import ReduxStore from './Redux/ReduxStore';

if (!__DEV__) {
	console.log = () => {};
	console.error = () => {};
	console.info = () => {};
	console.warn = () => {};
}

/**
 * @typedef {{ backgroundColor: string }} MyObj
 * @param {any & MyObj} props
 */
const MyStatusBar = ({backgroundColor, ...props}) => (
	<View style={[styles.statusBar, { backgroundColor }]}>
		<StatusBar translucent backgroundColor={backgroundColor} {...props} />
	</View>
);


PushNotification.configure({

	onNotification: (notification) => {

		// @ts-ignore
		global.NotificationObject = notification.data;

		notification.finish(PushNotificationIOS.FetchResult.NoData);
	},

	requestPermissions: false,
});

const MyTheme = {
	...DefaultTheme,
	colors: {
	  ...DefaultTheme.colors,
	  background: Colors.white
	},
  };

export default class App extends React.Component {
	render() {
		return (
			<>
				<Provider store={ReduxStore}>
					<MyStatusBar backgroundColor={'#FFFFFF'} barStyle="dark-content" />
					<NavigationContainer theme={MyTheme}>
						<MainNavigator IsAnyChatMessage={true} />
					</NavigationContainer>
				</Provider>
			</>
		);
	}
};

const styles = StyleSheet.create({
	statusBar: {
		height: constants.StatusBarHeight,
	},
});
