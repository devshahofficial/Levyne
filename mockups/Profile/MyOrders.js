import React, { Component } from 'react';
import {View} from 'react-native-ui-lib';
import NavBarBack from '../../components/NavBarBack';
import OrdersContainer from "../../components/OrdersContainer";
import {connect} from 'react-redux';
import FetchOrders from '../../API/FetchOrders';
import {ActivityIndicator, FlatList} from 'react-native';

class MyOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Orders : [],
            Loading: true
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
 
    render() {
        return(
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'My Orders'}/>
                {this.state.Loading ?
                    <View flex center>
                        <ActivityIndicator />
                    </View> :
                    <View paddingH-15 flex centerH>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.Orders}
                            keyExtractor={(item) => `${item.OrderID}`}
                            renderItem={this.FatListRenderItem}
                        />
                    </View>
                }
            </>
        );
    }
}

const mapsStateToProps = state => ({
    AccessToken: state.Auth.AccessToken,
});

export default connect(mapsStateToProps)(MyOrders);
