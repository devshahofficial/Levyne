import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Button, Text} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import Colors from '../Style/Colors';
import CstmShadowView from "../components/CstmShadowView";
import TextNavBar from '../components/TextNavBar';

class Upload extends React.Component {

    onProductPress = () => {
        this.props.navigation.navigate('ProductUpload');
    }

    onFabricPressed = () => {
        this.props.navigation.navigate('FabricUpload');
    }

    render() {
        return (
            <>
                <TextNavBar Title={'Upload on Levyne'}/>
                <View style={styles.Container}>
                    <CstmShadowView style={styles.Component}>
                        <Button
                            flex h1
                            onPress={this.onProductPress}
                            label='Upload a Product'
                        />
                    </CstmShadowView>
                    <CstmShadowView style={styles.Component}>
                        <Button
                            flex h1
                            onPress={this.onFabricPressed}
                            label='Upload a Fabric'
                        />
                    </CstmShadowView>
                    <Text center marginT-200 h3 primary marginH-70>Exciting Upload options shall be available in the upcoming updates.</Text>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    Component: {
        marginHorizontal:50,
        height:100,
        marginVertical:20
    }
})


const mapsStateToProps = state => ({
    access_token : state.Auth.access_token
});

export default connect(mapsStateToProps)(Upload)
