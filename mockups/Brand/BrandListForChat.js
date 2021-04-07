import React from 'react';
import { FlatList } from 'react-native'
import {View, Text} from 'react-native-ui-lib';
import NavBarBack from '../../components/NavBarBack';
import {connect} from 'react-redux';
import Loader from '../../components/Loader';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import BrandBySearch from '../../API/Brand/BrandBySearch';
import BrandItemContainer from '../../components/BrandItemContainer';
import CreateChatBucket from '../../API/Chats/CreateNewChatBucket';

/**
 * @type {React.PureComponent}
 * @prop {(arg0: boolean) => void} setIsAnyProductInCart
 * @typedef {import('../../Types/navigation').HomeStackParamList} HomeStackParamList
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
        BrandBySearch(undefined, ++this.Page, 0, this.props.route.params.Gender, this.abortController.signal).then(({Brands, Total}) => {
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
    navigateBrand = async (BrandID, BrandName, ProfileImage) => {

        this.setState({Loading: true});

        try {
            const {BucketID} = await CreateChatBucket(BrandID, this.props.AccessToken, this.abortController.signal);
            let Message = `Gender: ${this.props.route.params.Gender ? "Male" : "Female"}\nBudget: ${this.props.route.params.Budget}\nOccasion: ${this.props.route.params.Occasion}\n`;

            if(this.props.route.params.Description) {
                Message += `Description: ${this.props.route.params.Description}`;
            }

            this.setState({
                Loading: false
            });

            this.props.navigation.navigate('Chat', {
                BucketID: BucketID,
                BrandID: BrandID,
                Name: BrandName,
                Status: -1,
                imageSource: {uri: ProfileImage},
                Message: Message,
                ImagePath: this.props.route.params.Image
            })
        } catch(err) {
            this.setState({Loading: false});
        }
    }

    onBrandEndReached = () => {
        if(this.state.BrandList.length < this.Total) {
            BrandBySearch('v', ++this.Page, 0, this.abortController.signal).then(({Brands, Total}) => {
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

const mapsStateToProps = state => ({
    AccessToken: state.Auth.AccessToken
});

export default connect(mapsStateToProps)(BrandList)