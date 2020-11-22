import React from 'react';
import {View, TouchableOpacity, Text, Avatar, Button, Colors} from 'react-native-ui-lib';
import {StyleSheet, Modal, SafeAreaView } from 'react-native';
import {StarIcon} from "../Icons/StarIcon";

const Stars = (props) => {
    let i;
    const stars = [];
    for (i = 0; i < props.BrandRating; i++) {
        stars.push(true);
    }
    for (i = props.BrandRating; i < 5; i++) {
        stars.push(false);
    }
    return stars.map((name, i) => {
        return (
            <StarIcon
                key={i.toString()}
                Fill={name}
                height={15}
                width={15}
                Color={Colors.primary}
            />
        );
    });
};

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
                        <View flex right marginB-50 marginR-20>
                            <TouchableOpacity
                                flex
                                onPress={this.props.setModalVisible}
                            >
                                <Text b2 paddingT-20 primary>x</Text>
                            </TouchableOpacity>
                        </View>

                        <View marginL-20 row>
                            <View style={{borderColor: Colors.shadow, borderRadius: 50, borderWidth:1, padding:10}}>
                                <Avatar
                                    size={50}
                                    source={{uri : this.props.StoryItem.ProfileImage}}
                                />
                            </View>
                            <View marginL-25 centerV>
                                <Text hb1>
                                    {this.props.StoryItem.Name}
                                </Text>
                                <View row>
                                    <Stars BrandRating="0"/>
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
    }
})
