import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../assets/colors';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import EditProfileAPI from '../API/EditProfile';
import CstmInput from "../components/input";
import {ActionSheet, View, Text, TouchableOpacity, Button, Avatar} from 'react-native-ui-lib';
import CstmShadowView from '../components/CstmShadowView';

export default class OrderSuccessful extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <>
                <View flex paddingH-20>
                    <TouchableOpacity style={styles.avatarView} onPress={() => this.setState({ShowActionSheet : true})}>
                        <Avatar
                            style={styles.avatar}
                            source={this.state.ProfilePic}
                            fill={colors.trivisionGrey}
                            size={100}
                        />
                    </TouchableOpacity>

                    <Text marginT-20 hb1>Name</Text>
                    <CstmInput
                        placeholder='Name'
                        value={this.state.Name}
                        onChangeText={this.setName}
                    />

                    <Text marginT-20 hb1>Email</Text>
                    <CstmInput
                        //maxLength={20}
                        placeholder='Email'
                        value={this.state.Email}
                        onChangeText={this.setEmail}
                    />

                    <Text marginT-20 hb1> About </Text>
                    <CstmInput
                        multiline={true}
                        numberOfLines={5}
                        placeholder='About'
                        value={this.state.About}
                        onChangeText={this.setAbout}
                    />

                    <CstmShadowView style={{marginBottom: 10, marginTop:20}}>
                        <Button
                            label='Submit'
                            onPress={this.EditProfileSubmit}
                        />
                    </CstmShadowView>
                </View>
                <ActionSheet
                    cancelButtonIndex={2}
                    height={100}
                    options={[
                        {label: 'Camera', onPress: this.ShowCamera},
                        {label: 'Gallery', onPress: this.ShowGallery},
                        {label: 'Cancel', onPress: () => {}},
                    ]}
                    visible={this.state.ShowActionSheet}
                    //onDismiss={() => this.setState({ShowActionSheet: false})}
                />

            </>
        )
    }
}


const styles = StyleSheet.create({
    avatarView: {
        marginBottom: 10,
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        height: 100,
        width: 100,
        borderColor: colors.trivisionPink,
        borderWidth: 2,
    },

    Button: {
        borderRadius: 40,
        backgroundColor:colors.trivisionWhite,
        borderColor:colors.trivisionWhite,
    },

});
