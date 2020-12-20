import React from 'react';
import { Image, StyleSheet, FlatList } from 'react-native'
import {View, Text, TouchableOpacity, Toast} from 'react-native-ui-lib';
import Colors from "../Style/Colors";
import NavBarBack from '../components/NavBarBack';
import {connect} from 'react-redux';
import BrandFollowings from '../API/BrandFollowing';
import Stars from '../components/StarIconsComponent';
import CstmShadowView from "../components/CstmShadowView";
import Loader from '../components/Loader';

const FetchBrandFollowings = BrandFollowings.FetchBrandFollowings;

class BrandList extends React.PureComponent {

	constructor(props){
		super(props);
		this.state = {
			BrandList : [],
			Total : 0,
			showCustomToast : false,
			Loading : true
		},
        this.Page = 0;

        this.abortController = new AbortController();
	}
	componentDidMount() {
        FetchBrandFollowings(++this.Page, this.props.route.params.BrandID, this.props.AccessToken, this.abortController.signal).then(rows => {
			this.setState({
				BrandList : rows.Brands,
				Total : rows.Total,
				Loading : false
			})
		}).catch(() => {});
	}

	renderCustomContent = () => {
		const {selectedColor} = this.state;
		const backgroundColor = selectedColor === 'none' ? undefined : selectedColor;

		return (
            <View flex padding-10 style={{backgroundColor}}>
                <Text white h1>Oops! Something went wrong </Text>
            </View>
		);
    };

    onEndReached = () => {
        if(this.state.BrandList.length < this.state.Total) {
            FetchBrandFollowings(++this.Page, this.props.route.params.BrandID, this.props.AccessToken, this.abortController.signal).then(resp => {
                this.setState({
					BrandList : [...this.state.BrandList, ...resp.Brands],
				});
            }).catch(() => {})
        }
    }

    renderItem = ({ item }) => (
        <CstmShadowView style={styles.Container}>
			<TouchableOpacity
				onPress={() => this.props.navigation.push("BrandProfile", {BrandID : item.BrandID})}
				activeOpacity={0.6}
				style={styles.Container}
				row paddingL-10 marginB-20 flex
			>
				<Image
					style={styles.headerImage}
					source={{ uri: item.ProfileImage }}
				/>
				<View marginL-10 marginT-5>
					<Text hb1 style={styles.headerText}>
						{item.Name}
					</Text>
					<Text numberOfLines={4} h2 grey40 marginR-160 left>{item.About} </Text>
					<View row flex marginT-10>
						<Stars BrandRating={Math.round(5)} />
					</View>
				</View>
			</TouchableOpacity>
		</CstmShadowView>
    )


	render() {
		return (
            <>
                <NavBarBack Title={"Followings"} Navigation={this.props.navigation.goBack}/>
                <Toast
                    visible={this.state.showCustomToast}
                    position={'bottom'}
                    backgroundColor={Colors.primary}
                >
                    {this.renderCustomContent()}
                </Toast>
                {this.state.Loading ?
                    <Loader /> :
                    <View marginB-10 paddingT-10 flex>
                        <FlatList
                            data={this.state.BrandList}
                            ListEmptyComponent={
                                <View flex centerV centerH style={{height:655}} paddingH-40>
                                    <Text center b1 grey40>No brands followed.</Text>
                                </View>
                            }
                            renderItem={this.renderItem}
                            onEndReached = {this.onEndReached}
                            onEndReachedThreshold={0.75}
                            keyExtractor={(item) => item.BrandID.toString()}
                        />
                    </View>
                }
            </>
		)
	}
}

const styles = StyleSheet.create({
	Container:{
		borderTopColor:Colors.grey50,
		borderBottomColor:Colors.grey50,
		borderBottomWidth:0.5,
		borderTopWidth:0.5,
	},
	headerImage: {
		height: 150,
		width: 150,
		flex:1,
	}
});


const mapsStateToProps = state => ({
	AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(BrandList)
