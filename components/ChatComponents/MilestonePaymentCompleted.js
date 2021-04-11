import React from 'react';
import CstmShadowView from '../CstmShadowView';
import {Text} from 'react-native-ui-lib';

const MilestonePaymentCompleted = ({Price}) => (
    <CstmShadowView style={{height:"auto", padding:15, borderRadius:5, margin: 20,}}>
        <Text h2 secondary>Payment of <Text hb1 black>₹{Price}</Text> done successfully!</Text>
    </CstmShadowView>
)

export default MilestonePaymentCompleted;