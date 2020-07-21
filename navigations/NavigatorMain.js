import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatListScreen from '../mockups/ChatListScreen';
import IndexScreen from '../mockups/Index';
import LoginScreen from '../mockups/Login';
import OTPScreen from '../mockups/OTP';
import HomeScreen from '../mockups/Home';
import ProductUpload from '../mockups/ProductUpload';
import MyProfile from '../mockups/MyProfile';
import BrandProfile from '../mockups/BrandProfile';
import SearchScreen from '../mockups/SearchScreen';
import EditProfile from '../mockups/EditProfile';
import ChatScreen from '../mockups/ChatScreen';
import DocumentUpload from '../mockups/DocumentUpload';
import Pending from '../mockups/Pending';
import ProductScreen from '../mockups/ProductScreen';
import Colors from '../Style/Colors';
import {HomeIcon} from '../Icons/HomeIcon';
import {ProfileIcon} from '../Icons/ProfileIcon';
import ChatIcon from '../Icons/ChatIcon';
import SettingsScreen from '../mockups/SettingsScreen';
import BookmarkProducts from '../mockups/BookmarkProducts';
import Help from '../mockups/Help';
import TermsConditionsScreen from '../mockups/TermsConditionsScreen';
import Advertise from '../mockups/Advertise';
import {OrdersIcon} from '../Icons/OrdersIcon';
import ToBeDesignedDetailed from '../mockups/ToBeDesignedDetailed';
import InternetConnection from "../mockups/InternetConnection";
import AppTour from "../mockups/AppTour";
import Upload from "../mockups/Upload";
import FabricUpload from "../mockups/FabricUpload";
import {CategoriesIcon} from "../Icons/CategoriesIcon";
import {CustomizeIcon} from "../Icons/CustomizeIcon";
import Cart from "../mockups/Cart";
import Notifications from "../mockups/Notifications";
import Menu from "../mockups/Menu";

const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();


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
					component={Upload}
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
				<HomeStack.Screen name="ProductUpload" component={ProductUpload} />
				<HomeStack.Screen name="Product" component={ProductScreen} />
				<HomeStack.Screen name="MyProfile" component={MyProfile} />
				<HomeStack.Screen name="BrandProfile" component={BrandProfile}/>
				<HomeStack.Screen name="EditProfile" component={EditProfile} />
				<HomeStack.Screen name="ToBeDesignedDetailed" component={ToBeDesignedDetailed} />
				<HomeStack.Screen name="Chat" component={ChatScreen} />
				<HomeStack.Screen name="ChatList" component={ChatListScreen} />
				<HomeStack.Screen name="BookMark" component={BookmarkProducts} />
				<HomeStack.Screen name="Search" component={SearchScreen} />
				<HomeStack.Screen name="Settings" component={SettingsScreen} />
				<HomeStack.Screen name="Upload" component={ProductUpload} />
				<HomeStack.Screen name='Help' component={EditProfile}/>
				<HomeStack.Screen name='TermsAndCondition' component={TermsConditionsScreen}/>
				<HomeStack.Screen name='Advertise' component={Advertise}/>
				<HomeStack.Screen name='InternetConnection' component={InternetConnection}/>
				<HomeStack.Screen name='FabricUpload' component={FabricUpload}/>
				<HomeStack.Screen name='Cart' component={Cart}/>
				<HomeStack.Screen name='Notifications' component={Notifications}/>
				<HomeStack.Screen name='Menu' component={Menu}/>
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
				<AuthStack.Screen name="EditProfileAuth" component={EditProfile} />
				<AuthStack.Screen name="DocumentUpload" component={DocumentUpload} />
				<AuthStack.Screen name="Pending" component={Pending} />
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
