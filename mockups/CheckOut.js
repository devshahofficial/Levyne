import React from 'react';
import {Dimensions, FlatList,StyleSheet} from 'react-native';
import {View,Text,Button, TouchableOpacity} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import {DeliveryIcon} from "../Icons/Secondary/DeliveryIcon";
import Colors from "../Style/Colors";
import BucketProduct from "../components/BucketProduct";
import {TimerIcon} from "../Icons/Secondary/TimerIcon";
import FetchCart from '../API/FetchCart';
import {CheckoutIcon} from "../Icons/CheckoutIcon";

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

class CheckOut extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            CustomProducts: true,
            Products: true,
            Fabrics: true
        }
    }


    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Tailor name'}/>

                <View flex>
                    <View style={{borderWidth: 1, flex:1}}>

                    </View>
                </View>

                <TouchableOpacity center row style={styles.Button} activeOpacity={0.8}>
                    <CheckoutIcon size={30} Color={Colors.white} />
                    <Text marginL-20 hb1 white>
                        Place an Order
                    </Text>
                </TouchableOpacity>
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
    },
    Button: {
        height: 50,
        width: Dimensions.get('window').width,
        backgroundColor: Colors.primary,
    }
});


const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(CheckOut);
