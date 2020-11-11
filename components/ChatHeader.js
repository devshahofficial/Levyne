import React from 'react';
import {StyleSheet,Dimensions} from 'react-native';
import {Avatar, Text, View, Colors, TouchableOpacity} from 'react-native-ui-lib';
import {BackArrowIcon} from "../Icons/BackArrowIcon";

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
                <View row center style={styles.container}>
                    <TouchableOpacity marginL-10 onPress={this.props.Navigation}><BackArrowIcon/></TouchableOpacity>
                    <View style={styles.avatarView}>
                        <Avatar
                            source={this.props.imageSource}
                            label={this.props.initials}
                            containerStyle={styles.avatar}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Text hb1>{this.props.Name}</Text>
                        <Text secondary h3>Bucket ID: {this.props.BucketID}</Text>
                    </View>
                </View>
                <View center style={styles.Header}>
                    <Text hb2>Under Confirmation</Text>
                </View>

            </>
        )
    }
}

const deviceWidth = Dimensions.get("screen").width;
const styles = StyleSheet.create({
    container: {
        width: deviceWidth,
        height: 60,
    },
    avatarView: {
        flex: 0.2,
        marginLeft:5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textView:{
        flex:0.9,
        marginLeft:20,
    },
    Header: {
        backgroundColor: Colors.shadow,
        height: 40
    }
})

