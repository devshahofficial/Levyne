import React from 'react';
import { Colors, TouchableOpacity, View, Text, Avatar} from 'react-native-ui-lib';
import {Modal, SafeAreaView} from 'react-native';
import {CancelIcon} from "../Icons/Cancel";
import ProductItemStories from "./ProductItemStories";


export default class StoryModal extends React.PureComponent {

    render() {
        return (
            <Modal
                animationType="slide"
                visible={this.props.modalVisible}
                presentationStyle={'overFullScreen'}
                useNativeDriver
            >
                <SafeAreaView style={{flex: 1}}>
                    <TouchableOpacity activeOpacity={1} flex center onPress={this.props.ChangeStoryIndex}>
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
                        <View flex center>
                            <TouchableOpacity
                                marginB-10 row
                                style={{backgroundColor: 'rgba(255, 255, 255, 0)'}}
                                onPress={this.props.NavigateBrand}
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
                                navigateProduct={this.props.navigateProduct}
                            />
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
        )
    }
}


