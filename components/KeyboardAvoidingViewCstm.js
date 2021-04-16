import React from 'react';
import {Platform, KeyboardAvoidingView} from 'react-native';

const KeyboardAvoidingViewCstm = ({children, ...props}) => {
    if(Platform.OS === 'android') {
        return children;
    } else {
        return <KeyboardAvoidingView {...props}>{children}</KeyboardAvoidingView>
    }
}

export default KeyboardAvoidingViewCstm;