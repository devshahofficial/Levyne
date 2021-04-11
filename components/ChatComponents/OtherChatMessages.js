import React from 'react';
import {Colors, Text, AnimatedImage, View, TouchableOpacity} from "react-native-ui-lib";
import {ActivityIndicator, StyleSheet} from "react-native";
import CstmShadowView from '../../components/CstmShadowView';
import Hyperlink from 'react-native-hyperlink';


export const RightText = ({TextInput, Timestamp}) => (
    <CstmShadowView style={{...styles.Msg, alignSelf: 'flex-end', paddingTop: 10}}>
        <Hyperlink linkDefault={ true }  linkStyle = {{ color: Colors.blue10 }}>
            <Text h1>{TextInput}</Text>
        </Hyperlink>
        <Text secondary h3 style={{alignSelf: 'flex-end'}}>{Timestamp}</Text>
    </CstmShadowView>
)

export const LeftText = ({TextInput, Timestamp}) => (
    <CstmShadowView style={{...styles.Msg, alignSelf: 'flex-start', paddingTop: 10}}>
        <Hyperlink linkDefault={ true } linkStyle = {{ color: Colors.blue10 }}>
            <Text h1>{TextInput}</Text>
        </Hyperlink>
        <Text h3 secondary>{Timestamp}</Text>
    </CstmShadowView>
)

export const CenterText = ({TextInput}) => (
    <View style={styles.CenterText} center>
        <Hyperlink linkDefault={ true } linkStyle = {{ color: Colors.blue10 }}>
            <Text center h3>{TextInput}</Text>
        </Hyperlink>
    </View>
)

export const LeftImage = ({Source, Timestamp, onPress}) => (
    <CstmShadowView style={{...styles.Msg, alignSelf: 'flex-start'}}>
        <TouchableOpacity onPress={onPress}>
            <AnimatedImage
                loader={<ActivityIndicator />}
                containerStyle={{backgroundColor: Colors.secondary, marginBottom: 5}}
                style={{height: 250, width:250, resizeMode: 'cover'}}
                source={Source}
            />
        </TouchableOpacity>
        <Text h3 secondary>{Timestamp}</Text>
    </CstmShadowView>
)

export const RightImage = ({Source, Timestamp, onPress}) => (
    <CstmShadowView style={{...styles.Msg, alignSelf: 'flex-end'}}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.90}>
            <AnimatedImage
                loader={<ActivityIndicator />}
                containerStyle={{backgroundColor: Colors.secondary, marginBottom: 5}}
                style={{height: 250, resizeMode: 'cover', width:250}}
                source={Source}
            />
        </TouchableOpacity>
        <Text h3 secondary style={{alignSelf: 'flex-end'}}>{Timestamp}</Text>
    </CstmShadowView>
)


const styles = StyleSheet.create({
    Msg: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        height: 'auto',
        minWidth: '25%',
        maxWidth: 270,
    },
    CenterText: {
        margin: 10,
        padding: 10,
        height: 'auto',
        minWidth: 150,
        maxWidth: 200,
        alignSelf: 'center',
        backgroundColor: Colors.shadow,
        borderRadius: 10
    }
});