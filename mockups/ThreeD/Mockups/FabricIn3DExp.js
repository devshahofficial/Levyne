import React, { Component } from 'react';
import {SafeAreaView} from 'react-native';
import {Colors, Text, TouchableOpacity} from "react-native-ui-lib";
import NavBarBack from "../../../components/NavBarBack";
import WebView from "react-native-webview";
import {CallIcon} from "../../../Icons/CallIcon";
import ImagePicker from 'react-native-image-crop-picker';

export default class NewScreen extends Component {

    URL3DModelBase = `https://3d.levyne.com`;

    goBack = () => {
        this.props.navigation.goBack();
    }

    RNWebview = React.createRef();

    state = {
        injectedJavaScript : ''
    }

    FabricImages = [];

    TouchableOpacityOnPress = () => {

        /*
        
        */

        ImagePicker.openPicker({
            writeTempFile: false,
            width: 1024,
            height: 1024,
            includeBase64: true,
            forceJpg: true
        }).then(resp => {
            this.FabricImages.push(`data:${resp.mime};base64,${resp.data}`);
            this.setState({
                injectedJavaScript: 'window.FabricImages = ' + JSON.stringify(this.FabricImages)
            })
    
            this.RNWebview.current.reload();
        })
    }

    render() {
        return (
            <>
                <NavBarBack Title={"Design 3D here!"} Navigation={this.goBack} />
                <SafeAreaView style={{flex: 1}}>

                    <WebView
                        source={{ uri: this.URL3DModelBase }}
                        injectedJavaScriptBeforeContentLoaded={this.state.injectedJavaScript}
                        onMessage={console.log}
                        ref={this.RNWebview}
                    />
                    <TouchableOpacity
                        style={{height:50, backgroundColor: Colors.primary}} center
                        onPress={this.TouchableOpacityOnPress} row
                    >
                        <CallIcon Size={18} Color={Colors.white}/>
                        <Text h1 white marginL-20>Add Fabric Images</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </>
        )

    }
}


