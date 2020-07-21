import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, ImageBackground, Image, FlatList } from 'react-native';
import { DrawerHeaderFooter, Layout, Text, Button, List, ListItem, Icon } from '@ui-kitten/components';
import colors from "../assets/colors"; // '../assets..'
import ProductItemContainer from '../components/ProductItemContainer'

const coverImage1 = require("../assets/images/5.jpg"); 
const coverImage2 = require("../assets/images/6.jpg"); 
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        fd: 'Fashion Designer',
        image: coverImage1,
        favourite:true,
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Second Item',
        fd: 'FD2',
        image: coverImage2,
        favourite:true,

    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Third Item',
        fd: 'FD3',
        image: coverImage2,
        favourite:false,
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Fourth Item',
        fd: 'FD4',
        image: coverImage1,
        favourite:false,
    },
    {
        id: '3ac68afc-c405-48d3-a4f8-fbd91aa97f63',
        title: 'Fifth Item',
        fd: 'FD3',
        image: coverImage1,
        favourite:false,
    },
    {
        id: '58694a0f-3401-471f-bd96-145571e29d72',
        title: 'Sixth Item',
        fd: 'FD4',
        image: coverImage1,
        favourite:false,
    },
];

export default class ProductSearchResultScreen extends Component {

    render() {
        return (
            <Layout>
                <View style={styles.topPart}>
                    <Text style={styles.TopPartText}> Results of your Search </Text>
                    <Icon style={styles.funnelIcon} name='funnel-outline' width={25} height={25} fill={colors.trivisionPink} />
                </View>

                <FlatList
                    style={styles.flatlist}
                    data={DATA}
                    numColumns={2}
                    renderItem={({ item }) => <ProductItemContainer item={item} />}
                    keyExtractor={item => item.id}
                />

            </Layout>
        )

    }
}

const styles = StyleSheet.create({

    flatlist: {
        marginTop: 6,
        marginLeft: 2,
    },
    funnelIcon: {
        position: 'relative',
        flex: 0.1,
    },
    TopPartText: {
        fontSize: 20,
        marginLeft: 8,
        flex: 0.9,
        padding: 4,
    },
    topPart: { //result text and funnel icon
        marginVertical: 10,
        flexDirection: 'row',
        borderRadius: 40,
    },

})

