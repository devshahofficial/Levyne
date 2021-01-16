import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../assets/colors';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import EditProfileAPI from '../API/Profile/EditProfile';
import CstmInput from "../components/input";
import {ActionSheet, View, Text, TouchableOpacity, Button, Avatar} from 'react-native-ui-lib';
import CstmShadowView from '../components/CstmShadowView';

export default class OrderSuccessful extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    avatarView: {
        marginBottom: 10,
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        height: 100,
        width: 100,
        borderColor: colors.trivisionPink,
        borderWidth: 2,
    },

    Button: {
        borderRadius: 40,
        backgroundColor:colors.trivisionWhite,
        borderColor:colors.trivisionWhite,
    },

});
