import React from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import NavBarBack from '../../components/NavBarBack';
import ListBookmarkProducts from '../../API/ListBookmarkProducts';
import {View,Text} from 'react-native-ui-lib';
import ProductItemContainer from '../../components/ProductItemContainer';
import FabricItemContainer from "../../components/FabricItemContainer";


class BookmarkProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Products : [],
            Loading: true
        }
        this.TotalProducts = 0;
        this.Page = 0;
        loadNewPage = false;
    }

    navigateProduct = (ProductID) => {
        this.props.navigation.navigate('Product', {ProductID});
    }

    navigateFabric = (FabricID) => {
        this.props.navigation.navigate('Fabric', {FabricID});
    }

    componentDidMount() {
        this._isMounted = true;
        ListBookmarkProducts(++this.Page, this.props.AccessToken).then(resp => {
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
            this.setState({
                Loading: false
            });
        })
    }

    FlatListRenderItem = ({ item }) => (
        item.ProductID ?
            <ProductItemContainer Token={this.props.AccessToken} item={item} navigateProduct={this.navigateProduct} /> :
            <FabricItemContainer Token={this.props.AccessToken} item={item} navigateFabric={this.navigateFabric}/>
    )

    FlatListOnEndReached = () => {
        if(this.loadNewPage && this.state.Products.length !== this.TotalProducts) {
            this.loadNewPage = false;
            ListBookmarkProducts(++this.Page, this.props.AccessToken).then(resp => {
                this.loadNewPage = true;
                if(this._isMounted) {
                    this.setState({
                        Products : [...this.state.Products, ...resp.Products]
                    })
                }
            }).catch(err => {
            });
        }
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Wishlist'}/>
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
                                <View flex centerV centerH style={{height:655}} paddingH-40>
                                    <Text center b1 grey40>Make a wish and we'll make sure that it comes true.</Text>
                                </View>
                            }
                            onEndReached={this.FlatListOnEndReached}
                            onEndReachedThreshold={0.75}
                        />
                    }
                </View>
            </>
        )
    }
}



const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(BookmarkProducts)
