import React from 'react';
import {View,Button,Text,Colors, TouchableOpacity} from 'react-native-ui-lib';
import CstmShadowView from '../../components/CstmShadowView';
import NavBarBack from '../../components/NavBarBack';
import {Linking} from "react-native";


export default class Help extends React.Component {

    render() {
        return (
            <>
                <NavBarBack Title={'Help And Support'} Navigation={this.props.navigation.goBack}/>
                <View center style={{backgroundColor:Colors.shadow, padding:10, height:'auto'}}>
                    <Text h1 black center>
                        Have a problem with our services? Call us!
                        Partner with Levyne? Call us!
                    </Text>
                </View>
                <View flex>
                    <CstmShadowView style={{marginBottom: 10, marginHorizontal:15}}>
                        <Button
                            onPress={() => Linking.openURL('tel:+91 9819 077182')}
                            h1 label={"Call us"} flex
                        />
                    </CstmShadowView>
                    <CstmShadowView style={{marginBottom: 10, marginHorizontal:15}}>
                        <Button
                            onPress={() => Linking.openURL('mailto:contact@levyne.com')}
                            h1 label={"Email us"} flex
                        />
                    </CstmShadowView>
                    <CstmShadowView style={{marginBottom: 10, marginHorizontal:15}}>
                        <Button
                            onPress={() => Linking.openURL('https://levyne.com')}
                            h1 label={"Visit our Website"} flex
                        />
                    </CstmShadowView>

                    <CstmShadowView style={{marginTop: 20, marginHorizontal:15}}>
                        <Button
                            onPress={() => Linking.openURL('tel:+91 70219 82047')}
                            h1 label={"Report a technical bug"} flex
                        />
                    </CstmShadowView>
                </View>
            </>
        );
    }

};
