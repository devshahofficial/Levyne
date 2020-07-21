import React from 'react';
import {View, Text, ConnectionStatusBar} from'react-native-ui-lib';
import {connect} from 'react-redux';

ConnectionStatusBar.registerGlobalOnConnectionLost(() => {
    //this.navigation.navigate('InternetConnection');
});

class InternetConnection extends React.Component {
    constructor(props) {
        super(props);
    };


    render() {
        return (
            <View flex centerV centerH paddingH-20>
                <Text b1 secondary>Failed to connect to the Internet :(</Text>
            </View>
        );
    };
}
export default connect()(InternetConnection)
