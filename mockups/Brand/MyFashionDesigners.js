import React from 'react';
import {Animated} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import BrandItemContainer from '../../components/BrandItemContainer';
import NavBarBack from "../../components/NavBarBack";
import BrandFollowings from '../../API/Brand/BrandFollowing';
import {connect} from 'react-redux';
import Loader from '../../components/Loader';

class MyFashionDesigners extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            BrandData: [],
            sortModel: false,
            LoadingBrands: true
        }
        this.Page = 0;
        this.Total = 0;
        this.abortController = new AbortController();
    }

    componentDidMount() {
        BrandFollowings.FetchFollowedBrands(++this.Page, this.props.AccessToken, this.abortController.signal).then(resp => {
            this.setState({BrandData: resp.Brands, LoadingBrands: false});
            this.Total = resp.Total;
        }).catch(err => {
            console.log(err);
        })
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    navigateBrand = (BrandID) => {
        this.props.navigation.navigate("BrandProfile", {BrandID});
    }

    onBrandEndReached = () => {
        if(this.state.BrandData.length < this.Total) {
            BrandFollowings.FetchFollowedBrands(++this.Page, this.props.AccessToken, this.abortController.signal).then(resp => {
                this.setState({BrandData: [...this.state.BrandData, ...resp.Brands]});
            }).catch(err => {
                console.log(err);
            })
        }
    }

    render() {
        return (
            <>
                <NavBarBack Title={'My Fashion Designers'} Navigation={this.props.navigation.goBack}/>
                <View flex>
                    {
                        this.state.LoadingBrands ?
                            <Loader />
                            :
                            <Animated.FlatList
                                data={this.state.BrandData}
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

export default connect(mapsStateToProps)(MyFashionDesigners);