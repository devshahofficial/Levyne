import React from 'react';
import {BackHandler, ScrollView, StyleSheet} from 'react-native';
import {View, Colors, Text, ConnectionStatusBar, Toast} from'react-native-ui-lib';
import {connect} from 'react-redux';
import HomeNavBar from '../components/HomeNavBar';

import {WebView} from "react-native-webview";

ConnectionStatusBar.registerGlobalOnConnectionLost(() => {

});

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCustomToast: false,
            showContent: '',
            isConnected: true,
        }
        this.backPressed = 0;
    };

    renderCustomContent = () => {
        const {selectedColor} = this.state;
        const backgroundColor = selectedColor === 'none' ? undefined : selectedColor;

        return (
            <View flex padding-10 style={{backgroundColor}}>
                <Text white h1>
                    {this.state.showContent}
                </Text>
            </View>
        );
    };

    backButtonHandler = () => {
		if(this.props.navigation.isFocused())
		{
			if(this.backPressed > 0){
				BackHandler.exitApp();
			}else {
				this.backPressed++;
                this.setState({showCustomToast: !this.state.showCustomToast});
                this.setState({showContent:'Press Again To Exit'});
                this.BackHandlerTimeOut = setTimeout( () => { this.backPressed = 0}, 2000);
				return true;
			}
		}
    }

    componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);
	}

	componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
        clearTimeout(this.BackHandlerTimeOut)
    }

    navigateSearch = () => {
        this.props.navigation.navigate('Search');
    }
    navigateBookMark = () => {
        this.props.navigation.navigate('BookMark');
    }
    navigateSettings = () => {
        this.props.navigation.navigate('Settings');
    }

    render() {
        return (
            <>
                <HomeNavBar
                    navigateSearch={this.navigateSearch}
                    navigateBookMark={this.navigateBookMark}
                    navigateSettings={this.navigateSettings}
                />
                <ConnectionStatusBar
                    useAbsolutePosition
                    onConnectionChange={isConnected => this.setState({isConnected})}
                />
                <Toast
                    visible={this.state.showCustomToast}
                    position={'bottom'}
                    backgroundColor={Colors.primary}
                >
                    {this.renderCustomContent()}
                </Toast>
                <WebView
                    source={{
                        uri: 'https://levyne3dtrial.netlify.app/'
                    }}
                />

            </>
        );
    };
}


const mapsStateToProps = state => ({
	access_token : state.Auth.access_token
});

export default connect(mapsStateToProps)(HomeScreen)