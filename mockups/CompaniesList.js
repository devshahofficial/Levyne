import React from 'react';
import { Image, StyleSheet, FlatList } from 'react-native'
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import StarIconsComponent from "../components/StarIconsComponent";
import NavBarBack from "../components/NavBarBack";
import FetchBrandsWith3DPricing from '../API/Brand/FetchBrandsWith3DPricing';

const Designs = [{
	image: 'https://images-na.ssl-images-amazon.com/images/I/81TwqU4-ZdL._UL1500_.jpg',
	des: 'Louren nasfnononlmzcmvp kdsanoivnanpv oajvpob oanvnbam',
	prodname: 'Shoes',
	Heart: true
},
{
	image: 'https://images-na.ssl-images-amazon.com/images/I/81TwqU4-ZdL._UL1500_.jpg',
	des: 'Louren nasfnononlmzcmvp kdsanoivnanpv oajvpob oanvnbam',
	prodname: 'Shoes',
	Heart: true
},
{
	image: 'https://images-na.ssl-images-amazon.com/images/I/81TwqU4-ZdL._UL1500_.jpg',
	des: 'Louren nasfnononlmzcmvp kdsanoivnanpv oajvpob oanvnbam',
	prodname: 'Shoes',
	Heart: true
}]

export default class FashionDesignerList extends React.PureComponent {
	goBack = () => {
		this.props.navigation.goBack();
	}

	state = {
		Brands: []
	}

	Page = 0;

	Total = 0;

	componentDidMount() {
		FetchBrandsWith3DPricing('ShirtPrice', undefined, ++this.Page).then(resp => {
			this.setState({
				Brands: resp.Brands
			})
		}).catch(console.log)
	}

	NavigateBrandProfile = (BrandID) => {
        this.props.navigation.push('BrandProfile', {BrandID})
	}
	
	AddDesignToCart = (BrandID) => {
		//this.props.navigation.push('BrandProfile', {BrandID})
		console.log('Add 3D in Cart');
    }

	render() {
		return (

			<View useSafeAre marginB-10 flex>
				<NavBarBack Title={"Design 3D here!"} Navigation={this.goBack} />
				<FlatList
					data={this.state.Brands}
					renderItem={({ item }) =>
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
									<StarIconsComponent BrandRating={Math.round(1)} />
								</View>
								<Text h2 grey40 marginT-10 marginL-10 marginR-20 numberOfLines={1} ellipsizeMode={'tail'}>₹{item.ShirtPrice}</Text>
							</View>
						</TouchableOpacity>
					}
					keyExtractor={(item, index) => index.toString()}
				/>
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

