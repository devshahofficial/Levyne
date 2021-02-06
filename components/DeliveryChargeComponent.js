import React from 'react';
import {Text} from 'react-native-ui-lib';

/**
 * 
 * @param {{TotalPrice: number}} param0 
 */
const DeliveryChargeComponent = ({TotalPrice}) => {
    if(TotalPrice >= 2000) {
        return (
            <Text marginL-10 h2>
                Free Delivery!
            </Text>
        );
    } else {
        return (
            <Text marginL-10 h2>
                Free Delivery on buckets over ₹2000{'/-'}
            </Text>
        );
    }
}

export default DeliveryChargeComponent