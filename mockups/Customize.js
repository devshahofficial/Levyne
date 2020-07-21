import React from 'react';
import {View,Text} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';

class Customize extends React.Component {

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Customize'}/>
                <View paddingL-15 paddingR-15 flex centerV centerH>
                    <Text marginL-50 marginR-50 center b1 grey40>Customize</Text>
                </View>
            </>
        );
    }

};

const mapsStateToProps = state => ({
    access_token : state.Auth.access_token
});

export default connect(mapsStateToProps)(Logistics);
