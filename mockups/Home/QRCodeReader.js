import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import HandleShareURL from '../../API/Home/HandleShareURL';
import NavbarBack from "../../components/NavBarBack";
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width

export default class ScanScreen extends React.Component {

    Header = () => (
        <View style={{width}} flex paddingH-10>
            <Text h1>Ask for a QR code from your fashion designer and enjoy seamless tailoring online.</Text>
        </View>
    )

    Footer = () => (
        <View style={{width}} flex paddingH-10 marginT-50>
            <Text secondary h3 center>Unlock the potential of hassle free product searching!</Text>
        </View>
    )

    onSuccess = ({data: url}) => {
        try {

            /**
             * Types
             *  1 : Product
             *  2 : Fabric
             *  3 : Design
             *  4 : 3D Models
             *  5 : Brand
             */

            const ScreenIDs = {
                'p': 1,
                'P': 1,
                'f': 2,
                'F': 2,
                'd': 3,
                'D': 3,
                'm': 4,
                'M': 4,
                'B': 5,
                'b': 5
            }

            const Paths = url.replace('https://collections.levyne.com', '').split('/');
            if (Paths.length === 3) {
                HandleShareURL(ScreenIDs[Paths[1]], parseInt(Paths[2]), this.props.navigation);
            } else if(ScreenIDs[Paths[1]] === 4 && Paths.length === 4) {
                HandleShareURL(ScreenIDs[Paths[1]], Paths[3], this.props.navigation, Paths[2]);
            }

        } catch(err) {
            console.log(err);
        }
    }

    render() {
        return (
            <>
                <NavbarBack Title={"Scan now"} Navigation={this.props.navigation.goBack}/>
                <QRCodeScanner
                    onRead={this.onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    showMarker={true}
                    checkAndroid6Permissions={true}
                    topContent={<this.Header/>}
                    bottomContent={<this.Footer/>}
                />
            </>
        );
    }

};
