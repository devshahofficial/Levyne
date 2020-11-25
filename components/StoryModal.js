import React from 'react';
import { Colors, TouchableOpacity, View, Text, Avatar} from 'react-native-ui-lib';
import {StyleSheet, Modal} from 'react-native';
import Stars from '../components/StarIconsComponent';
import {CancelIcon} from "../Icons/Cancel";
import ProductItemStories from "./ProductItemStories";


export default class StoryModal extends React.PureComponent {

    render() {
        return (
            <>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.modalVisible}
                    presentationStyle={'overFullScreen'}
                >
                    <View flex center>
                        <TouchableOpacity center
                            style={{
                                borderRadius: 50,
                                height: 60,
                                width: 60,
                                borderWidth:1,
                                borderColor: Colors.shadow
                            }}
                            center marginT-20
                            onPress={this.props.setModalVisible}
                        >
                            <CancelIcon size={26} Color={Colors.black}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            flex center
                        >
                            <TouchableOpacity
                                marginB-10 row
                                style={{backgroundColor: 'rgba(255, 255, 255, 0)'}}
                            >
                                <View
                                    style={{
                                        padding:10,
                                        backgroundColor: 'rgba(255, 255, 255, 0)'
                                    }}>
                                    <Avatar
                                        size={50}
                                        source={{uri : this.props.StoryItem.BrandProfileImage}}
                                    />
                                </View>
                                <View
                                    style={{
                                        padding:10,
                                        backgroundColor: 'rgba(255, 255, 255, 0)'
                                    }} centerV
                                >
                                    <Text hb1>
                                        {this.props.StoryItem.BrandName}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <ProductItemStories
                                {...this.props.StoryItem}
                                navigateProduct={() => this.props.navigateProduct(this.props.StoryItem.ProductID)}
                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </>
        )
    }
}

const styles = StyleSheet.create({
    Modal:{
        flex:1,
        justifyContent: 'space-between',
        paddingTop: 0,
        backgroundColor: Colors.white
    },
    avatarView:{
        flex: 0.5,
        justifyContent:'center',
    },
    boxes: {
        borderWidth:1,
        height:50,
        borderRadius:10,
        borderColor:Colors.primary,
    },
    Property: {
        borderWidth:1,
        height:50,
        borderRadius:10,
        borderColor:Colors.shadow,
        width:300,
        marginVertical:5
    },
    headerImage: {
        flex:1,
        width: '100%'
    },
    Container: {
        borderWidth: 1,
        borderColor: Colors.shadow,
        borderRadius: 10,
        padding: 10,
        margin: 15,
        flexDirection: "row",
    }
})
