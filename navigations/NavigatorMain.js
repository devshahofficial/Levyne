import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexScreen from '../mockups/Auth/Index';
// @ts-ignore
import LoginScreen from '../mockups/Auth/Login';
// @ts-ignore
import OTPScreen from '../mockups/Auth/OTP';
import HomeScreen from '../mockups/Home/Home';
import MyProfile from '../mockups/Profile/MyProfile';
import BrandProfile from '../mockups/Brand/BrandProfile';
import SearchScreen from '../mockups/Search/SearchScreen';
import ChatListScreen from '../mockups/ChatSystem/ChatListScreen';
// @ts-ignore
import InitialProfile from '../mockups/Auth/InitialProfile';
// @ts-ignore
import ChatScreen from '../mockups/ChatSystem/ChatScreen';
import ProductScreen from '../mockups/Products/ProductScreen';
import { Colors } from 'react-native-ui-lib';
import { HomeIcon } from '../Icons/HomeIcon';
import { ProfileIcon } from '../Icons/ProfileIcon';
import BookmarkProducts from '../mockups/Products/BookmarkProducts';
import Help from '../mockups/Extras/Help';
import FabricScreen from '../mockups/Fabrics/FabricScreen';
import TermsConditionsScreen from '../mockups/Extras/TermsConditionsScreen';
import InternetConnection from '../mockups/Extras/InternetConnection';
import Cart from '../mockups/Orders/Cart';
import Notifications from '../mockups/Home/Notifications';
// @ts-ignore
import EditProfile from '../mockups/Profile/EditProfile';
import Customize from '../mockups/Products/Customize';
import Bucket from '../mockups/Orders/Bucket';
import ProductAddToCart from '../mockups/Orders/ProductAddToCart';
import CheckOut from '../mockups/Orders/CheckOut';
import MyFashionDesigners from '../mockups/Brand/MyFashionDesigners';
// @ts-ignore
import MyFits from '../mockups/Profile/MyFits';
import FAQscreen from '../mockups/Extras/FAQscreen';
import MyOrders from '../mockups/Orders/MyOrders';
import BrandList from '../mockups/Brand/BrandList';
import BrandListForChat from '../mockups/Brand/BrandListForChat';
import OrderScreen from '../mockups/Orders/OrderScreen';
import ChatIcon from '../Icons/ChatIcon';
import { OrdersIcon } from '../Icons/OrdersIcon';
import { CustomizeIcon } from '../Icons/CustomizeIcon';
import DesignScreen from '../mockups/Designs/DesignScreen';
import { connect } from 'react-redux';
import BrandsFor3DCart from '../mockups/Brand/BrandsFor3DCart';
import BrandsForDesignByLevyne from '../mockups/Brand/BrandsForDesignByLevyne';
import SearchText from '../mockups/Search/SearchText';
import BlogPost from '../mockups/Home/BlogPost';
import ThreeD from '../mockups/ThreeD/Mockups/ThreeD';
import ThreeDModel from '../mockups/ThreeD/Mockups/ThreeDModel';
import FabricIn3D from '../mockups/ThreeD/Mockups/FabricIn3DExp';
import DesignedAtLevyne from '../mockups/Designs/Designed at Levyne';
import CallToOrder from '../mockups/Home/CallToOrder';
import AddReview from '../mockups/Orders/AddReviews';
import FabricsFor3DCart from '../mockups/Fabrics/FabricsFor3DCart';
// @ts-ignore
import ChatScreenWhenNoBucketID from '../mockups/ChatSystem/ChatScreenWhenNoBucketID';
import ChatToOrder from "../mockups/ChatSystem/ChatToOrder";
import ChatToOrderBrand from "../mockups/ChatSystem/ChatToOrderBrand";
import QRCodeReader from '../mockups/Home/QRCodeReader';

const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

class BottomTabNavigation extends React.PureComponent {
	render() {
		return (
			<Tab.Navigator
				initialRouteName="HomeTab"
				tabBarOptions={{
					activeTintColor: Colors.primary,
					inactiveTintColor: Colors.grey40,
					labelStyle: {
						fontFamily: 'Mulish-Regular',
						fontSize: 12,
					},
				}}>
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					options={{
						tabBarIcon: ({ color }) => <HomeIcon Color={color} />,
					}}
				/>
				<Tab.Screen
					name="Messages"
					component={ChatListScreen}
					options={{
						tabBarIcon: ({ color }) => (
							<ChatIcon
								Color={color}
								IsAnyUnreadMessage={this.props.IsAnyUnreadMessage}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Customize"
					component={Customize}
					options={{
						tabBarIcon: ({ color }) => <CustomizeIcon size={28} Color={color} />,
					}}
				/>
				<Tab.Screen
					name="My Cart"
					component={Cart}
					options={{
						tabBarIcon: ({ color }) => (
							<OrdersIcon
								Color={color}
								IsAnyProductInCart={this.props.IsAnyProductInCart}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Profile"
					component={MyProfile}
					options={{
						tabBarIcon: ({ color }) => <ProfileIcon Color={color} />,
					}}
				/>
			</Tab.Navigator>
		);
	}
}

/**
 * @param {{ Chat: { UnreadBuckets: string | any[]; IsAnyProductInCart: boolean; }; }} state
 */
const mapsStateToProps = (state) => ({
	IsAnyUnreadMessage: state.Chat.UnreadBuckets.length,
	IsAnyProductInCart: state.Chat.IsAnyProductInCart,
});

const BottomTabNavigationConnect = connect(mapsStateToProps)(
	BottomTabNavigation,
);

class MainHomeStack extends React.PureComponent {
	render() {
		return (
			<HomeStack.Navigator
				headerMode="none"
			>
				<HomeStack.Screen name="Home" component={BottomTabNavigationConnect} />
				<HomeStack.Screen name="Customize" component={Customize} />
				<HomeStack.Screen name="Product" component={ProductScreen} />
				<HomeStack.Screen name="Fabric" component={FabricScreen} />
				<HomeStack.Screen name="FAQs" component={FAQscreen} />
				<HomeStack.Screen name="MyProfile" component={MyProfile} />
				<HomeStack.Screen name="InitialProfile" component={InitialProfile} />
				<HomeStack.Screen name="BrandProfile" component={BrandProfile} />
				<HomeStack.Screen name="EditProfile" component={EditProfile} />
				<HomeStack.Screen name="Chat" component={ChatScreen} />
				<HomeStack.Screen
					name="ChatWhenNoBucketID"
					component={ChatScreenWhenNoBucketID}
				/>
				<HomeStack.Screen name="BookMark" component={BookmarkProducts} />
				<HomeStack.Screen name="SearchText" component={SearchText} />
				<HomeStack.Screen name="Help" component={Help} />
				<HomeStack.Screen name="Bucket" component={Bucket} />
				<HomeStack.Screen name="BrandListForChat" component={BrandListForChat} />
				<HomeStack.Screen
					name="MyFashionDesigners"
					component={MyFashionDesigners}
				/>
				<HomeStack.Screen
					name="ProductAddToCart"
					component={ProductAddToCart}
				/>
				<HomeStack.Screen
					name="TermsAndCondition"
					component={TermsConditionsScreen}
				/>
				<HomeStack.Screen
					name="InternetConnection"
					component={InternetConnection}
				/>
				<HomeStack.Screen name="Cart" component={Cart} />
				<HomeStack.Screen
					name="DesignedAtLevyne"
					component={DesignedAtLevyne}
				/>
				<HomeStack.Screen name="Notifications" component={Notifications} />
				<HomeStack.Screen name="QRCodeReader" component={QRCodeReader} />
				<HomeStack.Screen name="MyFits" component={MyFits} />
				<HomeStack.Screen name="MyOrders" component={MyOrders} />
				<HomeStack.Screen name="CheckOut" component={CheckOut} />
				<HomeStack.Screen name="BrandList" component={BrandList} />
				<HomeStack.Screen name="Order" component={OrderScreen} />
				<HomeStack.Screen name="ChatToOrder" component={ChatToOrder} />
				<HomeStack.Screen name="ChatToOrderBrand" component={ChatToOrderBrand} />
				<HomeStack.Screen
					name="DesignScreen"
					component={DesignScreen}
				/>
				<HomeStack.Screen name="BlogPost" component={BlogPost} />
				<HomeStack.Screen name="SearchScreen" component={SearchScreen} />
				<HomeStack.Screen name="ThreeD" component={ThreeD} />
				<HomeStack.Screen name="ThreeDModel" component={ThreeDModel} />
				<HomeStack.Screen name="FabricInThreeD" component={FabricIn3D} />
				<HomeStack.Screen name="Call" component={CallToOrder} />
				<HomeStack.Screen name="AddReview" component={AddReview} />
				<HomeStack.Screen name="BrandsFor3DCart" component={BrandsFor3DCart} />
				<HomeStack.Screen name="BrandsForDesignByLevyne" component={BrandsForDesignByLevyne} />
				<HomeStack.Screen
					name="FabricsFor3DCart"
					component={FabricsFor3DCart}
				/>
			</HomeStack.Navigator>
		);
	}
}

class NavigationAuth extends React.PureComponent {
	render() {
		return (
			<AuthStack.Navigator
				headerMode="none"
				screenOptions={{
					gestureEnabled: false,
				}}>
				<AuthStack.Screen name="Index" component={IndexScreen} />
				<AuthStack.Screen name="Login" component={LoginScreen} />
				<AuthStack.Screen name="OTP" component={OTPScreen} />
				<AuthStack.Screen name="EditProfileAuth" component={InitialProfile} />
			</AuthStack.Navigator>
		);
	}
}

export default class NavigationMain extends React.PureComponent {
	render() {
		return (
			<MainStack.Navigator
				initialRouteName="Auth"
				headerMode="none"
				screenOptions={{
					gestureEnabled: false,
				}}>
				<MainStack.Screen name="Auth" component={NavigationAuth}/>
				<MainStack.Screen name="MainHomeStack" component={MainHomeStack}/>
			</MainStack.Navigator>
		);
	}
}
