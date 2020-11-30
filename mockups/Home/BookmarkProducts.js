import React from 'react';
import {FlatList, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import NavBarBack from '../../components/NavBarBack';
import ListBookmarkProducts from '../../API/ListBookmarkProducts';
import {View} from 'react-native-ui-lib';
import ProductItemContainer from '../../components/ProductItemContainer';
import FabricItemContainer from "../../components/FabricItemContainer";
import LikedSVG from "../../assets/images/AppImages/Liked.svg";
import UnLoggedScreen from '../../components/UnLoggedScreen';


class BookmarkProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Products : [],
            Loading: true,
            Refreshing: false
        }
        this.TotalProducts = 0;
        this.Page = 0;
        this.loadNewPage = false;
        this.abortController = new AbortController();
    }

    navigateProduct = (ProductID) => {
        this.props.navigation.navigate('Product', {ProductID});
    }

    navigateFabric = (FabricID) => {
        this.props.navigation.navigate('Fabric', {FabricID});
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    componentDidMount() {
        this._isMounted = true;

        if(!this.props.SkipLogin) {
            ListBookmarkProducts(++this.Page, this.props.AccessToken, this.abortController.signal).then(resp => {
                if(this._isMounted) {
                    this.setState({
                        Products : resp.Products,
                        Loading: false
                    });
                    this.TotalProducts = resp.Total;
                    this.loadNewPage = true;
                }
    
            }).catch((err) => {
                console.log(err);
                if(this._isMounted) {
                    this.setState({
                        Loading: false
                    });
                }
            })
        }
    }

    FlatListRenderItem = ({ item }) => (
        item.ProductID ?
            <ProductItemContainer Token={this.props.AccessToken} item={item} navigateProduct={this.navigateProduct} /> :
            <FabricItemContainer Token={this.props.AccessToken} item={item} navigateFabric={this.navigateFabric}/>
    )

    FlatListOnEndReached = () => {
        if(this.loadNewPage && this.state.Products.length !== this.TotalProducts) {
            this.loadNewPage = false;
            ListBookmarkProducts(++this.Page, this.props.AccessToken, this.abortController.signal).then(resp => {
                this.loadNewPage = true;
                this.setState({
                    Products : [...this.state.Products, ...resp.Products]
                })
            }).catch(() => {
            });
        }
    }

    onRefresh = () => {
        this.Page = 0;
        this.loadNewPage = false;
        this.setState({Refreshing: true})
        ListBookmarkProducts(++this.Page, this.props.AccessToken, this.abortController.signal, true).then(resp => {
            this.loadNewPage = true;
            this.setState({
                Products : resp.Products,
                Refreshing: false
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    NavigateLogin = () => {
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Wishlist'}/>
                {this.props.SkipLogin ?
                    <UnLoggedScreen NavigateLogin={this.NavigateLogin} />
                    :
                    <View centerV flex>
                        {this.state.Loading ?
                            <View flex center>
                                <ActivityIndicator />
                            </View>
                            :
                            <FlatList
                                data={this.state.Products}
                                numColumns={2}
                                renderItem={this.FlatListRenderItem}
                                keyExtractor={(item) => item.ProductID || '0' + item.FabricID || '0'}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={
                                    <View centerH style={styles.Image}>
                                        <LikedSVG width={'90%'}/>
                                    </View>
                                }
                                refreshing={this.state.Refreshing}
                                onEndReached={this.FlatListOnEndReached}
                                onEndReachedThreshold={0.75}
                                onRefresh={this.onRefresh}
                            />
                        }
                    </View>
                }  
            </>
        )
    }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    Image: {
        width: screenWidth,
        height: screenHeight-90,
    }
});

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken,
    SkipLogin: state.Auth.SkipLogin
});

export default connect(mapsStateToProps)(BookmarkProducts)
