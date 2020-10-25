import React from 'react';
import {StatusBar, StyleSheet, View, Platform} from 'react-native';
import MainNavigator from './navigations/NavigatorMain';
import {Provider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import './Style/Components';
import './Style/Colors';
import ReduxStore from './Redux/ReduxStore';

const MyStatusBar = ({backgroundColor, ...props}) => (
	<View style={[styles.statusBar, { backgroundColor }]}>
		<StatusBar translucent backgroundColor={backgroundColor} {...props} />
	</View>
);

export default class App extends React.Component {
	render() {
		return (
			<>
				<Provider store={ReduxStore}>
					<MyStatusBar backgroundColor={'#FFFFFF'} barStyle="dark-content" />
					<NavigationContainer>
						<MainNavigator IsAnyChatMessage={true} />
					</NavigationContainer>
				</Provider>
			</>
		);
	}
};

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 45 : StatusBar.currentHeight;

const styles = StyleSheet.create({
	statusBar: {
		height: STATUSBAR_HEIGHT,
	},
});
