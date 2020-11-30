import React from 'react';
import {View, Button, Colors} from 'react-native-ui-lib';
import LoginSVG from "../assets/images/AppImages/Login.svg";

export default class UnLoggedScreen extends React.PureComponent {

    render() {
        return (
            <>
                <View flex center>
                    <LoginSVG width={'90%'}/>
                </View>
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
