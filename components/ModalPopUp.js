import React, { Component } from 'react'
import { Modal, StyleSheet} from "react-native"
import {View, TouchableOpacity, Text } from 'react-native-ui-lib'
import Colors from '../Style/Colors';
import StarIconsComponent from "./StarIconsComponent"
import StarIconsPopUp from "./StarIconsPopUp"
import CstmShadowView from "./CstmShadowView"
import Input from "./input"
import { ScrollView } from 'react-native-gesture-handler';

class ModalPopUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: true
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <ScrollView row style={styles.Modal}>
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    transparent
                >
                    <TouchableOpacity style={styles.TransparentHalf} onPress={() => this.setModalVisible(false)}></TouchableOpacity>
                    <View style={styles.TransparentHalf2}>
                        <TouchableOpacity style={styles.CrossContainer} onPress={() => this.setModalVisible(false)} >
                            <Text style={styles.Cross}>x</Text>
                        </TouchableOpacity>
                        <Text margin-20 marginT-30 style={styles.InnerText} >
                            Dear Customer, {"\n"}{this.props.Text}
                        </Text>
                        <View row style={styles.Stars}>
                            <StarIconsPopUp width={38} height={30} BrandRating={0}></StarIconsPopUp>
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
        position: 'absolute',
        top: "47%",
        bottom: 0,
        left: 0,
        right: 0,
    },
    Modal: {
        backgroundColor: 'red',
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
        height: 145,
        paddingTop: 20
    },
    Stars:{
        justifyContent: "center",
    },
    Review:{
        height: 150,
        margin: 30,
        padding: 18,
        borderRadius: 20,
        borderColor: "#ddd",
        borderWidth: 1 
    }
})
export default ModalPopUp