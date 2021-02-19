import React from 'react';
import { Image, StyleSheet, FlatList } from 'react-native'
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import StarIconsComponent from "../../components/StarIconsComponent";
import NavBarBack from "../../components/NavBarBack";
import FetchBrandsWith3DPricing from '../../API/Brand/FetchBrandsWith3DPricing';
import Loader from '../../components/Loader';
import Add3DToCart from '../../API/Cart/Add3DToCart';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

/**
 * @type {React.PureComponent}
 * @typedef {object} ReduxProps
 * @prop {string} AccessToken
 * @prop {(arg0: boolean) => void} setIsAnyProductInCart
 * @typedef {import('../../Types/navigation').HomeStackParamList} HomeStackParamList
 * @typedef {RouteProp<HomeStackParamList, 'BrandsFor3DCart'>} ReviewScreenRouteProp
 * @typedef {StackNavigationProp<HomeStackParamList, "BrandsFor3DCart">} ReviewScreenNavigationProps
 * @typedef {ReduxProps & { navigation: ReviewScreenNavigationProps, route: ReviewScreenRouteProp }} Props
 * @extends {React.PureComponent<Props>}
 */


class FashionDesignerList extends React.PureComponent {

	/**
	 * @param {Props | Readonly<Props>} props
	 */
	constructor(props) {
		super(props);
		this.state = {
			Brands: [],
			Loading: true
		}
		this.Page = 0;
		this.Total = 0;
		this.abortController = new AbortController();

		switch(this.props.route.params.CategoryID) {
			case 4 :
			case "4" :
				this.Source = "BlousePrice"
				break;
			case 3 :
			case "3" :
				this.Source = "KurtisPrice"
				break;
			default :
				this.goBack();
		}
	}

	goBack = () => {
		this.props.navigation.goBack();
	}

	componentDidMount() {
		FetchBrandsWith3DPricing({Source: this.Source, Page: ++this.Page}, this.abortController.signal).then(resp => {
			this.setState({
				Brands: resp.Brands,
				Loading: false
			})
		}).catch(console.log)
	}

	/**
	 * @param {number} BrandID
	 */
	NavigateBrandProfile = (BrandID) => {
        this.props.navigation.push('BrandProfile', {BrandID})
	}

	/**
	 * @param {number} BrandID
	 */
	AddDesignToCart = (BrandID) => {
		Add3DToCart(
			{
				Type: 4,
				ModelID: this.props.route.params.ThreeDModel,
				BrandID
			},
			this.props.AccessToken,
			this.abortController.signal
		).then(() => {
			this.props.setIsAnyProductInCart(true);
			this.props.navigation.push('Cart');
		}).catch(console.log)
	}
	
	componentWillUnmount() {
		this.abortController.abort();
	}

	FlatListRenderItem = ({ item }) =>
	(
		<TouchableOpacity onPress={() => this.AddDesignToCart(item.BrandID)} activeOpacity={0.6} row paddingL-10 marginB-10 flex>
			<TouchableOpacity onPress={() => this.NavigateBrandProfile(item.BrandID)}>
				<Image
					style={styles.headerImage}
					source={{ uri: item.ProfileImage }}
				/>
			</TouchableOpacity>
			<View flex>
				<Text hb1 style={styles.headerText}>
					{item.Name}
				</Text>
				<Text h2 grey40 marginL-10 marginR-20 numberOfLines={1} ellipsizeMode={'tail'}>{item.About}</Text>
				<View row marginT-10 paddingL-10>
					<StarIconsComponent BrandRating={Math.round(item.BrandRating)} />
				</View>
				<Text h2 grey40 marginT-10 marginL-10 marginR-20 numberOfLines={1} ellipsizeMode={'tail'}> Starting from ₹{item[this.Source]}</Text>
			</View>
		</TouchableOpacity>
	)


	render() {
		return (

			<View useSafeArea marginB-10 flex>
				<NavBarBack Title={"Design 3D here!"} Navigation={this.goBack} />
				{!this.state.Loading ?
					<FlatList
						data={this.state.Brands}
						renderItem={this.FlatListRenderItem}
						keyExtractor={(item, index) => index.toString()}
					/>
					:
					<Loader />
				}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	headerText: {
		marginLeft: 10,
	},
	headerImage: {
		height: 100,
		width: 100,
		flex: 1
	},
});



/**
 * @param {{ Auth: { AccessToken: string; }; }} state
 */
const mapsStateToProps = state => ({
	AccessToken : state.Auth.AccessToken
});


/**
 * @param {(arg0: { type: string; value: any; }) => any} dispatch
 */
const mapDispatchToProps = dispatch => {
	return {
		// @ts-ignore
		setIsAnyProductInCart : (value) => dispatch({type: 'setIsAnyProductInCart', value}),
	}
}

export default connect(mapsStateToProps, mapDispatchToProps)(FashionDesignerList);