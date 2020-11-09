import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexScreen from '../mockups/Index';
import LoginScreen from '../mockups/Login';
import OTPScreen from '../mockups/OTP';
import HomeScreen from '../mockups/Home/Home';
import MyProfile from '../mockups/Profile/MyProfile';
import BrandProfile from '../mockups/BrandProfile';
import SearchScreen from '../mockups/SearchScreen';
import InitialProfile from '../mockups/InitialProfile';
import ChatScreen from '../mockups/ChatSystem/ChatScreen';
import ProductScreen from '../mockups/ProductScreen';
import {Colors} from "react-native-ui-lib";
import {HomeIcon} from '../Icons/HomeIcon';
import {ProfileIcon} from '../Icons/ProfileIcon';
import SettingsScreen from '../mockups/SettingsScreen';
import BookmarkProducts from '../mockups/Home/BookmarkProducts';
import Help from '../mockups/Profile/Help';
import FabricScreen from '../mockups/FabricScreen';
import TermsConditionsScreen from '../mockups/Profile/TermsConditionsScreen';
import InternetConnection from "../mockups/InternetConnection";
import AppTour from "../mockups/AppTour";
import Cart from "../mockups/Home/Cart";
import Notifications from "../mockups/Home/Notifications";
import Menu from "../mockups/Home/Menu";
import EditProfile from "../mockups/Profile/EditProfile";
import Customize from "../mockups/Customize";
import Bucket from "../mockups/Home/Bucket";
import ProductAddToCart from '../mockups/ProductAddToCart';
import FabricAddToCart from "../mockups/FabricAddToCart";
import CheckOut from "../mockups/CheckOut";
import MyFashionDesigners from "../mockups/Profile/MyFashionDesigners";
import MyFits from "../mockups/Profile/MyFits";
import FAQscreen from "../mockups/Profile/FAQscreen";
import MyOrders from "../mockups/Profile/MyOrders";
import BrandList from "../mockups/BrandList";
import MyOrdersDetailed from "../mockups/Profile/MyOrdersDetailed";
import LevyneIcon from "../Icons/LevyneIcon";
import {TailorIcon} from "../Icons/Secondary/TailorIcon";
import {OrdersIcon} from "../Icons/OrdersIcon";
import {CustomizeIcon} from "../Icons/CustomizeIcon";
import ProductDetailsPage from '../mockups/Home/ProductDetailsPage';

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
					name="Levyne"
					component={MyProfile}
					options={{
						tabBarIcon: ({ color}) => (
							<LevyneIcon Color={color} size={24}/>
						),
					}}
				/>
				<Tab.Screen
					name="Customize"
					component={Customize}
					options={{
						tabBarIcon: ({ color}) => (
							<CustomizeIcon size={28} Color={color}/>
						),
					}}
				/>
				<Tab.Screen
					name="My Wardrobe"
					component={MyProfile}
					options={{
						tabBarIcon: ({ color}) => (
							<OrdersIcon Color={color} IsAnyChatMessage={false}/>
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
				<HomeStack.Screen name="FAQs" component={FAQscreen} />
				<HomeStack.Screen name="FabricAddToCart" component={FabricAddToCart} />
				<HomeStack.Screen name="MyProfile" component={MyProfile} />
				<HomeStack.Screen name="InitialProfile" component={InitialProfile} />
				<HomeStack.Screen name="BrandProfile" component={BrandProfile}/>
				<HomeStack.Screen name="EditProfile" component={EditProfile} />
				<HomeStack.Screen name="Chat" component={ChatScreen} />
				<HomeStack.Screen name="BookMark" component={BookmarkProducts} />
				<HomeStack.Screen name="Search" component={SearchScreen} />
				<HomeStack.Screen name="Settings" component={SettingsScreen} />
				<HomeStack.Screen name='Help' component={Help}/>
				<HomeStack.Screen name='Bucket' component={Bucket}/>
				<HomeStack.Screen name='MyFashionDesigners' component={MyFashionDesigners}/>
				<HomeStack.Screen name='ProductAddToCart' component={ProductAddToCart}/>
				<HomeStack.Screen name='TermsAndCondition' component={TermsConditionsScreen}/>
				<HomeStack.Screen name='InternetConnection' component={InternetConnection}/>
				<HomeStack.Screen name='Cart' component={Cart}/>
				<HomeStack.Screen name='Notifications' component={Notifications}/>
				<HomeStack.Screen name='MyFits' component={MyFits}/>
				<HomeStack.Screen name='MyOrders' component={MyOrders}/>
				<HomeStack.Screen name='CheckOut' component={CheckOut}/>
				<HomeStack.Screen name='BrandList' component={BrandList} />
				<HomeStack.Screen name='MyOrdersDetailed' component={MyOrdersDetailed}/>
				<HomeStack.Screen name='ProductDetailsPage' component={ProductDetailsPage}/>
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
            <AuthStack.Navigator
                headerMode='none'
                hideStatusBar={true}
                screenOptions={{
                    gestureEnabled : false
                }
            }>
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
