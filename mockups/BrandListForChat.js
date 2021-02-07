import React from 'react';
import { FlatList } from 'react-native'
import {View, Text} from 'react-native-ui-lib';
import NavBarBack from '../components/NavBarBack';
import {connect} from 'react-redux';
import Loader from '../components/Loader';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import BrandBySearch from '../API/Brand/BrandBySearch';
import BrandItemContainer from '../components/BrandItemContainer';

/**
 * @type {React.PureComponent}
 * @typedef {object} ReduxProps
 * @prop {string} AccessToken
 * @prop {(arg0: boolean) => void} setIsAnyProductInCart
 * @typedef {import('../Types/index').HomeStackParamList} HomeStackParamList
 * @typedef {RouteProp<HomeStackParamList, 'BrandListForChat'>} ReviewScreenRouteProp
 * @typedef {StackNavigationProp<HomeStackParamList, "BrandListForChat">} ReviewScreenNavigationProps
 * @typedef {ReduxProps & { navigation: ReviewScreenNavigationProps, route: ReviewScreenRouteProp }} Props
 * @extends {React.PureComponent<Props, {BrandList: {ProfileImage: string, BrandID: number, About: string, Name: string, Rating: 0 | 1 | 2 | 3 | 4 | 5}[], Loading: boolean, Total: number}>}
 */


class BrandList extends React.PureComponent {

	/**
	 * @param {Props | Readonly<Props>} props
	 */
	constructor(props){
		super(props);
		this.state = {
			BrandList : [],
			showCustomToast : false,
			Loading : true
		},
        this.Page = 0;
		this.Total = 0;
        this.abortController = new AbortController();
	}

    componentDidMount() {
        BrandBySearch('a v', ++this.Page, 0, this.props.AccessToken, this.abortController.signal).then(({Brands, Total}) => {
			this.setState({
				BrandList: Brands,
				Loading: false
			});
			this.Total = Total;
		}).catch(() => {});
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    /**
	 * @param {number} BrandID
	 * @param {string} BrandName
	 * @param {string} ProfileImage
	 */
    navigateBrand = (BrandID, BrandName, ProfileImage) => {
        //this.props.navigation.navigate("BrandProfile", {BrandID});
		this.props.navigation.navigate('ChatWhenNoBucketID', {
			BrandID: BrandID,
			Name: BrandName,
			Status: 0,
			imageSource: {uri: ProfileImage},
			Message: this.props.route.params.Description,
			ImagePath: this.props.route.params.Image
		})
    }

    onBrandEndReached = () => {
        if(this.state.BrandList.length < this.Total) {
            BrandBySearch('v', ++this.Page, 0, this.props.AccessToken, this.abortController.signal).then(({Brands, Total}) => {
				this.setState({
					BrandList: [...this.state.BrandList, ...Brands],
					Loading: false
				});
				this.Total = Total;
			}).catch(() => {});
        }
    }

    render() {
        return (
            <>
                <NavBarBack Title={'Select Your Brand'} Navigation={this.props.navigation.goBack}/>
                <View flex>
                    {
                        this.state.Loading ?
                            <Loader />
                            :
                            <FlatList
                                data={this.state.BrandList}
                                renderItem={({ item }) => <BrandItemContainer item={item} navigateBrand={this.navigateBrand}/>}
                                keyExtractor={(item) => 'Brand' + item.BrandID}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={
                                    <View flex centerV centerH style={{height:605}} paddingH-40>
                                        <Text center b1 grey50>You aren't following any fashion designer or a tailor.</Text>
                                    </View>
                                }
                                onEndReached={this.onBrandEndReached}
                                onEndReachedThreshold={0.75}
                            />
                    }
                </View>
            </>
        );
	}
}

/**
 * @param {{ Auth: { AccessToken: string; }; }} state
 */
const mapsStateToProps = state => ({
	AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(BrandList)
