import React, { PureComponent } from 'react';
import {TouchableOpacity,Text,Colors,View} from 'react-native-ui-lib';
import {ShoppingBag} from "../Icons/ShoppingBag";
import CstmShadowView from "./CstmShadowView";
import {StyleSheet, Platform} from 'react-native';

//The bar at the bottom with a textbox and a send button.
export default class ConfirmModal extends PureComponent {

    render() {
        return (
            <TouchableOpacity
                paddingB-5 marginR-10 marginL-5 center
                onPress={this.props.onSendPressed}
                style={{
                    backgroundColor: 'rgba(255,255,255,0)',

                }}
            >
                <CstmShadowView style={{height:50, width:50, justifyContent:'center', alignContent:'center'}}>
                    <View flex center style={{borderRadius: 50}}>
                        <ShoppingBag size={25} Color={Colors.black}/>
                    </View>
                </CstmShadowView>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    YesButton:{
        backgroundColor:Colors.primary,
        marginLeft:80,
        borderRadius: 60,
        height: 35,
        width:85,
    },
    modal: {
        paddingHorizontal: 20,
        flexDirection:'row',
        flex: 1,
        justifyContent: 'center',
        height: 50,
        paddingBottom: Platform.OS === 'ios' ? 5 : 0
    },
})
