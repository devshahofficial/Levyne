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
            <Text secondary h3 center>Unlock the potential of hassle free product searching power!</Text>
        </View>
    )

    onSuccess = ({data}) => {
        try {
            const LevyneData = JSON.parse(data);
            if(LevyneData.isLevyneQR) {
                /**
                 * Types
                 *  1 : Product
                 *  2 : Fabric
                 *  3 : Design
                 *  4 : 3D Models
                 *  5 : Brand
                 */
                HandleShareURL(LevyneData.Type, LevyneData.ID, this.props.navigation, LevyneData.SubID);
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
