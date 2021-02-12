import React from 'react';
import { Image, StyleSheet, FlatList } from 'react-native'
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import StarIconsComponent from "../../components/StarIconsComponent";
import NavBarBack from "../../components/NavBarBack";
import FetchBrandsDesignsByLevyne from '../../API/Brand/FetchBrandsDesignsByLevyne';
import Loader from '../../components/Loader';
import AddToCart from '../../API/Cart/Add3DToCart';
import { connect } from 'react-redux';

class FashionDesignerList extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			Brands: [],
			Loading: true
		}
		this.Page = 0;
		this.Total = 0;
		this.abortController = new AbortController();
	}

	goBack = () => {
		this.props.navigation.goBack();
	}

	componentDidMount() {
		FetchBrandsDesignsByLevyne(this.props.route.params.DesignID).then(resp => {
			this.setState({
				Brands: resp,
				Loading: false,
			})
		}).catch(err => console.log(err));
	}

	NavigateBrandProfile = (BrandID) => {
        this.props.navigation.push('BrandProfile', {BrandID})
	}

	AddDesignToCart = (BrandID) => {
		AddToCart(
			{
				Type: 3,
				DesignID: this.props.route.params.DesignID,
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
					{item.BrandName}
				</Text>
				<Text h2 grey40 marginL-10 marginR-20 numberOfLines={1} ellipsizeMode={'tail'}>{item.About}</Text>
				<View row marginT-10 paddingL-10>
					<StarIconsComponent BrandRating={Math.round(item.BrandRating)} />
				</View>
				<Text h2 grey40 marginT-10 marginL-10 marginR-20 numberOfLines={1} ellipsizeMode={'tail'}> ₹{item.MinPrice} - ₹{item.MaxPrice}</Text>
			</View>
		</TouchableOpacity>
	)


	render() {
		return (

			<View useSafeAre marginB-10 flex>
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



const mapsStateToProps = state => ({
	AccessToken : state.Auth.AccessToken
});


const mapDispatchToProps = dispatch => {
	return {
		setIsAnyProductInCart : (value) => dispatch({type: 'setIsAnyProductInCart', value}),
	}
}

export default connect(mapsStateToProps, mapDispatchToProps)(FashionDesignerList);