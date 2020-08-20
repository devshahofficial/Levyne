import React from 'react';
import {View,Text} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import NavBarBack from '../components/NavBarBack';
import BucketComponent from "../components/BucketComponent";

class Cart extends React.Component {

    onBucketPress = () => {
        this.props.navigation.navigate("Bucket");
    }

    render() {
        return (
            <>
                <NavBarBack Navigation={this.props.navigation.goBack} Title={'Your Wardrobe'}/>
                <View paddingH-15 flex centerH>
                    <BucketComponent Navigation={this.onBucketPress}/>
                </View>
            </>
        );
    }

};

const mapsStateToProps = state => ({
    AccessToken : state.Auth.AccessToken
});

export default connect(mapsStateToProps)(Cart);
