import React from 'react';
import CstmShadowView from '../../components/CstmShadowView';
import {Text, TouchableOpacity} from 'react-native-ui-lib';

const MilestonePaymentDetails = ({Price, Note, isPaymentDone, onPress}) => (
    <CstmShadowView style={{height:"auto", padding:15, borderRadius:5, margin: 20,}}>
        <Text hb1>₹{Price}</Text>
        <Text h2 secondary>{Note}</Text>
        {
            isPaymentDone ?
                <></>
                :
                <TouchableOpacity onPress={onPress} marginT-15 styles={{justifyContent:"flex-start"}}>
                    <Text primary>Secure Pay</Text>
                </TouchableOpacity>
        }
    </CstmShadowView>
)

export default MilestonePaymentDetails;