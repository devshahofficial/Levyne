import React from 'react';
import {Dimensions, FlatList, Image, ScrollView, StyleSheet} from 'react-native';
import {View,Text} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import ProductItemContainer from "../components/ProductItemContainer";
import {DeliveryIcon} from "../Icons/Secondary/DeliveryIcon";
import Colors from "../Style/Colors";
import {TailorIcon} from "../Icons/Secondary/TailorIcon";
import {FashionDesignerIcon} from "../Icons/Secondary/FashionDesignerIcon";
import {FabricIcon} from "../Icons/Secondary/FabricIcon";

const data = [
    {
        id: "bkjbw",
        name: "Hello",
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1209112782.jpg?crop=0.669xw:1.00xh;0.183xw,0&resize=640:*"
    },
    {
        id: "bkjdwbw",
        name: "Hello",
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1209112782.jpg?crop=0.669xw:1.00xh;0.183xw,0&resize=640:*"
    },
    {
        id: "bkjwbw",
        name: "Hello",
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1209112782.jpg?crop=0.669xw:1.00xh;0.183xw,0&resize=640:*"
    },
    {
        id: "bkj12bw",
        name: "Hello",
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1209112782.jpg?crop=0.669xw:1.00xh;0.183xw,0&resize=640:*"
    },
    {
        id: "bkdde2jbw",
        name: "Hello",
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1209112782.jpg?crop=0.669xw:1.00xh;0.183xw,0&resize=640:*"
    }
]

class Bucket extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            CustomProducts: true,
            Products: true,
            Fabrics: true
        }
    }


    navigateProduct = (ProductID) => {
        this.props.navigation.push('Product', {ProductID : ProductID})
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Tailor name'}/>
                <ScrollView
                    style={{backgroundColor: Colors.white}}
                >
                    {
                        this.state.CustomProducts === true ?
                            <View>
                                <View marginT-20 paddingH-15 center row style={styles.View}>
                                    <TailorIcon size={30} Color={Colors.black} />
                                    <Text marginL-10 h2>
                                        Custom-Tailored Products
                                    </Text>
                                </View>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    data={data}
                                    renderItem={({ item }) =>
                                        <View margin-20>
                                            <Text>{item.name}</Text>
                                            <Image style={{height:150,width:150}} source={{uri: item.image}}/>
                                        </View>
                                    }
                                    // renderItem={({ item }) => <ProductItemContainer Token={this.props.AccessToken} item={item} navigateProduct={this.navigateProduct}/>}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>:
                            <></>
                    }
                    {
                        this.state.Products === true ?
                            <View>
                                <View marginT-20 paddingH-15 center row style={styles.View}>
                                    <FashionDesignerIcon size={30} Color={Colors.black} />
                                    <Text marginL-10 h2>
                                        Fashion Designed Products
                                    </Text>
                                </View>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    data={data}
                                    renderItem={({ item }) =>
                                        <View margin-20>
                                            <Text>{item.name}</Text>
                                            <Image style={{height:150,width:150}} source={{uri: item.image}}/>
                                        </View>
                                    }
                                    // renderItem={({ item }) => <ProductItemContainer Token={this.props.AccessToken} item={item} navigateProduct={this.navigateProduct}/>}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>:
                            <></>
                    }
                    <View>
                        {
                            this.state.Fabrics === true ?
                                <View>
                                    <View marginT-20 paddingH-15 center row style={styles.View}>
                                        <FabricIcon size={30} Color={Colors.black} />
                                        <Text marginL-10 h2>
                                            Premium Fabrics
                                        </Text>
                                    </View>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true}
                                        data={data}
                                        renderItem={({ item }) =>
                                            <View margin-20>
                                                <Text>{item.name}</Text>
                                                <Image style={{height:150,width:150}} source={{uri: item.image}}/>
                                            </View>
                                        }
                                        // renderItem={({ item }) => <ProductItemContainer Token={this.props.AccessToken} item={item} navigateProduct={this.navigateProduct}/>}
                                        showsVerticalScrollIndicator={false}
                                    />
                                </View>:
                                <></>
                        }
                    </View>
                </ScrollView>
            </>
        );
    }

};

const styles = StyleSheet.create({
    View: {
        height: 50,
        width: Dimensions.get('window').width,
        marginLeft: -15,
        backgroundColor: Colors.shadow,
    },
    Product: {
        backgroundColor: Colors.shadow,
        flex: 1
    }
});


const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(Bucket);
