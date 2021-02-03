import React from 'react';
import { TouchableOpacity, Text } from 'react-native-ui-lib';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import HandleShareURL from '../../API/Home/HandleShareURL';

export default class ScanScreen extends React.Component {

    Header = () => (
        <Text center>
            Go to{' '}
            <Text hb1>wikipedia.org/wiki/QR_code</Text>
            on your computer and scan the QR code.
        </Text>
    )

    Footer = () => (
        <TouchableOpacity padding-15>
            <Text blue10>OK. Got it!</Text>
        </TouchableOpacity>
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
                 *  4 : 3D Models //Need to implement this.
                 *  5 : Brand
                 */
                HandleShareURL(LevyneData.Type, LevyneData.ID, this.props.navigation);
            }
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess}
                flashMode={RNCamera.Constants.FlashMode.auto}
                showMarker={true}
                checkAndroid6Permissions={true}
                topContent={<this.Header />}
                bottomContent={<this.Footer />}
            />
        );
    }

};
