import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import {Text, Colors, View} from "react-native-ui-lib";

const PRIMARY_COLOR = Colors.secondary;
const WHITE = Colors.white;
const BORDER_COLOR = Colors.grey60;

/**
 * 
 * @type {React.FunctionComponent<{actionItems: {
 *  id: number,
 *  label: string,
 *  onPress: (arg0: any) => void
 * }[], onCancel: (arg0: any) => void, actionTextColor?: string}>}
 * 
 **/


const ActionSheet = (props) => {
    const { actionItems } = props;
    const actionSheetItems = [
        ...actionItems,
        {
            id: '#cancel',
            label: 'Cancel',
            onPress: props?.onCancel
        }
    ]
    return (
        <View style={styles.modalContent}>
            {
                actionSheetItems.map((actionItem, index) => {
                    return (
                        <TouchableHighlight
                            style={[
                                styles.actionSheetView,
                                index === 0 && {
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                },
                                index === actionSheetItems.length - 2 && {
                                    borderBottomLeftRadius: 12,
                                    borderBottomRightRadius: 12,
                                },
                                index === actionSheetItems.length - 1 && {
                                    borderBottomWidth: 0,
                                    backgroundColor: WHITE,
                                    marginTop: 8,
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                    borderBottomLeftRadius: 12,
                                    borderBottomRightRadius: 12,
                                }]}
                            underlayColor={'#f7f7f7'}
                            key={index} onPress={actionItem.onPress}
                        >
                            <Text h1
                                  allowFontScaling={false}
                                  style={[
                                      styles.actionSheetText,
                                      props?.actionTextColor ? {
                                          color: props?.actionTextColor
                                      } : {},
                                      index === actionSheetItems.length - 1 && {
                                          color: Colors.primary,
                                      }
                                  ]}
                            >
                                {actionItem.label}
                            </Text>
                        </TouchableHighlight>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 20,
    },
    actionSheetText: {
        fontSize: 18,
        color: PRIMARY_COLOR
    },
    actionSheetView: {
        backgroundColor: WHITE,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: BORDER_COLOR
    }
});


export default ActionSheet;
