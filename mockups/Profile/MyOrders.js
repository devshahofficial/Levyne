import React, { Component } from 'react';
import {Text, View, Colors} from 'react-native-ui-lib';
import NavBarBack from '../../components/NavBarBack';
import OrdersContainer from "../../components/OrdersContainer";
import {connect} from 'react-redux';
import FetchOrders from '../../API/FetchOrders';
import {ActivityIndicator, StyleSheet, FlatList} from 'react-native';

class MyOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Orders : [
                {
                    OrderID: 8917,
                    ProfileImage: '',
                    Name: "Hello",
                    TotalDiscountAmount: 1987,
                    TotalAmount: 2133,
                },
                {
                    OrderID: 817,
                    ProfileImage: '',
                    Name: "Hllo",
                    TotalDiscountAmount: 197,
                    TotalAmount: 213,
                },
                {
                    OrderID: 917,
                    ProfileImage: '',
                    Name: "Hel",
                    TotalDiscountAmount: 187,
                    TotalAmount: 213,
                }
            ],
            Loading: false
        }
        this.abortController = new AbortController();
        this.LastOrderID = 0;
    }

    componentDidMount() {
        FetchOrders(this.LastOrderID, this.props.AccessToken, this.abortController.signal).then(Orders => {
            this.setState({
                Orders,
                Loading: false
            })
        }).catch(console.log);
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    FatListRenderItem = ({item}) => (
        <OrdersContainer {...item} NavigateMyOrdersDetailed={this.NavigateMyOrdersDetailed} />
    )

    NavigateMyOrdersDetailed = (OrderID) => {
        this.props.navigation.navigate('MyOrdersDetailed', {OrderID});
    }

    Header = () => {
        return(
            <View style={styles.Header} marginB-10>
                <Text center hb2>Note:</Text>
                <Text h2 secondary>Once the order gets accepted from our side, you won't be able to cancel the order.</Text>
                <Text marginT-5 h2 secondary>For order cancellation call us on +91-9819077182.</Text>
            </View>
        )
    }
    render() {
        return(
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Wardrobe'}/>
                {this.state.Loading ?
                    <View flex center>
                        <ActivityIndicator />
                    </View> :
                    <View paddingH-15 flex centerH>
                        <OrdersContainer
                            OrderID={2615}
                            Name={"Vicky Tailors"}
                            CompanyRating={4}
                            ProfileImage={"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"}
                        />
                    </View>
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    Header: {
        borderWidth:1,
        borderColor: Colors.shadow,
        borderRadius: 5,
        padding: 10

    }
})

const mapsStateToProps = state => ({
    AccessToken: state.Auth.AccessToken,
});

export default connect(mapsStateToProps)(MyOrders);
