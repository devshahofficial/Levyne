import React from 'react';
import {View} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../../components/NavBarBack';
import MessageSVG from '../../assets/images/AppImages/Notifications.svg';
import {Dimensions} from "react-native";

const windowHeight = Dimensions.get('window').height;

class Notifications extends React.Component {

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Notifications'}/>
                <View flex center style={{height:windowHeight-50}}>
                    <MessageSVG width={'80%'}/>
                </View>
            </>
        );
    }

};

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(Notifications);
