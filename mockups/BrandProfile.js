import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {View, Text, Button } from 'react-native-ui-lib';
import colors from "../assets/colors";
import ProductItemContainer from '../components/ProductItemContainer';
import ProfileTopSection from '../components/ProfileTopSection';
import ViewBrandProfile from '../API/ViewBrandProfile';
import FetchBrandProducts from '../API/FetchBrandProducts';
import {connect} from 'react-redux';
import ReqestBrokerage from '../API/RequestBrokerage';
import BrandFollowing from '../API/BrandFollowing'
import CstmShadowView from "../components/CstmShadowView";


class BrandProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            Name : '',
            Followers : '',
            Followings : '',
            BrandRating : '',
            ProfileImage : '',
            BrandProducts : [],
            DoIFollow : false,
            BrokerShipStatus : -1,
        }
    }

    componentDidMount() {
        this._isMounted = true;
        ViewBrandProfile(this.props.route.params.BrandID,this.props.access_token).then(ProfileObject => {
            if (this._isMounted) {
                this.setState({
                    Name : ProfileObject.Name,
                    Brokers : ProfileObject.Brokers,
                    Followings : ProfileObject.Followings,
                    BrandRating : ProfileObject.BrandRating,
                    ProfileImage : ProfileObject.ProfileImage,
                    About : ProfileObject.About,
                    Address : ProfileObject.Address + '\n' + ProfileObject.City + '-' + ProfileObject.PinCode
                });
            }
        }).catch(() => {});


        FetchBrandProducts(this.props.BrandID, this.Page, this.props.access_token).then(rows => {
            if (this._isMounted) {
                this.TotalProducts = rows.Total;
                this.setState({
                    BrandProducts : rows.Products,
                    ProductsLoading : false
                })
            }
        }).catch(err => {});


        /*ArchiveProductAPI.ListArchiveProducts(this.ArchivePage++, this.props.access_token).then(rows => {
            if (this._isMounted) {
                this.TotalArchiveProducts = rows.Total;
                this.setState({
                    ArchivedProducts : rows.Products,
                    ArchiveProductsLoading : false
                });
            }
        }).catch(err => {});
        */

    }

    navigateProduct = (ProductID) => {
        this.props.navigation.push('Product', {
            ProductID : ProductID
        })
    }

    Follow = () => {
        if(this.state.DoIFollow) {
            BrandFollowing.UnFollowTheBrand(this.props.route.params.BrandID, this.props.access_token).catch(() => {});
            this.setState({
                DoIFollow : false
            })
        } else {
            BrandFollowing.FollowTheBrand(this.props.route.params.BrandID, this.props.access_token).catch(() => {});
            this.setState({
                DoIFollow : true
            })
        }
    }

    Brokerage = () => {
        if(this.state.BrokerShipStatus === -1) {
            ReqestBrokerage(this.props.route.params.BrandID, this.props.access_token).catch(() => {});
            this.setState({
                BrokerShipStatus : 0
            })
        }
    }

    render() {
        return (
            <View flex >
                {!this.state.loading &&
                    <FlatList
                        style={styles.flatlist}
                        data={this.state.BrandProducts}
                        numColumns={2}
                        renderItem={({ item }) => <ProductItemContainer Token={this.props.access_token} item={item} navigateProduct={this.navigateProduct} />}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <>
                                <View flex marginL-10>
                                    <Text style={styles.TopPartText} b1 marginL-10 marginV-10 paddingV-4>{this.state.Name}</Text>
                                </View>
                                <ProfileTopSection
                                    ProfileImage={this.state.ProfileImage}
                                    BrandRating={this.state.BrandRating}
                                    Followings={this.state.Followings}
                                    Followers={this.state.Followers}
                                />
                                <View row center marginB-10 marginH-20>
                                    <CstmShadowView style={{flex:1,marginRight:8}}>
                                        <Button
                                            onPress={this.Brokerage}
                                            label={this.state.BrokerShipStatus === -1 ? "Request Brokerage" : this.state.BrokerShipStatus === 0 ? "Requested" : "Already a Broker"}
                                        />
                                    </CstmShadowView>
                                    <CstmShadowView style={{flex:1,marginLeft:8}}>
                                        <Button
                                            label={this.state.DoIFollow ? 'Following' : 'Follow'}
                                            onPress={this.Follow}
                                        />
                                    </CstmShadowView>
                                </View>
                            </>
                        }
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ButtonStyle: {
        backgroundColor:colors.trivisionWhite,
        borderColor:colors.trivisionWhite,
        borderRadius:30,
        width: '100%'
    },
    flatlist: {
        marginLeft: 2,
    },

})

const mapsStateToProps = state => ({
    access_token : state.Auth.access_token,
});

export default connect(mapsStateToProps)(BrandProfile)
