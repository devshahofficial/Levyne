import React from 'react';
import {View, Text, Avatar, Colors, Image} from 'react-native-ui-lib';
import {StyleSheet, Modal, SafeAreaView, ActivityIndicator } from 'react-native';
import Stars from '../components/StarIconsComponent';


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
                    <SafeAreaView style={styles.Modal}>
                        <View flex right marginB-50>
                            <Text onPress={this.props.setModalVisible} b2 paddingT-20 marginR-20 primary>x</Text>
                            <Image
                                style={styles.headerImage}
                                source={{ uri: this.props.StoryItem.ProductImage }}
                                loader={<ActivityIndicator />}
                                containerStyle={styles.AnimatedImageContainerStyle}
                            />
                        </View>
                        <View marginL-20 row>
                            <View style={{borderColor: Colors.shadow, borderRadius: 50, borderWidth:1, padding:10}}>
                                <Avatar
                                    size={50}
                                    source={{uri : this.props.StoryItem.BrandProfileImage}}
                                />
                            </View>
                            <View marginL-25 centerV>
                                <Text hb1>
                                    {this.props.StoryItem.BrandName}
                                </Text>
                                <View row>
                                    <Stars BrandRating="4"/>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
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
