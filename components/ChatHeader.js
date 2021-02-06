import React from 'react';
import {StyleSheet,Dimensions} from 'react-native';
import {Avatar, Text, View, Colors, TouchableOpacity} from 'react-native-ui-lib';
import {BackArrowIcon} from "../Icons/BackArrowIcon";

/**
 * @type {React.PureComponent}
 * @typedef {() => void} NavigateBack
 * @typedef {() => void} NavigateBrandProfile
 * @typedef {() => void} NavigateBucket
 * @extends {React.PureComponent<{NavigateBack: NavigateBack, NavigateBrandProfile: NavigateBrandProfile, NavigateBucket: NavigateBucket, imageSource: {uri: string}, initials: string, Name: string, BucketID: number, BucketInfo: {OrderID: number}, Status: 0 | 1 | 2}>}
 **/


export default class ChatHeader extends React.PureComponent {

    /**
     * @param {0 | 1 | 2} BucketStatus
     */
    renderStatus(BucketStatus) {
        switch(BucketStatus) {
            case 0:
                return 'Bucket added, waiting for final budget.';
            case 1:
                return 'Price Decided successfully, waiting for Check out.';
            case 2:
                return 'Order placed successfully, Status available.';
        }
    }

    render() {

        return (
            <>
                <View row center style={styles.container}>
                    <TouchableOpacity marginL-10 onPress={this.props.NavigateBack}><BackArrowIcon/></TouchableOpacity>
                    <TouchableOpacity style={styles.avatarView} onPress={this.props.NavigateBrandProfile}>
                        <Avatar
                            source={this.props.imageSource}
                            label={this.props.initials}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textView} onPress={this.props.NavigateBucket}>
                        <Text hb1>{this.props.Name}</Text>
                        {this.props.Status < 2 ?
                            <Text secondary h3>Bucket ID: {this.props.BucketID || "Fetching..."}</Text>
                            :
                            <Text secondary h3>Order ID: {this.props.BucketInfo.OrderID || "Fetching..."}</Text>
                        }
                    </TouchableOpacity>
                </View>
                <View center style={styles.Header}>
                    <Text hb2>{this.renderStatus(this.props.Status)}</Text>
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

