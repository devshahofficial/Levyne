import React, { PureComponent } from 'react'
import { Modal, StyleSheet} from "react-native"
import {View, TouchableOpacity, Text } from 'react-native-ui-lib'
import Colors from '../Style/Colors';
import StarIconsPopUp from "./StarIconsPopUp"
import Input from "./input"
import { ScrollView } from 'react-native-gesture-handler';

class ModalPopUp extends PureComponent {
    render() {
        return (
            <ScrollView row>
                <Modal
                    animationType="slide"
                    visible={this.props.modalVisible}
                    transparent
                >
                    <TouchableOpacity style={styles.TransparentHalf} onPress={this.props.setModalVisible}></TouchableOpacity>
                    <View style={styles.TransparentHalf2}>
                        <TouchableOpacity style={styles.CrossContainer} onPress={this.props.setModalVisible} >
                            <Text style={styles.Cross}>x</Text>
                        </TouchableOpacity>
                        <Text margin-20 marginT-30 style={styles.InnerText} >
                            Dear Customer, {"\n"}{this.props.Text}
                        </Text>
                        <View row style={styles.Stars}>
                            <StarIconsPopUp width={38} height={30}></StarIconsPopUp>
                        </View>
                        <Input style={styles.InputText} placeholder={"Write review here"}>
                    </Input>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    TransparentHalf: {
        height: "50%",
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    TransparentHalf2: {
        backgroundColor: 'white',
        paddingTop: 20,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        position: 'absolute',
        top: "47%",
        bottom: 0,
        left: 0,
        right: 0,
    },
    CrossContainer: {
        marginLeft:"93%",
    },
    Cross:{
        fontSize:20,
        color: Colors.secondary
    },
    InnerText:{
        color: Colors.secondary,
        padding: 20,
        paddingBottom: 10
    },
    InputText:{
        margin: 10,
        marginRight: 25,
        marginLeft: 25,
        height: 160,
        paddingTop: 20
    },
    Stars:{
        justifyContent: "center",
    },
})
export default ModalPopUp