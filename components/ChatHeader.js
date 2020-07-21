import React from 'react';
import {StyleSheet,Dimensions,FlatList} from 'react-native';
import {Avatar,Text,Button,View, Modal} from 'react-native-ui-lib';
import colors from "../assets/colors";

export default class ChatHeader extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showActionSheet: false,
            modalVisible: false
        }
    }
    render() {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.avatarView}>
                        <Avatar
                            //source={this.props.item.profilePic}
                            //please uncomment line 35 and delete line 37
                            source={{uri : this.props.BrandIcon}}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.text} hb1 left
                            // please use props, {this.props.item.title} were removed for testing purposes
                    >{this.props.BrandName}</Text>
                    </View>
                </View>
            </>
        )
    }
}

const deviceWidth = Dimensions.get("screen").width

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: deviceWidth,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth:0.3,
        borderBottomColor:colors.trivisionGrey
    },
    avatarView: {
        flex: 0.2,
        marginLeft:15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textView:{
        flex:0.6,
    },
    text: {
        fontSize: 16,
        fontWeight:'bold',
        textAlign: 'left',
    },
    ShadowView:{
        marginRight:25,
        marginBottom:15,
        flex:0.27,
    },
    Modal:{
        width:deviceWidth-80,
        flex:0.7,
        alignSelf:'center',
        shadowColor: colors.trivisionShadow,
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {width: 0,height: 3},
        backgroundColor: colors.trivisionWhite,
        marginTop:deviceWidth/2,
        borderRadius:10,
    },
    ModalText:{
        color: colors.trivisionPink,
        fontSize: 16,
        flex:5,
        alignSelf:'center',
        marginLeft: 10
    },
    FlatList: {
        marginBottom:5,
    }
})

