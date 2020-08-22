import React from 'react';
import { StyleSheet, FlatList} from 'react-native';
import CstmShadowView from "./CstmShadowView";
import {Text, View, TouchableOpacity, Colors, Button,Checkbox} from "react-native-ui-lib";
import {BackArrowIcon} from "../Icons/BackArrowIcon";
import FabricItemContainer from "./FabricItemContainer";

const upperList = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb288a',
        title: 'S',
        number: 1
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'M',
        number: 2
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f78',
        title: 'L',
        number: 3
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'XL',
        number: 4
    },
    {
        id: '3ac68afc-c405-48d3-a4f8-fbd91aa97f63',
        title: 'XXL',
        number: 5
    },
    {
        id: '58694a0f-3401-471f-bd96-145571e27882',
        title: 'Custom Fit',
        number: 6
    },
];


const demoData = [
    {
        id: "ygdg",
        FabricImages: ["https://d23gkft280ngn0.cloudfront.net/large/2019/11/7/Sherri-Hill-Sherri-Hill-53448-pink-45390.jpg"],
        Name: "Levyne",
        ShortDescription: "Short1",
        DiscountPrice: 1000,
        ActualPrice: 1200
    },
    {
        id: "yg19y2bdg",
        FabricImages: ["https://d23gkft280ngn0.cloudfront.net/large/2019/11/8/Sherri-Hill-Sherri-Hill-53893-lilac-47316.jpg"],
        Name: "Levyne",
        ShortDescription: "Short2",
        DiscountPrice: 1500,
        ActualPrice: 1700
    },
    {
        id: "yqwbkgdg",
        FabricImages: ["https://www.sherrihill.com/dw/image/v2/BDBR_PRD/on/demandware.static/-/Sites-master-catalog-sherrihill/default/dwd9897a94/images/Sherri-Hill-11335-ivory-nude-40505.jpg?sw=1332&sh=2000"],
        Name: "Levyne",
        ShortDescription: "Short13",
        DiscountPrice: 800,
        ActualPrice: 1200
    },
    {
        id: "yqweqgdg",
        FabricImages: ["https://d23gkft280ngn0.cloudfront.net/large/2019/11/7/Sherri-Hill-Sherri-Hill-53448-pink-45390.jpg"],
        Name: "Levyne",
        ShortDescription: "Short4",
        DiscountPrice: 900,
        ActualPrice: 1500
    },
    {
        id: "ygkqbkdg",
        FabricImages: ["https://d23gkft280ngn0.cloudfront.net/large/2019/11/8/Sherri-Hill-Sherri-Hill-53893-lilac-47316.jpg"],
        Name: "Levyne",
        ShortDescription: "Short5",
        DiscountPrice: 600,
        ActualPrice: 800
    }
]

export default class AddToCartModal extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            SizeSelected: 1,
            CustomFabric: false,
            CustomerFabric: true
        }
    }

    onUpperPressed = (selectedOne) => {
        this.setState({ SizeSelected: selectedOne })
        // console.warn('upper pressed', selectedOne)
    }


    headerFlatlist = () => {
        return(
            <View marginH-10>
                <Text hb1 secondary>Choose size:</Text>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={upperList}
                    horizontal={true}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => (this.onUpperPressed(item.number))}
                        >
                            <CstmShadowView style={styles.shadow}>
                                <View style={item.number === this.state.SizeSelected ? styles.boxSelected : styles.box}>
                                    <Text secondary h2>{item.title}</Text>
                                </View>
                            </CstmShadowView>
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
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
                    {
                        this.state.CustomerFabric === true ?
                            <View>
                                <View row spread>
                                    <Text hb1 secondary>Provide my own fabric</Text>
                                    <Checkbox
                                        value={this.state.CustomFabric}
                                        onValueChange={CustomFabric => this.setState({CustomFabric})}
                                        borderRadius={10}
                                        size={25}
                                        color={Colors.primary}
                                    />
                                </View>
                                {
                                    this.state.CustomFabric === false ?
                                        <Text hb1 marginT-20 secondary>Choose the fabric</Text>:<></>
                                }
                            </View>:
                            <View>
                                <Text hb1 secondary>Choose the fabric</Text>
                            </View>
                    }
                </View>
            </View>
        )
    }

    render() {
        return (
            <>
                <View row centerV left paddingL-10 style={{height:50}}>
                    <TouchableOpacity onPress={this.props.Modal}><BackArrowIcon/></TouchableOpacity>
                    <Text h1 marginL-20>Back to the product</Text>
                </View>
                <View paddingT-10 paddingH-5 flex>
                    <FlatList
                        ListHeaderComponent={this.headerFlatlist}
                        data={demoData}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                            this.state.CustomFabric === true ?
                                <></> :
                                <FabricItemContainer
                                    item={item}
                                />
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
                <View>
                    <CstmShadowView style={{margin:15}}>
                        <Button label={"Add to Cart"}/>
                    </CstmShadowView>
                </View>
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
        padding:25,
        borderColor: Colors.white,
        borderWidth:2,
        borderStyle:'solid',
    },
    boxSelected:{
        borderRadius: BORDER_RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        height: BOX_HEIGHT,
        padding:25,
        borderColor:Colors.primary,
        borderWidth:2,
        borderStyle:'solid',
    },
    shadow: {
        height: BOX_HEIGHT,
        margin: 10,
    },
    Group: {
        flex: 1,
        marginHorizontal: 15
    }

})
