import React from 'react';
import {View,Button} from 'react-native-ui-lib';
import CstmShadowView from '../../components/CstmShadowView';
import NavBarBack from '../../components/NavBarBack';
import {Linking} from "react-native";


export default class Help extends React.Component {

    render() {
        return (
            <>
                <NavBarBack Title={'Help And Support'} Navigation={this.props.navigation.goBack}/>
                <View flex>
                    <View marginL-15 marginR-15>
                        <CstmShadowView style={{marginBottom: 10}}>
                            <Button
                                onPress={() => Linking.openURL('tel:+91 9819 077182')}
                                h1 label={"Call us"} flex
                            />
                        </CstmShadowView>
                    </View>
                    <View marginL-15 marginR-15>
                        <CstmShadowView style={{marginBottom: 10}}>
                            <Button
                                onPress={() => Linking.openURL('mailto:contact@levyne.com')}
                                h1 label={"Email us"} flex
                            />
                        </CstmShadowView>
                    </View>
                    <View marginL-15 marginR-15>
                        <CstmShadowView style={{marginBottom: 10}}>
                            <Button
                                onPress={() => Linking.openURL('https://levyne.com')}
                                h1 label={"Visit our Website"} flex
                            />
                        </CstmShadowView>
                    </View>
                </View>
            </>
        );
    }

};
