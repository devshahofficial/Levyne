import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import CstmShadowView from "./CstmShadowView";
import {Text, View, TouchableOpacity, Colors, Button,Checkbox, Toast, Stepper} from "react-native-ui-lib";
import {BackArrowIcon} from "../Icons/BackArrowIcon";
import FabricOrderContainer from "./FabricOrderContainer";

export default class AddToCartModal extends React.PureComponent {

    headerFlatList = () => {
        return(
            <View marginH-10>
                <Text hb1 secondary>Choose size:</Text>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={this.props.AvailableSizes}
                    horizontal={true}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => (this.props.setSelectedSize(item[0]))}
                        >
                            <CstmShadowView style={styles.shadow}>
                                <View style={item[0] === this.props.SelectedSize ? styles.boxSelected : styles.box}>
                                    <Text secondary h2>{item[1]}</Text>
                                </View>
                            </CstmShadowView>
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item[1]}
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
                    <View>
                        <View row spread>
                            <Text hb1 secondary>Provide my own fabric</Text>
                            <Checkbox
                                value={this.props.CustomerFabric}
                                onValueChange={this.props.setCustomerFabric}
                                borderRadius={10}
                                size={25}
                                color={Colors.primary}
                            />
                        </View>
                    </View>
                    {!this.props.CustomerFabric &&
                    <View marginT-20>

                        <View>
                            <Text h1 secondary>Choose fabric quantity in meters</Text>
                            <View center>
                                <Stepper
                                    label={"meters"}
                                    min={1}
                                    max={5}
                                    onValueChange={count => this.setState({itemsCount: count})}
                                    initialValue={1}
                                />
                            </View>
                        </View>

                        <Text h1 secondary>Choose the fabric</Text>
                    </View>}
                </View>
            </View>
        )
    }

    FlatListRenderItem = ({item}) =>
        <FabricOrderContainer
            item={item}
            navigateFabric={this.props.navigateFabric}
            SelectFabric={this.props.SelectFabric}
            SelectedFabric={this.props.SelectedFabric}
        />

    renderCustomContent = () => {
        return (
            <View flex padding-10 style={{backgroundColor : Colors.primary}}>
                <Text white h1>We choose a fabric!</Text>
            </View>
        );
    };

    FlatListLoader = () => (
        this.props.CustomerFabric ?
            <View></View> :
            <View flex center>
                <ActivityIndicator />
            </View>
    )


    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <View row centerV left paddingL-10 style={{height:50}}>
                    <TouchableOpacity onPress={this.props.Modal}><BackArrowIcon/></TouchableOpacity>
                    <Text h1 marginL-20>Back to the product</Text>
                </View>
                <View paddingT-10 paddingH-5 flex>
                    <FlatList
                        ListHeaderComponent={this.headerFlatList}
                        data={this.props.CustomerFabric ? [] : this.props.Fabrics}
                        numColumns={2}
                        ListEmptyComponent={this.FlatListLoader}
                        showsVerticalScrollIndicator={false}
                        renderItem={this.FlatListRenderItem}
                        keyExtractor={item => item.FabricID}
                        onEndReached={this.props.LoadMoreFabrics}
                        onEndReachedThreshold={0.50}
                    />
                </View>
                <View>
                    <CstmShadowView style={{margin:15}}>
                        <Button onPress={this.props.AddProductToCart} label={"Add to Cart"}/>
                    </CstmShadowView>
                </View>
                <Toast
                    visible={this.props.showCustomToast}
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
})

