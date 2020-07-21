import React from 'react';
import {View, Colors, LoaderScreen} from 'react-native-ui-lib';
export default Loader = () => {
    return (
        <View centerV centerH flex>
            <LoaderScreen
                backgroundColor={Colors.white}
                loaderColor={Colors.primary}
            />
        </View>
    );
}