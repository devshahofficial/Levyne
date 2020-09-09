import React from 'react';
import {Text} from 'react-native-ui-lib';

export default DeliveryChargeComponent = (props) => {
    if(props.TotalPrice >= 1000) {
        return <>
            <Text marginL-10 h2>
                Free Delivery!
            </Text>
        </>
    } else {
        return <>
            <Text marginL-10 h2>
                Free Delivery on buckets over ₹1000{'/-'}
            </Text>
        </>
    }
}