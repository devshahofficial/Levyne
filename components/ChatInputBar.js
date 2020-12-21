import React, { PureComponent } from 'react';
import {TextArea, TouchableOpacity, View} from 'react-native-ui-lib';
import {StyleSheet, Platform} from 'react-native';
import {ShareIcon} from "../Icons/ShareIcon";
import CstmShadowView from "./CstmShadowView";
import Colors from '../Style/Colors';
import {CameraIcon} from "../Icons/CameraIcon";

//The bar at the bottom with a textbox and a send button.
export default class ChatInputBar extends PureComponent {

    render() {
        return (
            <View paddingB-20 row center>
                <View flex-85 row centerV marginL-10 marginR-5>
                    <CstmShadowView style={styles.ShadowViewInput}>
                        <View centerV marginL-10 flex-10 style={styles.TextArea}>
                            <TextArea
                                hideUnderline h1
                                blurOnSubmit={true}
                                placeholder={"Type message..."}
                                placeholderTextColor={Colors.secondary}
                                value={this.props.value}
                                onChangeText={this.props.onChangeText}
                                key={this.props.TextInputKey}
                            />
                        </View>
                        <TouchableOpacity flex onPress={this.props.DisplayImagePicker} center style={styles.TouchableOpacity}>
                            <View center>
                                <CameraIcon size={25} Color={Colors.black}/>
                            </View>
                        </TouchableOpacity>
                    </CstmShadowView>
                </View>

                <TouchableOpacity flex-15 marginL-5 marginR-10 onPress={this.props.SendMessage} center>
                    <CstmShadowView style={styles.ShadowViewButton}>
                        <View center style={styles.ShareIcon}>
                            <ShareIcon size={25} Color={Colors.black}/>
                        </View>
                    </CstmShadowView>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    ShadowViewInput:{
        paddingRight: 10,
        flex:1,
        flexDirection:"row",
        alignItems:'flex-end',
        paddingTop: Platform.OS === 'ios' ? 6 : undefined
    },
    ShadowViewButton:{
        height:50,
        width: 50,
        justifyContent:'center'
    },
    ShareIcon: {
        borderRadius:50
    },
    TextArea: {
        borderRadius:50,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    TouchableOpacity: {
        borderRadius:50,
        height:50,
        width: 50,
        paddingRight:Platform.OS === 'ios' ? 5 : 0
    }
})
