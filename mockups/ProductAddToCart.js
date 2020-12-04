import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import CstmShadowView from "../components/CstmShadowView";
import {Text, View, TouchableOpacity, Colors, Button, Checkbox, Toast} from "react-native-ui-lib";
import {BackArrowIcon} from "../Icons/BackArrowIcon";
import FabricOrderContainer from "../components/FabricOrderContainer";
import FetchFabricByBrandIDAndMaterials from '../API/FetchFabricByBrandIDAndMaterials';
import AddProductToCartAPI from '../API/AddProductToCart';
import {connect} from 'react-redux';
import NavBarBack from "../components/NavBarBack";

class AddToCartScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            SelectedSize: 0,
            Fabrics: [],
            LoadMoreFabrics: false,
            SelectedFabric: '',
            showCustomToast: false,
            FabricQuantity: 1,
            CustomFabric: false,
            CustomFabricOutsideList: false,
            FabricOfProduct: true
        }
        this.FabricPage = 0;
        this.FabricLoaded = false;
        this.FabricTotal = 0;
        this._isMounted = true;
        this.abortController = new AbortController();
        this.Timeout = [];
    }

    LoadFabric = () => {

        if(!this.state.CustomFabric) {
            if(!this.FabricLoaded) {
                FetchFabricByBrandIDAndMaterials(this.props.route.params.BrandID, this.props.route.params.MaterialIDs, ++this.FabricPage, this.props.AccessToken, this.abortController.signal).then(resp => {
                    this._isMounted && this.setState({
                        Fabrics: resp.Fabrics,
                    });
                    this.FabricLoaded = true;
                    this.FabricTotal = resp.Total;
                }).catch(err => {
                    console.log(err);
                })
            }
        } else {
            this.SelectFabric('');
        }

        this.setState({
            CustomFabric: !this.state.CustomFabric
        });
    }

    componentWillUnmount() {
        this.abortController.abort();
        this.Timeout.forEach(item => {
            clearTimeout(item);
        })
    }

    SelectFabric = (SelectedFabric) => {
        this.setState({SelectedFabric});
    }

    navigateFabric = (FabricID) => {
        this.props.navigation.push('Fabric', {FabricID})
    }

    AddProductToCart = () => {
        if(this.state.CustomFabric && !this.state.SelectedFabric) {
            this._isMounted && this.setState({
                showCustomToast: true
            });
            this.Timeout.push(setTimeout(() => {
                this._isMounted && this.setState({
                    showCustomToast: false
                });
            }, 3000));
            return;
        }
        AddProductToCartAPI(
            this.props.route.params.ProductID,
            this.state.SelectedFabric ? this.state.SelectedFabric : undefined,
            this.props.AccessToken,
            this.abortController.signal
        ).then(() => {
            this.SelectFabric('');
            this.props.navigation.push('Cart');
        }).catch(console.log)
    }

    LoadMoreFabrics = () => {
        if(this.FabricTotal > this.state.Fabrics.length) {
            FetchFabricByBrandID(this.state.ProductObject.BrandID, ++this.FabricPage, this.props.AccessToken, this.abortController.signal).then(resp => {
                this._isMounted && this.setState({
                    Fabrics: [...this.state.Fabrics, ...resp.Fabrics]
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }

    headerFlatList = () => {
        return(
            <>
                <View row padding-10>
                    <View flex-8 marginR-5>
                        <Text h1 secondary>Choose the product image</Text>
                    </View>
                    <View flex marginL-5>
                        <Checkbox
                            value={this.state.FabricOfProduct}
                            onValueChange={this.LoadFabric}
                            borderRadius={10}
                            size={25}
                            color={Colors.primary}
                        />
                    </View>
                </View>
                <View row padding-10>
                    <View flex-8 marginR-5>
                        <Text h1 secondary>Choose a fabric from Designer's Collection</Text>
                    </View>
                    <View flex marginL-5>
                        <Checkbox
                            value={this.state.CustomFabric}
                            onValueChange={this.LoadFabric}
                            borderRadius={10}
                            size={25}
                            color={Colors.primary}
                        />
                    </View>
                </View>
            </>
        )
    }

    footerFlatList = () => {
        if(this.state.CustomFabric) {
            return (
                <View row padding-10>
                    <View flex-8 marginR-5>
                        <Text h1 secondary>Chat with the designer to select the fabric</Text>
                    </View>
                    <View flex marginL-5>
                        <Checkbox
                            value={this.state.CustomFabricOutsideList}
                            onValueChange={this.LoadFabric}
                            borderRadius={10}
                            size={25}
                            color={Colors.primary}
                        />
                    </View>
                </View>
            )
        }

        return (
            <></>
        )
    }

    FlatListRenderItem = ({item}) =>
        <FabricOrderContainer
            item={item}
            navigateFabric={this.navigateFabric}
            SelectFabric={this.SelectFabric}
            SelectedFabric={this.state.SelectedFabric}
        />

    renderCustomContent = () => {
        return (
            <View flex padding-10 paddingB-30 style={{backgroundColor : Colors.primary}}>
                <Text white h1>Please choose a fabric!</Text>
            </View>
        );
    };

    FlatListLoader = () => (
        !this.state.CustomerFabric && this.state.CustomFabric ?
            <View flex center>
                <ActivityIndicator />
            </View>
            :
            <View></View>
    );

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={"Choose the Fabric"}/>
                <View flex>
                    <FlatList
                        ListHeaderComponent={this.headerFlatList}
                        data={this.state.CustomFabric ? this.state.Fabrics : []}
                        numColumns={2}
                        ListEmptyComponent={this.FlatListLoader}
                        showsVerticalScrollIndicator={false}
                        renderItem={this.FlatListRenderItem}
                        keyExtractor={item => item.FabricID}
                        onEndReached={this.LoadMoreFabrics}
                        onEndReachedThreshold={0.50}
                        ListFooterComponent={this.footerFlatList}
                    />
                </View>
                <View>
                    <CstmShadowView style={{margin:15, marginBottom: 25}}>
                        <Button onPress={this.AddProductToCart} label={"Add to Cart"}/>
                    </CstmShadowView>
                </View>
                <Toast
                    visible={this.state.showCustomToast}
                    position={'bottom'}
                    backgroundColor={Colors.primary}
                >
                    {this.renderCustomContent()}
                </Toast>
            </>
        )
    }
}

const BOX_HEIGHT = 60
const BORDER_RADIUS = 100

const styles = StyleSheet.create({
    avatarView:{
        flex: 0.35,
        justifyContent:'center',
    },
    threeBoxes: {
        flex: 0.2,
    },
    box:{
        borderRadius: BORDER_RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        height: BOX_HEIGHT,
        paddingHorizontal:25,
        borderColor: Colors.white,
        borderWidth:2,
        borderStyle:'solid',
    },
    boxSelected:{
        borderRadius: BORDER_RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        height: BOX_HEIGHT,
        paddingHorizontal:25,
        borderColor: Colors.primary,
        borderWidth:2,
        borderStyle:'solid',
    },
    shadow: {
        height: BOX_HEIGHT,
        margin: 10
    },
    Group: {
        flex: 1,
        marginHorizontal: 15
    },
    Stepper: {
        borderRadius: 30,
        backgroundColor: Colors.shadow
    }
});

const mapsStateToProps = state => ({
	AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(AddToCartScreen);
