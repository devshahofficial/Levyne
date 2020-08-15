import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import ListBookmarkProducts from '../API/ListBookmarkProducts';
import {View,Text} from 'react-native-ui-lib';
import ProductItemContainer from '../components/ProductItemContainer'


class BookmarkProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Products : [],
        }
        this.TotalProducts = 0;
        this.Page = 0;
    }
    navigateProduct = (ProductID) => {
        this.props.navigation.navigate('Product', {
            ProductID : ProductID
        });
    }

    componentDidMount() {
        this._isMounted = true;
        ListBookmarkProducts(++this.Page, this.props.AccessToken).then(resp => {
            if(this._isMounted) {
                this.setState({
                    Products : resp.Products
                });
                this.TotalProducts = resp.Total;
                loadNewPage = true;
            }
            
        }).catch(() => {})
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Wishlist'}/>
                <View centerV flex>
                    <FlatList
                        data={this.state.Products}
                        numColumns={2}
                        renderItem={({ item }) => <ProductItemContainer Token={this.props.AccessToken} item={item} navigateProduct={this.navigateProduct} />}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View flex centerV centerH style={{height:655}} paddingH-40>
                                <Text center b1 grey40>Make a wish and we'll make sure that it comes true.</Text>
                            </View>
                        }
                        onEndReached={() => {
                            if(loadNewPage && this.state.Products.length !== this.TotalProducts) {
                                loadNewPage = false;
                                ListBookmarkProducts(++this.Page, this.props.AccessToken).then(resp => {
                                    loadNewPage = true;
                                    if(this._isMounted) {
                                        this.setState({
                                            Products : [...this.state.Products, ...resp.Products]
                                        })
                                    }
                                }).catch(err => {
                                });
                            }
                        }}
                        onEndReachedThreshold={0.75}
                    />
                </View>
            </>
        )
    }
}



const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(BookmarkProducts)
