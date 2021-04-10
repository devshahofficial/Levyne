import React from 'react';
import {Text, TouchableOpacity} from 'react-native-ui-lib';
import CstmShadowView from "../../components/CstmShadowView";

export class MileStonePay extends React.Component {

    render() {
        return (
            this.props.Hello ?
                <CstmShadowView style={{height:"auto", padding:15, borderRadius:5, margin: 20,}}>
                    <Text hb1>₹{this.props.Price}3000</Text>
                    <Text h2 secondary>{this.props.Note}Added embroidery and also added a new broch.</Text>
                    {
                        this.props.isPaymentDone ?
                            <TouchableOpacity marginT-15 styles={{justifyContent:"flex-start"}}>
                                <Text primary>Secure Pay</Text>
                            </TouchableOpacity> : <></>
                    }
                </CstmShadowView> :
                <CstmShadowView style={{height:"auto", padding:15, borderRadius:5, margin: 20,}}>
                    <Text h2 secondary>Payment of  <Text hb1 black>₹{this.props.Price}3000</Text>  done successfully!</Text>
                </CstmShadowView>
        );
    }

};
