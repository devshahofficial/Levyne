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
import BucketProduct from "../components/BucketProduct";
import {TimerIcon} from "../Icons/Secondary/TimerIcon";
import FetchCart from '../API/FetchCart';

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

    componentDidMount() {
        FetchCart(this.props.route.params.BrandID, this.props.AccessToken).then(resp => {
            console.log(resp)
        }).catch(err => {console.log(err)});
    }

    navigateProduct = (ProductID) => {
        this.props.navigation.push('Product', {ProductID : ProductID})
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Tailor name'}/>
                <View paddingB-50>
                    <FlatList
                        ListFooterComponent={
                            <View marginV-20 paddingH-15 center row style={styles.View}>
                                <DeliveryIcon size={30} Color={Colors.black} />
                                {this.props.Delivery === 1 ? (
                                    <>
                                        <Text marginL-10 h2>
                                            Free Delivery!
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <Text marginL-10 h2>
                                            Free Delivery on buckets over ₹1000{'/-'}
                                        </Text>
                                    </>
                                )}
                            </View>
                        }
                        ListHeaderComponent={
                            <View marginT-20 paddingH-15 center row style={styles.View}>
                                <TimerIcon size={30} Color={Colors.black} />
                                <Text marginL-10 h2>
                                    Delivery within 15 days!
                                </Text>
                            </View>
                        }
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({ item }) =>
                            <BucketProduct/>
                        }
                        // renderItem={({ item }) => <ProductItemContainer Token={this.props.AccessToken} item={item} navigateProduct={this.navigateProduct}/>}
                    />
                </View>
            </>
        );
    }

};

const styles = StyleSheet.create({
    View: {
        height: 50,
        width: Dimensions.get('window').width,
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
