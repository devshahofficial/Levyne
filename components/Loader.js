import React from 'react';
import {ActivityIndicator} from 'react-native';
import {View} from 'react-native-ui-lib';
export default Loader = () => {
    return (
        <View center flex>
            <ActivityIndicator/>
        </View>
    );
}