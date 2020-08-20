import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatListScreen from '../mockups/ChatListScreen';
import IndexScreen from '../mockups/Index';
import LoginScreen from '../mockups/Login';
import OTPScreen from '../mockups/OTP';
import HomeScreen from '../mockups/Home';
import MyProfile from '../mockups/MyProfile';
import BrandProfile from '../mockups/BrandProfile';
import SearchScreen from '../mockups/SearchScreen';
import InitialProfile from '../mockups/InitialProfile';
import ChatScreen from '../mockups/ChatScreen';
import ProductScreen from '../mockups/ProductScreen';
import {Colors} from "react-native-ui-lib";
import {HomeIcon} from '../Icons/HomeIcon';
import {ProfileIcon} from '../Icons/ProfileIcon';
import ChatIcon from '../Icons/ChatIcon';
import SettingsScreen from '../mockups/SettingsScreen';
import BookmarkProducts from '../mockups/BookmarkProducts';
import Help from '../mockups/Help';
import FabricScreen from '../mockups/FabricScreen';
import TermsConditionsScreen from '../mockups/TermsConditionsScreen';
import Advertise from '../mockups/Advertise';
import ToBeDesignedDetailed from '../mockups/ToBeDesignedDetailed';
import InternetConnection from "../mockups/InternetConnection";
import AppTour from "../mockups/AppTour";
import FabricUpload from "../mockups/FabricUpload";
import {CategoriesIcon} from "../Icons/CategoriesIcon";
import {CustomizeIcon} from "../Icons/CustomizeIcon";
import Cart from "../mockups/Cart";
import Notifications from "../mockups/Notifications";
import Menu from "../mockups/Menu";
import EditProfile from "../mockups/EditProfile";
import Customize from "../mockups/Customize";
import Bucket from "../mockups/Bucket";

const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

class BottomTabNavigation extends React.PureComponent {

	render() {
		return (
			<Tab.Navigator
				initialRouteName="HomeTab"
				header='none'
				tabBarOptions={{
					activeTintColor: Colors.primary,
					inactiveTintColor: Colors.grey40
				}}
			>
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					options={{
						tabBarIcon: ({ color}) => (
							<HomeIcon Color={color}/>
						),
					}}
				/>
				<Tab.Screen
					name="Categories"
					component={ChatListScreen}
					options={{
						tabBarIcon: ({ color}) => (
							<CategoriesIcon Color={color}/>
						),
					}}
				/>
				<Tab.Screen
					name="Customize"
					component={Customize}
					options={{
						tabBarIcon: ({ color}) => (
							<CustomizeIcon Color={color}/>
						),
					}}
				/>
				<Tab.Screen
					name="Messages"
					component={ChatListScreen}
					options={{
						tabBarIcon: ({ color}) => (
							<ChatIcon Color={color} IsAnyChatMessage={false}/>
						),
					}}
				/>
				<Tab.Screen
					name="Profile"
					component={MyProfile}
					options={{
						tabBarIcon: ({ color}) => (
							<ProfileIcon Color={color}/>
						),
					}}
				/>
			</Tab.Navigator>
		)
	}
}


class MainHomeStack extends React.PureComponent {
	render() {
		return (
			<HomeStack.Navigator
				headerMode='none'
				hideStatusBar={true}
			>
				<HomeStack.Screen name="Home" component={BottomTabNavigation}/>
				<HomeStack.Screen name="Customize" component={Customize} />
				<HomeStack.Screen name="Product" component={ProductScreen} />
                <HomeStack.Screen name="Fabric" component={FabricScreen} />
				<HomeStack.Screen name="MyProfile" component={MyProfile} />
				<HomeStack.Screen name="InitialProfile" component={InitialProfile} />
				<HomeStack.Screen name="BrandProfile" component={BrandProfile}/>
				<HomeStack.Screen name="EditProfile" component={EditProfile} />
				<HomeStack.Screen name="ToBeDesignedDetailed" component={ToBeDesignedDetailed} />
				<HomeStack.Screen name="Chat" component={ChatScreen} />
				<HomeStack.Screen name="ChatList" component={ChatListScreen} />
				<HomeStack.Screen name="BookMark" component={BookmarkProducts} />
				<HomeStack.Screen name="Search" component={SearchScreen} />
				<HomeStack.Screen name="Settings" component={SettingsScreen} />
				<HomeStack.Screen name='Help' component={Help}/>
				<HomeStack.Screen name='Bucket' component={Bucket}/>
				<HomeStack.Screen name='TermsAndCondition' component={TermsConditionsScreen}/>
				<HomeStack.Screen name='Advertise' component={Advertise}/>
				<HomeStack.Screen name='InternetConnection' component={InternetConnection}/>
				<HomeStack.Screen name='FabricUpload' component={FabricUpload}/>
				<HomeStack.Screen name='Cart' component={Cart}/>
				<HomeStack.Screen name='Notifications' component={Notifications}/>
				<HomeStack.Screen
                    name='Menu'
                    component={Menu}
                    options={{
						gestureDirection: "horizontal-inverted"
                    }}
                />
			</HomeStack.Navigator>
		)
	}
}

class NavigationAuth extends React.PureComponent {
	render() {
		return (
			<AuthStack.Navigator headerMode='none' hideStatusBar={true}
								 screenOptions={{
									 gestureEnabled : false
								 }}>
				<AuthStack.Screen name="Index" component={IndexScreen} />
				<AuthStack.Screen name="Login" component={LoginScreen} />
				<AuthStack.Screen name="OTP" component={OTPScreen} />
				<AuthStack.Screen name="EditProfileAuth" component={InitialProfile} />
                <AuthStack.Screen name="AppTour" component={AppTour} />
			</AuthStack.Navigator>
		)
	}
}

export default class NavigationMain extends React.PureComponent {
	render() {
		return (
			<MainStack.Navigator initialRouteName="Auth" headerMode='none' screenOptions={{
				gestureEnabled : false
			}}>
				<MainStack.Screen name="Auth" component={NavigationAuth} />
				<MainStack.Screen name="MainHomeStack" component={MainHomeStack}/>
			</MainStack.Navigator>
		)
	}
}
