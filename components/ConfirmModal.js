import React, { PureComponent } from 'react';
import {TouchableOpacity,Text,Colors,View} from 'react-native-ui-lib';
import {ShoppingBag} from "../Icons/ShoppingBag";
import CstmShadowView from "./CstmShadowView";
import {StyleSheet, Platform} from 'react-native';

//The bar at the bottom with a textbox and a send button.
export default class ConfirmModal extends PureComponent {

    render() {
        return (
            <View row paddingB-5>
                <TouchableOpacity activeOpacity={0.6} row flex-85 marginR-5 marginL-10 center>
                    <CstmShadowView style={styles.modal}>
                        <View centerV style={{alignContent:"space-between"}} row>
                            <Text h2 secondary style={styles.ConfirmOrder}>Confirm Order?</Text>
                            <View center style={styles.YesButton}>
                                <Text hb2 white>Yes</Text>
                            </View>
                        </View>
                    </CstmShadowView>
                </TouchableOpacity>
                <TouchableOpacity marginR-10 marginL-5 flex-15 onPress={this.props.onSendPressed} center>
                    <CstmShadowView style={{height:50, width:50, justifyContent:'center', alignContent:'center'}}>
                        <View center style={{borderRadius: 50}}>
                            <ShoppingBag size={25} Color={Colors.black}/>
                        </View>
                    </CstmShadowView>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    YesButton:{
        backgroundColor:Colors.primary,
        marginLeft:80,
        borderRadius: 60,
        height: 35,
        width:85    ,
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
