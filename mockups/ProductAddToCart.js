import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import CstmShadowView from "../components/CstmShadowView";
import {Text, View, TouchableOpacity, Colors, Button, Checkbox, Toast, Stepper} from "react-native-ui-lib";
import {BackArrowIcon} from "../Icons/BackArrowIcon";
import FabricOrderContainer from "../components/FabricOrderContainer";
import FetchFabricByBrandIDAndMaterials from '../API/FetchFabricByBrandIDAndMaterials';
import AddProductToCartAPI from '../API/AddProductToCart';
import {connect} from 'react-redux';

class AddToCartScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            SelectedSize: 0,
            CustomerFabric: false,
            Fabrics: [],
            LoadMoreFabrics: false,
            SelectedFabric: '',
            showCustomToast: false,
            FabricQuantity: 1,
            CustomFabric: false,
        }
        this.FabricPage = 0;
        this.FabricLoaded = false;
        this.FabricTotal = 0;
        this._isMounted = true;
        this.abortController = new AbortController();
    }

    setSelectedSize = (SelectedSize) => {
        this.setState({SelectedSize});
    }

    LoadFabric = () => {
        this.setState({
            CustomFabric: !this.state.CustomFabric
        });
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
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    SelectFabric = (SelectedFabric) => {
        this.setState({SelectedFabric});
    }

    setCustomerFabric = () => {
        this.setState({
            CustomerFabric: !this.state.CustomerFabric
        });
    }

    StepperValueChange = (FabricQuantity) => {
        this.setState({FabricQuantity})
    }

    navigateFabric = (FabricID) => {
        this.props.navigation.push('FabricAddToCart', {FabricID})
    }

    AddProductToCart = () => {
        if(this.state.CustomFabric && !this.state.CustomerFabric && !this.state.SelectedFabric) {
            this._isMounted && this.setState({
                showCustomToast: true
            });
            setTimeout(() => {
                this._isMounted && this.setState({
                    showCustomToast: false
                });
            }, 3000)
            return;
        }
        AddProductToCartAPI(
            this.props.route.params.ProductID,
            1,
            this.state.SelectedSize,
            this.state.CustomerFabric && this.state.CustomFabric,
            this.state.SelectedFabric,
            this.state.FabricQuantity,
            this.props.AccessToken,
            this.abortController.signal
        ).then(() => {
            this.setState({
                SelectedSize: 0,
                SelectedFabric: undefined
            });
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
            <View marginH-10>
                <Text hb1 secondary>Choose size:</Text>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={Object.keys(this.props.route.params.AvailableSizes)}
                    horizontal={true}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => (this.setSelectedSize(item))}
                        >
                            <CstmShadowView style={styles.shadow}>
                                <View style={item[0] === this.state.SelectedSize ? styles.boxSelected : styles.box}>
                                    <Text secondary h2>{this.props.route.params.AvailableSizes[item]}</Text>
                                </View>
                            </CstmShadowView>
                        </TouchableOpacity>
                    }
                    keyExtractor={item => this.props.route.params.AvailableSizes[item]}
                />

                <View row marginT-10 marginB-20>
                    <CstmShadowView style={styles.Group}>
                        <Button h2 label={"Size Guide"}/>
                    </CstmShadowView>
                    <CstmShadowView style={styles.Group}>
                        <Button h2 label={"My Sizes"}/>
                    </CstmShadowView>
                </View>

                <View marginT-20>
                    <View marginB-20>
                        <View row spread>
                            <Text hb1 secondary>Choose Custom Fabric</Text>
                            <Checkbox
                                value={this.state.CustomFabric}
                                onValueChange={this.LoadFabric}
                                borderRadius={10}
                                size={25}
                                color={Colors.primary}
                            />
                        </View>
                    </View>
                    {this.state.CustomFabric &&
                        <View>
                            <View row spread>
                                <Text hb1 secondary>Provide my own fabric</Text>
                                <Checkbox
                                    value={this.state.CustomerFabric}
                                    onValueChange={this.setCustomerFabric}
                                    borderRadius={10}
                                    size={25}
                                    color={Colors.primary}
                                />
                            </View>
                        </View>
                    }
                    {this.state.CustomFabric && !this.state.CustomerFabric &&
                        <View marginT-20>

                            <View>
                                <Text h1 secondary>Choose fabric quantity in meters</Text>
                                <View center>
                                    <Stepper
                                        label={"meters"}
                                        min={1}
                                        max={5}
                                        onValueChange={this.StepperValueChange}
                                        initialValue={this.state.FabricQuantity}
                                    />
                                </View>
                            </View>

                            <Text h1 secondary>Choose the fabric</Text>
                        </View>
                    }
                </View>
            </View>
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
            <SafeAreaView style={{flex:1}}>
                <View row centerV left paddingL-10 style={{height:50}}>
                    <TouchableOpacity onPress={this.props.navigation.goBack}><BackArrowIcon/></TouchableOpacity>
                    <Text h1 marginL-20>Back to the product</Text>
                </View>
                <View paddingT-10 paddingH-5 flex>
                    <FlatList
                        ListHeaderComponent={this.headerFlatList}
                        data={!this.state.CustomerFabric && this.state.CustomFabric ? this.state.Fabrics : []}
                        numColumns={2}
                        ListEmptyComponent={this.FlatListLoader}
                        showsVerticalScrollIndicator={false}
                        renderItem={this.FlatListRenderItem}
                        keyExtractor={item => item.FabricID}
                        onEndReached={this.LoadMoreFabrics}
                        onEndReachedThreshold={0.50}
                    />
                </View>
                <View>
                    <CstmShadowView style={{margin:15}}>
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
            </SafeAreaView>
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
