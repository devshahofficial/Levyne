import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;
import MainNavigator from './navigations/NavigatorMain';
import { Provider } from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Colors } from 'react-native-ui-lib';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import analytics from '@react-native-firebase/analytics';

import './Style/Components';
import './Style/Colors';
import './Style/LoadTypography';
import './assets/globals';
import ReduxStore from './Redux/ReduxStore';

if (!__DEV__) {
	console.log = () => { };
	console.error = () => { };
	console.info = () => { };
	console.warn = () => { };
}

class MyStatusBar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			height: 20
		}
	}

	componentDidMount() {
		if(StatusBarManager.getHeight) {
			StatusBarManager.getHeight(({height}) => {
				this.setState({height: height - 10});
			})
		} else {
			this.setState({height: StatusBarManager.HEIGHT});
		}
	}

	render() {
		return (
			<View style={{ backgroundColor: this.props.backgroundColor, height: this.state.height}}>
				<StatusBar translucent {...this.props} />
			</View>
		)
	}
}

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

	navigationRef = React.createRef();

	render() {
		return (
			<>
				<Provider store={ReduxStore}>
					<MyStatusBar backgroundColor={'#FFFFFF'} barStyle="dark-content" />
					<NavigationContainer
						ref={this.navigationRef}
						onStateChange={() => {
							const currentRouteName = this.navigationRef.current.getCurrentRoute();
							analytics().logEvent(currentRouteName.name, currentRouteName.params).catch(console.log);
						}}
						theme={MyTheme}
					>
						<MainNavigator />
					</NavigationContainer>
				</Provider>
			</>
		);
	}
};