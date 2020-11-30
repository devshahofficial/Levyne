import React from 'react';
import {Button, Colors} from 'react-native-ui-lib';
import LoginSVG from "../assets/images/AppImages/Login.svg";
import {SafeAreaView} from "react-native";

export default class UnLoggedScreen extends React.PureComponent {

    render() {
        return (
            <>
                <SafeAreaView flex center>
                    <LoginSVG width={'90%'}/>
                </SafeAreaView>
                <Button
                    hb1 label={'Login'}
                    style={{
                        borderRadius:0,
                        borderWidth:1,
                        borderColor: Colors.primary
                    }}
                />
            </>

        );
    }
}
