import React from 'react';
import { Image, StyleSheet, FlatList } from 'react-native'
import {View, Text, TouchableOpacity, Toast, LoaderScreen} from 'react-native-ui-lib';
import Colors from "../Style/Colors";
import NavBarBack from '../components/NavBarBack';
import {connect} from 'react-redux';
import FetchFollowedBrands from '../API/FetchFollowedBrands';
import Stars from '../components/StarIconsComponent';

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
	}
	componentDidMount() {
        this._isMounted = true;
		FetchFollowedBrands(++this.Page, this.props.route.params.BrandID, this.props.AccessToken).then(rows => {
			if(this._isMounted) {
				this.setState({
					BrandList : rows.Brands,
					Total : rows.Total,
					Loading : false
				})
			}
		}).catch((err) => {
            console.log(err);
			this.setState({
				showCustomToast : true,
				Loading : false
			});
			setTimeout(() => {
				if(this._isMounted) {
					this.setState({showCustomToast : false})
				}
			}, 3000);
		});
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
                    <View centerV centerH flex>
                        <LoaderScreen
                            backgroundColor={Colors.white}
                            loaderColor={Colors.primary}
                        />
                    </View> :
                    <View marginB-10 paddingT-10 flex>
                        <FlatList
                            data={this.state.BrandList}
                            ListEmptyComponent={
                                <View flex centerV centerH style={{height:655}} paddingH-40>
                                    <Text center b1 grey40>No brands followed.</Text>
                                </View>
                            }
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={
                                    () => this.props.navigation.push("BrandProfile", {BrandID : item.BrandID})
                                } activeOpacity={0.6} style={styles.Container} row paddingL-10 marginB-20 flex>
                                    <View>
                                        <Image
                                                style={styles.headerImage}
                                                source={{ uri: item.ProfileImage }}
                                        />
                                    </View>
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
                            }
                            onEndReached = {() => {
                                if(this.state.BrandList.length < this.state.Total) {
                                    FetchFollowedBrands(++this.Page, this.props.route.params.BrandID, this.props.AccessToken).then(resp => {
                                        if(this._isMounted) {
                                            this.setState({
                                                BrandList : [...this.state.BrandList, ...resp.Brands],
                                            });
                                        }
                                    }).catch(() => {
                                        this.setState({
                                            showCustomToast : true
                                        });
                                        setTimeout(() => {
                                            if(this._isMounted) {
                                                this.setState({showCustomToast : false})
                                            }
                                        }, 3000);
                                    })
                                }
                            }}
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
